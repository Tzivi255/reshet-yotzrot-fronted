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
    portfolio: 'https://example.com/noa',
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
    portfolio: 'https://example.com/shira',
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
    portfolio: 'https://example.com/tamar',
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
    portfolio: 'https://example.com/hodaya',
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
    portfolio: 'https://example.com/avigail',
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
    portfolio: 'https://example.com/renana',
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
    portfolio: 'https://example.com/michala',
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
    portfolio: 'https://example.com/yael',
    bio: 'הפקות לנשים בלבד, מהתסריט ועד העריכה. מלווה מקרוב בבחירת המוזיקה והלוקיישן.',
  },
]

// כרטיסי הערך שמופיעים במסך הבית.
export const valueCards = [
  { tag: 'QUALITY', title: 'אחריות ואיכות', body: 'חתומים על כל פרויקט שיוצא מהרשת, מהתכנון ועד הקובץ הסופי.' },
  { tag: 'PRICE', title: 'ממחירים נגישים ועד פרימיום', body: 'כל תקציב מקבל התאמה, בלי להתפשר על הרמה המקצועית.' },
  { tag: 'AREA', title: 'יוצרות מכל רחבי הארץ', body: 'מהצפון ועד הדרום, תמיד יש יוצרת שמצלמת קרוב אליך.' },
  { tag: 'MATCH', title: 'התאמה מושלמת לצרכים שלך', body: 'אנחנו מתאימות את היוצרת לסגנון, לאווירה ולקצב שמתאימים לך.' },
]

// שלבי "איך זה עובד".
export const steps = [
  { n: '1', text: 'נקשיב לחזון ולתקציב' },
  { n: '2', text: 'נציע יוצרת שמתאימה לך בדיוק' },
  { n: '3', text: 'קיבלת קליפ מדהים כמו שתמיד חלמת' },
]

// פרטי הקשר של מיכל.
export const michal = {
  phone: '052-716-6507',
  phoneHref: 'tel:0527166507',
  email: 'michal66507@gmail.com',
}

// עזר לפורמט מחיר בשקלים, כמו fmt() בתבנית.
export function formatPrice(n) {
  return Number(n || 0).toLocaleString('he-IL') + ' ₪'
}
