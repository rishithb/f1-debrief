import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { AlertCircle, Zap, Target, TrendingUp, Flag, Trophy } from "lucide-react"
import { useF1Data } from "../context/F1DataContext"

const TYPE_CONFIG = {
  overtake: { color: "blue", icon: TrendingUp, label: "Overtake" },
  strategy: { color: "yellow", icon: Target, label: "Strategy" },
  incident: { color: "red", icon: AlertCircle, label: "Incident" },
  fastest: { color: "purple", icon: Zap, label: "Fastest Lap" },
  sc: { color: "yellow", icon: Flag, label: "Safety Car" },
  championship: { color: "green", icon: Trophy, label: "Championship" },
}

const COLOR_CLASSES = {
  blue: {
    card: "bg-blue-950 border-blue-900 text-blue-100",
    icon: "text-blue-400",
    badge: "bg-blue-950 text-blue-300 border-blue-900",
  },
  yellow: {
    card: "bg-yellow-950 border-yellow-900 text-yellow-100",
    icon: "text-yellow-400",
    badge: "bg-yellow-950 text-yellow-300 border-yellow-900",
  },
  red: {
    card: "bg-red-950 border-red-900 text-red-100",
    icon: "text-red-400",
    badge: "bg-red-950 text-red-300 border-red-900",
  },
  purple: {
    card: "bg-purple-950 border-purple-900 text-purple-100",
    icon: "text-purple-400",
    badge: "bg-purple-950 text-purple-300 border-purple-900",
  },
  green: {
    card: "bg-green-950 border-green-900 text-green-100",
    icon: "text-green-400",
    badge: "bg-green-950 text-green-300 border-green-900",
  },
}

function HighlightCard({ highlight }) {
  const config = TYPE_CONFIG[highlight.type] || TYPE_CONFIG.strategy
  const colors = COLOR_CLASSES[config.color]
  const Icon = config.icon

  return (
    <div className={`p-4 rounded-lg border ${colors.card}`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${colors.icon}`} />
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="font-semibold text-base">{highlight.title}</h4>
            {highlight.lap > 0 && (
              <span className="text-sm opacity-60 flex-shrink-0">Lap {highlight.lap}</span>
            )}
          </div>
          <p className="text-base mb-2 opacity-90 leading-relaxed">{highlight.description}</p>
        </div>
      </div>
    </div>
  )
  /* temporarily removed highlight type display
   <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${colors.badge}`}>
            {config.label}
            {highlight.drivers?.length > 0 && ` — ${highlight.drivers.join(', ')}`}
          </span> 
  */
}

function HighlightsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="p-4 rounded-lg border border-muted bg-muted/20 animate-pulse">
          <div className="flex gap-3">
            <div className="h-5 w-5 rounded bg-muted mt-0.5" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-5/6" />
              <div className="h-5 bg-muted rounded w-1/3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function RaceEventSummary() {
  const { raceDates, highlights: { data, loading, error } } = useF1Data()

  const eventName = raceDates.data?.event || "Race"
  const summary = data?.summary || ""
  const highlights = data?.highlights || (Array.isArray(data) ? data : [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">AI Race Analysis</CardTitle>
          <CardDescription>
            Highlights and race insights from the {eventName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && <HighlightsSkeleton />}
          {error && (
            <div className="text-center py-8 text-muted-foreground">
              <AlertCircle className="h-8 w-8 mx-auto mb-2 text-red-400" />
              <p>Failed to load highlights. Check that the Gemini API key is configured.</p>
            </div>
          )}
          {!loading && !error && (
            <div className="space-y-6">
              {summary && (
                <p className="text-base leading-relaxed text-muted-foreground border-l-2 border-muted pl-4">
                  {summary}
                </p>
              )}
              {highlights.length > 0 && (
                <div className="grid gap-4 md:grid-cols-2">
                  {highlights.map((highlight, idx) => (
                    <HighlightCard key={idx} highlight={highlight} />
                  ))}
                </div>
              )}
              {highlights.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No highlights available for this race.</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
