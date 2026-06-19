export const TEAM_COLORS = {
  'Mercedes':         '#27f4d2',
  'Ferrari':          '#e8002d',
  'McLaren':          '#ff8000',
  'Red Bull':         '#3671c6',
  'Red Bull Racing':  '#3671c6',
  'Alpine F1 Team':   '#00a1e8',
  'Alpine':           '#00a1e8',
  'RB F1 Team':       '#6692ff',
  'Racing Bulls':     '#6692ff',
  'Haas F1 Team':     '#dee1e2',
  'Haas':             '#dee1e2',
  'Williams':         '#1868db',
  'Aston Martin':     '#229971',
  'Audi':             '#ff2d00',
  'Cadillac F1 Team': '#aaaaad',
  'Cadillac':         '#aaaaad',
}

export const TEAM_FULL_NAMES = {
  'Mercedes':         'Mercedes-AMG PETRONAS F1 Team',
  'Ferrari':          'Scuderia Ferrari HP',
  'McLaren':          'McLaren Formula 1 Team',
  'Red Bull':         'Oracle Red Bull Racing',
  'Alpine F1 Team':   'BWT Alpine F1 Team',
  'RB F1 Team':       'Visa Cash App RB F1 Team',
  'Haas F1 Team':     'MoneyGram Haas F1 Team',
  'Williams':         'Williams Racing',
  'Aston Martin':     'Aston Martin Aramco F1 Team',
  'Audi':             'Audi F1 Team',
  'Cadillac F1 Team': 'TWG Cadillac F1 Team',
}

export function getTeamColor(teamName) {
  return TEAM_COLORS[teamName] ?? '#888888'
}

export function getTeamFullName(teamName) {
  return TEAM_FULL_NAMES[teamName] ?? teamName
}

// Returns a hex color with an alpha suffix, e.g. hex(color, 0.5) → '#27F4D280'
export function hexAlpha(hex, alpha) {
  const a = Math.round(alpha * 255).toString(16).padStart(2, '0')
  return hex + a
}
