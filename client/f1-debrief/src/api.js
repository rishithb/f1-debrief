const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001'

export const fetchQualifying = () =>
  fetch(`${BASE_URL}/api/qualifying`).then(r => r.json())

export const fetchRace = () =>
  fetch(`${BASE_URL}/api/race`).then(r => r.json())

export const fetchStandings = () =>
  fetch(`${BASE_URL}/api/standings`).then(r => r.json())

export const fetchRaceDates = () =>
  fetch(`${BASE_URL}/api/race-dates`).then(r => r.json())

export const fetchHighlights = () =>
  fetch(`${BASE_URL}/api/highlights`).then(r => r.json())

export const fetchPitStops = () =>
  fetch(`${BASE_URL}/api/pit-stops`).then(r => r.json())

export const fetchNextRace = () =>
  fetch(`${BASE_URL}/api/next-race`).then(r => r.json())

export const fetchTeamStats = () =>
  fetch(`${BASE_URL}/api/team-stats`).then(r => r.json())

export const fetchStints = () =>
  fetch(`${BASE_URL}/api/stints`).then(r => r.json())
