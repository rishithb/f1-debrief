import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Trophy, ArrowUp, ArrowDown, Minus } from "lucide-react"
import { useF1Data } from "../context/F1DataContext"

function PositionChangeIcon({ change }) {
  if (change > 0) return <ArrowUp className="h-4 w-4 text-green-400" />
  if (change < 0) return <ArrowDown className="h-4 w-4 text-red-500" />
  return <Minus className="h-4 w-4 text-muted-foreground" />
}

export function RaceResults() {
  const { data: raceData, loading, error } = useF1Data().race

  if (loading) return <p className="text-neutral-400 p-4">Loading race results...</p>
  if (error) return <p className="text-red-500 p-4">Failed to load race results: {error}</p>

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Race Results
        </CardTitle>
        <CardDescription>Final positions, grid positions, points awarded, and status</CardDescription>
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
                <TableHead>Status</TableHead>
                <TableHead>Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {raceData.map((driver) => {
                const position = driver.Position
                const gridPosition = driver.GridPosition
                const positionChange = gridPosition - position
                const isFinished = driver.Status === 'Finished' || driver.Status?.startsWith('+')
                return (
                  <TableRow key={position}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {position === 1 && <Trophy className="h-4 w-4 text-yellow-400" />}
                        {position}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold">
                          {driver.DriverNumber}
                        </div>
                        <span className="font-medium">{driver.FullName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{driver.TeamName}</TableCell>
                    <TableCell className="font-medium">{gridPosition}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <PositionChangeIcon change={positionChange} />
                        <span className="text-sm">
                          {positionChange > 0 && "+"}{positionChange}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={isFinished ? "secondary" : "destructive"} className="font-semibold">
                        {driver.Status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-semibold">
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
