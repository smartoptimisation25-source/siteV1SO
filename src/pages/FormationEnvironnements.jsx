import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useSEO } from '../hooks/useSEO'
import useIsMobile from '../hooks/useIsMobile'

/* ─── Logos officiels ─────────────────────────────────────────── */
function LogoClaude() {
  return <img src="/logos/claude-logo.png" alt="Claude" style={{ width: 28, height: 28, objectFit: 'contain', mixBlendMode: 'multiply' }} />
}
function LogoGPT() {
  return <img src="/logos/chatgpt.webp" alt="ChatGPT" style={{ width: 28, height: 28, objectFit: 'contain' }} />
}
function LogoGoogle() {
  return <img src="/logos/gemini.png" alt="Gemini" style={{ width: 28, height: 28, objectFit: 'contain' }} />
}

/* ─── Données écosystèmes ────────────────────────────────────────── */
const ECOSYSTEMS = [
  {
    id: 'claude',
    logo: <LogoClaude />,
    name: 'Claude',
    vendor: 'Anthropic',
    tagline: 'Analyse & Précision',
    accent: '#D97706',
    accentLight: '#F59E0B',
    glow: 'rgba(217,119,6,0.22)',
    glowStrong: 'rgba(217,119,6,0.35)',
    gradient: 'linear-gradient(135deg, #D97706, #F59E0B)',
    gradientCard: 'linear-gradient(135deg, rgba(217,119,6,0.08) 0%, rgba(0,0,0,0) 60%)',
    focus: 'Analyse de données massives, rédaction haute fidélité et confidentialité des données.',
    modules: ['Projets & Artefacts de code', 'Fenêtres de contexte étendues (200K tokens)', 'Rédaction longue durée haute précision'],
    benefits: [
      { icon: '', label: 'ROI', value: 'Réduction de 60% du temps de synthèse documentaire' },
      { icon: '', label: 'Gain de temps', value: '4h/jour économisées sur l\'analyse de rapports' },
      { icon: '', label: 'Sécurité', value: 'Zéro données envoyées à des tiers — architecture souveraine' },
    ],
    compare: ['Meilleur pour l\'analyse de longs documents', 'Raisonnement structuré & nuancé', 'Idéal pour le juridique et la conformité'],
  },
  {
    id: 'chatgpt',
    logo: <LogoGPT />,
    name: 'ChatGPT',
    vendor: 'OpenAI',
    tagline: 'Polyvalence & Automatisation',
    accent: '#111827',
    accentLight: '#374151',
    glow: 'rgba(17,24,39,0.18)',
    glowStrong: 'rgba(17,24,39,0.30)',
    gradient: 'linear-gradient(135deg, #111827, #374151)',
    gradientCard: 'linear-gradient(135deg, rgba(17,24,39,0.06) 0%, rgba(0,0,0,0) 60%)',
    focus: 'Polyvalence créative, automatisation des flux de travail et génération visuelle intégrée.',
    modules: ['Création de GPTs personnalisés par métier', 'Advanced Data Analysis (Python)', 'Intégration DALL-E & génération d\'images'],
    benefits: [
      { icon: '', label: 'ROI', value: 'Automatisation de workflows complets sans développeur' },
      { icon: '', label: 'Gain de temps', value: 'GPTs métier déployés en moins d\'une heure' },
      { icon: '', label: 'Sécurité', value: 'Mode Entreprise : données isolées, pas d\'entraînement modèle' },
    ],
    compare: ['Écosystème de plugins le plus large', 'Génération image et code native', 'Idéal pour la création de contenu scale'],
  },
  {
    id: 'google',
    logo: <LogoGoogle />,
    name: 'Gemini',
    vendor: 'Google Workspace',
    tagline: 'Collaboration & Intégration',
    accent: '#4285F4',
    accentLight: '#93C5FD',
    glow: 'rgba(66,133,244,0.22)',
    glowStrong: 'rgba(66,133,244,0.35)',
    gradient: 'linear-gradient(135deg, #4285F4, #34A853, #FBBC05, #EA4335)',
    gradientCard: 'linear-gradient(135deg, rgba(66,133,244,0.08) 0%, rgba(52,168,83,0.04) 60%, rgba(0,0,0,0) 100%)',
    focus: 'Intégration native dans les outils de collaboration et connexion directe avec l\'infrastructure Google.',
    modules: ['IA dans Docs, Sheets & Slides (Gemini)', 'Connexion Google Drive & données métier', 'Vertex AI pour les besoins avancés'],
    benefits: [
      { icon: '', label: 'ROI', value: 'Résumés de réunions Meet + actions automatisées' },
      { icon: '', label: 'Gain de temps', value: 'Rapports Sheets générés en 3 minutes vs 2h' },
      { icon: '', label: 'Sécurité', value: 'Données au sein de votre instance Google Workspace' },
    ],
    compare: ['Meilleur pour les équipes déjà sur G-Suite', 'Collaboration temps réel avec IA intégrée', 'Idéal pour les opérations et la data'],
  },
]

/* ─── Carte Écosystème ───────────────────────────────────────────── */
function EcoCard({ eco, i, compareMode, activeCompare, onToggleCompare, isMobile }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 })

  function onMouseMove(e) {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function onMouseLeave() { x.set(0); y.set(0) }

  const isSelected = activeCompare === eco.id

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] } }}
      viewport={{ once: true }}
      onMouseMove={!compareMode ? onMouseMove : undefined}
      onMouseLeave={!compareMode ? onMouseLeave : undefined}
      whileHover={!compareMode ? {
        borderColor: `${eco.accent}55`,
        boxShadow: `0 0 0 1px ${eco.accent}30, 0 24px 64px ${eco.glow}, 0 8px 24px rgba(0,0,0,0.4)`,
        transition: { duration: 0.25 },
      } : undefined}
      style={{
        position: 'relative',
        background: 'rgba(0,0,0,0.03)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: isSelected
          ? `1.5px solid ${eco.accent}80`
          : '1.5px solid rgba(255,255,255,0.08)',
        borderRadius: '20px',
        padding: isMobile ? '16px' : '32px',
        cursor: 'default',
        rotateX: !compareMode ? rotateX : 0,
        rotateY: !compareMode ? rotateY : 0,
        transformStyle: 'preserve-3d',
        transformPerspective: 800,
        boxShadow: isSelected
          ? `0 0 0 1px ${eco.accent}40, 0 24px 64px ${eco.glow}`
          : '0 4px 24px rgba(0,0,0,0.2)',
        transition: 'border 0.2s, box-shadow 0.2s',
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '14px' : '24px',
        minWidth: 0,
      }}
    >
      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '24px', pointerEvents: 'none',
        background: eco.gradientCard,
      }} />

      {/* Glow corner */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', top: 0, right: 0,
          width: '200px', height: '200px', borderRadius: '50%', pointerEvents: 'none',
          background: `radial-gradient(circle at top right, ${eco.glow} 0%, transparent 70%)`,
        }}
      />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', zIndex: 1, flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: isMobile ? '40px' : '52px', height: isMobile ? '40px' : '52px', borderRadius: '14px',
            background: `linear-gradient(135deg, ${eco.accent}20, ${eco.accent}08)`,
            border: `1px solid ${eco.accent}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 16px ${eco.glow}`,
            flexShrink: 0,
          }}>
            {eco.logo}
          </div>
          <div>
            <p style={{ color: 'rgba(0,0,0,0.68)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
              {eco.vendor}
            </p>
            <p style={{ color: '#111827', fontWeight: 700, fontSize: isMobile ? '17px' : '20px', margin: 0, letterSpacing: '-0.02em' }}>
              {eco.name}
            </p>
          </div>
        </div>
        <div style={{
          padding: '3px 10px', borderRadius: '999px',
          background: `${eco.accent}18`,
          border: `1px solid ${eco.accent}35`,
          color: eco.accentLight,
          fontSize: '10px', fontWeight: 600, letterSpacing: '0.04em',
          alignSelf: 'center',
        }}>
          {eco.tagline}
        </div>
      </div>

      {/* Focus */}
      <p style={{ color: 'rgba(0,0,0,0.72)', fontSize: '14px', lineHeight: 1.7, margin: 0, position: 'relative', zIndex: 1 }}>
        {eco.focus}
      </p>

      {/* Modules */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ color: 'rgba(0,0,0,0.65)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
          Modules
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {eco.modules.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0, transition: { delay: i * 0.12 + idx * 0.06 } }}
              viewport={{ once: true }}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}
            >
              <div style={{
                width: '16px', height: '16px', borderRadius: '4px', flexShrink: 0, marginTop: '2px',
                background: `${eco.accent}25`,
                border: `1px solid ${eco.accent}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                  <polyline points="2 6 5 9 10 3" stroke={eco.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ color: 'rgba(0,0,0,0.65)', fontSize: '13px', lineHeight: 1.5 }}>{m}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bénéfices */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative', zIndex: 1 }}>
        <p style={{ color: 'rgba(0,0,0,0.65)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2px' }}>
          Bénéfices concrets
        </p>
        {eco.benefits.map((b, idx) => (
          <div key={idx} style={{
            display: 'flex', alignItems: 'flex-start', gap: '10px',
            padding: '10px 14px', borderRadius: '12px',
            background: 'rgba(0,0,0,0.03)',
            border: '1px solid rgba(0,0,0,0.08)',
          }}>
            <span style={{ fontSize: '14px', flexShrink: 0 }}>{b.icon}</span>
            <div>
              <span style={{ color: eco.accentLight, fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block' }}>{b.label}</span>
              <span style={{ color: 'rgba(0,0,0,0.75)', fontSize: '12.5px', lineHeight: 1.5 }}>{b.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Séparateur */}
      <div style={{ height: '1px', background: `linear-gradient(90deg, ${eco.accent}40, transparent)`, position: 'relative', zIndex: 1 }} />

      {/* CTA */}
      <div style={{ display: 'flex', gap: '10px', position: 'relative', zIndex: 1 }}>
        <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }} style={{ flex: 1 }}>
          <Link
            to="/contact"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '12px 20px', borderRadius: '999px',
              background: eco.gradient,
              color: '#fff', fontWeight: 600, fontSize: '13px',
              textDecoration: 'none',
              boxShadow: `0 4px 20px ${eco.glow}`,
            }}
          >
            Choisir cet environnement
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </motion.div>
        {compareMode && (
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => onToggleCompare(eco.id)}
            style={{
              padding: '12px 16px', borderRadius: '999px',
              background: isSelected ? `${eco.accent}30` : 'rgba(255,255,255,0.06)',
              border: isSelected ? `1.5px solid ${eco.accent}60` : '1.5px solid rgba(255,255,255,0.10)',
              color: isSelected ? eco.accentLight : 'rgba(255,255,255,0.5)',
              cursor: 'pointer', fontFamily: 'inherit', fontSize: '12px', fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
          >
            {isSelected ? ' Sélectionné' : 'Comparer'}
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

/* ─── Panneau de comparaison ─────────────────────────────────────── */
function ComparePanel({ selectedIds }) {
  const selected = ECOSYSTEMS.filter(e => selectedIds.includes(e.id))
  if (selected.length < 2) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          textAlign: 'center', padding: '40px',
          color: 'rgba(0,0,0,0.65)', fontSize: '14px',
        }}
      >
        Sélectionnez 2 ou 3 environnements à comparer
      </motion.div>
    )
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      style={{ overflowX: 'auto' }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
        <thead>
          <tr>
            <th style={{ padding: '14px 16px', textAlign: 'left', color: 'rgba(0,0,0,0.65)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', borderBottom: '1px solid rgba(0,0,0,0.10)' }}>
              Critère
            </th>
            {selected.map(eco => (
              <th key={eco.id} style={{ padding: '14px 16px', textAlign: 'center', borderBottom: '1px solid rgba(0,0,0,0.10)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  {eco.logo}
                  <span style={{ color: '#111827', fontWeight: 700, fontSize: '15px' }}>{eco.name}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {['0', '1', '2'].map((idx, rowIdx) => (
            <tr key={idx} style={{ background: rowIdx % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
              <td style={{ padding: '14px 16px', color: 'rgba(0,0,0,0.68)', fontSize: '12px', fontWeight: 500, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                Point fort {parseInt(idx) + 1}
              </td>
              {selected.map(eco => (
                <td key={eco.id} style={{ padding: '14px 16px', textAlign: 'center', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '4px 10px', borderRadius: '8px',
                    background: `${eco.accent}15`,
                    border: `1px solid ${eco.accent}25`,
                  }}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <polyline points="2 6 5 9 10 3" stroke={eco.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ color: 'rgba(0,0,0,0.65)', fontSize: '12px', lineHeight: 1.4 }}>
                      {eco.compare[parseInt(idx)]}
                    </span>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}

/* ─── Page principale ────────────────────────────────────────────── */
export default function FormationEnvironnements() {
  useSEO({
    title: 'Formation Claude, ChatGPT & Gemini en entreprise',
    description: 'Maîtrisez Claude, ChatGPT et Google Gemini avec des formations expert adaptées à votre infrastructure. Comparatif, cas d\'usage métier et déploiement. Smart Optimisation, Strasbourg.',
    path: '/formation/environnements',
    keywords: 'formation ChatGPT, formation Claude, formation Gemini, formation IA entreprise, comparatif ChatGPT Claude Gemini, formation LLM',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://smartoptimisation.fr/' },
            { '@type': 'ListItem', 'position': 2, 'name': 'Formation', 'item': 'https://smartoptimisation.fr/formation/environnements' },
            { '@type': 'ListItem', 'position': 3, 'name': 'Formation aux environnements IA' },
          ],
        },
      ],
    },
  })

  const isMobile = useIsMobile()
  const [compareMode, setCompareMode] = useState(false)
  const [activeCompare, setActiveCompare] = useState([])

  function toggleCompare(id) {
    setActiveCompare(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 3 ? [...prev, id] : prev
    )
  }

  return (
    <main style={{ background: '#ffffff', minHeight: '100vh' }}>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: isMobile ? '8px 24px 64px' : '8px 48px 80px' }}>
        {/* Background glows */}
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: -200, left: -100, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,79,216,0.10) 0%, transparent 70%)', pointerEvents: 'none' }}
        />
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          style={{ position: 'absolute', top: -100, right: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(217,119,6,0.08) 0%, transparent 70%)', pointerEvents: 'none' }}
        />

        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', borderRadius: '999px', border: '1px solid rgba(0,0,0,0.12)', background: 'rgba(0,0,0,0.04)', marginBottom: '32px' }}
          >
            <motion.span
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg,#3B4FD8,#9B30E8)', flexShrink: 0, display: 'block' }}
            />
            <span style={{ color: 'rgba(0,0,0,0.72)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em' }}>Formation aux Environnements IA</span>
          </motion.div>

          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } }}
            style={{ color: '#111827', fontWeight: 800, fontSize: isMobile ? '2rem' : 'clamp(2.4rem, 4.5vw, 3.6rem)', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '16px' }}
          >
            Savez-vous vraiment utiliser{' '}
            <motion.span
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundImage: 'linear-gradient(135deg,#3B4FD8,#D97706,#10A37F,#4285F4,#3B4FD8)', backgroundSize: '300%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              ChatGPT, Claude ou Gemini ?
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }}
            style={{ color: 'rgba(0,0,0,0.75)', fontSize: isMobile ? '15px' : '18px', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto 16px', fontWeight: 500 }}
          >
            La plupart des professionnels n'exploitent que <strong style={{ color: '#3B4FD8' }}>10% du potentiel</strong> de ces outils. Connaissez-vous tous les champs du possible ?
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.28 } }}
            style={{ color: 'rgba(0,0,0,0.68)', fontSize: isMobile ? '14px' : '15px', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 40px' }}
          >
            En 2 jours, nous ne vous apprenons pas à "utiliser l'IA" — nous transformons la façon dont vous pensez et travaillez avec elle.
          </motion.p>

          {/* 3 logos */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.38 } }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: isMobile ? '24px' : '48px', flexWrap: 'wrap' }}
          >
            {ECOSYSTEMS.map((eco, i) => (
              <motion.div
                key={eco.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.4 + i * 0.1 } }}
                whileHover={{ scale: 1.08, y: -4 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
              >
                <div style={{
                  width: '56px', height: '56px', borderRadius: '18px',
                  background: `${eco.accent}15`,
                  border: `1px solid ${eco.accent}35`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 8px 24px ${eco.glow}`,
                }}>
                  {eco.logo}
                </div>
                <span style={{ color: 'rgba(0,0,0,0.70)', fontSize: '12px', fontWeight: 600 }}>{eco.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Reality check ────────────────────────────────────────── */}
      <section style={{ padding: isMobile ? '0 24px 48px' : '0 48px 56px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
            {[
              {
                question: 'Combien de fois l\'IA vous a-t-elle déçu ?',
                answer: 'Ce n\'est pas l\'outil le problème — c\'est la façon dont vous lui parlez.',
                accent: '#3B4FD8',
              },
              {
                question: 'Connaissez-vous toutes les fonctionnalités cachées ?',
                answer: 'Artefacts Claude, GPTs personnalisés, Gemini dans vos Sheets… 90% des utilisateurs ne savent pas qu\'elles existent.',
                accent: '#D97706',
              },
              {
                question: 'Quelle IA est faite pour vous, vraiment ?',
                answer: 'Claude, ChatGPT et Gemini ne font pas la même chose. Choisir le bon outil change tout.',
                accent: '#10A37F',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }}
                viewport={{ once: true }}
                whileHover={{ y: -4, boxShadow: `0 16px 40px ${item.accent}18`, transition: { duration: 0.2 } }}
                style={{
                  padding: '28px 24px', borderRadius: '20px',
                  background: '#fff',
                  border: `1.5px solid ${item.accent}20`,
                  boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ width: '32px', height: '3px', borderRadius: '2px', background: `linear-gradient(90deg, ${item.accent}, transparent)`, marginBottom: '16px' }} />
                <p style={{ color: '#111827', fontWeight: 700, fontSize: '16px', lineHeight: 1.4, marginBottom: '12px' }}>
                  {item.question}
                </p>
                <p style={{ color: 'rgba(0,0,0,0.70)', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>
                  {item.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Switch Comparaison ────────────────────────────────────── */}
      <section style={{ padding: isMobile ? '0 24px 32px' : '0 48px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
          <span style={{ color: 'rgba(0,0,0,0.68)', fontSize: '13px', fontWeight: 500 }}>
            Mode comparaison
          </span>
          <motion.button
            onClick={() => { setCompareMode(!compareMode); setActiveCompare([]) }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '48px', height: '26px', borderRadius: '999px',
              background: compareMode ? 'linear-gradient(135deg, #3B4FD8, #9B30E8)' : 'rgba(0,0,0,0.08)',
              border: 'none', cursor: 'pointer', position: 'relative',
              boxShadow: compareMode ? '0 4px 16px rgba(155,48,232,0.35)' : 'none',
              transition: 'background 0.25s ease, box-shadow 0.25s ease',
            }}
          >
            <motion.div
              animate={{ x: compareMode ? 24 : 2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              style={{
                position: 'absolute', top: '3px',
                width: '20px', height: '20px', borderRadius: '50%',
                background: '#fff',
                boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
              }}
            />
          </motion.button>
        </div>
      </section>

      {/* ── Grille des cartes ─────────────────────────────────────── */}
      <section style={{ padding: isMobile ? '0 24px 48px' : '0 48px 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '20px',
          }}>
            {ECOSYSTEMS.map((eco, i) => (
              <EcoCard
                key={eco.id}
                eco={eco}
                i={i}
                compareMode={compareMode}
                activeCompare={activeCompare.includes(eco.id) ? eco.id : null}
                onToggleCompare={toggleCompare}
                isMobile={isMobile}
              />
            ))}
          </div>

          {/* Panneau comparaison */}
          <AnimatePresence>
            {compareMode && (
              <motion.div
                initial={{ opacity: 0, y: 24, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: 24, height: 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  marginTop: '28px', overflow: 'hidden',
                  background: 'rgba(0,0,0,0.03)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  border: '1.5px solid rgba(0,0,0,0.10)',
                  borderRadius: '24px',
                  padding: '28px 24px',
                }}
              >
                <p style={{ color: 'rgba(0,0,0,0.65)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
                  Tableau comparatif — {activeCompare.length}/3 environnements sélectionnés
                </p>
                <ComparePanel selectedIds={activeCompare} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Section note pédagogique ──────────────────────────────── */}
      <section style={{ padding: isMobile ? '48px 24px 80px' : '64px 48px 100px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
            viewport={{ once: true }}
          >
            <p style={{ color: 'rgba(0,0,0,0.65)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
              Notre approche pédagogique
            </p>
            <h2 style={{ color: '#111827', fontWeight: 800, fontSize: isMobile ? '1.8rem' : 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.2, letterSpacing: '-0.025em', marginBottom: '16px' }}>
              Moins de théorie, plus de résultats. Dès le premier jour.
            </h2>
            <p style={{ color: 'rgba(0,0,0,0.70)', fontSize: '16px', lineHeight: 1.8, maxWidth: '620px', margin: '0 auto 12px' }}>
              Chaque formation est construite autour de <strong style={{ color: '#111827' }}>vos cas d'usage réels</strong>. Vous repartez avec des workflows opérationnels déployables le lendemain matin.
            </p>
            <p style={{ color: 'rgba(0,0,0,0.65)', fontSize: '14px', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 48px', fontStyle: 'italic' }}>
              "On ne vous montre pas comment ça marche — on vous fait comprendre pourquoi ça change tout."
            </p>

            <div style={{ display: 'flex', gap: isMobile ? '16px' : '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { label: '100% pratique', sub: 'Zéro slide, 100% exercices' },
                { label: '2 jours intensifs', sub: 'ROI dès J+1' },
                { label: 'Suivi 30 jours', sub: 'Questions illimitées post-formation' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, borderColor: 'rgba(59,79,216,0.35)', boxShadow: '0 12px 32px rgba(59,79,216,0.15)', transition: { duration: 0.2 } }}
                  style={{
                    padding: isMobile ? '20px 24px' : '24px 32px', borderRadius: '20px',
                    background: 'rgba(0,0,0,0.03)',
                    border: '1.5px solid rgba(0,0,0,0.10)',
                    textAlign: 'center', minWidth: '160px',
                  }}
                >
                  <p style={{ color: '#111827', fontWeight: 700, fontSize: '15px', margin: '0 0 6px' }}>{item.label}</p>
                  <p style={{ color: 'rgba(0,0,0,0.65)', fontSize: '12px', margin: 0 }}>{item.sub}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA final ────────────────────────────────────────────── */}
      <section style={{ padding: isMobile ? '0 24px 80px' : '0 48px 100px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(135deg, rgba(59,79,216,0.15) 0%, rgba(155,48,232,0.10) 50%, rgba(217,119,6,0.08) 100%)',
              border: '1.5px solid rgba(0,0,0,0.10)',
              borderRadius: '28px',
              padding: isMobile ? '40px 28px' : '56px 64px',
              textAlign: 'center',
              backdropFilter: 'blur(24px)',
            }}
          >
            <p style={{ color: 'rgba(0,0,0,0.68)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Passez dans le top 10%
            </p>
            <h3 style={{ color: '#111827', fontWeight: 800, fontSize: isMobile ? '1.6rem' : '2.2rem', lineHeight: 1.2, letterSpacing: '-0.025em', marginBottom: '16px' }}>
              Il est temps d'exploiter l'IA<br />à son vrai potentiel.
            </h3>
            <p style={{ color: 'rgba(0,0,0,0.68)', fontSize: '15px', lineHeight: 1.7, marginBottom: '36px' }}>
              30 minutes de diagnostic gratuit. On identifie votre environnement cible, vos cas d'usage prioritaires, et on construit le programme taillé pour votre équipe.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link to="/contact"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '14px 32px', borderRadius: '999px',
                    background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
                    color: '#fff', fontWeight: 600, fontSize: '15px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 24px rgba(155,48,232,0.40)',
                  }}
                >
                  Lancer mon diagnostic gratuit →
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link to="/formation/sur-mesure"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '14px 32px', borderRadius: '999px',
                    border: '1.5px solid rgba(0,0,0,0.18)',
                    color: 'rgba(0,0,0,0.6)', fontWeight: 600, fontSize: '15px',
                    textDecoration: 'none',
                  }}
                >
                  Voir la Formation sur mesure
                </Link>
              </motion.div>
            </div>
          </motion.div>
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
              <span style={{ color: '#3B4FD8', fontSize: '12px' }}>En savoir plus →</span>
            </Link>
            <Link to="/formation/opco" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: '#fff', borderRadius: '12px', border: '1px solid rgba(59,79,216,0.08)', textDecoration: 'none', color: '#0F0C1E', fontSize: '13px', fontWeight: 500 }}>
              <span>Formation OPCO</span>
              <span style={{ color: '#3B4FD8', fontSize: '12px' }}>En savoir plus →</span>
            </Link>
            <Link to="/formation/sur-mesure" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: '#fff', borderRadius: '12px', border: '1px solid rgba(59,79,216,0.08)', textDecoration: 'none', color: '#0F0C1E', fontSize: '13px', fontWeight: 500 }}>
              <span>Formation sur mesure</span>
              <span style={{ color: '#3B4FD8', fontSize: '12px' }}>En savoir plus →</span>
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
