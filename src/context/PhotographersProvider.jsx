import { useMemo, useState } from 'react'
import { photographers as seed } from '../data/photographers'
import { PhotographersContext } from './photographersStore'

// מקור אמת יחיד לרשימת היוצרות בצד הלקוח, כדי שכל העמודים
// (גלריה / פרופיל / ניהול) יעבדו על אותו מידע. בשלב הבא זה יתחבר ל-Backend.

export function PhotographersProvider({ children }) {
  const [list, setList] = useState(seed)

  const value = useMemo(
    () => ({
      photographers: list,
      getPhotographer: (id) => list.find((p) => String(p.id) === String(id)) || null,
      addPhotographer: (rec) => setList((l) => [...l, { id: Date.now(), ...rec }]),
      updatePhotographer: (id, rec) =>
        setList((l) => l.map((p) => (String(p.id) === String(id) ? { ...p, ...rec } : p))),
      removePhotographer: (id) => setList((l) => l.filter((p) => String(p.id) !== String(id))),
    }),
    [list],
  )

  return (
    <PhotographersContext.Provider value={value}>{children}</PhotographersContext.Provider>
  )
}
