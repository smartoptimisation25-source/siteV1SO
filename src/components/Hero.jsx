import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ClientsMarquee from './ClientsMarquee'
import useIsMobile from '../hooks/useIsMobile'

const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1], delay: i * 0.12 },
  }),
}

export default function Hero() {
  const isMobile = useIsMobile()

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#ffffff',
        minHeight: isMobile ? 'auto' : 'calc(100vh - 72px)',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        padding: isMobile ? '48px 24px 40px' : '80px 48px',
        gap: isMobile ? '0' : '0',
      }}
    >
      {/* Subtle background blobs */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-160px', left: '-120px',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,79,216,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '-100px', right: '80px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(155,48,232,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', top: '0', right: '0',
        width: '400px', height: '400px',
        background: 'radial-gradient(ellipse at top right, rgba(123,158,255,0.10) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Text content */}
      <div style={{
        position: 'relative',
        flex: '1',
        maxWidth: isMobile ? '100%' : '580px',
        zIndex: 2,
        width: '100%',
      }}>

        {/* Badge */}
        <motion.div
          variants={FADE_UP} initial="hidden" animate="show" custom={0}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '999px',
            background: 'rgba(59,79,216,0.07)',
            border: '1px solid rgba(59,79,216,0.18)',
            marginBottom: '28px',
          }}
        >
          <span style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
            flexShrink: 0,
          }} />
          <span style={{ color: '#3B4FD8', fontSize: '13px', fontWeight: 600 }}>
            Experts en Intelligence Artificielle
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={FADE_UP} initial="hidden" animate="show" custom={1}
          style={{
            color: '#0F0C1E',
            fontWeight: 800,
            fontSize: isMobile ? '2.1rem' : 'clamp(2.4rem, 4.5vw, 3.8rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '20px',
          }}
        >
          Maîtrisez l&apos;IA.{' '}
          <span style={{
            backgroundImage: 'linear-gradient(135deg, #3B4FD8 0%, #9B30E8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Élevez votre vision.
          </span>
          <br />
          Multipliez votre impact.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={FADE_UP} initial="hidden" animate="show" custom={2}
          style={{
            color: '#374151',
            fontSize: isMobile ? '15px' : '17px',
            lineHeight: 1.7,
            marginBottom: '36px',
            maxWidth: isMobile ? '100%' : '460px',
          }}
        >
          Formation, solutions sur mesure et éducation IA — un accompagnement complet
          pour transformer l&apos;intelligence artificielle en avantage concurrentiel.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={FADE_UP} initial="hidden" animate="show" custom={3}
          style={{
            display: 'flex',
            gap: '12px',
            flexDirection: isMobile ? 'column' : 'row',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="#formation"
            style={{
              padding: '14px 32px',
              borderRadius: '999px',
              fontWeight: 600,
              fontSize: '15px',
              color: '#fff',
              background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(155,48,232,0.30)',
              transition: 'transform 0.18s, box-shadow 0.18s',
              textAlign: 'center',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(155,48,232,0.45)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(155,48,232,0.30)'
            }}
          >
            Découvrir nos offres
          </a>
          <Link
            to="/contact"
            style={{
              padding: '14px 32px',
              borderRadius: '999px',
              fontWeight: 600,
              fontSize: '15px',
              color: '#3B4FD8',
              background: 'transparent',
              textDecoration: 'none',
              border: '1.5px solid rgba(59,79,216,0.30)',
              transition: 'border-color 0.18s, background 0.18s, color 0.18s',
              textAlign: 'center',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#3B4FD8'
              e.currentTarget.style.background = 'rgba(59,79,216,0.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(59,79,216,0.30)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            Prendre contact
          </Link>
        </motion.div>

        {/* Partner strip */}
        <motion.div variants={FADE_UP} initial="hidden" animate="show" custom={4}>
          <ClientsMarquee />
        </motion.div>
      </div>

      {/* Dashboard mockup — desktop only */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          style={{
            position: 'relative',
            flex: '1',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2,
          }}
        >
          <DashboardMockup />
        </motion.div>
      )}
    </section>
  )
}

/* ─── AI Dashboard Mockup — Light theme ─────────────────────────────── */
function DashboardMockup() {
  return (
    <div aria-hidden="true" style={{ position: 'relative', width: '380px' }}>

      {/* Main card */}
      <div style={{
        background: '#ffffff',
        border: '1px solid rgba(0,0,0,0.07)',
        borderRadius: '24px',
        padding: '28px',
        boxShadow: '0 20px 60px rgba(59,79,216,0.10), 0 4px 16px rgba(0,0,0,0.06)',
      }}>
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <p style={{ color: '#6B7280', fontSize: '12px', marginBottom: '2px' }}>Productivité IA</p>
            <p style={{ color: '#0F0C1E', fontWeight: 800, fontSize: '28px', margin: 0 }}>+340%</p>
            <p style={{ color: '#9B30E8', fontSize: '9px', fontWeight: 600, margin: '2px 0 0' }}>Équipes formées à l'automatisation</p>
          </div>
          <div style={{
            width: '44px', height: '44px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(155,48,232,0.30)',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </div>
        </div>

        {/* Sparkline */}
        <svg width="100%" height="64" viewBox="0 0 320 64" fill="none" style={{ marginBottom: '24px' }}>
          <defs>
            <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3B4FD8" />
              <stop offset="100%" stopColor="#9B30E8" />
            </linearGradient>
            <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9B30E8" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#9B30E8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 52 C40 48 60 36 90 30 C120 24 140 40 170 28 C200 16 230 8 260 4 C280 2 300 6 320 2" stroke="url(#line-grad)" strokeWidth="2.5" fill="none" />
          <path d="M0 52 C40 48 60 36 90 30 C120 24 140 40 170 28 C200 16 230 8 260 4 C280 2 300 6 320 2 L320 64 L0 64Z" fill="url(#area-grad)" />
        </svg>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
          {[
            { label: 'Formations', val: '24', unit: 'modules actifs', anchor: 'CPF · OPCO · Sur mesure' },
            { label: 'Clients', val: '150+', unit: 'entreprises', anchor: 'dont SNCF, Alstom, Bugatti' },
            { label: 'Satisfaction', val: '98%', unit: 'post-formation', anchor: 'Éval. mai 25 – avr. 26' },
          ].map((s) => (
            <div key={s.label} style={{
              background: '#F9F8FF',
              borderRadius: '12px',
              padding: '12px',
              border: '1px solid rgba(59,79,216,0.08)',
            }}>
              <p style={{ color: '#6B7280', fontSize: '11px', marginBottom: '4px' }}>{s.label}</p>
              <p style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '16px' }}>{s.val}</p>
              <p style={{ color: '#9B30E8', fontSize: '9px', fontWeight: 600, lineHeight: 1.3 }}>{s.anchor}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating pill — top right */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '-28px',
          right: '-24px',
          background: '#fff',
          borderRadius: '16px',
          padding: '12px 18px',
          boxShadow: '0 8px 32px rgba(59,79,216,0.15)',
          border: '1px solid rgba(59,79,216,0.10)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div style={{
          width: '36px', height: '36px', borderRadius: '10px',
          background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
        <div>
          <p style={{ fontSize: '11px', color: '#6B7280', margin: 0 }}>Temps économisé</p>
          <p style={{ fontSize: '15px', fontWeight: 700, color: '#0F0C1E', margin: 0 }}>12h / semaine</p>
        </div>
      </motion.div>

      {/* Floating pill — bottom left */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        style={{
          position: 'absolute',
          bottom: '-24px',
          left: '-28px',
          background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
          borderRadius: '16px',
          padding: '12px 18px',
          boxShadow: '0 8px 28px rgba(155,48,232,0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: '#fff',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
        </svg>
        <div>
          <p style={{ fontSize: '11px', opacity: 0.7, margin: 0 }}>Automatisation</p>
          <p style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>Active</p>
        </div>
      </motion.div>
    </div>
  )
}
