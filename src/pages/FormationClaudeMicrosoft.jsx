import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { useSEO } from '../hooks/useSEO'
import useIsMobile from '../hooks/useIsMobile'
import Breadcrumb from '../components/Breadcrumb'

/* ── Couleurs ── */
const C = {
  bg:     '#ffffff',
  card:   '#F7F8FF',
  card2:  '#EEF1FF',
  border: 'rgba(59,79,216,0.10)',
  blue:   '#3B4FD8',
  violet: '#9B30E8',
  rose:   '#E83B9B',
  text:   '#0F0C1E',
  muted:  '#6B7280',
  green:  '#059669',
  // Couleurs apps Microsoft
  outlook: '#0078D4',
  word:    '#185ABD',
  ppt:     '#C43E1C',
  excel:   '#107C41',
}

/* ── Hook compteur animé ── */
function useCounter(target, duration = 1600, inView = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let v = 0
    const step = target / (duration / 16)
    const t = setInterval(() => {
      v += step
      if (v >= target) { setCount(target); clearInterval(t) }
      else setCount(Math.floor(v))
    }, 16)
    return () => clearInterval(t)
  }, [inView, target, duration])
  return count
}

/* ── Données ── */
const STATS = [
  { val: 60, suffix: '+', label: 'entreprises accompagnées', color: C.blue },
  { val: 3, suffix: 'h', label: 'économisées par jour et par collaborateur', color: C.violet },
  { val: 78, suffix: '%', label: 'de réduction du temps de rédaction', color: C.rose },
  { val: 4.9, suffix: '/5', label: 'de satisfaction moyenne', color: C.green, isFloat: true },
]

const PROBLEMS = [
  {
    logo: '/logos/outlook.png',
    title: 'Votre boîte mail vous gouverne — pas l\'inverse',
    desc: '120 emails par jour en moyenne. Vous triez, vous relancez, vous répondez — mais vous ne produisez pas. L\'infobésité est le poison silencieux de votre productivité.',
    color: C.outlook,
  },
  {
    logo: '/logos/word.png',
    title: 'Rédiger un rapport professionnel prend une demi-journée',
    desc: 'Structurer les idées, trouver le bon ton, reformuler, mettre en page… La rédaction longue est chronophage — et souvent remise à plus tard.',
    color: C.word,
  },
  {
    logo: '/logos/powerpoint.png',
    title: 'Vos présentations manquent de narration et d\'impact',
    desc: 'Des slides chargées, un fil rouge flou, un message qui ne retient pas l\'attention. Une bonne idée mal présentée est une idée perdue.',
    color: C.ppt,
  },
  {
    logo: '/logos/excel.svg',
    title: 'Excel reste une boîte noire pour la majorité des équipes',
    desc: 'Les formules avancées, les tableaux croisés, les graphiques dynamiques — réservés aux "experts". Pendant ce temps, vos données ne parlent pas pour vous.',
    color: C.excel,
  },
]

const MODULES = [
  {
    app: 'Outlook',
    color: C.outlook,
    bgLight: 'rgba(0,120,212,0.06)',
    borderColor: 'rgba(0,120,212,0.15)',
    logo: '/logos/outlook.png',
    title: 'Zéro infobésité. Priorité absolue.',
    pitch: 'Claude lit, trie et synthétise votre boîte mail en quelques secondes. Fini le temps perdu à fouiller pour trouver l\'essentiel.',
    points: [
      'Tri intelligent par priorité et contexte métier',
      'Rédaction de mails professionnels en 30 secondes',
      'Reformulation et adaptation du ton selon le destinataire',
      'Synthèse automatique de fils de discussion complexes',
      'Détection des actions à mener et relances à programmer',
    ],
    gain: '−65% de temps sur la gestion des emails',
  },
  {
    app: 'Word',
    color: C.word,
    bgLight: 'rgba(24,90,189,0.06)',
    borderColor: 'rgba(24,90,189,0.15)',
    logo: '/logos/word.png',
    title: 'Du brouillon au document final — en minutes.',
    pitch: 'Claude structure, rédige et reformule avec une précision stylistique que les outils généralistes ne peuvent pas atteindre.',
    points: [
      'Structuration automatique de rapports, notes et comptes-rendus',
      'Réécriture stylistique (formel, synthétique, persuasif)',
      'Aide à la rédaction longue sans perte de cohérence',
      'Adaptation du document à votre audience cible',
      'Résumés exécutifs générés en un clic',
    ],
    gain: '−78% de temps de rédaction sur les documents longs',
  },
  {
    app: 'PowerPoint',
    color: C.ppt,
    bgLight: 'rgba(196,62,28,0.06)',
    borderColor: 'rgba(196,62,28,0.15)',
    logo: '/logos/powerpoint.png',
    title: 'De la donnée brute à la narration qui convainc.',
    pitch: 'Claude transforme vos informations en un fil rouge narratif clair, logique et visuellement optimisé — slide par slide.',
    points: [
      'Génération du plan de présentation depuis un brief',
      'Rédaction du contenu de chaque slide (titre, bullets, speaker notes)',
      'Structuration en 3 actes : problème, solution, action',
      'Adaptation du message selon le contexte (interne, client, investisseur)',
      'Suggestions de visuels et d\'infographies pour chaque slide',
    ],
    gain: '×4 plus vite pour préparer une présentation stratégique',
  },
  {
    app: 'Excel',
    color: C.excel,
    bgLight: 'rgba(16,124,65,0.06)',
    borderColor: 'rgba(16,124,65,0.15)',
    logo: '/logos/excel.svg',
    title: 'Le langage naturel devient formule. La donnée devient décision.',
    pitch: 'Décrivez ce que vous voulez calculer ou analyser en français — Claude génère la formule exacte et interprète vos résultats.',
    points: [
      'Conversion du langage naturel en formules complexes (INDEX/MATCH, XLOOKUP…)',
      'Création de tableaux croisés dynamiques sur instruction',
      'Analyse et interprétation de vos données en langage clair',
      'Génération de graphiques adaptés à vos KPIs',
      'Détection d\'anomalies et alertes automatiques',
    ],
    gain: 'Formules avancées accessibles à tous les niveaux',
  },
]

const PROFILES = [
  { abbr: 'DG', label: 'Dirigeants', desc: 'Qui veulent reprendre le contrôle de leur temps', color: C.blue },
  { abbr: 'MG', label: 'Managers', desc: 'Qui veulent piloter avec des données claires', color: C.violet },
  { abbr: 'AS', label: 'Assistants', desc: 'Qui traitent de gros volumes de mails et documents', color: C.outlook },
  { abbr: 'CO', label: 'Consultants', desc: 'Qui produisent des livrables clients à haute valeur', color: C.ppt },
  { abbr: 'RH', label: 'Équipes RH', desc: 'Qui rédigent offres, comptes-rendus et reportings', color: C.word },
  { abbr: 'FI', label: 'Équipes Finance', desc: 'Qui analysent des données et produisent des tableaux', color: C.excel },
]

const BEFORE_AFTER = [
  { before: '45 min pour trier et répondre aux emails du matin', after: 'Boîte mail traitée en 10 min avec Claude sur Outlook' },
  { before: 'Une demi-journée pour rédiger un rapport de 5 pages', after: 'Structure et premier jet en 15 min sur Word' },
  { before: 'Slides chargées, message confus, peu d\'impact', after: 'Narration claire et présentations mémorables sur PowerPoint' },
  { before: 'Formules Excel recopiées sans en comprendre la logique', after: 'Calculs complexes générés en langage naturel sur Excel' },
  { before: 'Réunions non préparées, comptes-rendus lacunaires', after: 'Briefs, CR et synthèses produits en quelques minutes' },
]

const FAQS = [
  {
    q: 'Faut-il une licence Microsoft 365 Copilot pour utiliser Claude ?',
    a: 'Non. Claude s\'intègre via des connecteurs et des méthodes d\'utilisation complémentaires à votre suite Microsoft existante, sans nécessiter de licence Copilot. La formation vous explique précisément comment combiner les deux environnements.',
  },
  {
    q: 'Mes données sont-elles en sécurité avec Claude ?',
    a: 'Oui. La formation couvre les bonnes pratiques de sécurité : utilisation via connecteurs officiels, gestion des données sensibles, conformité RGPD. Vous apprenez à profiter de la puissance de l\'IA sans compromettre la confidentialité de vos informations.',
  },
  {
    q: 'Quel niveau technique est requis pour suivre cette formation ?',
    a: 'Aucun. Si vous utilisez déjà Outlook, Word, PowerPoint et Excel dans votre quotidien professionnel, vous avez toutes les bases nécessaires. La formation se concentre sur l\'usage, pas sur la technique.',
  },
  {
    q: 'Peut-on financer cette formation via l\'OPCO ?',
    a: 'Oui. Smart Optimisation est organisme de formation certifié. Dans la majorité des cas, la formation est éligible à une prise en charge totale ou partielle via votre OPCO. Contactez-nous pour vérifier votre éligibilité en 24h.',
  },
]

const PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Course',
      name: 'Formation Claude IA & Pack Office 365 — Intelligence artificielle dans Microsoft 365 | Smart Optimisation',
      description: 'Formation Claude IA intégrée au pack Office 365 : apprenez à utiliser l\'intelligence artificielle dans Outlook, Word, PowerPoint et Excel. Gagnez 3h par jour.',
      provider: { '@type': 'Organization', name: 'Smart Optimisation', url: 'https://smartoptimisation.fr' },
      url: 'https://smartoptimisation.fr/formation/claude-microsoft',
      inLanguage: 'fr-FR',
      educationalLevel: 'Débutant à intermédiaire',
      about: 'Intelligence artificielle, Microsoft 365, Pack Office, Claude IA, productivité',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://smartoptimisation.fr/' },
        { '@type': 'ListItem', position: 2, name: 'Formation', item: 'https://smartoptimisation.fr/formation/cpf' },
        { '@type': 'ListItem', position: 3, name: 'Formation Claude IA & Pack Office 365' },
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
    <motion.div ref={ref} initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }} style={{ textAlign: 'center', padding: '24px 16px' }}>
      <div style={{ fontSize: 'clamp(1.9rem, 4.5vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, background: `linear-gradient(135deg, ${stat.color}, ${stat.color}88)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        {display}{stat.suffix}
      </div>
      <div style={{ color: C.muted, fontSize: '13px', marginTop: '6px', lineHeight: 1.4, maxWidth: '120px', margin: '6px auto 0' }}>{stat.label}</div>
    </motion.div>
  )
}

/* ── Carte module ── */
function ModuleCard({ mod, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })
  return (
    <motion.div ref={ref}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
      style={{ background: '#fff', border: `1.5px solid ${mod.borderColor}`, borderRadius: '24px', overflow: 'hidden' }}>
      {/* Header carte */}
      <div style={{ background: mod.bgLight, borderBottom: `1px solid ${mod.borderColor}`, padding: '22px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: 46, height: 46, borderRadius: '14px', background: '#fff', border: `1.5px solid ${mod.borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 12px ${mod.color}18`, padding: '8px' }}>
            <img src={mod.logo} alt={mod.app} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: mod.color, letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: '2px' }}>Module</div>
            <div style={{ fontWeight: 900, fontSize: '20px', color: C.text, letterSpacing: '-0.02em' }}>{mod.app}</div>
          </div>
        </div>
        <div style={{ padding: '6px 14px', borderRadius: '999px', background: `${mod.color}12`, border: `1px solid ${mod.color}22`, color: mod.color, fontSize: '11.5px', fontWeight: 700 }}>{mod.gain}</div>
      </div>
      {/* Corps carte */}
      <div style={{ padding: '24px 28px' }}>
        <h3 style={{ color: C.text, fontWeight: 800, fontSize: '17px', margin: '0 0 10px', lineHeight: 1.35 }}>{mod.title}</h3>
        <p style={{ color: C.muted, fontSize: '14px', lineHeight: 1.75, margin: '0 0 20px' }}>{mod.pitch}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {mod.points.map((pt, j) => (
            <div key={j} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: `${mod.color}12`, border: `1px solid ${mod.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={mod.color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <span style={{ color: C.text, fontSize: '13.5px', lineHeight: 1.6, fontWeight: 500 }}>{pt}</span>
            </div>
          ))}
        </div>
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
      style={{ border: `1.5px solid ${open ? 'rgba(59,79,216,0.22)' : C.border}`, borderRadius: '16px', overflow: 'hidden', background: open ? C.card : '#fff', transition: 'border-color 0.25s, background 0.25s' }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: '100%', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ color: C.text, fontWeight: 700, fontSize: '15px', lineHeight: 1.4 }}>{item.q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}
          style={{ width: 28, height: 28, borderRadius: '50%', background: open ? 'linear-gradient(135deg, #3B4FD8, #9B30E8)' : C.card2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: open ? '#fff' : C.blue }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }} style={{ overflow: 'hidden' }}>
            <p style={{ color: C.muted, fontSize: '14px', lineHeight: 1.75, margin: 0, padding: '0 24px 20px' }}>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ── Player vidéo à onglets ── */
const VIDEO_TABS = [
  { app: 'Outlook',    color: C.outlook, logo: '/logos/outlook.png',     src: '/videos/demo-outlook.mp4',    desc: 'Tri intelligent, rédaction contextuelle et synthèse de fils de discussion en quelques secondes.' },
  { app: 'Word',       color: C.word,    logo: '/logos/word.png',        src: '/videos/demo-word.mp4',       desc: 'Structuration automatique, réécriture stylistique et rédaction longue sans perte de cohérence.' },
  { app: 'Excel',      color: C.excel,   logo: '/logos/excel.svg',       src: '/videos/demo-excel.mp4',      desc: 'Langage naturel converti en formules complexes, analyse de données et graphiques en un clic.' },
  { app: 'PowerPoint', color: C.ppt,     logo: '/logos/powerpoint.png',  src: '/videos/demo-powerpoint.mp4', desc: 'Du brief à la présentation complète : plan, contenu de slides et speaker notes générés automatiquement.' },
]

function VideoTabs({ isMobile }) {
  const [active, setActive] = useState(0)
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.play().catch(() => {})
    }
  }, [active])

  const tab = VIDEO_TABS[active]

  return (
    <div>
      {/* Player */}
      <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        style={{ borderRadius: '14px', overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.10)', border: `1.5px solid ${C.border}`, marginBottom: '12px' }}>
        <video ref={videoRef} muted loop playsInline controls
          style={{ width: '100%', display: 'block', maxHeight: '380px', objectFit: 'cover' }}>
          <source src={tab.src} type="video/mp4" />
        </video>
      </motion.div>

      {/* Onglets */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {VIDEO_TABS.map((t, i) => (
          <motion.button key={i} onClick={() => setActive(i)}
            whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              padding: '7px 14px', borderRadius: '999px', border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', fontWeight: 600, fontSize: '12.5px',
              background: active === i ? t.color : '#fff',
              color: active === i ? '#fff' : C.muted,
              boxShadow: active === i ? `0 3px 12px ${t.color}30` : `0 0 0 1.5px rgba(59,79,216,0.12)`,
              transition: 'all 0.22s',
            }}>
            <img src={t.logo} alt={t.app} style={{ width: 16, height: 16, objectFit: 'contain', display: 'block', flexShrink: 0 }} />
            {t.app}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

/* ── Page principale ── */
export default function FormationClaudeMicrosoft() {
  useSEO({
    title: 'Formation Claude IA Pack Office 365 — Intelligence artificielle Microsoft 365 | Smart Optimisation',
    description: 'Formez-vous à Claude IA dans le pack Office 365 : Outlook, Word, PowerPoint et Excel. Maîtrisez l\'intelligence artificielle dans Microsoft 365 et gagnez 3h par jour. Formation éligible OPCO.',
    path: '/formation/claude-microsoft',
    jsonLd: PAGE_SCHEMA,
    keywords: 'formation Claude IA, formation intelligence artificielle Microsoft 365, Claude IA pack Office 365, formation IA Outlook, formation IA Word, formation IA Excel, formation IA PowerPoint, intelligence artificielle Office 365, formation IA entreprise, Claude IA Microsoft',
  })
  const isMobile = useIsMobile()

  return (
    <main style={{ background: C.bg, minHeight: 'calc(100vh - 72px)', color: C.text, overflowX: 'hidden' }}>

      {/* Blobs décoratifs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <motion.div animate={{ scale: [1, 1.2, 1], x: [0, 40, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: -300, right: -200, width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,120,212,0.06) 0%, transparent 65%)' }} />
        <motion.div animate={{ scale: [1, 1.15, 1], y: [0, 50, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          style={{ position: 'absolute', bottom: -200, left: -200, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,79,216,0.05) 0%, transparent 65%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Breadcrumb */}
        <div style={{ padding: isMobile ? '6px 20px 0' : '6px 48px 0' }}>
          <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Formation', to: '/formation/cpf' }, { label: 'Claude AI & Microsoft 365' }]} />

        </div>

        {/* ══════════════════════════════════════
            1. HERO
        ══════════════════════════════════════ */}
        <section style={{ padding: isMobile ? '12px 20px 40px' : '16px 48px 52px', minHeight: isMobile ? 'auto' : 'calc(100vh - 108px)', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '48% 52%', gap: isMobile ? '28px' : '32px', alignItems: 'stretch' }}>

          <div>
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', border: '1px solid rgba(0,120,212,0.25)', background: 'rgba(0,120,212,0.07)', marginBottom: '24px' }}>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
                style={{ width: 8, height: 8, borderRadius: '50%', background: `linear-gradient(135deg, ${C.outlook}, ${C.blue})`, flexShrink: 0, display: 'block' }} />
              <span style={{ color: C.outlook, fontSize: '13px', fontWeight: 600 }}>Formation Claude IA · Pack Office 365 · Financement OPCO disponible</span>
            </motion.div>

            {/* H1 */}
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}
              style={{ fontWeight: 900, fontSize: isMobile ? '2rem' : 'clamp(2.3rem, 4.5vw, 3.7rem)', lineHeight: 1.08, letterSpacing: '-0.03em', margin: '0 0 6px', color: C.text }}>
              L'intelligence artificielle de Claude IA.
            </motion.h1>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.14 }}
              style={{ fontWeight: 900, fontSize: isMobile ? '2rem' : 'clamp(2.3rem, 4.5vw, 3.7rem)', lineHeight: 1.08, letterSpacing: '-0.03em', margin: '0 0 24px' }}>
              La puissance de{' '}
              <motion.span animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundImage: `linear-gradient(135deg, ${C.outlook}, ${C.blue}, ${C.violet}, ${C.outlook})`, backgroundSize: '250%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Microsoft 365.
              </motion.span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2 }}
              style={{ color: C.muted, fontSize: isMobile ? '15px' : '17px', lineHeight: 1.75, margin: '0 0 36px', maxWidth: '500px' }}>
              Formez vos équipes à l'intelligence artificielle avec Claude IA dans le pack Office 365 — Outlook, Word, PowerPoint et Excel. Récupérez 3 heures par jour et produisez des livrables de meilleure qualité.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.26 }}
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link to="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '15px 32px', borderRadius: '999px', fontWeight: 700, fontSize: '15px',
                  background: `linear-gradient(135deg, ${C.outlook}, ${C.blue})`, color: '#fff', textDecoration: 'none',
                  boxShadow: `0 6px 28px rgba(0,120,212,0.35)`,
                }}>
                  Former mes équipes, gagner du temps
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
                <a href="#modules" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '15px 28px', borderRadius: '999px', fontWeight: 600, fontSize: '15px',
                  color: C.blue, textDecoration: 'none', border: `1.5px solid rgba(59,79,216,0.25)`,
                }}>
                  Voir les modules
                </a>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }}
              style={{ display: 'flex', gap: isMobile ? '10px' : '20px', flexWrap: 'wrap' }}>
              {[
                { text: '100% pratique' },
                { text: 'Financement OPCO' },
                { text: 'Données sécurisées RGPD' },
              ].map(g => (
                <span key={g.text} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: C.muted, fontWeight: 500 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {g.text}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Player vidéo hero */}
          <motion.div initial={{ opacity: 0, x: isMobile ? 0 : 36, y: isMobile ? 24 : 0 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.7, delay: 0.22 }}
            style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginTop: isMobile ? 0 : '48px' }}>
            <VideoTabs isMobile={isMobile} />
          </motion.div>
        </section>

        {/* ══════════════════════════════════════
            2. BANDE STATS
        ══════════════════════════════════════ */}
        <section style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '0 20px' : '0 48px', display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)' }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ borderRight: (!isMobile && i < 3) ? `1px solid ${C.border}` : 'none', borderBottom: (isMobile && i < 2) ? `1px solid ${C.border}` : 'none' }}>
                <StatCounter stat={s} />
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            3. PROBLÈMES
        ══════════════════════════════════════ */}
        <section style={{ padding: isMobile ? '48px 20px' : '72px 48px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '32px' }}>
              <span style={{ color: C.rose, fontSize: '12px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>Le diagnostic</span>
              <h2 style={{ color: C.text, fontWeight: 900, fontSize: isMobile ? '1.85rem' : 'clamp(1.85rem, 3.2vw, 2.7rem)', lineHeight: 1.15, letterSpacing: '-0.03em', margin: '0 0 18px' }}>
                Microsoft 365 est puissant.{' '}
                <span style={{ color: C.rose }}>Mais sans IA, vous n'en exploitez que 20%.</span>
              </h2>
              <p style={{ color: C.muted, fontSize: '16px', lineHeight: 1.75, maxWidth: '520px', margin: '0 auto' }}>
                Vos outils du quotidien sont sous-utilisés. Le résultat : du temps perdu, des livrables en retard, des données qui ne parlent pas.
              </p>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {PROBLEMS.map((p, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  style={{ display: 'flex', gap: '16px', padding: isMobile ? '14px 16px' : '16px 20px', background: '#fff', border: `1.5px solid ${C.border}`, borderRadius: '16px', alignItems: 'center' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '14px', background: `${p.color}10`, border: `1.5px solid ${p.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: '9px' }}>
                    <img src={p.logo} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: C.text, fontWeight: 800, fontSize: isMobile ? '13.5px' : '14.5px', margin: '0 0 4px', lineHeight: 1.3 }}>{p.title}</p>
                    <p style={{ color: C.muted, fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ marginTop: '48px', padding: '28px 32px', background: `linear-gradient(135deg, rgba(0,120,212,0.06), rgba(59,79,216,0.06))`, borderRadius: '20px', border: `1.5px solid rgba(0,120,212,0.12)`, textAlign: 'center' }}>
              <p style={{ color: C.text, fontWeight: 800, fontSize: isMobile ? '16px' : '18px', margin: '0 0 8px', lineHeight: 1.4 }}>
                Ce n'est pas un problème de compétence. C'est un problème <span style={{ color: C.outlook }}>d'outillage.</span>
              </p>
              <p style={{ color: C.muted, fontSize: '14px', lineHeight: 1.65, margin: 0 }}>
                Claude est l'IA la plus précise pour la rédaction nuancée et la gestion de données complexes. Maîtrisez-la dans votre environnement Microsoft — et tout change.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            4. MODULES
        ══════════════════════════════════════ */}
        <section id="modules" style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: isMobile ? '64px 20px' : '96px 48px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '56px' }}>
              <span style={{ color: C.blue, fontSize: '12px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>Le programme</span>
              <h2 style={{ color: C.text, fontWeight: 900, fontSize: isMobile ? '1.85rem' : 'clamp(1.85rem, 3.2vw, 2.7rem)', lineHeight: 1.15, letterSpacing: '-0.03em', margin: '0 0 16px' }}>
                4 modules. 4 applications. Un seul objectif : <span style={{ color: C.blue }}>votre productivité augmentée.</span>
              </h2>
              <p style={{ color: C.muted, fontSize: '16px', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
                Chaque module est autonome et directement applicable le lendemain de la formation.
              </p>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '20px' }}>
              {MODULES.map((mod, i) => <ModuleCard key={i} mod={mod} i={i} />)}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            5. POUR QUI
        ══════════════════════════════════════ */}
        <section style={{ padding: isMobile ? '64px 20px' : '96px 48px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '52px' }}>
              <span style={{ color: C.violet, fontSize: '12px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>Pour qui ?</span>
              <h2 style={{ color: C.text, fontWeight: 900, fontSize: isMobile ? '1.85rem' : 'clamp(1.85rem, 3.2vw, 2.7rem)', lineHeight: 1.15, letterSpacing: '-0.03em', margin: '0 0 16px' }}>
                Conçue pour les professionnels qui produisent.
              </h2>
              <p style={{ color: C.muted, fontSize: '16px', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
                Peu importe votre niveau avec l'IA — si vous utilisez Microsoft 365 au quotidien, cette formation vous transforme.
              </p>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
              {PROFILES.map((p, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  whileHover={{ y: -6, boxShadow: `0 16px 40px ${p.color}14`, borderColor: `${p.color}30`, transition: { duration: 0.25 } }}
                  style={{ background: '#fff', border: `1.5px solid ${C.border}`, borderRadius: '18px', padding: '24px 20px', textAlign: 'center' }}>
                  <p style={{ color: C.text, fontWeight: 800, fontSize: '14px', margin: '0 0 5px' }}>{p.label}</p>
                  <p style={{ color: C.muted, fontSize: '12.5px', margin: 0, lineHeight: 1.55 }}>{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            6. AVANT / APRÈS
        ══════════════════════════════════════ */}
        <section style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: isMobile ? '64px 20px' : '96px 48px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '52px' }}>
              <span style={{ color: C.green, fontSize: '12px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>La transformation</span>
              <h2 style={{ color: C.text, fontWeight: 900, fontSize: isMobile ? '1.85rem' : 'clamp(1.85rem, 3.2vw, 2.7rem)', lineHeight: 1.15, letterSpacing: '-0.03em', margin: 0 }}>
                Votre journée de travail — avant et après.
              </h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '16px' : '28px' }}>
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
                        <span style={{ color: '#EF4444', fontSize: '14px', fontWeight: 700, flexShrink: 0, lineHeight: 1.6 }}>—</span>
                        <span style={{ color: C.muted, fontSize: '14px', lineHeight: 1.6 }}>{row.before}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
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

        {/* ══════════════════════════════════════
            7. SÉCURITÉ / RGPD
        ══════════════════════════════════════ */}
        <section style={{ padding: isMobile ? '64px 20px' : '96px 48px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span style={{ color: C.green, fontSize: '12px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>Sécurité & conformité</span>
              <h2 style={{ color: C.text, fontWeight: 900, fontSize: isMobile ? '1.85rem' : 'clamp(1.85rem, 3.2vw, 2.6rem)', lineHeight: 1.15, letterSpacing: '-0.03em', margin: '0 0 16px' }}>
                Votre IA. <span style={{ color: C.green }}>Vos données protégées.</span>
              </h2>
              <p style={{ color: C.muted, fontSize: '16px', maxWidth: '520px', margin: '0 auto', lineHeight: 1.75 }}>
                L'adoption de l'IA en entreprise ne doit pas se faire au détriment de la confidentialité. Nous vous formons aux bonnes pratiques dès le premier jour.
              </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
              {[
                {
                  color: C.green,
                  title: 'Connecteurs officiels',
                  desc: 'Utilisation via les API et connecteurs officiels Anthropic — aucune donnée transmise sans protocole sécurisé.',
                },
                {
                  color: C.blue,
                  title: 'Conformité RGPD',
                  desc: 'Formation aux bonnes pratiques : quelles données saisir, comment anonymiser, où poser les limites.',
                },
                {
                  color: C.violet,
                  title: 'Souveraineté des données',
                  desc: 'Vos documents restent dans votre environnement Microsoft. Rien n\'est stocké ou réutilisé par l\'IA sans votre contrôle.',
                },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  style={{ background: '#fff', border: `1.5px solid ${C.border}`, borderRadius: '20px', padding: '28px 24px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${item.color}, ${item.color}40)` }} />
                  <div style={{ width: 44, height: 44, borderRadius: '14px', background: `${item.color}12`, border: `1.5px solid ${item.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: item.color }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <h3 style={{ color: C.text, fontWeight: 800, fontSize: '15px', margin: '0 0 8px' }}>{item.title}</h3>
                  <p style={{ color: C.muted, fontSize: '13.5px', lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            8. FAQ
        ══════════════════════════════════════ */}
        <section style={{ background: C.card, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: isMobile ? '64px 20px' : '96px 48px' }}>
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

        {/* ══════════════════════════════════════
            9. CTA FINALE
        ══════════════════════════════════════ */}
        <section style={{ padding: isMobile ? '64px 20px 80px' : '80px 48px 96px' }}>
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ maxWidth: '1000px', margin: '0 auto', background: 'linear-gradient(135deg, #0F0C1E 0%, #071E3D 50%, #0F0C1E 100%)', borderRadius: '28px', padding: isMobile ? '48px 28px' : '72px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>

            <div style={{ position: 'absolute', top: -100, left: '15%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, rgba(0,120,212,0.22) 0%, transparent 65%)`, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -80, right: '10%', width: 350, height: 350, borderRadius: '50%', background: `radial-gradient(circle, rgba(59,79,216,0.18) 0%, transparent 65%)`, pointerEvents: 'none' }} />

            <div style={{ position: 'relative' }}>
              <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.5, repeat: Infinity }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.07)', marginBottom: '28px' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', display: 'block' }} />
                <span style={{ color: 'rgba(255,255,255,0.80)', fontSize: '13px', fontWeight: 600 }}>Réponse sous 24h — Financement OPCO disponible</span>
              </motion.div>

              <h2 style={{ color: '#fff', fontWeight: 900, fontSize: isMobile ? '2rem' : 'clamp(2rem, 4.2vw, 3.2rem)', lineHeight: 1.12, letterSpacing: '-0.035em', margin: '0 0 20px' }}>
                Récupérez 3 heures par jour.{' '}
                <br />
                <motion.span animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  style={{ backgroundImage: `linear-gradient(135deg, #60A5FA, #A78BFA, #34D399, #60A5FA)`, backgroundSize: '250%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Dès demain.
                </motion.span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: isMobile ? '15px' : '17px', lineHeight: 1.75, margin: '0 0 40px', maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto' }}>
                Réservez un audit de productivité gratuit. Nous analysons votre usage Microsoft 365 et vous montrons exactement où Claude peut transformer votre quotidien.
              </p>

              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
                  <Link to="/contact" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '10px',
                    padding: '17px 44px', borderRadius: '999px', fontWeight: 800, fontSize: '16px',
                    background: `linear-gradient(135deg, ${C.outlook}, ${C.blue})`,
                    color: '#fff', textDecoration: 'none',
                    boxShadow: '0 8px 48px rgba(0,120,212,0.45)',
                  }}>
                    Former mes équipes, gagner du temps
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03, y: -3 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
                  <a href="#modules" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '17px 32px', borderRadius: '999px', fontWeight: 600, fontSize: '15px',
                    color: 'rgba(255,255,255,0.75)', textDecoration: 'none',
                    border: '1.5px solid rgba(255,255,255,0.18)',
                  }}>
                    Voir les modules
                  </a>
                </motion.div>
              </div>

              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '13px', marginTop: '20px' }}>
                Audit gratuit · Sans engagement · Certification organisme de formation · Financement OPCO possible
              </p>
            </div>
          </motion.div>
        </section>

      </div>
    </main>
  )
}
