import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSEO } from '../hooks/useSEO'

export default function NotFound() {
  useSEO({ title: 'Page introuvable', description: 'La page que vous recherchez n\'existe pas.', path: '/404', robots: 'noindex, nofollow' })

  return (
    <main style={{ background: '#fff', minHeight: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', position: 'relative', overflow: 'hidden' }}>
      <motion.div
        animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: -160, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,79,216,0.07) 0%, transparent 70%)', pointerEvents: 'none' }}
      />
      <motion.div
        animate={{ scale: [1, 1.12, 1], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{ position: 'absolute', bottom: -100, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,48,232,0.06) 0%, transparent 70%)', pointerEvents: 'none' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: 'center', maxWidth: '520px', position: 'relative', zIndex: 2 }}
      >
        <motion.div
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          style={{
            fontSize: 'clamp(5rem, 15vw, 9rem)', fontWeight: 800, lineHeight: 1,
            backgroundImage: 'linear-gradient(135deg,#3B4FD8,#9B30E8,#E83B9B,#3B4FD8)',
            backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            marginBottom: '16px', letterSpacing: '-0.04em',
          }}
        >
          404
        </motion.div>

        <h1 style={{ fontWeight: 800, fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: '#0F0C1E', letterSpacing: '-0.02em', marginBottom: '12px' }}>
          Page introuvable
        </h1>
        <p style={{ color: '#6B7280', fontSize: '16px', lineHeight: 1.7, marginBottom: '36px' }}>
          La page que vous recherchez n'existe pas ou a été déplacée. Retournez à l'accueil pour continuer.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '999px', fontWeight: 700, fontSize: '15px', color: '#fff', textDecoration: 'none', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', boxShadow: '0 4px 20px rgba(155,48,232,0.28)' }}>
              Retour à l'accueil
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
            <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', borderRadius: '999px', fontWeight: 600, fontSize: '15px', color: '#3B4FD8', textDecoration: 'none', border: '1.5px solid rgba(59,79,216,0.25)', background: 'rgba(59,79,216,0.03)' }}>
              Nous contacter
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </main>
  )
}
