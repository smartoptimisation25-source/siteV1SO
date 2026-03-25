import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSEO } from '../hooks/useSEO'
import useIsMobile from '../hooks/useIsMobile'
import Breadcrumb from '../components/Breadcrumb'

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: i * 0.1 } }),
}

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Course',
      'name': 'Formation IA à Mulhouse — Smart Optimisation',
      'description': 'Formation en intelligence artificielle à Mulhouse. Sessions en présentiel certifiées Qualiopi, financement CPF RS7344 et OPCO. Interventions dans tout le Haut-Rhin.',
      'provider': { '@id': 'https://smartoptimisation.fr/#organization' },
      'location': { '@type': 'Place', 'name': 'Mulhouse', 'address': { '@type': 'PostalAddress', 'addressLocality': 'Mulhouse', 'addressRegion': 'Alsace', 'addressCountry': 'FR' } },
      'inLanguage': 'fr-FR',
      'about': [
        { '@type': 'Thing', 'name': 'Formation Intelligence Artificielle' },
        { '@type': 'Place', 'name': 'Mulhouse' },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://smartoptimisation.fr/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Formation IA à Mulhouse' },
      ],
    },
  ],
}

export default function FormationIAMulhouse() {
  const isMobile = useIsMobile()
  useSEO({
    title: 'Formation IA à Mulhouse — Certifiée Qualiopi | Smart Optimisation',
    description: 'Formations en intelligence artificielle à Mulhouse : sessions CPF RS7344 en présentiel, financement OPCO 100%. Organisme certifié Qualiopi. Smart Optimisation intervient à Mulhouse et dans le Haut-Rhin.',
    path: '/formation-ia-mulhouse',
    keywords: 'formation IA Mulhouse, formation intelligence artificielle Mulhouse, formation IA Haut-Rhin',
    jsonLd: SCHEMA,
  })

  return (
    <main style={{ background: '#fff' }}>
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: isMobile ? '88px 20px 40px' : '100px 24px 56px' }}>
        <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Formation IA à Mulhouse' }]} />

        <motion.h1 variants={FADE_UP} initial="hidden" animate="show" custom={0}
          style={{ fontSize: isMobile ? 'clamp(1.8rem, 5vw, 2.4rem)' : 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 800, color: '#0F0C1E', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '16px' }}>
          Formation Intelligence Artificielle à{' '}
          <span style={{ background: 'linear-gradient(90deg, #3B4FD8, #9B30E8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Mulhouse</span>
        </motion.h1>

        <motion.p variants={FADE_UP} initial="hidden" animate="show" custom={1}
          style={{ fontSize: isMobile ? '15px' : '17px', color: '#4B5563', lineHeight: 1.7, marginBottom: '32px' }}>
          Smart Optimisation intervient à Mulhouse et dans tout le Haut-Rhin pour former vos équipes à l'intelligence artificielle.
          Nos sessions en présentiel, certifiées Qualiopi, sont éligibles au CPF (RS7344) et au financement OPCO à 100%.
          Que vous soyez dans l'industrie, le tertiaire ou le commerce, nos formateurs adaptent chaque programme à votre réalité terrain.
        </motion.p>

        <motion.h2 variants={FADE_UP} initial="hidden" animate="show" custom={2}
          style={{ fontSize: '22px', fontWeight: 700, color: '#0F0C1E', marginBottom: '16px' }}>
          Nos formations IA disponibles à Mulhouse
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
          {[
            { title: 'Formation IA certifiée CPF RS7344', desc: 'Certification officielle en IA générative. 7h présentiel + 14h e-learning. Financement CPF, 0 € de reste à charge.', to: '/formation/cpf' },
            { title: 'Formation IA financée par votre OPCO', desc: 'Formez vos équipes à l\'IA sans avance de trésorerie. Compatible avec tous les OPCO. ROI mesurable dès J+30.', to: '/formation/opco' },
            { title: 'Formation IA sur mesure pour votre entreprise', desc: 'Programme co-construit autour de vos outils et de votre secteur. EU AI Act, automatisation, LLMs.', to: '/formation/sur-mesure' },
            { title: 'Formation Claude, ChatGPT et Gemini', desc: 'Maîtrisez les trois principaux environnements IA du marché avec des cas d\'usage adaptés à votre métier.', to: '/formation/environnements' },
          ].map((item, i) => (
            <motion.div key={item.title} variants={FADE_UP} initial="hidden" animate="show" custom={i + 3}
              style={{ background: '#FAFAFE', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '24px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F0C1E', marginBottom: '6px' }}>{item.title}</h3>
              <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6, marginBottom: '12px' }}>{item.desc}</p>
              <Link to={item.to} style={{ fontSize: '14px', fontWeight: 600, color: '#3B4FD8', textDecoration: 'none' }}>
                Découvrir cette formation →
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.h2 variants={FADE_UP} initial="hidden" whileInView="show" viewport={{ once: true }}
          style={{ fontSize: '22px', fontWeight: 700, color: '#0F0C1E', marginBottom: '16px' }}>
          Pourquoi se former à l'IA à Mulhouse ?
        </motion.h2>

        <motion.div variants={FADE_UP} initial="hidden" whileInView="show" viewport={{ once: true }}
          style={{ fontSize: '15px', color: '#4B5563', lineHeight: 1.8, marginBottom: '40px' }}>
          <p style={{ marginBottom: '12px' }}>
            Mulhouse est au cœur de la zone trinationale Alsace–Bade-Wurtemberg–Suisse du Nord-Ouest, un bassin économique de plus de 800 000 habitants. Les entreprises industrielles du Haut-Rhin — Stellantis, Liebherr, SACMO ou encore les PME du textile technique — cherchent activement à intégrer l'IA pour rester compétitives face à la concurrence allemande et suisse.
          </p>
          <p style={{ marginBottom: '12px' }}>
            Se former à l'IA en présentiel à Mulhouse, c'est bénéficier d'un accompagnement concret avec des exercices directement applicables à vos processus industriels, logistiques ou commerciaux. La proximité de Bâle et de Freiburg rend cette formation particulièrement pertinente pour les équipes travaillant dans un contexte transfrontalier.
          </p>
          <p>
            Smart Optimisation connaît les enjeux spécifiques du tissu économique haut-rhinois : reconversion industrielle, montée en compétences des opérateurs et digitalisation des PME. Chaque session est construite pour répondre à ces défis locaux.
          </p>
        </motion.div>

        <motion.div variants={FADE_UP} initial="hidden" whileInView="show" viewport={{ once: true }}
          style={{ background: 'linear-gradient(135deg, rgba(59,79,216,0.06), rgba(155,48,232,0.06))', borderRadius: '20px', border: '1px solid rgba(59,79,216,0.12)', padding: isMobile ? '32px 24px' : '40px 36px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0F0C1E', marginBottom: '12px' }}>Prêt à vous former à l'IA à Mulhouse ?</h2>
          <p style={{ fontSize: '15px', color: '#6B7280', marginBottom: '20px' }}>Audit IA gratuit — Réponse sous 24h</p>
          <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 28px', borderRadius: '12px', background: 'linear-gradient(135deg, #3B4FD8, #7B4FE8)', color: '#fff', fontWeight: 700, fontSize: '15px', textDecoration: 'none', minHeight: '48px' }}>
            Demander un devis gratuit →
          </Link>
        </motion.div>
      </section>
    </main>
  )
}
