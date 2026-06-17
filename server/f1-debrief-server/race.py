import pandas as pd
from fastf1.ergast import Ergast
from f1 import year, round_number, event_name
from db import db_get, db_put

def get_race_results():
    cached = db_get(year, round_number, 'race')
    if cached is not None:
        return cached

    ergast = Ergast()
    response = ergast.get_race_results(season=int(year), round=int(round_number))

    if not response.content:
        return []

    df = response.content[0]
    df = df.where(pd.notna(df), None)

    results = []
    for _, row in df.iterrows():
        results.append({
            'Position': int(row['position']) if row['position'] is not None else None,
            'DriverNumber': str(row['number']),
            'DriverCode': row['driverCode'],
            'FullName': f"{row['givenName']} {row['familyName']}",
            'TeamName': row['constructorName'],
            'GridPosition': int(row['grid']) if row['grid'] is not None else None,
            'Status': row['status'],
            'Points': float(row['points']) if row['points'] is not None else 0,
            'FastestLapRank': int(row['fastestLapRank']) if row['fastestLapRank'] is not None else None,
            'FastestLapTime': str(row['fastestLapTime']) if row['fastestLapTime'] is not None else None,
        })

    db_put(year, round_number, 'race', results, event_name)
    return results
