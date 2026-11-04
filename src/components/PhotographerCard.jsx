import { colors, fonts } from '../theme'
import { formatPrice } from '../data/photographers'
import useHover from '../hooks/useHover'
import useMediaQuery from '../hooks/useMediaQuery'

// כרטיס יוצרת בגלריה - מתוך ה-<article> שבמסך הגלריה ב-design-template.html.

export default function PhotographerCard({ photographer, onOpen = () => {} }) {
  const [btnHover, btnBind] = useHover()
  // בנייד הכרטיס נמוך יותר, כדי שיראו לפחות שתי יוצרות במסך בזמן גלילה
  const compact = useMediaQuery('(max-width: 640px)')
  const logoSize = compact ? 54 : 74

  const { name, shootingCategory, location, price, logoUrl } = photographer
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
          // גובה + ריפוד עליון: מפנים מקום לתגית ההנחה כדי שלא תסתיר את הלוגו
          height: compact ? 100 : 152,
          paddingTop: compact ? 26 : 30,
          background: 'linear-gradient(135deg, #FBDCE3, #F8C9D5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={`לוגו ${name}`}
            style={{
              width: logoSize,
              height: logoSize,
              borderRadius: '50%',
              objectFit: 'cover',
              background: '#fff',
              boxShadow: '0 6px 16px rgba(148,36,63,.16)',
            }}
          />
        ) : (
          <div
            style={{
              width: logoSize,
              height: logoSize,
              borderRadius: '50%',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: fonts.display,
              fontSize: compact ? 21 : 26,
              color: colors.rose,
              boxShadow: '0 6px 16px rgba(148,36,63,.16)',
            }}
          >
            {initial}
          </div>
        )}
        {/* תגית מבצע - 5% הנחה לסוגרות דרך האתר */}
        <span
          style={{
            position: 'absolute',
            top: compact ? 8 : 12,
            insetInlineStart: compact ? 8 : 12,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: compact ? '3px 8px' : '5px 10px',
            borderRadius: 8,
            // אותו צהוב-קרם של תגית המחיר וחלונית ההטבה
            background: colors.chipAmberBg,
            color: colors.chipAmberText,
            fontSize: compact ? 11.5 : 12.5,
            fontWeight: 700,
            lineHeight: 1.2,
            boxShadow: '0 4px 12px rgba(138,84,16,.16)',
            border: '1px solid rgba(138,84,16,.18)',
          }}
        >
          <span aria-hidden="true">🏷️</span>
          5% הנחה לסוגרות דרך האתר
        </span>
        {/* <span
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
        </span> */}
      </div>

      <div
        style={{
          padding: compact ? 14 : 18,
          display: 'flex',
          flexDirection: 'column',
          gap: compact ? 6 : 8,
          flex: 1,
        }}
      >
        <h3 style={{ margin: 0, fontFamily: fonts.display, fontWeight: 400, fontSize: compact ? 19 : 21 }}>
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
            minHeight: compact ? 42 : 48,
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
