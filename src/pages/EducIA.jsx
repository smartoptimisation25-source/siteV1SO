import { Link } from 'react-router-dom'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { useSEO } from '../hooks/useSEO'
import useIsMobile from '../hooks/useIsMobile'
import Breadcrumb from '../components/Breadcrumb'

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: i * 0.1 },
  }),
}

const ETAPES = [
  {
    num: '01',
    titre: "Qu'est-ce que l'IA ?",
    desc: "Découverte ludique avec des exemples concrets et des jeux interactifs pour comprendre comment fonctionne l'intelligence artificielle.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
  {
    num: '02',
    titre: "Crée ton IA",
    desc: "Les enfants expérimentent avec des outils comme ChatGPT ou DALL·E pour créer leurs propres histoires, images et projets créatifs.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    num: '03',
    titre: "L'IA et le monde réel",
    desc: "Comment les IA sont utilisées dans la vie quotidienne : médecine, musique, école, transports... Décryptage du monde qui nous entoure.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    num: '04',
    titre: "Bien utiliser l'IA",
    desc: "Sensibilisation à l'éthique, à la vérification des informations et à la responsabilité numérique. Développer un regard critique face à l'IA.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
]

const ATELIERS = [
  {
    titre: "Découvrir comment les IA « pensent »",
    desc: "Comprendre les mécanismes derrière l'apprentissage automatique avec des exemples visuels et interactifs.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><circle cx="12" cy="12" r="10"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
  {
    titre: "Utiliser l'IA pour créer",
    desc: "Images, histoires, musiques... Les enfants deviennent acteurs et créateurs grâce aux outils IA.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
  {
    titre: "Reconnaître les limites et dangers",
    desc: "Esprit critique, deepfakes, désinformation : apprendre à identifier ce qui est vrai, faux ou biaisé.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
]

const PUBLICS = [
  {
    titre: 'Écoles & collèges',
    desc: 'Interventions en classe, ateliers pédagogiques intégrés au programme scolaire.',
    color: '#3B4FD8',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    titre: 'Centres éducatifs',
    desc: 'Ateliers périscolaires, centres de loisirs, associations de jeunesse.',
    color: '#9B30E8',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    titre: 'Familles',
    desc: "Sessions parents-enfants pour découvrir l'IA ensemble et en parler à la maison.",
    color: '#E83B9B',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
]

/* Carte étape avec tilt 3D au survol */
function EtapeCard({ etape, i }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 })

  function onMouseMove(e) {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function onMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      variants={FADE_UP}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      custom={i}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        background: '#fff',
        borderRadius: '20px',
        border: '1.5px solid rgba(59,79,216,0.10)',
        padding: '28px',
        boxShadow: '0 4px 24px rgba(59,79,216,0.07)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 800,
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: '0 16px 48px rgba(59,79,216,0.18)',
        borderColor: 'rgba(59,79,216,0.35)',
        transition: { duration: 0.25 },
      }}
    >
      {/* Glow au survol */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, borderRadius: '20px', pointerEvents: 'none',
          background: 'radial-gradient(circle at 50% 0%, rgba(59,79,216,0.08) 0%, transparent 70%)',
          opacity: 0,
        }}
        whileHover={{ opacity: 1, transition: { duration: 0.3 } }}
      />

      {/* Numéro décoratif */}
      <motion.div
        style={{
          position: 'absolute', top: 12, right: 16,
          fontSize: '48px', fontWeight: 900, lineHeight: 1, userSelect: 'none',
          background: 'linear-gradient(135deg,rgba(59,79,216,0.10),rgba(155,48,232,0.10))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}
        whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
      >
        {etape.num}
      </motion.div>

      {/* Icône */}
      <motion.div
        style={{ width: 44, height: 44, borderRadius: '12px', background: 'linear-gradient(135deg,#3B4FD8,#9B30E8)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#fff' }}
        whileHover={{ rotate: [0, -10, 10, -6, 6, 0], scale: 1.15, transition: { duration: 0.5 } }}
      >
        {etape.icon}
      </motion.div>

      <h3 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '16px', lineHeight: 1.3, marginBottom: '10px' }}>
        {etape.titre}
      </h3>
      <p style={{ color: '#6B7280', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
        {etape.desc}
      </p>
    </motion.div>
  )
}

/* Carte atelier avec slide + bordure gauche animée */
function AtelierItem({ a, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0, transition: { delay: i * 0.1, duration: 0.45 } }}
      viewport={{ once: true }}
      whileHover={{
        x: 6,
        background: 'linear-gradient(90deg, rgba(59,79,216,0.06) 0%, #F9F8FF 100%)',
        boxShadow: '0 6px 24px rgba(59,79,216,0.10)',
        borderColor: 'rgba(59,79,216,0.25)',
        transition: { duration: 0.2 },
      }}
      style={{
        display: 'flex', gap: '14px', alignItems: 'flex-start',
        padding: '16px', borderRadius: '14px',
        background: '#F9F8FF', border: '1px solid rgba(59,79,216,0.08)',
        boxShadow: '0 2px 10px rgba(59,79,216,0.04)',
        cursor: 'default',
      }}
    >
      <motion.div
        whileHover={{ rotate: 360, scale: 1.1, transition: { duration: 0.5 } }}
        style={{ width: 36, height: 36, borderRadius: '10px', background: 'rgba(59,79,216,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
      >
        {a.icon}
      </motion.div>
      <div>
        <p style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '14px', margin: '0 0 4px' }}>{a.titre}</p>
        <p style={{ color: '#6B7280', fontSize: '13px', lineHeight: 1.5, margin: 0 }}>{a.desc}</p>
      </div>
    </motion.div>
  )
}

/* Carte public avec spotlight curseur */
function PublicCard({ p, i }) {
  const ref = useRef(null)
  const spotX = useMotionValue(-200)
  const spotY = useMotionValue(-200)

  function onMouseMove(e) {
    const rect = ref.current.getBoundingClientRect()
    spotX.set(e.clientX - rect.left)
    spotY.set(e.clientY - rect.top)
  }

  return (
    <motion.div
      ref={ref}
      variants={FADE_UP}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      custom={i}
      onMouseMove={onMouseMove}
      whileHover={{
        y: -8,
        boxShadow: `0 20px 48px ${p.color}28`,
        borderColor: `${p.color}40`,
        transition: { duration: 0.25 },
      }}
      style={{
        padding: '28px', borderRadius: '18px',
        background: '#fff', border: '1.5px solid rgba(59,79,216,0.09)',
        boxShadow: '0 4px 20px rgba(59,79,216,0.06)',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Spotlight */}
      <motion.div
        style={{
          position: 'absolute',
          width: 180, height: 180,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${p.color}14 0%, transparent 70%)`,
          pointerEvents: 'none',
          translateX: useTransform(spotX, v => v - 90),
          translateY: useTransform(spotY, v => v - 90),
        }}
      />

      <motion.div
        whileHover={{ scale: 1.15, rotate: 5, transition: { type: 'spring', stiffness: 300 } }}
        style={{ width: 52, height: 52, borderRadius: '14px', background: `linear-gradient(135deg, ${p.color}18, ${p.color}30)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: p.color }}
      >
        {p.icon}
      </motion.div>
      <h3 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '16px', marginBottom: '8px' }}>{p.titre}</h3>
      <p style={{ color: '#6B7280', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
    </motion.div>
  )
}

const EDUC_IA_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      'name': 'Éduc IA — Ateliers de sensibilisation à l\'Intelligence Artificielle pour enfants',
      'description': 'Ateliers ludiques de sensibilisation à l\'IA pour enfants et adolescents de 8 à 15 ans. Pensée critique, créativité, éthique numérique. Pour écoles, collèges, centres éducatifs et familles en Alsace.',
      'url': 'https://smartoptimisation.fr/educ-ia',
      'provider': { '@id': 'https://smartoptimisation.fr/#organization' },
      'serviceType': 'Sensibilisation IA enfants et adolescents',
      'audience': {
        '@type': 'EducationalAudience',
        'educationalRole': 'student',
        'audienceType': 'Enfants et adolescents de 8 à 15 ans',
      },
      'areaServed': [
        { '@type': 'City', 'name': 'Strasbourg' },
        { '@type': 'AdministrativeArea', 'name': 'Alsace' },
        { '@type': 'Country', 'name': 'France' },
      ],
      'additionalProperty': [
        { '@type': 'PropertyValue', 'name': 'Tranche d\'âge', 'value': '8 à 15 ans' },
        { '@type': 'PropertyValue', 'name': 'Publics', 'value': 'Écoles, collèges, centres éducatifs, familles' },
        { '@type': 'PropertyValue', 'name': 'Format', 'value': 'Ateliers ludiques et interactifs' },
      ],
      'about': [
        { '@type': 'Thing', 'name': 'Sensibilisation IA enfants' },
        { '@type': 'Thing', 'name': 'Éducation numérique' },
        { '@type': 'Thing', 'name': 'Pensée critique' },
      ],
      'mentions': [
        { '@type': 'Thing', 'name': 'Éthique IA' },
        { '@type': 'Thing', 'name': 'Créativité numérique' },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://smartoptimisation.fr/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Éduc IA' },
      ],
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'À partir de quel âge un enfant peut-il participer aux ateliers IA ?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Nos ateliers Éduc IA sont conçus pour les enfants et adolescents de 8 à 15 ans. Le contenu est adapté par tranche d\'âge pour garantir une compréhension optimale.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Les ateliers IA pour enfants sont-ils sûrs et encadrés ?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Absolument. Les ateliers sont animés par des formateurs expérimentés, avec un module dédié à l\'éthique, la vérification des informations et la responsabilité numérique. Aucune donnée personnelle des enfants n\'est collectée.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Peut-on organiser un atelier IA dans notre école ou centre éducatif ?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Oui. Nous intervenons dans les écoles, collèges, centres de loisirs et structures éducatives en Alsace. Contactez-nous pour organiser un atelier adapté à votre public et vos locaux.',
          },
        },
      ],
    },
  ],
}

export default function EducIA() {
  useSEO({
    title: 'Ateliers IA pour enfants 8-15 ans en Alsace | Smart Optimisation',
    description: 'Ateliers de sensibilisation à l\'IA pour enfants et adolescents de 8 à 15 ans en Alsace. Pensée critique, créativité, éthique numérique. Écoles, centres éducatifs et familles.',
    path: '/educ-ia',
    jsonLd: EDUC_IA_SCHEMA,
    keywords: 'atelier IA enfants, sensibilisation IA jeunes, éducation intelligence artificielle, atelier IA 8-15 ans, éthique numérique enfants',
  })
  const isMobile = useIsMobile()
  return (
    <main style={{ background: '#fff', minHeight: 'calc(100vh - 72px)' }}>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '88px 24px 0' }}>
        <Breadcrumb items={[
          { label: 'Accueil', to: '/' },
          { label: 'Éduc IA' },
        ]} />
      </div>

      {/* ── Hero ─────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(59,79,216,0.04) 0%, rgba(155,48,232,0.05) 100%)',
        borderBottom: '1px solid rgba(59,79,216,0.08)',
        padding: isMobile ? '48px 20px 40px' : '80px 48px 72px',
      }}>
        {/* Blobs animés */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: -80, right: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,48,232,0.10) 0%, transparent 70%)', pointerEvents: 'none' }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, -15, 0], y: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ position: 'absolute', bottom: -60, left: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,79,216,0.08) 0%, transparent 70%)', pointerEvents: 'none' }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{ position: 'absolute', top: '40%', left: '30%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,59,155,0.06) 0%, transparent 70%)', pointerEvents: 'none' }}
        />

        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div variants={FADE_UP} initial="hidden" animate="show" custom={0}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'rgba(59,79,216,0.07)', border: '1px solid rgba(59,79,216,0.18)', marginBottom: '24px' }}>
            <motion.span
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg,#3B4FD8,#9B30E8)', flexShrink: 0, display: 'block' }}
            />
            <span style={{ color: '#3B4FD8', fontSize: '13px', fontWeight: 600 }}>Pour les 8 — 15 ans</span>
          </motion.div>

          <motion.h1 variants={FADE_UP} initial="hidden" animate="show" custom={1}
            style={{ color: '#0F0C1E', fontWeight: 800, fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: '20px' }}>
            Éduc IA, l'école du futur{' '}
            <motion.span
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundImage: 'linear-gradient(135deg,#3B4FD8,#9B30E8,#E83B9B,#3B4FD8)', backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              commence avec nous.
            </motion.span>
          </motion.h1>

          <motion.p variants={FADE_UP} initial="hidden" animate="show" custom={2}
            style={{ color: '#6B7280', fontSize: '17px', lineHeight: 1.7, marginBottom: '36px', maxWidth: '640px', margin: '0 auto 36px' }}>
            Sensibiliser les enfants à comprendre l'IA, c'est leur donner le pouvoir d'agir dans le monde de demain.
          </motion.p>

          <motion.div variants={FADE_UP} initial="hidden" animate="show" custom={3}
            style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : 'center' }}>
            <Link to="/contact" style={{
              padding: '14px 32px', borderRadius: '999px', fontWeight: 700, fontSize: '15px',
              color: '#fff', background: 'linear-gradient(135deg,#3B4FD8,#9B30E8)',
              textDecoration: 'none', boxShadow: '0 4px 20px rgba(155,48,232,0.30)',
              transition: 'transform 0.18s, box-shadow 0.18s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(155,48,232,0.45)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(155,48,232,0.30)' }}
            >
              Organiser un atelier →
            </Link>
            <a href="#programme" style={{
              padding: '14px 32px', borderRadius: '999px', fontWeight: 600, fontSize: '15px',
              color: '#3B4FD8', background: 'transparent', textDecoration: 'none',
              border: '1.5px solid rgba(59,79,216,0.30)', transition: 'border-color 0.18s, background 0.18s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#3B4FD8'; e.currentTarget.style.background = 'rgba(59,79,216,0.05)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(59,79,216,0.30)'; e.currentTarget.style.background = 'transparent' }}
            >
              En savoir plus
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────── */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '48px 20px' : '72px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '40px' : '72px', alignItems: 'center' }}>

          {/* Texte */}
          <motion.div variants={FADE_UP} initial="hidden" whileInView="show" viewport={{ once: true }} custom={0}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '999px', background: 'rgba(59,79,216,0.07)', border: '1px solid rgba(59,79,216,0.15)', marginBottom: '20px' }}>
              <span style={{ color: '#3B4FD8', fontSize: '12px', fontWeight: 600 }}>Notre mission</span>
            </div>
            <h2 style={{ color: '#0F0C1E', fontWeight: 800, fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '16px' }}>
              Préparer la génération de demain
            </h2>
            <p style={{ color: '#6B7280', fontSize: '15px', lineHeight: 1.8, marginBottom: '12px' }}>
              Parce que l'intelligence artificielle sera au cœur de leur avenir professionnel.
            </p>
            <p style={{ color: '#6B7280', fontSize: '15px', lineHeight: 1.8, marginBottom: '28px' }}>
              Éduc IA initie les enfants de <strong style={{ color: '#0F0C1E' }}>8 à 15 ans</strong> à l'intelligence artificielle à travers des ateliers ludiques et créatifs. Parce que l'IA fait déjà partie de leur quotidien, nous leur apprenons à la comprendre, l'utiliser de manière responsable et développer leur esprit critique.
            </p>
            <p style={{ color: '#6B7280', fontSize: '15px', lineHeight: 1.8 }}>
              Dans un cadre bienveillant adapté aux <strong style={{ color: '#0F0C1E' }}>écoles, centres éducatifs et familles.</strong>
            </p>
          </motion.div>

          {/* Ateliers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
              viewport={{ once: true }}
              style={{ marginBottom: '8px' }}
            >
              <h3 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '16px', margin: '0 0 4px' }}>Pédagogie — Un apprentissage par la pratique</h3>
              <p style={{ color: '#9CA3AF', fontSize: '13px', margin: 0 }}>Nos ateliers mêlent expérimentation, jeux et réflexion</p>
            </motion.div>
            {ATELIERS.map((a, i) => <AtelierItem key={i} a={a} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── Programme en 4 étapes ────────────────────── */}
      <section id="programme" style={{ background: 'linear-gradient(135deg, rgba(59,79,216,0.03), rgba(155,48,232,0.03))', borderTop: '1px solid rgba(59,79,216,0.07)', borderBottom: '1px solid rgba(59,79,216,0.07)', padding: isMobile ? '48px 20px' : '72px 48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '56px' }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '999px', background: 'rgba(59,79,216,0.07)', border: '1px solid rgba(59,79,216,0.15)', marginBottom: '16px' }}>
              <span style={{ color: '#3B4FD8', fontSize: '12px', fontWeight: 600 }}>Notre programme</span>
            </div>
            <h2 style={{ color: '#0F0C1E', fontWeight: 800, fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
              Un parcours en <span style={{ backgroundImage: 'linear-gradient(135deg,#3B4FD8,#9B30E8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>4 étapes</span> pour maîtriser l'IA
            </h2>
            <p style={{ color: '#6B7280', fontSize: '15px', maxWidth: '520px', margin: '0 auto' }}>
              De la découverte ludique à l'utilisation responsable, un apprentissage progressif et structuré.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
            {ETAPES.map((etape, i) => <EtapeCard key={i} etape={etape} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── Publics ──────────────────────────────────── */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '48px 20px' : '72px 48px' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <h2 style={{ color: '#0F0C1E', fontWeight: 800, fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
            Adapté à chaque contexte
          </h2>
          <p style={{ color: '#6B7280', fontSize: '15px' }}>Nous intervenons dans les structures qui accompagnent les jeunes</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '20px' }}>
          {PUBLICS.map((p, i) => <PublicCard key={i} p={p} i={i} />)}
        </div>
      </section>

      {/* ── CTA final ─────────────────────────────── */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '0 20px 48px' : '0 48px 72px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          viewport={{ once: true }}
          style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', background: '#fff', border: '1px solid rgba(59,79,216,0.10)', boxShadow: '0 8px 48px rgba(59,79,216,0.08)' }}
        >
          {/* Barre gradient signature */}
          <div style={{ height: '4px', background: 'linear-gradient(90deg, #3B4FD8, #9B30E8, #E83B9B)', width: '100%' }} />

          {/* Blobs discrets */}
          <motion.div
            animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: -60, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,48,232,0.06) 0%, transparent 70%)', pointerEvents: 'none' }}
          />
          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            style={{ position: 'absolute', bottom: -40, left: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,79,216,0.05) 0%, transparent 70%)', pointerEvents: 'none' }}
          />

          <div style={{ position: 'relative', zIndex: 2, padding: isMobile ? '28px 20px' : '48px 56px', display: 'flex', justifyContent: 'space-between', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', flexWrap: 'wrap', gap: '36px' }}>

            {/* Gauche */}
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '999px', background: 'rgba(59,79,216,0.07)', border: '1px solid rgba(59,79,216,0.18)', marginBottom: '20px' }}>
                <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', display: 'block', flexShrink: 0 }} />
                <span style={{ color: '#3B4FD8', fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Atelier sur mesure · Dès le primaire</span>
              </div>
              <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', color: '#0F0C1E', lineHeight: 1.2, letterSpacing: '-0.025em', marginBottom: '14px' }}>
                Préparez la génération de demain{' '}
                <motion.span
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  style={{ backgroundImage: 'linear-gradient(135deg,#3B4FD8,#9B30E8,#E83B9B,#3B4FD8)', backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                >
                  dès aujourd'hui.
                </motion.span>
              </h2>
              <p style={{ color: '#6B7280', fontSize: '15px', lineHeight: 1.75, maxWidth: '440px' }}>
                École, centre éducatif ou famille — nous adaptons chaque atelier à votre contexte et vos besoins.
              </p>
            </div>

            {/* Droite */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'stretch', minWidth: '210px' }}>
              <motion.div whileHover={{ scale: 1.04, y: -2, boxShadow: '0 12px 32px rgba(155,48,232,0.35)', transition: { duration: 0.2 } }} whileTap={{ scale: 0.97 }}>
                <Link to="/contact" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '15px 28px', borderRadius: '999px', fontWeight: 700, fontSize: '15px', color: '#fff', textDecoration: 'none', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', boxShadow: '0 4px 20px rgba(155,48,232,0.28)', whiteSpace: 'nowrap' }}>
                  Échangeons ensemble
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Maillage interne */}
      <section style={{ background: '#F9F8FF', padding: isMobile ? '48px 20px' : '64px 48px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '20px', marginBottom: '20px', textAlign: 'center' }}>
            Découvrez nos autres formations IA
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/formation/cpf" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: '#fff', borderRadius: '12px', border: '1px solid rgba(59,79,216,0.08)', textDecoration: 'none', color: '#0F0C1E', fontSize: '15px', fontWeight: 500 }}>
              <span>Formation CPF RS7344</span>
              <span style={{ color: '#3B4FD8', fontSize: '13px' }}>En savoir plus →</span>
            </Link>
            <Link to="/solution-ia" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: '#fff', borderRadius: '12px', border: '1px solid rgba(59,79,216,0.08)', textDecoration: 'none', color: '#0F0C1E', fontSize: '15px', fontWeight: 500 }}>
              <span>Solution IA sur mesure</span>
              <span style={{ color: '#3B4FD8', fontSize: '13px' }}>En savoir plus →</span>
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
