import { Link } from 'react-router-dom'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { useSEO } from '../hooks/useSEO'
import useIsMobile from '../hooks/useIsMobile'

const SESSIONS = [
  { id: 1, rs: 'RS7411', titre: 'Utiliser l\'IA Générative en entreprise', lieu: 'Strasbourg', date: '14 avril 2025', duree: '7h présentiel', elearning: '14h e-learning', prix: 1500, inscrits: 9, places: 10, modalite: 'Présentiel', niveau: 'Tous niveaux' },
  { id: 2, rs: 'RS7411', titre: 'Utiliser l\'IA Générative en entreprise', lieu: 'Mulhouse', date: '28 avril 2025', duree: '7h présentiel', elearning: '14h e-learning', prix: 1500, inscrits: 6, places: 10, modalite: 'Présentiel', niveau: 'Tous niveaux' },
  { id: 3, rs: 'RS7411', titre: 'Utiliser l\'IA Générative en entreprise', lieu: 'Colmar', date: '5 mai 2025', duree: '7h présentiel', elearning: '14h e-learning', prix: 1500, inscrits: 3, places: 10, modalite: 'Présentiel', niveau: 'Tous niveaux' },
]

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1], delay: i * 0.08 },
  }),
}

function FillBar({ inscrits, places }) {
  const pct = Math.round((inscrits / places) * 100)
  const complet = inscrits >= places
  const color = complet ? '#EF4444' : pct >= 70 ? '#F59E0B' : '#10B981'
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <span style={{ fontSize: '12px', color: '#6B7280' }}>Taux de remplissage</span>
        <span style={{ fontSize: '12px', fontWeight: 700, color }}>
          {complet ? 'Complet' : `${inscrits} / ${places} inscrits`}
        </span>
      </div>
      <div style={{ height: '6px', background: '#F3F4F6', borderRadius: '999px', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: complet ? '#EF4444' : pct >= 70 ? 'linear-gradient(90deg, #F59E0B, #EF4444)' : 'linear-gradient(90deg, #3B4FD8, #9B30E8)',
          borderRadius: '999px', transition: 'width 0.6s ease',
        }} />
      </div>
      <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
        {Array.from({ length: places }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: '4px', borderRadius: '2px',
            background: i < inscrits ? (complet ? '#EF4444' : pct >= 70 ? '#F59E0B' : '#3B4FD8') : '#E5E7EB',
          }} />
        ))}
      </div>
    </div>
  )
}

function SessionCard({ session, index }) {
  const complet = session.inscrits >= session.places
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spotX = useMotionValue(-200)
  const spotY = useMotionValue(-200)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 })

  function onMouseMove(e) {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
    spotX.set(e.clientX - rect.left)
    spotY.set(e.clientY - rect.top)
  }
  function onMouseLeave() { x.set(0); y.set(0); spotX.set(-200); spotY.set(-200) }

  return (
    <motion.div
      ref={ref}
      variants={FADE_UP}
      initial="hidden"
      animate="show"
      custom={index}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={complet ? {} : {
        scale: 1.02,
        boxShadow: '0 16px 48px rgba(59,79,216,0.14)',
        borderColor: 'rgba(59,79,216,0.28)',
        transition: { duration: 0.22 },
      }}
      style={{
        background: '#fff',
        borderRadius: '20px',
        border: complet ? '1.5px solid rgba(239,68,68,0.20)' : '1.5px solid rgba(59,79,216,0.10)',
        boxShadow: '0 4px 24px rgba(59,79,216,0.07)',
        padding: '28px',
        display: 'flex', flexDirection: 'column', gap: '18px',
        position: 'relative', overflow: 'hidden',
        opacity: complet ? 0.75 : 1,
        cursor: 'default',
        rotateX, rotateY,
        transformStyle: 'preserve-3d', transformPerspective: 800,
      }}
    >
      {/* Spotlight */}
      {!complet && (
        <motion.div style={{
          position: 'absolute', width: 200, height: 200, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,79,216,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          translateX: useTransform(spotX, v => v - 100),
          translateY: useTransform(spotY, v => v - 100),
        }} />
      )}

      {/* Blob décoratif */}
      <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,79,216,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span style={{ padding: '3px 10px', borderRadius: '999px', background: 'rgba(59,79,216,0.08)', border: '1px solid rgba(59,79,216,0.18)', color: '#3B4FD8', fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em' }}>{session.rs}</span>
            <span style={{ padding: '3px 10px', borderRadius: '999px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.20)', color: '#059669', fontSize: '11px', fontWeight: 600 }}>✓ Éligible CPF</span>
            <span style={{ padding: '3px 10px', borderRadius: '999px', background: 'rgba(107,114,128,0.07)', border: '1px solid rgba(107,114,128,0.15)', color: '#6B7280', fontSize: '11px', fontWeight: 600 }}>{session.modalite}</span>
          </div>
          <h3 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '16px', lineHeight: 1.3, margin: 0 }}>{session.titre}</h3>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <p style={{ color: '#0F0C1E', fontWeight: 800, fontSize: '22px', margin: 0, lineHeight: 1 }}>{session.prix.toLocaleString('fr-FR')} €</p>
          <p style={{ color: '#9CA3AF', fontSize: '10px', margin: '2px 0 0' }}>financé CPF</p>
        </div>
      </div>

      {/* Infos */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {[
          { label: session.lieu, icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
          { label: session.date, icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
          { label: session.duree, sub: session.elearning, icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
          { label: session.niveau, icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
        ].map((item) => (
          <motion.div
            key={item.label}
            whileHover={{ x: 3, transition: { duration: 0.15 } }}
            style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}
          >
            <span style={{ marginTop: '2px', flexShrink: 0 }}>{item.icon}</span>
            <div>
              <span style={{ color: '#374151', fontSize: '13px', fontWeight: 500, display: 'block' }}>{item.label}</span>
              {item.sub && <span style={{ color: '#9CA3AF', fontSize: '11px', display: 'block' }}>{item.sub}</span>}
            </div>
          </motion.div>
        ))}
      </div>

      <FillBar inscrits={session.inscrits} places={session.places} />

      <Link
        to="/contact"
        style={{
          display: 'block', textAlign: 'center', padding: '11px 20px', borderRadius: '999px',
          fontSize: '13px', fontWeight: 700, textDecoration: 'none',
          background: complet ? 'rgba(107,114,128,0.10)' : 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
          color: complet ? '#9CA3AF' : '#fff',
          pointerEvents: complet ? 'none' : 'auto',
          boxShadow: complet ? 'none' : '0 4px 16px rgba(155,48,232,0.25)',
          transition: 'transform 0.18s, box-shadow 0.18s',
        }}
        onMouseEnter={e => { if (!complet) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(155,48,232,0.40)' } }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = complet ? 'none' : '0 4px 16px rgba(155,48,232,0.25)' }}
      >
        {complet ? 'Session complète — Rejoindre la liste d\'attente' : 'M\'inscrire à cette session →'}
      </Link>
    </motion.div>
  )
}

const COURSE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  'name': 'IA Générative en entreprise — Certification CPF RS7411',
  'description': 'Formation certifiée CPF RS7411 pour maîtriser les outils d\'IA générative en milieu professionnel et augmenter la productivité. 7h présentiel + 14h e-learning.',
  'url': 'https://smartoptimisation.fr/formation/cpf',
  'provider': {
    '@type': 'Organization',
    'name': 'Smart Optimisation',
    'url': 'https://smartoptimisation.fr',
  },
  'courseCode': 'RS7411',
  'educationalCredentialAwarded': 'Certification RS7411 — IA Générative',
  'timeRequired': 'PT21H',
  'inLanguage': 'fr-FR',
  'offers': {
    '@type': 'Offer',
    'price': '1500',
    'priceCurrency': 'EUR',
    'availability': 'https://schema.org/InStock',
    'category': 'Finançable CPF',
  },
  'hasCourseInstance': [
    {
      '@type': 'CourseInstance',
      'courseMode': 'Blended',
      'location': { '@type': 'Place', 'address': { '@type': 'PostalAddress', 'addressLocality': 'Strasbourg', 'addressRegion': 'Alsace', 'addressCountry': 'FR' } },
      'startDate': '2025-04-14',
      'instructor': { '@type': 'Organization', 'name': 'Smart Optimisation' },
    },
    {
      '@type': 'CourseInstance',
      'courseMode': 'Blended',
      'location': { '@type': 'Place', 'address': { '@type': 'PostalAddress', 'addressLocality': 'Mulhouse', 'addressRegion': 'Alsace', 'addressCountry': 'FR' } },
      'startDate': '2025-04-28',
      'instructor': { '@type': 'Organization', 'name': 'Smart Optimisation' },
    },
    {
      '@type': 'CourseInstance',
      'courseMode': 'Blended',
      'location': { '@type': 'Place', 'address': { '@type': 'PostalAddress', 'addressLocality': 'Colmar', 'addressRegion': 'Alsace', 'addressCountry': 'FR' } },
      'startDate': '2025-05-05',
      'instructor': { '@type': 'Organization', 'name': 'Smart Optimisation' },
    },
  ],
}

export default function FormationCPF() {
  useSEO({
    title: 'Formation IA CPF RS7411 Grand-Est — Strasbourg, Mulhouse, Colmar',
    description: 'Formation IA certifiée CPF RS7411 dans le Grand-Est. Sessions à Strasbourg, Mulhouse, Colmar. 0 € reste à charge. Organisme Qualiopi. Financement 100% CPF.',
    path: '/formation/cpf',
    jsonLd: COURSE_SCHEMA,
  })
  const isMobile = useIsMobile()
  const disponibles = SESSIONS.filter(s => s.inscrits < s.places).length

  return (
    <main style={{ background: '#fff', minHeight: 'calc(100vh - 72px)' }}>

      {/* ── Hero ─────────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(59,79,216,0.04) 0%, rgba(155,48,232,0.04) 100%)', borderBottom: '1px solid rgba(59,79,216,0.08)', padding: isMobile ? '40px 20px 32px' : '64px 48px 48px' }}>
        {/* Blobs animés */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: -80, right: -80, width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,48,232,0.08) 0%, transparent 70%)', pointerEvents: 'none' }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], y: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          style={{ position: 'absolute', bottom: -50, left: -50, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,79,216,0.07) 0%, transparent 70%)', pointerEvents: 'none' }}
        />

        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div variants={FADE_UP} initial="hidden" animate="show" custom={0}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'rgba(59,79,216,0.07)', border: '1px solid rgba(59,79,216,0.18)', marginBottom: '24px' }}>
            <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg,#3B4FD8,#9B30E8)', flexShrink: 0, display: 'block' }} />
            <span style={{ color: '#3B4FD8', fontSize: '13px', fontWeight: 600 }}>Formations certifiantes · Finançables CPF</span>
          </motion.div>

          <motion.h1 variants={FADE_UP} initial="hidden" animate="show" custom={1}
            style={{ color: '#0F0C1E', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Formez-vous à l'IA,{' '}
            <motion.span
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundImage: 'linear-gradient(135deg,#3B4FD8,#9B30E8,#E83B9B,#3B4FD8)', backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              financé par votre CPF
            </motion.span>
          </motion.h1>

          <motion.p variants={FADE_UP} initial="hidden" animate="show" custom={2}
            style={{ color: '#6B7280', fontSize: '16px', lineHeight: 1.7, marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            Utilisez votre Compte Personnel de Formation pour accéder à nos programmes IA certifiants.
            <strong style={{ color: '#0F0C1E' }}> 0 € de reste à charge.</strong>
          </motion.p>

          {/* Stats rapides */}
          <motion.div variants={FADE_UP} initial="hidden" animate="show" custom={3}
            style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { val: `${disponibles}`, label: 'sessions disponibles' },
              { val: '1 500 €', label: 'financé CPF' },
              { val: '100%', label: 'taux de satisfaction' },
              { val: '21h', label: 'de formation' },
            ].map((s) => (
              <motion.div
                key={s.label}
                whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(59,79,216,0.12)', scale: 1.05, transition: { duration: 0.2 } }}
                style={{ padding: '12px 20px', borderRadius: '14px', background: '#fff', border: '1px solid rgba(59,79,216,0.10)', boxShadow: '0 2px 12px rgba(59,79,216,0.06)', cursor: 'default' }}
              >
                <p style={{ color: '#0F0C1E', fontWeight: 800, fontSize: '20px', margin: 0 }}>{s.val}</p>
                <p style={{ color: '#9CA3AF', fontSize: '11px', margin: 0 }}>{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Sessions ──────────────────────────────────── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '32px 16px' : '56px 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ color: '#0F0C1E', fontWeight: 800, fontSize: '22px', margin: '0 0 4px' }}>Prochaines sessions</h2>
            <p style={{ color: '#9CA3AF', fontSize: '13px', margin: 0 }}>Places limitées — réservez la vôtre avant qu'il soit trop tard</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '999px', background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.15)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444', animation: 'pulse 1.5s infinite' }} />
            <span style={{ color: '#EF4444', fontSize: '12px', fontWeight: 600 }}>
              {SESSIONS.filter(s => s.inscrits >= s.places).length} session(s) complète(s)
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
          {SESSIONS.map((session, i) => <SessionCard key={session.id} session={session} index={i} />)}
        </div>

        {/* CTA bas de page */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
          viewport={{ once: true }}
          style={{ marginTop: '64px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr auto', alignItems: 'center', gap: isMobile ? '20px' : '48px', padding: isMobile ? '28px 20px' : '40px 48px', borderRadius: '24px', background: '#fff', border: '1.5px solid rgba(59,79,216,0.10)', boxShadow: '0 8px 40px rgba(59,79,216,0.08)', position: 'relative', overflow: 'hidden' }}
        >
          {/* Accent gauche */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: 'linear-gradient(180deg, #3B4FD8, #9B30E8)', borderRadius: '4px 0 0 4px' }} />

          {/* Blob décoratif */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', right: -60, top: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,48,232,0.06) 0%, transparent 70%)', pointerEvents: 'none' }}
          />

          <div style={{ position: 'relative' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', padding: '4px 12px', borderRadius: '999px', background: 'rgba(59,79,216,0.07)', border: '1px solid rgba(59,79,216,0.15)', marginBottom: '12px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <span style={{ color: '#3B4FD8', fontSize: '11px', fontWeight: 600 }}>Session sur mesure</span>
            </div>
            <h3 style={{ color: '#0F0C1E', fontWeight: 800, fontSize: '20px', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
              Aucun créneau ne vous convient ?
            </h3>
            <p style={{ color: '#6B7280', fontSize: '14px', lineHeight: 1.6, margin: 0, maxWidth: '480px' }}>
              Nous organisons des sessions privées dans toute l'Alsace — à votre date, dans vos locaux ou dans un espace partenaire.
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} style={{ flexShrink: 0 }}>
            <Link to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 28px', borderRadius: '999px', fontSize: '14px', fontWeight: 700,
              color: '#fff', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
              textDecoration: 'none', boxShadow: '0 4px 20px rgba(155,48,232,0.30)',
              whiteSpace: 'nowrap',
            }}>
              Demander ma session privée →
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>
    </main>
  )
}
