import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { colors, fonts } from './theme'
import { PhotographersProvider } from './context/PhotographersProvider'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LegalBar from './components/LegalBar'
import AccessibilityWidget from './components/AccessibilityWidget'
import HomePage from './pages/HomePage'
import GalleryPage from './pages/GalleryPage'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/AdminPage'
import AccessibilityPage from './pages/AccessibilityPage'

// שלב 2: Routing בין העמודים.
// Navbar ו-Footer קבועים בכל עמוד, כמו ה-header/footer שב-design-template.html.

export default function App() {
  return (
    <PhotographersProvider>
      <BrowserRouter>
        <div
          dir="rtl"
          style={{
            fontFamily: fonts.body,
            color: colors.ink,
            background: colors.bg,
            minHeight: '100vh',
            overflowX: 'clip',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <a href="#main-content" className="skip-link">
            דלג לתוכן המרכזי
          </a>
          <Navbar />
          <div id="main-content" style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/photographer/:id" element={<ProfilePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/accessibility" element={<AccessibilityPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
          <LegalBar />
          <AccessibilityWidget />
        </div>
      </BrowserRouter>
    </PhotographersProvider>
  )
}
