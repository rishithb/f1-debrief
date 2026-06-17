from flask import Flask, jsonify
from flask_cors import CORS
from qualifying import get_qualifying_results
from race import get_race_results
from standings import get_standings
from highlights import get_highlights
from f1 import year, country, last_race, official_event_name, event_name, location, round_number, total_rounds

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
