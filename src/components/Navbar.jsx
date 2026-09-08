import { colors, fonts, layout } from '../theme'

// סרגל ניווט עליון - מתוך ה-<header> שב-design-template.html.
// ה-Routing עדיין לא מחובר (שלב 2), אז הניווט מתקבל כ-props עם ברירת מחדל.

const NAV_ITEMS = [
  { key: 'home', label: 'הבית' },
  { key: 'gallery', label: 'גלריה' },
  { key: 'admin', label: 'ניהול' },
]

const navBase = {
  minHeight: 44,
  padding: '0 9px',
  flex: '0 0 auto',
  whiteSpace: 'nowrap',
  borderRadius: 999,
  fontSize: 14.5,
  fontWeight: 600,
  border: '1px solid transparent',
  background: 'none',
  color: colors.muted,
}

const navOn = {
  ...navBase,
  fontWeight: 700,
  border: `1px solid ${colors.pinkBorder}`,
  background: '#fff',
  color: colors.rose,
}

export default function Navbar({ active = 'home', onNavigate = () => {} }) {
  // בגלריה ובפרופיל מסמנים את לשונית "גלריה" כפעילה, כמו בתבנית.
  const isActive = (key) =>
    key === active || (key === 'gallery' && active === 'profile')

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(253,246,244,.92)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${colors.cardBorderSoft}`,
      }}
    >
      <div
        style={{
          maxWidth: layout.maxWidth,
          margin: '0 auto',
          padding: '11px 14px',
          minHeight: 69,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <button
          onClick={() => onNavigate('home')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 1,
            background: 'none',
            border: 0,
            padding: 0,
            textAlign: 'right',
            minWidth: 0,
            flexShrink: 1,
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              fontFamily: fonts.display,
              fontSize: 19,
              color: colors.ink,
              lineHeight: 1.1,
            }}
          >
            רשת היוצרות
          </span>
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 9.5,
              letterSpacing: '.18em',
              color: colors.rose,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
            }}
          >
            MICHAL WEG STUDIO
          </span>
        </button>

        <nav
          style={{
            marginInlineStart: 'auto',
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: 'flex-end',
            gap: 2,
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              style={isActive(item.key) ? navOn : navBase}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
