import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Gauge } from "lucide-react"

const tireUsageData = [
  { compound: "Soft", usage: 35, color: "#ef4444" },
  { compound: "Medium", usage: 45, color: "#f59e0b" },
  { compound: "Hard", usage: 20, color: "#3b82f6" },
]

const pitStopData = [
  { driver: "VER", lap: 18, compound: "Medium → Hard", time: "2.3s", position: "2nd → 2nd" },
  { driver: "LEC", lap: 16, compound: "Medium → Hard", time: "2.8s", position: "1st → 3rd" },
  { driver: "SAI", lap: 17, compound: "Medium → Hard", time: "2.5s", position: "3rd → 4th" },
  { driver: "PER", lap: 19, compound: "Medium → Hard", time: "2.4s", position: "4th → 5th" },
  { driver: "RUS", lap: 20, compound: "Medium → Hard", time: "2.7s", position: "5th → 6th" },
]

const strategyAnalysis = [
  {
    strategy: "Two-Stop Medium-Hard-Medium",
    drivers: ["VER", "LEC", "SAI"],
    effectiveness: 85,
    description: "Optimal strategy for track conditions",
  },
  {
    strategy: "One-Stop Medium-Hard",
    drivers: ["PER", "RUS"],
    effectiveness: 72,
    description: "Conservative approach, lost time in final stint",
  },
  {
    strategy: "Three-Stop Aggressive",
    drivers: ["HAM"],
    effectiveness: 45,
    description: "High-risk strategy that didn't pay off",
  },
]

export function TireStrategy() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5" />
              Tire Compound Usage
            </CardTitle>
            <CardDescription>Distribution of tire compounds used during the race</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={tireUsageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="usage"
                >
                  {tireUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {tireUsageData.map((tire) => (
                <div key={tire.compound} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tire.color }} />
                  <span className="text-sm">
                    {tire.compound} ({tire.usage}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Strategy Effectiveness</CardTitle>
            <CardDescription>Analysis of different tire strategies used</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {strategyAnalysis.map((strategy, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{strategy.strategy}</p>
                    <p className="text-xs text-muted-foreground">{strategy.description}</p>
                    <div className="flex gap-1 mt-1">
                      {strategy.drivers.map((driver) => (
                        <Badge key={driver} variant="outline" className="text-xs">
                          {driver}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm font-semibold">{strategy.effectiveness}%</span>
                </div>
                <Progress value={strategy.effectiveness} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pit Stop Analysis</CardTitle>
          <CardDescription>Detailed breakdown of all pit stops during the race</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Driver</th>
                  <th className="text-left py-2">Lap</th>
                  <th className="text-left py-2">Tire Change</th>
                  <th className="text-left py-2">Stop Time</th>
                  <th className="text-left py-2">Position Change</th>
                </tr>
              </thead>
              <tbody>
                {pitStopData.map((stop, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-2">
                      <Badge variant="outline">{stop.driver}</Badge>
                    </td>
                    <td className="py-2 font-mono">{stop.lap}</td>
                    <td className="py-2 text-sm">{stop.compound}</td>
                    <td className="py-2 font-mono font-semibold">{stop.time}</td>
                    <td className="py-2 text-sm">{stop.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Strategic Insights</CardTitle>
          <CardDescription>AI-generated analysis of tire strategy decisions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">🎯 Undercut Successful</h4>
            <p className="text-sm text-muted-foreground">
              Verstappen's early pit stop on lap 18 allowed him to undercut Leclerc, gaining track position that he
              maintained for the remainder of the race.
            </p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">⚠️ Strategy Risk</h4>
            <p className="text-sm text-muted-foreground">
              Ferrari's decision to pit Leclerc later than Verstappen cost them the race win. The 2-lap window proved
              crucial in the final outcome.
            </p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold text-sm mb-2">📊 Tire Degradation</h4>
            <p className="text-sm text-muted-foreground">
              Medium compound showed optimal performance for 18-20 laps, while hard tires maintained consistent pace
              throughout their stint with minimal degradation.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
