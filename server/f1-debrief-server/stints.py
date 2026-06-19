import fastf1
import pandas as pd
from f1 import year, round_number, event_name
from db import db_get, db_put


def get_stints():
    cached = db_get(year, round_number, 'stints')
    if cached is not None:
        return cached

    try:
        session = fastf1.get_session(int(year), int(round_number), 'R')
        session.load(laps=True, telemetry=False, weather=False, messages=False)
    except Exception as e:
        print(f"FastF1 stints load failed: {e}")
        return {}

    result = {}

    try:
        all_laps = session.laps
        for abbr in all_laps['Driver'].unique():
            driver_laps = all_laps[all_laps['Driver'] == abbr].sort_values('LapNumber')

            stints = []
            prev_compound = None
            stint_start = None
            stint_laps = 0

            for _, lap in driver_laps.iterrows():
                raw = lap.get('Compound', '') or ''
                compound = str(raw).upper()
                if not compound or compound in ('NAN', 'NONE', ''):
                    compound = 'UNKNOWN'
                lap_num = int(lap['LapNumber'])

                if compound != prev_compound:
                    if prev_compound is not None:
                        stints.append({
                            'compound': prev_compound,
                            'laps': stint_laps,
                            'start_lap': stint_start,
                        })
                    prev_compound = compound
                    stint_start = lap_num
                    stint_laps = 1
                else:
                    stint_laps += 1

            if prev_compound is not None:
                stints.append({
                    'compound': prev_compound,
                    'laps': stint_laps,
                    'start_lap': stint_start,
                })

            result[abbr] = stints

    except Exception as e:
        print(f"Stints computation failed: {e}")

    db_put(year, round_number, 'stints', result, event_name)
    return result
