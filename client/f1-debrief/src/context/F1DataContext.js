import { createContext, useContext } from 'react'
import { useApi } from '../hooks/useApi'
import { fetchRace, fetchQualifying, fetchStandings, fetchRaceDates } from '../api'

const F1DataContext = createContext(null)

export function F1DataProvider({ children }) {
  const race = useApi(fetchRace)
  const qualifying = useApi(fetchQualifying)
  const standings = useApi(fetchStandings)
  const raceDates = useApi(fetchRaceDates)

  return (
    <F1DataContext.Provider value={{ race, qualifying, standings, raceDates }}>
      {children}
    </F1DataContext.Provider>
  )
}

export const useF1Data = () => useContext(F1DataContext)
