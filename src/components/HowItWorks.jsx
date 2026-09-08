import { colors, fonts, layout } from '../theme'
import { steps } from '../data/photographers'

// אזור "איך זה עובד" במסך הבית - מתוך ה-<section> השלישי ב-design-template.html.

export default function HowItWorks({ items = steps }) {
  return (
    <section style={{ padding: '0 18px 64px' }}>
      <div
        style={{
          maxWidth: layout.maxWidth,
          margin: '0 auto',
          background: 'linear-gradient(160deg, #FCEAEE, #FBDCE3)',
          borderRadius: 30,
          padding: 'clamp(26px, 6vw, 52px)',
        }}
      >
        <h2
          style={{
            margin: '0 0 26px',
            fontFamily: fonts.display,
            fontWeight: 400,
            fontSize: 'clamp(26px, 7vw, 38px)',
            lineHeight: 1.15,
          }}
        >
          איך זה עובד
        </h2>
        <div
          style={{
            display: 'grid',
            gap: 16,
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          }}
        >
          {items.map((s) => (
            <div
              key={s.n}
              style={{
                display: 'flex',
                gap: 14,
                alignItems: 'flex-start',
                background: 'rgba(255,255,255,.7)',
                borderRadius: 20,
                padding: 20,
              }}
            >
              <div
                style={{
                  flex: '0 0 auto',
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: colors.deep,
                  color: colors.amber,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: fonts.mono,
                  fontSize: 15,
                }}
              >
                {s.n}
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 17,
                  lineHeight: 1.5,
                  color: colors.ink2,
                  fontWeight: 600,
                }}
              >
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
