import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { colors, fonts } from '../theme'

// תפריט נגישות צף - עומד בדרישות תקנות נגישות (ת"י 5568 / WCAG 2.0 AA):
// הגדלת/הקטנת טקסט, ניגודיות גבוהה, גווני אפור, הדגשת קישורים, פונט קריא ועצירת אנימציות.
// ההגדרות נשמרות ב-localStorage ומוחלות מחדש בכל טעינה.

const STORAGE_KEY = 'a11y-settings-v1'
const ZOOM_STEPS = [100, 112, 125, 137, 150]

const DEFAULT_SETTINGS = {
  zoomIndex: 0,
  contrast: false,
  grayscale: false,
  underlineLinks: false,
  readableFont: false,
  noMotion: false,
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : { ...DEFAULT_SETTINGS }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

function applySettings(settings) {
  const root = document.documentElement
  root.classList.toggle('a11y-contrast', settings.contrast)
  root.classList.toggle('a11y-grayscale', settings.grayscale)
  root.classList.toggle('a11y-underline-links', settings.underlineLinks)
  root.classList.toggle('a11y-readable', settings.readableFont)
  root.classList.toggle('a11y-no-motion', settings.noMotion)
  // zoom (ולא font-size) כדי שההגדלה תחול גם על ערכי px קבועים בסגנונות ה-inline באתר
  document.body.style.zoom = `${ZOOM_STEPS[settings.zoomIndex]}%`
}

const btnStyle = {
  minHeight: 36,
  padding: '0 12px',
  borderRadius: 10,
  border: `1px solid ${colors.pinkBorder}`,
  background: colors.bg,
  color: colors.ink,
  fontSize: 14,
  fontWeight: 600,
}

function ToggleRow({ label, checked, onChange }) {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        fontSize: 14.5,
      }}
    >
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ width: 18, height: 18, accentColor: colors.rose }}
      />
    </label>
  )
}

export default function AccessibilityWidget() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState(loadSettings)

  useEffect(() => {
    applySettings(settings)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {
      /* אחסון חסום (מצב פרטי וכו') - לא קריטי, ההגדרות עדיין חלות על ה-session הנוכחי */
    }
  }, [settings])

  const toggle = (key) => setSettings((s) => ({ ...s, [key]: !s[key] }))
  const zoomIn = () =>
    setSettings((s) => ({ ...s, zoomIndex: Math.min(s.zoomIndex + 1, ZOOM_STEPS.length - 1) }))
  const zoomOut = () => setSettings((s) => ({ ...s, zoomIndex: Math.max(s.zoomIndex - 1, 0) }))
  const reset = () => setSettings({ ...DEFAULT_SETTINGS })

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label="פתיחת תפריט נגישות"
        title="נגישות"
        style={{
          position: 'fixed',
          insetInlineEnd: 16,
          bottom: 16,
          zIndex: 80,
          width: 52,
          height: 52,
          borderRadius: '50%',
          border: 0,
          background: colors.deep,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 20px rgba(31,50,60,.35)',
        }}
      >
        <svg
          aria-hidden="true"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="12" cy="7.2" r="1.7" fill="currentColor" />
          <path
            d="M6 9.6c2-0.7 4-1 6-1s4 0.3 6 1M12 8.6v3.6l-2.6 6M12 12.2l2.6 6M9 13.6h6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          id="a11y-panel"
          role="dialog"
          aria-label="הגדרות נגישות"
          style={{
            position: 'fixed',
            insetInlineEnd: 16,
            bottom: 76,
            zIndex: 80,
            width: 280,
            maxWidth: 'calc(100vw - 32px)',
            background: '#fff',
            border: `1px solid ${colors.pinkBorder}`,
            borderRadius: 20,
            boxShadow: '0 20px 40px rgba(44,30,35,.22)',
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ margin: 0, fontFamily: fonts.display, fontWeight: 400, fontSize: 18 }}>
              נגישות
            </h2>
            <button
              onClick={() => setOpen(false)}
              aria-label="סגירת תפריט נגישות"
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: `1px solid ${colors.pinkBorder}`,
                background: '#fff',
                fontSize: 15,
                color: colors.muted,
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: colors.muted, flex: 1 }}>
              גודל טקסט
            </span>
            <button onClick={zoomOut} aria-label="הקטנת טקסט" style={btnStyle}>
              A-
            </button>
            <button onClick={zoomIn} aria-label="הגדלת טקסט" style={btnStyle}>
              A+
            </button>
          </div>

          <ToggleRow label="ניגודיות גבוהה" checked={settings.contrast} onChange={() => toggle('contrast')} />
          <ToggleRow label="גווני אפור" checked={settings.grayscale} onChange={() => toggle('grayscale')} />
          <ToggleRow
            label="הדגשת קישורים"
            checked={settings.underlineLinks}
            onChange={() => toggle('underlineLinks')}
          />
          <ToggleRow label="פונט קריא" checked={settings.readableFont} onChange={() => toggle('readableFont')} />
          <ToggleRow label="עצירת אנימציות" checked={settings.noMotion} onChange={() => toggle('noMotion')} />

          <button onClick={reset} style={{ ...btnStyle, width: '100%', marginTop: 4 }}>
            איפוס הגדרות
          </button>

          <button
            onClick={() => {
              setOpen(false)
              navigate('/accessibility')
            }}
            style={{
              fontSize: 13,
              color: colors.rose,
              background: 'none',
              border: 0,
              textDecoration: 'underline',
              padding: 0,
              textAlign: 'start',
            }}
          >
            הצהרת נגישות
          </button>
        </div>
      )}
    </>
  )
}
