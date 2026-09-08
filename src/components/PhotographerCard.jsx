import { colors, fonts } from '../theme'
import { formatPrice } from '../data/photographers'
import useHover from '../hooks/useHover'

// כרטיס יוצרת בגלריה - מתוך ה-<article> שבמסך הגלריה ב-design-template.html.

export default function PhotographerCard({ photographer, onOpen = () => {} }) {
  const [btnHover, btnBind] = useHover()

  const { name, shootingCategory, location, price } = photographer
  const initial = (name || '?').trim().charAt(0)
  const priceLabel = formatPrice(price)

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
          height: 132,
          background: 'linear-gradient(135deg, #FBDCE3, #F8C9D5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: 74,
            height: 74,
            borderRadius: '50%',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: fonts.display,
            fontSize: 26,
            color: colors.rose,
            boxShadow: '0 6px 16px rgba(148,36,63,.16)',
          }}
        >
          {initial}
        </div>
        <span
          style={{
            position: 'absolute',
            top: 12,
            insetInlineStart: 12,
            fontFamily: fonts.mono,
            fontSize: 10,
            letterSpacing: '.14em',
            color: colors.amber,
            background: colors.deep,
            padding: '4px 8px',
            borderRadius: 999,
          }}
        >
          LOGO
        </span>
      </div>

      <div
        style={{
          padding: 18,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          flex: 1,
        }}
      >
        <h3 style={{ margin: 0, fontFamily: fonts.display, fontWeight: 400, fontSize: 21 }}>
          {name}
        </h3>
        <p style={{ margin: 0, fontSize: 15.5, color: colors.rose, fontWeight: 600 }}>
          {shootingCategory}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 2 }}>
          <span
            style={{
              fontSize: 13.5,
              color: colors.chipBlueText,
              background: colors.chipBlue,
              borderRadius: 999,
              padding: '5px 11px',
              fontWeight: 600,
            }}
          >
            {location}
          </span>
          <span
            style={{
              fontSize: 13.5,
              color: colors.chipAmberText,
              background: colors.chipAmberBg,
              borderRadius: 999,
              padding: '5px 11px',
              fontWeight: 700,
            }}
          >
            {priceLabel}
          </span>
        </div>
        <button
          {...btnBind}
          onClick={() => onOpen(photographer)}
          style={{
            marginTop: 'auto',
            minHeight: 48,
            border: 0,
            borderRadius: 14,
            background: btnHover ? colors.rose : colors.deep,
            color: '#fff',
            fontSize: 16,
            fontWeight: 600,
            width: '100%',
          }}
        >
          לפרופיל המלא
        </button>
      </div>
    </article>
  )
}
