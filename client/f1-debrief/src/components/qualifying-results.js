import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Clock, Trophy, Target } from "lucide-react"

const qualifyingData = [
  {
    position: 1,
    driver: "Charles Leclerc",
    team: "Ferrari",
    code: "LEC",
    number: "16",
    country: "🇲🇨",
    photo: "/charles-leclerc-headshot.jpg",
    teamLogo: "/ferrari-logo.jpg",
    q1: "1:30.252",
    q2: "1:29.735",
    q3: "1:29.179",
    tire: "Soft",
    delta: "0.000",
    sectors: ["28.1", "31.2", "29.9"],
  },
  {
    position: 2,
    driver: "Max Verstappen",
    team: "Red Bull Racing",
    code: "VER",
    number: "1",
    country: "🇳🇱",
    photo: "/max-verstappen-headshot.jpg",
    teamLogo: "/red-bull-logo.jpg",
    q1: "1:30.104",
    q2: "1:29.682",
    q3: "1:29.204",
    tire: "Soft",
    delta: "+0.025",
    sectors: ["28.0", "31.3", "29.9"],
  },
  {
    position: 3,
    driver: "Carlos Sainz",
    team: "Ferrari",
    code: "SAI",
    number: "55",
    country: "🇪🇸",
    photo: "/carlos-sainz.jpg",
    teamLogo: "/ferrari-logo.jpg",
    q1: "1:30.421",
    q2: "1:29.891",
    q3: "1:29.567",
    tire: "Soft",
    delta: "+0.388",
    sectors: ["28.2", "31.4", "30.0"],
  },
  {
    position: 4,
    driver: "Sergio Perez",
    team: "Red Bull Racing",
    code: "PER",
    number: "11",
    country: "🇲🇽",
    photo: "/sergio-perez.jpg",
    teamLogo: "/red-bull-logo.jpg",
    q1: "1:30.398",
    q2: "1:29.945",
    q3: "1:29.723",
    tire: "Soft",
    delta: "+0.544",
    sectors: ["28.3", "31.5", "29.9"],
  },
  {
    position: 5,
    driver: "George Russell",
    team: "Mercedes",
    code: "RUS",
    number: "63",
    country: "🇬🇧",
    photo: "/george-russell.jpg",
    teamLogo: "/mercedes-logo.png",
    q1: "1:30.567",
    q2: "1:30.012",
    q3: "1:29.834",
    tire: "Soft",
    delta: "+0.655",
    sectors: ["28.4", "31.4", "30.0"],
  },
]

export function QualifyingResults() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-white to-slate-50 border-red-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <Clock className="h-5 w-5 text-red-600" />
            QUALIFYING RESULTS
          </CardTitle>
          <CardDescription className="text-slate-600">
            Q1, Q2, Q3 session times with sector breakdown and tire compounds
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 text-slate-700">POS</TableHead>
                  <TableHead className="text-slate-700">DRIVER</TableHead>
                  <TableHead className="text-slate-700">TEAM</TableHead>
                  <TableHead className="text-slate-700">Q1</TableHead>
                  <TableHead className="text-slate-700">Q2</TableHead>
                  <TableHead className="text-slate-700">Q3</TableHead>
                  <TableHead className="text-slate-700">TIRE</TableHead>
                  <TableHead className="text-slate-700">DELTA</TableHead>
                  <TableHead className="text-slate-700">SECTORS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {qualifyingData.map((driver) => (
                  <TableRow key={driver.position} className="hover:bg-slate-50">
                    <TableCell className="font-bold text-lg text-slate-900">
                      {driver.position === 1 && <Trophy className="h-4 w-4 text-yellow-500 inline mr-1" />}
                      {driver.position}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={driver.photo || "/placeholder.svg"}
                            alt={driver.driver}
                            className="w-10 h-10 rounded-full object-cover border-2 border-red-200"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{driver.driver}</span>
                            <span className="text-lg">{driver.country}</span>
                          </div>
                          <span className="text-xs text-slate-500 font-mono">{driver.code}</span>
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
                        <span className="text-slate-600">{driver.team}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm text-slate-700">{driver.q1}</TableCell>
                    <TableCell className="font-mono text-sm text-slate-700">{driver.q2}</TableCell>
                    <TableCell className="font-mono text-sm font-bold text-red-600">{driver.q3}</TableCell>
                    <TableCell>
                      <Badge className="bg-red-100 text-red-800 border-red-200">{driver.tire}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      <span className={driver.delta === "0.000" ? "text-red-600 font-bold" : "text-slate-600"}>
                        {driver.delta}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 text-xs font-mono">
                        {driver.sectors.map((sector, idx) => (
                          <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs">
                            {sector}
                          </span>
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

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-slate-900">
              <Target className="h-4 w-4 text-red-600" />
              Q1 ELIMINATION
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-700">
                <span>16. Logan Sargeant</span>
                <span className="font-mono">1:31.254</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>17. Kevin Magnussen</span>
                <span className="font-mono">1:31.456</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>18. Valtteri Bottas</span>
                <span className="font-mono">1:31.789</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-slate-900">
              <Target className="h-4 w-4 text-orange-600" />
              Q2 ELIMINATION
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-700">
                <span>11. Nico Hulkenberg</span>
                <span className="font-mono">1:30.456</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>12. Daniel Ricciardo</span>
                <span className="font-mono">1:30.567</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>13. Yuki Tsunoda</span>
                <span className="font-mono">1:30.678</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2 text-slate-900">
              <Clock className="h-4 w-4 text-blue-600" />
              SESSION STATS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-700">
                <span>Total Laps</span>
                <span className="font-bold">127</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Red Flags</span>
                <span className="font-bold text-red-600">0</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Yellow Flags</span>
                <span className="font-bold text-yellow-600">2</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
