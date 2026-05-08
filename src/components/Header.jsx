import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/logo-icon.jpg'
import useIsMobile from '../hooks/useIsMobile'

const FORMATIONS = [
  {
    label: 'Formation CPF',
    path: '/formation/cpf',
    desc: 'Financée à 100% via votre CPF',
    color: '#3B4FD8',
    bg: 'rgba(59,79,216,0.08)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
  },
  {
    label: 'Formation OPCO',
    path: '/formation/opco',
    desc: 'Prise en charge par votre OPCO',
    color: '#7B4FE8',
    bg: 'rgba(123,79,232,0.08)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: 'Formation sur mesure',
    path: '/formation/sur-mesure',
    desc: 'Adaptée à votre secteur et vos outils',
    color: '#059669',
    bg: 'rgba(5,150,105,0.08)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
      </svg>
    ),
  },
  {
    label: 'Vibe Coding',
    path: '/formation/vibe-coding',
    desc: 'Créez des apps sans écrire de code',
    color: '#D97706',
    bg: 'rgba(217,119,6,0.08)',
    badge: 'Populaire',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    label: 'Marketing IA',
    path: '/formation/marketing-ia',
    desc: 'Contenus, visuels et stratégie avec l\'IA',
    color: '#E83B9B',
    bg: 'rgba(232,59,155,0.08)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    label: 'Claude AI & Microsoft 365',
    path: '/formation/claude-microsoft',
    desc: 'Outlook, Word, Excel, PowerPoint',
    color: '#0078D4',
    bg: 'rgba(0,120,212,0.08)',
    badge: 'Nouveau',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
      </svg>
    ),
  },
]

const NAV = [
  { label: 'Formation', dropdown: true },
  { label: 'Solution IA sur mesure', path: '/solution-ia' },
  { label: 'Educ IA', path: '/educ-ia' },
  { label: 'Blog', path: '/blog' },
]

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileFormationOpen, setMobileFormationOpen] = useState(false)
  const location = useLocation()
  const headerRef = useRef(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    const handleClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenMenu(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [location])

  const isFormationActive = FORMATIONS.some(f => location.pathname === f.path)
  const isFormationOpen = openMenu === 'Formation'

  return (
    <header
      ref={headerRef}
      style={{
        position: 'sticky', top: 0, zIndex: 200,
        background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      {/* Main bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isMobile ? '0 20px' : '0 48px', height: '72px',
      }}>
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <img src={logo} alt="Smart Optimisation"
              decoding="async"
              fetchPriority="high"
              style={{ height: '44px', width: '44px', objectFit: 'contain', borderRadius: '14px', boxShadow: '0 4px 16px rgba(59,79,216,0.25)' }}
            />
            {!isMobile && (
              <span style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '16px', letterSpacing: '-0.01em' }}>
                Smart Optimisation
              </span>
            )}
          </Link>
        </motion.div>

        {/* Desktop nav */}
        {!isMobile && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', position: 'relative' }}>
            {NAV.map((item) => {
              const active = item.dropdown
                ? isFormationActive
                : item.path === '/blog' ? location.pathname.startsWith('/blog') : location.pathname === item.path
              const open = item.dropdown && isFormationOpen

              return (
                <div key={item.label} style={{ position: 'relative' }}>
                  {item.dropdown ? (
                    <motion.button
                      onClick={() => setOpenMenu(open ? null : 'Formation')}
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '5px',
                        padding: '8px 18px', borderRadius: '999px', fontSize: '14px', fontWeight: 500,
                        color: active || open ? '#3B4FD8' : '#1F2937',
                        background: active || open ? 'rgba(59,79,216,0.08)' : 'transparent',
                        border: active || open ? '1px solid rgba(59,79,216,0.15)' : '1px solid transparent',
                        cursor: 'pointer', transition: 'all 0.18s ease', fontFamily: 'inherit',
                      }}
                    >
                      {item.label}
                      <motion.svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                        animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}
                        style={{ opacity: 0.6 }}>
                        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </motion.svg>
                    </motion.button>
                  ) : (
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Link to={item.path} style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        padding: '8px 18px', borderRadius: '999px',
                        fontSize: '14px', fontWeight: 500,
                        color: active ? '#3B4FD8' : '#1F2937',
                        background: active ? 'rgba(59,79,216,0.08)' : 'transparent',
                        border: active ? '1px solid rgba(59,79,216,0.15)' : '1px solid transparent',
                        textDecoration: 'none', transition: 'all 0.18s ease',
                      }}>
                        {item.label}
                        {item.label === 'Blog' && (
                          <span style={{
                            fontSize: 10, fontWeight: 700, letterSpacing: 0.4, color: '#fff',
                            background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
                            padding: '1px 6px', borderRadius: 10, lineHeight: '16px',
                          }}>NEW</span>
                        )}
                      </Link>
                    </motion.div>
                  )}

                  {/* Mega-menu Formation */}
                  <AnimatePresence>
                    {item.dropdown && isFormationOpen && (
                      <motion.div
                        role="menu"
                        initial={{ opacity: 0, y: -10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                          position: 'absolute', top: 'calc(100% + 12px)', left: '50%',
                          transform: 'translateX(-50%)',
                          width: '560px',
                          background: '#fff', borderRadius: '20px',
                          boxShadow: '0 20px 60px rgba(59,79,216,0.14), 0 4px 16px rgba(0,0,0,0.06)',
                          border: '1px solid rgba(59,79,216,0.10)',
                          overflow: 'hidden', zIndex: 300,
                        }}
                      >
                        {/* Flèche */}
                        <div style={{
                          position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%)',
                          width: '12px', height: '12px', background: '#fff',
                          border: '1px solid rgba(59,79,216,0.10)', borderBottom: 'none', borderRight: 'none', rotate: '45deg',
                        }} />

                        {/* Grille formations */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', padding: '16px 16px 12px' }}>
                          {FORMATIONS.map((f, i) => (
                            <motion.div
                              key={f.path}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0, transition: { delay: i * 0.04 } }}
                            >
                              <Link
                                to={f.path}
                                role="menuitem"
                                style={{
                                  display: 'flex', alignItems: 'flex-start', gap: '12px',
                                  padding: '12px 14px', borderRadius: '14px', textDecoration: 'none',
                                  background: location.pathname === f.path ? f.bg : 'transparent',
                                  border: `1.5px solid ${location.pathname === f.path ? f.color + '25' : 'transparent'}`,
                                  transition: 'all 0.16s ease',
                                }}
                                onMouseEnter={e => {
                                  e.currentTarget.style.background = f.bg
                                  e.currentTarget.style.borderColor = f.color + '25'
                                }}
                                onMouseLeave={e => {
                                  if (location.pathname !== f.path) {
                                    e.currentTarget.style.background = 'transparent'
                                    e.currentTarget.style.borderColor = 'transparent'
                                  }
                                }}
                              >
                                {/* Texte */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                                    <span style={{
                                      color: location.pathname === f.path ? f.color : '#0F0C1E',
                                      fontWeight: 700, fontSize: '13px', lineHeight: 1.3,
                                    }}>{f.label}</span>
                                    {f.badge && (
                                      <span style={{
                                        fontSize: '9.5px', fontWeight: 800, letterSpacing: '0.05em',
                                        color: '#fff', background: f.color,
                                        padding: '1px 6px', borderRadius: '999px', lineHeight: '16px',
                                        flexShrink: 0,
                                      }}>{f.badge}</span>
                                    )}
                                  </div>
                                  <span style={{ color: '#6B7280', fontSize: '12px', lineHeight: 1.4 }}>{f.desc}</span>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>

                        {/* Footer du mega-menu */}
                        <div style={{
                          borderTop: '1px solid rgba(59,79,216,0.07)',
                          padding: '12px 16px',
                          background: 'rgba(59,79,216,0.02)',
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        }}>
                          <span style={{ color: '#6B7280', fontSize: '12px' }}>
                            Financement CPF · OPCO · Prise en charge possible
                          </span>
                          <Link to="/contact" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '5px',
                            fontSize: '12px', fontWeight: 700, color: '#3B4FD8', textDecoration: 'none',
                          }}>
                            Vérifier mon financement
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </nav>
        )}

        {/* Desktop CTA */}
        {!isMobile && (
          <motion.div whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.97 }}>
            <Link to="/contact" style={{
              padding: '10px 24px', borderRadius: '999px', fontSize: '14px', fontWeight: 600,
              color: '#fff', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
              textDecoration: 'none', boxShadow: '0 2px 16px rgba(155,48,232,0.30)',
              display: 'block', whiteSpace: 'nowrap',
            }}>
              Prendre contact
            </Link>
          </motion.div>
        )}

        {/* Mobile: CTA + Hamburger */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link to="/contact" style={{
              padding: '12px 22px', borderRadius: '999px', fontSize: '13px', fontWeight: 600,
              color: '#fff', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
              textDecoration: 'none', boxShadow: '0 2px 12px rgba(155,48,232,0.30)',
              whiteSpace: 'nowrap',
            }}>
              Contact
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                gap: '5px', width: '48px', height: '48px', background: 'transparent', border: 'none',
                cursor: 'pointer', padding: '8px', borderRadius: '10px',
              }}
              aria-label="Menu"
            >
              <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 7 : 0 }}
                style={{ display: 'block', width: '22px', height: '2px', background: '#0F0C1E', borderRadius: '2px', transformOrigin: 'center' }} />
              <motion.span animate={{ opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0 : 1 }}
                style={{ display: 'block', width: '22px', height: '2px', background: '#0F0C1E', borderRadius: '2px' }} />
              <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7 : 0 }}
                style={{ display: 'block', width: '22px', height: '2px', background: '#0F0C1E', borderRadius: '2px', transformOrigin: 'center' }} />
            </button>
          </div>
        )}
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobile && mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden', borderTop: '1px solid rgba(0,0,0,0.06)', background: '#fff', padding: '8px 16px 16px' }}
          >
            {/* Formation accordion mobile */}
            <div>
              <button
                onClick={() => setMobileFormationOpen(!mobileFormationOpen)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  width: '100%', padding: '14px 12px', background: 'transparent', border: 'none',
                  cursor: 'pointer', fontFamily: 'inherit', fontSize: '15px', fontWeight: 500,
                  color: '#374151', borderRadius: '10px',
                }}
              >
                Formation
                <motion.svg width="14" height="14" viewBox="0 0 12 12" fill="none"
                  animate={{ rotate: mobileFormationOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </button>
              <AnimatePresence>
                {mobileFormationOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: 'hidden', paddingLeft: '8px' }}
                  >
                    {FORMATIONS.map((f) => (
                      <Link key={f.path} to={f.path} style={{
                        display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '10px 12px', textDecoration: 'none', borderRadius: '10px',
                        color: location.pathname === f.path ? f.color : '#374151',
                        background: location.pathname === f.path ? f.bg : 'transparent',
                        fontSize: '14px', fontWeight: location.pathname === f.path ? 600 : 400,
                        marginBottom: '2px',
                      }}>
                        <div style={{ width: 28, height: 28, borderRadius: '8px', background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.color, flexShrink: 0 }}>
                          {f.icon}
                        </div>
                        {f.label}
                        {f.badge && (
                          <span style={{ fontSize: '9px', fontWeight: 800, color: '#fff', background: f.color, padding: '1px 5px', borderRadius: '999px' }}>{f.badge}</span>
                        )}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other nav items */}
            {NAV.slice(1).map((item) => (
              <Link key={item.path} to={item.path} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '14px 12px', textDecoration: 'none',
                color: location.pathname === item.path ? '#3B4FD8' : '#374151',
                fontSize: '15px', fontWeight: location.pathname === item.path ? 600 : 500,
                background: (location.pathname.startsWith('/blog') && item.path === '/blog') || location.pathname === item.path
                  ? 'rgba(59,79,216,0.06)' : 'transparent',
                borderRadius: '10px',
              }}>
                {item.label}
                {item.label === 'Blog' && (
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', padding: '1px 6px', borderRadius: 10, lineHeight: '16px' }}>NEW</span>
                )}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
