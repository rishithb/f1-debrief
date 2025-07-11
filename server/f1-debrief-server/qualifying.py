import fastf1
from f1 import year, country

_qualifying_cache = None

def reformat_time(t): # removes "Q=" and the days from the lap time
    t = t[10:-3]  # Remove "Q1=" and the last 3 characters (which are usually " days")
    return t

def filter_time(results, session):
    return [t for t in results if t[session] and t[session] != 'NaT']
        

def get_qualifying_results():
    # caching qualifying results to avoid repeated API calls
    global _qualifying_cache
    if _qualifying_cache is not None:
        return _qualifying_cache

    session = fastf1.get_session(year, country, 'Q')
    session.load()
        
    q1_results = session.results.iloc[0:20].loc[:, ['Abbreviation', 'Q1']]
    q1_results['Q1'] = q1_results['Q1'].astype(str).apply(reformat_time)
    q2_results = session.results.iloc[0:20].loc[:, ['Abbreviation', 'Q2']]
    q2_results['Q2'] = q2_results['Q2'].astype(str).apply(reformat_time)
    q3_results = session.results.iloc[0:20].loc[:, ['Abbreviation', 'Q3']]
    q3_results['Q3'] = q3_results['Q3'].astype(str).apply(reformat_time)

    q1_results = filter_time(q1_results.to_dict(orient='records'), 'Q1')
    q2_results = filter_time(q2_results.to_dict(orient='records'), 'Q2')
    q3_results = filter_time(q3_results.to_dict(orient='records'), 'Q3')

    _qualifying_cache = {
        'Q1': q1_results,
        'Q2': q2_results,
        'Q3': q3_results
    }
    return _qualifying_cache