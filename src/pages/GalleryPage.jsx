import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { colors, fonts, layout } from '../theme'
import { priceBands, inPriceBand } from '../data/photographers'
import { usePhotographers } from '../context/photographersStore'
import PhotographerCard from '../components/PhotographerCard'
import StatusMessage from '../components/StatusMessage'
import usePageTitle from '../hooks/usePageTitle'
import useMediaQuery from '../hooks/useMediaQuery'
import {
  REGIONS,
  CATEGORIES,
  ALL_REGIONS,
  ALL_CATEGORIES,
  regionsOf,
  categoriesOf,
} from '../data/filters'

// מסך הגלריה - מקביל ל-sc-if isGallery שב-design-template.html.
// הנתונים נטענים מה-API (דרך ה-Context), כולל מצבי טעינה ושגיאה.

const selectStyle = {
  minHeight: 48,
  borderRadius: 14,
  border: `1px solid ${colors.pinkBorder}`,
  background: colors.bg,
  padding: '0 12px',
  fontSize: 16,
  color: colors.ink,
}

// ערבוב Fisher-Yates עם מחולל מספרים פסאודו-אקראי (mulberry32) שמבוסס על seed קבוע.
function shuffleWithSeed(items, seed) {
  let t = seed >>> 0
  const rand = () => {
    t = (t + 0x6d2b79f5) >>> 0
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

// גרסה מוקטנת לנייד (גודל גופן 16 כדי שאייפון לא יעשה זום בלחיצה)
const selectStyleMobile = {
  ...selectStyle,
  minHeight: 40,
  borderRadius: 12,
  padding: '0 8px',
  width: '100%',
  minWidth: 0,
}

const labelSpan = { fontSize: 13, fontWeight: 700, color: colors.muted }

export default function GalleryPage() {
  usePageTitle('גלריית היוצרות')
  const navigate = useNavigate()
  const { photographers, loading, error, reload } = usePhotographers()

  const isMobile = useMediaQuery('(max-width: 640px)')

  const [area, setArea] = useState(ALL_REGIONS)
  const [cat, setCat] = useState(ALL_CATEGORIES)
  const [band, setBand] = useState('all')

  // סדר אקראי בכל כניסה לגלריה, כדי שלא תמיד אותה יוצרת תופיע ראשונה.
  // המפתח האקראי נקבע פעם אחת לכל כניסה לעמוד, כך שהסדר לא משתנה בזמן שמשנים סינונים.
  const [seed] = useState(() => Math.floor(Math.random() * 2 ** 31))
  const shuffled = useMemo(() => shuffleWithSeed(photographers, seed), [photographers, seed])

  // כל יוצרת משויכת לאזורים ולקטגוריות לפי הטקסט החופשי שכתבה (ראו data/filters.js).
  const tagged = useMemo(
    () =>
      shuffled.map((p) => ({
        p,
        regions: regionsOf(p.location),
        cats: categoriesOf(p),
      })),
    [shuffled],
  )

  // מספר היוצרות בכל אזור / קטגוריה - מוצג ליד כל אפשרות בסינון.
  const counts = useMemo(() => {
    const c = {}
    for (const t of tagged) {
      for (const k of [...t.regions.map((r) => 'r:' + r), ...t.cats.map((x) => 'c:' + x)]) {
        c[k] = (c[k] || 0) + 1
      }
    }
    return c
  }, [tagged])

  const list = useMemo(() => {
    const b = priceBands.find((x) => x.key === band) || priceBands[0]
    return tagged
      .filter(
        (t) =>
          (area === ALL_REGIONS || t.regions.includes(area)) &&
          (cat === ALL_CATEGORIES || t.cats.includes(cat)) &&
          inPriceBand(t.p.price, b),
      )
      .map((t) => t.p)
  }, [tagged, area, cat, band])

  const clearFilters = () => {
    setArea(ALL_REGIONS)
    setCat(ALL_CATEGORIES)
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

      {(loading || error) && (
        <StatusMessage
          loading={loading}
          error={error}
          onRetry={reload}
          loadingText="טוען יוצרות..."
        />
      )}

      {!loading && !error && (
        <>
          {/* בנייד הסינון מצומצם (שורת בחירה אחת + שורת מחירים נגללת) כדי שיראו כמה יוצרות במסך */}
          <div
            style={{
              position: 'sticky',
              top: 70,
              zIndex: 30,
              background: '#fff',
              border: `1px solid ${colors.cardBorderSoft}`,
              borderRadius: isMobile ? 16 : 22,
              padding: isMobile ? 8 : 14,
              boxShadow: '0 10px 26px rgba(90,62,71,.07)',
              marginBottom: isMobile ? 14 : 22,
            }}
          >
            <div
              style={{
                display: 'grid',
                gap: isMobile ? 8 : 12,
                gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
              }}
            >
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
                {!isMobile && <span style={labelSpan}>אזור</span>}
                <select
                  aria-label="אזור"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  style={isMobile ? selectStyleMobile : selectStyle}
                >
                  {REGIONS.map((r) => (
                    <option key={r.key} value={r.key}>
                      {r.label}
                      {r.key !== ALL_REGIONS ? ` (${counts['r:' + r.key] || 0})` : ''}
                    </option>
                  ))}
                </select>
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
                {!isMobile && <span style={labelSpan}>מה מצלמים</span>}
                <select
                  aria-label="מה מצלמים"
                  value={cat}
                  onChange={(e) => setCat(e.target.value)}
                  style={isMobile ? selectStyleMobile : selectStyle}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.key} value={c.key}>
                      {c.label}
                      {c.key !== ALL_CATEGORIES ? ` (${counts['c:' + c.key] || 0})` : ''}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div
              style={
                isMobile
                  ? { marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }
                  : { marginTop: 12 }
              }
            >
              <span
                style={
                  isMobile
                    ? { ...labelSpan, fontSize: 12.5, flexShrink: 0 }
                    : { ...labelSpan, display: 'block', marginBottom: 8 }
                }
              >
                {isMobile ? 'מחיר:' : 'טווח מחירים'}
              </span>
              <div
                style={{
                  display: 'flex',
                  flexWrap: isMobile ? 'nowrap' : 'wrap',
                  overflowX: isMobile ? 'auto' : 'visible',
                  scrollbarWidth: 'none',
                  gap: isMobile ? 6 : 8,
                }}
              >
                {priceBands.map((b) => {
                  const on = band === b.key
                  return (
                    <button
                      key={b.key}
                      onClick={() => setBand(b.key)}
                      style={{
                        minHeight: isMobile ? 34 : 44,
                        padding: isMobile ? '0 12px' : '0 16px',
                        borderRadius: 999,
                        fontSize: isMobile ? 13.5 : 15,
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
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
              gap: isMobile ? 12 : 16,
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
              <p style={{ margin: '0 0 14px', fontSize: 17 }}>
                {photographers.length === 0
                  ? 'עדיין אין יוצרות במערכת.'
                  : 'לא נמצאו יוצרות בסינון הזה.'}
              </p>
              {photographers.length > 0 && (
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
              )}
            </div>
          )}
        </>
      )}
    </main>
  )
}
