import { colors, layout } from '../theme'

// פס זכויות יוצרים דק מתחת ל-Footer (לא בתוכו) - צבע רקע שונה משלו, עם לוגו + טקסט
// זכויות מצד אחד וכתובת מייל בצד השני.

const OWNER_EMAIL = 't0527198255@gmail.com'
const OWNER_MAIL_LINK =
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(OWNER_EMAIL)}` +
  `&su=${encodeURIComponent('פנייה לסטודיו קוק')}`

export default function LegalBar() {
  return (
    <div style={{ background: colors.deepDark, color: '#B9C8D0', padding: '12px 18px' }}>
      <div
        style={{
          maxWidth: layout.maxWidth,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 13,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img
            src="/myLogo.png"
            alt="לוגו סטודיו קוק"
            style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover' }}
          />
          <span>© כל הזכויות שמורות | פיתוח ועיצוב: סטודיו קוק בע"מ</span>
        </div>

        <a
          href={OWNER_MAIL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#B9C8D0' }}
        >
          {OWNER_EMAIL}
        </a>
      </div>
    </div>
  )
}
