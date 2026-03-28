import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion'
import { useSEO } from '../hooks/useSEO'
import useIsMobile from '../hooks/useIsMobile'
import Breadcrumb from '../components/Breadcrumb'

/* ─── Icônes SVG inline ─────────────────────────────────────────── */
const IconZero = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/>
    <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/>
    <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/>
    <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/>
    <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
    <path d="M10 9.5C10 8.67 9.33 8 8.5 8H3.5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/>
    <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/>
  </svg>
)
const IconMoney = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2"/>
    <line x1="2" y1="10" x2="22" y2="10"/>
  </svg>
)
const IconTarget = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
)
const IconChart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
)
const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
)
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)

/* ─── Bento Card ────────────────────────────────────────────────── */
function BentoCard({ icon, label, title, desc, accent, gradient, wide, delay, isMobile }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 280, damping: 28 })
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 280, damping: 28 })
  const glowX = useTransform(mx, [-0.5, 0.5], [0, 100])
  const glowY = useTransform(my, [-0.5, 0.5], [0, 100])

  function onMove(e) {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  function onLeave() { mx.set(0); my.set(0) }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        gridColumn: wide && !isMobile ? 'span 2' : 'span 1',
        position: 'relative',
        borderRadius: '20px',
        padding: '28px',
        background: '#FAFBFF',
        border: '1px solid rgba(59,79,216,0.10)',
        cursor: 'default',
        overflow: 'hidden',
        rotateX: rotX, rotateY: rotY,
        transformStyle: 'preserve-3d', perspective: '800px',
      }}
      whileHover={{
        borderColor: 'rgba(59,79,216,0.0)',
        boxShadow: `0 0 0 1.5px ${accent}55, 0 16px 48px ${accent}22`,
        transition: { duration: 0.25 },
      }}
    >
      {/* Spotlight au survol */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: '20px',
          background: `radial-gradient(320px circle at ${glowX.get()}% ${glowY.get()}%, ${accent}12 0%, transparent 65%)`,
          opacity: 0,
        }}
        whileHover={{ opacity: 1 }}
      />
      {/* Fond décoratif gradient coin */}
      <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: `radial-gradient(circle, ${accent}10 0%, transparent 70%)`, pointerEvents: 'none' }} />

      {/* Icône */}
      <motion.div
        whileHover={{ rotate: [0, -8, 8, -4, 4, 0], scale: 1.10, transition: { duration: 0.4 } }}
        style={{
          width: 48, height: 48, borderRadius: '14px',
          background: gradient,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', marginBottom: '16px',
          boxShadow: `0 6px 20px ${accent}40`,
        }}
      >
        {icon}
      </motion.div>

      {/* Label */}
      <div style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '999px', background: `${accent}12`, border: `1px solid ${accent}25`, marginBottom: '10px' }}>
        <span style={{ color: accent, fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</span>
      </div>

      <h3 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '17px', lineHeight: 1.3, marginBottom: '8px' }}>{title}</h3>
      <p style={{ color: '#6B7280', fontSize: '14px', lineHeight: 1.7 }}>{desc}</p>
    </motion.div>
  )
}

/* ─── Strip OPCO ────────────────────────────────────────────────── */
const OPCOS = [
  { name: 'Atlas', color: '#2563EB' },
  { name: 'Akto', color: '#7C3AED' },
  { name: 'Uniformation', color: '#059669' },
  { name: 'OCAPIAT', color: '#D97706' },
  { name: 'OPCO 2i', color: '#DC2626' },
  { name: 'AFDAS', color: '#0891B2' },
  { name: 'Constructys', color: '#9333EA' },
]

/* ─── Page principale ───────────────────────────────────────────── */
const OPCO_SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      'name': 'Formation IA entreprise OPCO — 100% financée',
      'description': 'Formation IA pour entreprises entièrement financée par votre OPCO (Atlas, Akto, Uniformation, OCAPIAT, OPCO 2i, AFDAS, Constructys). Zéro avance, zéro paperasse. ROI mesurable dès J+30.',
      'url': 'https://smartoptimisation.fr/formation/opco',
      'provider': { '@id': 'https://smartoptimisation.fr/#organization' },
      'serviceType': 'Formation professionnelle IA — Financement OPCO',
      'areaServed': { '@type': 'Country', 'name': 'France' },
      'audience': { '@type': 'BusinessAudience', 'audienceType': 'Entreprises (5 à 500 collaborateurs)' },
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'EUR',
        'description': 'Financement 100% OPCO — aucune avance de trésorerie',
      },
      'additionalProperty': [
        { '@type': 'PropertyValue', 'name': 'Délai de réponse faisabilité', 'value': '48h' },
        { '@type': 'PropertyValue', 'name': 'ROI mesurable', 'value': 'J+30' },
        { '@type': 'PropertyValue', 'name': 'OPCO compatibles', 'value': 'Atlas, Akto, Uniformation, OCAPIAT, OPCO 2i, AFDAS, Constructys' },
      ],
      'about': [
        { '@type': 'Thing', 'name': 'Financement OPCO' },
        { '@type': 'Thing', 'name': 'Formation Intelligence Artificielle' },
        { '@type': 'Thing', 'name': 'Montée en compétences IA' },
      ],
      'mentions': [
        { '@type': 'Organization', 'name': 'OPCO Atlas' },
        { '@type': 'Organization', 'name': 'OPCO Akto' },
        { '@type': 'Organization', 'name': 'Uniformation' },
        { '@type': 'Organization', 'name': 'OPCO 2i' },
        { '@type': 'Thing', 'name': 'Certification Qualiopi' },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://smartoptimisation.fr/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Formation', 'item': 'https://smartoptimisation.fr/formation/opco' },
        { '@type': 'ListItem', 'position': 3, 'name': 'Formation IA OPCO' },
      ],
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Comment savoir si mon OPCO finance les formations IA ?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Toute entreprise cotise à un OPCO. Smart Optimisation vérifie gratuitement votre éligibilité sous 48h et monte le dossier de financement pour vous, sans avance de trésorerie.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Quel est le coût d\'une formation IA financée par l\'OPCO ?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Avec le financement OPCO, la prise en charge peut atteindre 100% du coût pédagogique. Vous ne déboursez rien : l\'OPCO règle directement Smart Optimisation.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Combien de temps faut-il pour obtenir le financement OPCO ?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'En moyenne 2 à 3 semaines entre le premier contact et le démarrage de la formation. Smart Optimisation obtient une réponse de faisabilité de l\'OPCO sous 48h ouvrées.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Quels OPCO sont compatibles avec vos formations IA ?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Tous les 11 OPCO français : Atlas, Akto, AFDAS, Uniformation, OCAPIAT, OPCO 2i, Constructys et les 4 autres. Nos formations sont certifiées Qualiopi, ce qui garantit l\'éligibilité.',
          },
        },
      ],
    },
  ],
}

export default function FormationOPCO() {
  useSEO({
    title: 'Formation IA OPCO — 100% financée pour vos équipes',
    description: 'Formez vos collaborateurs à l\'IA avec financement OPCO 100% : Atlas, Akto, Uniformation, OPCO 2i. Zéro avance, ROI mesurable dès J+30. Organisme certifié Qualiopi à Strasbourg, interventions en Alsace et toute la France.',
    path: '/formation/opco',
    jsonLd: OPCO_SERVICE_SCHEMA,
    keywords: 'formation IA OPCO, financement OPCO formation, formation IA entreprise, OPCO Atlas, OPCO Akto, formation IA financée, Qualiopi, formation intelligence artificielle OPCO',
  })
  const heroRef = useRef(null)
  const isMobile = useIsMobile()

  const BENTO = [
    {
      icon: <IconZero />,
      label: 'Administratif',
      title: 'Zéro paperasse',
      desc: 'Nous gérons l\'intégralité du dossier OPCO à votre place — montage, soumission, relances. Votre seule tâche : former vos équipes.',
      accent: '#3B4FD8',
      gradient: 'linear-gradient(135deg, #3B4FD8, #6366F1)',
      wide: true,
      delay: 0.05,
    },
    {
      icon: <IconMoney />,
      label: 'Financement',
      title: '100% financé',
      desc: 'Aucune avance de trésorerie. Votre OPCO règle directement Smart Optimisation.',
      accent: '#9B30E8',
      gradient: 'linear-gradient(135deg, #9B30E8, #C084FC)',
      wide: false,
      delay: 0.12,
    },
    {
      icon: <IconTarget />,
      label: 'Sur mesure',
      title: 'Adapté à votre secteur',
      desc: 'Chaque programme est calibré sur les usages concrets de votre métier, pas un catalogue générique.',
      accent: '#E83B9B',
      gradient: 'linear-gradient(135deg, #E83B9B, #F472B6)',
      wide: false,
      delay: 0.19,
    },
    {
      icon: <IconChart />,
      label: 'Performance',
      title: 'ROI mesurable dès J+30',
      desc: 'Indicateurs de montée en compétence, temps économisé, tâches automatisées. Vous voyez le retour sur investissement en chiffres.',
      accent: '#0891B2',
      gradient: 'linear-gradient(135deg, #0891B2, #38BDF8)',
      wide: true,
      delay: 0.26,
    },
  ]

  return (
    <main style={{ background: '#fff', minHeight: 'calc(100vh - 72px)', position: 'relative', overflow: 'hidden' }}>

      {/* ── Blobs décoratifs ── */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: -160, left: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,79,216,0.07) 0%, transparent 68%)', pointerEvents: 'none' }}
      />
      <motion.div
        animate={{ scale: [1, 1.12, 1], x: [0, -15, 0], y: [0, 25, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{ position: 'absolute', top: '30%', right: -80, width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,48,232,0.06) 0%, transparent 68%)', pointerEvents: 'none' }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '8px 20px 60px' : '8px 48px 100px', position: 'relative', zIndex: 2 }}>

        {/* ── Fil d'Ariane ── */}
        <Breadcrumb items={[
          { label: 'Accueil', to: '/' },
          { label: 'Formation', to: '/formation/opco' },
          { label: 'Formation IA OPCO' },
        ]} />

        {/* ══ HERO ══ */}
        <div style={{ maxWidth: '780px', marginBottom: '72px' }}>

          {/* Badge pulsant */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'rgba(59,79,216,0.07)', border: '1px solid rgba(59,79,216,0.18)', marginBottom: '28px' }}
          >
            <motion.span
              animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', flexShrink: 0, display: 'block' }}
            />
            <span style={{ color: '#3B4FD8', fontSize: '13px', fontWeight: 600 }}>Formation OPCO — 100% pris en charge</span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.10 }}
            style={{ fontWeight: 800, fontSize: isMobile ? '1.9rem' : 'clamp(2.2rem, 4.5vw, 3.6rem)', lineHeight: 1.12, letterSpacing: '-0.025em', color: '#0F0C1E', marginBottom: '20px' }}
          >
            Propulsez votre productivité :{' '}
            <motion.span
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundImage: 'linear-gradient(135deg,#3B4FD8,#9B30E8,#E83B9B,#3B4FD8)', backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              formez vos collaborateurs à l'IA,
            </motion.span>
            <br />sans débourser un centime.
          </motion.h1>

          {/* Sous-titre levée de frein */}
          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }}
            style={{ color: '#374151', fontSize: isMobile ? '15px' : '19px', lineHeight: 1.7, marginBottom: '12px', fontWeight: 400 }}
          >
            De l'audit de vos besoins à la gestion administrative OPCO, <strong style={{ color: '#0F0C1E', fontWeight: 600 }}>nous nous occupons de tout.</strong>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24 }}
            style={{ color: '#6B7280', fontSize: '16px', lineHeight: 1.8, marginBottom: '36px' }}
          >
            Vous ne payez rien — vos équipes apprennent tout.
          </motion.p>

          {/* Stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.30 }}
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
          >
            {[
              { val: '100%', label: 'Financement pris en charge' },
              { val: '48h', label: 'Réponse de faisabilité' },
              { val: '+35', label: 'Entreprises accompagnées' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(59,79,216,0.12)', scale: 1.04, transition: { duration: 0.18 } }}
                style={{ padding: '10px 20px', borderRadius: '14px', background: '#fff', border: '1px solid rgba(59,79,216,0.10)', boxShadow: '0 2px 10px rgba(59,79,216,0.05)', cursor: 'default' }}
              >
                <div style={{ fontWeight: 800, fontSize: '22px', color: '#0F0C1E', letterSpacing: '-0.02em', lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ══ Séparateur ══ */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, #3B4FD8, #9B30E8, transparent)', marginBottom: '56px', borderRadius: '1px' }} />

        {/* ══ BENTO GRID ══ */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '12px' : '16px', marginBottom: isMobile ? '48px' : '72px' }}
        >
          {BENTO.map((card, i) => (
            <BentoCard key={i} {...card} isMobile={isMobile} />
          ))}
        </motion.div>

        {/* ══ OPCO SOCIAL PROOF ══ */}
        <OPCOStrip />

        {/* Lien autorité OPCO */}
        <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '12px', marginBottom: '36px' }}>
          En savoir plus sur les OPCO :{' '}
          <a
            href="https://travail-emploi.gouv.fr/formation-professionnelle/acteurs-cadre-et-qualite-de-la-formation-professionnelle/article/les-operateurs-de-competences-opco"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#6B7280', textDecoration: 'none', borderBottom: '1px dashed rgba(107,114,128,0.4)', transition: 'color 0.2s, border-color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#3B4FD8'; e.currentTarget.style.borderBottomColor = '#3B4FD8' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#6B7280'; e.currentTarget.style.borderBottomColor = 'rgba(107,114,128,0.4)' }}
          >
            Opérateurs de compétences (site officiel du Ministère du Travail) →
          </a>
        </p>

        {/* ══ CTA BLOC ══ */}
        <CTABloc />

        {/* ══ Lien blog ══ */}
        <section style={{ background: '#F9F8FF', padding: isMobile ? '20px' : '28px 32px', borderRadius: '20px', marginTop: '48px', marginBottom: '48px' }}>
          <h2 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '14px', marginBottom: '12px', textAlign: 'center' }}>
            Ressources utiles
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link to="/blog/formations-ia-opco-guide-2026" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: '#fff', borderRadius: '12px', border: '1px solid rgba(59,79,216,0.08)', textDecoration: 'none', color: '#0F0C1E', fontSize: '13px', fontWeight: 500 }}>
              <span>Formations IA & OPCO, le guide 2026</span>
              <span style={{ color: '#3B4FD8', fontSize: '12px', whiteSpace: 'nowrap', marginLeft: '16px' }}>Lire l'article →</span>
            </Link>
          </div>
        </section>

        {/* Maillage interne */}
        <section style={{ background: '#F9F8FF', padding: isMobile ? '20px' : '28px 32px', borderRadius: '20px', marginTop: '32px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '14px', marginBottom: '12px', textAlign: 'center' }}>
              Découvrez nos autres formations IA
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to="/formation/cpf" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: '#fff', borderRadius: '12px', border: '1px solid rgba(59,79,216,0.08)', textDecoration: 'none', color: '#0F0C1E', fontSize: '13px', fontWeight: 500 }}>
                <span>Formation CPF RS7344</span>
                <span style={{ color: '#3B4FD8', fontSize: '12px' }}>Formation IA certifiée CPF RS7344 →</span>
              </Link>
              <Link to="/formation/sur-mesure" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: '#fff', borderRadius: '12px', border: '1px solid rgba(59,79,216,0.08)', textDecoration: 'none', color: '#0F0C1E', fontSize: '13px', fontWeight: 500 }}>
                <span>Formation sur mesure</span>
                <span style={{ color: '#3B4FD8', fontSize: '12px' }}>Programme IA sur mesure pour votre entreprise →</span>
              </Link>
              <Link to="/formation/environnements" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: '#fff', borderRadius: '12px', border: '1px solid rgba(59,79,216,0.08)', textDecoration: 'none', color: '#0F0C1E', fontSize: '13px', fontWeight: 500 }}>
                <span>Formation aux environnements IA</span>
                <span style={{ color: '#3B4FD8', fontSize: '12px' }}>Maîtriser Claude, ChatGPT et Gemini →</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

/* ─── Strip OPCO Logos ──────────────────────────────────────────── */
function OPCOStrip() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginBottom: '72px' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '999px', background: 'rgba(59,79,216,0.06)', border: '1px solid rgba(59,79,216,0.14)', marginBottom: '12px' }}>
          <IconShield />
          <span style={{ color: '#3B4FD8', fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Partenaires OPCO</span>
        </div>
        <h2 style={{ fontWeight: 800, fontSize: '1.6rem', color: '#0F0C1E', letterSpacing: '-0.02em', marginBottom: '6px' }}>
          Compatibles avec tous vos OPCO
        </h2>
        <p style={{ color: '#6B7280', fontSize: '14px' }}>Nous travaillons avec l'ensemble des opérateurs de compétences reconnus en France.</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', alignItems: 'center' }}>
        {OPCOS.map((o, i) => (
          <motion.div
            key={o.name}
            initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -3, boxShadow: `0 8px 24px ${o.color}22`, scale: 1.06, transition: { duration: 0.18 } }}
            style={{
              padding: '10px 22px', borderRadius: '12px',
              background: '#fff', border: `1.5px solid ${o.color}22`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              cursor: 'default',
            }}
          >
            <span style={{ fontWeight: 700, fontSize: '14px', color: o.color, letterSpacing: '-0.01em' }}>{o.name}</span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          style={{ padding: '10px 22px', borderRadius: '12px', background: 'rgba(59,79,216,0.04)', border: '1.5px dashed rgba(59,79,216,0.20)', cursor: 'default' }}
        >
          <span style={{ fontWeight: 600, fontSize: '13px', color: '#9CA3AF' }}>+ votre OPCO</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ─── CTA Bloc ──────────────────────────────────────────────────── */
function CTABloc() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useIsMobile()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', background: '#fff', border: '1px solid rgba(59,79,216,0.10)', boxShadow: '0 8px 48px rgba(59,79,216,0.08)' }}
    >
      {/* Barre gradient signature en haut */}
      <div style={{ height: '4px', background: 'linear-gradient(90deg, #3B4FD8, #9B30E8, #E83B9B)', width: '100%' }} />

      {/* Blobs intérieurs discrets */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: -60, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,48,232,0.06) 0%, transparent 70%)', pointerEvents: 'none' }}
      />
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{ position: 'absolute', bottom: -40, left: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,79,216,0.05) 0%, transparent 70%)', pointerEvents: 'none' }}
      />

      <div style={{ position: 'relative', zIndex: 2, padding: isMobile ? '28px 20px' : '48px 56px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'stretch' : 'center', flexWrap: 'wrap', gap: isMobile ? '20px' : '36px' }}>

        {/* Gauche : texte */}
        <div style={{ flex: 1, minWidth: '280px' }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '999px', background: 'rgba(59,79,216,0.07)', border: '1px solid rgba(59,79,216,0.18)', marginBottom: '20px' }}>
            <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', display: 'block', flexShrink: 0 }} />
            <span style={{ color: '#3B4FD8', fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Diagnostic gratuit · Sans engagement</span>
          </div>

          {/* Titre */}
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', color: '#0F0C1E', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '14px' }}>
            Vérifiez votre éligibilité{' '}
            <motion.span
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundImage: 'linear-gradient(135deg,#3B4FD8,#9B30E8,#E83B9B,#3B4FD8)', backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              en 2 minutes.
            </motion.span>
          </h2>

          {/* Description */}
          <p style={{ color: '#6B7280', fontSize: '15px', lineHeight: 1.75, maxWidth: '480px' }}>
            Un conseiller analyse votre situation, identifie votre OPCO et vous présente un plan de financement clé en main. <strong style={{ color: '#374151', fontWeight: 600 }}>Aucune démarche de votre côté.</strong>
          </p>
        </div>

        {/* Droite : actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'stretch', minWidth: '220px' }}>
          <motion.a
            href="mailto:contact@smartoptimisation.fr?subject=Vérification éligibilité OPCO"
            whileHover={{ scale: 1.04, y: -2, boxShadow: '0 12px 32px rgba(155,48,232,0.35)', transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              padding: '15px 28px', borderRadius: '999px', fontWeight: 700, fontSize: '15px',
              color: '#fff', textDecoration: 'none',
              background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
              boxShadow: '0 4px 20px rgba(155,48,232,0.28)',
              whiteSpace: 'nowrap',
            }}
          >
            Vérifier mon éligibilité
            <IconArrow />
          </motion.a>

          <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/formation/sur-mesure"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '13px 24px', borderRadius: '999px', fontWeight: 600, fontSize: '14px',
                color: '#3B4FD8', textDecoration: 'none',
                border: '1.5px solid rgba(59,79,216,0.25)',
                background: 'rgba(59,79,216,0.03)',
              }}
            >
              Formations sur mesure
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
