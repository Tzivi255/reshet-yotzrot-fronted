import { colors, fonts, layout } from '../theme'
import { steps } from '../data/photographers'
import Reveal from './Reveal'

// אזור "איך זה עובד" במסך הבית - מבוסס על ה-<section> השלישי ב-design-template.html.
// לפי תיקוני הלקוחה: מאחד את 4 כרטיסי הערך ואת 3 הצעדים הקודמים ל-3 קוביות בלבד,
// עם כותרת גדולה יותר וכותרת משנית.

export default function HowItWorks({ items = steps }) {
  return (
    // position + zIndex: האזור עולה מעט על תחתית ה-Hero (marginBottom שלילי שם) וצריך להיות מעליו
    <section style={{ position: 'relative', zIndex: 1, padding: '8px 18px 64px' }}>
      {/* לא מופיע לפני תחילת הגלילה - ואז עולה פנימה בהדרגה */}
      <Reveal
        waitForScroll
        variant="rise"
        style={{
          maxWidth: layout.maxWidth,
          margin: '0 auto',
          background: 'linear-gradient(160deg, #FCEAEE, #FBDCE3)',
          borderRadius: 30,
          padding: 'clamp(28px, 6vw, 56px)',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            margin: '0 0 10px',
            fontFamily: fonts.display,
            fontWeight: 400,
            fontSize: 'clamp(34px, 9vw, 58px)',
            lineHeight: 1.1,
          }}
        >
          איך זה עובד
        </h2>
        <p
          style={{
            margin: '0 0 clamp(26px, 5vw, 40px)',
            fontSize: 'clamp(18px, 4.6vw, 22px)',
            fontWeight: 600,
            color: colors.rose,
          }}
        >
          3 צעדים פשוטים להפקה המושלמת שלך
        </p>

        <div
          style={{
            display: 'grid',
            gap: 18,
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            textAlign: 'right',
          }}
        >
          {items.map((s, i) => (
            <Reveal key={s.n} waitForScroll delay={450 + i * 200} style={{ height: '100%' }}>
              <div
                className="lift-card"
                style={{
                  height: '100%',
                  background: '#fff',
                  border: `1px solid ${colors.cardBorder}`,
                  borderRadius: 22,
                  padding: 24,
                  boxShadow: '0 8px 24px rgba(90,62,71,.05)',
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    marginBottom: 16,
                    borderRadius: '50%',
                    background: colors.deep,
                    color: colors.amber,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: fonts.mono,
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  {s.n}
                </div>
                <h3
                  style={{
                    margin: '0 0 8px',
                    fontFamily: fonts.display,
                    fontWeight: 400,
                    fontSize: 22,
                    lineHeight: 1.25,
                    color: colors.ink,
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: colors.muted }}>
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
