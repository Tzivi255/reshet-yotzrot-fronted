import { colors, fonts, layout, heroBackground } from '../theme'
import useHover from '../hooks/useHover'
import useTypewriter from '../hooks/useTypewriter'

// אזור ה-Hero של מסך הבית - מתוך ה-<section> הראשון ב-design-template.html.

// משפט הסיום מוקלד אות-אות (בקשת הלקוחה: "משהו שזז ולא סטטי").
const TAGLINE = 'כי גם לך מגיע הפקה מושלמת'

// נקודות אור ("בוקה") שמרחפות ברקע - מיקום/גודל/השהיה קבועים כדי שלא יקפצו בכל רינדור.
const BOKEH = [
  { left: '8%', bottom: '18%', size: 10, delay: 0, dur: 9 },
  { left: '22%', bottom: '40%', size: 6, delay: 2.5, dur: 11 },
  { left: '38%', bottom: '12%', size: 14, delay: 4, dur: 10 },
  { left: '55%', bottom: '30%', size: 8, delay: 1.2, dur: 12 },
  { left: '70%', bottom: '15%', size: 12, delay: 3.4, dur: 9.5 },
  { left: '84%', bottom: '45%', size: 7, delay: 5.2, dur: 11.5 },
  { left: '93%', bottom: '22%', size: 10, delay: 6.5, dur: 10.5 },
]

// פינות "עינית מצלמה" סביב ה-Hero - ממשיכות את שפת ה-REC של התבנית.
const VIEWFINDER_CORNERS = [
  { top: 18, right: 18, borderTop: true, borderRight: true },
  { top: 18, left: 18, borderTop: true, borderLeft: true },
  { bottom: 88, right: 18, borderBottom: true, borderRight: true },
  { bottom: 88, left: 18, borderBottom: true, borderLeft: true },
]

// עיכוב מדורג לאנימציית הכניסה של כל שורה.
const enter = (name, delay, duration = 0.8) => ({
  animation: `${name} ${duration}s cubic-bezier(.2,.7,.2,1) ${delay}s both`,
})

export default function Header({ onGoGallery = () => {}, onGoWorks = () => {} }) {
  const [ctaHover, ctaBind] = useHover()
  const [phoneHover, phoneBind] = useHover()
  const { count, done } = useTypewriter(TAGLINE, { startDelay: 1300, speed: 70 })

  return (
    <section
      style={{
        position: 'relative',
        zIndex: 0,
        overflow: 'hidden',
        width: '100%',
        minHeight: 'calc(86vh - 45px)',
        display: 'flex',
        alignItems: 'center',
        padding: '28px 18px 110px',
        backgroundColor: colors.bg,
        marginBottom: -70,
      }}
    >
      {/* שכבת הרקע - בנפרד כדי שאפשר יהיה להפעיל עליה זום איטי בלי להזיז את התוכן */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: heroBackground,
          backgroundSize: 'cover',
          backgroundPosition: '62% top',
          backgroundRepeat: 'no-repeat',
          transformOrigin: '60% 30%',
          animation: 'heroZoom 22s ease-in-out infinite alternate',
        }}
      />

      {/* נקודות אור מרחפות */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {BOKEH.map((b, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: b.left,
              bottom: b.bottom,
              width: b.size,
              height: b.size,
              borderRadius: '50%',
              background: 'rgba(255,255,255,.85)',
              boxShadow: '0 0 14px 4px rgba(255,255,255,.55)',
              animation: `floatUp ${b.dur}s ease-in-out ${b.delay}s infinite`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* פינות עינית */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {VIEWFINDER_CORNERS.map(({ borderTop, borderBottom, borderLeft, borderRight, ...pos }, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              ...pos,
              width: 'clamp(22px, 4vw, 38px)',
              height: 'clamp(22px, 4vw, 38px)',
              borderTop: borderTop ? '2px solid rgba(255,255,255,.85)' : undefined,
              borderBottom: borderBottom ? '2px solid rgba(255,255,255,.85)' : undefined,
              borderLeft: borderLeft ? '2px solid rgba(255,255,255,.85)' : undefined,
              borderRight: borderRight ? '2px solid rgba(255,255,255,.85)' : undefined,
              animation: 'viewfinderPulse 3.2s ease-in-out infinite',
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: layout.maxWidth,
          margin: '0 auto',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 'fit-content',
            marginInlineEnd: 'auto',
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
            marginBottom: 22,
            ...enter('riseIn', 0.1, 0.6),
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

        {/* לוגו בצבע לבן למעלה */}
        <img
          src="/logo-white.png"
          alt="רשת היוצרות · Michal Weg"
          width={900}
          height={330}
          style={{
            display: 'block',
            width: 'clamp(150px, 38vw, 240px)',
            height: 'auto',
            margin: '0 auto 22px',
            filter: 'drop-shadow(0 2px 10px rgba(148,36,63,.35))',
            ...enter('logoIn', 0.25, 0.9),
          }}
        />

        <p
          style={{
            margin: '0 0 4px',
            fontSize: 'clamp(20px, 5.4vw, 30px)',
            fontWeight: 600,
            color: colors.ink2,
            letterSpacing: '.01em',
            ...enter('riseIn', 0.45, 0.7),
          }}
        >
          תמיד חלמת על קליפ מהסרטים?
        </p>

        {/* "רשת היוצרות" בענק, בצבע הוורוד, בפונט Index Bold (הכי קרוב להדמיה של הלקוחה) - עם ברק אור שעובר עליו כל 3.5 שניות */}
        <h1
          style={{
            margin: '0 0 6px',
            fontFamily: fonts.brand,
            fontWeight: 700,
            fontSize: 'clamp(72px, 20vw, 170px)',
            lineHeight: 0.95,
            letterSpacing: 0,
            color: colors.rose,
            backgroundImage: `linear-gradient(100deg, ${colors.rose} 0%, ${colors.rose} 40%, #F07A97 50%, ${colors.rose} 60%, ${colors.rose} 100%)`,
            backgroundSize: '250% 100%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 6px 18px rgba(148,36,63,.18))',
            animation:
              'titleIn 1s cubic-bezier(.2,.7,.2,1) .6s both, shimmer 3.5s ease-in-out 2.2s infinite',
          }}
        >
          רשת היוצרות
        </h1>

        {/* משפט הסיום - מוקלד אות אחר אות. הטקסט המלא תופס מקום מראש כדי שהעמוד לא יקפוץ */}
        <p
          aria-label={TAGLINE}
          style={{
            margin: '0 0 22px',
            fontFamily: fonts.display,
            fontSize: 'clamp(20px, 5.6vw, 34px)',
            letterSpacing: '.08em',
            color: colors.amberText,
            minHeight: '1.3em',
            ...enter('riseIn', 0.9, 0.6),
          }}
        >
          <span aria-hidden="true">
            {TAGLINE.slice(0, count)}
            <span
              style={{
                display: 'inline-block',
                width: 3,
                height: '1em',
                marginInline: 3,
                verticalAlign: '-0.12em',
                background: colors.rose,
                borderRadius: 2,
                animation: done ? 'caretBlink 1s steps(1) infinite' : 'none',
              }}
            />
            <span style={{ visibility: 'hidden' }}>{TAGLINE.slice(count)}</span>
          </span>
        </p>

        <p
          style={{
            margin: '0 0 28px',
            ...enter('riseIn', 1.1, 0.7),
            maxWidth: '30em',
            marginInline: 'auto',
            fontSize: 'clamp(16px, 4.4vw, 20px)',
            lineHeight: 1.6,
            color: colors.text2,
            textWrap: 'pretty',
          }}
        >
          הקמנו עבורך רשת של יוצרות מובחרות, בוגרות הקורסים המקצועיים של מיכל וויג, שיגשימו לך חלומות מהסרטים.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, ...enter('riseIn', 1.25, 0.7) }}>
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
           לבחירת יוצרת לקליפ
          </button>

          <button
            {...phoneBind}
            onClick={onGoWorks}
            style={{
              minHeight: 54,
              padding: '0 26px',
              border: 0,
              borderRadius: 999,
              background: phoneHover ? colors.deepDark : colors.deep,
              color: '#fff',
              fontSize: 17,
              fontWeight: 600,
            }}
          >
לצפייה בעבודות          </button>
        </div>
      </div>
    </section>
  )
}
