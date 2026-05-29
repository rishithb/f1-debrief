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
import { Trophy, Calendar, MapPin, Flag, Zap, Timer, Target } from "lucide-react" 
import './globals.css';

export default function F1RaceReport() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-red-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Trophy className="h-10 w-10 text-red-600" />
                  <div className="absolute inset-0 bg-red-600/10 rounded-full blur-lg"></div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-balance text-red-600">FORMULA 1</h1>
                  <p className="text-sm text-slate-600 font-mono tracking-wider">RACE WEEKEND REPORT</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="font-mono text-slate-700">MAR 24, 2024</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                <MapPin className="h-4 w-4 text-green-600" />
                <span className="text-slate-700">Bahrain International Circuit</span>
              </div>
              <Badge className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-bold">
                <Flag className="h-4 w-4" />
                ROUND 1
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:grid-cols-5 bg-white border border-slate-200 p-1 shadow-sm">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=inactive]:text-slate-700 font-bold"
            >
              OVERVIEW
            </TabsTrigger>
            <TabsTrigger
              value="race"
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=inactive]:text-slate-700 font-bold"
            >
              RACE
            </TabsTrigger>
            <TabsTrigger
              value="qualifying"
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=inactive]:text-slate-700 font-bold"
            >
              QUALIFYING
            </TabsTrigger>
            <TabsTrigger
              value="teams"
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=inactive]:text-slate-700 font-bold"
            >
              TEAMS
            </TabsTrigger>
            <TabsTrigger
              value="standings"
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white data-[state=inactive]:text-slate-700 font-bold"
            >
              STANDINGS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-gradient-to-br from-white to-slate-50 border-red-200 shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    <CardTitle className="text-lg font-bold text-slate-900">RACE WINNER</CardTitle>
                  </div>
                  <CardDescription className="font-mono text-xs tracking-wider text-slate-600">
                    BAHRAIN GRAND PRIX 2024
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src="/max-verstappen-headshot.jpg"
                        alt="Max Verstappen"
                        className="w-16 h-16 rounded-lg object-cover border-2 border-red-200"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-lg text-slate-900">Max Verstappen</p>
                        <span className="text-xl text-slate-900">🇳🇱</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src="/red-bull-logo.jpg" alt="Red Bull Racing" className="w-5 h-5 object-contain" />
                        <p className="text-sm text-blue-600 font-semibold">Red Bull Racing</p>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Timer className="h-3 w-3 text-green-600" />
                        <p className="text-xs font-mono text-slate-600">1:31:44.742</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white to-slate-50 border-blue-200 shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-lg font-bold text-slate-900">POLE POSITION</CardTitle>
                  </div>
                  <CardDescription className="font-mono text-xs tracking-wider text-slate-600">
                    QUALIFYING FASTEST LAP
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src="/charles-leclerc-headshot.jpg"
                        alt="Charles Leclerc"
                        className="w-16 h-16 rounded-lg object-cover border-2 border-blue-200"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-lg text-slate-900">Charles Leclerc</p>
                        <span className="text-xl text-slate-900">🇲🇨</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src="/ferrari-logo.jpg" alt="Ferrari" className="w-5 h-5 object-contain" />
                        <p className="text-sm text-red-600 font-semibold">Ferrari</p>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Zap className="h-3 w-3 text-yellow-600" />
                        <p className="text-xs font-mono text-yellow-600 font-bold">1:29.179</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white to-slate-50 border-green-200 shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-green-600" />
                    <CardTitle className="text-lg font-bold text-slate-900">FASTEST LAP</CardTitle>
                  </div>
                  <CardDescription className="font-mono text-xs tracking-wider text-slate-600">
                    RACE FASTEST LAP
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src="/max-verstappen-headshot.jpg"
                        alt="Max Verstappen"
                        className="w-16 h-16 rounded-lg object-cover border-2 border-green-200"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-lg text-slate-900">Max Verstappen</p>
                        <span className="text-xl text-slate-900">🇳🇱</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src="/red-bull-logo.jpg" alt="Red Bull Racing" className="w-5 h-5 object-contain" />
                        <p className="text-sm text-blue-600 font-semibold">Red Bull Racing</p>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Timer className="h-3 w-3 text-red-600" />
                        <p className="text-xs font-mono text-green-600 font-bold">1:31.447</p>
                      </div>
                    </div>
                  </div>
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
        </Tabs>
      </main>
    </div>
  )
}
