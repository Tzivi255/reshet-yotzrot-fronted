// נתוני דמה - נלקחו מ-SEED שבתוך design-template.html.
// בשלב מאוחר יותר המידע הזה יגיע מה-Backend.

export const photographers = [
  {
    id: 1,
    name: 'נועה ברזילי',
    shootingCategory: 'קליפים ואירועים',
    style: 'קינמטי',
    location: 'תל אביב והמרכז',
    price: 2500,
    hasWhatsApp: true,
    phone: '052-7612070',
    email: 'noa@example.com',
    portfolio: 'https://drive.google.com/drive/folders/1xj4t1trzKJ56ks4QRJ1-z85uNefLj9kI?usp=drive_link',
    bio: 'מצלמת קליפים כבר חמש שנים, עם דגש על תנועה, אור טבעי ורגש. מגיעה עם צוות קטן שמאפשר גמישות מלאה ביום הצילום.',
  },
  {
    id: 2,
    name: 'שירה אלמוג',
    shootingCategory: 'הריון ומשפחה',
    style: 'רומנטי',
    location: 'חיפה והצפון',
    price: 1200,
    hasWhatsApp: true,
    phone: '052-7612071',
    email: 'shira@example.com',
    portfolio: 'https://drive.google.com/drive/folders/1xj4t1trzKJ56ks4QRJ1-z85uNefLj9kI?usp=drive_link',
    bio: 'אוהבת לצלם רגעים שקטים בתוך הבלגן המשפחתי. הסטים שלי בחוץ, לרוב בשעה הזהובה.',
  },
  {
    id: 3,
    name: 'תמר לוגסי',
    shootingCategory: 'בת מצווה וקליפים',
    style: 'צבעוני',
    location: 'ירושלים והסביבה',
    price: 1800,
    hasWhatsApp: false,
    phone: '052-7612072',
    email: 'tamar@example.com',
    portfolio: 'https://drive.google.com/drive/folders/1xj4t1trzKJ56ks4QRJ1-z85uNefLj9kI?usp=drive_link',
    bio: 'מתמחה בהפקות לבנות: תסריט, לוקיישן וסטיילינג, כך שכל בת מצווה מקבלת קליפ שנראה כמו מהסרטים.',
  },
  {
    id: 4,
    name: 'הודיה כרמי',
    shootingCategory: 'אופנה וקמפיינים',
    style: 'פרימיום',
    location: 'השרון',
    price: 3200,
    hasWhatsApp: true,
    phone: '052-7612073',
    email: 'hodaya@example.com',
    portfolio: 'https://drive.google.com/drive/folders/1xj4t1trzKJ56ks4QRJ1-z85uNefLj9kI?usp=drive_link',
    bio: 'עובדת עם מעצבות ומותגים קטנים על קמפיינים בסטודיו ובחוץ, מהקונספט ועד הרטוש הסופי.',
  },
  {
    id: 5,
    name: 'אביגיל רוט',
    shootingCategory: 'תדמית לעסקים',
    style: 'נקי',
    location: 'באר שבע והדרום',
    price: 950,
    hasWhatsApp: true,
    phone: '052-7612074',
    email: 'avigail@example.com',
    portfolio: 'https://drive.google.com/drive/folders/1xj4t1trzKJ56ks4QRJ1-z85uNefLj9kI?usp=drive_link',
    bio: 'צילומי תדמית לנשות עסקים: פשוט, מהיר ומדויק, כולל ליווי בבחירת התמונות לאתר וללינקדאין.',
  },
  {
    id: 6,
    name: 'רננה שגב',
    shootingCategory: 'חתונות',
    style: 'דוקומנטרי',
    location: 'המרכז',
    price: 4500,
    hasWhatsApp: true,
    phone: '052-7612075',
    email: 'renana@example.com',
    portfolio: 'https://drive.google.com/drive/folders/1xj4t1trzKJ56ks4QRJ1-z85uNefLj9kI?usp=drive_link',
    bio: 'מצלמת חתונות בגישה דוקומנטרית, בלי בימוי מאולץ. מספקת גם קליפ קצר לצד האלבום.',
  },
  {
    id: 7,
    name: 'מיכל אדרי',
    shootingCategory: 'ילדים בסטודיו',
    style: 'שובב',
    location: 'הצפון',
    price: 700,
    hasWhatsApp: false,
    phone: '052-7612076',
    email: 'michala@example.com',
    portfolio: 'https://drive.google.com/drive/folders/1xj4t1trzKJ56ks4QRJ1-z85uNefLj9kI?usp=drive_link',
    bio: 'סטודיו קטן וחמים לצילומי ילדים, עם המון סבלנות וזמן משחק לפני שמתחילים לצלם.',
  },
  {
    id: 8,
    name: 'יעל ניסים',
    shootingCategory: 'קליפים לנשים',
    style: 'קינמטי',
    location: 'ירושלים והסביבה',
    price: 2200,
    hasWhatsApp: true,
    phone: '052-7612077',
    email: 'yael@example.com',
    portfolio: 'https://drive.google.com/drive/folders/1xj4t1trzKJ56ks4QRJ1-z85uNefLj9kI?usp=drive_link',
    bio: 'הפקות לנשים בלבד, מהתסריט ועד העריכה. מלווה מקרוב בבחירת המוזיקה והלוקיישן.',
  },
]

// שלושת הצעדים של "איך זה עובד" במסך הבית (לפי תיקוני הלקוחה - מחליפים את 4 כרטיסי הערך ו-3 הצעדים הקודמים).
export const steps = [
  {
    n: '1',
    title: 'סגנון ותקציב',
    body: 'מגדירה באתר את האזור, הסגנון והתקציב שמתאימים לך בדיוק',
  },
  {
    n: '2',
    title: 'מציאת היוצרת המתאימה',
    body: 'צופה בתיקי העבודות, מתרשמת מהסגנון ובוחרת את היוצרת שהכי התחברת לקו שלה',
  },
  {
    n: '3',
    title: 'יש לנו את זה – ו-5% הנחה!',
    body: 'סוגרת ישירות מול היוצרת דרך האתר, ונהנית מקליפ מושלם בסטנדרט האיכות של בוגרות הרשת ובהטבה בלעדית',
  },
]

// טווחי המחירים לסינון בגלריה - נלקח מ-BANDS שבתבנית.
export const priceBands = [
  { key: 'all', label: 'הכל', min: 0, max: Infinity },
  // לפי בקשת הלקוחה - 3 טווחים. 1,500 בדיוק נכלל ב"עד 1,500", ו-2,000 בדיוק נכלל ב"2,000 ומעלה".
  { key: 'a', label: 'עד 1,500 ₪', min: 0, max: 1500, includeMax: true },
  { key: 'b', label: '1,500–2,000 ₪', min: 1500, max: 2000, excludeMin: true },
  { key: 'c', label: '2,000 ₪ ומעלה', min: 2000, max: Infinity },
]

// האם מחיר נכנס לטווח מסוים.
export function inPriceBand(price, band) {
  const aboveMin = band.excludeMin ? price > band.min : price >= band.min
  const belowMax = band.includeMax ? price <= band.max : price < band.max
  return aboveMin && belowMax
}

// טיוטה ריקה לטופס הוספת יוצרת - נלקח מ-EMPTY שבתבנית.
export const EMPTY_PHOTOGRAPHER = {
  name: '',
  shootingCategory: '',
  style: '',
  location: '',
  price: '',
  phone: '',
  email: '',
  portfolio: '',
  bio: '',
  hasWhatsApp: true,
  logoUrl: '',
  logoFile: null,
}

// פרטי הקשר של מיכל.
// export const michal = {
//   phone: '052-716-6507',
//   phoneHref: 'tel:0527166507',
//   email: 'michal66507@gmail.com',
// }
export const michal = {
  phone: '052-716-6507',
  phoneHref: 'tel:0527166507',
  waHref:
    'https://wa.me/972527166507?text=' +
    encodeURIComponent('היי מיכל, אשמח לשמוע פרטים על רשת היוצרות.'),
  email: 'michal66507@gmail.com',
}

// עזר לפורמט מחיר בשקלים, כמו fmt() בתבנית.
export function formatPrice(n) {
  return Number(n || 0).toLocaleString('he-IL') + ' ₪'
}

// חישוב שדות נגזרים ליוצרת - מקביל ל-decorate() שבתבנית.
export function decoratePhotographer(p) {
  const digits = String(p.phone || '').replace(/\D/g, '')
  const intl = digits.replace(/^0/, '972')
  return {
    ...p,
    initial: (p.name || '?').trim().charAt(0),
    priceLabel: formatPrice(p.price),
    adminMeta: `${p.shootingCategory} · ${p.location} · ${formatPrice(p.price)}`,
    waLink:
      `https://wa.me/${intl}?text=` +
      encodeURIComponent(`היי ${p.name}, הגעתי דרך רשת היוצרות ואשמח לשמוע פרטים על צילומים.`),
    mailLink:
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(p.email)}` +
      `&su=${encodeURIComponent('פנייה דרך רשת היוצרות')}` +
      '&body=' +
      encodeURIComponent(
        `היי ${p.name},\n\nהגעתי אליך דרך רשת היוצרות של מיכל.\nאשמח לשמוע על זמינות ומחיר ל${p.shootingCategory}.\n\nתודה!`,
      ),
  }
}
