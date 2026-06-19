import pandas as pd
from fastf1.ergast import Ergast
from f1 import year, round_number, event_name
from db import db_get, db_put


def _fmt_lap_time(td):
    try:
        if td is None or pd.isna(td):
            return None
    except (TypeError, ValueError):
        return None
    total_s = td.total_seconds()
    m = int(total_s // 60)
    s = total_s % 60
    return f"{m}:{s:06.3f}"


def _fmt_race_time(td, is_winner):
    try:
        if td is None or pd.isna(td):
            return None
    except (TypeError, ValueError):
        return None
    total_s = td.total_seconds()
    if is_winner:
        h = int(total_s // 3600)
        m = int((total_s % 3600) // 60)
        s = total_s % 60
        return f"{h}:{m:02d}:{s:06.3f}"
    if total_s < 60:
        return f"+{total_s:.3f}s"
    m = int(total_s // 60)
    s = total_s % 60
    return f"+{m}:{s:06.3f}"


def get_race_results():
    cached = db_get(year, round_number, 'race')
    if cached is not None:
        return cached

    ergast = Ergast()
    response = ergast.get_race_results(season=int(year), round=int(round_number))

    if not response.content:
        return []

    df = response.content[0]

    winner_laps = int(df.iloc[0]['laps']) if not pd.isna(df.iloc[0]['laps']) else 0

    results = []
    for _, row in df.iterrows():
        position = int(row['position']) if not pd.isna(row['position']) else None
        status = row['status'] if not pd.isna(row['status']) else None
        laps = int(row['laps']) if not pd.isna(row['laps']) else 0
        laps_down = winner_laps - laps

        if status == 'Finished':
            race_time = _fmt_race_time(row['totalRaceTime'], position == 1)
        elif status == 'Lapped' and laps_down > 0:
            race_time = f"+{laps_down} Lap{'s' if laps_down > 1 else ''}"
        else:
            race_time = None

        results.append({
            'Position': position,
            'DriverNumber': str(row['number']) if not pd.isna(row['number']) else '',
            'DriverCode': row['driverCode'] if not pd.isna(row['driverCode']) else '',
            'FullName': f"{row['givenName']} {row['familyName']}",
            'TeamName': row['constructorName'] if not pd.isna(row['constructorName']) else '',
            'GridPosition': int(row['grid']) if not pd.isna(row['grid']) else None,
            'Status': status,
            'RaceTime': race_time,
            'Points': float(row['points']) if not pd.isna(row['points']) else 0,
            'FastestLapRank': int(row['fastestLapRank']) if not pd.isna(row['fastestLapRank']) else None,
            'FastestLapTime': _fmt_lap_time(row['fastestLapTime']),
        })

    db_put(year, round_number, 'race', results, event_name)
    return results
