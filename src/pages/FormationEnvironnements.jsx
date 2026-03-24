import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useSEO } from '../hooks/useSEO'
import useIsMobile from '../hooks/useIsMobile'

/* ─── Logos SVG minimalistes ─────────────────────────────────────── */
function LogoClaude() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="14" fill="rgba(217,119,6,0.15)" />
      <path d="M14 7c-1.8 0-3.3 1.5-3.3 3.3 0 .6.2 1.2.5 1.7L8.5 19h2.1l.7-2h5.4l.7 2h2.1l-2.7-7c.3-.5.5-1.1.5-1.7C17.3 8.5 15.8 7 14 7zm0 2c.7 0 1.3.6 1.3 1.3S14.7 11.6 14 11.6s-1.3-.6-1.3-1.3S13.3 9 14 9zm-1.8 6.4 1.8-3 1.8 3h-3.6z" fill="#D97706"/>
    </svg>
  )
}
function LogoGPT() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="14" fill="rgba(16,163,127,0.15)" />
      <path d="M21.5 11.9a4.5 4.5 0 0 0-.4-3.7 4.6 4.6 0 0 0-5-2.2 4.5 4.5 0 0 0-3.4-1.5 4.6 4.6 0 0 0-4.4 3.2A4.5 4.5 0 0 0 5.3 10a4.6 4.6 0 0 0 .6 5.4 4.5 4.5 0 0 0 .4 3.7 4.6 4.6 0 0 0 5 2.2 4.5 4.5 0 0 0 3.4 1.5 4.6 4.6 0 0 0 4.4-3.2 4.5 4.5 0 0 0 3-2.3 4.6 4.6 0 0 0-.6-5.4zm-6.8 9.5a3.4 3.4 0 0 1-2.2-.8l.1-.1 3.7-2.1a.6.6 0 0 0 .3-.5v-5.2l1.5.9a.1.1 0 0 1 0 .1v4.2a3.4 3.4 0 0 1-3.4 3.5zm-7.3-3.2a3.4 3.4 0 0 1-.4-2.3l.1.1 3.7 2.1a.6.6 0 0 0 .6 0l4.5-2.6v1.8a.1.1 0 0 1 0 .1L12.3 20a3.4 3.4 0 0 1-4.9-1.8zm-1-7.9A3.4 3.4 0 0 1 8.2 8l.1.1v4.3a.6.6 0 0 0 .3.5l4.5 2.6-1.6.9a.1.1 0 0 1-.1 0L7.6 14a3.4 3.4 0 0 1-1.2-3.7zm13.1 2.9L15 10.6l1.6-.9a.1.1 0 0 1 .1 0l3.8 2.2a3.4 3.4 0 0 1-.5 6.1v-4.4a.6.6 0 0 0-.4-.8zm1.6-2.3-.1-.1-3.7-2.2a.6.6 0 0 0-.6 0l-4.5 2.6V9.4a.1.1 0 0 1 0-.1L15.7 7a3.4 3.4 0 0 1 5 3.9zm-9.8 3.2-1.5-.9a.1.1 0 0 1 0-.1V9a3.4 3.4 0 0 1 5.6-2.6l-.1.1-3.7 2.1a.6.6 0 0 0-.3.5v5.1zm.8-1.8 2-1.1 2 1.1v2.3l-2 1.1-2-1.1V13z" fill="#10A37F"/>
    </svg>
  )
}
function LogoGoogle() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="14" fill="rgba(66,133,244,0.12)" />
      <path d="M20.5 14.2c0-.5 0-1-.1-1.5H14v2.8h3.6a3.1 3.1 0 0 1-1.3 2v1.7h2.1c1.2-1.1 1.9-2.8 1.9-5h.2z" fill="#4285F4"/>
      <path d="M14 21a6.5 6.5 0 0 0 4.5-1.7l-2.2-1.7a4 4 0 0 1-6-2.1H8v1.8A6.8 6.8 0 0 0 14 21z" fill="#34A853"/>
      <path d="M10.3 15.5a4 4 0 0 1 0-2.5V11H8a6.8 6.8 0 0 0 0 6.1l2.3-1.6z" fill="#FBBC05"/>
      <path d="M14 10.1a3.7 3.7 0 0 1 2.6 1l2-2A6.5 6.5 0 0 0 8 11.2l2.3 1.8A4 4 0 0 1 14 10z" fill="#EA4335"/>
    </svg>
  )
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
      { icon: '⚡', label: 'ROI', value: 'Réduction de 60% du temps de synthèse documentaire' },
      { icon: '⏱', label: 'Gain de temps', value: '4h/jour économisées sur l\'analyse de rapports' },
      { icon: '🔒', label: 'Sécurité', value: 'Zéro données envoyées à des tiers — architecture souveraine' },
    ],
    compare: ['Meilleur pour l\'analyse de longs documents', 'Raisonnement structuré & nuancé', 'Idéal pour le juridique et la conformité'],
  },
  {
    id: 'chatgpt',
    logo: <LogoGPT />,
    name: 'ChatGPT',
    vendor: 'OpenAI',
    tagline: 'Polyvalence & Automatisation',
    accent: '#10A37F',
    accentLight: '#34D399',
    glow: 'rgba(16,163,127,0.22)',
    glowStrong: 'rgba(16,163,127,0.35)',
    gradient: 'linear-gradient(135deg, #10A37F, #34D399)',
    gradientCard: 'linear-gradient(135deg, rgba(16,163,127,0.08) 0%, rgba(0,0,0,0) 60%)',
    focus: 'Polyvalence créative, automatisation des flux de travail et génération visuelle intégrée.',
    modules: ['Création de GPTs personnalisés par métier', 'Advanced Data Analysis (Python)', 'Intégration DALL-E & génération d\'images'],
    benefits: [
      { icon: '⚡', label: 'ROI', value: 'Automatisation de workflows complets sans développeur' },
      { icon: '⏱', label: 'Gain de temps', value: 'GPTs métier déployés en moins d\'une heure' },
      { icon: '🔒', label: 'Sécurité', value: 'Mode Entreprise : données isolées, pas d\'entraînement modèle' },
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
      { icon: '⚡', label: 'ROI', value: 'Résumés de réunions Meet + actions automatisées' },
      { icon: '⏱', label: 'Gain de temps', value: 'Rapports Sheets générés en 3 minutes vs 2h' },
      { icon: '🔒', label: 'Sécurité', value: 'Données au sein de votre instance Google Workspace' },
    ],
    compare: ['Meilleur pour les équipes déjà sur G-Suite', 'Collaboration temps réel avec IA intégrée', 'Idéal pour les opérations et la data'],
  },
]

/* ─── Carte Écosystème ───────────────────────────────────────────── */
function EcoCard({ eco, i, compareMode, activeCompare, onToggleCompare }) {
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
        borderRadius: '24px',
        padding: '32px',
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
        gap: '24px',
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
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '16px',
            background: `linear-gradient(135deg, ${eco.accent}20, ${eco.accent}08)`,
            border: `1px solid ${eco.accent}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 16px ${eco.glow}`,
          }}>
            {eco.logo}
          </div>
          <div>
            <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
              {eco.vendor}
            </p>
            <p style={{ color: '#111827', fontWeight: 700, fontSize: '20px', margin: 0, letterSpacing: '-0.02em' }}>
              {eco.name}
            </p>
          </div>
        </div>
        <div style={{
          padding: '4px 12px', borderRadius: '999px',
          background: `${eco.accent}18`,
          border: `1px solid ${eco.accent}35`,
          color: eco.accentLight,
          fontSize: '11px', fontWeight: 600, letterSpacing: '0.04em',
          whiteSpace: 'nowrap',
        }}>
          {eco.tagline}
        </div>
      </div>

      {/* Focus */}
      <p style={{ color: 'rgba(0,0,0,0.5)', fontSize: '14px', lineHeight: 1.7, margin: 0, position: 'relative', zIndex: 1 }}>
        {eco.focus}
      </p>

      {/* Modules */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ color: 'rgba(0,0,0,0.35)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
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
        <p style={{ color: 'rgba(0,0,0,0.35)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2px' }}>
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
              <span style={{ color: 'rgba(0,0,0,0.55)', fontSize: '12.5px', lineHeight: 1.5 }}>{b.value}</span>
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
            {isSelected ? '✓ Sélectionné' : 'Comparer'}
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
          color: 'rgba(0,0,0,0.35)', fontSize: '14px',
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
            <th style={{ padding: '14px 16px', textAlign: 'left', color: 'rgba(0,0,0,0.35)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', borderBottom: '1px solid rgba(0,0,0,0.10)' }}>
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
              <td style={{ padding: '14px 16px', color: 'rgba(0,0,0,0.4)', fontSize: '12px', fontWeight: 500, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
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
    title: 'Formation aux Environnements IA — Claude, ChatGPT, Gemini',
    description: 'Maîtrisez Claude, ChatGPT et Google Gemini avec des formations expert adaptées à votre infrastructure. Smart Optimisation.',
    path: '/formation/environnements',
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
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: isMobile ? '72px 24px 64px' : '100px 48px 80px' }}>
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
            <span style={{ color: 'rgba(0,0,0,0.5)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em' }}>Formation aux Environnements IA</span>
          </motion.div>

          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } }}
            style={{ color: '#111827', fontWeight: 800, fontSize: isMobile ? '2.2rem' : 'clamp(2.8rem, 5vw, 4rem)', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '8px' }}
          >
            Dominez vos environnements
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.18 } }}
            style={{ fontWeight: 800, fontSize: isMobile ? '2.2rem' : 'clamp(2.8rem, 5vw, 4rem)', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '28px' }}
          >
            <motion.span
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundImage: 'linear-gradient(135deg,#3B4FD8,#D97706,#10A37F,#4285F4,#3B4FD8)', backgroundSize: '300%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              de travail IA.
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.28 } }}
            style={{ color: 'rgba(0,0,0,0.5)', fontSize: isMobile ? '15px' : '17px', lineHeight: 1.75, maxWidth: '620px', margin: '0 auto 48px' }}
          >
            Nous ne formons pas à des outils — nous bâtissons des flux de travail. Choisissez l'écosystème adapté à votre infrastructure et montez en puissance en 2 jours.
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
                <span style={{ color: 'rgba(0,0,0,0.45)', fontSize: '12px', fontWeight: 600 }}>{eco.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Switch Comparaison ────────────────────────────────────── */}
      <section style={{ padding: isMobile ? '0 24px 32px' : '0 48px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
          <span style={{ color: 'rgba(0,0,0,0.4)', fontSize: '13px', fontWeight: 500 }}>
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
                <p style={{ color: 'rgba(0,0,0,0.35)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
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
            <p style={{ color: 'rgba(0,0,0,0.35)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
              Notre approche pédagogique
            </p>
            <h2 style={{ color: '#111827', fontWeight: 800, fontSize: isMobile ? '1.8rem' : 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.2, letterSpacing: '-0.025em', marginBottom: '20px' }}>
              Pas de PowerPoint. Que du terrain.
            </h2>
            <p style={{ color: 'rgba(0,0,0,0.45)', fontSize: '16px', lineHeight: 1.8, maxWidth: '640px', margin: '0 auto 48px' }}>
              Chaque formation est construite autour de vos cas d'usage réels. Vous repartez avec des workflows opérationnels déployables le lendemain matin.
            </p>

            <div style={{ display: 'flex', gap: isMobile ? '16px' : '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {[
                { icon: '🎯', label: '100% sur-mesure', sub: 'Adapté à votre stack' },
                { icon: '⚡', label: '2 jours intensifs', sub: 'ROI dès J+1' },
                { icon: '🔄', label: 'Suivi 30 jours', sub: 'Post-formation inclus' },
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
                  <div style={{ fontSize: '28px', marginBottom: '10px' }}>{item.icon}</div>
                  <p style={{ color: '#111827', fontWeight: 700, fontSize: '15px', margin: '0 0 4px' }}>{item.label}</p>
                  <p style={{ color: 'rgba(0,0,0,0.35)', fontSize: '12px', margin: 0 }}>{item.sub}</p>
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
            <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Prêt à passer à l'action ?
            </p>
            <h3 style={{ color: '#111827', fontWeight: 800, fontSize: isMobile ? '1.6rem' : '2.2rem', lineHeight: 1.2, letterSpacing: '-0.025em', marginBottom: '16px' }}>
              Planifier une formation<br />dans mon entreprise
            </h3>
            <p style={{ color: 'rgba(0,0,0,0.4)', fontSize: '15px', lineHeight: 1.7, marginBottom: '36px' }}>
              Diagnostic gratuit de 30 minutes. Nous identifions votre environnement cible et construisons le programme adapté à votre équipe.
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

    </div>
  )
}
