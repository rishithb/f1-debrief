const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001'

export const fetchQualifying = () =>
  fetch(`${BASE_URL}/qualifying`).then(r => r.json())

export const fetchRace = () =>
  fetch(`${BASE_URL}/race`).then(r => r.json())

export const fetchStandings = () =>
  fetch(`${BASE_URL}/standings`).then(r => r.json())

export const fetchRaceDates = () =>
  fetch(`${BASE_URL}/race-dates`).then(r => r.json())

export const fetchHighlights = () =>
  fetch(`${BASE_URL}/highlights`).then(r => r.json())
