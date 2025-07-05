from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/home')
def home():
    return "Welcome to F1 Debrief!"

if __name__ == '__main__':
    app.run
