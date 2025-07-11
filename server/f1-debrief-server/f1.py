import fastf1
from fastf1.events import get_event_schedule
from datetime import datetime, timezone

# global variables to store the year and country (most recent session)
schedule = get_event_schedule(2025)
now = datetime.now(timezone.utc)

finished_races = schedule[schedule['Session5Date'] < now]
last_race = finished_races.iloc[-1]
year = last_race['EventDate'].year
country = last_race['Country']

