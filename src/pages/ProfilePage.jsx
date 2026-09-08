import { useNavigate, useParams } from 'react-router-dom'
import { colors, fonts } from '../theme'
import { decoratePhotographer } from '../data/photographers'
import { usePhotographers } from '../context/photographersStore'

// עמוד פרופיל מפורט ליוצרת בודדת - מקביל ל-sc-if isProfile שב-design-template.html.

const statBox = (bg) => ({
  background: bg,
  borderRadius: 18,
  padding: 16,
})

export default function ProfilePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getPhotographer } = usePhotographers()

  const raw = getPhotographer(id)

  if (!raw) {
    return (
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '40px 18px 96px', textAlign: 'center' }}>
        <p style={{ fontSize: 17, color: colors.muted, marginBottom: 16 }}>היוצרת לא נמצאה.</p>
        <button
          onClick={() => navigate('/gallery')}
          style={{
            minHeight: 46,
            padding: '0 20px',
            borderRadius: 999,
            border: `1px solid ${colors.pinkBorder}`,
            background: '#fff',
            fontSize: 16,
          }}
        >
          חזרה לגלריה
        </button>
      </main>
    )
  }

  const current = decoratePhotographer(raw)

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '20px 18px 96px' }}>
      <button
        onClick={() => navigate('/gallery')}
        style={{
          background: 'none',
          border: 0,
          padding: '8px 0',
          fontSize: 15.5,
          color: colors.muted,
          marginBottom: 10,
        }}
      >
        ← חזרה לגלריה
      </button>

      <div
        style={{
          background: '#fff',
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: 28,
          overflow: 'hidden',
          boxShadow: '0 14px 34px rgba(90,62,71,.07)',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(150deg, #FCEAEE, #F8C9D5)',
            padding: '30px 22px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 18,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: 92,
              height: 92,
              borderRadius: '50%',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: fonts.display,
              fontSize: 34,
              color: colors.rose,
              boxShadow: '0 8px 20px rgba(148,36,63,.16)',
            }}
          >
            {current.initial}
          </div>
          <div>
            <h1
              style={{
                margin: '0 0 6px',
                fontFamily: fonts.display,
                fontWeight: 400,
                fontSize: 'clamp(28px, 7vw, 40px)',
                lineHeight: 1.1,
              }}
            >
              {current.name}
            </h1>
            <p style={{ margin: 0, fontSize: 17, color: colors.roseDark, fontWeight: 600 }}>
              {current.shootingCategory}
            </p>
          </div>
        </div>

        <div style={{ padding: '24px 22px 28px', display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div
            style={{
              display: 'grid',
              gap: 12,
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            }}
          >
            <Stat bg="#FDF1F3" labelColor={colors.chipBlueText} label="LOCATION" value={current.location} />
            <Stat bg={colors.chipAmberBg} labelColor={colors.chipAmberText} label="PRICE" value={current.priceLabel} />
            <Stat bg={colors.chipBlue} labelColor={colors.chipBlueText} label="STYLE" value={current.style} />
          </div>

          <div>
            <h2
              style={{
                margin: '0 0 8px',
                fontFamily: fonts.display,
                fontWeight: 400,
                fontSize: 23,
              }}
            >
              כמה מילים עלי
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: 17,
                lineHeight: 1.7,
                color: colors.text2,
                textWrap: 'pretty',
              }}
            >
              {current.bio}
            </p>
          </div>

          <div>
            <h2
              style={{
                margin: '0 0 10px',
                fontFamily: fonts.display,
                fontWeight: 400,
                fontSize: 23,
              }}
            >
              תיק עבודות
            </h2>
            <a
              href={current.portfolio}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'block',
                borderRadius: 20,
                overflow: 'hidden',
                border: `1px solid ${colors.pinkBorder}`,
              }}
            >
              <div
                style={{
                  height: 150,
                  backgroundImage:
                    'repeating-linear-gradient(135deg, #EDF3F6 0 12px, #E0EAEF 12px 24px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: fonts.mono,
                  fontSize: 12,
                  letterSpacing: '.12em',
                  color: colors.chipBlueText,
                }}
              >
                PORTFOLIO COVER
              </div>
              <div
                style={{
                  padding: '14px 16px',
                  background: '#fff',
                  fontSize: 16,
                  fontWeight: 600,
                  color: colors.rose,
                }}
              >
                לצפייה בתיק העבודות המלא ↗
              </div>
            </a>
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'sticky',
          bottom: 0,
          marginTop: 20,
          background: 'rgba(253,246,244,.94)',
          backdropFilter: 'blur(8px)',
          padding: '12px 0',
          display: 'grid',
          gap: 10,
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        }}
      >
        {current.hasWhatsApp && (
          <a
            href={current.waLink}
            target="_blank"
            rel="noreferrer"
            style={{
              minHeight: 56,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              borderRadius: 18,
              background: colors.green,
              color: '#fff',
              fontSize: 17.5,
              fontWeight: 700,
              boxShadow: '0 10px 24px rgba(34,177,92,.28)',
            }}
          >
            וואטסאפ
          </a>
        )}
        <a
          href={current.telLink}
          style={{
            minHeight: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 18,
            background: colors.deep,
            color: '#fff',
            fontSize: 17.5,
            fontWeight: 700,
          }}
        >
          חיוג
        </a>
        <a
          href={current.mailLink}
          style={{
            minHeight: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 18,
            background: '#fff',
            border: `2px solid ${colors.deep}`,
            color: colors.deep,
            fontSize: 17.5,
            fontWeight: 700,
          }}
        >
          מייל
        </a>
      </div>
    </main>
  )
}

function Stat({ bg, labelColor, label, value }) {
  return (
    <div style={statBox(bg)}>
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 10.5,
          letterSpacing: '.16em',
          color: labelColor,
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 17, fontWeight: 600 }}>{value}</div>
    </div>
  )
}
