import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Map } from "lucide-react"
import { useF1Data } from "../context/F1DataContext"

const CIRCUIT_DATA = {
  'Bahrain Grand Prix':         { circuit: 'Bahrain International Circuit',          laps: 57,  length: 5.412, drs: 3, record: { driver: 'P. De La Rosa',   time: '1:31.447', year: 2005 } },
  'Saudi Arabian Grand Prix':   { circuit: 'Jeddah Corniche Circuit',                laps: 50,  length: 6.174, drs: 3, record: { driver: 'L. Hamilton',     time: '1:30.734', year: 2021 } },
  'Australian Grand Prix':      { circuit: 'Albert Park Circuit',                    laps: 58,  length: 5.278, drs: 4, record: { driver: 'C. Leclerc',      time: '1:20.235', year: 2022 } },
  'Japanese Grand Prix':        { circuit: 'Suzuka International Racing Course',     laps: 53,  length: 5.807, drs: 2, record: { driver: 'V. Bottas',       time: '1:30.983', year: 2019 } },
  'Chinese Grand Prix':         { circuit: 'Shanghai International Circuit',         laps: 56,  length: 5.451, drs: 2, record: { driver: 'M. Schumacher',   time: '1:32.238', year: 2004 } },
  'Miami Grand Prix':           { circuit: 'Miami International Autodrome',          laps: 57,  length: 5.412, drs: 3, record: { driver: 'M. Verstappen',   time: '1:29.708', year: 2023 } },
  'Emilia Romagna Grand Prix':  { circuit: 'Autodromo Enzo e Dino Ferrari',          laps: 63,  length: 4.909, drs: 1, record: { driver: 'R. Barrichello',  time: '1:15.484', year: 2004 } },
  'Monaco Grand Prix':          { circuit: 'Circuit de Monaco',                      laps: 78,  length: 3.337, drs: 1, record: { driver: 'R. Barrichello',  time: '1:14.439', year: 2004 } },
  'Canadian Grand Prix':        { circuit: 'Circuit Gilles Villeneuve',              laps: 70,  length: 4.361, drs: 2, record: { driver: 'V. Bottas',       time: '1:13.078', year: 2019 } },
  'Spanish Grand Prix':         { circuit: 'Circuit de Barcelona-Catalunya',         laps: 66,  length: 4.657, drs: 3, record: { driver: 'M. Verstappen',   time: '1:16.330', year: 2023 } },
  'Barcelona Grand Prix':       { circuit: 'Circuit de Barcelona-Catalunya',         laps: 66,  length: 4.657, drs: 3, record: { driver: 'M. Verstappen',   time: '1:16.330', year: 2023 } },
  'Austrian Grand Prix':        { circuit: 'Red Bull Ring',                          laps: 71,  length: 4.318, drs: 3, record: { driver: 'C. Sainz',        time: '1:05.619', year: 2020 } },
  'British Grand Prix':         { circuit: 'Silverstone Circuit',                    laps: 52,  length: 5.891, drs: 2, record: { driver: 'M. Verstappen',   time: '1:27.097', year: 2020 } },
  'Hungarian Grand Prix':       { circuit: 'Hungaroring',                            laps: 70,  length: 4.381, drs: 2, record: { driver: 'L. Hamilton',     time: '1:16.627', year: 2020 } },
  'Belgian Grand Prix':         { circuit: 'Circuit de Spa-Francorchamps',           laps: 44,  length: 7.004, drs: 3, record: { driver: 'V. Bottas',       time: '1:46.286', year: 2018 } },
  'Dutch Grand Prix':           { circuit: 'Circuit Zandvoort',                      laps: 72,  length: 4.259, drs: 2, record: { driver: 'M. Verstappen',   time: '1:11.097', year: 2021 } },
  'Italian Grand Prix':         { circuit: 'Autodromo Nazionale Monza',              laps: 53,  length: 5.793, drs: 2, record: { driver: 'R. Barrichello',  time: '1:21.046', year: 2004 } },
  'Azerbaijan Grand Prix':      { circuit: 'Baku City Circuit',                      laps: 51,  length: 6.003, drs: 2, record: { driver: 'C. Leclerc',      time: '1:43.009', year: 2019 } },
  'Singapore Grand Prix':       { circuit: 'Marina Bay Street Circuit',              laps: 61,  length: 4.940, drs: 3, record: { driver: 'K. Räikkönen',    time: '1:35.867', year: 2018 } },
  'United States Grand Prix':   { circuit: 'Circuit of the Americas',                laps: 56,  length: 5.513, drs: 2, record: { driver: 'C. Leclerc',      time: '1:36.169', year: 2019 } },
  'Austin Grand Prix':          { circuit: 'Circuit of the Americas',                laps: 56,  length: 5.513, drs: 2, record: { driver: 'C. Leclerc',      time: '1:36.169', year: 2019 } },
  'Mexico City Grand Prix':     { circuit: 'Autodromo Hermanos Rodriguez',           laps: 71,  length: 4.304, drs: 3, record: { driver: 'V. Bottas',       time: '1:17.774', year: 2021 } },
  'São Paulo Grand Prix':       { circuit: 'Autodromo Jose Carlos Pace',             laps: 71,  length: 4.309, drs: 2, record: { driver: 'V. Bottas',       time: '1:10.540', year: 2018 } },
  'Las Vegas Grand Prix':       { circuit: 'Las Vegas Strip Circuit',                laps: 50,  length: 6.201, drs: 2, record: { driver: 'O. Piastri',      time: '1:35.490', year: 2023 } },
  'Qatar Grand Prix':           { circuit: 'Lusail International Circuit',           laps: 57,  length: 5.380, drs: 2, record: { driver: 'M. Verstappen',   time: '1:24.319', year: 2023 } },
  'Abu Dhabi Grand Prix':       { circuit: 'Yas Marina Circuit',                     laps: 58,  length: 5.281, drs: 2, record: { driver: 'M. Verstappen',   time: '1:26.103', year: 2021 } },
}

function Stat({ label, value, sub }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className="text-xl font-bold text-white">{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  )
}

export function CircuitStats() {
  const { raceDates } = useF1Data()
  const eventName = raceDates.data?.event

  const data = CIRCUIT_DATA[eventName]
  if (!data || !eventName) return null

  const totalDistanceKm = (data.laps * data.length).toFixed(1)

  return (
    <Card className="bg-card shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Map className="h-5 w-5 text-red-500 shrink-0" />
          <div>
            <CardTitle className="text-xl font-bold text-neutral-100 uppercase tracking-wider">{data.circuit}</CardTitle>
            <p className="text-sm text-muted-foreground mt-0.5 uppercase tracking-wider">Track Stats</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-5">
          <Stat label="Track Length"  value={`${data.length} km`} />
          <Stat label="Race Laps"     value={data.laps} />
          <Stat label="Total Distance" value={`${totalDistanceKm} km`} />
          <Stat label="DRS Zones"     value={data.drs} />
        </div>
        <div className="border-t border-border pt-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Circuit Lap Record</p>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold font-mono text-red-500">{data.record.time}</span>
            <span className="text-sm text-muted-foreground">{data.record.driver} · {data.record.year}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
