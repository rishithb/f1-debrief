import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { TrendingUp, Target, Zap } from "lucide-react"

const teamComparisons = [
  {
    team: "Red Bull Racing",
    logo: "/red-bull-logo.jpg",
    totalPoints: 104,
    drivers: [
      {
        name: "Max Verstappen",
        country: "🇳🇱",
        photo: "/formula-one-driver.png",
        points: 69,
        qualifyingH2H: { wins: 2, total: 3 },
        raceH2H: { wins: 3, total: 3 },
      },
      {
        name: "Sergio Pérez",
        country: "🇲🇽",
        photo: "/sergio-perez.jpg",
        points: 35,
        qualifyingH2H: { wins: 1, total: 3 },
        raceH2H: { wins: 0, total: 3 },
      },
    ],
  },
  {
    team: "Ferrari",
    logo: "/ferrari-logo.jpg",
    totalPoints: 93,
    drivers: [
      {
        name: "Charles Leclerc",
        country: "🇲🇨",
        photo: "/charles-leclerc.jpg",
        points: 51,
        qualifyingH2H: { wins: 2, total: 3 },
        raceH2H: { wins: 2, total: 3 },
      },
      {
        name: "Carlos Sainz",
        country: "🇪🇸",
        photo: "/carlos-sainz.jpg",
        points: 42,
        qualifyingH2H: { wins: 1, total: 3 },
        raceH2H: { wins: 1, total: 3 },
      },
    ],
  },
]

export function TeamComparison() {
  return (
    <div className="space-y-6">
      {teamComparisons.map((team) => (
        <Card key={team.team} className="bg-gradient-to-br from-white to-slate-50 border-slate-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={team.logo || "/placeholder.svg"}
                  alt={`${team.team} logo`}
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <CardTitle className="text-xl font-bold">{team.team}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <TrendingUp className="h-4 w-4 text-red-600" />
                    <span className="font-bold text-red-600">{team.totalPoints} PTS</span>
                    <span className="text-sm text-slate-600">Combined</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {team.drivers.map((driver) => (
                <div key={driver.name} className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={driver.photo || "/placeholder.svg"}
                      alt={driver.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-slate-200"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{driver.name}</h3>
                        <span className="text-lg">{driver.country}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold text-lg text-blue-600">{driver.points}</span>
                        <span className="text-sm text-slate-600">points</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Qualifying H2H</span>
                      </div>
                      <Badge variant="secondary" className="font-mono bg-slate-100 text-slate-700">
                        {driver.qualifyingH2H.wins} - {driver.qualifyingH2H.total - driver.qualifyingH2H.wins}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium">Race H2H</span>
                      </div>
                      <Badge variant="secondary" className="font-mono bg-slate-100 text-slate-700">
                        {driver.raceH2H.wins} - {driver.raceH2H.total - driver.raceH2H.wins}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
