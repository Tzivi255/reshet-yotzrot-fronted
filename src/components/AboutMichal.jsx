import { colors, fonts, layout } from '../theme'
import { michal } from '../data/photographers'

// אזור ההיכרות עם מיכל במסך הבית - מתוך ה-<section> הרביעי ב-design-template.html.

export default function AboutMichal() {
  return (
    <section style={{ padding: '0 18px 72px' }}>
      <div
        style={{
          maxWidth: layout.maxWidth,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 24,
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: `1px solid ${colors.cardBorderSoft}`,
          paddingTop: 34,
        }}
      >
        <div>
          <p
            style={{
              margin: '0 0 6px',
              fontFamily: fonts.mono,
              fontSize: 11,
              letterSpacing: '.16em',
              color: colors.amberText,
            }}
          >
            MICHAL · PRODUCER
          </p>
          <h2
            style={{
              margin: '0 0 8px',
              fontFamily: fonts.display,
              fontWeight: 400,
              fontSize: 'clamp(24px, 6vw, 34px)',
            }}
          >
            מיכל · מפיקה ומנהלת רשת היוצרות
          </h2>
          <p style={{ margin: 0, fontSize: 16, color: colors.muted }}>
            אחרי שנים של הפקת קליפים ברמה הגבוהה ביותר והכשרת עשרות יוצרות מוכשרות, הגיע הזמן להרחיב את המעגל.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 240 }}>
          <a
            href={michal.phoneHref}
            style={{
              minHeight: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              borderRadius: 16,
              background: colors.deep,
              color: '#fff',
              fontSize: 17,
              fontWeight: 600,
            }}
          >
            {michal.phone}
          </a>
          <a
            href={`mailto:${michal.email}`}
            style={{
              minHeight: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 16,
              background: '#fff',
              border: `1px solid ${colors.pinkBorder}`,
              color: colors.ink,
              fontSize: 16,
            }}
          >
            {michal.email}
          </a>
        </div>
      </div>
    </section>
  )
}
