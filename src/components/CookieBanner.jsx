import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const COOKIE_TYPES = [
  {
    id: 'essential',
    label: 'Essentiels',
    desc: 'Nécessaires au fonctionnement du site. Ne peuvent pas être désactivés.',
    forced: true,
  },
  {
    id: 'analytics',
    label: 'Analytiques',
    desc: 'Nous aident à comprendre comment vous utilisez le site (pages vues, durée de visite).',
    forced: false,
  },
  {
    id: 'marketing',
    label: 'Marketing',
    desc: 'Utilisés pour vous proposer des contenus personnalisés et mesurer l\'efficacité de nos campagnes.',
    forced: false,
  },
  {
    id: 'preferences',
    label: 'Préférences',
    desc: 'Mémorisent vos choix (langue, région) pour personnaliser votre expérience.',
    forced: false,
  },
]

function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      aria-checked={checked}
      role="switch"
      style={{
        width: 44, height: 24, borderRadius: '999px', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
        background: checked ? 'linear-gradient(135deg, #3B4FD8, #9B30E8)' : '#E5E7EB',
        position: 'relative', flexShrink: 0, transition: 'background 0.22s',
        padding: 0, outline: 'none',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <motion.span
        animate={{ x: checked ? 22 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        style={{
          position: 'absolute', top: 2, left: 0,
          width: 20, height: 20, borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
          display: 'block',
        }}
      />
    </button>
  )
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [panel, setPanel] = useState(false) // panneau personnalisation
  const [prefs, setPrefs] = useState({ essential: true, analytics: true, marketing: true, preferences: true })

  useEffect(() => {
    const saved = localStorage.getItem('cookie_consent')
    if (!saved) setVisible(true)
  }, [])

  function saveAndClose(accepted) {
    localStorage.setItem('cookie_consent', JSON.stringify(accepted ? prefs : { essential: true, analytics: false, marketing: false, preferences: false }))
    setVisible(false)
  }

  function saveCustom() {
    localStorage.setItem('cookie_consent', JSON.stringify(prefs))
    setVisible(false)
  }

  function toggle(id) {
    setPrefs(p => ({ ...p, [id]: !p[id] }))
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Overlay semi-transparent */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(15,12,30,0.35)', zIndex: 9998, backdropFilter: 'blur(2px)' }}
          />

          <motion.div
            key={panel ? 'panel' : 'banner'}
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'fixed',
              bottom: '32px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
              width: 'min(520px, calc(100vw - 32px))',
              background: '#fff',
              borderRadius: '24px',
              boxShadow: '0 24px 80px rgba(59,79,216,0.22), 0 4px 16px rgba(0,0,0,0.10)',
              border: '1.5px solid rgba(59,79,216,0.12)',
              overflow: 'hidden',
            }}
            role="dialog"
            aria-label="Gestion des cookies"
          >
            {/* Barre gradient haut */}
            <div style={{ height: 4, background: 'linear-gradient(90deg, #3B4FD8, #9B30E8, #E83B9B)' }} />

            <div style={{ padding: '24px 24px 20px' }}>

              {!panel ? (
                /* ── Vue principale ── */
                <>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '14px', flexShrink: 0,
                      background: 'linear-gradient(135deg, rgba(59,79,216,0.10), rgba(155,48,232,0.08))',
                      border: '1px solid rgba(59,79,216,0.14)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
                        <path d="M8.5 8.5v.01M16 15.5v.01M12 12v.01"/>
                      </svg>
                    </div>
                    <div>
                      <p style={{ color: '#0F0C1E', fontWeight: 800, fontSize: '15px', margin: '0 0 5px', letterSpacing: '-0.01em' }}>
                        Vos préférences de cookies
                      </p>
                      <p style={{ color: '#6B7280', fontSize: '12.5px', lineHeight: 1.65, margin: 0 }}>
                        Nous utilisons des cookies pour améliorer votre expérience, analyser l'audience et personnaliser nos contenus.{' '}
                        <Link to="/cookies" onClick={() => setVisible(false)} style={{ color: '#3B4FD8', fontWeight: 600, textDecoration: 'none' }}>
                          Politique cookies →
                        </Link>
                      </p>
                    </div>
                  </div>

                  {/* Bouton Accepter — très visible */}
                  <motion.button
                    onClick={() => saveAndClose(true)}
                    whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(155,48,232,0.40)' }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      width: '100%', padding: '13px 20px', borderRadius: '14px',
                      fontSize: '14px', fontWeight: 700,
                      background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
                      border: 'none', color: '#fff', cursor: 'pointer',
                      boxShadow: '0 4px 20px rgba(155,48,232,0.32)',
                      marginBottom: '10px', fontFamily: 'inherit',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Tout accepter
                  </motion.button>

                  {/* Boutons secondaires */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <motion.button
                      onClick={() => setPanel(true)}
                      whileHover={{ background: 'rgba(59,79,216,0.06)' }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        flex: 1, padding: '10px 14px', borderRadius: '12px',
                        fontSize: '12.5px', fontWeight: 600,
                        background: 'transparent',
                        border: '1.5px solid rgba(59,79,216,0.18)',
                        color: '#3B4FD8', cursor: 'pointer', fontFamily: 'inherit',
                        transition: 'background 0.18s',
                      }}
                    >
                      Personnaliser
                    </motion.button>
                    <motion.button
                      onClick={() => saveAndClose(false)}
                      whileHover={{ background: 'rgba(107,114,128,0.06)' }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        flex: 1, padding: '10px 14px', borderRadius: '12px',
                        fontSize: '12.5px', fontWeight: 500,
                        background: 'transparent',
                        border: '1.5px solid rgba(107,114,128,0.18)',
                        color: '#9CA3AF', cursor: 'pointer', fontFamily: 'inherit',
                        transition: 'background 0.18s',
                      }}
                    >
                      Tout refuser
                    </motion.button>
                  </div>
                </>
              ) : (
                /* ── Vue personnalisation ── */
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <button
                      onClick={() => setPanel(false)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', padding: '4px', display: 'flex', alignItems: 'center' }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"/>
                      </svg>
                    </button>
                    <p style={{ color: '#0F0C1E', fontWeight: 800, fontSize: '15px', margin: 0 }}>Personnaliser mes cookies</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '20px' }}>
                    {COOKIE_TYPES.map((c) => (
                      <div key={c.id} style={{
                        display: 'flex', alignItems: 'center', gap: '14px',
                        padding: '12px 14px', borderRadius: '12px',
                        background: prefs[c.id] && !c.forced ? 'rgba(59,79,216,0.04)' : '#FAFAFA',
                        border: `1px solid ${prefs[c.id] && !c.forced ? 'rgba(59,79,216,0.12)' : 'rgba(0,0,0,0.05)'}`,
                        transition: 'all 0.18s',
                      }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '13px', margin: '0 0 2px' }}>{c.label}</p>
                          <p style={{ color: '#9CA3AF', fontSize: '11px', margin: 0, lineHeight: 1.5 }}>{c.desc}</p>
                        </div>
                        <Toggle
                          checked={prefs[c.id]}
                          onChange={(v) => toggle(c.id)}
                          disabled={c.forced}
                        />
                      </div>
                    ))}
                  </div>

                  <motion.button
                    onClick={saveCustom}
                    whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(155,48,232,0.38)' }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      width: '100%', padding: '13px 20px', borderRadius: '14px',
                      fontSize: '14px', fontWeight: 700,
                      background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
                      border: 'none', color: '#fff', cursor: 'pointer',
                      boxShadow: '0 4px 20px rgba(155,48,232,0.30)',
                      fontFamily: 'inherit',
                    }}
                  >
                    Enregistrer mes préférences
                  </motion.button>
                </>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
