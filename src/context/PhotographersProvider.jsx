import { useCallback, useEffect, useMemo, useState } from 'react'
import { PhotographersContext } from './photographersStore'
import * as api from '../api/photographers'

// מקור אמת יחיד לרשימת היוצרות, מחובר ל-API של שרת ה-Node/Express.
// הגלריה ודף הניהול צורכים מכאן; דף הפרופיל טוען יוצרת בודדת ישירות מה-API.

export function PhotographersProvider({ children }) {
  const [photographers, setPhotographers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // טעינה ראשונית מה-API. עדכוני ה-state קורים רק בתוך ה-callbacks האסינכרוניים.
  useEffect(() => {
    let alive = true
    api
      .getPhotographers()
      .then((rows) => alive && setPhotographers(rows))
      .catch((err) => alive && setError(err.message || 'שגיאה בטעינת היוצרות'))
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [])

  // רענון יזום (כפתור "נסו שוב") - נקרא מתוך אירוע משתמש.
  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setPhotographers(await api.getPhotographers())
    } catch (err) {
      setError(err.message || 'שגיאה בטעינת היוצרות')
    } finally {
      setLoading(false)
    }
  }, [])

  const value = useMemo(
    () => ({
      photographers,
      loading,
      error,
      reload,
      addPhotographer: async (model) => {
        const created = await api.createPhotographer(model)
        setPhotographers((l) => [...l, created])
        return created
      },
      updatePhotographer: async (id, model) => {
        const updated = await api.updatePhotographer(id, model)
        setPhotographers((l) =>
          l.map((p) => (String(p.id) === String(id) ? updated : p)),
        )
        return updated
      },
      removePhotographer: async (id) => {
        await api.deletePhotographer(id)
        setPhotographers((l) => l.filter((p) => String(p.id) !== String(id)))
      },
    }),
    [photographers, loading, error, reload],
  )

  return (
    <PhotographersContext.Provider value={value}>{children}</PhotographersContext.Provider>
  )
}
