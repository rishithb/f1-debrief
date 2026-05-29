import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { CheckCircle, AlertCircle, TrendingUp, Clock, Zap, Target } from "lucide-react"

const eventFlags = [
  {
    type: "success",
    title: "Undercut Successful",
    description: "Verstappen's early pit stop on lap 18 gained crucial track position",
    icon: CheckCircle,
    impact: "Race-winning move",
  },
  {
    type: "warning",
    title: "Strategy Miscalculation",
    description: "Ferrari's late pit stop cost Leclerc the race victory",
    icon: AlertCircle,
    impact: "Lost 7 points",
  },
  {
    type: "success",
    title: "Clean Racing",
    description: "No major incidents or safety car deployments",
    icon: CheckCircle,
    impact: "Smooth race flow",
  },
  {
    type: "info",
    title: "DRS Effectiveness",
    description: "8 out of 12 overtakes were DRS-assisted on main straight",
    icon: Target,
    impact: "Enhanced racing",
  },
  {
    type: "warning",
    title: "Tire Degradation",
    description: "Higher than expected degradation on soft compound",
    icon: AlertCircle,
    impact: "Strategy adjustments",
  },
  {
    type: "success",
    title: "Pit Stop Excellence",
    description: "Red Bull achieved fastest pit stop at 2.3 seconds",
    icon: Zap,
    impact: "Operational advantage",
  },
]

const raceMetrics = [
  { label: "Total Race Time", value: "1:31:44.742", icon: Clock },
  { label: "Fastest Lap", value: "1:31.447", icon: TrendingUp },
  { label: "Average Speed", value: "204.5 km/h", icon: Target },
  { label: "Lead Changes", value: "3", icon: Zap },
]

function EventFlag({ event }) {
  const colors = {
    success: "bg-green-50 border-green-200 text-green-900",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
    info: "bg-blue-50 border-blue-200 text-blue-900",
    error: "bg-red-50 border-red-200 text-red-900",
  }

  const iconColors = {
    success: "text-green-700",
    warning: "text-yellow-700",
    info: "text-blue-700",
    error: "text-red-700",
  }

  const badgeColors = {
    success: "bg-green-100 text-green-800 border-green-300",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
    info: "bg-blue-100 text-blue-800 border-blue-300",
    error: "bg-red-100 text-red-800 border-red-300",
  }

  return (
    <div className={`p-4 rounded-lg border ${colors[event.type]}`}>
      <div className="flex items-start gap-3">
        <event.icon className={`h-5 w-5 mt-0.5 ${iconColors[event.type]}`} />
        <div className="flex-1">
          <h4 className="font-semibold text-sm mb-1">{event.title}</h4>
          <p className="text-sm mb-2 opacity-90">{event.description}</p>
          <span
            className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${badgeColors[event.type]}`}
          >
            {event.impact}
          </span>
        </div>
      </div>
    </div>
  )
}

export function RaceEventSummary() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Race Metrics</CardTitle>
          <CardDescription>Key statistics from the Bahrain Grand Prix</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {raceMetrics.map((metric, idx) => (
              <div key={idx} className="text-center p-4 bg-muted/50 rounded-lg">
                <metric.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-lg font-bold font-mono">{metric.value}</div>
                <div className="text-xs text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Race Event Analysis</CardTitle>
          <CardDescription>AI-generated insights and key moments from the race</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {eventFlags.map((event, idx) => (
              <EventFlag key={idx} event={event} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekend Summary</CardTitle>
          <CardDescription>Overall assessment of the Bahrain Grand Prix weekend</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              The 2024 Bahrain Grand Prix delivered an exciting season opener with strategic battles taking center
              stage. Max Verstappen's masterful undercut on lap 18 proved to be the race-defining moment, allowing him
              to leapfrog pole-sitter Charles Leclerc and secure his first victory of the season.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Ferrari showed strong pace throughout the weekend but strategic miscalculations cost them valuable points.
              The battle between the top teams promises an exciting championship fight ahead, with Mercedes showing
              signs of improvement but still lacking the ultimate pace to challenge for victories.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              The race was notable for its clean racing and effective DRS zones, producing 12 overtakes and maintaining
              excitement throughout the 57-lap distance. Tire strategy played a crucial role, with teams adapting to
              higher-than-expected degradation rates on the soft compound.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
