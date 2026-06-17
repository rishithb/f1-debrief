import pandas as pd
from fastf1.ergast import Ergast
from f1 import year, round_number, event_name
from db import db_get, db_put

def get_standings():
    cached = db_get(year, round_number, 'standings')
    if cached is not None:
        return cached

    ergast = Ergast()
    driver_response = ergast.get_driver_standings(season=int(year))
    constructor_response = ergast.get_constructor_standings(season=int(year))

    drivers = []
    if driver_response.content:
        df = driver_response.content[0]
        df = df.where(pd.notna(df), None)
        for _, row in df.iterrows():
            team = row['constructorNames'][0] if row['constructorNames'] else ''
            drivers.append({
                'position': int(row['position']),
                'driver': f"{row['givenName']} {row['familyName']}",
                'code': row['driverCode'],
                'number': str(row['driverNumber']) if row['driverNumber'] else '',
                'team': team,
                'nationality': row['driverNationality'],
                'points': float(row['points']),
                'wins': int(row['wins']),
            })

    constructors = []
    if constructor_response.content:
        cdf = constructor_response.content[0]
        cdf = cdf.where(pd.notna(cdf), None)
        for _, row in cdf.iterrows():
            constructors.append({
                'position': int(row['position']),
                'team': row['constructorName'],
                'nationality': row['constructorNationality'],
                'points': float(row['points']),
                'wins': int(row['wins']),
            })

    result = {'drivers': drivers, 'constructors': constructors}
    db_put(year, round_number, 'standings', result, event_name)
    return result
