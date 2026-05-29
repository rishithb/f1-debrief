import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react"

const raceData = [
  {
    position: 1,
    driver: "Max Verstappen",
    team: "Red Bull Racing",
    code: "VER",
    startPos: 2,
    fastestLap: "1:31.447",
    points: 25,
    tires: ["Medium-18", "Hard-25", "Medium-14"],
    positionChange: +1,
  },
  {
    position: 2,
    driver: "Charles Leclerc",
    team: "Ferrari",
    code: "LEC",
    startPos: 1,
    fastestLap: "1:31.634",
    points: 18,
    tires: ["Medium-16", "Hard-28", "Medium-13"],
    positionChange: -1,
  },
  {
    position: 3,
    driver: "Carlos Sainz",
    team: "Ferrari",
    code: "SAI",
    startPos: 3,
    fastestLap: "1:31.789",
    points: 15,
    tires: ["Medium-17", "Hard-26", "Medium-14"],
    positionChange: 0,
  },
  {
    position: 4,
    driver: "Sergio Perez",
    team: "Red Bull Racing",
    code: "PER",
    startPos: 4,
    fastestLap: "1:31.892",
    points: 12,
    tires: ["Medium-19", "Hard-24", "Medium-14"],
    positionChange: 0,
  },
  {
    position: 5,
    driver: "George Russell",
    team: "Mercedes",
    code: "RUS",
    startPos: 5,
    fastestLap: "1:32.045",
    points: 10,
    tires: ["Medium-20", "Hard-23", "Medium-14"],
    positionChange: 0,
  },
]

function PositionChangeIcon({ change }) {
  if (change > 0) return <TrendingUp className="h-4 w-4 text-green-600" />
  if (change < 0) return <TrendingDown className="h-4 w-4 text-red-600" />
  return <Minus className="h-4 w-4 text-muted-foreground" />
}

function TireCompound({ tire }) {
  const [compound, laps] = tire.split("-")
  const colors = {
    Soft: "bg-chart-1 text-white",
    Medium: "bg-chart-2 text-white",
    Hard: "bg-chart-3 text-white",
  }

  return (
    <div
      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${colors[compound] || "bg-muted"}`}
    >
      <span>{compound.charAt(0)}</span>
      <span>{laps}</span>
    </div>
  )
}

export function RaceResults() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Race Results
        </CardTitle>
        <CardDescription>Final positions, points awarded, and tire strategies</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Pos</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Fastest Lap</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Tire Strategy</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {raceData.map((driver) => (
                <TableRow key={driver.position}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {driver.position === 1 && <Trophy className="h-4 w-4 text-yellow-500" />}
                      {driver.position}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold">
                        {driver.code}
                      </div>
                      <span className="font-medium">{driver.driver}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{driver.team}</TableCell>
                  <TableCell className="font-medium">{driver.startPos}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <PositionChangeIcon change={driver.positionChange} />
                      <span className="text-sm">
                        {driver.positionChange > 0 && "+"}
                        {driver.positionChange}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{driver.fastestLap}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-semibold">
                      {driver.points}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {driver.tires.map((tire, idx) => (
                        <TireCompound key={idx} tire={tire} />
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
