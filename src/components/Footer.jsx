import { colors, fonts, layout } from '../theme'
import { michal } from '../data/photographers'

// כותרת תחתונה - מתוך ה-<footer> שב-design-template.html.

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
          <a href={`mailto:${michal.email}`} style={{ color: '#fff' }}>
            {michal.email}
          </a>
        </div>
      </div>
    </footer>
  )
}
