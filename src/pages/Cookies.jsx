import { useState } from 'react'
import { useSEO } from '../hooks/useSEO'

const COOKIE_TYPES = [
  {
    id: 'essentiels',
    nom: 'Cookies essentiels',
    obligatoire: true,
    desc: 'Indispensables au fonctionnement du site. Ils ne peuvent pas être désactivés.',
    exemples: ['Session utilisateur', 'Préférences de langue', 'Sécurité CSRF'],
    duree: 'Session ou jusqu\'à 1 an',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
  },
  {
    id: 'analytiques',
    nom: 'Cookies analytiques',
    obligatoire: false,
    desc: 'Nous aident à comprendre comment les visiteurs interagissent avec le site (pages visitées, durée, source de trafic).',
    exemples: ['Google Analytics (anonymisé)', 'Statistiques de navigation'],
    duree: '13 mois',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
  },
  {
    id: 'marketing',
    nom: 'Cookies marketing',
    obligatoire: false,
    desc: 'Utilisés pour vous proposer des publicités pertinentes selon vos centres d\'intérêt.',
    exemples: ['LinkedIn Insight Tag', 'Meta Pixel'],
    duree: '90 jours',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    id: 'preferences',
    nom: 'Cookies de préférences',
    obligatoire: false,
    desc: 'Permettent de mémoriser vos préférences de navigation pour personnaliser votre expérience.',
    exemples: ['Thème d\'affichage', 'Consentement cookies'],
    duree: '1 an',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
      </svg>
    ),
  },
]

export default function Cookies() {
  useSEO({
    title: 'Politique de cookies',
    description: 'Gestion des cookies et traceurs sur smartoptimisation.fr — Smart Optimisation.',
    path: '/cookies',
    robots: 'noindex, follow',
  })

  const [prefs, setPrefs] = useState({ analytiques: false, marketing: false, preferences: true })

  const toggle = (id) => setPrefs(p => ({ ...p, [id]: !p[id] }))

  return (
    <main style={{ background: '#fff', minHeight: 'calc(100vh - 72px)', padding: '64px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'rgba(59,79,216,0.07)', border: '1px solid rgba(59,79,216,0.18)', marginBottom: '20px' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg,#3B4FD8,#9B30E8)', flexShrink: 0 }} />
            <span style={{ color: '#3B4FD8', fontSize: '13px', fontWeight: 600 }}>Documents légaux</span>
          </div>
          <h1 style={{ color: '#0F0C1E', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Politique de gestion des cookies
          </h1>
          <p style={{ color: '#6B7280', fontSize: '14px' }}>Dernière mise à jour : mars 2025</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

          <Section title="1. Qu'est-ce qu'un cookie ?">
            <p>Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de la consultation d'un site web. Il permet au site de mémoriser des informations sur votre visite, comme votre langue préférée ou d'autres informations de navigation.</p>
            <p>La durée de vie d'un cookie est limitée dans le temps. Votre consentement est valable pour une durée de <strong>13 mois maximum</strong>.</p>
          </Section>

          <Section title="2. Les cookies que nous utilisons">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
              {COOKIE_TYPES.map(cookie => (
                <div key={cookie.id} style={{
                  borderRadius: '16px',
                  border: '1.5px solid rgba(59,79,216,0.10)',
                  background: '#fff',
                  overflow: 'hidden',
                  boxShadow: '0 2px 12px rgba(59,79,216,0.05)',
                }}>
                  {/* Header carte */}
                  <div style={{ padding: '16px 20px', background: '#F9F8FF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'rgba(59,79,216,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {cookie.icon}
                      </div>
                      <div>
                        <p style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '15px', margin: 0 }}>{cookie.nom}</p>
                        <p style={{ color: '#6B7280', fontSize: '11px', margin: '2px 0 0' }}>Durée : {cookie.duree}</p>
                      </div>
                    </div>
                    {/* Toggle */}
                    {cookie.obligatoire ? (
                      <span style={{ padding: '4px 12px', borderRadius: '999px', background: 'rgba(16,185,129,0.10)', border: '1px solid rgba(16,185,129,0.25)', color: '#059669', fontSize: '11px', fontWeight: 600 }}>
                        Toujours actif
                      </span>
                    ) : (
                      <button
                        onClick={() => toggle(cookie.id)}
                        style={{
                          width: '48px', height: '26px',
                          borderRadius: '999px',
                          border: 'none',
                          background: prefs[cookie.id] ? 'linear-gradient(135deg,#3B4FD8,#9B30E8)' : '#D1D5DB',
                          cursor: 'pointer',
                          position: 'relative',
                          transition: 'background 0.2s',
                          flexShrink: 0,
                        }}
                        aria-label={`Activer/désactiver ${cookie.nom}`}
                      >
                        <span style={{
                          position: 'absolute',
                          top: '3px',
                          left: prefs[cookie.id] ? '24px' : '3px',
                          width: '20px', height: '20px',
                          borderRadius: '50%',
                          background: '#fff',
                          boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                          transition: 'left 0.2s',
                        }} />
                      </button>
                    )}
                  </div>
                  {/* Body carte */}
                  <div style={{ padding: '16px 20px' }}>
                    <p style={{ color: '#1F2937', fontSize: '13px', lineHeight: 1.6, margin: '0 0 10px' }}>{cookie.desc}</p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {cookie.exemples.map(ex => (
                        <span key={ex} style={{ padding: '3px 10px', borderRadius: '999px', background: 'rgba(59,79,216,0.06)', border: '1px solid rgba(59,79,216,0.12)', color: '#3B4FD8', fontSize: '11px', fontWeight: 500 }}>
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="3. Comment gérer vos cookies ?">
            <p>En plus du panneau de gestion ci-dessus, vous pouvez à tout moment contrôler ou supprimer les cookies via les paramètres de votre navigateur :</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', marginTop: '8px' }}>
              {[
                { nav: 'Google Chrome', lien: 'https://support.google.com/chrome/answer/95647' },
                { nav: 'Mozilla Firefox', lien: 'https://support.mozilla.org/fr/kb/protection-renforcee-contre-pistage-firefox' },
                { nav: 'Safari', lien: 'https://support.apple.com/fr-fr/guide/safari/sfri11471/mac' },
                { nav: 'Microsoft Edge', lien: 'https://support.microsoft.com/fr-fr/topic/supprimer-et-gérer-les-cookies' },
              ].map(b => (
                <a key={b.nav} href={b.lien} target="_blank" rel="noopener noreferrer" style={{
                  padding: '12px 16px', borderRadius: '12px',
                  background: '#F9F8FF', border: '1px solid rgba(59,79,216,0.08)',
                  color: '#3B4FD8', fontSize: '13px', fontWeight: 600,
                  textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px',
                }}>
                  {b.nav}
                </a>
              ))}
            </div>
            <p>Attention : désactiver certains cookies peut affecter votre expérience de navigation sur notre site.</p>
          </Section>

          <Section title="4. Mise à jour de cette politique">
            <p>Smart Optimisation se réserve le droit de modifier cette politique à tout moment, notamment pour se conformer aux évolutions réglementaires. Nous vous invitons à la consulter régulièrement.</p>
            <p>Pour toute question : <strong>contact@smartoptimisation.fr</strong></p>
          </Section>

        </div>
      </div>
    </main>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ borderLeft: '3px solid', borderImage: 'linear-gradient(180deg,#3B4FD8,#9B30E8) 1', paddingLeft: '24px' }}>
      <h2 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '18px', marginBottom: '14px' }}>{title}</h2>
      <div style={{ color: '#1F2937', fontSize: '15px', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {children}
      </div>
    </div>
  )
}
