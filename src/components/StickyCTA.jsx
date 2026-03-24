import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function StickyCTA({ articleRef, title = 'Vérifier mon éligibilité OPCO', link = '/contact' }) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768

  useEffect(() => {
    if (dismissed) return
    function onScroll() {
      const el = articleRef?.current
      if (!el) return
      const { top, height } = el.getBoundingClientRect()
      const scrolled = -top
      const pct = scrolled / height
      setVisible(pct >= 0.5)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [articleRef, dismissed])

  if (dismissed || !visible) return null

  /* Mobile: bottom bar | Desktop: right sidebar card */
  return isMobile ? (
    <div style={{
      position: 'fixed',
      bottom: 0, left: 0, right: 0,
      zIndex: 1000,
      background: '#fff',
      borderTop: '1px solid #e5e7eb',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      boxShadow: '0 -4px 20px rgba(0,0,0,0.12)',
    }}>
      <Link to={link} style={{
        flex: 1,
        background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: 8,
        padding: '12px 16px',
        fontWeight: 700,
        fontSize: 14,
        textAlign: 'center',
        display: 'block',
      }}>
        {title}
      </Link>
      <button
        onClick={() => setDismissed(true)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#9ca3af', padding: 4 }}
        aria-label="Fermer"
      >×</button>
    </div>
  ) : (
    <div style={{
      position: 'fixed',
      right: 24,
      bottom: 40,
      zIndex: 1000,
      background: '#fff',
      borderRadius: 12,
      padding: '20px 20px',
      boxShadow: '0 8px 40px rgba(59,79,216,0.18)',
      border: '1px solid rgba(59,79,216,0.12)',
      maxWidth: 240,
      animation: 'slideInRight 0.3s ease',
    }}>
      <style>{`@keyframes slideInRight { from { opacity:0; transform:translateX(20px) } to { opacity:1; transform:translateX(0) } }`}</style>
      <button
        onClick={() => setDismissed(true)}
        style={{
          position: 'absolute', top: 10, right: 12,
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: 16, color: '#9ca3af',
        }}
        aria-label="Fermer"
      >×</button>
      <p style={{ fontSize: 13, color: '#374151', marginBottom: 12, lineHeight: 1.4, fontWeight: 500 }}>
        Vérifiez votre éligibilité OPCO — réponse sous 48h, gratuit.
      </p>
      <Link to={link} style={{
        display: 'block',
        background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: 8,
        padding: '10px 14px',
        fontWeight: 700,
        fontSize: 13,
        textAlign: 'center',
      }}>
        {title}
      </Link>
    </div>
  )
}
