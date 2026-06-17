"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Badge } from "./components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { QualifyingResults } from "./components/qualifying-results"
import { RaceResults } from "./components/race-results"
import { TeamComparison } from "./components/team-comparison"
import { RaceIncidents } from "./components/race-incidents"
import { OvertakeBattles } from "./components/overtake-battles"
import { RaceEventSummary } from "./components/race-event-summary"
import { ChampionshipStandings } from "./components/championship-standings"
import { useF1Data } from "./context/F1DataContext"
import { Trophy, Calendar, MapPin, Flag, Zap, Timer, Target } from "lucide-react"
import './globals.css';

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()
}

export default function F1RaceReport() {
  const { race, qualifying, raceDates } = useF1Data()

  const winner = race.data?.[0]
  const pole = qualifying.data?.[0]
  const fastestLap = race.data?.find(d => d.FastestLapRank === 1)
  const eventName = raceDates.data?.event ?? '—'
  const location = raceDates.data?.location ?? '—'
  const roundNumber = raceDates.data?.round_number ?? '—'
  const raceDate = formatDate(raceDates.data?.session5Date)

  return (
    <div className="min-h-screen bg-background">
      <Tabs defaultValue="overview">
        <div className="sticky top-0 z-50">
          <header className="border-b border-black/20 bg-header backdrop-blur-md shadow-sm">
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div>
                      <h1 className="text-3xl font-bold text-balance text-f1-red">FORMULA 1</h1>
                      <p className="text-sm text-header-foreground/60 font-mono tracking-wider">WEEKEND DEBRIEF</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10 shadow-sm">
                    <Calendar className="h-4 w-4 text-blue-400" />
                    <span className="font-mono text-header-foreground/80">{raceDate}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10 shadow-sm">
                    <MapPin className="h-4 w-4 text-green-400" />
                    <span className="text-header-foreground/80">{location}</span>
                  </div>
                  <Badge className="flex items-center gap-2 px-4 py-2 bg-f1-red text-white font-bold">
                    <Flag className="h-4 w-4" />
                    ROUND {roundNumber}
                  </Badge>
                </div>
              </div>
            </div>
          </header>

          <TabsList className="w-full grid grid-cols-5 h-auto bg-card border-b border-border rounded-none p-1 shadow-sm">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-f1-red data-[state=active]:text-white data-[state=inactive]:text-neutral-300 data-[state=inactive]:hover:bg-white/10 transition-colors font-bold"
            >
              OVERVIEW
            </TabsTrigger>
            <TabsTrigger
              value="race"
              className="data-[state=active]:bg-f1-red data-[state=active]:text-white data-[state=inactive]:text-neutral-300 data-[state=inactive]:hover:bg-white/10 transition-colors font-bold"
            >
              RACE
            </TabsTrigger>
            <TabsTrigger
              value="qualifying"
              className="data-[state=active]:bg-f1-red data-[state=active]:text-white data-[state=inactive]:text-neutral-300 data-[state=inactive]:hover:bg-white/10 transition-colors font-bold"
            >
              QUALIFYING
            </TabsTrigger>
            <TabsTrigger
              value="teams"
              className="data-[state=active]:bg-f1-red data-[state=active]:text-white data-[state=inactive]:text-neutral-300 data-[state=inactive]:hover:bg-white/10 transition-colors font-bold"
            >
              TEAMS
            </TabsTrigger>
            <TabsTrigger
              value="standings"
              className="data-[state=active]:bg-f1-red data-[state=active]:text-white data-[state=inactive]:text-neutral-300 data-[state=inactive]:hover:bg-white/10 transition-colors font-bold"
            >
              STANDINGS
            </TabsTrigger>
          </TabsList>
        </div>

        <main className="container mx-auto px-4 py-8 space-y-8">
          <TabsContent value="overview" className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-card shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-400" />
                    <CardTitle className="text-lg font-bold text-neutral-100">RACE WINNER</CardTitle>
                  </div>
                  <CardDescription className="font-mono text-xs tracking-wider text-neutral-400">
                    {eventName.toUpperCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {race.loading ? <p className="text-neutral-400 text-sm">Loading...</p> : (
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center text-lg font-bold text-neutral-100 border-2 border-red-900">
                        {winner?.DriverCode ?? '—'}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-lg text-neutral-100">{winner?.FullName ?? '—'}</p>
                        <p className="text-sm text-blue-400 font-semibold">{winner?.TeamName ?? '—'}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Timer className="h-3 w-3 text-green-400" />
                          <p className="text-xs font-mono text-neutral-400">{winner?.Status ?? '—'}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-card shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-400" />
                    <CardTitle className="text-lg font-bold text-neutral-100">POLE POSITION</CardTitle>
                  </div>
                  <CardDescription className="font-mono text-xs tracking-wider text-neutral-400">
                    QUALIFYING FASTEST LAP
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {qualifying.loading ? <p className="text-neutral-400 text-sm">Loading...</p> : (
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center text-lg font-bold text-neutral-100 border-2 border-blue-900">
                        {pole?.code ?? '—'}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-lg text-neutral-100">{pole?.driver ?? '—'}</p>
                        <p className="text-sm text-red-500 font-semibold">{pole?.team ?? '—'}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Zap className="h-3 w-3 text-yellow-400" />
                          <p className="text-xs font-mono text-yellow-400 font-bold">{pole?.Q3 ?? '—'}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-card shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-green-400" />
                    <CardTitle className="text-lg font-bold text-neutral-100">FASTEST LAP</CardTitle>
                  </div>
                  <CardDescription className="font-mono text-xs tracking-wider text-neutral-400">
                    RACE FASTEST LAP
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {race.loading ? <p className="text-neutral-400 text-sm">Loading...</p> : (
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center text-lg font-bold text-neutral-100 border-2 border-green-900">
                        {fastestLap?.DriverCode ?? '—'}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-lg text-neutral-100">{fastestLap?.FullName ?? '—'}</p>
                        <p className="text-sm text-blue-400 font-semibold">{fastestLap?.TeamName ?? '—'}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Timer className="h-3 w-3 text-red-500" />
                          <p className="text-xs font-mono text-green-400 font-bold">{fastestLap?.FastestLapTime ?? '—'}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <RaceEventSummary />
          </TabsContent>

          <TabsContent value="standings">
            <ChampionshipStandings />
          </TabsContent>

          <TabsContent value="teams">
            <TeamComparison />
          </TabsContent>

          <TabsContent value="qualifying">
            <QualifyingResults />
          </TabsContent>

          <TabsContent value="race">
            <div className="space-y-6">
              <RaceResults />
              <RaceIncidents />
              <OvertakeBattles />
            </div>
          </TabsContent>
        </main>
      </Tabs>
    </div>
  )
}
