import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { colors, fonts, layout } from '../theme'
import { getWorks, driveThumb, drivePreview } from '../api/works'
import StatusMessage from '../components/StatusMessage'
import useHover from '../hooks/useHover'

// עמוד "תצוגת עבודות": סרטון מייצג אחד מכל יוצרת, מתוך תיקיית ה-Drive שלה.
// הרעיון (לפי מיכל): הלקוחה גוללת ובוחרת לפי הסגנון בלבד, ומשם עוברת לפרופיל של היוצרת.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

function shuffle(items) {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

function ClipCard({ work, onOpenProfile }) {
  // סרטון אקראי מתוך התיקייה שלה בכל כניסה; אפשר לעבור לסרטון אחר בלחיצה
  const [clip, setClip] = useState(() => pick(work.clips))
  const [playing, setPlaying] = useState(false)
  const [thumbFailed, setThumbFailed] = useState(false)
  const [btnHover, btnBind] = useHover()

  const nextClip = () => {
    const others = work.clips.filter((c) => c.id !== clip.id)
    if (!others.length) return
    setClip(pick(others))
    setPlaying(false)
    setThumbFailed(false)
  }

  return (
    <article
      style={{
        background: '#fff',
        border: `1px solid ${colors.cardBorder}`,
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: '0 10px 26px rgba(90,62,71,.06)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          position: 'relative',
          aspectRatio: '4 / 5',
          background: 'linear-gradient(135deg, #FBDCE3, #F8C9D5)',
        }}
      >
        {playing ? (
          <iframe
            src={drivePreview(clip.id)}
            title={`קליפ של ${work.name}`}
            allow="autoplay; fullscreen"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            aria-label={`הפעלת קליפ של ${work.name}`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              padding: 0,
              border: 0,
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            {!thumbFailed && (
              <img
                src={driveThumb(clip.id)}
                alt=""
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => setThumbFailed(true)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            )}
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 66,
                height: 66,
                borderRadius: '50%',
                background: 'rgba(255,255,255,.92)',
                boxShadow: '0 10px 26px rgba(148,36,63,.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  width: 0,
                  height: 0,
                  marginLeft: 6,
                  borderTop: '13px solid transparent',
                  borderBottom: '13px solid transparent',
                  borderLeft: `20px solid ${colors.rose}`,
                }}
              />
            </span>
          </button>
        )}
      </div>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
          <h3 style={{ margin: 0, fontFamily: fonts.display, fontWeight: 400, fontSize: 20 }}>
            {work.name}
          </h3>
          {work.clips.length > 1 && (
            <button
              onClick={nextClip}
              style={{
                border: 0,
                background: 'transparent',
                color: colors.chipBlueText,
                fontSize: 14,
                fontWeight: 600,
                padding: '4px 0',
                textDecoration: 'underline',
                flexShrink: 0,
              }}
            >
              לקליפ אחר ↻
            </button>
          )}
        </div>
        {work.shootingCategory && (
          <p style={{ margin: 0, fontSize: 15, color: colors.rose, fontWeight: 600 }}>
            {work.shootingCategory}
          </p>
        )}
        <button
          {...btnBind}
          onClick={onOpenProfile}
          style={{
            marginTop: 'auto',
            minHeight: 46,
            border: 0,
            borderRadius: 14,
            background: btnHover ? colors.rose : colors.deep,
            color: '#fff',
            fontSize: 16,
            fontWeight: 600,
            width: '100%',
          }}
        >
          לפרופיל של {work.name}
        </button>
      </div>
    </article>
  )
}

export default function WorksPage() {
  const navigate = useNavigate()
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchWorks = useCallback(
    () =>
      getWorks()
        .then(setWorks)
        .catch((err) => setError(err.message || 'שגיאה בטעינת העבודות'))
        .finally(() => setLoading(false)),
    [],
  )

  // טעינה ראשונית (loading כבר true כברירת מחדל)
  useEffect(() => {
    fetchWorks()
  }, [fetchWorks])

  // "נסו שוב" אחרי שגיאה
  const load = () => {
    setLoading(true)
    setError(null)
    fetchWorks()
  }

  // סדר אקראי בכל כניסה, כדי שלא תמיד אותה יוצרת תופיע ראשונה
  const list = useMemo(() => shuffle(works), [works])

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
        תצוגת עבודות
      </h1>
      <p style={{ margin: '0 0 22px', fontSize: 16.5, color: colors.muted }}>
        גללי, צפי ובחרי לפי הסגנון שאת אוהבת. אהבת קליפ? עברי לפרופיל של היוצרת.
      </p>

      {(loading || error) && (
        <StatusMessage loading={loading} error={error} onRetry={load} loadingText="טוען עבודות..." />
      )}

      {!loading && !error && list.length === 0 && (
        <p style={{ textAlign: 'center', padding: '48px 16px', color: colors.muted, fontSize: 17 }}>
          עדיין אין עבודות להצגה.
        </p>
      )}

      {!loading && !error && list.length > 0 && (
        <div
          style={{
            display: 'grid',
            gap: 16,
            gridTemplateColumns: 'repeat(auto-fill, minmax(258px, 1fr))',
          }}
        >
          {list.map((w) => (
            <ClipCard
              key={w.profileId}
              work={w}
              onOpenProfile={() => navigate(`/photographer/${w.profileId}`)}
            />
          ))}
        </div>
      )}
    </main>
  )
}
