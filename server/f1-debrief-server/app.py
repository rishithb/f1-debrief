from flask import Flask, jsonify
from flask_cors import CORS
from qualifying import get_qualifying_results
from race import get_race_results
from standings import get_standings
from highlights import get_highlights
from pitstops import get_pit_stops
from team_stats import get_team_stats
from stints import get_stints
from f1 import year, country, last_race, official_event_name, event_name, location, round_number, total_rounds, next_race_event

app = Flask(__name__)
CORS(app)

@app.route('/api/home')
def home():
    return "Welcome to F1 Debrief!"

@app.route('/api/qualifying')
def qualifying_results():
    results = get_qualifying_results()
    return jsonify(results)

@app.route('/api/race')
def race_results():
    results = get_race_results()
    return jsonify(results)

@app.route('/api/standings')
def standings():
    results = get_standings()
    return jsonify(results)

@app.route('/api/highlights')
def highlights():
    results = get_highlights()
    return jsonify(results)

@app.route('/api/pit-stops')
def pit_stops():
    results = get_pit_stops()
    return jsonify(results)

@app.route('/api/team-stats')
def team_stats():
    results = get_team_stats()
    return jsonify(results)

@app.route('/api/stints')
def stints():
    results = get_stints()
    return jsonify(results)

@app.route('/api/next-race')
def next_race():
    if next_race_event is None:
        return jsonify(None)
    # Session5DateUtc is naive UTC — append Z so the browser parses it as UTC
    utc_iso = next_race_event['Session5DateUtc'].isoformat() + 'Z'
    return jsonify({
        'round': int(next_race_event['RoundNumber']),
        'name': str(next_race_event['EventName']),
        'location': str(next_race_event['Location']),
        'country': str(next_race_event['Country']),
        'raceStartUtc': utc_iso,
        'totalRounds': int(total_rounds),
    })

@app.route('/api/race-dates')
def race_dates():
    return jsonify({
        'eventDate': str(last_race['EventDate']),
        'session5Date': str(last_race['Session5Date']),
        'year': int(year),
        'country': str(country),
        'location': str(location),
        'round_number': int(round_number),
        'event': str(event_name),
        'official_event_name': str(official_event_name),
        'total_rounds': int(total_rounds)
    })

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001)
