import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Zap, Target, TrendingUp } from "lucide-react"

const overtakes = [
  {
    lap: 8,
    overtaker: "Max Verstappen",
    overtaken: "George Russell",
    location: "Turn 1",
    type: "DRS Assisted",
    difficulty: 7,
    description: "Clean overtake on the main straight using DRS advantage",
    analysis:
      "Textbook DRS overtake. Verstappen positioned perfectly in Russell's slipstream through the final sector, gaining crucial speed advantage for the move.",
  },
  {
    lap: 15,
    overtaker: "Charles Leclerc",
    overtaken: "Sergio Perez",
    location: "Turn 4",
    type: "Late Braking",
    difficulty: 9,
    description: "Aggressive late-braking maneuver around the outside",
    analysis:
      "High-risk, high-reward move. Leclerc's superior braking performance and racecraft allowed him to maintain the outside line through the corner complex.",
  },
  {
    lap: 22,
    overtaker: "Carlos Sainz",
    overtaken: "Lewis Hamilton",
    location: "Turn 8-9",
    type: "Strategic",
    difficulty: 6,
    description: "Overtake following Hamilton's pit stop exit",
    analysis:
      "Strategic positioning paid off. Sainz maintained track position during pit window, inheriting the position as Hamilton rejoined behind him.",
  },
  {
    lap: 31,
    overtaker: "Fernando Alonso",
    overtaken: "Lando Norris",
    location: "Turn 1",
    type: "Slipstream",
    difficulty: 5,
    description: "Slipstream-assisted pass on the main straight",
    analysis:
      "Experience showed as Alonso perfectly timed his move. Used Norris's slipstream effectively while managing tire temperatures for the overtake.",
  },
]

const battleSummary = [
  {
    battle: "Verstappen vs Leclerc",
    laps: "1-18",
    winner: "Verstappen",
    intensity: 95,
    description: "Epic battle for the lead with multiple position changes",
  },
  {
    battle: "Russell vs Hamilton",
    laps: "25-40",
    winner: "Russell",
    intensity: 78,
    description: "Teammate battle resolved through strategy",
  },
  {
    battle: "Alonso vs Norris",
    laps: "28-35",
    winner: "Alonso",
    intensity: 82,
    description: "Veteran experience vs young talent",
  },
]

function DifficultyRating({ difficulty }) {
  const color = difficulty >= 8 ? "text-red-500" : difficulty >= 6 ? "text-orange-400" : "text-green-400"
  return (
    <div className="flex items-center gap-2">
      <span className={`font-semibold ${color}`}>{difficulty}/10</span>
      <Progress value={difficulty * 10} className="w-16 h-2" />
    </div>
  )
}

function TypeBadge({ type }) {
  const colors = {
    "DRS Assisted": "bg-blue-950 text-blue-300 border-blue-900",
    "Late Braking": "bg-red-950 text-red-300 border-red-900",
    Strategic: "bg-green-950 text-green-300 border-green-900",
    Slipstream: "bg-purple-100 text-purple-800 border-purple-200",
  }

  return <Badge className={colors[type] || "bg-gray-100 text-gray-800 border-gray-200"}>{type}</Badge>
}

export function OvertakeBattles() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Overtake Statistics
            </CardTitle>
            <CardDescription>Key metrics from race battles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">Total Overtakes</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-secondary">8</div>
                <div className="text-sm text-muted-foreground">DRS Assisted</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-accent">Turn 1</div>
                <div className="text-sm text-muted-foreground">Most Active Zone</div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-chart-1">7.2</div>
                <div className="text-sm text-muted-foreground">Avg Difficulty</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Battle Intensity</CardTitle>
            <CardDescription>Most exciting battles of the race</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {battleSummary.map((battle, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{battle.battle}</p>
                    <p className="text-xs text-muted-foreground">
                      Laps {battle.laps} • Winner: {battle.winner}
                    </p>
                  </div>
                  <span className="text-sm font-semibold">{battle.intensity}%</span>
                </div>
                <Progress value={battle.intensity} className="h-2" />
                <p className="text-xs text-muted-foreground">{battle.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Overtake Analysis</CardTitle>
          <CardDescription>AI-powered breakdown of key overtaking moves</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {overtakes.map((overtake, idx) => (
              <div key={idx} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">Lap {overtake.lap}</span>
                        <Badge variant="outline" className="text-xs">
                          {overtake.location}
                        </Badge>
                      </div>
                      <p className="text-sm">
                        <span className="font-medium text-primary">{overtake.overtaker}</span>
                        <span className="text-muted-foreground"> overtakes </span>
                        <span className="font-medium">{overtake.overtaken}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TypeBadge type={overtake.type} />
                    <DifficultyRating difficulty={overtake.difficulty} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm mb-1">Move Description</h4>
                    <p className="text-sm text-muted-foreground">{overtake.description}</p>
                  </div>

                  <div className="p-3 bg-accent/5 border border-accent/20 rounded-lg">
                    <h4 className="font-medium text-sm mb-1 flex items-center gap-2">
                      <TrendingUp className="h-3 w-3" />
                      Technical Analysis
                    </h4>
                    <p className="text-sm text-muted-foreground">{overtake.analysis}</p>
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
