import fastf1
from fastf1.ergast import Ergast 
from f1 import year

def get_standings():
    standings = get_driver_standings(2025)

    return standings

ergast = Ergast()
standings = ergast.get_driver_standings(2025)
print(standings)