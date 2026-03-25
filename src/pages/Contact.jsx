import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSEO } from '../hooks/useSEO'
import useIsMobile from '../hooks/useIsMobile'
import Breadcrumb from '../components/Breadcrumb'

const SERVICES = [
  {
    id: 'formation',
    label: 'Formation',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    desc: 'CPF, OPCO, sur mesure',
  },
  {
    id: 'solution-ia',
    label: 'Solution IA sur mesure',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/>
      </svg>
    ),
    desc: 'Intégration IA dans vos process',
  },
  {
    id: 'educ-ia',
    label: 'Educ IA',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    desc: 'Sensibilisation & pédagogie',
  },
]

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: i * 0.1 },
  }),
}

const INFO_ITEMS = [
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    label: 'Email',
    value: 'contact@smartoptimisation.fr',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    label: 'Localisation',
    value: 'Alsace, France',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    label: 'Réponse sous',
    value: '24 heures ouvrées',
  },
]

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Comment financer une formation IA via l\'OPCO ?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Votre OPCO (Atlas, Akto, Uniformation, OCAPIAT...) prend en charge 100% du coût de la formation IA. Smart Optimisation gère l\'intégralité du dossier administratif. Aucune avance de trésorerie n\'est nécessaire. Réponse de faisabilité sous 48h.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Puis-je utiliser mon CPF pour une formation IA ?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Oui. Notre formation « Utiliser l\'IA Générative en entreprise » est certifiée CPF RS7344. Vous pouvez l\'utiliser pour financer tout ou partie des 1 500 €. 0 € de reste à charge possible selon votre solde CPF.',
          },
        },
        {
          '@type': 'Question',
          'name': 'L\'EU AI Act concerne-t-il mon entreprise ?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'L\'EU AI Act s\'applique à toutes les entreprises qui utilisent, développent ou distribuent des systèmes IA en Europe. Nos formations sur mesure incluent un module dédié à la conformité EU AI Act et à la mise à jour RGPD liée à l\'IA.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Qu\'est-ce qu\'un audit IA gratuit ?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'L\'audit IA gratuit est un premier échange de 30 à 60 minutes avec un expert Smart Optimisation. Nous analysons vos processus métier, identifions les opportunités d\'automatisation IA à fort ROI et vous proposons un plan d\'action concret. Sans engagement.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Quel est le délai de réponse après contact ?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Notre équipe vous répond sous 24 heures ouvrées. Le premier échange est offert et sans engagement.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Comment fonctionne le déploiement d\'une solution IA sur mesure ?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Notre méthode en 4 phases : Écoute (audit de vos processus), Cadrage (architecture technique et MVP), Construction (développement itératif avec démos), Déploiement (mise en production, formation équipes, monitoring). De l\'idée au déploiement en production.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://smartoptimisation.fr/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Contact' },
      ],
    },
  ],
}

export default function Contact() {
  useSEO({
    title: 'Contact — Audit IA gratuit sous 48h',
    description: 'Demandez votre audit IA gratuit ou renseignez-vous sur nos formations IA (OPCO, CPF) et solutions IA sur mesure. Réponse sous 24h. Basés à Strasbourg, intervenons dans toute la France.',
    path: '/contact',
    jsonLd: FAQ_SCHEMA,
    keywords: 'contact Smart Optimisation, audit IA gratuit, devis formation IA, contact formation IA Strasbourg',
  })
  const isMobile = useIsMobile()
  const [form, setForm] = useState({ nom: '', email: '', telephone: '', service: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handle = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  const selectService = (id) => setForm((f) => ({ ...f, service: id }))

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('https://formspree.io/f/xpwrpndl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          nom: form.nom,
          email: form.email,
          telephone: form.telephone || 'Non renseigné',
          service: form.service,
          message: form.message,
        }),
      })
      if (res.ok) {
        setSent(true)
      } else {
        setError('Une erreur est survenue. Réessayez ou écrivez-nous directement.')
      }
    } catch {
      setError('Problème de connexion. Réessayez ou contactez-nous par email.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ background: '#fff', minHeight: 'calc(100vh - 72px)', padding: '72px 24px' }}>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <Breadcrumb items={[
          { label: 'Accueil', to: '/' },
          { label: 'Contact' },
        ]} />
      </div>

      {/* Background blobs animés */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'fixed', top: '-200px', right: '-150px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,48,232,0.07) 0%, transparent 70%)', pointerEvents: 'none' }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], y: [0, 20, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{ position: 'fixed', bottom: '-150px', left: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,79,216,0.06) 0%, transparent 70%)', pointerEvents: 'none' }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '80px', alignItems: 'start' }}>

        {/* ── LEFT — Info ─────────────────────────────────── */}
        <motion.div variants={FADE_UP} initial="hidden" animate="show" custom={0}>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'rgba(59,79,216,0.07)', border: '1px solid rgba(59,79,216,0.18)', marginBottom: '28px' }}>
            <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg,#3B4FD8,#9B30E8)', flexShrink: 0, display: 'block' }} />
            <span style={{ color: '#3B4FD8', fontSize: '13px', fontWeight: 600 }}>Parlons de votre projet</span>
          </div>

          <h1 style={{ color: '#0F0C1E', fontWeight: 800, fontSize: 'clamp(2rem,3.5vw,3rem)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '20px' }}>
            Transformez votre vision{' '}
            <motion.span
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundImage: 'linear-gradient(135deg,#3B4FD8,#9B30E8,#E83B9B,#3B4FD8)', backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              en réalité
            </motion.span>
          </h1>

          <p style={{ color: '#6B7280', fontSize: '16px', lineHeight: 1.7, marginBottom: '48px', maxWidth: '400px' }}>
            Notre équipe vous répond sous 24h pour construire ensemble la solution IA adaptée à votre secteur et vos objectifs.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {INFO_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.3 + i * 0.1, duration: 0.4 } }}
                whileHover={{ x: 6, transition: { duration: 0.18 } }}
                style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'default' }}
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1, transition: { type: 'spring', stiffness: 300 } }}
                  style={{ width: 40, height: 40, borderRadius: '10px', background: 'rgba(59,79,216,0.07)', border: '1px solid rgba(59,79,216,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B4FD8', flexShrink: 0 }}
                >
                  {item.icon}
                </motion.div>
                <div>
                  <p style={{ color: '#9CA3AF', fontSize: '12px', margin: 0 }}>{item.label}</p>
                  <p style={{ color: '#0F0C1E', fontSize: '14px', fontWeight: 600, margin: 0 }}>{item.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT — Formulaire ──────────────────────────── */}
        <motion.div variants={FADE_UP} initial="hidden" animate="show" custom={1}>
          <motion.div
            whileHover={{ boxShadow: '0 32px 96px rgba(59,79,216,0.13)', transition: { duration: 0.3 } }}
            style={{ background: '#fff', borderRadius: '24px', border: '1px solid rgba(59,79,216,0.10)', boxShadow: '0 24px 80px rgba(59,79,216,0.09), 0 4px 16px rgba(0,0,0,0.04)', padding: '40px' }}
          >

            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '40px 0' }}>
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg,#3B4FD8,#9B30E8)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </motion.div>
                <h2 style={{ color: '#0F0C1E', fontWeight: 800, fontSize: '22px', marginBottom: '12px' }}>Message envoyé !</h2>
                <p style={{ color: '#6B7280', fontSize: '15px', lineHeight: 1.6 }}>
                  Merci pour votre demande. Notre équipe vous contactera sous 24h ouvrées.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h2 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '20px', margin: '0 0 4px' }}>Votre demande</h2>

                <div>
                  <label style={labelStyle}>Nom complet</label>
                  <input required type="text" placeholder="Jean Dupont" value={form.nom} onChange={handle('nom')} style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = '#3B4FD8'; e.target.style.boxShadow = '0 0 0 3px rgba(59,79,216,0.10)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,0.10)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input required type="email" placeholder="jean@entreprise.fr" value={form.email} onChange={handle('email')} style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = '#3B4FD8'; e.target.style.boxShadow = '0 0 0 3px rgba(59,79,216,0.10)' }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,0.10)'; e.target.style.boxShadow = 'none' }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Téléphone</label>
                    <input type="tel" placeholder="+33 6 00 00 00 00" value={form.telephone} onChange={handle('telephone')} style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = '#3B4FD8'; e.target.style.boxShadow = '0 0 0 3px rgba(59,79,216,0.10)' }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,0.10)'; e.target.style.boxShadow = 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Votre besoin *</label>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '10px', marginTop: '8px' }}>
                    {SERVICES.map((s) => {
                      const active = form.service === s.id
                      return (
                        <motion.button
                          key={s.id}
                          type="button"
                          onClick={() => selectService(s.id)}
                          whileHover={{ scale: 1.04, y: -2, transition: { duration: 0.15 } }}
                          whileTap={{ scale: 0.97 }}
                          style={{
                            padding: '14px 10px', borderRadius: '14px',
                            border: active ? '2px solid #3B4FD8' : '1.5px solid rgba(0,0,0,0.10)',
                            background: active ? 'rgba(59,79,216,0.06)' : '#fff',
                            cursor: 'pointer', textAlign: 'center',
                            transition: 'border 0.18s, background 0.18s',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                            boxShadow: active ? '0 4px 16px rgba(59,79,216,0.12)' : 'none',
                          }}
                        >
                          <motion.span
                            animate={active ? { rotate: [0, -5, 5, 0], scale: [1, 1.1, 1] } : {}}
                            transition={{ duration: 0.4 }}
                            style={{ color: active ? '#3B4FD8' : '#6B7280' }}
                          >
                            {s.icon}
                          </motion.span>
                          <span style={{ color: active ? '#3B4FD8' : '#0F0C1E', fontSize: '12px', fontWeight: active ? 700 : 500, lineHeight: 1.3 }}>{s.label}</span>
                          <span style={{ color: '#9CA3AF', fontSize: '10px' }}>{s.desc}</span>
                        </motion.button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Votre message</label>
                  <textarea rows={4} placeholder="Décrivez votre projet, votre secteur, vos objectifs..." value={form.message} onChange={handle('message')}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                    onFocus={e => { e.target.style.borderColor = '#3B4FD8'; e.target.style.boxShadow = '0 0 0 3px rgba(59,79,216,0.10)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,0.10)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading || !form.email || !form.service}
                  whileHover={!loading && form.email && form.service ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!loading && form.email && form.service ? { scale: 0.98 } : {}}
                  style={{
                    padding: '14px 32px', borderRadius: '999px', fontSize: '15px', fontWeight: 700, color: '#fff',
                    background: loading || !form.email || !form.service ? 'rgba(59,79,216,0.40)' : 'linear-gradient(135deg,#3B4FD8,#9B30E8)',
                    border: 'none', cursor: loading || !form.email || !form.service ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 20px rgba(155,48,232,0.30)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%',
                  }}
                >
                  {loading ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}>
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                      </svg>
                      Envoi en cours…
                    </>
                  ) : 'Lancer mon diagnostic gratuit →'}
                </motion.button>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                    style={{ color: '#DC2626', fontSize: '13px', textAlign: 'center', margin: 0, padding: '10px 16px', background: 'rgba(220,38,38,0.06)', borderRadius: '8px', border: '1px solid rgba(220,38,38,0.15)' }}
                  >
                    ⚠️ {error}
                  </motion.p>
                )}

                <p style={{ color: '#9CA3AF', fontSize: '11px', textAlign: 'center', margin: 0 }}>
                  En envoyant ce formulaire, vous acceptez notre politique de confidentialité.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          main > div { grid-template-columns: 1fr !important; gap: 40px !important; }
          main { padding-top: 40px !important; padding-bottom: 40px !important; }
        }
      `}</style>
    </main>
  )
}

const labelStyle = {
  display: 'block', color: '#374151', fontSize: '14px', fontWeight: 600, marginBottom: '6px',
}

const inputStyle = {
  width: '100%', padding: '11px 14px', borderRadius: '10px',
  border: '1.5px solid rgba(0,0,0,0.10)', fontSize: '16px', color: '#0F0C1E',
  background: '#FAFAFA', outline: 'none', fontFamily: 'inherit',
  transition: 'border-color 0.18s, box-shadow 0.18s', boxSizing: 'border-box',
}
