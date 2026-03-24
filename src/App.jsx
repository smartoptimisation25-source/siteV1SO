import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import FormationCPF from './pages/FormationCPF'
import FormationOPCO from './pages/FormationOPCO'
import FormationSurMesure from './pages/FormationSurMesure'
import FormationEnvironnements from './pages/FormationEnvironnements'
import SolutionIA from './pages/SolutionIA'
import EducIA from './pages/EducIA'
import Contact from './pages/Contact'
import MentionsLegales from './pages/MentionsLegales'
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite'
import RGPD from './pages/RGPD'
import Cookies from './pages/Cookies'
import NotFound from './pages/NotFound'
import BlogIndex from './pages/BlogIndex'
import BlogArticle from './pages/BlogArticle'

/* Scroll en haut à chaque changement de route */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div style={{ fontFamily: "'MarkPro', 'Inter', sans-serif", background: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/formation/cpf" element={<FormationCPF />} />
            <Route path="/formation/opco" element={<FormationOPCO />} />
            <Route path="/formation/sur-mesure" element={<FormationSurMesure />} />
            <Route path="/formation/environnements" element={<FormationEnvironnements />} />
            <Route path="/solution-ia" element={<SolutionIA />} />
            <Route path="/educ-ia" element={<EducIA />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/confidentialite" element={<PolitiqueConfidentialite />} />
            <Route path="/rgpd" element={<RGPD />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
