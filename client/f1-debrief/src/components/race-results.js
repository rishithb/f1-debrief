import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Trophy, ArrowUp, ArrowDown, Minus } from "lucide-react"
import { useF1Data } from "../context/F1DataContext"
import { getTeamColor, hexAlpha } from "../utils/teamColors"

const COMPOUND_STYLE = {
  SOFT:         { bg: '#e8002d', text: '#fff', label: 'S' },
  MEDIUM:       { bg: '#ffd700', text: '#000', label: 'M' },
  HARD:         { bg: '#e0e0e0', text: '#000', label: 'H' },
  INTERMEDIATE: { bg: '#39b54a', text: '#fff', label: 'I' },
  WET:          { bg: '#0067ff', text: '#fff', label: 'W' },
  UNKNOWN:      { bg: '#555',    text: '#fff', label: '?' },
}

function TireStints({ stints }) {
  if (!stints?.length) return <span className="text-muted-foreground text-xs">—</span>
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {stints.map((s, i) => {
        const style = COMPOUND_STYLE[s.compound] ?? COMPOUND_STYLE.UNKNOWN
        return (
          <span
            key={i}
            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-sm font-bold"
            style={{ backgroundColor: style.bg, color: style.text }}
          >
            {style.label}<span className="opacity-75 font-normal">{s.laps}</span>
          </span>
        )
      })}
    </div>
  )
}

function PositionChangeIcon({ change }) {
  if (change > 0) return <ArrowUp className="h-4 w-4 text-green-400" />
  if (change < 0) return <ArrowDown className="h-4 w-4 text-red-500" />
  return <Minus className="h-4 w-4 text-muted-foreground" />
}

export function RaceResults() {
  const { race, stints } = useF1Data()
  const raceData = race.data ?? []
  const stintsData = stints.data ?? {}

  if (race.loading) return <p className="text-neutral-400 p-4">Loading race results...</p>
  if (race.error) return <p className="text-red-500 p-4">Failed to load race results: {race.error}</p>

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          RACE RESULTS
        </CardTitle>
        <CardDescription>Final positions, grid positions, points awarded, and tire strategy</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="border-separate border-spacing-y-1">
            <TableHeader>
              <TableRow className="text-base">
                <TableHead className="w-12">Pos</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Tyres</TableHead>
                <TableHead>Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="font-semibold">
              {raceData.map((driver) => {
                const position = driver.Position
                const gridPosition = driver.GridPosition
                const positionChange = gridPosition - position
                const isDNF = driver.Status !== 'Finished' && driver.Status !== 'Lapped'
                const teamColor = getTeamColor(driver.TeamName)
                const driverStints = stintsData[driver.DriverCode] ?? []
                return (
                  <TableRow key={position} className="text-base">
                    <TableCell className="font-medium text-base border-l-4" style={{ borderLeftColor: teamColor }}>
                      <div className="flex items-center gap-2">
                        {position === 1 && <Trophy className="h-4 w-4 text-yellow-400" />}
                        {position}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border"
                          style={{ backgroundColor: hexAlpha(teamColor, 0.15), borderColor: teamColor, color: teamColor }}
                        >
                          {driver.DriverNumber}
                        </div>
                        <span className="font-semibold">{driver.FullName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{driver.TeamName}</TableCell>
                    <TableCell className="font-medium">{gridPosition}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <PositionChangeIcon change={positionChange} />
                        <span className="text-base">
                          {positionChange > 0 && "+"}{positionChange}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {isDNF ? (
                        <Badge variant="destructive" className="font-semibold">DNF</Badge>
                      ) : (
                        <span className="font-mono text-base">{driver.RaceTime ?? '—'}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <TireStints stints={driverStints} />
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-semibold text-sm">
                        {driver.Points}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
