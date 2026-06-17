import sqlite3
import json
from pathlib import Path

DB_PATH = Path(__file__).parent / 'f1_data.db'

def _conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with _conn() as conn:
        conn.execute('''
            CREATE TABLE IF NOT EXISTS race_sessions (
                year        INTEGER NOT NULL,
                round       INTEGER NOT NULL,
                session     TEXT NOT NULL,
                data        TEXT NOT NULL,
                event_name  TEXT,
                fetched_at  TEXT DEFAULT (datetime('now')),
                PRIMARY KEY (year, round, session)
            )
        ''')

def db_get(year, round_number, session):
    with _conn() as conn:
        row = conn.execute(
            'SELECT data FROM race_sessions WHERE year=? AND round=? AND session=?',
            (int(year), int(round_number), session)
        ).fetchone()
        return json.loads(row['data']) if row else None

def db_put(year, round_number, session, data, event_name=''):
    with _conn() as conn:
        conn.execute('''
            INSERT OR REPLACE INTO race_sessions (year, round, session, data, event_name, fetched_at)
            VALUES (?, ?, ?, ?, ?, datetime('now'))
        ''', (int(year), int(round_number), session, json.dumps(data), event_name))

init_db()
