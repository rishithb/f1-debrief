from flask import Flask
from flask_cors import CORS
from qualifying import get_qualifying_results
from race import get_race_results
from standings import get_standings
from flask import jsonify

app = Flask(__name__)
CORS(app)

@app.route('/home')
def home():
    return "Welcome to F1 Debrief!"

@app.route('/qualifying')
def qualifying_results():
    results = get_qualifying_results()
    return jsonify(results)

@app.route('/race')
def race_results():
    results = get_race_results()
    return jsonify(results)

@app.route('/standings')
def standings():
    results = get_standings()
    return jsonify(results)

if __name__ == '__main__':
    app.run()
