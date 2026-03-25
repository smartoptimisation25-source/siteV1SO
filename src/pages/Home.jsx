import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import ClientsMarquee from '../components/ClientsMarquee'
import { useSEO } from '../hooks/useSEO'
import useIsMobile from '../hooks/useIsMobile'

const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1], delay: i * 0.12 },
  }),
}

const DNA_PILLARS = [
  {
    num: '01',
    titre: 'Notre conviction',
    corps: "L'IA n'est pas une révolution qui arrive sur vous — c'est un outil que vous pouvez maîtriser. Notre rôle : faire en sorte que vous restiez aux commandes, quel que soit votre point de départ.",
    accent: '#3B4FD8',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
  },
  {
    num: '02',
    titre: 'Notre méthode',
    corps: "Pas de copier-coller. Chaque accompagnement est construit autour de votre réalité : vos outils, votre secteur, vos contraintes. Du sur-mesure, ou rien.",
    accent: '#7B4FE8',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    num: '03',
    titre: 'Notre engagement',
    corps: "Qu'il s'agisse de former un enfant de 10 ans, un manager ou une équipe entière — nous apportons la même exigence. Pas de client de seconde zone.",
    accent: '#9B30E8',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    num: '04',
    titre: 'Notre impact',
    corps: "Ce qui nous anime, ce n'est pas la technologie pour elle-même. C'est le moment où quelqu'un nous dit : « maintenant je comprends, et je sais quoi en faire. »",
    accent: '#C030E8',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
]

const SERVICE_LINKS = [
  {
    label: 'Formation CPF & OPCO',
    sub: 'Financement 100% pris en charge',
    to: '/formation/cpf',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    label: 'Solution IA sur mesure',
    sub: 'Intégrée à vos processus',
    to: '/solution-ia',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M4.93 4.93a10 10 0 0 0 0 14.14"/>
      </svg>
    ),
  },
  {
    label: 'Éduc IA',
    sub: 'Pour les 8–15 ans',
    to: '/educ-ia',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
]

/* Carte ADN avec tilt 3D */
function DNACard({ pillar, i }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 })

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
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] } }}
      viewport={{ once: true }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{
        borderColor: `${pillar.accent}55`,
        boxShadow: `0 24px 64px ${pillar.accent}18`,
        transition: { duration: 0.25 },
      }}
      style={{
        background: '#F9F8FF',
        border: '1.5px solid rgba(59,79,216,0.09)',
        borderRadius: '24px',
        padding: '36px 32px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        rotateX, rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 800,
      }}
    >
      {/* Lueur de fond au survol */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1, transition: { duration: 0.3 } }}
        style={{
          position: 'absolute', inset: 0, borderRadius: '24px', pointerEvents: 'none',
          background: `radial-gradient(ellipse at 30% 0%, ${pillar.accent}18 0%, transparent 65%)`,
        }}
      />

      {/* Numéro décoratif */}
      <motion.div
        whileHover={{ scale: 1.15, transition: { duration: 0.3 } }}
        style={{
          position: 'absolute', top: 16, right: 20,
          fontSize: '56px', fontWeight: 900, lineHeight: 1,
          userSelect: 'none', pointerEvents: 'none',
          background: `linear-gradient(135deg, ${pillar.accent}30, transparent)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}
      >
        {pillar.num}
      </motion.div>

      {/* Icône */}
      <motion.div
        whileHover={{ rotate: [0, -10, 10, -5, 5, 0], scale: 1.1, transition: { duration: 0.5 } }}
        style={{
          width: 44, height: 44, borderRadius: '12px',
          background: `linear-gradient(135deg, ${pillar.accent}30, ${pillar.accent}18)`,
          border: `1px solid ${pillar.accent}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: pillar.accent, marginBottom: '20px',
        }}
      >
        {pillar.icon}
      </motion.div>

      <h3 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '17px', marginBottom: '12px', letterSpacing: '-0.01em' }}>
        {pillar.titre}
      </h3>
      <p style={{ color: '#6B7280', fontSize: '14px', lineHeight: 1.75, margin: 0 }}>
        {pillar.corps}
      </p>

      {/* Trait de couleur en bas */}
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1, transition: { duration: 0.6, delay: i * 0.1 + 0.3 } }}
        viewport={{ once: true }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, ${pillar.accent}, transparent)`,
        }}
      />
    </motion.div>
  )
}

function ADNSection() {
  const isMobile = useIsMobile()
  return (
    <section style={{ background: '#fff', position: 'relative', overflow: 'hidden', padding: isMobile ? '64px 20px' : '112px 48px', borderTop: '1px solid rgba(59,79,216,0.07)' }}>

      {/* Blobs */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: -200, left: -200, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,79,216,0.06) 0%, transparent 65%)', pointerEvents: 'none' }}
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{ position: 'absolute', bottom: -150, right: -150, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,48,232,0.05) 0%, transparent 65%)', pointerEvents: 'none' }}
      />
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,48,232,0.04) 0%, transparent 70%)', pointerEvents: 'none' }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Entête ── */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            viewport={{ once: true }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', borderRadius: '999px', border: '1px solid rgba(59,79,216,0.18)', background: 'rgba(59,79,216,0.07)', marginBottom: '28px' }}
          >
            <motion.span
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg,#3B4FD8,#9B30E8)', flexShrink: 0, display: 'block' }}
            />
            <span style={{ color: '#3B4FD8', fontSize: '13px', fontWeight: 600, letterSpacing: '0.02em' }}>L'ADN de Smart Optimisation</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.08 } }}
            viewport={{ once: true }}
            style={{ color: '#0F0C1E', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '0' }}
          >
            Nous ne vendons pas de la technologie.
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.16 } }}
            viewport={{ once: true }}
            style={{ fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.15, letterSpacing: '-0.025em', margin: '0 0 28px' }}
          >
            <motion.span
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundImage: 'linear-gradient(135deg,#3B4FD8,#9B30E8,#E83B9B,#3B4FD8)', backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              Nous aidons les humains à s'en emparer.
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.25 } }}
            viewport={{ once: true }}
            style={{ color: '#6B7280', fontSize: '16px', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}
          >
            Depuis notre création, une seule boussole : que chaque personne que nous accompagnons reparte avec plus de clarté qu'avant.
          </motion.p>
        </div>

        {/* ── Ligne de séparation ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } }}
          viewport={{ once: true }}
          style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(59,79,216,0.20), rgba(155,48,232,0.20), transparent)', marginBottom: '72px', originX: 0.5 }}
        />

        {/* ── 4 piliers ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '80px' }}>
          {DNA_PILLARS.map((pillar, i) => <DNACard key={i} pillar={pillar} i={i} />)}
        </div>

        {/* ── Ligne de séparation basse ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1, transition: { duration: 0.8 } }}
          viewport={{ once: true }}
          style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(59,79,216,0.15), transparent)', marginBottom: '56px', originX: 0.5 }}
        />

        {/* ── Liens services ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          viewport={{ once: true }}
        >
          <p style={{ color: '#9CA3AF', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', marginBottom: '24px' }}>
            Ce que nous faisons concrètement
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {SERVICE_LINKS.map((s, i) => (
              <motion.div
                key={s.to}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.4 } }}
                viewport={{ once: true }}
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(59,79,216,0.12)', borderColor: 'rgba(59,79,216,0.30)', transition: { duration: 0.2 } }}
              >
                <Link
                  to={s.to}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '14px 22px', borderRadius: '16px',
                    background: '#fff',
                    border: '1.5px solid rgba(59,79,216,0.10)',
                    boxShadow: '0 4px 16px rgba(59,79,216,0.06)',
                    textDecoration: 'none',
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.1, transition: { type: 'spring', stiffness: 300 } }}
                    style={{ color: '#3B4FD8' }}
                  >
                    {s.icon}
                  </motion.div>
                  <div>
                    <p style={{ color: '#0F0C1E', fontWeight: 600, fontSize: '14px', margin: 0, lineHeight: 1.2 }}>{s.label}</p>
                    <p style={{ color: '#9CA3AF', fontSize: '11px', margin: 0 }}>{s.sub}</p>
                  </div>
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    style={{ color: '#3B4FD8', fontSize: '16px', marginLeft: '4px' }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}



const HOME_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://smartoptimisation.fr/#webpage',
  'url': 'https://smartoptimisation.fr/',
  'name': 'Formation IA Grand-Est — CPF, OPCO, Sur Mesure | Smart Optimisation',
  'description': 'Organisme de formation IA certifié Qualiopi dans le Grand-Est. CPF RS7411, OPCO 100% financé, formations sur mesure. Strasbourg, Nancy, Metz, Reims, Mulhouse.',
  'isPartOf': { '@id': 'https://smartoptimisation.fr/#website' },
  'about': { '@id': 'https://smartoptimisation.fr/#organization' },
  'breadcrumb': {
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://smartoptimisation.fr/' },
    ],
  },
}

export default function Home() {
  useSEO({
    title: 'Formation IA Grand-Est — CPF, OPCO, Sur Mesure | Smart Optimisation',
    description: 'Organisme de formation IA certifié Qualiopi dans le Grand-Est. CPF RS7411, OPCO 100% financé, formations sur mesure. Strasbourg, Nancy, Metz, Reims, Mulhouse.',
    path: '/',
    jsonLd: HOME_SCHEMA,
  })
  const isMobile = useIsMobile()

  return (
    <>
      {/* HERO */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        background: '#ffffff',
        minHeight: isMobile ? 'auto' : 'calc(100vh - 72px)',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        padding: isMobile ? '20px 24px 40px' : '20px 48px',
      }}>
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '-160px', left: '-120px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,79,216,0.08) 0%, transparent 70%)', pointerEvents: 'none' }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], x: [0, -15, 0], y: [0, 25, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ position: 'absolute', bottom: '-100px', right: '80px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,48,232,0.07) 0%, transparent 70%)', pointerEvents: 'none' }}
        />
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', background: 'radial-gradient(ellipse at top right, rgba(123,158,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }}
        />

        {/* LEFT */}
        <div style={{ position: 'relative', flex: '1', maxWidth: isMobile ? '100%' : '580px', zIndex: 2, width: '100%' }}>
          <motion.div variants={FADE_UP} initial="hidden" animate="show" custom={0}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'rgba(59,79,216,0.07)', border: '1px solid rgba(59,79,216,0.18)', marginBottom: '28px' }}>
            <motion.span
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', flexShrink: 0, display: 'block' }}
            />
            <span style={{ color: '#3B4FD8', fontSize: '13px', fontWeight: 600 }}>Experts en Intelligence Artificielle</span>
          </motion.div>

          <motion.h1 variants={FADE_UP} initial="hidden" animate="show" custom={1}
            style={{ color: '#0F0C1E', fontWeight: 800, fontSize: isMobile ? '2rem' : 'clamp(2.4rem, 4.5vw, 3.8rem)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '20px' }}>
            Maîtrisez l&apos;IA.{' '}
            <motion.span
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundImage: 'linear-gradient(135deg,#3B4FD8,#9B30E8,#E83B9B,#3B4FD8)', backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Élevez votre vision.
            </motion.span>
            <br />Multipliez votre impact.
          </motion.h1>

          <motion.p variants={FADE_UP} initial="hidden" animate="show" custom={2}
            style={{ color: '#6B7280', fontSize: isMobile ? '15px' : '17px', lineHeight: 1.7, marginBottom: '36px', maxWidth: isMobile ? '100%' : '460px' }}>
            Smart Optimisation accompagne les professionnels et les entreprises dans la maîtrise de l&apos;IA — de la formation à l&apos;intégration sur mesure.
          </motion.p>

          <motion.div variants={FADE_UP} initial="hidden" animate="show" custom={3}
            style={{ display: 'flex', gap: '12px', flexDirection: isMobile ? 'column' : 'row', flexWrap: 'wrap' }}>
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link to="/formation/cpf"
                style={{ padding: '14px 32px', borderRadius: '999px', fontWeight: 600, fontSize: '15px', color: '#fff', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', textDecoration: 'none', boxShadow: '0 4px 20px rgba(155,48,232,0.30)', display: 'block', textAlign: 'center' }}>
                Découvrir nos formations
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link to="/solution-ia"
                style={{ padding: '14px 32px', borderRadius: '999px', fontWeight: 600, fontSize: '15px', color: '#3B4FD8', textDecoration: 'none', border: '1.5px solid rgba(59,79,216,0.30)', display: 'block', textAlign: 'center' }}>
                Solutions IA
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={FADE_UP} initial="hidden" animate="show" custom={4}>
            <ClientsMarquee />
          </motion.div>
        </div>

        {/* RIGHT — mockup (desktop only) */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            style={{ position: 'relative', flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2 }}
          >
            <DashboardMockup />
          </motion.div>
        )}
      </section>

      {/* ADN */}
      <ADNSection />
    </>
  )
}

function DashboardMockup() {
  return (
    <div style={{ position: 'relative', width: '380px' }}>
      <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '24px', padding: '28px', boxShadow: '0 20px 60px rgba(59,79,216,0.10), 0 4px 16px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <p style={{ color: '#9CA3AF', fontSize: '12px', marginBottom: '4px' }}>Productivité IA</p>
            <p style={{ color: '#0F0C1E', fontWeight: 800, fontSize: '28px' }}>+340%</p>
          </div>
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1, transition: { type: 'spring', stiffness: 300 } }}
            style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(155,48,232,0.30)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
          </motion.div>
        </div>
        <svg width="100%" height="64" viewBox="0 0 320 64" fill="none" style={{ marginBottom: '24px' }}>
          <defs>
            <linearGradient id="lg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#3B4FD8" /><stop offset="100%" stopColor="#9B30E8" /></linearGradient>
            <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9B30E8" stopOpacity="0.15" /><stop offset="100%" stopColor="#9B30E8" stopOpacity="0" /></linearGradient>
          </defs>
          <path d="M0 52 C40 48 60 36 90 30 C120 24 140 40 170 28 C200 16 230 8 260 4 C280 2 300 6 320 2" stroke="url(#lg)" strokeWidth="2.5" fill="none" />
          <path d="M0 52 C40 48 60 36 90 30 C120 24 140 40 170 28 C200 16 230 8 260 4 C280 2 300 6 320 2 L320 64 L0 64Z" fill="url(#ag)" />
        </svg>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
          {[{ label: 'Formations', val: '24', unit: 'modules' }, { label: 'Clients', val: '150+', unit: 'entreprises' }, { label: 'Satisfaction', val: '98%', unit: 'taux' }].map((s) => (
            <motion.div
              key={s.label}
              whileHover={{ scale: 1.08, y: -3, boxShadow: '0 6px 20px rgba(59,79,216,0.12)', transition: { duration: 0.2 } }}
              style={{ background: '#F9F8FF', borderRadius: '12px', padding: '12px', border: '1px solid rgba(59,79,216,0.08)', cursor: 'default' }}
            >
              <p style={{ color: '#9CA3AF', fontSize: '11px', marginBottom: '4px' }}>{s.label}</p>
              <p style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '16px' }}>{s.val}</p>
              <p style={{ color: '#C4B8FF', fontSize: '10px' }}>{s.unit}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        style={{ position: 'absolute', top: '-28px', right: '-24px', background: '#fff', borderRadius: '16px', padding: '12px 18px', boxShadow: '0 8px 32px rgba(59,79,216,0.15)', border: '1px solid rgba(59,79,216,0.10)', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
        </div>
        <div>
          <p style={{ fontSize: '11px', color: '#9CA3AF', margin: 0 }}>Temps économisé</p>
          <p style={{ fontSize: '15px', fontWeight: 700, color: '#0F0C1E', margin: 0 }}>12h / semaine</p>
        </div>
      </motion.div>
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        style={{ position: 'absolute', bottom: '-24px', left: '-28px', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', borderRadius: '16px', padding: '12px 18px', boxShadow: '0 8px 28px rgba(155,48,232,0.35)', display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" /></svg>
        <div>
          <p style={{ fontSize: '11px', opacity: 0.7, margin: 0 }}>Automatisation</p>
          <p style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>Active</p>
        </div>
      </motion.div>
    </div>
  )
}
