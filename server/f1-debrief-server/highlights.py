import json
import os
import re
from pathlib import Path
from google import genai
from f1 import year, country

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
        raise ValueError("GEMINI_API_KEY is not set. Add it to server/.env or your shell environment.")

    return genai.Client(api_key=api_key)


def _extract_json_array(text: str):
    stripped = text.strip()

    if stripped.startswith("```"):
        stripped = re.sub(r"^```(?:json)?\s*", "", stripped)
        stripped = re.sub(r"\s*```$", "", stripped)

    start = stripped.find("[")
    end = stripped.rfind("]")

    if start != -1 and end != -1 and end > start:
        stripped = stripped[start:end + 1]

    return json.loads(stripped)

def get_highlights():
    prompt = f"""You are an F1 race analyst for the {year} {country} Grand Prix. Analyse this race data and return a JSON array of highlights. Search the web for race highlight info as needed.

Each event must have:
- lap: number
- type: "overtake" | "strategy" | "incident" | "fastest" | "sc" | "championship"
- title: max 8-word headline
- description: 1-2 sentences on significance
- drivers: array of surnames

Return 10-12 events sorted by lap. Focus on moments that changed the result."""

    client = _get_client()
    response = client.models.generate_content(
        model="gemini-3-flash-preview",
        contents=prompt,
    )

    if not response.text:
        return []

    try:
        return _extract_json_array(response.text)
    except json.JSONDecodeError:
        return []
