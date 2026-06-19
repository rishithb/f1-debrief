import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Trophy, Medal, Award } from "lucide-react"
import { useF1Data } from "../context/F1DataContext"
import { getTeamColor, hexAlpha } from "../utils/teamColors"

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
        <CardContent className="space-y-3">
          {drivers.map((driver, index) => {
            const teamColor = getTeamColor(driver.team)
            return (
              <div key={driver.position} className="flex items-center gap-3">
                <span className="font-bold text-base w-7 text-right text-neutral-400 shrink-0">
                  {driver.position}
                </span>
                <div
                  className="flex-1 flex items-center gap-3 p-3 rounded-lg border border-neutral-800/60 border-l-4 transition-opacity hover:opacity-90"
                  style={{
                    borderLeftColor: teamColor,
                    background: `linear-gradient(135deg, ${hexAlpha(teamColor, 0.7)} 0%, ${hexAlpha(teamColor, 0.25)} 100%)`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 shrink-0"
                    style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff', backgroundColor: 'rgba(255,255,255,0.12)' }}
                  >
                    {driver.code}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold truncate text-white">{driver.driver}</p>
                    <p className="text-sm truncate text-white/85">{driver.team}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-lg text-white">{driver.points}</p>
                    <p className="text-sm text-white/85">PTS</p>
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card className="bg-card shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-400" />
            <CardTitle className="text-xl font-bold text-neutral-100">CONSTRUCTORS' CHAMPIONSHIP</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {constructors.map((team, index) => {
            const teamColor = getTeamColor(team.team)
            return (
              <div key={team.position} className="flex items-center gap-3">
                <span className="font-bold text-base w-7 text-right text-neutral-400 shrink-0">
                  {team.position}
                </span>
                <div
                  className="flex-1 flex items-center gap-3 p-3 rounded-lg border border-neutral-800/60 border-l-4 transition-opacity hover:opacity-90"
                  style={{
                    borderLeftColor: teamColor,
                    background: `linear-gradient(135deg, ${hexAlpha(teamColor, 0.7)} 0%, ${hexAlpha(teamColor, 0.25)} 100%)`,
                  }}
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-bold truncate text-white">{team.team}</p>
                    <p className="text-sm text-white/85">{team.wins} win{team.wins !== 1 ? 's' : ''}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-lg text-white">{team.points}</p>
                    <p className="text-sm text-white/85">PTS</p>
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
