import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { AlertTriangle, Flag, Zap } from "lucide-react"

const incidents = [
  {
    lap: 12,
    type: "Track Limits",
    severity: "Warning",
    driver: "Lewis Hamilton",
    description: "Exceeded track limits at Turn 4, lap time deleted",
    aiAnalysis:
      "Driver pushed too hard on worn tires, compromising corner exit. Strategic adjustment needed for tire management.",
    icon: Flag,
  },
  {
    lap: 23,
    type: "Unsafe Release",
    severity: "5s Penalty",
    driver: "Fernando Alonso",
    description: "Unsafe release during pit stop, impeding Gasly",
    aiAnalysis:
      "Pit crew miscommunication led to premature release. Team radio coordination needs improvement during high-pressure situations.",
    icon: AlertTriangle,
  },
  {
    lap: 34,
    type: "Yellow Flag",
    severity: "Caution",
    driver: "Multiple",
    description: "Debris on track at Turn 8, cleared after 2 laps",
    aiAnalysis:
      "Minor incident caused by tire debris. Marshals responded quickly, minimal impact on race flow and strategy.",
    icon: Flag,
  },
  {
    lap: 45,
    type: "DRS Failure",
    severity: "Technical",
    driver: "Yuki Tsunoda",
    description: "DRS system malfunction, significant pace loss",
    aiAnalysis:
      "Technical failure cost approximately 0.3s per lap on main straight. Team managed situation well with strategic positioning.",
    icon: Zap,
  },
]

const penaltySummary = [
  { driver: "Fernando Alonso", penalty: "5s Time Penalty", reason: "Unsafe Release" },
  { driver: "Lewis Hamilton", penalty: "Lap Time Deleted", reason: "Track Limits" },
  { driver: "Kevin Magnussen", penalty: "Reprimand", reason: "Impeding in Practice" },
]

function SeverityBadge({ severity }) {
  const colors = {
    Warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    "5s Penalty": "bg-orange-100 text-orange-800 border-orange-200",
    "10s Penalty": "bg-red-100 text-red-800 border-red-200",
    Caution: "bg-blue-100 text-blue-800 border-blue-200",
    Technical: "bg-purple-100 text-purple-800 border-purple-200",
  }

  return <Badge className={colors[severity] || "bg-gray-100 text-gray-800 border-gray-200"}>{severity}</Badge>
}

export function RaceIncidents() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Incident Summary
            </CardTitle>
            <CardDescription>Total incidents and penalties during the race</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">4</div>
                <div className="text-sm text-muted-foreground">Total Incidents</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">3</div>
                <div className="text-sm text-muted-foreground">Penalties Issued</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">1</div>
                <div className="text-sm text-muted-foreground">Yellow Flags</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">0</div>
                <div className="text-sm text-muted-foreground">Red Flags</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Penalty Summary</CardTitle>
            <CardDescription>All penalties issued during the race weekend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {penaltySummary.map((penalty, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{penalty.driver}</p>
                    <p className="text-xs text-muted-foreground">{penalty.reason}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {penalty.penalty}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Incident Analysis</CardTitle>
          <CardDescription>AI-powered analysis of race incidents and their impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {incidents.map((incident, idx) => (
              <div key={idx} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-full">
                      <incident.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">Lap {incident.lap}</span>
                        <Badge variant="outline" className="text-xs">
                          {incident.type}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium">{incident.driver}</p>
                    </div>
                  </div>
                  <SeverityBadge severity={incident.severity} />
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm mb-1">Incident Description</h4>
                    <p className="text-sm text-muted-foreground">{incident.description}</p>
                  </div>

                  <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                    <h4 className="font-medium text-sm mb-1 flex items-center gap-2">
                      <Zap className="h-3 w-3" />
                      AI Analysis
                    </h4>
                    <p className="text-sm text-muted-foreground">{incident.aiAnalysis}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
