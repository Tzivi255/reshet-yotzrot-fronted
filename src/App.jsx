import { colors, fonts, layout } from './theme'
import { photographers } from './data/photographers'
import Navbar from './components/Navbar'
import Header from './components/Header'
import ValueCards from './components/ValueCards'
import HowItWorks from './components/HowItWorks'
import AboutMichal from './components/AboutMichal'
import PhotographerCard from './components/PhotographerCard'
import Footer from './components/Footer'

// שלב 1: הצגת הקומפוננטות הבסיסיות עם נתוני דמה.
// אין עדיין Routing - כל הקומפוננטות מוצגות יחד בעמוד אחד.

export default function App() {
  return (
    <div
      dir="rtl"
      style={{
        fontFamily: fonts.body,
        color: colors.ink,
        background: colors.bg,
        minHeight: '100vh',
        overflowX: 'clip',
      }}
    >
      <Navbar active="home" />

      <main>
        <Header />
        <ValueCards />
        <HowItWorks />
        <AboutMichal />

        {/* תצוגה מקדימה של כרטיסי היוצרות (מסך הגלריה המלא ייבנה בשלב ה-Routing) */}
        <section style={{ maxWidth: layout.maxWidth, margin: '0 auto', padding: '0 18px 72px' }}>
          <h2
            style={{
              margin: '0 0 6px',
              fontFamily: fonts.display,
              fontWeight: 400,
              fontSize: 'clamp(26px, 7vw, 38px)',
            }}
          >
            גלריית היוצרות
          </h2>
          <p style={{ margin: '0 0 22px', fontSize: 16.5, color: colors.muted }}>
            יוצרות מכל רחבי הארץ, ממחירים נגישים ועד רמות פרימיום.
          </p>
          <div
            style={{
              display: 'grid',
              gap: 16,
              gridTemplateColumns: 'repeat(auto-fill, minmax(258px, 1fr))',
            }}
          >
            {photographers.map((p) => (
              <PhotographerCard key={p.id} photographer={p} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
