import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Clock, Trophy, Target } from "lucide-react"
import { useF1Data } from "../context/F1DataContext"
import { getTeamColor, hexAlpha } from "../utils/teamColors"

export function QualifyingResults() {
  const { data: qualifyingData, loading, error } = useF1Data().qualifying

  if (loading) return <p className="text-neutral-400 p-4">Loading qualifying results...</p>
  if (error) return <p className="text-red-500 p-4">Failed to load qualifying results: {error}</p>

  return (
    <div className="space-y-6">
      <Card className="bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-neutral-100 text-xl">
            QUALIFYING RESULTS
          </CardTitle>
          <CardDescription className="text-neutral-400">
            Q1, Q2, Q3 session times with sector breakdown and tire compounds
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="border-separate border-spacing-y-1">
              <TableHeader>
                <TableRow className="text-base">
                  <TableHead className="w-12">Pos</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Q1</TableHead>
                  <TableHead>Q2</TableHead>
                  <TableHead>Q3</TableHead>
                  <TableHead>Gap</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="font-semibold">
                {qualifyingData.map((driver) => {
                  const teamColor = getTeamColor(driver.team)
                  return (
                  <TableRow key={driver.position} className="text-base">
                    <TableCell className="font-medium text-base border-l-4" style={{ borderLeftColor: teamColor }}>
                      <div className="flex items-center gap-2">
                        {driver.position === 1 && <Trophy className="h-4 w-4 text-yellow-400" />}
                        {driver.position}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border"
                          style={{ backgroundColor: hexAlpha(teamColor, 0.15), borderColor: teamColor, color: teamColor }}
                        >
                          {driver.code}
                        </div>
                        <span className="font-semibold">{driver.driver}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{driver.team}</TableCell>
                    <TableCell><span className="font-mono text-base">{driver.Q1 || '—'}</span></TableCell>
                    <TableCell><span className="font-mono text-base">{driver.Q2 || '—'}</span></TableCell>
                    <TableCell><span className="font-mono text-base font-bold">{driver.Q3 || '—'}</span></TableCell>
                    <TableCell><span className="font-mono text-base text-muted-foreground">{driver.gap || '—'}</span></TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-red-950 border-red-900 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-neutral-100">
              <Target className="h-4 w-4 text-red-500" />
              Q1 ELIMINATION
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {qualifyingData.filter(d => !d.Q2).map(d => (
                <div key={d.position} className="flex justify-between text-neutral-300">
                  <span>{d.position}. {d.driver}</span>
                  <span className="font-mono">{d.Q1 || '-'}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-950 border-orange-900 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-neutral-100">
              <Target className="h-4 w-4 text-orange-400" />
              Q2 ELIMINATION
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {qualifyingData.filter(d => d.Q2 && !d.Q3).map(d => (
                <div key={d.position} className="flex justify-between text-neutral-300">
                  <span>{d.position}. {d.driver}</span>
                  <span className="font-mono">{d.Q2 || '-'}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
