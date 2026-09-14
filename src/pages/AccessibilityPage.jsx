import { colors, fonts } from '../theme'
import { michal } from '../data/photographers'

// הצהרת נגישות - עמוד נדרש לפי תקנות שוויון זכויות לאנשים עם מוגבלות
// (התאמות נגישות לשירות), תשע"ג-2013, ות"י 5568 (המבוסס על WCAG 2.0 ברמה AA).

export default function AccessibilityPage() {
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '40px 18px 96px' }}>
      <h1
        style={{
          margin: '0 0 18px',
          fontFamily: fonts.display,
          fontWeight: 400,
          fontSize: 'clamp(28px, 6vw, 38px)',
        }}
      >
        הצהרת נגישות
      </h1>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          fontSize: 16.5,
          lineHeight: 1.8,
          color: colors.text2,
        }}
      >
        <p>
          אתר "רשת היוצרות" פועל להנגיש את השירותים והתכנים המוצעים בו לכלל הציבור, ובכלל זה לאנשים עם
          מוגבלות, בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), תשע״ג-2013, ולתקן
          הישראלי ת״י 5568, המבוסס על הנחיות WCAG 2.0 ברמה AA.
        </p>

        <div>
          <h2 style={{ margin: '0 0 8px', fontFamily: fonts.display, fontWeight: 400, fontSize: 22, color: colors.ink }}>
            אמצעי הנגישות באתר
          </h2>
          <ul style={{ margin: 0, paddingInlineStart: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li>
              תפריט נגישות צף (סמל ה-♿ בתחתית המסך) המאפשר: הגדלה/הקטנה של גודל הטקסט, מצב ניגודיות
              גבוהה, גווני אפור, הדגשת קישורים, פונט קריא ועצירת אנימציות.
            </li>
            <li>קישור "דלג לתוכן המרכזי" בראש כל עמוד, עבור משתמשי מקלדת וקוראי מסך.</li>
            <li>תמיכה בניווט מלא באמצעות מקלדת, כולל אינדיקציית פוקוס ברורה.</li>
            <li>מבנה עמודים סמנטי, טקסט חלופי לתמונות ותגי ARIA עבור קוראי מסך.</li>
          </ul>
        </div>

        <div>
          <h2 style={{ margin: '0 0 8px', fontFamily: fonts.display, fontWeight: 400, fontSize: 22, color: colors.ink }}>
            רמת הנגישות
          </h2>
          <p style={{ margin: 0 }}>
            האתר עומד בדרישות התאמה חלקית לרמה AA, בהתאם ליכולת הטכנית הקיימת. אנו פועלים באופן שוטף
            לשיפור מתמשך של הנגישות באתר.
          </p>
        </div>

        <div>
          <h2 style={{ margin: '0 0 8px', fontFamily: fonts.display, fontWeight: 400, fontSize: 22, color: colors.ink }}>
            פנייה בנושא נגישות
          </h2>
          <p style={{ margin: 0 }}>
            נתקלתם בבעיית נגישות באתר, או שיש לכם הצעה לשיפור? נשמח לשמוע ולטפל בפנייתכם בהקדם האפשרי.
            ניתן לפנות לרכזת הנגישות שלנו:
          </p>
          <p style={{ margin: '8px 0 0', fontWeight: 600, color: colors.ink }}>
            {michal.phone} · {michal.email}
          </p>
        </div>
      </div>
    </main>
  )
}
