import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { colors, fonts, layout } from '../theme'
import { priceBands } from '../data/photographers'
import { usePhotographers } from '../context/photographersStore'
import PhotographerCard from '../components/PhotographerCard'

// מסך הגלריה - מקביל ל-sc-if isGallery שב-design-template.html.
// כולל סינון לפי אזור, קטגוריית צילום וטווח מחירים.

const ALL_AREAS = 'כל האזורים'
const ALL_CATS = 'כל הסגנונות'

const selectStyle = {
  minHeight: 48,
  borderRadius: 14,
  border: `1px solid ${colors.pinkBorder}`,
  background: colors.bg,
  padding: '0 12px',
  fontSize: 16,
  color: colors.ink,
}

const labelSpan = { fontSize: 13, fontWeight: 700, color: colors.muted }

export default function GalleryPage() {
  const navigate = useNavigate()
  const { photographers } = usePhotographers()

  const [area, setArea] = useState(ALL_AREAS)
  const [cat, setCat] = useState(ALL_CATS)
  const [band, setBand] = useState('all')

  const areas = useMemo(
    () => [ALL_AREAS, ...new Set(photographers.map((p) => p.location))],
    [photographers],
  )
  const cats = useMemo(
    () => [ALL_CATS, ...new Set(photographers.map((p) => p.shootingCategory))],
    [photographers],
  )

  const list = useMemo(() => {
    const b = priceBands.find((x) => x.key === band) || priceBands[0]
    return photographers.filter(
      (p) =>
        (area === ALL_AREAS || p.location === area) &&
        (cat === ALL_CATS || p.shootingCategory === cat) &&
        p.price >= b.min &&
        p.price < (b.max === Infinity ? Infinity : b.max),
    )
  }, [photographers, area, cat, band])

  const clearFilters = () => {
    setArea(ALL_AREAS)
    setCat(ALL_CATS)
    setBand('all')
  }

  return (
    <main style={{ maxWidth: layout.maxWidth, margin: '0 auto', padding: '26px 18px 72px' }}>
      <h1
        style={{
          margin: '0 0 6px',
          fontFamily: fonts.display,
          fontWeight: 400,
          fontSize: 'clamp(30px, 8vw, 48px)',
        }}
      >
        גלריית היוצרות
      </h1>
      <p style={{ margin: '0 0 22px', fontSize: 16.5, color: colors.muted }}>
        יוצרות מכל רחבי הארץ, ממחירים נגישים ועד רמות פרימיום.
      </p>

      <div
        style={{
          position: 'sticky',
          top: 70,
          zIndex: 30,
          background: '#fff',
          border: `1px solid ${colors.cardBorderSoft}`,
          borderRadius: 22,
          padding: 14,
          boxShadow: '0 10px 26px rgba(90,62,71,.07)',
          marginBottom: 22,
        }}
      >
        <div
          style={{
            display: 'grid',
            gap: 12,
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          }}
        >
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={labelSpan}>אזור / יישוב</span>
            <select value={area} onChange={(e) => setArea(e.target.value)} style={selectStyle}>
              {areas.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={labelSpan}>מה מצלמים</span>
            <select value={cat} onChange={(e) => setCat(e.target.value)} style={selectStyle}>
              {cats.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ marginTop: 12 }}>
          <span style={{ ...labelSpan, display: 'block', marginBottom: 8 }}>טווח מחירים</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {priceBands.map((b) => {
              const on = band === b.key
              return (
                <button
                  key={b.key}
                  onClick={() => setBand(b.key)}
                  style={{
                    minHeight: 44,
                    padding: '0 16px',
                    borderRadius: 999,
                    fontSize: 15,
                    fontWeight: 600,
                    border: `1px solid ${on ? colors.rose : colors.pinkBorder}`,
                    background: on ? colors.rose : colors.bg,
                    color: on ? '#fff' : colors.muted,
                  }}
                >
                  {b.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <p
        style={{
          margin: '0 0 14px',
          fontFamily: fonts.mono,
          fontSize: 12,
          letterSpacing: '.12em',
          color: colors.chipBlueText,
        }}
      >
        {list.length} יוצרות · RESULTS
      </p>

      <div
        style={{
          display: 'grid',
          gap: 16,
          gridTemplateColumns: 'repeat(auto-fill, minmax(258px, 1fr))',
        }}
      >
        {list.map((p) => (
          <PhotographerCard
            key={p.id}
            photographer={p}
            onOpen={() => navigate(`/photographer/${p.id}`)}
          />
        ))}
      </div>

      {list.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 16px', color: colors.muted }}>
          <p style={{ margin: '0 0 14px', fontSize: 17 }}>לא נמצאו יוצרות בסינון הזה.</p>
          <button
            onClick={clearFilters}
            style={{
              minHeight: 46,
              padding: '0 20px',
              borderRadius: 999,
              border: `1px solid ${colors.pinkBorder}`,
              background: '#fff',
              fontSize: 16,
            }}
          >
            איפוס סינון
          </button>
        </div>
      )}
    </main>
  )
}
