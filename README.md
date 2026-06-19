# F1 Debrief

A race weekend dashboard that pulls live F1 data and generates AI-powered analysis for the most recent Grand Prix.

## Stack

**Backend** - Flask (Python), FastF1, Ergast API, Google Gemini 2.5, SQLite cache  
**Frontend** - React, Tailwind CSS v4, shadcn/ui, Lucide icons

---

## Features

- **Overview** - race winner, pole position, fastest lap, and an AI-generated race narrative with highlight cards
- **Race** - full finishing order with interval times, lapped gaps, DNF badges, and fastest lap indicator
- **Qualifying** - Q1/Q2/Q3 results with sector times
- **Teams** - season-long H2H stats (qualifying and race) per team, with driver points and team colors
- **Standings** - drivers' and constructors' championship tables
- **Next race countdown** - live timer to the next race start (UTC-corrected)


## Backend Setup

```bash
cd server/f1-debrief-server
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file:

```
GEMINI_API_KEY=your_key_here
```

Run the server:

```bash
python app.py          # dev, port 5001
# or
gunicorn app:app       # production
```

### API Endpoints

| Endpoint | Description |
|---|---|
| `GET /api/race` | Race results with interval times |
| `GET /api/qualifying` | Qualifying results |
| `GET /api/standings` | Driver + constructor standings |
| `GET /api/highlights` | AI race summary, highlights, incidents, penalties |
| `GET /api/team-stats` | Season H2H per team |
| `GET /api/pit-stops` | Pit stop data |
| `GET /api/race-dates` | Current race event metadata |
| `GET /api/next-race` | Next race name, circuit, and UTC start time |

All endpoints cache results in `f1_data.db` (SQLite) after the first successful fetch.

---

## Frontend Setup

```bash
cd client/f1-debrief
npm install
```

Create a `.env` file:

```
REACT_APP_API_URL=http://localhost:5001
```

```bash
npm start    # dev server on port 3000
npm run build
```

---

## Deployment

- **Backend** - EC2 instance running gunicorn, managed via systemd
- **Frontend** - S3 static hosting + CloudFront distribution

Set `REACT_APP_API_URL` in the frontend build environment to point to the EC2 server URL.

After deploying a new frontend build, invalidate the CloudFront cache:

```bash
aws cloudfront create-invalidation --distribution-id <ID> --paths "/*"
```

---

## Caching

Results are cached in SQLite (`f1_data.db`) keyed by `(year, round, session_name)`. To force a fresh fetch for a specific session, delete the relevant row:

```sql
DELETE FROM race_sessions WHERE session = 'highlights' AND year = 2026 AND round = 7;
```
