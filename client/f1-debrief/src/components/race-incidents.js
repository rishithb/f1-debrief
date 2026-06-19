import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { AlertTriangle, Flag, Zap, AlertCircle } from "lucide-react"
import { useF1Data } from "../context/F1DataContext"

const INCIDENT_ICON = {
  "Safety Car": Flag,
  "VSC": Flag,
  "Red Flag": Flag,
  "Collision": AlertTriangle,
  "Track Limits": AlertTriangle,
  "Technical": Zap,
  "Mechanical": Zap,
  "Other": AlertCircle,
}

const SEVERITY_CLASSES = {
  Info: "bg-blue-950 text-blue-300 border-blue-900",
  Caution: "bg-yellow-950 text-yellow-300 border-yellow-900",
  Warning: "bg-orange-950 text-orange-300 border-orange-900",
  Penalty: "bg-red-950 text-red-300 border-red-900",
}

function SeverityBadge({ severity }) {
  return (
    <Badge className={SEVERITY_CLASSES[severity] || SEVERITY_CLASSES.Info}>
      {severity}
    </Badge>
  )
}

function IncidentsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="border rounded-lg p-4 animate-pulse">
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-3/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function RaceIncidents() {
  const { highlights: { data, loading, error } } = useF1Data()

  const incidents = data?.incidents || []
  const penalties = data?.penalties || []

  const scCount = incidents.filter(i => i.type === 'Safety Car' || i.type === 'VSC').length
  const redFlagCount = incidents.filter(i => i.type === 'Red Flag').length

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
                <div className="text-2xl font-bold text-primary">
                  {loading ? "—" : incidents.length}
                </div>
                <div className="text-sm text-muted-foreground">Total Incidents</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-orange-400">
                  {loading ? "—" : penalties.length}
                </div>
                <div className="text-sm text-muted-foreground">Penalties Issued</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400">
                  {loading ? "—" : scCount}
                </div>
                <div className="text-sm text-muted-foreground">SC / VSC Periods</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-red-400">
                  {loading ? "—" : redFlagCount}
                </div>
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
            {loading && <IncidentsSkeleton />}
            {error && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Failed to load penalty data.
              </p>
            )}
            {!loading && !error && penalties.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No penalties issued.</p>
            )}
            {!loading && penalties.length > 0 && (
              <div className="space-y-3">
                {penalties.map((p, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{p.driver}</p>
                      <p className="text-xs text-muted-foreground">{p.reason}</p>
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0 ml-2">
                      {p.penalty}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Incident Analysis</CardTitle>
          <CardDescription>Race incidents with AI analysis — sourced from FastF1 session data and web search</CardDescription>
        </CardHeader>
        <CardContent>
          {loading && <IncidentsSkeleton />}
          {error && (
            <div className="text-center py-8 text-muted-foreground">
              <AlertCircle className="h-8 w-8 mx-auto mb-2 text-red-400" />
              <p>Failed to load incident data.</p>
            </div>
          )}
          {!loading && !error && incidents.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No incidents recorded for this race.</p>
          )}
          {!loading && incidents.length > 0 && (
            <div className="space-y-4">
              {incidents.map((incident, idx) => {
                const Icon = INCIDENT_ICON[incident.type] || AlertCircle
                return (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-full shrink-0">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {incident.lap > 0 && (
                              <span className="font-semibold text-sm">Lap {incident.lap}</span>
                            )}
                            <Badge variant="outline" className="text-xs">{incident.type}</Badge>
                          </div>
                          {incident.drivers?.length > 0 && (
                            <p className="text-sm font-medium">{incident.drivers.join(', ')}</p>
                          )}
                        </div>
                      </div>
                      <SeverityBadge severity={incident.severity} />
                    </div>
                    <p className="text-sm text-muted-foreground">{incident.description}</p>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
