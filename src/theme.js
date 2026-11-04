// טוקני עיצוב שנלקחו ישירות מ-design-template.html.
// כל הקומפוננטות חייבות להשתמש רק בערכים האלה כדי לשמור על עקביות העיצוב.

export const colors = {
  bg: '#FDF6F4',
  ink: '#2C1E23',
  ink2: '#3B272E',
  rose: '#C7395C',
  roseDark: '#94243F',
  deep: '#2F4653',
  deepDark: '#1F323C',
  amber: '#F0A945',
  amberText: '#9E5E10',
  muted: '#7A5560',
  text2: '#5A3E47',
  cardBg: '#fff',
  cardBorder: '#F6E3E7',
  cardBorderSoft: '#F3DAE0',
  pinkBorder: '#F0C4CF',
  chipBlue: '#EDF3F6',
  chipBlueText: '#3F5D6D',
  chipAmberBg: '#FDF0DC',
  chipAmberText: '#8A5410',
  green: '#22B15C',
}

export const fonts = {
  display: "'Secular One', sans-serif",
  body: 'Assistant, system-ui, sans-serif',
  mono: "'Space Mono', monospace",
  // פונט המותג (Index DL Bold מתיקיית החומרים) - לכותרת הענקית 'רשת היוצרות' ב-Hero
  brand: "'Index Brand', 'Secular One', sans-serif",
}

export const layout = {
  maxWidth: 1120,
}

// רקע ה-Hero: גרדיאנט דהייה מעל תמונת המצלמה (public/camera-hero.jpg - גרסה חתוכה
// של camera.jpg בלי השמיים הריקים בראש התמונה), במקום assets/hero-clouds.png שלא
// קיים בפרויקט. האלפא הועלתה ביחס לתבנית המקורית כדי שהתמונה תשתלב ברקע בעדינות רבה יותר.
// עדכון לפי מסמך התיקונים: הרקע נצבע בגוון ורוד-אפרסק חם יותר (כמו בהדמיה שהלקוחה שלחה)
// כדי שהלוגו הלבן ייראה עליו, ונמוג לצבע הרקע של האתר רק בתחתית.
// עדכון: המצלמה כבר לא ממלאת את כל הרקע - היא מוצגת בשכבה נפרדת בצד שמאל, בשקיפות
// (ראו heroCameraImage ב-Header), והגרדיאנט נשאר כרקע מלא.
export const heroBackground =
  'linear-gradient(to top, rgba(253,246,244,1) 3%, rgba(247,196,204,.55) 26%, rgba(240,160,178,.42) 60%, rgba(236,150,170,.5) 100%), ' +
  'linear-gradient(to left, rgba(232,120,150,.28), rgba(245,180,160,.22)), ' +
  'linear-gradient(#F4B9C6, #F4B9C6)'

export const heroCameraImage = "url('/camera-hero.jpg')"
