import json
import os
import re
from pathlib import Path
from google import genai
from google.genai.types import GenerateContentConfig, Tool, GoogleSearch
from f1 import year, round_number, event_name, location, country, official_event_name, total_rounds
from race import get_race_results
from qualifying import get_qualifying_results
from standings import get_standings
from pitstops import get_pit_stops
from session_data import get_session_events
from db import db_get, db_put


def _load_env_file():
    possible_paths = [
        Path(__file__).with_name(".env"),
        Path(__file__).resolve().parents[1] / ".env",
    ]
    for env_path in possible_paths:
        if not env_path.exists():
            continue
        for line in env_path.read_text(encoding="utf-8").splitlines():
            stripped = line.strip()
            if not stripped or stripped.startswith("#") or "=" not in stripped:
                continue
            key, value = stripped.split("=", 1)
            os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))
        break


_load_env_file()


def _get_client():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY is not set.")
    return genai.Client(api_key=api_key)


def _build_context():
    race = get_race_results()
    qualifying = get_qualifying_results()
    standings = get_standings()
    pit_stops = get_pit_stops()
    session_events = get_session_events()

    lines = [
        f"Race: {official_event_name}",
        f"Round: {round_number}/{total_rounds}, {year}",
        f"Location: {location}, {country}",
        "",
        "RACE RESULTS (sorted by finish position):",
        "Pos | Driver | Team | Grid | Pos Change | Status | Points | Fastest Lap",
    ]
    for d in race:
        grid = d['GridPosition'] or 0
        finish = d['Position'] or 0
        change = grid - finish
        change_str = f"+{change}" if change > 0 else str(change)
        fl = f"FL: {d['FastestLapTime']}" if d.get('FastestLapRank') == 1 else ""
        lines.append(
            f"P{finish} | {d['FullName']} ({d['DriverCode']}) | {d['TeamName']} | "
            f"Grid {grid} | {change_str} positions | {d['Status']} | {d['Points']} pts {fl}"
        )

    lines += ["", "QUALIFYING RESULTS:", "Pos | Driver | Team | Q1 | Q2 | Q3 | Gap to Pole"]
    for d in qualifying:
        lines.append(f"P{d['position']} | {d['driver']} ({d['code']}) | {d['team']} | {d['Q1']} | {d['Q2']} | {d['Q3']} | {d['gap']}")

    lines += ["", "PIT STOPS (all stops sorted by lap):"]
    lines.append("Driver | Stop # | Lap | Duration")
    for p in sorted(pit_stops, key=lambda x: x['lap'] or 0):
        lines.append(f"{p['driver']} | Stop {p['stop']} | Lap {p['lap']} | {p['duration']}s")

    # FastF1 session events
    sc = session_events.get('safety_car_periods', [])
    vsc = session_events.get('vsc_periods', [])
    red = session_events.get('red_flag_periods', [])
    retirements = session_events.get('retirement_laps', [])

    lines += ["", "TRACK EVENTS (from FastF1 session data):"]
    if sc:
        periods = ", ".join(f"Laps {p['start_lap']}-{p['end_lap']}" for p in sc)
        lines.append(f"Safety Car periods: {periods}")
    else:
        lines.append("Safety Car periods: none")
    if vsc:
        periods = ", ".join(f"Laps {p['start_lap']}-{p['end_lap']}" for p in vsc)
        lines.append(f"VSC periods: {periods}")
    else:
        lines.append("VSC periods: none")
    if red:
        periods = ", ".join(f"Laps {p['start_lap']}-{p['end_lap']}" for p in red)
        lines.append(f"Red Flag periods: {periods}")
    else:
        lines.append("Red Flag periods: none")

    if retirements:
        lines += ["", "RETIREMENTS WITH LAP NUMBERS (from FastF1):"]
        for r in retirements:
            lines.append(f"{r['driver']} ({r['abbreviation']}) — {r['status']} — retired lap {r['last_lap']}")
    else:
        dnfs = [d for d in race if d['Status'] not in ('Finished', '+1 Lap', '+2 Laps', '+3 Laps', '+4 Laps', '+5 Laps')]
        if dnfs:
            lines += ["", "RETIREMENTS/DNFs:"]
            for d in dnfs:
                lines.append(f"{d['FullName']} ({d['DriverCode']}) — {d['Status']}")

    lines += ["", "CHAMPIONSHIP STANDINGS AFTER THIS RACE:"]
    lines.append("Drivers (top 8):")
    for d in standings.get('drivers', [])[:8]:
        lines.append(f"  P{d['position']} {d['driver']} ({d['team']}) — {d['points']} pts")
    lines.append("Constructors (top 5):")
    for c in standings.get('constructors', [])[:5]:
        lines.append(f"  P{c['position']} {c['team']} — {c['points']} pts")

    return "\n".join(lines)


def _extract_json(text: str):
    stripped = text.strip()
    if stripped.startswith("```"):
        stripped = re.sub(r"^```(?:json)?\s*", "", stripped)
        stripped = re.sub(r"\s*```$", "", stripped)
    stripped = stripped.strip()
    start = stripped.find('{')
    if start == -1:
        start = stripped.find('[')
    if start == -1:
        raise json.JSONDecodeError("No JSON found", stripped, 0)
    end = stripped.rfind('}') if stripped[start] == '{' else stripped.rfind(']')
    return json.loads(stripped[start:end + 1])


def get_highlights():
    cached = db_get(year, round_number, 'highlights')
    if cached is not None:
        return cached

    context = _build_context()

    prompt = f"""You are an expert F1 analyst writing a post-race debrief for the {year} {event_name}.

First, search the web for race reports, driver quotes, stewards decisions, and analysis of this race.
Then combine what you find with the structured race data below.

Return ONLY a JSON object with exactly four keys:

"summary": a 2-3 sentence paragraph covering the race winner, the single most decisive moment, and the championship impact. Be specific — include names, lap numbers, and point gaps.

"highlights": array of 10-12 highlight objects sorted by lap ascending. Each object:
- lap: integer (lap the moment occurred, 0 if unknown)
- type: one of "overtake" | "strategy" | "incident" | "fastest" | "sc" | "championship"
- title: string, max 8 words
- description: string, 2-3 sentences, specific and analytical
- drivers: array of driver surnames (last name only)

"incidents": array of on-track incident objects. Use the FastF1 track events data for SC/VSC/red flag lap numbers, and web search for the cause. Each object:
- lap: integer
- type: one of "Safety Car" | "VSC" | "Red Flag" | "Collision" | "Track Limits" | "Technical" | "Mechanical" | "Other"
- description: 1-2 sentences describing what happened and why
- drivers: array of driver surnames involved (empty array if no specific driver)
- severity: one of "Info" | "Caution" | "Warning" | "Penalty"

"penalties": array of all penalties issued during the race weekend. Use web search for stewards decisions. Each object:
- driver: full driver name
- penalty: e.g. "5s Time Penalty", "10s Time Penalty", "Drive Through", "Grid Penalty", "Reprimand"
- reason: brief description of the infringement
- lap: integer (when issued, 0 if unknown)

Rules:
- Every highlight must be a specific moment, not a general observation
- Use exact lap numbers from the FastF1 data where provided
- Championship highlights should quantify point gap changes
- For DNFs, use both the retirement lap from FastF1 and web search for the confirmed cause

BAD highlight: "Verstappen won the race from pole position"
GOOD highlight: "Verstappen pitted on lap 23, 4 laps before Norris, emerging P2 but on fresher rubber. He overtook Norris on lap 31 and was never challenged again."

Return raw JSON only, no markdown, no explanation.

RACE DATA:
{context}"""

    client = _get_client()
    response = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        contents=prompt,
        config=GenerateContentConfig(
            tools=[Tool(google_search=GoogleSearch())],
        ),
    )

    if not response.text:
        return {"summary": "", "highlights": [], "incidents": [], "penalties": []}

    try:
        result = _extract_json(response.text)
        if isinstance(result, list):
            result = {"summary": "", "highlights": result, "incidents": [], "penalties": []}
        result.setdefault("incidents", [])
        result.setdefault("penalties", [])
        result.setdefault("summary", "")
        result.setdefault("highlights", [])
        db_put(year, round_number, 'highlights', result, event_name)
        return result
    except json.JSONDecodeError:
        return {"summary": "", "highlights": [], "incidents": [], "penalties": []}
