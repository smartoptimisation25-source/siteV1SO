import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'

const SOCIAL = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/smart-opti/?viewAsMember=true',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/smartoptimisation/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/smartoptimisation/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
]

const LEGAL = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Politique de confidentialité', href: '/confidentialite' },
  { label: 'CGV', href: '/cgv' },
  { label: 'RGPD', href: '/rgpd' },
  { label: 'Cookies', href: '/cookies' },
]

export default function Footer() {
  const isMobile = useIsMobile()
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
      borderTop: 'none', padding: isMobile ? '40px 20px 28px' : '48px 40px 32px', marginTop: 'auto',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Orbes décoratifs animés */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{ position: 'absolute', bottom: -40, left: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '36px', position: 'relative', zIndex: 1 }}>

        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <motion.div
                whileHover={{ scale: 1.08, rotate: 3, transition: { type: 'spring', stiffness: 300 } }}
                style={{ width: 48, height: 48, borderRadius: '10px', overflow: 'hidden', flexShrink: 0, cursor: 'default' }}
              >
                <img src="/logo2.png" alt="Smart Optimisation" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }} />
              </motion.div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.70)', fontSize: '13px', maxWidth: '260px', lineHeight: 1.6 }}>
              Experts en Intelligence Artificielle — formation et intégration pour les professionnels.
            </p>
          </div>

          {/* Social + Qualiopi */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'flex-start' : 'flex-end', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              {SOCIAL.map((s, i) => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: i * 0.1 } }}
                  whileHover={{ scale: 1.15, y: -3, background: 'rgba(255,255,255,0.30)', transition: { duration: 0.18 } }}
                  whileTap={{ scale: 0.92 }}
                  style={{
                    width: 40, height: 40, borderRadius: '10px',
                    background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', textDecoration: 'none',
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>

            {/* Qualiopi */}
            <motion.a
              href="/certificat-qualiopi.pdf"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              <img
                src="/qualiopi.png"
                alt="Qualiopi — Processus certifié"
                style={{ height: '44px', objectFit: 'contain' }}
              />
            </motion.a>
          </div>
        </div>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.20)' }} />

        {/* Legal tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {LEGAL.map((l, i) => {
            const base = {
              padding: '6px 14px', borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.35)', color: '#fff',
              fontSize: '12px', fontWeight: 500, textDecoration: 'none',
              background: 'rgba(255,255,255,0.12)',
            }
            const content = (
              <motion.span
                whileHover={{ background: 'rgba(255,255,255,0.25)', scale: 1.04, transition: { duration: 0.15 } }}
                style={{ display: 'block', ...base }}
              >
                {l.label}
              </motion.span>
            )
            return l.blank ? (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                {content}
              </a>
            ) : (
              <Link key={l.label} to={l.href} style={{ textDecoration: 'none' }}>
                {content}
              </Link>
            )
          })}
        </div>

        {/* Bottom line */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px' }}>
            © {new Date().getFullYear()} Smart Optimisation. Tous droits réservés.
          </p>
          <motion.p
            animate={{ opacity: [0.55, 0.9, 0.55] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px' }}
          >
            Fait avec ♥ en Alsace
          </motion.p>
        </div>

      </div>
    </footer>
  )
}
