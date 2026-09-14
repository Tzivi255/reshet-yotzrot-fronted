import { Link } from 'react-router-dom'
import { colors, fonts, layout } from '../theme'
import { michal } from '../data/photographers'

// כותרת תחתונה - מתוך ה-<footer> שב-design-template.html.

const DEV_EMAIL_LINK =
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent('t0527198255@gmail.com')}` +
  `&su=${encodeURIComponent('שאלה בנוגע לפיתוח אתר')}`

export default function Footer() {
  return (
    <footer style={{ background: colors.deep, color: '#E8EEF1', padding: '30px 18px 40px' }}>
      <div
        style={{
          maxWidth: layout.maxWidth,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <span style={{ fontFamily: fonts.display, fontSize: 18, color: '#fff' }}>
            רשת היוצרות
          </span>
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: '.18em',
              color: colors.amber,
            }}
          >
            MICHAL WEG STUDIO
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            alignItems: 'center',
            fontSize: 14.5,
            color: '#C7D6DE',
          }}
        >
          <a href={michal.phoneHref} style={{ color: '#fff', fontWeight: 600 }}>
            {michal.phone}
          </a>
          <span style={{ color: '#6C8896' }}>·</span>
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(michal.email)}&su=${encodeURIComponent('פנייה דרך רשת היוצרות')}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#fff' }}
          >
            {michal.email}
          </a>
        </div>
      </div>

      {/* <div
        style={{
          maxWidth: layout.maxWidth,
          margin: '20px auto 0',
          paddingTop: 16,
          borderTop: '1px solid rgba(255,255,255,.14)',
        }}
      >
        <div className="footer-bottom-row">
          <span style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, fontSize: 13, color: '#9FB4BF' }}>
            © כל הזכויות שמורות לרשת יוצרות
            <Link to="/accessibility" style={{ color: '#C7D6DE', textDecoration: 'underline' }}>
              הצהרת נגישות
            </Link>
          </span>

          <a
            href={DEV_EMAIL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: '#C7D6DE',
              fontSize: 13.5,
            }}
          >
            <img
              src="/logo.png"
              alt="לוגו המפתח"
              style={{ width: 22, height: 22, borderRadius: '50%', objectFit: 'cover' }}
            />
            <span>נבנה על ידי Claude Code</span>
          </a>
        </div> */}
      {/* </div> */}
    </footer>
  )
}
