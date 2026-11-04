import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import usePageTitle from '../hooks/usePageTitle'
import HowItWorks from '../components/HowItWorks'
import AboutMichal from '../components/AboutMichal'

// מסך הבית - מקביל ל-sc-if isHome שב-design-template.html.

export default function HomePage() {
  usePageTitle()
  const navigate = useNavigate()

  return (
    <main>
      <Header onGoGallery={() => navigate('/gallery')} onGoWorks={() => navigate('/works')} />
      <HowItWorks />
      <AboutMichal />
    </main>
  )
}
