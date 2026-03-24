import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef } from 'react'

function FeatureCard({ f, i }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 })

  function onMouseMove(e) {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function onMouseLeave() { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + i * 0.07 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{
        scale: 1.04,
        boxShadow: '0 12px 36px rgba(59,79,216,0.14)',
        borderColor: 'rgba(59,79,216,0.25)',
        transition: { duration: 0.22 },
      }}
      style={{
        background: '#F9F8FF', borderRadius: '16px', padding: '20px',
        border: '1px solid rgba(59,79,216,0.08)',
        cursor: 'default',
        rotateX, rotateY,
        transformStyle: 'preserve-3d', transformPerspective: 700,
      }}
    >
      <motion.div
        whileHover={{ rotate: [0, -10, 10, -5, 5, 0], scale: 1.12, transition: { duration: 0.45 } }}
        style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', boxShadow: '0 4px 12px rgba(155,48,232,0.20)' }}
      >
        {f.icon}
      </motion.div>
      <h4 style={{ color: '#0F0C1E', fontWeight: 600, fontSize: '15px', marginBottom: '6px' }}>{f.title}</h4>
      <p style={{ color: '#6B7280', fontSize: '13px', lineHeight: 1.6 }}>{f.desc}</p>
    </motion.div>
  )
}

export default function PageLayout({ badge, title, titleAccent, subtitle, description, features, cta, ctaPath, secondaryCta, secondaryPath }) {
  return (
    <section style={{ background: '#fff', minHeight: 'calc(100vh - 72px)', padding: '80px 48px', position: 'relative', overflow: 'hidden' }}>
      {/* Blobs animés */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, 15, 0], y: [0, -15, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '-120px', left: '-80px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,79,216,0.07) 0%, transparent 70%)', pointerEvents: 'none' }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], x: [0, -10, 0], y: [0, 20, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{ position: 'absolute', bottom: '-80px', right: '-60px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,48,232,0.06) 0%, transparent 70%)', pointerEvents: 'none' }}
      />

      <div style={{ maxWidth: '780px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#9CA3AF', fontSize: '13px', textDecoration: 'none', marginBottom: '40px', fontWeight: 500 }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#3B4FD8'; e.currentTarget.style.transform = 'translateX(-2px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#9CA3AF'; e.currentTarget.style.transform = 'translateX(0)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            Retour à l'accueil
          </Link>
        </motion.div>

        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'rgba(59,79,216,0.07)', border: '1px solid rgba(59,79,216,0.18)', marginBottom: '24px' }}>
          <motion.span
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', flexShrink: 0, display: 'block' }}
          />
          <span style={{ color: '#3B4FD8', fontSize: '13px', fontWeight: 600 }}>{badge}</span>
        </motion.div>

        {/* Title */}
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          style={{ color: '#0F0C1E', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '16px' }}>
          {title}{' '}
          {titleAccent && (
            <motion.span
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundImage: 'linear-gradient(135deg,#3B4FD8,#9B30E8,#E83B9B,#3B4FD8)', backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {titleAccent}
            </motion.span>
          )}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
            style={{ color: '#6B7280', fontSize: '18px', lineHeight: 1.7, marginBottom: '12px', fontWeight: 400 }}>
            {subtitle}
          </motion.p>
        )}

        {/* Description */}
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          style={{ color: '#9CA3AF', fontSize: '15px', lineHeight: 1.8, marginBottom: '48px' }}>
          {description}
        </motion.p>

        {/* Separator */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, #3B4FD8, #9B30E8, transparent)', marginBottom: '48px', borderRadius: '1px' }} />

        {/* Features */}
        {features && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '56px' }}
          >
            {features.map((f, i) => <FeatureCard key={i} f={f} i={i} />)}
          </motion.div>
        )}

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.4 }}
          style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
            <a href="mailto:contact@smartoptimisation.fr"
              style={{ padding: '14px 32px', borderRadius: '999px', fontWeight: 600, fontSize: '15px', color: '#fff', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', textDecoration: 'none', boxShadow: '0 4px 20px rgba(155,48,232,0.30)', display: 'block' }}>
              {cta || 'Nous contacter'}
            </a>
          </motion.div>
          {secondaryPath && (
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link to={secondaryPath}
                style={{ padding: '14px 32px', borderRadius: '999px', fontWeight: 600, fontSize: '15px', color: '#3B4FD8', textDecoration: 'none', border: '1.5px solid rgba(59,79,216,0.30)', display: 'block' }}>
                {secondaryCta}
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
