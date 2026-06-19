"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { QualifyingResults } from "./components/qualifying-results"
import { RaceResults } from "./components/race-results"
import { TeamComparison } from "./components/team-comparison"
import { RaceIncidents } from "./components/race-incidents"
import { RaceEventSummary } from "./components/race-event-summary"
import { ChampionshipStandings } from "./components/championship-standings"
import { NextRaceCountdown } from "./components/next-race-countdown"
import { CircuitStats } from "./components/circuit-stats"
import { useF1Data } from "./context/F1DataContext"
import { getTeamColor, hexAlpha } from "./utils/teamColors"
import { Trophy, Calendar, MapPin, Zap, Timer, Target, Gauge } from "lucide-react"
import './globals.css';

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()
}

// Handles both already-formatted "1:20.122" and raw pandas "0 days 00:01:20.122000"
function formatLapTime(raw) {
  if (!raw) return '—'
  const match = String(raw).match(/(\d+) days? (\d+):(\d+):(\d+)\.(\d+)/)
  if (!match) return raw
  const [, days, hours, minutes, seconds, micros] = match
  const totalMins = parseInt(days) * 1440 + parseInt(hours) * 60 + parseInt(minutes)
  const secs = `${seconds}.${micros.slice(0, 3)}`
  return `${totalMins}:${parseFloat(secs).toFixed(3).padStart(6, '0')}`
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
            <div className="container mx-auto px-6 py-4">
              <div className="relative flex items-center">

                {/* Left — F1 branding */}
                <div className="shrink-0 flex items-center gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-f1-red leading-none">FORMULA 1</h1>
                    <p className="text-sm text-white/70 font-mono tracking-widest mt-0.5">WEEKEND DEBRIEF</p>
                  </div>
                  <div className="w-px h-12 bg-white/15" />
                </div>

                {/* Center — absolutely centered on the full header width */}
                <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center text-center pointer-events-none">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-mono tracking-widest text-white/70 uppercase">Round {roundNumber}</span>
                    <span className="text-white/50">·</span>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-white/70" />
                      <span className="text-sm font-mono text-white/70">{raceDate}</span>
                    </div>
                    <span className="text-white/50">·</span>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-white/70" />
                      <span className="text-sm text-white/70">{location}</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white uppercase tracking-wide whitespace-nowrap">
                    {eventName !== '—' ? eventName : 'Grand Prix'}
                  </p>
                </div>

                {/* Right — next race countdown, pushed to far right */}
                <div className="ml-auto shrink-0 flex items-center gap-4">
                  <div className="w-px h-12 bg-white/15" />
                  <NextRaceCountdown />
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
              {(() => {
                const winnerColor  = getTeamColor(winner?.TeamName)
                const poleColor    = getTeamColor(pole?.team)
                const fastestColor = getTeamColor(fastestLap?.TeamName)

                function StatCard({ label, subtitle, icon: Icon, iconClass, loading, code, name, team, teamColor, detail, detailIcon: DetailIcon, detailClass }) {
                  return (
                    <Card className="shadow-sm overflow-hidden" style={{
                      background: `linear-gradient(150deg, transparent 0%, ${hexAlpha(teamColor, 0.18)} 75%)`,
                      borderColor: hexAlpha(teamColor, 0.35),
                    }}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          <Icon className={`h-5 w-5 ${iconClass}`} />
                          <CardTitle className="text-lg font-bold text-neutral-100">{label}</CardTitle>
                        </div>
                        <CardDescription className="font-mono text-xs tracking-wider text-neutral-400">{subtitle}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {loading ? <p className="text-neutral-400 text-sm">Loading...</p> : (
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-lg flex items-center justify-center text-lg font-bold border-2"
                              style={{ backgroundColor: hexAlpha(teamColor, 0.15), borderColor: teamColor, color: teamColor }}>
                              {code ?? '—'}
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-lg text-neutral-100">{name ?? '—'}</p>
                              <p className="text-sm font-semibold" style={{ color: teamColor }}>{team ?? '—'}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <DetailIcon className={`h-3 w-3 ${detailClass}`} />
                                <p className={`text-xs font-mono font-bold ${detailClass}`}>{detail ?? '—'}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                }

                return <>
                  <StatCard
                    label="RACE WINNER" subtitle={eventName.toUpperCase()} icon={Trophy} iconClass="text-yellow-400"
                    loading={race.loading} code={winner?.DriverCode} name={winner?.FullName} team={winner?.TeamName} teamColor={winnerColor}
                    detail="Finished" detailIcon={Timer} detailClass="text-neutral-400"
                  />
                  <StatCard
                    label="POLE POSITION" subtitle="FASTEST QUALIFYING LAP" icon={Zap} iconClass="text-purple-400"
                    loading={qualifying.loading} code={pole?.code} name={pole?.driver} team={pole?.team} teamColor={poleColor}
                    detail={pole?.Q3} detailIcon={Timer} detailClass="text-neutral-400"
                  />
                  <StatCard
                    label="FASTEST LAP" subtitle="FASTEST RACE LAP" icon={Gauge} iconClass="text-green-400"
                    loading={race.loading} code={fastestLap?.DriverCode} name={fastestLap?.FullName} team={fastestLap?.TeamName} teamColor={fastestColor}
                    detail={formatLapTime(fastestLap?.FastestLapTime)} detailIcon={Timer} detailClass="text-neutral-400"
                  />
                </>
              })()}
            </div>

            <CircuitStats />
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
            </div>
          </TabsContent>
        </main>
      </Tabs>
    </div>
  )
}
