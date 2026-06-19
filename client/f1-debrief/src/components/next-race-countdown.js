import { useState, useEffect } from "react"
import { Flag } from "lucide-react"
import { useApi } from "../hooks/useApi"
import { fetchNextRace } from "../api"

const CIRCUIT_NAMES = {
  'Bahrain Grand Prix':           'Bahrain International Circuit',
  'Saudi Arabian Grand Prix':     'Jeddah Corniche Circuit',
  'Australian Grand Prix':        'Albert Park Circuit',
  'Japanese Grand Prix':          'Suzuka International Racing Course',
  'Chinese Grand Prix':           'Shanghai International Circuit',
  'Miami Grand Prix':             'Miami International Autodrome',
  'Emilia Romagna Grand Prix':    'Autodromo Enzo e Dino Ferrari',
  'Monaco Grand Prix':            'Circuit de Monaco',
  'Canadian Grand Prix':          'Circuit Gilles Villeneuve',
  'Spanish Grand Prix':           'Circuit de Barcelona-Catalunya',
  'Austrian Grand Prix':          'Red Bull Ring',
  'British Grand Prix':           'Silverstone Circuit',
  'Hungarian Grand Prix':         'Hungaroring',
  'Belgian Grand Prix':           'Circuit de Spa-Francorchamps',
  'Dutch Grand Prix':             'Circuit Zandvoort',
  'Italian Grand Prix':           'Autodromo Nazionale Monza',
  'Azerbaijan Grand Prix':        'Baku City Circuit',
  'Singapore Grand Prix':         'Marina Bay Street Circuit',
  'United States Grand Prix':     'Circuit of The Americas',
  'Mexico City Grand Prix':       'Autodromo Hermanos Rodriguez',
  'São Paulo Grand Prix':         'Autodromo Jose Carlos Pace',
  'Las Vegas Grand Prix':         'Las Vegas Strip Circuit',
  'Qatar Grand Prix':             'Lusail International Circuit',
  'Abu Dhabi Grand Prix':         'Yas Marina Circuit',
}

function getCircuitName(eventName) {
  return CIRCUIT_NAMES[eventName] ?? null
}

function getTimeLeft(utcIsoString) {
  const target = new Date(utcIsoString).getTime()
  const now = Date.now()
  const diff = target - now
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

function Digit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-mono text-2xl font-bold tabular-nums text-white leading-none">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-sm text-white/70 uppercase tracking-wider mt-1">{label}</span>
    </div>
  )
}

function Sep() {
  return <span className="font-mono text-2xl font-bold text-white/75 pb-4">:</span>
}

export function NextRaceCountdown() {
  const { data: nextRace } = useApi(fetchNextRace)
  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(() => {
    if (!nextRace?.raceStartUtc) return
    setTimeLeft(getTimeLeft(nextRace.raceStartUtc))
    const interval = setInterval(() => setTimeLeft(getTimeLeft(nextRace.raceStartUtc)), 1000)
    return () => clearInterval(interval)
  }, [nextRace?.raceStartUtc])

  if (!nextRace || !timeLeft) return null

  return (
    <div className="flex items-center gap-6 shrink-0">
      <div className="text-right">
        <div className="flex items-center justify-end gap-1.5 mb-1">
          <Flag className="h-3.5 w-3.5 text-red-500" />
          <span className="text-sm font-bold uppercase tracking-widest text-red-500">Next Race</span>
          <span className="text-sm text-white/75">· Round {nextRace.round}/{nextRace.totalRounds}</span>
        </div>
        <p className="text-lg font-bold text-white">{nextRace.name}</p>
        <p className="text-sm text-white/75">
          {getCircuitName(nextRace.name) ?? nextRace.location}
        </p>
      </div>
      <div className="flex items-end gap-1.5 shrink-0">
        <Digit value={timeLeft.days} label="days" />
        <Sep />
        <Digit value={timeLeft.hours} label="hrs" />
        <Sep />
        <Digit value={timeLeft.minutes} label="min" />
        <Sep />
        <Digit value={timeLeft.seconds} label="sec" />
      </div>
    </div>
  )
}
