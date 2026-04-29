import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { useSEO } from '../hooks/useSEO'
import useIsMobile from '../hooks/useIsMobile'
import Breadcrumb from '../components/Breadcrumb'

/* ── Couleurs ── */
const C = {
  bg:      '#ffffff',
  bgCard:  '#F7F6FF',
  bgCard2: '#EEF0FF',
  bgDark:  '#0F0C1E',
  border:  'rgba(59,79,216,0.10)',
  blue:    '#3B4FD8',
  violet:  '#9B30E8',
  rose:    '#E83B9B',
  text:    '#0F0C1E',
  muted:   '#6B7280',
  green:   '#059669',
}

/* ── Hook compteur animé ── */
function useCounter(target, duration = 1800, inView = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])
  return count
}

/* ── Données ── */
const STATS = [
  { val: 340, suffix: '+', label: 'entrepreneurs formés', color: C.blue },
  { val: 218, suffix: '/mois', label: 'leads qualifiés en moyenne', color: C.violet },
  { val: 62, suffix: '%', label: 'de réduction des coûts d\'acquisition', color: C.rose },
  { val: 4.9, suffix: '/5', label: 'de satisfaction moyenne', color: C.green, isFloat: true },
]

const ProblemIcons = {
  clock: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  trend: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>,
  strategy: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  palette: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>,
  money: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  eye: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
}

const PROBLEMS = [
  {
    icon: ProblemIcons.clock,
    title: 'Vous perdez 15h par semaine sur du contenu qui ne convertit pas',
    desc: 'Posts LinkedIn sans réactions, emails ignorés, articles qui n\'attirent personne. Vous travaillez, mais votre audience ne grandit pas.',
    color: '#EF4444',
  },
  {
    icon: ProblemIcons.trend,
    title: 'Votre pipeline client ressemble à des montagnes russes',
    desc: 'Un mois débordé, le suivant à chercher des missions. Pas de système, pas de prévisibilité. Votre chiffre d\'affaires dépend de la chance.',
    color: '#F59E0B',
  },
  {
    icon: ProblemIcons.strategy,
    title: 'Vous publiez sans stratégie — et vous le savez',
    desc: '"Il faut que je sois présent sur les réseaux." Oui, mais pour dire quoi, à qui, quand ? Sans méthode, vous criez dans le vide.',
    color: '#E83B9B',
  },
  {
    icon: ProblemIcons.palette,
    title: 'Vos visuels coûtent une fortune — pour des résultats médiocres',
    desc: 'Graphiste freelance à 500 € la charte, agence créative à 2 000 € la campagne, banques d\'images à l\'abonnement… Pendant ce temps, vos concurrents génèrent leurs visuels avec l\'IA en 5 minutes.',
    color: '#7C3AED',
  },
  {
    icon: ProblemIcons.money,
    title: 'Vous dépensez en pub sans comprendre ce qui fonctionne',
    desc: 'Budget Google Ads, Meta Ads, boosted posts… Vous injectez de l\'argent sans savoir ce qui génère vraiment des clients.',
    color: '#9B30E8',
  },
  {
    icon: ProblemIcons.eye,
    title: 'Vos concurrents avancent et vous ne savez pas comment',
    desc: 'Ils semblent publier partout, générer des leads, être vus. Vous vous demandez ce qu\'ils font que vous ne faites pas — et combien de temps vous pouvez attendre.',
    color: '#3B4FD8',
  },
]

const BENEFITS = [
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    metric: '+218',
    unit: 'leads/mois',
    title: 'Un flux de clients prévisible',
    desc: 'Arrêtez de courir après les prospects. Construisez un système d\'acquisition automatisé qui travaille pendant que vous dormez.',
    accent: C.blue,
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
    metric: '10×',
    unit: 'plus vite',
    title: 'Textes ET visuels en quelques minutes',
    desc: 'Posts percutants, emails, scripts vidéo — mais aussi affiches, visuels de campagne, chartes graphiques et directions artistiques générés par IA. Fini le budget graphiste.',
    accent: C.violet,
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
    metric: '−62%',
    unit: 'coût acquisition',
    title: 'Des campagnes qui s\'optimisent seules',
    desc: 'Funnels, séquences email et campagnes automatisées. Votre marketing tourne en autonomie, s\'améliore en continu et vous libère du temps.',
    accent: C.rose,
  },
  {
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    metric: '×3',
    unit: 'ROI marketing',
    title: 'Des décisions pilotées par les données',
    desc: 'Fini le marketing à l\'instinct. Vous savez exactement quels leviers activer pour faire croître votre business — et l\'IA analyse à votre place.',
    accent: C.green,
  },
]

const MODULES = [
  {
    num: '01',
    title: 'Stratégie marketing IA — posez les fondations',
    desc: 'Votre positionnement, vos personas, votre plan d\'action. En 2 jours de travail avec l\'IA, vous avez une stratégie marketing solide que des agences facturent 5 000 €.',
    tags: ['Positionnement', 'Persona', 'Plan marketing'],
    accent: C.blue,
    time: '4h',
  },
  {
    num: '02',
    title: 'Contenu & Visuels IA — textes et images qui vendent',
    desc: 'Posts LinkedIn viraux, emails à fort taux d\'ouverture, scripts vidéo — et surtout : génération d\'images pour vos affiches, visuels de campagne, chartes graphiques et directions artistiques. Remplacez des milliers d\'euros de budget graphiste avec les bons outils IA.',
    tags: ['Copywriting', 'Génération d\'images', 'Charte graphique', 'Direction artistique', 'Affiche & Posts'],
    accent: C.violet,
    time: '6h',
  },
  {
    num: '03',
    title: 'Automatisation — marketing en pilote automatique',
    desc: 'Séquences email, workflows de nurturing, funnels de conversion. Votre système génère des leads 24h/24 sans intervention manuelle.',
    tags: ['Automation', 'Funnel', 'Email'],
    accent: C.rose,
    time: '4h',
  },
  {
    num: '04',
    title: 'Acquisition — remplissez votre pipeline',
    desc: 'SEO dopé à l\'IA, publicités Meta & Google optimisées, social selling. Combinez les canaux pour une acquisition prévisible et scalable.',
    tags: ['SEO', 'Meta Ads', 'Google Ads', 'Social'],
    accent: C.green,
    time: '5h',
  },
  {
    num: '05',
    title: 'Analytics — sachez ce qui marche vraiment',
    desc: 'Tableaux de bord, attribution multi-canal, lecture des données avec l\'IA. Vous prenez des décisions basées sur les faits, pas sur l\'intuition.',
    tags: ['Analytics', 'Dashboards', 'KPIs'],
    accent: '#D97706',
    time: '3h',
  },
  {
    num: '06',
    title: 'Optimisation continue — croissance sans plafond',
    desc: 'Tests A/B, itérations rapides, veille concurrentielle IA. Votre marketing s\'améliore chaque semaine et prend une longueur d\'avance sur la concurrence.',
    tags: ['A/B Test', 'Growth', 'Veille'],
    accent: '#0891B2',
    time: '3h',
  },
]

const PROFILES = [
  { abbr: 'AE', label: 'Auto-entrepreneurs', desc: 'Qui veulent scaler sans embaucher', color: C.blue },
  { abbr: 'PM', label: 'Dirigeants TPE/PME', desc: 'Qui veulent digitaliser leur marketing', color: C.violet },
  { abbr: 'FL', label: 'Freelances', desc: 'Qui veulent attirer des clients premium', color: C.rose },
  { abbr: 'SA', label: 'Créateurs SaaS', desc: 'Qui veulent automatiser leur acquisition', color: '#D97706' },
  { abbr: 'CO', label: 'Consultants', desc: 'Qui veulent un personal branding puissant', color: C.green },
  { abbr: 'EC', label: 'E-commerçants', desc: 'Qui veulent exploser leur ROAS', color: '#0891B2' },
]

const BEFORE_AFTER = [
  { before: '15h/semaine sur du contenu sans résultats', after: 'Contenu produit en 1h avec l\'IA, qui convertit' },
  { before: 'Pipeline irrégulier, clients par "bouche-à-oreille"', after: 'Système d\'acquisition automatisé et prévisible' },
  { before: 'Budget pub brûlé sans comprendre les métriques', after: 'Campagnes optimisées avec ROI mesuré en temps réel' },
  { before: 'Stratégie copiée sur les concurrents, sans direction', after: 'Positionnement unique, plan IA sur-mesure' },
  { before: 'Budget graphiste 500–3 000 €/mois pour les visuels', after: 'Affiches, chartes, visuels campagne générés en 5 min avec l\'IA' },
  { before: 'Résultats aléatoires, impossible à reproduire', after: 'Croissance systématique et optimisée en continu' },
]

const FAQS = [
  {
    q: 'Je ne suis pas "technique" — est-ce que je peux suivre cette formation ?',
    a: 'Absolument. Cette formation est conçue pour les entrepreneurs, pas pour les développeurs. Aucune compétence technique requise. Vous apprenez à utiliser l\'IA comme un outil marketing, pas à la programmer.',
  },
  {
    q: 'En combien de temps je verrai des résultats ?',
    a: 'La plupart des participants obtiennent leurs premiers résultats concrets dès le module 2 — certains en moins d\'une semaine. Le système complet se met en place en 4 à 6 semaines selon votre rythme.',
  },
  {
    q: 'Cette formation est-elle finançable via mon OPCO ?',
    a: 'Oui. Smart Optimisation est organisme de formation certifié. Contactez-nous pour vérifier votre éligibilité — dans la majorité des cas, la formation est intégralement prise en charge.',
  },
  {
    q: 'Quelle est la différence avec une formation marketing classique ?',
    a: 'Ici, chaque compétence marketing est associée à un outil IA concret. Vous ne "comprenez" pas — vous implémentez. À la fin, vous avez un système qui tourne, pas juste des notes.',
  },
]

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

/* ── Compteur stat ── */
function StatCounter({ stat }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useCounter(stat.isFloat ? stat.val * 10 : stat.val, 1600, inView)
  const display = stat.isFloat ? (count / 10).toFixed(1) : count
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      style={{ textAlign: 'center', padding: '24px 16px' }}>
      <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, background: `linear-gradient(135deg, ${stat.color}, ${stat.color}99)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        {display}{stat.suffix}
      </div>
      <div style={{ color: C.muted, fontSize: '13px', marginTop: '6px', lineHeight: 1.4 }}>{stat.label}</div>
    </motion.div>
  )
}

/* ── Carte bénéfice 3D ── */
function BenefitCard({ b, i }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 })
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 })
  const ref = useRef(null)
  function onMouseMove(e) {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { mx.set(0); my.set(0) }}
      whileHover={{ boxShadow: `0 24px 64px ${b.accent}22` }}
      style={{
        background: '#fff', border: `1.5px solid ${C.border}`,
        borderRadius: '24px', padding: '32px 28px',
        rotateX: rotX, rotateY: rotY,
        transformStyle: 'preserve-3d', transformPerspective: 900,
        position: 'relative', overflow: 'hidden', cursor: 'default',
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${b.accent}, ${b.accent}40)` }} />
      <div style={{ position: 'absolute', top: 16, right: 20, fontSize: '22px', fontWeight: 900, letterSpacing: '-0.04em', color: `${b.accent}18`, userSelect: 'none' }}>{b.metric}</div>
      <div style={{ width: 52, height: 52, borderRadius: '16px', background: `${b.accent}15`, border: `1.5px solid ${b.accent}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: b.accent, marginBottom: '20px' }}>
        {b.icon}
      </div>
      <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '4px', marginBottom: '12px' }}>
        <span style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.04em', color: b.accent, lineHeight: 1 }}>{b.metric}</span>
        <span style={{ fontSize: '14px', fontWeight: 600, color: `${b.accent}99` }}>{b.unit}</span>
      </div>
      <h3 style={{ color: C.text, fontWeight: 800, fontSize: '17px', margin: '0 0 10px', lineHeight: 1.3 }}>{b.title}</h3>
      <p style={{ color: C.muted, fontSize: '14px', lineHeight: 1.7, margin: 0 }}>{b.desc}</p>
    </motion.div>
  )
}

/* ── Carte module ── */
function ModuleCard({ mod, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  return (
    <motion.div ref={ref}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.55, delay: (i % 2) * 0.12, ease: [0.4, 0, 0.2, 1] }}
      style={{ background: '#fff', border: `1.5px solid ${C.border}`, borderRadius: '20px', padding: '28px', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '3px', background: `linear-gradient(180deg, ${mod.accent}, ${mod.accent}30)` }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: mod.accent, background: `${mod.accent}12`, border: `1px solid ${mod.accent}25`, padding: '3px 10px', borderRadius: '999px' }}>Module {mod.num}</span>
        <span style={{ fontSize: '11px', color: C.muted, background: 'rgba(107,114,128,0.08)', padding: '3px 10px', borderRadius: '999px', fontWeight: 600 }}>{mod.time}</span>
      </div>
      <h3 style={{ color: C.text, fontWeight: 800, fontSize: '16px', margin: '0 0 10px', lineHeight: 1.35 }}>{mod.title}</h3>
      <p style={{ color: C.muted, fontSize: '13.5px', lineHeight: 1.7, margin: '0 0 16px' }}>{mod.desc}</p>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {mod.tags.map(t => (
          <span key={t} style={{ padding: '3px 10px', borderRadius: '999px', background: `${mod.accent}10`, border: `1px solid ${mod.accent}22`, color: mod.accent, fontSize: '11px', fontWeight: 600 }}>{t}</span>
        ))}
      </div>
    </motion.div>
  )
}

/* ── FAQ item ── */
function FAQItem({ item, i }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: i * 0.08 }}
      style={{ border: `1.5px solid ${open ? 'rgba(59,79,216,0.22)' : C.border}`, borderRadius: '16px', overflow: 'hidden', background: open ? C.bgCard : '#fff', transition: 'border-color 0.25s, background 0.25s' }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: '100%', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ color: C.text, fontWeight: 700, fontSize: '15px', lineHeight: 1.4 }}>{item.q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}
          style={{ width: 28, height: 28, borderRadius: '50%', background: open ? 'linear-gradient(135deg, #3B4FD8, #9B30E8)' : C.bgCard2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: open ? '#fff' : C.blue }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}>
            <p style={{ color: C.muted, fontSize: '14px', lineHeight: 1.75, margin: 0, padding: '0 24px 20px' }}>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
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
    <main style={{ background: C.bg, minHeight: 'calc(100vh - 72px)', color: C.text, overflowX: 'hidden' }}>

      {/* ── Blobs décoratifs ── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <motion.div animate={{ scale: [1, 1.25, 1], x: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: -300, right: -300, width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,79,216,0.07) 0%, transparent 65%)' }} />
        <motion.div animate={{ scale: [1, 1.2, 1], y: [0, 50, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          style={{ position: 'absolute', top: '40%', left: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,48,232,0.05) 0%, transparent 65%)' }} />
        <motion.div animate={{ scale: [1, 1.15, 1], x: [0, -30, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
          style={{ position: 'absolute', bottom: -200, right: -100, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,59,155,0.05) 0%, transparent 65%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Breadcrumb ── */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '8px 20px 0' : '8px 48px 0' }}>
          <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Formation', to: '/formation/cpf' }, { label: 'Marketing IA' }]} />
        </div>

        {/* ══════════════════════════════════════════
            1. HERO
        ══════════════════════════════════════════ */}
        <section style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '36px 20px 56px' : '56px 48px 72px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '55% 45%', gap: isMobile ? '40px' : '56px', alignItems: 'center' }}>

          <div>
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', border: '1px solid rgba(155,48,232,0.30)', background: 'rgba(155,48,232,0.07)', marginBottom: '24px' }}>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
                style={{ width: 8, height: 8, borderRadius: '50%', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', flexShrink: 0, display: 'block' }} />
              <span style={{ color: '#7C3AED', fontSize: '13px', fontWeight: 600, letterSpacing: '0.01em' }}>Nouvelle formation · Financement OPCO disponible</span>
            </motion.div>

            {/* H1 */}
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}
              style={{ fontWeight: 900, fontSize: isMobile ? '2.1rem' : 'clamp(2.5rem, 4.8vw, 3.9rem)', lineHeight: 1.08, letterSpacing: '-0.03em', margin: '0 0 6px', color: C.text }}>
              Transformez l'IA en
            </motion.h1>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.14 }}
              style={{ fontWeight: 900, fontSize: isMobile ? '2.1rem' : 'clamp(2.5rem, 4.8vw, 3.9rem)', lineHeight: 1.08, letterSpacing: '-0.03em', margin: '0 0 24px' }}>
              <motion.span
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundImage: 'linear-gradient(135deg, #3B4FD8, #9B30E8, #E83B9B, #3B4FD8)', backgroundSize: '250%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                machine à clients.
              </motion.span>
            </motion.h1>

            {/* Sous-titre */}
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}
              style={{ color: C.muted, fontSize: isMobile ? '15px' : '17px', lineHeight: 1.75, margin: '0 0 36px', maxWidth: '500px' }}>
              En 6 modules pratiques, maîtrisez le marketing IA pour automatiser votre acquisition, créer du contenu en minutes et multiplier vos revenus — sans équipe, sans budget colossal.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.26 }}
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link to="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '15px 32px', borderRadius: '999px', fontWeight: 700, fontSize: '15px',
                  background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', color: '#fff', textDecoration: 'none',
                  boxShadow: '0 6px 28px rgba(155,48,232,0.38)',
                }}>
                  Je veux rejoindre la formation
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
                <a href="#programme" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '15px 28px', borderRadius: '999px', fontWeight: 600, fontSize: '15px',
                  color: C.blue, textDecoration: 'none',
                  border: `1.5px solid rgba(59,79,216,0.25)`,
                }}>
                  Voir le programme
                </a>
              </motion.div>
            </motion.div>

            {/* Garanties */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }}
              style={{ display: 'flex', gap: isMobile ? '10px' : '20px', flexWrap: 'wrap' }}>
              {[
                { text: '100% pratique' },
                { text: 'Financement OPCO' },
                { text: 'Résultats en 4 semaines' },
              ].map(g => (
                <span key={g.text} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: C.muted, fontWeight: 500 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>{g.text}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Colonne visuelle */}
          {!isMobile && (
            <motion.div initial={{ opacity: 0, x: 36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.18 }}
              style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '420px' }}>

              {/* Carte principale flottante */}
              <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '100%', maxWidth: '380px', background: '#fff', borderRadius: '24px', border: `1.5px solid ${C.border}`, padding: '28px', boxShadow: '0 32px 80px rgba(59,79,216,0.12), 0 4px 16px rgba(0,0,0,0.04)', position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B' }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
                  <span style={{ color: C.muted, fontSize: '11px', marginLeft: '6px', fontWeight: 500 }}>campaign-ai.dashboard</span>
                </div>
                {[
                  { label: 'Taux de conversion', val: '+340%', color: '#059669', bar: 85 },
                  { label: 'Contenu généré', val: '12× plus vite', color: C.violet, bar: 95 },
                  { label: 'Coût acquisition', val: '−62%', color: C.blue, bar: 62 },
                  { label: 'Leads / mois', val: '+218', color: C.rose, bar: 70 },
                ].map((row, i) => (
                  <motion.div key={row.label}
                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 + i * 0.12 }}
                    style={{ padding: '10px 0', borderBottom: i < 3 ? `1px solid rgba(59,79,216,0.07)` : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ color: C.muted, fontSize: '12.5px' }}>{row.label}</span>
                      <span style={{ color: row.color, fontWeight: 800, fontSize: '13px' }}>{row.val}</span>
                    </div>
                    <div style={{ height: 4, borderRadius: '999px', background: 'rgba(59,79,216,0.08)', overflow: 'hidden' }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${row.bar}%` }} transition={{ duration: 1.2, delay: 0.6 + i * 0.15, ease: [0.4, 0, 0.2, 1] }}
                        style={{ height: '100%', borderRadius: '999px', background: `linear-gradient(90deg, ${row.color}, ${row.color}80)` }} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Badge flottant haut-droite */}
              <motion.div animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                style={{ position: 'absolute', top: 20, right: -10, background: '#fff', borderRadius: '14px', padding: '10px 14px', boxShadow: '0 8px 24px rgba(59,79,216,0.14)', border: `1px solid ${C.border}`, zIndex: 3 }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px', color: C.blue }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: C.text, textAlign: 'center' }}>Résultats</div>
                <div style={{ fontSize: '10px', color: C.muted, textAlign: 'center' }}>dès sem. 2</div>
              </motion.div>

              {/* Badge flottant bas-gauche */}
              <motion.div animate={{ y: [0, 8, 0], rotate: [0, -2, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                style={{ position: 'absolute', bottom: 30, left: -20, background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', borderRadius: '14px', padding: '10px 16px', boxShadow: '0 8px 24px rgba(155,48,232,0.30)', zIndex: 3 }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#fff' }}>OPCO</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.75)', marginTop: '1px' }}>Finançable</div>
              </motion.div>

              {/* Glow */}
              <div style={{ position: 'absolute', inset: -60, background: 'radial-gradient(circle at center, rgba(59,79,216,0.08) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 1 }} />
            </motion.div>
          )}
        </section>

        {/* ══════════════════════════════════════════
            2. BANDE STATS
        ══════════════════════════════════════════ */}
        <section style={{ background: C.bgCard, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '0 20px' : '0 48px', display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 0 }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ borderRight: (!isMobile && i < 3) ? `1px solid ${C.border}` : 'none', borderBottom: (isMobile && i < 2) ? `1px solid ${C.border}` : 'none' }}>
                <StatCounter stat={s} />
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            3. PROBLÈMES
        ══════════════════════════════════════════ */}
        <section style={{ padding: isMobile ? '64px 20px' : '96px 48px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5 }} style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span style={{ color: C.rose, fontSize: '12px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>Est-ce que vous vous reconnaissez ?</span>
              <h2 style={{ color: C.text, fontWeight: 900, fontSize: isMobile ? '1.85rem' : 'clamp(1.85rem, 3.2vw, 2.7rem)', lineHeight: 1.15, letterSpacing: '-0.03em', margin: '0 0 18px' }}>
                Votre marketing vous épuise.{' '}
                <span style={{ color: C.rose }}>Sans vous enrichir.</span>
              </h2>
              <p style={{ color: C.muted, fontSize: '16px', lineHeight: 1.75, maxWidth: '520px', margin: '0 auto' }}>
                Si vous vous retrouvez dans ne serait-ce qu'une de ces situations — cette formation a été conçue pour vous.
              </p>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {PROBLEMS.map((p, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.4, 0, 0.2, 1] }}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  style={{ display: 'flex', gap: '18px', padding: isMobile ? '18px 16px' : '22px 24px', background: '#fff', border: `1.5px solid ${C.border}`, borderRadius: '18px', alignItems: 'flex-start', cursor: 'default' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '14px', background: `${p.color}10`, border: `1.5px solid ${p.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: p.color }}>
                    {p.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: C.text, fontWeight: 800, fontSize: isMobile ? '14px' : '15px', margin: '0 0 6px', lineHeight: 1.3 }}>{p.title}</p>
                    <p style={{ color: C.muted, fontSize: '13.5px', lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
                  </div>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: `${p.color}12`, border: `1px solid ${p.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="2.8" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Accroche de transition */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              style={{ marginTop: '48px', padding: '28px 32px', background: 'linear-gradient(135deg, rgba(59,79,216,0.06), rgba(155,48,232,0.06))', borderRadius: '20px', border: `1.5px solid rgba(59,79,216,0.12)`, textAlign: 'center' }}>
              <p style={{ color: C.text, fontWeight: 800, fontSize: isMobile ? '16px' : '18px', margin: '0 0 8px', lineHeight: 1.4 }}>
                Vous n'avez pas de problème de travail. Vous avez un problème de <span style={{ color: C.blue }}>système.</span>
              </p>
              <p style={{ color: C.muted, fontSize: '14px', lineHeight: 1.65, margin: 0 }}>
                L'IA ne remplace pas l'effort — elle remplace les heures perdues sur les mauvaises tâches.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            4. SOLUTION
        ══════════════════════════════════════════ */}
        <section style={{ background: C.bgCard, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: isMobile ? '64px 20px' : '96px 48px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '40px' : '64px', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
              <span style={{ color: C.blue, fontSize: '12px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>La solution</span>
              <h2 style={{ color: C.text, fontWeight: 900, fontSize: isMobile ? '1.85rem' : 'clamp(1.85rem, 3.2vw, 2.6rem)', lineHeight: 1.15, letterSpacing: '-0.03em', margin: '0 0 22px' }}>
                Un système marketing{' '}
                <motion.span animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  style={{ backgroundImage: 'linear-gradient(135deg, #3B4FD8, #9B30E8, #E83B9B, #3B4FD8)', backgroundSize: '250%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  qui travaille à votre place.
                </motion.span>
              </h2>
              <p style={{ color: C.muted, fontSize: '15.5px', lineHeight: 1.8, margin: '0 0 20px' }}>
                La formation Marketing IA vous donne une méthode concrète, étape par étape, pour construire un système d'acquisition qui génère des clients en continu — sans dépendre de votre présence permanente.
              </p>
              <p style={{ color: C.muted, fontSize: '15.5px', lineHeight: 1.8, margin: '0 0 32px' }}>
                Pas de slides théoriques. Chaque module se termine par une livrable que vous implémentez <strong style={{ color: C.text }}>directement dans votre business</strong>.
              </p>
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
                <Link to="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 28px', borderRadius: '999px',
                  fontWeight: 700, fontSize: '14px', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
                  color: '#fff', textDecoration: 'none', boxShadow: '0 4px 20px rgba(155,48,232,0.30)',
                }}>
                  Découvrir la formation
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.12 }}>
              <div style={{ background: '#fff', border: `1.5px solid ${C.border}`, borderRadius: '24px', overflow: 'hidden', boxShadow: '0 16px 48px rgba(59,79,216,0.08)' }}>
                <div style={{ height: '4px', background: 'linear-gradient(90deg, #3B4FD8, #9B30E8, #E83B9B)' }} />
                <div style={{ padding: '28px' }}>
                  {[
                    { color: C.blue, title: 'Méthode étape par étape', desc: 'De la stratégie à l\'optimisation — rien n\'est laissé au hasard.' },
                    { color: C.violet, title: 'Implémentation immédiate', desc: 'Chaque module = une action concrète dans votre business.' },
                    { color: C.rose, title: 'Résultats visibles rapidement', desc: 'Les premiers leads supplémentaires arrivent dès la semaine 2.' },
                    { color: C.green, title: 'Système évolutif', desc: 'Votre marketing s\'améliore chaque semaine en autonomie.' },
                  ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                      transition={{ delay: 0.18 + i * 0.1 }}
                      style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '16px 0', borderBottom: i < 3 ? `1px solid ${C.border}` : 'none' }}>
                      <div style={{ width: 36, height: 36, borderRadius: '10px', background: `${item.color}12`, border: `1px solid ${item.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <div>
                        <p style={{ color: C.text, fontWeight: 700, fontSize: '14px', margin: '0 0 3px' }}>{item.title}</p>
                        <p style={{ color: C.muted, fontSize: '13px', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            5. BÉNÉFICES
        ══════════════════════════════════════════ */}
        <section style={{ padding: isMobile ? '64px 20px' : '96px 48px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span style={{ color: C.violet, fontSize: '12px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>Ce que vous gagnez concrètement</span>
              <h2 style={{ color: C.text, fontWeight: 900, fontSize: isMobile ? '1.85rem' : 'clamp(1.85rem, 3.2vw, 2.7rem)', lineHeight: 1.15, letterSpacing: '-0.03em', margin: '0 0 16px' }}>
                4 transformations mesurables
              </h2>
              <p style={{ color: C.muted, fontSize: '16px', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
                Pas des promesses vagues — des métriques que vous pouvez tracker dès la semaine 2.
              </p>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '20px' }}>
              {BENEFITS.map((b, i) => <BenefitCard key={i} b={b} i={i} />)}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            5b. GÉNÉRATION D'IMAGES
        ══════════════════════════════════════════ */}
        <section style={{ padding: isMobile ? '64px 20px' : '96px 48px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '40px' : '64px', alignItems: 'center' }}>

              {/* Texte */}
              <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '999px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.20)', marginBottom: '20px' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                  <span style={{ color: '#7C3AED', fontSize: '12px', fontWeight: 800, letterSpacing: '0.10em', textTransform: 'uppercase' }}>Génération d'images IA</span>
                </div>
                <h2 style={{ color: C.text, fontWeight: 900, fontSize: isMobile ? '1.85rem' : 'clamp(1.85rem, 3.2vw, 2.6rem)', lineHeight: 1.15, letterSpacing: '-0.03em', margin: '0 0 20px' }}>
                  Arrêtez de payer{' '}
                  <span style={{ color: '#7C3AED' }}>des graphistes</span>{' '}
                  pour chaque visuel.
                </h2>
                <p style={{ color: C.muted, fontSize: '15.5px', lineHeight: 1.8, margin: '0 0 20px' }}>
                  Dans cette formation, vous apprenez à générer vos propres visuels professionnels avec l'IA — sans Photoshop, sans compétences techniques, sans budget agence.
                </p>
                <p style={{ color: C.muted, fontSize: '15.5px', lineHeight: 1.8, margin: '0 0 32px' }}>
                  Charte graphique cohérente, direction artistique de campagne, affiches événementielles, visuels pour posts et publicités — tout ce que vous commandiez à 500–2 000 € à des prestataires, vous le produisez vous-même en quelques minutes.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    'Chartes graphiques & identité visuelle',
                    'Directions artistiques de campagne',
                    'Affiches, flyers et visuels événementiels',
                    'Visuels pour posts et publicités Meta / LinkedIn',
                  ].map((label, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.09 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'rgba(124,58,237,0.04)', border: '1px solid rgba(124,58,237,0.10)', borderRadius: '12px' }}>
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <span style={{ color: C.text, fontWeight: 600, fontSize: '14px' }}>{label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Carte visuelle */}
              <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
                <div style={{ background: 'linear-gradient(135deg, #1a0f3a, #0f1a3a)', borderRadius: '24px', padding: '32px', boxShadow: '0 24px 64px rgba(124,58,237,0.18)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,48,232,0.30) 0%, transparent 65%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,79,216,0.25) 0%, transparent 65%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'relative' }}>
                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 20px' }}>Économies réalisées / mois</p>
                    {[
                      { poste: 'Graphiste freelance', avant: '800–1 500 €', apres: '0 €', saving: '100%' },
                      { poste: 'Banque d\'images', avant: '50–200 €', apres: '0 €', saving: '100%' },
                      { poste: 'Création d\'affiches', avant: '300–600 €', apres: '0 €', saving: '100%' },
                      { poste: 'Direction artistique', avant: '1 000–2 500 €', apres: 'IA incluse', saving: '−95%' },
                    ].map((row, i) => (
                      <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                        transition={{ delay: 0.25 + i * 0.1 }}
                        style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '12px', alignItems: 'center', padding: '12px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                        <span style={{ color: 'rgba(255,255,255,0.70)', fontSize: '12.5px' }}>{row.poste}</span>
                        <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', textDecoration: 'line-through' }}>{row.avant}</span>
                        <span style={{ color: '#10B981', fontWeight: 800, fontSize: '12.5px' }}>{row.apres}</span>
                      </motion.div>
                    ))}
                    <div style={{ marginTop: '20px', padding: '14px 18px', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'rgba(255,255,255,0.80)', fontWeight: 700, fontSize: '13px' }}>Économie totale estimée</span>
                      <span style={{ color: '#10B981', fontWeight: 900, fontSize: '18px' }}>~2 500 €/mois</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            6. PROGRAMME
        ══════════════════════════════════════════ */}
        <section id="programme" style={{ background: C.bgCard, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: isMobile ? '64px 20px' : '96px 48px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span style={{ color: C.blue, fontSize: '12px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>Le programme</span>
              <h2 style={{ color: C.text, fontWeight: 900, fontSize: isMobile ? '1.85rem' : 'clamp(1.85rem, 3.2vw, 2.7rem)', lineHeight: 1.15, letterSpacing: '-0.03em', margin: '0 0 16px' }}>
                6 modules — de zéro à un système complet
              </h2>
              <p style={{ color: C.muted, fontSize: '16px', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
                Chaque module est autonome et débouche sur un livrable concret que vous gardez et utilisez après la formation.
              </p>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '16px' }}>
              {MODULES.map((mod, i) => <ModuleCard key={i} mod={mod} i={i} />)}
            </div>

            {/* Résumé total */}
            <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              style={{ marginTop: '32px', padding: '24px 28px', background: '#fff', border: `1.5px solid ${C.border}`, borderRadius: '18px', display: 'flex', gap: isMobile ? '16px' : '48px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {[
                { val: '6 modules', label: '24h de contenu' },
                { val: '100% pratique', label: 'Livrables à chaque module' },
                { val: 'Accès illimité', label: 'Mises à jour incluses' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 900, fontSize: '18px', color: C.text }}>{s.val}</div>
                  <div style={{ fontSize: '12px', color: C.muted, marginTop: '3px' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            7. POUR QUI
        ══════════════════════════════════════════ */}
        <section style={{ padding: isMobile ? '64px 20px' : '96px 48px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '52px' }}>
              <span style={{ color: C.rose, fontSize: '12px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>Pour qui ?</span>
              <h2 style={{ color: C.text, fontWeight: 900, fontSize: isMobile ? '1.85rem' : 'clamp(1.85rem, 3.2vw, 2.7rem)', lineHeight: 1.15, letterSpacing: '-0.03em', margin: '0 0 16px' }}>
                Cette formation est faite pour vous si…
              </h2>
              <p style={{ color: C.muted, fontSize: '16px', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
                Pas besoin d'être expert en marketing ou en tech. Juste la volonté de construire quelque chose qui dure.
              </p>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
              {PROFILES.map((p, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(59,79,216,0.10)', borderColor: 'rgba(59,79,216,0.25)', transition: { duration: 0.25 } }}
                  style={{ background: '#fff', border: `1.5px solid ${C.border}`, borderRadius: '18px', padding: '24px 20px', textAlign: 'center', cursor: 'default' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '12px', background: `${p.color}12`, border: `1.5px solid ${p.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: p.color, fontWeight: 800, fontSize: '13px', letterSpacing: '0.04em' }}>{p.abbr}</div>
                  <p style={{ color: C.text, fontWeight: 800, fontSize: '14px', margin: '0 0 5px' }}>{p.label}</p>
                  <p style={{ color: C.muted, fontSize: '12.5px', margin: 0, lineHeight: 1.55 }}>{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            8. AVANT / APRÈS
        ══════════════════════════════════════════ */}
        <section style={{ background: C.bgCard, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: isMobile ? '64px 20px' : '96px 48px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '52px' }}>
              <span style={{ color: C.green, fontSize: '12px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>La transformation</span>
              <h2 style={{ color: C.text, fontWeight: 900, fontSize: isMobile ? '1.85rem' : 'clamp(1.85rem, 3.2vw, 2.7rem)', lineHeight: 1.15, letterSpacing: '-0.03em', margin: 0 }}>
                Votre marketing avant — et après.
              </h2>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '16px' : '28px' }}>
              {/* Avant */}
              <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
                <div style={{ background: '#fff', border: '1.5px solid rgba(239,68,68,0.18)', borderRadius: '20px', overflow: 'hidden', height: '100%' }}>
                  <div style={{ background: 'rgba(239,68,68,0.06)', padding: '18px 24px', borderBottom: '1px solid rgba(239,68,68,0.12)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(239,68,68,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </div>
                    <span style={{ color: '#EF4444', fontWeight: 800, fontSize: '15px' }}>Avant la formation</span>
                  </div>
                  <div style={{ padding: '16px 24px' }}>
                    {BEFORE_AFTER.map((row, i) => (
                      <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '12px 0', borderBottom: i < BEFORE_AFTER.length - 1 ? '1px solid rgba(239,68,68,0.07)' : 'none' }}>
                        <span style={{ color: '#EF4444', fontSize: '14px', fontWeight: 700, marginTop: '0px', flexShrink: 0, lineHeight: 1.6 }}>—</span>
                        <span style={{ color: C.muted, fontSize: '14px', lineHeight: 1.6 }}>{row.before}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Après */}
              <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.12 }}>
                <div style={{ background: '#fff', border: '1.5px solid rgba(5,150,105,0.20)', borderRadius: '20px', overflow: 'hidden', height: '100%' }}>
                  <div style={{ background: 'rgba(5,150,105,0.06)', padding: '18px 24px', borderBottom: '1px solid rgba(5,150,105,0.12)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(5,150,105,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span style={{ color: '#059669', fontWeight: 800, fontSize: '15px' }}>Après la formation</span>
                  </div>
                  <div style={{ padding: '16px 24px' }}>
                    {BEFORE_AFTER.map((row, i) => (
                      <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '12px 0', borderBottom: i < BEFORE_AFTER.length - 1 ? '1px solid rgba(5,150,105,0.08)' : 'none' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '3px', flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                        <span style={{ color: C.text, fontSize: '14px', lineHeight: 1.6, fontWeight: 600 }}>{row.after}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            9. FAQ
        ══════════════════════════════════════════ */}
        <section style={{ padding: isMobile ? '64px 20px' : '96px 48px' }}>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '52px' }}>
              <span style={{ color: C.blue, fontSize: '12px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>Vos questions</span>
              <h2 style={{ color: C.text, fontWeight: 900, fontSize: isMobile ? '1.85rem' : 'clamp(1.85rem, 3.2vw, 2.6rem)', lineHeight: 1.15, letterSpacing: '-0.03em', margin: 0 }}>
                Tout ce que vous voulez savoir
              </h2>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {FAQS.map((item, i) => <FAQItem key={i} item={item} i={i} />)}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            10. CTA FINALE
        ══════════════════════════════════════════ */}
        <section style={{ padding: isMobile ? '0 20px 80px' : '0 48px 96px' }}>
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ maxWidth: '1000px', margin: '0 auto', background: 'linear-gradient(135deg, #0F0C1E 0%, #1a0f3a 50%, #0F0C1E 100%)', borderRadius: '28px', padding: isMobile ? '48px 28px' : '72px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>

            {/* Glows internes */}
            <div style={{ position: 'absolute', top: -100, left: '20%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,79,216,0.25) 0%, transparent 65%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -80, right: '15%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,48,232,0.20) 0%, transparent 65%)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative' }}>
              <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.5, repeat: Infinity }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.07)', marginBottom: '28px' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', display: 'block' }} />
                <span style={{ color: 'rgba(255,255,255,0.80)', fontSize: '13px', fontWeight: 600 }}>Places disponibles — réponse sous 24h</span>
              </motion.div>

              <h2 style={{ color: '#fff', fontWeight: 900, fontSize: isMobile ? '2rem' : 'clamp(2rem, 4.2vw, 3.2rem)', lineHeight: 1.12, letterSpacing: '-0.035em', margin: '0 0 20px' }}>
                Prêt à arrêter de subir{' '}
                <br />
                <motion.span animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  style={{ backgroundImage: 'linear-gradient(135deg, #A78BFA, #E83B9B, #F59E0B, #A78BFA)', backgroundSize: '250%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  et commencer à scaler ?
                </motion.span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: isMobile ? '15px' : '17px', lineHeight: 1.75, margin: '0 0 40px', maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto' }}>
                Rejoignez les +340 entrepreneurs qui ont transformé leur marketing avec l'IA. Financement OPCO disponible — aucune raison d'attendre.
              </p>

              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
                  <Link to="/contact" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '10px',
                    padding: '17px 44px', borderRadius: '999px', fontWeight: 800, fontSize: '16px',
                    background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
                    color: '#fff', textDecoration: 'none',
                    boxShadow: '0 8px 48px rgba(155,48,232,0.50)',
                  }}>
                    Rejoindre la formation
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03, y: -3 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
                  <a href="#programme" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '17px 32px', borderRadius: '999px', fontWeight: 600, fontSize: '15px',
                    color: 'rgba(255,255,255,0.75)', textDecoration: 'none',
                    border: '1.5px solid rgba(255,255,255,0.18)',
                  }}>
                    Voir le programme
                  </a>
                </motion.div>
              </div>

              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '13px', marginTop: '20px' }}>
                Financement OPCO possible · Sans engagement · Certification organisme de formation
              </p>
            </div>
          </motion.div>
        </section>

      </div>
    </main>
  )
}
