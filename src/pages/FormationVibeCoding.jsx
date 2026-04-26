import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useSEO } from '../hooks/useSEO'
import useIsMobile from '../hooks/useIsMobile'

const ACCENT = '#C030E8'
const ACCENT2 = '#3B4FD8'

const TOOLS = [
  {
    name: 'VS Code',
    desc: 'L\'éditeur de référence mondiale. Avec les bonnes extensions IA, il devient un environnement de développement surpuissant — même pour un débutant.',
    color: '#007ACC',
    logo: <img src="/logos/vscode.svg" alt="VS Code" style={{ width: 28, height: 28, objectFit: 'contain' }} />,
  },
  {
    name: 'Claude Code',
    desc: 'L\'agent IA d\'Anthropic dans votre terminal. Décrivez votre projet en langage naturel — Claude Code lit votre code, comprend le contexte et génère des fichiers entiers.',
    color: '#D97706',
    logo: <img src="/logos/claude-logo.png" alt="Claude Code" style={{ width: 28, height: 28, objectFit: 'contain', mixBlendMode: 'multiply' }} />,
  },
  {
    name: 'OpenAI Codex',
    desc: 'Le modèle qui a révolutionné la génération de code. Intégré à ChatGPT et GitHub Copilot, il traduit vos intentions en code fonctionnel instantanément.',
    color: '#111827',
    logo: <img src="/logos/chatgpt.webp" alt="OpenAI Codex" style={{ width: 28, height: 28, objectFit: 'contain' }} />,
  },
  {
    name: 'Cursor',
    desc: 'L\'IDE entièrement repensé autour de l\'IA. Générez, refactorisez et déployez du code en quelques mots — le Vibe Coding dans sa forme la plus pure.',
    color: '#6366F1',
    logo: <img src="/logos/cursor.svg" alt="Cursor" style={{ width: 28, height: 28, objectFit: 'contain', borderRadius: '6px' }} />,
  },
]

const MODULES = [
  {
    num: '01',
    title: 'Comprendre le Vibe Coding',
    items: ['Qu\'est-ce que le Vibe Coding et pourquoi ça change tout', 'Comment l\'IA lit, comprend et écrit du code à votre place', 'Cas d\'usage réels : sites, SaaS, automatisations'],
    accent: ACCENT2,
  },
  {
    num: '02',
    title: 'Maîtriser les outils',
    items: ['VS Code + extensions IA : votre environnement de travail', 'Claude Code : coder depuis le terminal en langage naturel', 'OpenAI Codex & Cursor : générer des projets complets'],
    accent: '#7B4FE8',
  },
  {
    num: '03',
    title: 'Construire son premier site',
    items: ['De la maquette à la mise en ligne sans écrire une ligne', 'Structurer un projet web : pages, navigation, responsive', 'Déployer son site en production — rapide et propre'],
    accent: ACCENT,
  },
  {
    num: '04',
    title: 'Lancer son premier SaaS',
    items: ['Définir le périmètre d\'un MVP SaaS réaliste', 'Authentification, base de données, paiement — guidé par l\'IA', 'Plan de lancement : de l\'idée au premier utilisateur'],
    accent: '#E83B9B',
  },
]

const STATS = [
  { val: '10×', label: 'Plus rapide', sub: 'qu\'un dev classique' },
  { val: '0', label: 'Expérience requise', sub: 'en programmation' },
  { val: 'SaaS', label: 'À la clé', sub: 'votre premier produit' },
]

const OUTCOMES = [
  { text: 'Coder un site internet complet, de zéro, sans blocage' },
  { text: 'Lancer votre premier SaaS avec authentification et paiement' },
  { text: 'Utiliser VS Code, Claude Code et Codex comme un pro' },
  { text: 'Déployer en production et partager votre projet' },
  { text: 'Itérer rapidement sur n\'importe quelle idée technique' },
  { text: 'Ne plus jamais bloquer devant un problème de code' },
]

function ModuleCard({ mod, i, isMobile }) {
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] } }}
      viewport={{ once: true }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ borderColor: `${mod.accent}55`, boxShadow: `0 20px 56px ${mod.accent}18`, transition: { duration: 0.22 } }}
      style={{
        background: '#F9F8FF', border: '1.5px solid rgba(59,79,216,0.09)',
        borderRadius: '20px', padding: isMobile ? '24px 20px' : '32px',
        position: 'relative', overflow: 'hidden',
        rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 800,
      }}
    >
      <motion.div
        initial={{ opacity: 0 }} whileHover={{ opacity: 1, transition: { duration: 0.3 } }}
        style={{ position: 'absolute', inset: 0, borderRadius: '20px', pointerEvents: 'none', background: `radial-gradient(ellipse at 30% 0%, ${mod.accent}14 0%, transparent 65%)` }}
      />
      <div style={{ position: 'absolute', top: 14, right: 18, fontSize: '48px', fontWeight: 900, lineHeight: 1, userSelect: 'none', pointerEvents: 'none', background: `linear-gradient(135deg, ${mod.accent}28, transparent)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {mod.num}
      </div>
      <div style={{ width: 40, height: 40, borderRadius: '10px', background: `linear-gradient(135deg, ${mod.accent}28, ${mod.accent}12)`, border: `1px solid ${mod.accent}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: mod.accent, marginBottom: '16px' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
        </svg>
      </div>
      <h3 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '16px', marginBottom: '16px', letterSpacing: '-0.01em' }}>{mod.title}</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
        {mod.items.map((item) => (
          <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <span style={{ width: 16, height: 16, borderRadius: '50%', background: `linear-gradient(135deg, ${mod.accent}22, ${mod.accent}10)`, border: `1px solid ${mod.accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={mod.accent} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            <span style={{ color: '#374151', fontSize: '13.5px', lineHeight: 1.6 }}>{item}</span>
          </li>
        ))}
      </ul>
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1, transition: { duration: 0.6, delay: i * 0.1 + 0.3 } }}
        viewport={{ once: true }}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${mod.accent}, transparent)` }}
      />
    </motion.div>
  )
}

export default function FormationVibeCoding() {
  const isMobile = useIsMobile()

  useSEO({
    title: 'Formation Vibe Coding — Codez votre premier site et SaaS avec l\'IA | Smart Optimisation',
    description: 'Apprenez le Vibe Coding avec VS Code, Claude Code et OpenAI Codex. À la fin : vous codez des sites web complets et lancez votre premier SaaS. Aucune expérience requise.',
    path: '/formation/vibe-coding',
    keywords: 'vibe coding, formation IA, VS Code, Claude Code, OpenAI Codex, Cursor, créer site internet IA, lancer SaaS, Smart Optimisation',
  })

  return (
    <main>
      {/* HERO */}
      <section style={{
        position: 'relative', overflow: 'hidden', background: '#ffffff',
        padding: isMobile ? '48px 24px 40px' : '72px 48px 56px',
      }}>
        <motion.div animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: -180, right: -120, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,48,232,0.07) 0%, transparent 70%)', pointerEvents: 'none' }}
        />
        <motion.div animate={{ scale: [1, 1.1, 1], y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ position: 'absolute', bottom: -100, left: -80, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,79,216,0.06) 0%, transparent 70%)', pointerEvents: 'none' }}
        />

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: `${ACCENT}12`, border: `1px solid ${ACCENT}30`, marginBottom: '20px' }}
          >
            <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: `linear-gradient(135deg, ${ACCENT2}, ${ACCENT})`, flexShrink: 0, display: 'block' }}
            />
            <span style={{ color: ACCENT, fontSize: '13px', fontWeight: 600 }}>Tendance 2025 — Nouvelle formation</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}
            style={{ color: '#0F0C1E', fontWeight: 800, fontSize: isMobile ? '2rem' : 'clamp(2.2rem, 4vw, 3.2rem)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '16px' }}
          >
            Vibe Coding —{' '}
            <motion.span
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundImage: `linear-gradient(135deg, ${ACCENT2}, ${ACCENT}, #E83B9B, ${ACCENT2})`, backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              codez avec l'IA
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}
            style={{ color: '#374151', fontSize: isMobile ? '15px' : '17px', lineHeight: 1.7, marginBottom: '32px', maxWidth: '640px' }}
          >
            VS Code, Claude Code, OpenAI Codex — les outils qui permettent aujourd'hui de coder des sites web complets et de lancer son premier SaaS, sans jamais avoir touché une ligne de code. À la fin de cette formation, vous n'aurez plus aucune excuse pour ne pas commencer.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24 }}
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '36px' }}
          >
            {STATS.map((s) => (
              <div key={s.label} style={{ padding: '14px 20px', borderRadius: '14px', background: '#F9F8FF', border: '1.5px solid rgba(59,79,216,0.09)', minWidth: '120px' }}>
                <p style={{ margin: 0, fontWeight: 800, fontSize: '22px', color: '#0F0C1E', letterSpacing: '-0.02em' }}>{s.val}</p>
                <p style={{ margin: '2px 0 0', fontSize: '12px', fontWeight: 600, color: ACCENT }}>{s.label}</p>
                <p style={{ margin: 0, fontSize: '11px', color: '#6B7280' }}>{s.sub}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA — sans CPF */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.32 }}
          >
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
              <Link to="/contact" style={{ display: 'block', padding: '14px 36px', borderRadius: '999px', fontWeight: 700, fontSize: '15px', color: '#fff', background: `linear-gradient(135deg, ${ACCENT2}, ${ACCENT})`, textDecoration: 'none', boxShadow: `0 6px 24px ${ACCENT}38`, textAlign: 'center' }}>
                Je veux me former →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CE QUE VOUS SAUREZ FAIRE */}
      <section style={{ background: '#F9F8FF', padding: isMobile ? '56px 24px' : '80px 48px', borderTop: '1px solid rgba(59,79,216,0.07)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 0.4 } }} viewport={{ once: true }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 16px', borderRadius: '999px', border: `1px solid ${ACCENT}28`, background: `${ACCENT}0D`, marginBottom: '20px' }}
            >
              <span style={{ color: ACCENT, fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>À la fin de cette formation</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.06 } }} viewport={{ once: true }}
              style={{ color: '#0F0C1E', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', letterSpacing: '-0.02em', margin: '0 0 12px' }}
            >
              Vous serez capable de tout construire
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.12 } }} viewport={{ once: true }}
              style={{ color: '#6B7280', fontSize: '15px', maxWidth: '500px', margin: '0 auto', lineHeight: 1.65 }}
            >
              Pas de promesses vagues. Voici ce que vous saurez faire concrètement dès la fin du dernier module.
            </motion.p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '14px' }}>
            {OUTCOMES.map((o, i) => (
              <motion.div
                key={o.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] } }}
                viewport={{ once: true }}
                whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(59,79,216,0.10)', borderColor: 'rgba(59,79,216,0.22)', transition: { duration: 0.18 } }}
                style={{ background: '#fff', border: '1.5px solid rgba(59,79,216,0.09)', borderRadius: '16px', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}
              >
                <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(59,79,216,0.2), rgba(192,48,232,0.12))', border: '1px solid rgba(59,79,216,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <span style={{ color: '#1F2937', fontSize: '14px', fontWeight: 500, lineHeight: 1.5 }}>{o.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTILS */}
      <section style={{ background: '#fff', padding: isMobile ? '56px 24px' : '80px 48px', borderTop: '1px solid rgba(59,79,216,0.07)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 0.4 } }} viewport={{ once: true }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 16px', borderRadius: '999px', border: '1px solid rgba(59,79,216,0.18)', background: 'rgba(59,79,216,0.07)', marginBottom: '20px' }}
            >
              <span style={{ color: ACCENT2, fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Les outils enseignés</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.06 } }} viewport={{ once: true }}
              style={{ color: '#0F0C1E', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', letterSpacing: '-0.02em', margin: '0 0 12px' }}
            >
              VS Code, Claude Code, Codex & Cursor
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.12 } }} viewport={{ once: true }}
              style={{ color: '#6B7280', fontSize: '15px', maxWidth: '480px', margin: '0 auto', lineHeight: 1.65 }}
            >
              Chaque outil a ses forces. Vous repartez en sachant lequel utiliser selon votre projet et votre niveau.
            </motion.p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '16px' }}>
            {TOOLS.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.09, ease: [0.4, 0, 0.2, 1] } }}
                viewport={{ once: true }}
                whileHover={{ y: -4, boxShadow: `0 16px 40px ${tool.color}18`, borderColor: `${tool.color}40`, transition: { duration: 0.2 } }}
                style={{ background: '#F9F8FF', border: '1.5px solid rgba(59,79,216,0.09)', borderRadius: '18px', padding: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}
              >
                <div style={{ width: 44, height: 44, borderRadius: '12px', background: `${tool.color}14`, border: `1px solid ${tool.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {tool.logo}
                </div>
                <div>
                  <p style={{ margin: '0 0 6px', fontWeight: 700, fontSize: '15px', color: '#0F0C1E' }}>{tool.name}</p>
                  <p style={{ margin: 0, fontSize: '13.5px', color: '#6B7280', lineHeight: 1.6 }}>{tool.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMME */}
      <section style={{ background: '#F9F8FF', padding: isMobile ? '56px 24px' : '80px 48px', borderTop: '1px solid rgba(59,79,216,0.07)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 0.4 } }} viewport={{ once: true }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 16px', borderRadius: '999px', border: `1px solid ${ACCENT}28`, background: `${ACCENT}0D`, marginBottom: '20px' }}
            >
              <span style={{ color: ACCENT, fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Programme</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.06 } }} viewport={{ once: true }}
              style={{ color: '#0F0C1E', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', letterSpacing: '-0.02em', margin: '0 0 12px' }}
            >
              4 modules, du site au SaaS
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.12 } }} viewport={{ once: true }}
              style={{ color: '#6B7280', fontSize: '15px', maxWidth: '460px', margin: '0 auto', lineHeight: 1.65 }}
            >
              De la prise en main des outils à la mise en ligne de votre premier produit.
            </motion.p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '18px' }}>
            {MODULES.map((mod, i) => <ModuleCard key={mod.num} mod={mod} i={i} isMobile={isMobile} />)}
          </div>
        </div>
      </section>

      {/* CTA FINAL — sans CPF */}
      <section style={{ background: '#fff', padding: isMobile ? '56px 24px' : '80px 48px', borderTop: '1px solid rgba(59,79,216,0.07)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }} viewport={{ once: true }}
          >
            <div style={{ width: 56, height: 56, borderRadius: '16px', background: `linear-gradient(135deg, ${ACCENT2}, ${ACCENT})`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: `0 8px 24px ${ACCENT}38` }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <h2 style={{ color: '#0F0C1E', fontWeight: 800, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-0.02em', marginBottom: '14px' }}>
              Prêt à lancer votre premier projet ?
            </h2>
            <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 32px' }}>
              Contactez-nous pour connaître les prochaines sessions, construire le programme adapté à vos objectifs et passer de l'idée au produit.
            </p>
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
              <Link to="/contact" style={{ display: 'block', padding: '14px 48px', borderRadius: '999px', fontWeight: 700, fontSize: '15px', color: '#fff', background: `linear-gradient(135deg, ${ACCENT2}, ${ACCENT})`, textDecoration: 'none', boxShadow: `0 6px 24px ${ACCENT}38`, textAlign: 'center' }}>
                Nous contacter
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
