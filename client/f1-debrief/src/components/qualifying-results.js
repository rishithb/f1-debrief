import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Clock, Trophy, Target } from "lucide-react"
import { useF1Data } from "../context/F1DataContext"

export function QualifyingResults() {
  const { data: qualifyingData, loading, error } = useF1Data().qualifying

  if (loading) return <p className="text-neutral-400 p-4">Loading qualifying results...</p>
  if (error) return <p className="text-red-500 p-4">Failed to load qualifying results: {error}</p>

  return (
    <div className="space-y-6">
      <Card className="bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-neutral-100">
            <Clock className="h-5 w-5 text-red-500" />
            QUALIFYING RESULTS
          </CardTitle>
          <CardDescription className="text-neutral-400">
            Q1, Q2, Q3 session times with sector breakdown and tire compounds
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 text-neutral-300">POS</TableHead>
                  <TableHead className="text-neutral-300">DRIVER</TableHead>
                  <TableHead className="text-neutral-300">TEAM</TableHead>
                  <TableHead className="text-neutral-300">Q1</TableHead>
                  <TableHead className="text-neutral-300">Q2</TableHead>
                  <TableHead className="text-neutral-300">Q3</TableHead>
                  <TableHead className="text-neutral-300">GAP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {qualifyingData.map((driver) => (
                  <TableRow key={driver.position} className="hover:bg-muted">
                    <TableCell className="font-bold text-lg text-neutral-100">
                      {driver.position === 1 && <Trophy className="h-4 w-4 text-yellow-400 inline mr-1" />}
                      {driver.position}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={driver.photo || "/placeholder.svg"}
                            alt={driver.driver}
                            className="w-10 h-10 rounded-full object-cover border-2 border-red-900"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-neutral-100">{driver.driver}</span>
                            <span className="text-lg">{driver.country}</span>
                          </div>
                          <span className="text-xs text-neutral-400 font-mono">{driver.code}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img
                          src={driver.teamLogo || "/placeholder.svg"}
                          alt={`${driver.team} logo`}
                          className="w-6 h-6 object-contain"
                        />
                        <span className="text-neutral-400">{driver.team}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm text-neutral-300">{driver.Q1 || '-'}</TableCell>
                    <TableCell className="font-mono text-sm text-neutral-300">{driver.Q2 || '-'}</TableCell>
                    <TableCell className="font-mono text-sm font-bold text-red-500">{driver.Q3 || '-'}</TableCell>
                    <TableCell className="font-mono text-sm">
                      <span className="text-neutral-400">{driver.gap || '-'}</span>
                    </TableCell>
                  </TableRow>
                ))}
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
              Q1 ELIMINATION (P16–P20)
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
              Q2 ELIMINATION (P11–P15)
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
