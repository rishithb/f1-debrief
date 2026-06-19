import pandas as pd
from fastf1.ergast import Ergast
from f1 import year, round_number, event_name
from db import db_get, db_put

def get_pit_stops():
    cached = db_get(year, round_number, 'pitstops')
    if cached is not None:
        return cached

    ergast = Ergast()
    response = ergast.get_pit_stops(season=int(year), round=int(round_number))

    if not response.content:
        return []

    df = response.content[0]
    df = df.where(pd.notna(df), None)

    results = []
    for _, row in df.iterrows():
        results.append({
            'driver': str(row['driverId']) if row['driverId'] is not None else '',
            'lap': int(row['lap']) if row['lap'] is not None else None,
            'stop': int(row['stop']) if row['stop'] is not None else None,
            'duration': str(row['duration']) if row['duration'] is not None else None,
        })

    db_put(year, round_number, 'pitstops', results, event_name)
    return results
