import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion'
import { useSEO } from '../hooks/useSEO'
import useIsMobile from '../hooks/useIsMobile'
import Breadcrumb from '../components/Breadcrumb'

/* ── Couleurs ── */
const C = {
  bg:      '#08061A',
  bgCard:  '#0F0C2A',
  bgCard2: '#13103A',
  border:  'rgba(99,102,241,0.18)',
  blue:    '#3B4FD8',
  violet:  '#9B30E8',
  rose:    '#E83B9B',
  text:    '#E2E0FF',
  muted:   '#7B78A8',
}

/* ── Données ── */
const BENEFITS = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: 'Attirer plus de clients',
    desc: 'Ciblez les bons prospects avec des messages percutants générés et optimisés par l\'IA.',
    accent: '#3B4FD8',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
    title: 'Créer du contenu 10× plus vite',
    desc: 'Posts, emails, pages de vente, scripts vidéo — produits en minutes avec les bons prompts.',
    accent: '#9B30E8',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
    title: 'Automatiser son marketing',
    desc: 'Mettez en place des séquences, des funnels et des campagnes qui tournent en autonomie.',
    accent: '#E83B9B',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    title: 'Optimiser ses résultats',
    desc: 'Analysez vos performances, identifiez ce qui fonctionne et doublez votre ROI marketing.',
    accent: '#0891B2',
  },
]

const MODULES = [
  {
    num: '01',
    title: 'Stratégie marketing avec l\'IA',
    desc: 'Définissez votre positionnement, vos personas et votre plan d\'action marketing avec l\'aide de l\'IA. Gagnez des semaines de réflexion stratégique.',
    tags: ['Positionnement', 'Persona', 'Plan marketing'],
    accent: '#3B4FD8',
  },
  {
    num: '02',
    title: 'Création de contenu assistée par IA',
    desc: 'Maîtrisez les prompts pour créer des articles, posts LinkedIn, emails et scripts vidéo qui convertissent — sans blocage de la page blanche.',
    tags: ['Copywriting', 'SEO', 'Social Media'],
    accent: '#9B30E8',
  },
  {
    num: '03',
    title: 'Automatisation des campagnes',
    desc: 'Construisez des séquences email, des workflows et des funnels automatisés qui génèrent des leads pendant que vous dormez.',
    tags: ['Email', 'Funnel', 'Workflow'],
    accent: '#E83B9B',
  },
  {
    num: '04',
    title: 'Acquisition client',
    desc: 'Déployez des stratégies d\'acquisition payante et organique optimisées par l\'IA. Ads, SEO, Social — tout ce qu\'il faut pour remplir votre pipeline.',
    tags: ['Ads', 'SEO', 'Lead Gen'],
    accent: '#059669',
  },
  {
    num: '05',
    title: 'Analyse des performances',
    desc: 'Apprenez à lire vos données et à utiliser l\'IA pour identifier les leviers de croissance que vous ratez. Prenez des décisions basées sur les faits.',
    tags: ['Analytics', 'KPIs', 'Reporting'],
    accent: '#D97706',
  },
  {
    num: '06',
    title: 'Optimisation continue',
    desc: 'Mettez en place une boucle d\'amélioration permanente. Tests A/B, itérations, veille concurrentielle IA — votre marketing progresse chaque semaine.',
    tags: ['A/B Test', 'Itération', 'Croissance'],
    accent: '#0891B2',
  },
]

const PROFILES = [
  { icon: '🚀', label: 'Auto-entrepreneurs', desc: 'Qui veulent scaler sans embaucher' },
  { icon: '🏢', label: 'Dirigeants TPE/PME', desc: 'Qui veulent digitaliser leur marketing' },
  { icon: '💼', label: 'Freelances & indépendants', desc: 'Qui veulent attirer plus de clients' },
  { icon: '⚙️', label: 'Créateurs SaaS', desc: 'Qui veulent automatiser leur acquisition' },
  { icon: '🎯', label: 'Consultants', desc: 'Qui veulent renforcer leur personal branding' },
  { icon: '🛠️', label: 'Développeurs produit', desc: 'Qui veulent maîtriser le go-to-market IA' },
]

const PROBLEMS = [
  'Vous passez des heures à créer du contenu sans résultats mesurables',
  'Vous ne savez pas quoi publier, ni quand, ni sur quel canal',
  'Votre pipeline client est irrégulier et imprévisible',
  'Vous faites du marketing "à l\'instinct" sans données claires',
  'Vous voyez vos concurrents progresser mais ne savez pas comment ils font',
]

const BEFORE_AFTER = [
  { before: 'Marketing manuel, chronophage', after: 'Système automatisé qui tourne seul' },
  { before: 'Contenu laborieux, page blanche', after: 'Contenu produit en minutes avec l\'IA' },
  { before: 'Pipeline client irrégulier', after: 'Acquisition prévisible et scalable' },
  { before: 'Décisions prises à l\'instinct', after: 'Stratégie pilotée par les données' },
  { before: 'Résultats peu mesurables', after: 'ROI clair et optimisé en continu' },
]

/* ── SEO JSON-LD ── */
const PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Course',
      name: 'Formation Marketing IA — Smart Optimisation',
      description: 'Apprenez à lancer et automatiser vos campagnes marketing avec l\'IA. Formation pratique pour auto-entrepreneurs, freelances et dirigeants.',
      provider: { '@type': 'Organization', name: 'Smart Optimisation', url: 'https://smartoptimisation.fr' },
      url: 'https://smartoptimisation.fr/formation/marketing-ia',
      inLanguage: 'fr-FR',
      educationalLevel: 'Tous niveaux',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://smartoptimisation.fr/' },
        { '@type': 'ListItem', position: 2, name: 'Formation', item: 'https://smartoptimisation.fr/formation/cpf' },
        { '@type': 'ListItem', position: 3, name: 'Formation Marketing IA' },
      ],
    },
  ],
}

/* ── Composant carte module ── */
function ModuleCard({ mod, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.5, delay: (i % 2) * 0.1, ease: [0.4, 0, 0.2, 1] }}
      style={{
        background: C.bgCard,
        border: `1px solid ${C.border}`,
        borderRadius: '20px',
        padding: '28px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${mod.accent}, transparent)` }} />
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <span style={{
          fontSize: '36px', fontWeight: 900, lineHeight: 1,
          background: `linear-gradient(135deg, ${mod.accent}60, transparent)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          flexShrink: 0, userSelect: 'none',
        }}>{mod.num}</span>
        <div>
          <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '16px', margin: '0 0 8px', lineHeight: 1.3 }}>{mod.title}</h3>
          <p style={{ color: C.muted, fontSize: '13.5px', lineHeight: 1.65, margin: '0 0 14px' }}>{mod.desc}</p>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {mod.tags.map(t => (
              <span key={t} style={{ padding: '3px 10px', borderRadius: '999px', background: `${mod.accent}18`, border: `1px solid ${mod.accent}30`, color: mod.accent, fontSize: '11px', fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Composant carte bénéfice ── */
function BenefitCard({ b, i }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 })
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 })
  const ref = useRef(null)
  function onMouseMove(e) {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { mx.set(0); my.set(0) }}
      whileHover={{ borderColor: `${b.accent}50`, boxShadow: `0 20px 60px ${b.accent}20` }}
      style={{
        background: C.bgCard, border: `1px solid ${C.border}`,
        borderRadius: '20px', padding: '28px 24px',
        rotateX: rotX, rotateY: rotY,
        transformStyle: 'preserve-3d', transformPerspective: 800,
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${b.accent}, transparent)` }} />
      <div style={{ width: 48, height: 48, borderRadius: '14px', background: `${b.accent}20`, border: `1px solid ${b.accent}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: b.accent, marginBottom: '18px' }}>
        {b.icon}
      </div>
      <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '16px', margin: '0 0 10px' }}>{b.title}</h3>
      <p style={{ color: C.muted, fontSize: '13.5px', lineHeight: 1.65, margin: 0 }}>{b.desc}</p>
    </motion.div>
  )
}

/* ── Page principale ── */
export default function FormationMarketingIA() {
  useSEO({
    title: 'Formation Marketing IA — Automatisez votre croissance | Smart Optimisation',
    description: 'Apprenez à lancer vos campagnes marketing, automatiser votre acquisition client et développer votre business avec l\'IA. Formation pratique pour auto-entrepreneurs, freelances et dirigeants.',
    path: '/formation/marketing-ia',
    jsonLd: PAGE_SCHEMA,
    keywords: 'formation marketing IA, marketing intelligence artificielle, automatisation marketing, contenu IA, acquisition client IA, formation marketing digitale',
  })
  const isMobile = useIsMobile()

  return (
    <main style={{ background: C.bg, minHeight: 'calc(100vh - 72px)', color: C.text, overflow: 'hidden' }}>

      {/* ── Blobs décoratifs ── */}
      <motion.div animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'fixed', top: -200, right: -200, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,79,216,0.12) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
      <motion.div animate={{ scale: [1, 1.15, 1], y: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{ position: 'fixed', bottom: -200, left: -150, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,48,232,0.10) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Breadcrumb ── */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '8px 20px 0' : '8px 48px 0' }}>
          <Breadcrumb
            items={[{ label: 'Accueil', to: '/' }, { label: 'Formation', to: '/formation/cpf' }, { label: 'Marketing IA' }]}
            dark
          />
        </div>

        {/* ══════════════════════════════════════════
            1. HERO
        ══════════════════════════════════════════ */}
        <section style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '40px 20px 64px' : '64px 48px 80px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '48px', alignItems: 'center' }}>

          {/* Colonne texte */}
          <div>
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', border: '1px solid rgba(155,48,232,0.35)', background: 'rgba(155,48,232,0.12)', marginBottom: '28px' }}>
              <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', flexShrink: 0, display: 'block' }} />
              <span style={{ color: '#A78BFA', fontSize: '13px', fontWeight: 600, letterSpacing: '0.02em' }}>Nouvelle formation disponible</span>
            </motion.div>

            {/* H1 */}
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}
              style={{ fontWeight: 900, fontSize: isMobile ? '2.2rem' : 'clamp(2.4rem, 4.5vw, 3.8rem)', lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 20px', color: '#fff' }}>
              Formation{' '}
              <motion.span
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundImage: 'linear-gradient(135deg,#3B4FD8,#9B30E8,#E83B9B,#3B4FD8)', backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                Marketing IA
              </motion.span>
            </motion.h1>

            {/* Sous-titre */}
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
              style={{ color: C.muted, fontSize: isMobile ? '15px' : '17px', lineHeight: 1.7, margin: '0 0 36px', maxWidth: '480px' }}>
              Lancez vos campagnes marketing, automatisez votre croissance et développez votre business grâce à l'intelligence artificielle.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.22 }}
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link to="/contact" style={{
                  display: 'block', padding: '14px 32px', borderRadius: '999px', fontWeight: 700, fontSize: '15px',
                  background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', color: '#fff', textDecoration: 'none',
                  boxShadow: '0 4px 24px rgba(155,48,232,0.40)',
                }}>
                  Découvrir la formation
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <a href="#programme" style={{
                  display: 'block', padding: '14px 32px', borderRadius: '999px', fontWeight: 600, fontSize: '15px',
                  color: '#A78BFA', textDecoration: 'none',
                  border: '1.5px solid rgba(155,48,232,0.35)',
                }}>
                  Voir le programme
                </a>
              </motion.div>
            </motion.div>

            {/* Stat pills */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
              style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '32px' }}>
              {[
                { val: '6 modules', label: 'complets' },
                { val: '100% pratique', label: 'cas réels' },
                { val: 'Financement', label: 'OPCO possible' },
              ].map(s => (
                <div key={s.val} style={{ padding: '8px 16px', borderRadius: '12px', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.18)' }}>
                  <span style={{ color: '#fff', fontWeight: 700, fontSize: '13px' }}>{s.val} </span>
                  <span style={{ color: C.muted, fontSize: '12px' }}>{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Colonne visuelle */}
          {!isMobile && (
            <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '380px' }}>
              {/* Carte visuelle décorative */}
              <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '100%', maxWidth: '420px', background: C.bgCard2, borderRadius: '24px', border: `1px solid ${C.border}`, padding: '32px', boxShadow: '0 24px 80px rgba(99,102,241,0.20)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }} />
                  <span style={{ color: C.muted, fontSize: '11px', marginLeft: '8px' }}>campaign-ai.dashboard</span>
                </div>
                {[
                  { label: 'Taux de conversion', val: '+340%', color: '#10B981' },
                  { label: 'Contenu généré', val: '12× plus vite', color: '#9B30E8' },
                  { label: 'Coût acquisition', val: '−62%', color: '#3B4FD8' },
                  { label: 'Leads qualifiés', val: '+218/mois', color: '#E83B9B' },
                ].map((row, i) => (
                  <motion.div key={row.label}
                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.12 }}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < 3 ? `1px solid ${C.border}` : 'none' }}>
                    <span style={{ color: C.muted, fontSize: '13px' }}>{row.label}</span>
                    <span style={{ color: row.color, fontWeight: 800, fontSize: '14px' }}>{row.val}</span>
                  </motion.div>
                ))}
              </motion.div>
              {/* Glow */}
              <div style={{ position: 'absolute', inset: -40, background: 'radial-gradient(circle at center, rgba(99,102,241,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
            </motion.div>
          )}
        </section>

        {/* ══════════════════════════════════════════
            2. PROBLÈME
        ══════════════════════════════════════════ */}
        <section style={{ borderTop: `1px solid ${C.border}`, padding: isMobile ? '56px 20px' : '80px 48px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5 }} style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span style={{ color: C.muted, fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>Le problème</span>
              <h2 style={{ color: '#fff', fontWeight: 800, fontSize: isMobile ? '1.8rem' : 'clamp(1.8rem, 3vw, 2.6rem)', lineHeight: 1.2, letterSpacing: '-0.025em', margin: '0 0 16px' }}>
                Vous passez du temps sur votre marketing{' '}
                <span style={{ color: '#E83B9B' }}>sans voir les résultats.</span>
              </h2>
              <p style={{ color: C.muted, fontSize: '15px', lineHeight: 1.7, maxWidth: '540px', margin: '0 auto' }}>
                La plupart des entrepreneurs font du marketing "à l'intuition". Résultat : beaucoup d'énergie dépensée, peu de croissance mesurable.
              </p>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {PROBLEMS.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 22px', background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: '14px' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(232,59,155,0.12)', border: '1px solid rgba(232,59,155,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E83B9B" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </div>
                  <span style={{ color: C.text, fontSize: '14px', lineHeight: 1.5 }}>{p}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            3. SOLUTION
        ══════════════════════════════════════════ */}
        <section style={{ padding: isMobile ? '56px 20px' : '80px 48px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '48px', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <span style={{ color: C.muted, fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>La solution</span>
              <h2 style={{ color: '#fff', fontWeight: 800, fontSize: isMobile ? '1.8rem' : 'clamp(1.8rem, 3vw, 2.5rem)', lineHeight: 1.2, letterSpacing: '-0.025em', margin: '0 0 20px' }}>
                Un système marketing{' '}
                <motion.span animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  style={{ backgroundImage: 'linear-gradient(135deg,#3B4FD8,#9B30E8,#E83B9B,#3B4FD8)', backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  intelligent et automatisé.
                </motion.span>
              </h2>
              <p style={{ color: C.muted, fontSize: '15px', lineHeight: 1.75, margin: '0 0 24px' }}>
                La formation Marketing IA vous donne une méthode étape par étape pour construire un système marketing qui travaille à votre place — stratégie, contenu, automatisation, acquisition et analyse réunis dans un seul parcours concret.
              </p>
              <p style={{ color: C.muted, fontSize: '15px', lineHeight: 1.75, margin: 0 }}>
                Pas de théorie inutile. Chaque module débouche sur une action que vous implémentez directement dans votre business.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div style={{ background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: '20px', padding: '28px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #3B4FD8, #9B30E8, #E83B9B)' }} />
                {[
                  { icon: '🧠', text: 'IA comme levier de croissance, pas comme gadget' },
                  { icon: '⚡', text: 'Implémentation immédiate dans votre activité' },
                  { icon: '📈', text: 'Résultats mesurables dès les premières semaines' },
                  { icon: '🔄', text: 'Système évolutif qui s\'améliore avec le temps' },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.1 }}
                    style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '14px 0', borderBottom: i < 3 ? `1px solid ${C.border}` : 'none' }}>
                    <span style={{ fontSize: '18px', flexShrink: 0 }}>{item.icon}</span>
                    <span style={{ color: C.text, fontSize: '14px', lineHeight: 1.55 }}>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            4. BÉNÉFICES
        ══════════════════════════════════════════ */}
        <section style={{ borderTop: `1px solid ${C.border}`, padding: isMobile ? '56px 20px' : '80px 48px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span style={{ color: C.muted, fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>Ce que vous gagnez</span>
              <h2 style={{ color: '#fff', fontWeight: 800, fontSize: isMobile ? '1.8rem' : 'clamp(1.8rem, 3vw, 2.6rem)', lineHeight: 1.2, letterSpacing: '-0.025em', margin: 0 }}>
                4 transformations concrètes pour votre business
              </h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '20px' }}>
              {BENEFITS.map((b, i) => <BenefitCard key={i} b={b} i={i} />)}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            5. PROGRAMME
        ══════════════════════════════════════════ */}
        <section id="programme" style={{ borderTop: `1px solid ${C.border}`, padding: isMobile ? '56px 20px' : '80px 48px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span style={{ color: C.muted, fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>Programme</span>
              <h2 style={{ color: '#fff', fontWeight: 800, fontSize: isMobile ? '1.8rem' : 'clamp(1.8rem, 3vw, 2.6rem)', lineHeight: 1.2, letterSpacing: '-0.025em', margin: '0 0 12px' }}>
                6 modules pour maîtriser le marketing IA
              </h2>
              <p style={{ color: C.muted, fontSize: '15px', maxWidth: '480px', margin: '0 auto' }}>
                Un parcours progressif, du positionnement à l'optimisation continue.
              </p>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '16px' }}>
              {MODULES.map((mod, i) => <ModuleCard key={i} mod={mod} i={i} />)}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            6. POUR QUI
        ══════════════════════════════════════════ */}
        <section style={{ borderTop: `1px solid ${C.border}`, padding: isMobile ? '56px 20px' : '80px 48px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span style={{ color: C.muted, fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>Pour qui ?</span>
              <h2 style={{ color: '#fff', fontWeight: 800, fontSize: isMobile ? '1.8rem' : 'clamp(1.8rem, 3vw, 2.6rem)', lineHeight: 1.2, letterSpacing: '-0.025em', margin: 0 }}>
                Cette formation est faite pour vous si…
              </h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: '14px' }}>
              {PROFILES.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.45, delay: (i % 3) * 0.1 }}
                  whileHover={{ y: -4, borderColor: 'rgba(99,102,241,0.40)', transition: { duration: 0.2 } }}
                  style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: '16px', padding: '20px 18px', textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', marginBottom: '10px' }}>{p.icon}</div>
                  <p style={{ color: '#fff', fontWeight: 700, fontSize: '13px', margin: '0 0 4px' }}>{p.label}</p>
                  <p style={{ color: C.muted, fontSize: '11.5px', margin: 0, lineHeight: 1.5 }}>{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            7. AVANT / APRÈS
        ══════════════════════════════════════════ */}
        <section style={{ borderTop: `1px solid ${C.border}`, padding: isMobile ? '56px 20px' : '80px 48px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span style={{ color: C.muted, fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>La transformation</span>
              <h2 style={{ color: '#fff', fontWeight: 800, fontSize: isMobile ? '1.8rem' : 'clamp(1.8rem, 3vw, 2.6rem)', lineHeight: 1.2, letterSpacing: '-0.025em', margin: 0 }}>
                Votre marketing avant et après la formation
              </h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '16px' : '24px' }}>
              {/* Avant */}
              <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <div style={{ background: 'rgba(232,59,155,0.05)', border: '1px solid rgba(232,59,155,0.18)', borderRadius: '20px', padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(232,59,155,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E83B9B" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </div>
                    <span style={{ color: '#E83B9B', fontWeight: 700, fontSize: '14px' }}>Avant</span>
                  </div>
                  {BEFORE_AFTER.map((row, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '10px 0', borderBottom: i < BEFORE_AFTER.length - 1 ? `1px solid rgba(232,59,155,0.10)` : 'none' }}>
                      <span style={{ color: '#E83B9B', fontSize: '12px', marginTop: '1px', flexShrink: 0 }}>—</span>
                      <span style={{ color: C.muted, fontSize: '13.5px', lineHeight: 1.5 }}>{row.before}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              {/* Après */}
              <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                <div style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.18)', borderRadius: '20px', padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span style={{ color: '#10B981', fontWeight: 700, fontSize: '14px' }}>Après la formation</span>
                  </div>
                  {BEFORE_AFTER.map((row, i) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '10px 0', borderBottom: i < BEFORE_AFTER.length - 1 ? `1px solid rgba(16,185,129,0.10)` : 'none' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px', flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ color: C.text, fontSize: '13.5px', lineHeight: 1.5, fontWeight: 500 }}>{row.after}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            8. CTA FINALE
        ══════════════════════════════════════════ */}
        <section style={{ borderTop: `1px solid ${C.border}`, padding: isMobile ? '64px 20px' : '96px 48px' }}>
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
            style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
            {/* Glow derrière le CTA */}
            <div style={{ position: 'absolute', inset: -80, background: 'radial-gradient(circle at center, rgba(99,102,241,0.14) 0%, transparent 65%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 16px', borderRadius: '999px', border: '1px solid rgba(155,48,232,0.35)', background: 'rgba(155,48,232,0.12)', marginBottom: '24px' }}>
                <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', display: 'block' }} />
                <span style={{ color: '#A78BFA', fontSize: '13px', fontWeight: 600 }}>Places limitées</span>
              </div>
              <h2 style={{ color: '#fff', fontWeight: 900, fontSize: isMobile ? '1.9rem' : 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15, letterSpacing: '-0.03em', margin: '0 0 20px' }}>
                Prêt à passer à la vitesse supérieure avec l'IA ?
              </h2>
              <p style={{ color: C.muted, fontSize: '16px', lineHeight: 1.7, margin: '0 0 36px', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto' }}>
                Rejoignez la formation Marketing IA et construisez un système marketing qui travaille pour vous — 24h/24.
              </p>
              <motion.div whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
                <Link to="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  padding: '16px 44px', borderRadius: '999px', fontWeight: 700, fontSize: '16px',
                  background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
                  color: '#fff', textDecoration: 'none',
                  boxShadow: '0 8px 40px rgba(155,48,232,0.45)',
                }}>
                  Rejoindre la formation
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>
              </motion.div>
              <p style={{ color: C.muted, fontSize: '12px', marginTop: '16px' }}>
                Financement OPCO possible · Réponse sous 24h · Sans engagement
              </p>
            </div>
          </motion.div>
        </section>

      </div>
    </main>
  )
}
