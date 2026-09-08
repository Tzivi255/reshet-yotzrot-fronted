import { createContext, useContext } from 'react'

// ה-Context וה-hook נפרדים מקומפוננטת ה-Provider כדי לא לשבור את ה-Fast Refresh.

export const PhotographersContext = createContext(null)

export function usePhotographers() {
  const ctx = useContext(PhotographersContext)
  if (!ctx) {
    throw new Error('usePhotographers must be used within <PhotographersProvider>')
  }
  return ctx
}
