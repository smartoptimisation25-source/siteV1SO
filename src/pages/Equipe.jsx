import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSEO } from '../hooks/useSEO'
import useIsMobile from '../hooks/useIsMobile'
import Breadcrumb from '../components/Breadcrumb'

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: i * 0.1 },
  }),
}

const FOUNDERS = [
  {
    name: 'Jounayd Ouadah Loubardi',
    role: 'Président & Co-fondateur',
    tagline: 'Stratégie, optimisation & formation certifiée Qualiopi',
    linkedin: 'https://www.linkedin.com/in/jounayd-ouadah-09b154225/',
    // photo: '/team/jounayd.jpg',
  },
  {
    name: 'Adel El Kammaa',
    role: 'Directeur Général & Co-fondateur',
    tagline: 'Expert IA & Déploiement Opérationnel',
    linkedin: 'https://www.linkedin.com/in/rayane-el-kammaa-904306340/',
    // photo: '/team/adel.jpg',
  },
]

const CERTIFICATIONS = [
  { label: 'Qualiopi', detail: 'Certificat n° CERT_S1125_1328 — CEVA Solution', sub: 'Actions de formation — Valide jusqu\'au 09/01/2029' },
  { label: 'France Compétences', detail: 'Certification RS7344 enregistrée au Répertoire Spécifique', link: 'https://www.francecompetences.fr/recherche/rs/7344/' },
  { label: 'NDA', detail: 'Déclaration d\'activité n° 11757342375', sub: 'Enregistrée auprès du Préfet de région' },
]

const VALUES = [
  {
    title: 'Sur mesure, pas de copier-coller',
    desc: 'Chaque accompagnement est construit autour de votre réalité : vos outils, votre secteur, vos contraintes.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    title: 'Résultats mesurables',
    desc: 'ROI mesurable dès J+30. On ne promet pas des concepts, on livre des résultats concrets.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
  },
  {
    title: 'Zéro jargon, 100% terrain',
    desc: 'Nos formations sont pensées pour des professionnels, pas pour des ingénieurs. On parle votre langue.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    title: 'Conformité intégrée',
    desc: 'EU AI Act, RGPD, éthique IA — la conformité n\'est pas une option, c\'est notre standard de base.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
]

const EQUIPE_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': 'https://smartoptimisation.fr/equipe',
      'name': 'L\'équipe Smart Optimisation',
      'description': 'Découvrez les co-fondateurs de Smart Optimisation : Jounayd Ouadah Loubardi et Adel El Kammaa, experts en intelligence artificielle et formation professionnelle certifiée Qualiopi.',
      'mainEntityOfPage': 'https://smartoptimisation.fr/equipe',
      'publisher': { '@id': 'https://smartoptimisation.fr/#organization' },
    },
    {
      '@type': 'Person',
      '@id': 'https://smartoptimisation.fr/#founder',
      'name': 'Jounayd Ouadah Loubardi',
      'jobTitle': 'Président & Co-fondateur',
      'description': 'Stratégie, optimisation & formation certifiée Qualiopi',
      'worksFor': { '@id': 'https://smartoptimisation.fr/#organization' },
      'sameAs': ['https://www.linkedin.com/in/jounayd-ouadah-09b154225/'],
      'knowsAbout': ['Intelligence Artificielle', 'Formation professionnelle', 'Stratégie d\'entreprise', 'Certification Qualiopi'],
    },
    {
      '@type': 'Person',
      '@id': 'https://smartoptimisation.fr/#cofounder',
      'name': 'Adel El Kammaa',
      'jobTitle': 'Directeur Général & Co-fondateur',
      'description': 'Expert IA & Déploiement Opérationnel',
      'worksFor': { '@id': 'https://smartoptimisation.fr/#organization' },
      'sameAs': ['https://www.linkedin.com/in/rayane-el-kammaa-904306340/'],
      'knowsAbout': ['Intelligence Artificielle', 'Déploiement opérationnel', 'LLMs', 'Automatisation'],
    },
    {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://smartoptimisation.fr/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'L\'équipe' },
      ],
    },
  ],
}

/* ── Icône LinkedIn ─────────────────────────────────────── */
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

/* ── Composant carte fondateur ──────────────────────────── */
function FounderCard({ founder, index, isMobile }) {
  const initials = founder.name.split(' ').map(n => n[0]).join('').slice(0, 2)

  return (
    <motion.article
      variants={FADE_UP}
      initial="hidden"
      animate="show"
      custom={index}
      style={{
        flex: 1,
        minWidth: isMobile ? '100%' : '340px',
        maxWidth: '500px',
        background: '#fff',
        borderRadius: '20px',
        border: '1px solid #E5E7EB',
        padding: isMobile ? '32px 24px' : '40px 36px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '20px',
      }}
    >
      {/* Avatar — remplacé par la photo quand disponible */}
      {founder.photo ? (
        <img
          src={founder.photo}
          alt={`${founder.name} — ${founder.role} chez Smart Optimisation`}
          width="120"
          height="120"
          loading="lazy"
          decoding="async"
          style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #3B4FD8' }}
        />
      ) : (
        <div style={{
          width: '120px', height: '120px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '36px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em',
        }}
          aria-hidden="true"
        >
          {initials}
        </div>
      )}

      <div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0F0C1E', marginBottom: '6px' }}>
          {founder.name}
        </h2>
        <p style={{ fontSize: '15px', fontWeight: 600, color: '#3B4FD8', marginBottom: '4px' }}>
          {founder.role}
        </p>
        <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.5 }}>
          {founder.tagline}
        </p>
      </div>

      <a
        href={founder.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Voir le profil LinkedIn de ${founder.name}`}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '10px 20px', borderRadius: '10px',
          background: '#0A66C2', color: '#fff',
          fontSize: '14px', fontWeight: 600,
          textDecoration: 'none',
          minHeight: '48px',
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >
        <LinkedInIcon />
        Voir le profil LinkedIn
      </a>
    </motion.article>
  )
}

/* ── Page principale ────────────────────────────────────── */
export default function Equipe() {
  const isMobile = useIsMobile()

  useSEO({
    title: 'Notre équipe — Jounayd Ouadah Loubardi & Adel El Kammaa',
    description: 'Rencontrez les co-fondateurs de Smart Optimisation : Jounayd Ouadah Loubardi (Président) et Adel El Kammaa (DG), experts en IA et formation professionnelle certifiée Qualiopi à Strasbourg.',
    path: '/equipe',
    jsonLd: EQUIPE_SCHEMA,
    keywords: 'Smart Optimisation équipe, Jounayd Ouadah Loubardi, Adel El Kammaa, expert IA Strasbourg, formateur IA certifié Qualiopi',
  })

  return (
    <main style={{ background: '#fff' }}>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '88px 24px 0' }}>
        <Breadcrumb items={[
          { label: 'Accueil', to: '/' },
          { label: "L'équipe" },
        ]} />
      </div>

      {/* ── Hero ────────────────────────────────────────── */}
      <section style={{
        maxWidth: '900px', margin: '0 auto',
        padding: isMobile ? '20px 20px 40px' : '32px 24px 56px',
        textAlign: 'center',
      }}>
        <motion.p
          variants={FADE_UP} initial="hidden" animate="show" custom={0}
          style={{ fontSize: '13px', fontWeight: 600, color: '#3B4FD8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}
        >
          L'équipe
        </motion.p>

        <motion.h1
          variants={FADE_UP} initial="hidden" animate="show" custom={1}
          style={{
            fontSize: isMobile ? 'clamp(1.8rem, 5vw, 2.4rem)' : 'clamp(2.2rem, 4vw, 3rem)',
            fontWeight: 800, color: '#0F0C1E', lineHeight: 1.15,
            letterSpacing: '-0.02em', marginBottom: '16px',
          }}
        >
          Deux experts, une mission :{' '}
          <span style={{ background: 'linear-gradient(90deg, #3B4FD8, #9B30E8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            rendre l'IA accessible à tous
          </span>
        </motion.h1>

        <motion.p
          variants={FADE_UP} initial="hidden" animate="show" custom={2}
          style={{ fontSize: isMobile ? '15px' : '17px', color: '#6B7280', lineHeight: 1.7, maxWidth: '640px', margin: '0 auto' }}
        >
          Smart Optimisation est née d'une conviction : l'intelligence artificielle ne doit pas être réservée aux grandes entreprises.
          Nous accompagnons les professionnels et les organisations dans leur montée en compétences IA, avec des formations certifiées et des solutions concrètes.
        </motion.p>
      </section>

      {/* ── Fondateurs ──────────────────────────────────── */}
      <section style={{
        maxWidth: '1000px', margin: '0 auto',
        padding: isMobile ? '0 20px 56px' : '0 24px 72px',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '28px',
          justifyContent: 'center',
          alignItems: isMobile ? 'center' : 'stretch',
        }}>
          {FOUNDERS.map((f, i) => (
            <FounderCard key={f.name} founder={f} index={i} isMobile={isMobile} />
          ))}
        </div>
      </section>

      {/* ── Nos valeurs ─────────────────────────────────── */}
      <section style={{
        background: '#FAFAFE',
        padding: isMobile ? '56px 20px' : '72px 24px',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.h2
            variants={FADE_UP} initial="hidden" whileInView="show" viewport={{ once: true }}
            style={{ fontSize: isMobile ? '24px' : '30px', fontWeight: 700, color: '#0F0C1E', textAlign: 'center', marginBottom: '40px' }}
          >
            Ce qui nous guide
          </motion.h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '20px',
          }}>
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                variants={FADE_UP} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                style={{
                  background: '#fff', borderRadius: '16px', border: '1px solid #E5E7EB',
                  padding: '28px', display: 'flex', gap: '16px', alignItems: 'flex-start',
                }}
              >
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(59,79,216,0.1), rgba(155,48,232,0.1))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#3B4FD8', flexShrink: 0,
                }}>
                  {v.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F0C1E', marginBottom: '6px' }}>{v.title}</h3>
                  <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ──────────────────────────────── */}
      <section style={{
        maxWidth: '900px', margin: '0 auto',
        padding: isMobile ? '56px 20px' : '72px 24px',
      }}>
        <motion.h2
          variants={FADE_UP} initial="hidden" whileInView="show" viewport={{ once: true }}
          style={{ fontSize: isMobile ? '24px' : '30px', fontWeight: 700, color: '#0F0C1E', textAlign: 'center', marginBottom: '40px' }}
        >
          Nos certifications
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {CERTIFICATIONS.map((c, i) => (
            <motion.div
              key={c.label}
              variants={FADE_UP} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              style={{
                background: '#FAFAFE', borderRadius: '14px', border: '1px solid #E5E7EB',
                padding: '24px 28px', display: 'flex', alignItems: isMobile ? 'flex-start' : 'center',
                gap: '16px', flexDirection: isMobile ? 'column' : 'row',
              }}
            >
              <span style={{
                background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
                color: '#fff', fontWeight: 700, fontSize: '13px',
                padding: '6px 14px', borderRadius: '8px', whiteSpace: 'nowrap',
              }}>
                {c.label}
              </span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '15px', fontWeight: 600, color: '#0F0C1E', marginBottom: c.sub ? '4px' : 0 }}>
                  {c.detail}
                </p>
                {c.sub && <p style={{ fontSize: '13px', color: '#6B7280' }}>{c.sub}</p>}
              </div>
              {c.link && (
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '13px', fontWeight: 600, color: '#3B4FD8',
                    textDecoration: 'none', whiteSpace: 'nowrap',
                    minHeight: '48px', display: 'inline-flex', alignItems: 'center',
                  }}
                >
                  Vérifier →
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section style={{
        padding: isMobile ? '48px 20px 80px' : '56px 24px 96px',
        textAlign: 'center',
      }}>
        <motion.div
          variants={FADE_UP} initial="hidden" whileInView="show" viewport={{ once: true }}
          style={{
            maxWidth: '640px', margin: '0 auto',
            background: 'linear-gradient(135deg, rgba(59,79,216,0.06), rgba(155,48,232,0.06))',
            borderRadius: '20px', border: '1px solid rgba(59,79,216,0.12)',
            padding: isMobile ? '36px 24px' : '48px 40px',
          }}
        >
          <h2 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: 700, color: '#0F0C1E', marginBottom: '12px' }}>
            Échangeons sur votre projet
          </h2>
          <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.6, marginBottom: '24px' }}>
            Audit IA gratuit, formation sur mesure ou déploiement de solution — nous répondons sous 24h.
          </p>
          <Link
            to="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 28px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #3B4FD8, #7B4FE8)',
              color: '#fff', fontWeight: 700, fontSize: '15px',
              textDecoration: 'none', minHeight: '48px',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Prendre contact →
          </Link>
        </motion.div>
      </section>
    </main>
  )
}
