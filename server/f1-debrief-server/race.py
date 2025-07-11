import fastf1
from f1 import year, country

_race_cache = None

def get_race_results():
    global _race_cache
    if _race_cache is not None:
        return _race_cache

    session = fastf1.get_session(year, country, 'R')
    session.load()

    results_df = session.results.iloc[0:20].loc[:, [
        'DriverNumber', 'BroadcastName', 'Position', 'GridPosition', 'Time', 'Status', 'Points'
    ]]

    # Convert Timedelta in 'Time' column to string
    if 'Time' in results_df.columns:
        results_df['Time'] = results_df['Time'].astype(str)

    results = results_df.to_dict(orient='records')

    _race_cache = results
    return _race_cache

