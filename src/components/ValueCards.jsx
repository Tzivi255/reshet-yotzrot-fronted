import { colors, fonts, layout } from '../theme'
import { valueCards } from '../data/photographers'

// רצועת כרטיסי הערך במסך הבית - מתוך ה-<section> השני ב-design-template.html.

export default function ValueCards({ items = valueCards }) {
  return (
    <section style={{ padding: '8px 18px 56px' }}>
      <div
        style={{
          maxWidth: layout.maxWidth,
          margin: '0 auto',
          display: 'grid',
          gap: 14,
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        }}
      >
        {items.map((v) => (
          <div
            key={v.tag}
            style={{
              background: '#fff',
              border: `1px solid ${colors.cardBorder}`,
              borderRadius: 22,
              padding: 22,
              boxShadow: '0 8px 24px rgba(90,62,71,.05)',
            }}
          >
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 11,
                letterSpacing: '.16em',
                color: colors.amberText,
                marginBottom: 12,
              }}
            >
              {v.tag}
            </div>
            <h3
              style={{
                margin: '0 0 6px',
                fontFamily: fonts.display,
                fontWeight: 400,
                fontSize: 20,
                lineHeight: 1.25,
              }}
            >
              {v.title}
            </h3>
            <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: colors.muted }}>
              {v.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
