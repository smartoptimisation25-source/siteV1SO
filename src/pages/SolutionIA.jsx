import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { useSEO } from '../hooks/useSEO'
import useIsMobile from '../hooks/useIsMobile'
import Breadcrumb from '../components/Breadcrumb'

/* ─── Icônes ────────────────────────────────────────────────────── */
const Ico = ({ d, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)
const IconCheck = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

/* ─── Domaines d'intervention ───────────────────────────────────── */
const DOMAINS = [
  {
    icon: <Ico d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />,
    label: 'SaaS IA',
    title: 'Plateformes SaaS intégrant des LLMs',
    desc: 'Conception et développement de produits IA complets — de l\'interface utilisateur jusqu\'aux API — pour vos clients internes ou externes.',
    accent: '#3B4FD8',
    gradient: 'linear-gradient(135deg, #3B4FD8, #6366F1)',
    tools: ['OpenAI API', 'LangChain', 'Next.js', 'Supabase'],
    deliverables: ['Chatbot métier sur vos données', 'Moteur de recommandation', 'Plateforme d\'analyse documentaire'],
  },
  {
    icon: <Ico d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
    label: 'Automatisations',
    title: 'Workflows intelligents sans friction',
    desc: 'Connexion de vos outils existants (CRM, ERP, email) avec l\'IA pour éliminer les tâches répétitives à faible valeur ajoutée.',
    accent: '#9B30E8',
    gradient: 'linear-gradient(135deg, #9B30E8, #C084FC)',
    tools: ['Make', 'n8n', 'Zapier', 'REST APIs'],
    deliverables: ['Traitement automatique des emails', 'Synchronisation CRM-IA en temps réel', 'Alertes et rapports intelligents'],
  },
  {
    icon: <Ico d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h3M19 12h3M12 2v3M12 19v3" />,
    label: 'Agents IA',
    title: 'Agents autonomes opérationnels 24/7',
    desc: 'Déploiement d\'agents IA capables de gérer le support client, qualifier des leads ou analyser des données en toute autonomie.',
    accent: '#059669',
    gradient: 'linear-gradient(135deg, #059669, #34D399)',
    tools: ['LangGraph', 'AutoGen', 'RAG', 'Vector DB'],
    deliverables: ['Agent support multi-canal', 'Agent commercial & qualification', 'Agent analyst data en langage naturel'],
  },
  {
    icon: <Ico d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2zM7 7h.01" />,
    label: 'Architecture & Scale',
    title: 'Infrastructure robuste et sécurisée',
    desc: 'Des architectures cloud pensées pour durer — sécurisées, conformes RGPD, monitorées et prêtes à absorber votre croissance.',
    accent: '#D97706',
    gradient: 'linear-gradient(135deg, #D97706, #FBBF24)',
    tools: ['AWS / GCP', 'Docker', 'Pinecone', 'Monitoring'],
    deliverables: ['Architecture microservices IA', 'Pipeline MLOps automatisé', 'Audit sécurité & conformité RGPD'],
  },
]

/* ─── Icônes workflow (SVG complets) ────────────────────────────── */
const IcoEcoute = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
)
const IcoCadrage = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
  </svg>
)
const IcoConstruction = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
)
const IcoDeploiement = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/>
  </svg>
)

/* ─── Étapes du workflow ────────────────────────────────────────── */
const STEPS = [
  { num: '01', label: 'Écoute', desc: 'Audit de vos processus, identification des opportunités IA à fort ROI.', icon: <IcoEcoute /> },
  { num: '02', label: 'Cadrage', desc: 'Architecture technique, choix des LLMs, définition du MVP et du budget.', icon: <IcoCadrage /> },
  { num: '03', label: 'Construction', desc: 'Développement itératif avec démos hebdomadaires et ajustements continus.', icon: <IcoConstruction /> },
  { num: '04', label: 'Déploiement', desc: 'Mise en production, formation des équipes, monitoring et évolution continue.', icon: <IcoDeploiement /> },
]

/* ─── Domain Card avec hover-reveal ────────────────────────────── */
function DomainCard({ card, i }) {
  const isMobile = useIsMobile()
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 260, damping: 28 })
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 260, damping: 28 })

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
        background: '#FAFBFF',
        border: `1px solid ${card.accent}18`,
        height: isMobile ? 'auto' : '360px', minHeight: isMobile ? '280px' : undefined, cursor: 'default',
        rotateX: rotX, rotateY: rotY,
        zIndex: hovered ? 10 : 1,
      }}
      whileHover={{
        boxShadow: `0 0 0 1.5px ${card.accent}50, 0 20px 52px ${card.accent}18`,
        transition: { duration: 0.22 },
      }}
    >
      {/* Dot grid décoratif */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4,
        backgroundImage: `radial-gradient(${card.accent}20 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
      }} />

      {/* Orbe coin */}
      <div style={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', background: `radial-gradient(circle, ${card.accent}12 0%, transparent 70%)`, pointerEvents: 'none' }} />

      {/* Contenu */}
      <div style={{ padding: '28px', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        <motion.div
          whileHover={{ rotate: [0, -6, 6, -3, 3, 0], scale: 1.08, transition: { duration: 0.4 } }}
          style={{ width: 48, height: 48, borderRadius: '14px', background: card.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '14px', boxShadow: `0 6px 20px ${card.accent}35`, flexShrink: 0 }}
        >
          {card.icon}
        </motion.div>

        <div style={{ display: 'inline-block', padding: '2px 9px', borderRadius: '999px', background: `${card.accent}10`, border: `1px solid ${card.accent}22`, marginBottom: '10px', width: 'fit-content' }}>
          <span style={{ color: card.accent, fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: "'Courier New', monospace" }}>{card.label}</span>
        </div>

        <h3 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '15.5px', lineHeight: 1.35, marginBottom: '8px' }}>{card.title}</h3>
        <p style={{ color: '#374151', fontSize: '13px', lineHeight: 1.7, flex: 1 }}>{card.desc}</p>

        {/* Tech badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '14px' }}>
          {card.tools.map((t) => (
            <span key={t} style={{ padding: '2px 8px', borderRadius: '5px', fontSize: '11px', fontWeight: 600, color: card.accent, background: `${card.accent}0D`, border: `1px solid ${card.accent}20`, fontFamily: "'Courier New', monospace" }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Reveal panel */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.30, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', inset: 0, borderRadius: '20px', zIndex: 5,
              background: `linear-gradient(155deg, ${card.accent}F0 0%, ${card.accent}E0 100%)`,
              padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Courier New', monospace", marginBottom: '4px' }}>// livrables types</div>
              <div style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '999px', background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.28)', marginBottom: '18px' }}>
                <span style={{ color: '#fff', fontSize: '11px', fontWeight: 600 }}>Exemples de réalisations</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {card.deliverables.map((d) => (
                  <li key={d} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(255,255,255,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                      <IconCheck />
                    </span>
                    <span style={{ color: '#fff', fontSize: '13.5px', fontWeight: 500 }}>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '11.5px', fontWeight: 500, fontFamily: "'Courier New', monospace" }}>
              → adapté à votre contexte réel
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Workflow Timeline ─────────────────────────────────────────── */
function WorkflowSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useIsMobile()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginBottom: '80px' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: '#0F0C1E', letterSpacing: '-0.02em', marginBottom: '6px' }}>
          De l'idée au{' '}
          <span style={{ backgroundImage: 'linear-gradient(135deg,#3B4FD8,#9B30E8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            déploiement
          </span>
        </h2>
        <p style={{ color: '#374151', fontSize: '14px' }}>4 phases, une méthode éprouvée sur +20 projets.</p>
      </div>

      {isMobile ? (
        /* ── Timeline verticale (mobile) ── */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {STEPS.map((step, i) => (
            <div key={step.num} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              {/* Colonne gauche : node + ligne verticale */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.15, type: 'spring', stiffness: 200 }}
                  style={{
                    width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', boxShadow: '0 0 0 5px rgba(59,79,216,0.10), 0 4px 16px rgba(59,79,216,0.28)',
                  }}
                >
                  {step.icon}
                </motion.div>
                {i < STEPS.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                    style={{ width: '1px', flex: 1, minHeight: '32px', background: 'linear-gradient(180deg, #9B30E8, #3B4FD8)', transformOrigin: 'top', margin: '6px 0' }}
                  />
                )}
              </div>
              {/* Colonne droite : texte */}
              <motion.div
                initial={{ opacity: 0, x: 12 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                style={{ paddingBottom: i < STEPS.length - 1 ? '28px' : '0', paddingTop: '8px' }}
              >
                <div style={{ fontFamily: "'Courier New', monospace", fontSize: '11px', fontWeight: 700, color: '#3B4FD8', letterSpacing: '0.06em', marginBottom: '4px' }}>{step.num}</div>
                <div style={{ fontWeight: 700, fontSize: '15px', color: '#0F0C1E', marginBottom: '5px' }}>{step.label}</div>
                <div style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6 }}>{step.desc}</div>
              </motion.div>
            </div>
          ))}
        </div>
      ) : (
        /* ── Timeline horizontale (desktop) ── */
        <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: '0', paddingTop: '12px' }}>
          {STEPS.map((step, i) => (
            <div key={step.num} style={{ flex: 1, display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                  {i > 0 && (
                    <motion.div
                      initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + (i - 1) * 0.15 }}
                      style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #3B4FD8, #9B30E8)', transformOrigin: 'left' }}
                    />
                  )}
                  {i === 0 && <div style={{ flex: 1 }} />}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.15, type: 'spring', stiffness: 200 }}
                    style={{
                      width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                      background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', boxShadow: '0 0 0 6px rgba(59,79,216,0.10), 0 4px 20px rgba(59,79,216,0.30)',
                      position: 'relative', zIndex: 2,
                    }}
                  >
                    {step.icon}
                  </motion.div>
                  {i < STEPS.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                      style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #9B30E8, #3B4FD8)', transformOrigin: 'left' }}
                    />
                  )}
                  {i === STEPS.length - 1 && <div style={{ flex: 1 }} />}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                  style={{ textAlign: 'center', padding: '0 12px' }}
                >
                  <div style={{ fontFamily: "'Courier New', monospace", fontSize: '11px', fontWeight: 700, color: '#3B4FD8', letterSpacing: '0.06em', marginBottom: '4px' }}>{step.num}</div>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: '#0F0C1E', marginBottom: '6px' }}>{step.label}</div>
                  <div style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6 }}>{step.desc}</div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

/* ─── CTA Bloc ──────────────────────────────────────────────────── */
function CTABloc() {
  const isMobile = useIsMobile()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', background: '#fff', border: '1px solid rgba(59,79,216,0.10)', boxShadow: '0 8px 48px rgba(59,79,216,0.08)' }}
    >
      <div style={{ height: '4px', background: 'linear-gradient(90deg, #3B4FD8, #9B30E8, #E83B9B)', width: '100%' }} />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: -60, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,48,232,0.06) 0%, transparent 70%)', pointerEvents: 'none' }}
      />
      {/* Dot grid déco */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.25, backgroundImage: 'radial-gradient(rgba(59,79,216,0.15) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div style={{ position: 'relative', zIndex: 2, padding: isMobile ? '28px 20px' : '48px 56px', display: 'flex', justifyContent: 'space-between', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : 'center', flexWrap: 'wrap', gap: '28px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '999px', background: 'rgba(59,79,216,0.07)', border: '1px solid rgba(59,79,216,0.18)', marginBottom: '20px', width: 'fit-content', maxWidth: '100%', flexWrap: 'wrap' }}>
            <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', display: 'block', flexShrink: 0 }} />
            <span style={{ color: '#3B4FD8', fontSize: '12px', fontWeight: 700, letterSpacing: isMobile ? '0.01em' : '0.04em', textTransform: isMobile ? 'none' : 'uppercase' }}>
              {isMobile ? 'Étude de faisabilité offerte · 48h' : 'Étude de faisabilité offerte · Réponse sous 48h'}
            </span>
          </div>
          <h2 style={{ fontWeight: 800, fontSize: isMobile ? '1.6rem' : 'clamp(1.5rem, 2.8vw, 2.1rem)', color: '#0F0C1E', lineHeight: 1.2, letterSpacing: '-0.025em', marginBottom: '14px' }}>
            Votre projet mérite{' '}
            <motion.span
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundImage: 'linear-gradient(135deg,#3B4FD8,#9B30E8,#E83B9B,#3B4FD8)', backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline' }}
            >
              une vraie expertise.
            </motion.span>
          </h2>
          <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.75, maxWidth: isMobile ? 'none' : '440px' }}>
            Un expert technique analyse votre besoin, évalue la faisabilité et vous présente une architecture cible. <strong style={{ color: '#374151', fontWeight: 600 }}>Sans engagement.</strong>
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'stretch', minWidth: isMobile ? '0' : '240px' }}>
          <motion.a
            href="mailto:contact@smartoptimisation.fr?subject=Étude de faisabilité IA"
            whileHover={{ scale: 1.04, y: -2, boxShadow: '0 12px 32px rgba(155,48,232,0.35)', transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.97 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '15px 20px', borderRadius: '999px', fontWeight: 700, fontSize: '15px', color: '#fff', textDecoration: 'none', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', boxShadow: '0 4px 20px rgba(155,48,232,0.28)', whiteSpace: isMobile ? 'normal' : 'nowrap', textAlign: 'center' }}
          >
            Démarrer mon étude de faisabilité
            <IconArrow />
          </motion.a>
          <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.97 }}>
            <Link to="/educ-ia"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px 24px', borderRadius: '999px', fontWeight: 600, fontSize: '14px', color: '#3B4FD8', textDecoration: 'none', border: '1.5px solid rgba(59,79,216,0.25)', background: 'rgba(59,79,216,0.03)' }}
            >
              Découvrir Educ IA
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Page principale ───────────────────────────────────────────── */
const SOLUTION_IA_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      'name': 'Déploiement solution IA sur mesure — SaaS, Automatisation, Agents IA',
      'description': 'Conception et déploiement de solutions IA sur mesure : SaaS IA intégrant des LLMs, automatisation processus métier IA (Make, n8n), agents autonomes 24/7, architecture scalable conforme EU AI Act et RGPD. +20 projets livrés.',
      'url': 'https://smartoptimisation.fr/solution-ia',
      'provider': { '@id': 'https://smartoptimisation.fr/#organization' },
      'serviceType': 'Développement solution IA sur mesure',
      'areaServed': { '@type': 'Country', 'name': 'France' },
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'Solutions IA sur mesure',
        'itemListElement': [
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'SaaS IA — Plateformes intégrant des LLMs (OpenAI, Claude)' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Automatisation processus métier IA — Make, n8n, Zapier' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Agents IA autonomes 24/7 — LangGraph, AutoGen, RAG' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Architecture IA scalable — Conformité EU AI Act & RGPD' } },
        ],
      },
      'additionalProperty': [
        { '@type': 'PropertyValue', 'name': 'Projets livrés', 'value': '+20' },
        { '@type': 'PropertyValue', 'name': 'Conformité', 'value': 'EU AI Act & RGPD' },
        { '@type': 'PropertyValue', 'name': 'Étude de faisabilité', 'value': 'Offerte sous 48h' },
      ],
      'about': [
        { '@type': 'Thing', 'name': 'Solution IA sur mesure' },
        { '@type': 'Thing', 'name': 'Automatisation processus métier' },
        { '@type': 'Thing', 'name': 'Agents IA autonomes' },
      ],
      'mentions': [
        { '@type': 'Thing', 'name': 'EU AI Act' },
        { '@type': 'Thing', 'name': 'RGPD' },
        { '@type': 'Thing', 'name': 'LangChain' },
        { '@type': 'Thing', 'name': 'SaaS IA' },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://smartoptimisation.fr/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Solution IA sur mesure' },
      ],
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Combien coûte une solution IA sur mesure ?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Chaque projet est unique. Smart Optimisation propose une étude de faisabilité gratuite sous 48h pour évaluer vos besoins et vous présenter un devis transparent. Les projets démarrent généralement à partir de quelques milliers d\'euros.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Combien de temps prend le déploiement d\'une solution IA ?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Un premier prototype fonctionnel est livré en 2 à 4 semaines. Le déploiement complet prend de 1 à 3 mois selon la complexité, avec un suivi et des itérations continues.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Vos solutions IA sont-elles conformes au RGPD et à l\'EU AI Act ?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Oui. Toutes nos solutions intègrent la conformité RGPD et EU AI Act dès la conception (privacy by design). Nous auditons les risques, documentons les traitements et garantissons la traçabilité des décisions IA.',
          },
        },
      ],
    },
  ],
}

export default function SolutionIA() {
  useSEO({
    title: 'Solution IA sur mesure pour PME — Agents & Automatisation',
    description: 'Solutions IA sur mesure : SaaS IA, automatisation processus métier, agents autonomes 24/7. Conformité EU AI Act & RGPD. +20 projets livrés en Alsace. Étude de faisabilité offerte.',
    path: '/solution-ia',
    jsonLd: SOLUTION_IA_SCHEMA,
    keywords: 'solution IA sur mesure, automatisation IA, agents IA, SaaS IA, déploiement IA entreprise, EU AI Act, RGPD IA, LangChain',
  })
  const isMobile = useIsMobile()
  return (
    <main style={{ background: '#fff', minHeight: 'calc(100vh - 72px)', position: 'relative', overflow: 'hidden' }}>

      {/* Dot grid global hero */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '520px', pointerEvents: 'none', opacity: 0.35,
        backgroundImage: 'radial-gradient(rgba(59,79,216,0.12) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 100%)',
      }} />

      {/* Blobs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], x: [0, 18, 0], y: [0, -18, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: -140, left: -100, width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,79,216,0.08) 0%, transparent 68%)', pointerEvents: 'none' }}
      />
      <motion.div
        animate={{ scale: [1, 1.12, 1], x: [0, -12, 0], y: [0, 22, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{ position: 'absolute', top: '25%', right: -80, width: 440, height: 440, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,48,232,0.07) 0%, transparent 68%)', pointerEvents: 'none' }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '8px 20px 60px' : '8px 48px 100px', position: 'relative', zIndex: 2 }}>

        {/* ── Fil d'Ariane ── */}
        <Breadcrumb items={[
          { label: 'Accueil', to: '/' },
          { label: 'Solution IA sur mesure' },
        ]} />

        {/* ══ HERO ══ */}
        <div style={{ maxWidth: '820px', marginBottom: isMobile ? '40px' : '72px' }}>

          {/* Badge "+20" prominent */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'rgba(59,79,216,0.07)', border: '1px solid rgba(59,79,216,0.18)' }}>
              <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', flexShrink: 0, display: 'block' }} />
              <span style={{ color: '#3B4FD8', fontSize: '13px', fontWeight: 600 }}>Solution IA sur mesure</span>
            </div>
            {/* Badge +20 */}
            <motion.div
              animate={{ boxShadow: ['0 0 0 0 rgba(59,79,216,0.2)', '0 0 0 8px rgba(59,79,216,0)', '0 0 0 0 rgba(59,79,216,0)'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '999px', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', cursor: 'default' }}
            >
              <span style={{ color: '#fff', fontSize: '13px', fontWeight: 700 }}>+20 projets livrés</span>
            </motion.div>
          </motion.div>

          {/* H1 */}
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.10 }}
            style={{ fontWeight: 800, fontSize: isMobile ? '1.8rem' : 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: 1.12, letterSpacing: '-0.025em', color: '#0F0C1E', marginBottom: '20px' }}>
            De l'idée au déploiement :{' '}
            <motion.span
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundImage: 'linear-gradient(135deg,#3B4FD8,#9B30E8,#E83B9B,#3B4FD8)', backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              nous bâtissons vos solutions IA.
            </motion.span>
          </motion.h1>

          {/* Sous-titre */}
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }}
            style={{ color: '#374151', fontSize: isMobile ? '15px' : '18px', lineHeight: 1.7, marginBottom: '10px', fontWeight: 400 }}>
            Déjà +20 entreprises nous ont fait confiance pour transformer leur vision en réalité.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24 }}
            style={{ color: '#374151', fontSize: '16px', lineHeight: 1.8, marginBottom: '32px' }}>
            Nous ne nous contentons pas de conseiller : nous <strong style={{ color: '#0F0C1E', fontWeight: 600 }}>concevons, développons et déployons</strong> des outils IA scalables qui génèrent de la valeur immédiate.
          </motion.p>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.30 }}
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {[
              { val: '+20', label: 'Projets IA livrés' },
              { val: '4', label: 'Domaines d\'expertise' },
              { val: '100%', label: 'Scalable & maintenable' },
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

        {/* ══ DOMAINES TITRE ══ */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.4rem, 2.6vw, 1.9rem)', color: '#0F0C1E', letterSpacing: '-0.02em', marginBottom: '8px' }}>
            4 expertises, des livrables concrets
          </h2>
          <p style={{ color: '#374151', fontSize: '14px', maxWidth: '480px', margin: '0 auto' }}>
            Survolez chaque domaine pour voir des exemples de réalisations.
          </p>
        </div>

        {/* ══ GRID DOMAINES ══ */}
        <div className="sr-up" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '80px' }}>
          {DOMAINS.map((card, i) => <DomainCard key={i} card={card} i={i} />)}
        </div>

        {/* Séparateur */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #3B4FD8, #9B30E8, transparent)', marginBottom: '64px', borderRadius: '1px' }} />

        {/* ══ WORKFLOW ══ */}
        <WorkflowSection />

        {/* ══ CTA ══ */}
        <CTABloc />

        {/* Maillage interne */}
        <section style={{ background: '#F9F8FF', padding: isMobile ? '20px' : '28px 32px', borderRadius: '20px', marginTop: '32px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '14px', marginBottom: '12px', textAlign: 'center' }}>
              Découvrez nos autres formations IA
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link to="/formation/sur-mesure" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: '#fff', borderRadius: '12px', border: '1px solid rgba(59,79,216,0.08)', textDecoration: 'none', color: '#0F0C1E', fontSize: '13px', fontWeight: 500 }}>
                <span>Formation IA sur mesure</span>
                <span style={{ color: '#3B4FD8', fontSize: '12px' }}>En savoir plus →</span>
              </Link>
              <Link to="/formation/opco" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: '#fff', borderRadius: '12px', border: '1px solid rgba(59,79,216,0.08)', textDecoration: 'none', color: '#0F0C1E', fontSize: '13px', fontWeight: 500 }}>
                <span>Formation OPCO</span>
                <span style={{ color: '#3B4FD8', fontSize: '12px' }}>En savoir plus →</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
