import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Trophy, Medal, Award } from "lucide-react"

const driversStandings = [
  {
    position: 1,
    driver: "Max Verstappen",
    team: "Red Bull Racing",
    points: 69,
    country: "🇳🇱",
    number: "1",
    photo: "/formula-one-driver.png",
  },
  {
    position: 2,
    driver: "Charles Leclerc",
    team: "Ferrari",
    points: 51,
    country: "🇲🇨",
    number: "16",
    photo: "/charles-leclerc.jpg",
  },
  {
    position: 3,
    driver: "Carlos Sainz",
    team: "Ferrari",
    points: 42,
    country: "🇪🇸",
    number: "55",
    photo: "/carlos-sainz.jpg",
  },
  {
    position: 4,
    driver: "Sergio Pérez",
    team: "Red Bull Racing",
    points: 35,
    country: "🇲🇽",
    number: "11",
    photo: "/sergio-perez.jpg",
  },
  {
    position: 5,
    driver: "George Russell",
    team: "Mercedes",
    points: 28,
    country: "🇬🇧",
    number: "63",
    photo: "/george-russell.jpg",
  },
]

const constructorsStandings = [
  {
    position: 1,
    team: "Red Bull Racing",
    points: 104,
    logo: "/red-bull-logo.jpg",
    drivers: ["Max Verstappen", "Sergio Pérez"],
  },
  {
    position: 2,
    team: "Ferrari",
    points: 93,
    logo: "/ferrari-logo.jpg",
    drivers: ["Charles Leclerc", "Carlos Sainz"],
  },
  {
    position: 3,
    team: "Mercedes",
    points: 52,
    logo: "/mercedes-logo.png",
    drivers: ["George Russell", "Lewis Hamilton"],
  },
  {
    position: 4,
    team: "McLaren",
    points: 24,
    logo: "/mclaren-logo.jpg",
    drivers: ["Lando Norris", "Oscar Piastri"],
  },
  {
    position: 5,
    team: "Aston Martin",
    points: 18,
    logo: "/aston-martin-logo.jpg",
    drivers: ["Fernando Alonso", "Lance Stroll"],
  },
]

export function ChampionshipStandings() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="bg-gradient-to-br from-white to-slate-50 border-red-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-red-600" />
            <CardTitle className="text-xl font-bold text-slate-900">DRIVERS' CHAMPIONSHIP</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {driversStandings.map((driver, index) => (
            <div
              key={driver.position}
              className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {index === 0 && <Trophy className="h-4 w-4 text-yellow-500" />}
                  {index === 1 && <Medal className="h-4 w-4 text-gray-400" />}
                  {index === 2 && <Award className="h-4 w-4 text-amber-600" />}
                  <span className="font-bold text-lg w-6 text-slate-900">{driver.position}</span>
                </div>
                <img
                  src={driver.photo || "/placeholder.svg"}
                  alt={driver.driver}
                  className="w-10 h-10 rounded-full object-cover border-2 border-red-200"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold truncate text-slate-900">{driver.driver}</span>
                    <span className="text-lg">{driver.country}</span>
                  </div>
                  <p className="text-sm text-slate-600 truncate">{driver.team}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-red-600">{driver.points}</p>
                <p className="text-xs text-slate-500">PTS</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-white to-slate-50 border-blue-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-xl font-bold text-slate-900">CONSTRUCTORS' CHAMPIONSHIP</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {constructorsStandings.map((team, index) => (
            <div
              key={team.position}
              className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {index === 0 && <Trophy className="h-4 w-4 text-yellow-500" />}
                  {index === 1 && <Medal className="h-4 w-4 text-gray-400" />}
                  {index === 2 && <Award className="h-4 w-4 text-amber-600" />}
                  <span className="font-bold text-lg w-6 text-slate-900">{team.position}</span>
                </div>
                <img
                  src={team.logo || "/placeholder.svg"}
                  alt={`${team.team} logo`}
                  className="w-8 h-8 object-contain"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-bold truncate text-slate-900">{team.team}</p>
                  <p className="text-xs text-slate-600 truncate">{team.drivers.join(" • ")}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-blue-600">{team.points}</p>
                <p className="text-xs text-slate-500">PTS</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
