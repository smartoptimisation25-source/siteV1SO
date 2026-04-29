import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import Home from './pages/Home'

const FormationCPF = lazy(() => import('./pages/FormationCPF'))
const FormationOPCO = lazy(() => import('./pages/FormationOPCO'))
const FormationSurMesure = lazy(() => import('./pages/FormationSurMesure'))
const FormationEnvironnements = lazy(() => import('./pages/FormationEnvironnements'))
const FormationVibeCoding = lazy(() => import('./pages/FormationVibeCoding'))
const SolutionIA = lazy(() => import('./pages/SolutionIA'))
const EducIA = lazy(() => import('./pages/EducIA'))
const Contact = lazy(() => import('./pages/Contact'))
const MentionsLegales = lazy(() => import('./pages/MentionsLegales'))
const PolitiqueConfidentialite = lazy(() => import('./pages/PolitiqueConfidentialite'))
const RGPD = lazy(() => import('./pages/RGPD'))
const Cookies = lazy(() => import('./pages/Cookies'))
const CGV = lazy(() => import('./pages/CGV'))
const NotFound = lazy(() => import('./pages/NotFound'))
const BlogIndex = lazy(() => import('./pages/BlogIndex'))
const BlogArticle = lazy(() => import('./pages/BlogArticle'))
const FormationIAStrasbourg = lazy(() => import('./pages/FormationIAStrasbourg'))
const FormationIAMulhouse = lazy(() => import('./pages/FormationIAMulhouse'))
const FormationIAColmar = lazy(() => import('./pages/FormationIAColmar'))
const FormationMarketingIA = lazy(() => import('./pages/FormationMarketingIA'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

const PAGE_VARIANTS = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.4, 0, 0.2, 1] } },
  exit:   { opacity: 0, y: -10, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } },
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={PAGE_VARIANTS}
        initial="hidden"
        animate="show"
        exit="exit"
        style={{ flex: 1 }}
      >
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
              <Route path="/formation/cpf" element={<FormationCPF />} />
              <Route path="/formation/opco" element={<FormationOPCO />} />
              <Route path="/formation/sur-mesure" element={<FormationSurMesure />} />
              <Route path="/formation/environnements" element={<FormationEnvironnements />} />
              <Route path="/formation/vibe-coding" element={<FormationVibeCoding />} />
              <Route path="/solution-ia" element={<SolutionIA />} />
              <Route path="/educ-ia" element={<EducIA />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/blog/:slug" element={<BlogArticle />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/confidentialite" element={<PolitiqueConfidentialite />} />
              <Route path="/rgpd" element={<RGPD />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/cgv" element={<CGV />} />
              <Route path="/formation-ia-strasbourg" element={<FormationIAStrasbourg />} />
              <Route path="/formation-ia-mulhouse" element={<FormationIAMulhouse />} />
              <Route path="/formation-ia-colmar" element={<FormationIAColmar />} />
              <Route path="/formation/marketing-ia" element={<FormationMarketingIA />} />
              <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div style={{ fontFamily: "'MarkPro', 'Inter', sans-serif", background: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <AnimatedRoutes />
        </div>
        <Footer />
        <CookieBanner />
      </div>
    </BrowserRouter>
  )
}
