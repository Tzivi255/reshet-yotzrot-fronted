import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import HowItWorks from '../components/HowItWorks'
import AboutMichal from '../components/AboutMichal'

// מסך הבית - מקביל ל-sc-if isHome שב-design-template.html.

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <main>
      <Header onGoGallery={() => navigate('/gallery')} />
      <HowItWorks />
      <AboutMichal />
    </main>
  )
}
