import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const COOKIE_TYPES = [
  { id: 'essential',    label: 'Essentiels',     desc: 'Nécessaires au fonctionnement du site.',                              forced: true  },
  { id: 'analytics',   label: 'Analytiques',     desc: 'Pages vues, durée de visite.',                                        forced: false },
  { id: 'marketing',   label: 'Marketing',       desc: 'Contenus personnalisés et mesure de campagnes.',                      forced: false },
  { id: 'preferences', label: 'Préférences',     desc: 'Mémorisent vos choix pour personnaliser votre expérience.',           forced: false },
]

function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      aria-checked={checked}
      role="switch"
      style={{
        width: 36, height: 20, borderRadius: '999px', border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        background: checked ? 'linear-gradient(135deg, #3B4FD8, #9B30E8)' : '#D1D5DB',
        position: 'relative', flexShrink: 0, transition: 'background 0.22s',
        padding: 0, outline: 'none', opacity: disabled ? 0.5 : 1,
      }}
    >
      <motion.span
        animate={{ x: checked ? 18 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        style={{
          position: 'absolute', top: 2, left: 0,
          width: 16, height: 16, borderRadius: '50%',
          background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.20)',
          display: 'block',
        }}
      />
    </button>
  )
}

const isMobileDevice = () => typeof window !== 'undefined' && window.innerWidth < 640

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [panel, setPanel]     = useState(false)
  const [mobile, setMobile]   = useState(false)
  const [prefs, setPrefs]     = useState({ essential: true, analytics: true, marketing: true, preferences: true })

  useEffect(() => {
    setMobile(isMobileDevice())
    if (!localStorage.getItem('cookie_consent')) setVisible(true)
  }, [])

  const save = (accepted) => {
    localStorage.setItem('cookie_consent', JSON.stringify(
      accepted ? prefs : { essential: true, analytics: false, marketing: false, preferences: false }
    ))
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={panel ? 'panel' : 'banner'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
          role="dialog"
          aria-label="Gestion des cookies"
          style={{
            position: 'fixed',
            bottom: mobile ? '12px' : '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            width: mobile ? 'calc(100vw - 24px)' : 'min(480px, calc(100vw - 32px))',
            background: '#fff',
            borderRadius: mobile ? '16px' : '20px',
            boxShadow: '0 12px 48px rgba(59,79,216,0.18), 0 2px 8px rgba(0,0,0,0.08)',
            border: '1.5px solid rgba(59,79,216,0.10)',
            overflow: 'hidden',
          }}
        >
          {/* Barre gradient */}
          <div style={{ height: 3, background: 'linear-gradient(90deg, #3B4FD8, #9B30E8, #E83B9B)' }} />

          <div style={{ padding: mobile ? '14px 14px 12px' : '20px 20px 16px' }}>
            {!panel ? (
              /* ── Vue principale ── */
              <>
                {/* Titre + texte */}
                <div style={{ marginBottom: mobile ? '12px' : '16px' }}>
                  <p style={{ color: '#0F0C1E', fontWeight: 800, fontSize: mobile ? '13px' : '14px', margin: '0 0 4px', letterSpacing: '-0.01em' }}>
                    Vos préférences de cookies
                  </p>
                  <p style={{ color: '#6B7280', fontSize: mobile ? '11px' : '12px', lineHeight: 1.55, margin: 0 }}>
                    Cookies pour améliorer l'expérience et analyser l'audience.{' '}
                    <Link to="/cookies" onClick={() => setVisible(false)} style={{ color: '#3B4FD8', fontWeight: 600, textDecoration: 'none' }}>
                      En savoir plus
                    </Link>
                  </p>
                </div>

                {/* Bouton Accepter */}
                <motion.button
                  onClick={() => save(true)}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: '100%',
                    padding: mobile ? '9px 16px' : '11px 16px',
                    borderRadius: '10px',
                    fontSize: mobile ? '12px' : '13px', fontWeight: 700,
                    background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
                    border: 'none', color: '#fff', cursor: 'pointer',
                    boxShadow: '0 3px 14px rgba(155,48,232,0.30)',
                    marginBottom: '8px', fontFamily: 'inherit',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Tout accepter
                </motion.button>

                {/* Boutons secondaires */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => setPanel(true)}
                    style={{
                      flex: 1, padding: mobile ? '7px 10px' : '8px 12px',
                      borderRadius: '8px', fontSize: mobile ? '11px' : '12px', fontWeight: 600,
                      background: 'transparent', border: '1.5px solid rgba(59,79,216,0.18)',
                      color: '#3B4FD8', cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >
                    Personnaliser
                  </button>
                  <button
                    onClick={() => save(false)}
                    style={{
                      flex: 1, padding: mobile ? '7px 10px' : '8px 12px',
                      borderRadius: '8px', fontSize: mobile ? '11px' : '12px', fontWeight: 500,
                      background: 'transparent', border: '1.5px solid rgba(107,114,128,0.15)',
                      color: '#9CA3AF', cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >
                    Tout refuser
                  </button>
                </div>
              </>
            ) : (
              /* ── Vue personnalisation ── */
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: mobile ? '12px' : '16px' }}>
                  <button
                    onClick={() => setPanel(false)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', padding: '2px', display: 'flex' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"/>
                    </svg>
                  </button>
                  <p style={{ color: '#0F0C1E', fontWeight: 800, fontSize: mobile ? '13px' : '14px', margin: 0 }}>Mes préférences</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: mobile ? '12px' : '14px' }}>
                  {COOKIE_TYPES.map((c) => (
                    <div key={c.id} style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: mobile ? '8px 10px' : '10px 12px',
                      borderRadius: '8px',
                      background: prefs[c.id] && !c.forced ? 'rgba(59,79,216,0.04)' : '#FAFAFA',
                      border: `1px solid ${prefs[c.id] && !c.forced ? 'rgba(59,79,216,0.10)' : 'rgba(0,0,0,0.05)'}`,
                    }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ color: '#0F0C1E', fontWeight: 700, fontSize: mobile ? '11.5px' : '12px', margin: '0 0 1px' }}>{c.label}</p>
                        <p style={{ color: '#9CA3AF', fontSize: mobile ? '10px' : '10.5px', margin: 0, lineHeight: 1.4 }}>{c.desc}</p>
                      </div>
                      <Toggle checked={prefs[c.id]} onChange={() => setPrefs(p => ({ ...p, [c.id]: !p[c.id] }))} disabled={c.forced} />
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => { localStorage.setItem('cookie_consent', JSON.stringify(prefs)); setVisible(false) }}
                  style={{
                    width: '100%', padding: mobile ? '9px 16px' : '11px 16px',
                    borderRadius: '10px', fontSize: mobile ? '12px' : '13px', fontWeight: 700,
                    background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
                    border: 'none', color: '#fff', cursor: 'pointer',
                    boxShadow: '0 3px 14px rgba(155,48,232,0.28)', fontFamily: 'inherit',
                  }}
                >
                  Enregistrer
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
