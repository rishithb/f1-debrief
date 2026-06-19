import pandas as pd
from fastf1.ergast import Ergast
from f1 import year, round_number, event_name
from db import db_get, db_put


def _fetch_round_race(r):
    key = f'season_race_{r}'
    cached = db_get(year, r, key)
    if cached is not None:
        return cached
    ergast = Ergast()
    resp = ergast.get_race_results(season=int(year), round=int(r))
    if not resp.content:
        return []
    df = resp.content[0]
    data = []
    for _, row in df.iterrows():
        if not pd.isna(row['position']) and not pd.isna(row['driverCode']):
            data.append({
                'code': str(row['driverCode']),
                'team': str(row['constructorName']),
                'position': int(row['position']),
            })
    db_put(year, r, key, data, event_name)
    return data


def _fetch_round_qual(r):
    key = f'season_qual_{r}'
    cached = db_get(year, r, key)
    if cached is not None:
        return cached
    ergast = Ergast()
    resp = ergast.get_qualifying_results(season=int(year), round=int(r))
    if not resp.content:
        return []
    df = resp.content[0]
    data = []
    for _, row in df.iterrows():
        if not pd.isna(row['position']) and not pd.isna(row['driverCode']):
            data.append({
                'code': str(row['driverCode']),
                'team': str(row['constructorName']),
                'position': int(row['position']),
            })
    db_put(year, r, key, data, event_name)
    return data


def get_team_stats():
    cached = db_get(year, round_number, 'team_stats')
    if cached is not None:
        return cached

    all_race = {}   # round -> list of {code, team, position}
    all_qual = {}

    for r in range(1, int(round_number) + 1):
        all_race[r] = _fetch_round_race(r)
        all_qual[r] = _fetch_round_qual(r)

    # Build team -> set of driver codes (all who appeared)
    team_drivers = {}
    driver_appearances = {}  # (team, code) -> count
    for r, results in all_race.items():
        for d in results:
            team = d['team']
            code = d['code']
            team_drivers.setdefault(team, set()).add(code)
            driver_appearances[(team, code)] = driver_appearances.get((team, code), 0) + 1

    stats = {}
    for team, codes in team_drivers.items():
        # Pick the 2 most frequent drivers (handles mid-season swaps)
        sorted_codes = sorted(codes, key=lambda c: driver_appearances.get((team, c), 0), reverse=True)
        if len(sorted_codes) < 2:
            continue
        d1, d2 = sorted_codes[0], sorted_codes[1]

        race_h2h = {d1: 0, d2: 0}
        qual_h2h = {d1: 0, d2: 0}
        races_compared = 0
        qual_compared = 0

        for r in range(1, int(round_number) + 1):
            race_res = all_race.get(r, [])
            qual_res = all_qual.get(r, [])

            p1 = next((x['position'] for x in race_res if x['code'] == d1 and x['team'] == team), None)
            p2 = next((x['position'] for x in race_res if x['code'] == d2 and x['team'] == team), None)
            if p1 is not None and p2 is not None:
                races_compared += 1
                if p1 < p2:
                    race_h2h[d1] += 1
                elif p2 < p1:
                    race_h2h[d2] += 1

            q1 = next((x['position'] for x in qual_res if x['code'] == d1 and x['team'] == team), None)
            q2 = next((x['position'] for x in qual_res if x['code'] == d2 and x['team'] == team), None)
            if q1 is not None and q2 is not None:
                qual_compared += 1
                if q1 < q2:
                    qual_h2h[d1] += 1
                elif q2 < q1:
                    qual_h2h[d2] += 1

        stats[team] = {
            'drivers': [d1, d2],
            'race_h2h': race_h2h,
            'qual_h2h': qual_h2h,
            'races_compared': races_compared,
            'qual_compared': qual_compared,
        }

    db_put(year, round_number, 'team_stats', stats, event_name)
    return stats
