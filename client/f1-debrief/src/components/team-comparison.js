import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { TrendingUp, Target, Zap } from "lucide-react"
import { useF1Data } from "../context/F1DataContext"
import { getTeamColor, getTeamFullName, hexAlpha } from "../utils/teamColors"

function H2HBar({ d1Name, d1Wins, d2Name, d2Wins, label, icon: Icon, teamColor }) {
  const total = d1Wins + d2Wins
  const pct1 = total > 0 ? (d1Wins / total) * 100 : 50

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Icon className="h-4 w-4" style={{ color: teamColor }} />
          <span className="font-medium">{label}</span>
        </div>
        <span className="font-mono font-semibold">{d1Wins} – {d2Wins}</span>
      </div>
      <div className="flex h-2 rounded-full overflow-hidden bg-muted">
        <div
          className="transition-all duration-500"
          style={{ width: `${pct1}%`, backgroundColor: teamColor }}
        />
        <div
          className="transition-all duration-500"
          style={{ width: `${100 - pct1}%`, backgroundColor: hexAlpha(teamColor, 0.35) }}
        />
      </div>
      <div className="flex justify-between text-sm font-semibold">
        <span style={{ color: teamColor }}>{d1Name}</span>
        <span style={{ color: hexAlpha(teamColor, 0.6) }}>{d2Name}</span>
      </div>
    </div>
  )
}

function TeamCard({ teamName, constructorPoints, d1, d2, seasonStats }) {
  const teamColor = getTeamColor(teamName)
  const fullName = getTeamFullName(teamName)
  const lastName = (name) => name.split(' ').pop()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5 uppercase tracking-wide">{teamName}</p>
            <CardTitle className="text-lg font-bold leading-tight">{fullName}</CardTitle>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <TrendingUp className="h-4 w-4" style={{ color: teamColor }} />
            <span className="font-bold text-lg" style={{ color: teamColor }}>{constructorPoints}</span>
            <span className="text-sm text-muted-foreground">PTS</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-3 md:grid-cols-2">
          {[d1, d2].map((driver, idx) => {
            const borderColor = idx === 0 ? teamColor : hexAlpha(teamColor, 0.5)
            const textColor = idx === 0 ? teamColor : hexAlpha(teamColor, 0.6)
            const bg = idx === 0
              ? `linear-gradient(90deg, ${hexAlpha(teamColor, 0.30)} 50%, #111116 100%)`
              : `linear-gradient(90deg, #0e0e12 -50%, ${hexAlpha(teamColor, 0.30)} 100%)`
            return (
              <div
                key={driver.code}
                className="p-4 rounded-lg border"
                style={{ borderColor, background: bg }}
              >
                <p className="font-bold text-sm uppercase tracking-wide" style={{ color: textColor }}>
                  {driver.code}
                </p>
                <p className="font-semibold text-base mt-0.5">{driver.name}</p>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-3xl font-bold" style={{ color: textColor }}>
                    {driver.points}
                  </span>
                  <span className="text-sm text-muted-foreground">points</span>
                </div>
              </div>
            )
          })}
        </div>

        {seasonStats && (
          <div className="space-y-4 pt-1">
            <H2HBar
              d1Name={lastName(d1.name)}
              d1Wins={seasonStats.qual_h2h?.[d1.code] ?? 0}
              d2Name={lastName(d2.name)}
              d2Wins={seasonStats.qual_h2h?.[d2.code] ?? 0}
              label="Qualifying H2H"
              icon={Target}
              teamColor={teamColor}
            />
            <H2HBar
              d1Name={lastName(d1.name)}
              d1Wins={seasonStats.race_h2h?.[d1.code] ?? 0}
              d2Name={lastName(d2.name)}
              d2Wins={seasonStats.race_h2h?.[d2.code] ?? 0}
              label="Race H2H"
              icon={Zap}
              teamColor={teamColor}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function TeamComparison() {
  const { standings, race, teamStats } = useF1Data()

  const constructors = standings.data?.constructors ?? []
  const drivers = standings.data?.drivers ?? []
  const raceData = race.data ?? []
  const stats = teamStats.data ?? {}

  if (standings.loading || teamStats.loading) {
    return <p className="text-neutral-400 p-4">Loading team data...</p>
  }
  if (standings.error) {
    return <p className="text-red-500 p-4">Failed to load team data.</p>
  }

  const teams = constructors.map(constructor => {
    const teamName = constructor.team
    const teamDrivers = drivers
      .filter(d => d.team === teamName)
      .map(d => ({
        name: d.driver,
        points: d.points,
        code: raceData.find(r => r.FullName === d.driver)?.DriverCode ?? '?',
      }))

    return {
      teamName,
      constructorPoints: constructor.points,
      d1: teamDrivers[0],
      d2: teamDrivers[1],
      seasonStats: stats[teamName] ?? null,
    }
  }).filter(t => t.d1 && t.d2)

  return (
    <div className="space-y-6">
      {teams.map(team => (
        <TeamCard key={team.teamName} {...team} />
      ))}
    </div>
  )
}
