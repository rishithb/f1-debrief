import fastf1
import pandas as pd
from f1 import year, round_number, event_name
from db import db_get, db_put


def get_session_events():
    cached = db_get(year, round_number, 'session_events')
    if cached is not None:
        return cached

    try:
        session = fastf1.get_session(int(year), int(round_number), 'R')
        session.load(laps=True, telemetry=False, weather=False, messages=False)
    except Exception as e:
        print(f"FastF1 session load failed: {e}")
        return {'safety_car_periods': [], 'vsc_periods': [], 'red_flag_periods': [], 'retirement_laps': []}

    events = {
        'safety_car_periods': [],
        'vsc_periods': [],
        'red_flag_periods': [],
        'retirement_laps': [],
    }

    all_laps = session.laps

    def time_to_lap(t):
        if all_laps.empty:
            return None
        try:
            lap_starts = all_laps.groupby('LapNumber')['LapStartTime'].min()
            laps_before = lap_starts[lap_starts <= t]
            return int(laps_before.index[-1]) if not laps_before.empty else 1
        except Exception:
            return None

    # Parse track status: 4=SC, 5=RedFlag, 6=VSC
    try:
        ts = session.track_status
        if ts is not None and not ts.empty:
            current_status = None
            start_time = None

            for _, row in ts.iterrows():
                status = str(row['Status'])
                t = row['Time']

                if status != current_status:
                    if current_status is not None and start_time is not None:
                        start_lap = time_to_lap(start_time)
                        end_lap = time_to_lap(t)
                        period = {'start_lap': start_lap, 'end_lap': end_lap}
                        if current_status == '4':
                            events['safety_car_periods'].append(period)
                        elif current_status == '6':
                            events['vsc_periods'].append(period)
                        elif current_status == '5':
                            events['red_flag_periods'].append(period)
                    current_status = status
                    start_time = t
    except Exception as e:
        print(f"Track status parsing failed: {e}")

    # Retirement laps
    try:
        results = session.results
        for _, driver in results.iterrows():
            status = str(driver.get('Status', '') or '')
            if status and status != 'Finished' and not status.startswith('+'):
                driver_laps = all_laps[all_laps['DriverNumber'] == str(driver['DriverNumber'])]
                last_lap = int(driver_laps['LapNumber'].max()) if not driver_laps.empty else None
                events['retirement_laps'].append({
                    'driver': str(driver.get('FullName', '')),
                    'abbreviation': str(driver.get('Abbreviation', '')),
                    'status': status,
                    'last_lap': last_lap,
                })
    except Exception as e:
        print(f"Retirement laps parsing failed: {e}")

    db_put(year, round_number, 'session_events', events, event_name)
    return events
