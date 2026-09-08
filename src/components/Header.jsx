import { colors, fonts, layout, heroBackground } from '../theme'
import { michal } from '../data/photographers'
import useHover from '../hooks/useHover'

// אזור ה-Hero של מסך הבית - מתוך ה-<section> הראשון ב-design-template.html.

export default function Header({ onGoGallery = () => {} }) {
  const [ctaHover, ctaBind] = useHover()
  const [phoneHover, phoneBind] = useHover()

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '78vh',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '28px 18px 40px',
        backgroundImage: heroBackground,
        backgroundSize: 'cover',
        backgroundPosition: '50% 22%',
      }}
    >
      <div
        style={{
          maxWidth: layout.maxWidth,
          margin: '0 auto',
          width: '100%',
          animation: 'riseIn .7s ease both',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 12px',
            borderRadius: 999,
            background: colors.deep,
            border: `1px solid ${colors.deep}`,
            fontFamily: fonts.mono,
            fontSize: 11,
            letterSpacing: '.1em',
            color: colors.amber,
            marginBottom: 18,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#E0325A',
              animation: 'recBlink 1.6s infinite',
            }}
          />
          REC · 4K · 25FPS
        </div>

        <p style={{ margin: '0 0 10px', fontSize: 16, color: colors.muted, letterSpacing: '.02em' }}>
          תמיד חלמת על קליפ מהסרטים?
        </p>

        <h1
          style={{
            margin: '0 0 18px',
            fontFamily: fonts.display,
            fontWeight: 400,
            fontSize: 'clamp(38px, 11vw, 76px)',
            lineHeight: 1.02,
            letterSpacing: '-.01em',
            color: colors.ink,
            textWrap: 'balance',
          }}
        >
          גם לך מגיע
          <br />
          <span style={{ color: colors.rose }}>הפקה מושלמת</span>
        </h1>

        <p
          style={{
            margin: '0 0 28px',
            maxWidth: '30em',
            fontSize: 'clamp(16px, 4.4vw, 20px)',
            lineHeight: 1.6,
            color: colors.text2,
            textWrap: 'pretty',
          }}
        >
          הקמנו עבורך רשת של יוצרות מובחרות, בוגרות הקורסים המקצועיים של מיכל, שיגשימו לך חלומות מהסרטים.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <button
            {...ctaBind}
            onClick={onGoGallery}
            style={{
              minHeight: 54,
              padding: '0 30px',
              border: 0,
              borderRadius: 999,
              background: ctaHover ? colors.roseDark : colors.rose,
              color: '#fff',
              fontSize: 18,
              fontWeight: 700,
              boxShadow: '0 12px 28px rgba(199,57,92,.28)',
              transform: ctaHover ? 'translateY(-1px)' : 'none',
            }}
          >
            לגלריית היוצרות
          </button>

          <a
            {...phoneBind}
            href={michal.phoneHref}
            style={{
              minHeight: 54,
              padding: '0 26px',
              display: 'inline-flex',
              alignItems: 'center',
              borderRadius: 999,
              background: phoneHover ? colors.deepDark : colors.deep,
              border: `1px solid ${colors.deep}`,
              color: '#fff',
              fontSize: 17,
              fontWeight: 600,
            }}
          >
            לפרטים והתאמת יוצרת
          </a>
        </div>
      </div>
    </section>
  )
}
