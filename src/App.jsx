import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { colors, fonts } from './theme'
import { PhotographersProvider } from './context/PhotographersProvider'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import GalleryPage from './pages/GalleryPage'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/AdminPage'

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
          }}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/photographer/:id" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </PhotographersProvider>
  )
}
