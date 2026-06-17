import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Trophy, Medal, Award } from "lucide-react"
import { useF1Data } from "../context/F1DataContext"

export function ChampionshipStandings() {
  const { data: standingsData, loading, error } = useF1Data().standings

  if (loading) return <p className="text-neutral-400 p-4">Loading standings...</p>
  if (error) return <p className="text-red-500 p-4">Failed to load standings: {error}</p>

  const drivers = standingsData?.drivers ?? []
  const constructors = standingsData?.constructors ?? []

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="bg-card shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-red-500" />
            <CardTitle className="text-xl font-bold text-neutral-100">DRIVERS' CHAMPIONSHIP</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {drivers.map((driver, index) => (
            <div
              key={driver.position}
              className="flex items-center gap-4 p-3 rounded-lg bg-muted hover:bg-muted/70 transition-colors border border-neutral-800"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {index === 0 && <Trophy className="h-4 w-4 text-yellow-400" />}
                  {index === 1 && <Medal className="h-4 w-4 text-gray-400" />}
                  {index === 2 && <Award className="h-4 w-4 text-amber-600" />}
                  <span className="font-bold text-lg w-6 text-neutral-100">{driver.position}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-neutral-100 border-2 border-red-900">
                  {driver.code}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold truncate text-neutral-100">{driver.driver}</span>
                  </div>
                  <p className="text-sm text-neutral-400 truncate">{driver.team}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-red-500">{driver.points}</p>
                <p className="text-xs text-neutral-400">PTS</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-card shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-400" />
            <CardTitle className="text-xl font-bold text-neutral-100">CONSTRUCTORS' CHAMPIONSHIP</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {constructors.map((team, index) => (
            <div
              key={team.position}
              className="flex items-center gap-4 p-3 rounded-lg bg-muted hover:bg-muted/70 transition-colors border border-neutral-800"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {index === 0 && <Trophy className="h-4 w-4 text-yellow-400" />}
                  {index === 1 && <Medal className="h-4 w-4 text-gray-400" />}
                  {index === 2 && <Award className="h-4 w-4 text-amber-600" />}
                  <span className="font-bold text-lg w-6 text-neutral-100">{team.position}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold truncate text-neutral-100">{team.team}</p>
                  <p className="text-xs text-neutral-400">{team.wins} win{team.wins !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-blue-400">{team.points}</p>
                <p className="text-xs text-neutral-400">PTS</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
