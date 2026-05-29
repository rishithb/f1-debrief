import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Trophy, TrendingUp, Award, Target } from "lucide-react"

const teamData = [
  {
    team: "Red Bull Racing",
    logo: "/red-bull-logo.jpg",
    points: 104,
    drivers: [
      {
        name: "Max Verstappen",
        number: "1",
        country: "🇳🇱",
        photo: "/max-verstappen-headshot.jpg",
        position: 1,
        points: 69,
        performance: 95,
        qualifyingH2H: { wins: 2, total: 3 },
        raceH2H: { wins: 3, total: 3 },
      },
      {
        name: "Sergio Perez",
        number: "11",
        country: "🇲🇽",
        photo: "/sergio-perez.jpg",
        position: 4,
        points: 35,
        performance: 82,
        qualifyingH2H: { wins: 1, total: 3 },
        raceH2H: { wins: 0, total: 3 },
      },
    ],
    grade: "A+",
    summary: "Dominant performance with strategic excellence",
    debrief:
      "Perfect execution of race strategy. Verstappen's undercut was masterfully timed, and the team's pit stop efficiency was exceptional. Perez provided solid support despite starting P4.",
  },
  {
    team: "Ferrari",
    logo: "/ferrari-logo.jpg",
    points: 93,
    drivers: [
      {
        name: "Charles Leclerc",
        number: "16",
        country: "🇲🇨",
        photo: "/charles-leclerc-headshot.jpg",
        position: 2,
        points: 51,
        performance: 88,
        qualifyingH2H: { wins: 2, total: 3 },
        raceH2H: { wins: 2, total: 3 },
      },
      {
        name: "Carlos Sainz",
        number: "55",
        country: "🇪🇸",
        photo: "/carlos-sainz.jpg",
        position: 3,
        points: 42,
        performance: 85,
        qualifyingH2H: { wins: 1, total: 3 },
        raceH2H: { wins: 1, total: 3 },
      },
    ],
    grade: "A-",
    summary: "Strong pace but strategic miscalculation",
    debrief:
      "Excellent qualifying performance with pole position, but race strategy cost valuable points. Both drivers showed competitive pace, but pit window timing needs improvement for future races.",
  },
  {
    team: "Mercedes",
    logo: "/mercedes-logo.png",
    points: 52,
    drivers: [
      {
        name: "George Russell",
        number: "63",
        country: "🇬🇧",
        photo: "/george-russell.jpg",
        position: 5,
        points: 28,
        performance: 78,
        qualifyingH2H: { wins: 2, total: 3 },
        raceH2H: { wins: 2, total: 3 },
      },
      {
        name: "Lewis Hamilton",
        number: "44",
        country: "🇬🇧",
        photo: "/placeholder.svg?key=hamilton",
        position: 7,
        points: 24,
        performance: 72,
        qualifyingH2H: { wins: 1, total: 3 },
        raceH2H: { wins: 1, total: 3 },
      },
    ],
    grade: "B",
    summary: "Steady progress but lacking ultimate pace",
    debrief:
      "Consistent performance from both drivers, but the car still lacks the pace to challenge the front runners. Setup improvements needed for better tire management and overall competitiveness.",
  },
]

const constructorStandings = [
  { team: "Red Bull", points: 104, color: "#1e40af" },
  { team: "Ferrari", points: 93, color: "#dc2626" },
  { team: "Mercedes", points: 52, color: "#059669" },
  { team: "McLaren", points: 24, color: "#ea580c" },
  { team: "Aston Martin", points: 18, color: "#16a34a" },
]

function GradeBadge({ grade }) {
  const colors = {
    "A+": "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
    A: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
    "A-": "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800",
    "B+": "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800",
    B: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800",
    "B-": "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800",
    C: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
  }

  return <Badge className={`font-bold ${colors[grade] || colors.C}`}>{grade}</Badge>
}

export function TeamReportCards() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-card to-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            CONSTRUCTOR STANDINGS
          </CardTitle>
          <CardDescription>Points accumulated after Round 1</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={constructorStandings}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="team" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="points" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {teamData.map((team, idx) => (
          <Card key={idx} className="bg-gradient-to-br from-card to-card/50 border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3">
                  <img
                    src={team.logo || "/placeholder.svg"}
                    alt={`${team.team} logo`}
                    className="w-8 h-8 object-contain"
                  />
                  <div>
                    <span className="text-xl font-bold">{team.team}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="font-bold text-primary">{team.points} PTS</span>
                      <span className="text-sm text-muted-foreground">Combined</span>
                    </div>
                  </div>
                </CardTitle>
                <div className="flex items-center gap-2">
                  <GradeBadge grade={team.grade} />
                </div>
              </div>
              <CardDescription>{team.summary}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {team.drivers.map((driver, driverIdx) => (
                  <div key={driverIdx} className="p-4 bg-muted/30 rounded-lg border border-border/50">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <img
                          src={driver.photo || "/placeholder.svg"}
                          alt={driver.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                        />
                        <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                          {driver.number}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-bold">{driver.name}</p>
                          <span className="text-lg">{driver.country}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>P{driver.position}</span>
                          <span className="font-bold text-secondary">{driver.points} pts</span>
                          <Badge variant="outline">{driver.performance}%</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-accent" />
                            <span className="text-sm font-medium">Qualifying H2H</span>
                          </div>
                          <Badge variant="secondary" className="font-mono">
                            {driver.qualifyingH2H.wins} - {driver.qualifyingH2H.total - driver.qualifyingH2H.wins}
                          </Badge>
                        </div>
                        <Progress
                          value={(driver.qualifyingH2H.wins / driver.qualifyingH2H.total) * 100}
                          className="h-2"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Race H2H</span>
                          </div>
                          <Badge variant="secondary" className="font-mono">
                            {driver.raceH2H.wins} - {driver.raceH2H.total - driver.raceH2H.wins}
                          </Badge>
                        </div>
                        <Progress value={(driver.raceH2H.wins / driver.raceH2H.total) * 100} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {team.drivers.map((driver, driverIdx) => (
                  <div key={driverIdx} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">{driver.name}</p>
                        <p className="text-sm text-muted-foreground">
                          P{driver.position} • {driver.points} points
                        </p>
                      </div>
                      <Badge variant="outline">{driver.performance}%</Badge>
                    </div>
                    <Progress value={driver.performance} className="h-2" />
                  </div>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Teammate Comparison</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Qualifying Gap</span>
                      <span className="font-mono">
                        {Math.abs(team.drivers[0].performance - team.drivers[1].performance) / 10}s
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Race Gap</span>
                      <span className="font-mono">
                        {Math.abs(team.drivers[0].position - team.drivers[1].position)} positions
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Points Gap</span>
                      <span className="font-semibold">
                        {Math.abs(team.drivers[0].points - team.drivers[1].points)} pts
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Key Metrics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Pit Stop Average</span>
                      <span className="font-mono">2.4s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Strategy Rating</span>
                      <span className="font-semibold">{team.grade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reliability</span>
                      <span className="text-green-600 font-semibold">100%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  TEAM DEBRIEF
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{team.debrief}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
