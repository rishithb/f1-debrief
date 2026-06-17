import fastf1
from fastf1.events import get_event_schedule
from datetime import datetime, timezone

# global variables to store the year and country (most recent session)
now = datetime.now(timezone.utc)
current_year = now.year

schedule = get_event_schedule(current_year)
finished_races = schedule[schedule['Session5Date'] < now]
print(finished_races[['EventDate', 'Country', 'EventName', 'Session5Date']])

# Early in a new season there may be no completed races yet.
if finished_races.empty:
	schedule = get_event_schedule(current_year - 1)
	finished_races = schedule[schedule['Session5Date'] < now]

total_rounds = len(schedule)

last_race = finished_races.iloc[-1]
year = last_race['EventDate'].year
country = last_race['Country']
official_event_name = last_race['OfficialEventName']
event_name = last_race['EventName']
location = last_race['Location']
round_number = last_race['RoundNumber']

print(last_race)
print(year)
print(country)
print(official_event_name)
print(event_name)
print(location)
print(round_number)
