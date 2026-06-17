import pandas as pd
from fastf1.ergast import Ergast
from f1 import year, round_number, event_name
from db import db_get, db_put

def _format_laptime(td):
    if td is None or (isinstance(td, float) and pd.isna(td)):
        return ""
    try:
        total = td.total_seconds()
        minutes = int(total // 60)
        seconds = total % 60
        return f"{minutes}:{seconds:06.3f}"
    except Exception:
        return ""

def get_qualifying_results():
    cached = db_get(year, round_number, 'qualifying')
    if cached is not None:
        return cached

    ergast = Ergast()
    response = ergast.get_qualifying_results(season=int(year), round=int(round_number))

    if not response.content:
        return []

    df = response.content[0]
    drivers_list = []
    pole_time = None

    for _, row in df.iterrows():
        q3 = row['Q3'] if not (isinstance(row['Q3'], float) and pd.isna(row['Q3'])) and row['Q3'] is not pd.NaT else None
        q2 = row['Q2'] if not (isinstance(row['Q2'], float) and pd.isna(row['Q2'])) and row['Q2'] is not pd.NaT else None
        q1 = row['Q1'] if not (isinstance(row['Q1'], float) and pd.isna(row['Q1'])) and row['Q1'] is not pd.NaT else None

        best_time = q3 or q2 or q1

        if pole_time is None and best_time is not None:
            pole_time = best_time

        if pole_time is not None and best_time is not None:
            delta_s = best_time.total_seconds() - pole_time.total_seconds()
            gap = f"+{delta_s:.3f}" if delta_s > 0 else "0.000"
        else:
            gap = ""

        drivers_list.append({
            'position': int(row['position']),
            'driver': f"{row['givenName']} {row['familyName']}",
            'team': row['constructorName'],
            'code': row['driverCode'],
            'number': str(row['number']),
            'nationality': row['driverNationality'],
            'photo': f"/drivers/{row['number']}.png",
            'teamLogo': '/placeholder.svg',
            'Q1': _format_laptime(q1),
            'Q2': _format_laptime(q2),
            'Q3': _format_laptime(q3),
            'gap': gap,
        })

    db_put(year, round_number, 'qualifying', drivers_list, event_name)
    return drivers_list
