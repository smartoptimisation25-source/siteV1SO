import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { useSEO } from '../hooks/useSEO'
import useIsMobile from '../hooks/useIsMobile'

/* ─── Icônes ────────────────────────────────────────────────────── */
const Ico = ({ d }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const IconSpark = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
  </svg>
)

/* ─── Données domaines ──────────────────────────────────────────── */
const DOMAINS = [
  {
    icon: <Ico d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
    label: 'Efficacité Métier',
    title: 'Automatisez 40% de vos tâches répétitives',
    desc: 'Maîtrise des LLMs (ChatGPT, Claude, Gemini) pour transformer votre productivité quotidienne en avantage concurrentiel.',
    accent: '#3B4FD8',
    gradient: 'linear-gradient(135deg, #3B4FD8, #6366F1)',
    tags: [
      { label: 'ChatGPT', color: '#3B4FD8' },
      { label: 'Claude', color: '#6366F1' },
      { label: 'Productivité', color: '#0891B2' },
    ],
    module: {
      title: 'Exemple de module',
      duration: '1 journée',
      items: ['Prompting avancé métier', 'Automatisation par API', 'Workflows sans code'],
    },
  },
  {
    icon: <Ico d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4" />,
    label: 'Conformité & Éthique',
    title: 'IA responsable & conforme dès maintenant',
    desc: 'Maîtrisez l\'EU AI Act et la mise en conformité RGPD pour déployer une IA éthique, auditée et sans risque juridique.',
    accent: '#059669',
    gradient: 'linear-gradient(135deg, #059669, #34D399)',
    tags: [
      { label: 'EU AI Act', color: '#059669' },
      { label: 'RGPD', color: '#0891B2' },
      { label: 'Gouvernance', color: '#374151' },
    ],
    module: {
      title: 'Exemple de module',
      duration: '2 demi-journées',
      items: ['Cartographie des risques IA', 'Obligations par niveau de risque', 'Documentation de conformité'],
    },
  },
  {
    icon: <Ico d="M12 2a9 9 0 1 0 9 9M12 2v9l6.5 3.5M22 2l-5 5M17 2h5v5" />,
    label: 'IA Générative Spécialisée',
    title: 'Créez, analysez et automatisez sans coder',
    desc: 'Création de contenu (Midjourney, DALL-E), analyse de données complexes et développement No-code pour vos cas d\'usage métier.',
    accent: '#9B30E8',
    gradient: 'linear-gradient(135deg, #9B30E8, #C084FC)',
    tags: [
      { label: 'Midjourney', color: '#9B30E8' },
      { label: 'No-code', color: '#E83B9B' },
      { label: 'Data IA', color: '#7C3AED' },
    ],
    module: {
      title: 'Exemple de module',
      duration: '1,5 jours',
      items: ['Génération d\'images pro', 'Automatisation Make/n8n', 'Dashboards IA interactifs'],
    },
  },
  {
    icon: <Ico d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75" />,
    label: 'Stratégie Dirigeant',
    title: 'Faites de l\'IA une culture d\'entreprise',
    desc: 'Acculturation des équipes et conduite du changement pour intégrer l\'IA au cœur de votre organisation, de la DSI au CODIR.',
    accent: '#D97706',
    gradient: 'linear-gradient(135deg, #D97706, #FBBF24)',
    tags: [
      { label: 'Change Management', color: '#D97706' },
      { label: 'CODIR', color: '#B45309' },
      { label: 'ROI IA', color: '#059669' },
    ],
    module: {
      title: 'Exemple de module',
      duration: '1 journée dirigeants',
      items: ['Diagnostic maturité IA', 'Feuille de route IA 12 mois', 'KPIs et gouvernance interne'],
    },
  },
]

/* ─── Pilier card avec hover-reveal ────────────────────────────── */
function DomainCard({ card, i, isMobile }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 280, damping: 28 })
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 280, damping: 28 })

  function onMove(e) {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  function onLeave() { mx.set(0); my.set(0); setHovered(false) }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{
        position: 'relative', borderRadius: '20px', overflow: 'hidden',
        background: '#FAFBFF', border: `1px solid ${card.accent}18`,
        cursor: 'default', height: isMobile ? 'auto' : '340px',
        rotateX: rotX, rotateY: rotY,
        transformStyle: 'preserve-3d', perspective: '900px',
      }}
      whileHover={{
        boxShadow: `0 0 0 1.5px ${card.accent}40, 0 20px 52px ${card.accent}18`,
        transition: { duration: 0.25 },
      }}
    >
      {/* Fond décoratif */}
      <div style={{ position: 'absolute', top: -50, right: -50, width: 160, height: 160, borderRadius: '50%', background: `radial-gradient(circle, ${card.accent}10 0%, transparent 70%)`, pointerEvents: 'none' }} />

      {/* Contenu principal */}
      <div style={{ padding: '28px', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        {/* Icône */}
        <motion.div
          whileHover={{ rotate: [0, -8, 8, -4, 4, 0], scale: 1.1, transition: { duration: 0.4 } }}
          style={{ width: 48, height: 48, borderRadius: '14px', background: card.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '14px', boxShadow: `0 6px 20px ${card.accent}35`, flexShrink: 0 }}
        >
          {card.icon}
        </motion.div>

        {/* Label */}
        <div style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '999px', background: `${card.accent}12`, border: `1px solid ${card.accent}25`, marginBottom: '10px', width: 'fit-content' }}>
          <span style={{ color: card.accent, fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{card.label}</span>
        </div>

        <h3 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '16px', lineHeight: 1.35, marginBottom: '10px' }}>{card.title}</h3>
        <p style={{ color: '#374151', fontSize: '13.5px', lineHeight: 1.7, flex: 1 }}>{card.desc}</p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '14px' }}>
          {card.tags.map((t) => (
            <span key={t.label} style={{ padding: '3px 9px', borderRadius: '999px', fontSize: '11px', fontWeight: 600, color: t.color, background: `${t.color}10`, border: `1px solid ${t.color}25` }}>
              {t.label}
            </span>
          ))}
        </div>
      </div>

      {/* Panneau hover-reveal (slide du bas) */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', inset: 0, borderRadius: '20px',
              background: `linear-gradient(160deg, ${card.accent}F2 0%, ${card.accent}E8 100%)`,
              padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}>{card.module.title}</div>
              <div style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '999px', background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.30)', marginBottom: '18px' }}>
                <span style={{ color: '#fff', fontSize: '12px', fontWeight: 600 }}>⏱ {card.module.duration}</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {card.module.items.map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                      <IconCheck />
                    </span>
                    <span style={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.70)', fontSize: '12px', fontWeight: 500 }}>
              Contenu adapté à vos besoins réels →
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Dualité Particulier / Entreprise ─────────────────────────── */
const DUALITY = {
  entreprise: {
    label: 'Entreprise',
    icon: null,
    headline: 'Maximisez le ROI de votre capital humain',
    pitch: 'De 5 à 500 collaborateurs. Nous analysons vos processus, identifions les gains rapides et formons vos équipes sur vos outils réels.',
    color: '#3B4FD8',
    points: [
      { text: 'Audit des processus métier', sub: 'Identification des gains IA à court terme' },
      { text: 'Formation en intra-entreprise', sub: 'Sur site ou distanciel, adapté à vos créneaux' },
      { text: 'Financement OPCO possible', sub: 'Zéro avance de trésorerie' },
      { text: 'Reporting ROI post-formation', sub: 'KPIs mesurables à J+30' },
    ],
    cta: 'Demander un audit entreprise',
  },
  particulier: {
    label: 'Particulier',
    icon: null,
    headline: 'Devenez irremplaçable sur votre marché',
    pitch: 'Reconversion, montée en compétences, freelance IA. Nous construisons votre parcours selon vos ambitions et vos contraintes horaires.',
    color: '#9B30E8',
    points: [
      { text: 'Bilan de compétences IA', sub: 'Positionnement et objectifs clairs' },
      { text: 'Parcours flexible 100%', sub: 'En ligne, à votre rythme, en soirée/weekend' },
      { text: 'Financement CPF éligible', sub: 'Certifications reconnues RS7344' },
      { text: 'Suivi carrière post-formation', sub: 'Portfolio et repositionnement marché' },
    ],
    cta: 'Construire mon parcours',
  },
}

function DualitySection() {
  const [active, setActive] = useState('entreprise')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useIsMobile()
  const d = DUALITY[active]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginBottom: '80px' }}
    >
      {/* Titre section */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.5rem, 2.8vw, 2rem)', color: '#0F0C1E', letterSpacing: '-0.02em', marginBottom: '8px' }}>
          Une offre pensée pour vous,{' '}
          <span style={{ backgroundImage: 'linear-gradient(135deg,#3B4FD8,#9B30E8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            quel que soit votre profil
          </span>
        </h2>
        <p style={{ color: '#374151', fontSize: '15px' }}>Sélectionnez votre contexte pour découvrir les bénéfices qui vous correspondent.</p>
      </div>

      {/* Toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: '14px', padding: '4px', gap: '4px' }}>
          {Object.entries(DUALITY).map(([key, val]) => (
            <motion.button
              key={key}
              onClick={() => setActive(key)}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: '10px 28px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                fontWeight: 600, fontSize: '14px', transition: 'all 0.22s ease', fontFamily: 'inherit',
                background: active === key ? '#fff' : 'transparent',
                color: active === key ? val.color : '#374151',
                boxShadow: active === key ? '0 2px 10px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {val.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Contenu avec AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{
            borderRadius: '20px', padding: isMobile ? '24px 20px' : '40px 48px', position: 'relative', overflow: 'hidden',
            background: '#FAFBFF', border: `1.5px solid ${d.color}18`,
            boxShadow: `0 8px 40px ${d.color}0C`,
          }}
        >
          {/* Accent bar latéral */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: `linear-gradient(180deg, ${d.color}, ${d.color}70)`, borderRadius: '0 0 0 20px' }} />

          {/* Déco */}
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${d.color}08 0%, transparent 70%)`, pointerEvents: 'none' }} />

          <div style={{ display: 'flex', gap: isMobile ? '20px' : '48px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ flex: '1', minWidth: '240px' }}>
              <h3 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0F0C1E', letterSpacing: '-0.02em', marginBottom: '10px', lineHeight: 1.25 }}>{d.headline}</h3>
              <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.75 }}>{d.pitch}</p>
            </div>
            <div style={{ flex: '1', minWidth: '240px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {d.points.map((p, i) => (
                <motion.div
                  key={p.text}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}
                >
                  <span style={{ width: 22, height: 22, borderRadius: '6px', background: `${d.color}18`, border: `1px solid ${d.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: d.color, flexShrink: 0, marginTop: '2px' }}>
                    <IconCheck />
                  </span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: '#0F0C1E' }}>{p.text}</div>
                    <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '1px' }}>{p.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── CTA final ─────────────────────────────────────────────────── */
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
      <div style={{ height: '4px', background: 'linear-gradient(90deg, #3B4FD8, #9B30E8, #E83B9B)', width: '100%' }} />
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: -60, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,48,232,0.06) 0%, transparent 70%)', pointerEvents: 'none' }}
      />
      <div style={{ position: 'relative', zIndex: 2, padding: isMobile ? '28px 20px' : '48px 56px', display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'stretch' : 'center', flexWrap: 'wrap', gap: isMobile ? '20px' : '36px' }}>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '999px', background: 'rgba(59,79,216,0.07)', border: '1px solid rgba(59,79,216,0.18)', marginBottom: '20px' }}>
            <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', display: 'block', flexShrink: 0 }} />
            <span style={{ color: '#3B4FD8', fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Premier échange offert · Réponse sous 24h</span>
          </div>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', color: '#0F0C1E', lineHeight: 1.2, letterSpacing: '-0.025em', marginBottom: '14px' }}>
            Définissez votre programme{' '}
            <motion.span
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundImage: 'linear-gradient(135deg,#3B4FD8,#9B30E8,#E83B9B,#3B4FD8)', backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              sur-mesure.
            </motion.span>
          </h2>
          <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.75, maxWidth: '440px' }}>
            Un expert analyse vos besoins, vos contraintes et vous propose un programme co-construit. <strong style={{ color: '#374151', fontWeight: 600 }}>Aucun engagement à la prise de contact.</strong>
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'stretch', minWidth: '220px' }}>
          <motion.a
            href="mailto:contact@smartoptimisation.fr?subject=Programme sur mesure"
            whileHover={{ scale: 1.04, y: -2, boxShadow: '0 12px 32px rgba(155,48,232,0.35)', transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.97 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '15px 28px', borderRadius: '999px', fontWeight: 700, fontSize: '15px', color: '#fff', textDecoration: 'none', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', boxShadow: '0 4px 20px rgba(155,48,232,0.28)', whiteSpace: 'nowrap' }}
          >
            Définir mon programme sur mesure
            <IconArrow />
          </motion.a>
          <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.97 }}>
            <Link to="/formation/cpf"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px 24px', borderRadius: '999px', fontWeight: 600, fontSize: '14px', color: '#3B4FD8', textDecoration: 'none', border: '1.5px solid rgba(59,79,216,0.25)', background: 'rgba(59,79,216,0.03)' }}
            >
              Voir les formations CPF
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Page principale ───────────────────────────────────────────── */
const SUR_MESURE_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      'name': 'Formation IA sur mesure — Co-construite avec vous',
      'description': 'Programme de formation IA 100% sur mesure : automatisation processus métier IA, EU AI Act, conformité RGPD, LLMs, IA générative. Pour entreprises 5–500 collaborateurs et particuliers. Audit gratuit.',
      'url': 'https://smartoptimisation.fr/formation/sur-mesure',
      'provider': { '@id': 'https://smartoptimisation.fr/#organization' },
      'serviceType': 'Formation IA sur mesure',
      'areaServed': { '@type': 'Country', 'name': 'France' },
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'Domaines de formation IA',
        'itemListElement': [
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Efficacité Métier — Automatisation 40% des tâches répétitives' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Conformité EU AI Act & RGPD' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'IA Générative Spécialisée — No-code & Data IA' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Stratégie Dirigeant — Culture IA d\'entreprise' } },
        ],
      },
      'additionalProperty': [
        { '@type': 'PropertyValue', 'name': 'ROI mesurable', 'value': 'J+30' },
        { '@type': 'PropertyValue', 'name': 'Financement possible', 'value': 'OPCO ou CPF' },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://smartoptimisation.fr/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Formation', 'item': 'https://smartoptimisation.fr/formation/sur-mesure' },
        { '@type': 'ListItem', 'position': 3, 'name': 'Formation IA sur mesure' },
      ],
    },
  ],
}

export default function FormationSurMesure() {
  const isMobile = useIsMobile()
  useSEO({
    title: 'Formation IA sur mesure en entreprise — Alsace & France',
    description: 'Programme IA sur mesure co-construit avec vos équipes : automatisation, EU AI Act, LLMs. Financement OPCO ou CPF possible. Audit IA gratuit à Strasbourg. Certifié Qualiopi.',
    path: '/formation/sur-mesure',
    jsonLd: SUR_MESURE_SCHEMA,
    keywords: 'formation IA sur mesure, formation IA entreprise, programme IA personnalisé, formation intelligence artificielle, EU AI Act formation, LLMs formation',
  })
  return (
    <main style={{ background: '#fff', minHeight: 'calc(100vh - 72px)', position: 'relative', overflow: 'hidden' }}>

      {/* Blobs décoratifs */}
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

        {/* Nav haut */}
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '48px' }}
        >
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#9CA3AF', fontSize: '13px', textDecoration: 'none', fontWeight: 500, transition: 'color 0.18s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#3B4FD8' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#9CA3AF' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Accueil
          </Link>
          <motion.div whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}>
            <Link to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '10px 22px', borderRadius: '999px', fontSize: '14px', fontWeight: 700,
              color: '#fff', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
              textDecoration: 'none', boxShadow: '0 4px 16px rgba(155,48,232,0.28)',
            }}>
              Co-construire mon programme
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* ══ HERO ══ */}
        <div style={{ maxWidth: '800px', marginBottom: '72px' }}>

          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'rgba(59,79,216,0.07)', border: '1px solid rgba(59,79,216,0.18)', marginBottom: '28px' }}>
            <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', flexShrink: 0, display: 'block' }} />
            <span style={{ color: '#3B4FD8', fontSize: '13px', fontWeight: 600 }}>Formation sur mesure — Co-construite avec vous</span>
          </motion.div>

          {/* H1 */}
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.10 }}
            style={{ fontWeight: 800, fontSize: isMobile ? '1.8rem' : 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: 1.12, letterSpacing: '-0.025em', color: '#0F0C1E', marginBottom: '20px' }}>
            L'IA n'est pas une option,{' '}
            <motion.span
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundImage: 'linear-gradient(135deg,#3B4FD8,#9B30E8,#E83B9B,#3B4FD8)', backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              c'est votre nouvel avantage compétitif.
            </motion.span>
          </motion.h1>

          {/* Sous-titre */}
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }}
            style={{ color: '#374151', fontSize: isMobile ? '15px' : '19px', lineHeight: 1.7, marginBottom: '10px', fontWeight: 400 }}>
            Que vous soyez une entreprise cherchant l'efficience opérationnelle ou un particulier souhaitant booster sa carrière,{' '}
            <strong style={{ color: '#0F0C1E', fontWeight: 600 }}>nous co-construisons le programme qui répond à vos défis réels.</strong>
          </motion.p>

          {/* Stat pills */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.28 }}
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '28px' }}>
            {[
              { val: '100%', label: 'Sur-mesure garanti' },
              { val: '4', label: 'Domaines d\'expertise' },
              { val: 'J+30', label: 'ROI mesurable' },
            ].map((s) => (
              <motion.div key={s.label}
                whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(59,79,216,0.12)', scale: 1.04, transition: { duration: 0.18 } }}
                style={{ padding: '10px 20px', borderRadius: '14px', background: '#fff', border: '1px solid rgba(59,79,216,0.10)', boxShadow: '0 2px 10px rgba(59,79,216,0.05)', cursor: 'default' }}>
                <div style={{ fontWeight: 800, fontSize: '22px', color: '#0F0C1E', letterSpacing: '-0.02em', lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Séparateur */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, #3B4FD8, #9B30E8, transparent)', marginBottom: '64px', borderRadius: '1px' }} />

        {/* ══ DUALITÉ ══ */}
        <DualitySection />

        {/* ══ DOMAINES TITRE ══ */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 14px', borderRadius: '999px', background: 'rgba(59,79,216,0.06)', border: '1px solid rgba(59,79,216,0.15)', marginBottom: '14px' }}>
            <IconSpark />
            <span style={{ color: '#3B4FD8', fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Domaines d'expertise</span>
          </div>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.4rem, 2.6vw, 1.9rem)', color: '#0F0C1E', letterSpacing: '-0.02em', marginBottom: '8px' }}>
            4 piliers, une profondeur d'expertise réelle
          </h2>
          <p style={{ color: '#374151', fontSize: '14px', maxWidth: '500px', margin: '0 auto' }}>
            Survolez chaque pilier pour découvrir un exemple de module concret.
          </p>
        </div>

        {/* ══ BENTO DOMAINES ══ */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '72px' }}>
          {DOMAINS.map((card, i) => <DomainCard key={i} card={card} i={i} isMobile={isMobile} />)}
        </div>

        {/* ══ CTA ══ */}
        <CTABloc />

        {/* Maillage interne */}
        <section style={{ background: '#F9F8FF', padding: isMobile ? '20px' : '28px 32px', borderRadius: '20px', marginTop: '32px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '14px', marginBottom: '12px', textAlign: 'center' }}>
              Découvrez nos autres formations IA
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to="/formation/cpf" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: '#fff', borderRadius: '12px', border: '1px solid rgba(59,79,216,0.08)', textDecoration: 'none', color: '#0F0C1E', fontSize: '13px', fontWeight: 500 }}>
                <span>Formation CPF RS7344</span>
                <span style={{ color: '#3B4FD8', fontSize: '12px' }}>En savoir plus →</span>
              </Link>
              <Link to="/formation/opco" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: '#fff', borderRadius: '12px', border: '1px solid rgba(59,79,216,0.08)', textDecoration: 'none', color: '#0F0C1E', fontSize: '13px', fontWeight: 500 }}>
                <span>Formation OPCO</span>
                <span style={{ color: '#3B4FD8', fontSize: '12px' }}>En savoir plus →</span>
              </Link>
              <Link to="/formation/environnements" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: '#fff', borderRadius: '12px', border: '1px solid rgba(59,79,216,0.08)', textDecoration: 'none', color: '#0F0C1E', fontSize: '13px', fontWeight: 500 }}>
                <span>Formation aux environnements IA</span>
                <span style={{ color: '#3B4FD8', fontSize: '12px' }}>En savoir plus →</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
