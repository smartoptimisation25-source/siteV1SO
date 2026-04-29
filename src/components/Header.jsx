import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/logo-icon.jpg'
import useIsMobile from '../hooks/useIsMobile'

const NAV = [
  {
    label: 'Formation',
    dropdown: [
      { label: 'Formation CPF', path: '/formation/cpf' },
      { label: 'Formation OPCO', path: '/formation/opco' },
      { label: 'Formation sur mesure', path: '/formation/sur-mesure' },
      { label: 'Formation Vibe Coding', path: '/formation/vibe-coding' },
      { label: 'Formation Marketing IA', path: '/formation/marketing-ia' },
    ],
  },
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

  const isActive = (item) => {
    if (item.path) {
      if (item.path === '/blog') return location.pathname.startsWith('/blog')
      return location.pathname === item.path
    }
    if (item.dropdown) return item.dropdown.some((d) => location.pathname === d.path)
    return false
  }

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
              fetchpriority="high"
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
            {NAV.map((item) => (
              <div key={item.label} style={{ position: 'relative' }}>
                {item.dropdown ? (
                  <motion.button
                    onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                    aria-expanded={openMenu === item.label}
                    aria-haspopup="true"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '5px',
                      padding: '8px 18px', borderRadius: '999px', fontSize: '14px', fontWeight: 500,
                      color: isActive(item) ? '#3B4FD8' : '#1F2937',
                      background: isActive(item) || openMenu === item.label ? 'rgba(59,79,216,0.08)' : 'transparent',
                      border: isActive(item) || openMenu === item.label ? '1px solid rgba(59,79,216,0.15)' : '1px solid transparent',
                      cursor: 'pointer', transition: 'all 0.18s ease', fontFamily: 'inherit',
                    }}
                  >
                    {item.label}
                    <motion.svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none"
                      animate={{ rotate: openMenu === item.label ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ opacity: 0.6 }}
                    >
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  </motion.button>
                ) : (
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      to={item.path}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        padding: '8px 18px', borderRadius: '999px',
                        fontSize: '14px', fontWeight: 500,
                        color: isActive(item) ? '#3B4FD8' : '#1F2937',
                        background: isActive(item) ? 'rgba(59,79,216,0.08)' : 'transparent',
                        border: isActive(item) ? '1px solid rgba(59,79,216,0.15)' : '1px solid transparent',
                        textDecoration: 'none', transition: 'all 0.18s ease',
                      }}
                    >
                      {item.label}
                      {item.label === 'Blog' && (
                        <span style={{
                          fontSize: 10, fontWeight: 700, letterSpacing: 0.4,
                          color: '#fff',
                          background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
                          padding: '1px 6px', borderRadius: 10,
                          lineHeight: '16px',
                        }}>
                          NEW
                        </span>
                      )}
                    </Link>
                  </motion.div>
                )}

                {/* Dropdown panel */}
                <AnimatePresence>
                  {item.dropdown && openMenu === item.label && (
                    <motion.div
                      role="menu"
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                      style={{
                        position: 'absolute', top: 'calc(100% + 10px)', left: '50%',
                        transform: 'translateX(-50%)', minWidth: '220px',
                        background: '#fff', borderRadius: '16px',
                        boxShadow: '0 8px 40px rgba(59,79,216,0.13), 0 2px 8px rgba(0,0,0,0.06)',
                        border: '1px solid rgba(59,79,216,0.10)', padding: '8px', zIndex: 300,
                      }}
                    >
                      <div style={{
                        position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%)',
                        width: '12px', height: '12px', background: '#fff',
                        border: '1px solid rgba(59,79,216,0.10)', borderBottom: 'none', borderRight: 'none', rotate: '45deg',
                      }} />

                      {item.dropdown.map((sub, i) => (
                        <motion.div
                          key={sub.path}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0, transition: { delay: i * 0.06 } }}
                        >
                          <Link
                            to={sub.path}
                            role="menuitem"
                            style={{
                              display: 'flex', alignItems: 'center', gap: '10px',
                              padding: '10px 14px', borderRadius: '10px', textDecoration: 'none',
                              color: location.pathname === sub.path ? '#3B4FD8' : '#374151',
                              background: location.pathname === sub.path ? 'rgba(59,79,216,0.07)' : 'transparent',
                              fontSize: '14px', fontWeight: location.pathname === sub.path ? 600 : 400,
                              transition: 'background 0.15s ease, color 0.15s ease',
                            }}
                            onMouseEnter={(e) => {
                              if (location.pathname !== sub.path) {
                                e.currentTarget.style.background = 'rgba(59,79,216,0.05)'
                                e.currentTarget.style.color = '#0F0C1E'
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (location.pathname !== sub.path) {
                                e.currentTarget.style.background = 'transparent'
                                e.currentTarget.style.color = '#374151'
                              }
                            }}
                          >
                            <motion.span
                              whileHover={{ scale: 1.3 }}
                              style={{
                                width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
                                background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
                                opacity: location.pathname === sub.path ? 1 : 0.4, display: 'block',
                              }}
                            />
                            {sub.label}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>
        )}

        {/* Desktop CTA */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <motion.div whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact"
                style={{
                  padding: '10px 24px', borderRadius: '999px', fontSize: '14px', fontWeight: 600,
                  color: '#fff', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
                  textDecoration: 'none', boxShadow: '0 2px 16px rgba(155,48,232,0.30)',
                  display: 'block', whiteSpace: 'nowrap',
                }}
              >
                Prendre contact
              </Link>
            </motion.div>
          </div>
        )}

        {/* Mobile: CTA + Hamburger */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link
              to="/contact"
              style={{
                padding: '12px 22px', borderRadius: '999px', fontSize: '13px', fontWeight: 600,
                color: '#fff', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
                textDecoration: 'none', boxShadow: '0 2px 12px rgba(155,48,232,0.30)',
                whiteSpace: 'nowrap',
              }}
            >
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
            style={{
              overflow: 'hidden',
              borderTop: '1px solid rgba(0,0,0,0.06)',
              background: '#fff',
              padding: '8px 16px 16px',
            }}
          >
            {/* Formation accordion */}
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
                <motion.svg
                  width="14" height="14" viewBox="0 0 12 12" fill="none"
                  animate={{ rotate: mobileFormationOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
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
                    style={{ overflow: 'hidden', paddingLeft: '12px' }}
                  >
                    {NAV[0].dropdown.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '12px 12px', textDecoration: 'none',
                          color: location.pathname === sub.path ? '#3B4FD8' : '#6B7280',
                          fontSize: '14px', fontWeight: location.pathname === sub.path ? 600 : 400,
                          borderLeft: '2px solid rgba(59,79,216,0.15)',
                        }}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other nav items */}
            {NAV.slice(1).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '14px 12px', textDecoration: 'none',
                  color: location.pathname === item.path ? '#3B4FD8' : '#374151',
                  fontSize: '15px', fontWeight: location.pathname === item.path ? 600 : 500,
                  background: location.pathname.startsWith('/blog') && item.path === '/blog'
                    ? 'rgba(59,79,216,0.06)'
                    : location.pathname === item.path ? 'rgba(59,79,216,0.06)' : 'transparent',
                  borderRadius: '10px',
                }}
              >
                {item.label}
                {item.label === 'Blog' && (
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: 0.4,
                    color: '#fff',
                    background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
                    padding: '1px 6px', borderRadius: 10,
                    lineHeight: '16px',
                  }}>
                    NEW
                  </span>
                )}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
