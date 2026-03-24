import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useSEO } from '../hooks/useSEO'
import useIsMobile from '../hooks/useIsMobile'

/* ── JSON-LD : Article + FAQPage ─────────────────────────────────── */
const BLOG_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': 'https://smartoptimisation.fr/blog/formations-ia-opco-guide-2026',
      'headline': 'Formations IA et OPCO : Le guide complet 2026 pour former vos équipes sans budget supplémentaire',
      'description': 'Financement OPCO IA, prise en charge formation IA 100%. Guide 2026 pour former vos équipes à l\'IA sans budget supplémentaire grâce aux OPCO.',
      'url': 'https://smartoptimisation.fr/blog/formations-ia-opco-guide-2026',
      'datePublished': '2026-03-19',
      'dateModified': '2026-03-19',
      'inLanguage': 'fr-FR',
      'author': { '@type': 'Organization', 'name': 'Smart Optimisation', 'url': 'https://smartoptimisation.fr' },
      'publisher': { '@id': 'https://smartoptimisation.fr/#organization' },
      'image': 'https://smartoptimisation.fr/og-image.png',
      'articleSection': 'Formation IA',
      'keywords': ['Financement OPCO IA', 'Prise en charge formation IA', 'Audit IA entreprise gratuit', 'Développement compétences IA', 'Formation IA entreprise OPCO'],
      'about': [
        { '@type': 'Thing', 'name': 'Financement OPCO formation IA' },
        { '@type': 'Thing', 'name': 'Développement compétences IA entreprise' },
        { '@type': 'Thing', 'name': 'EU AI Act conformité' },
      ],
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Quel est le délai entre la demande et le début de la formation IA financée OPCO ?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'En moyenne, comptez 2 à 3 semaines entre le premier contact et le démarrage de la formation. Notre équipe obtient généralement une réponse de faisabilité de l\'OPCO sous 48h ouvrées. Le dossier complet est traité en 1 à 2 semaines selon l\'OPCO.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Comment savoir si mon entreprise est éligible au financement OPCO pour une formation IA ?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Toute entreprise employant au moins un salarié cotise à un OPCO et est donc éligible par défaut. Le montant disponible dépend de votre masse salariale, de votre secteur et de votre historique de formations. Smart Optimisation vérifie votre éligibilité gratuitement sous 48h ouvrées.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Quelle est la différence entre une formation IA standard et une formation IA sur mesure OPCO ?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Une formation IA standard (ex. RS7411 CPF) est un programme certifiant défini, avec des sessions planifiées, idéal pour une montée en compétences individuelle. Une formation IA sur mesure OPCO est co-construite avec votre équipe, basée sur vos outils réels et processus métier, plus adaptée aux formations collectives de 3 à 200 personnes. Les deux sont finançables via votre OPCO.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://smartoptimisation.fr/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': 'https://smartoptimisation.fr/blog' },
        { '@type': 'ListItem', 'position': 3, 'name': 'Formations IA & OPCO : Guide 2026', 'item': 'https://smartoptimisation.fr/blog/formations-ia-opco-guide-2026' },
      ],
    },
  ],
}

/* ── CTA inline ──────────────────────────────────────────────────── */
function InlineCTA({ label = 'Vérifier mon éligibilité OPCO', sub }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      viewport={{ once: true }}
      style={{
        margin: '36px 0',
        padding: '28px 32px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, rgba(59,79,216,0.06) 0%, rgba(155,48,232,0.06) 100%)',
        border: '1.5px solid rgba(59,79,216,0.14)',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px',
      }}
    >
      <div>
        <p style={{ fontWeight: 700, fontSize: '16px', color: '#0F0C1E', margin: '0 0 4px' }}>{label}</p>
        {sub && <p style={{ color: '#6B7280', fontSize: '13px', margin: 0 }}>{sub}</p>}
      </div>
      <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
        <Link
          to="/contact"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '13px 28px', borderRadius: '999px', fontWeight: 700, fontSize: '14px',
            color: '#fff', textDecoration: 'none',
            background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
            boxShadow: '0 4px 20px rgba(155,48,232,0.30)',
            whiteSpace: 'nowrap',
          }}
        >
          Vérifier mon éligibilité
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </Link>
      </motion.div>
    </motion.div>
  )
}

/* ── Tag pill ────────────────────────────────────────────────────── */
function Tag({ label, color = '#3B4FD8' }) {
  return (
    <span style={{
      padding: '4px 12px', borderRadius: '999px',
      background: `${color}12`, border: `1px solid ${color}25`,
      color, fontSize: '12px', fontWeight: 600, letterSpacing: '0.02em',
    }}>
      {label}
    </span>
  )
}

/* ── Table comparatif ────────────────────────────────────────────── */
function CompTable({ rows, headers }) {
  return (
    <div style={{ overflowX: 'auto', margin: '24px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr style={{ background: 'linear-gradient(135deg, rgba(59,79,216,0.08), rgba(155,48,232,0.08))' }}>
            {headers.map((h, i) => (
              <th key={i} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700, color: '#0F0C1E', borderBottom: '2px solid rgba(59,79,216,0.15)', whiteSpace: 'nowrap' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid rgba(59,79,216,0.07)', background: i % 2 === 0 ? '#fff' : 'rgba(59,79,216,0.02)' }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: '11px 16px', color: j === 0 ? '#0F0C1E' : '#374151', fontWeight: j === 0 ? 600 : 400, verticalAlign: 'middle' }}
                  dangerouslySetInnerHTML={{ __html: cell }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ── Section H2 ──────────────────────────────────────────────────── */
function Section({ number, title, children }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginBottom: '64px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
        <span style={{
          width: 32, height: 32, borderRadius: '10px', flexShrink: 0,
          background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: '13px', fontWeight: 800,
        }}>
          {number}
        </span>
        <h2 style={{ color: '#0F0C1E', fontWeight: 800, fontSize: 'clamp(1.3rem, 2.2vw, 1.65rem)', lineHeight: 1.25, letterSpacing: '-0.02em', margin: 0 }}>
          {title}
        </h2>
      </div>
      <div style={{ borderLeft: '3px solid rgba(59,79,216,0.12)', paddingLeft: '28px', marginLeft: '8px' }}>
        {children}
      </div>
    </motion.section>
  )
}

/* ── Stat card ───────────────────────────────────────────────────── */
function StatCard({ val, label, color = '#3B4FD8' }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: `0 12px 32px ${color}15`, transition: { duration: 0.2 } }}
      style={{
        padding: '20px 24px', borderRadius: '16px',
        background: '#fff', border: `1px solid ${color}18`,
        boxShadow: '0 2px 12px rgba(59,79,216,0.06)',
        cursor: 'default', flex: 1, minWidth: '140px',
        textAlign: 'center',
      }}
    >
      <div style={{ fontWeight: 800, fontSize: '2rem', color, letterSpacing: '-0.02em', lineHeight: 1 }}>{val}</div>
      <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '6px', lineHeight: 1.4 }}>{label}</div>
    </motion.div>
  )
}

/* ── FAQ Item ────────────────────────────────────────────────────── */
function FAQItem({ q, a, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: i * 0.08 }}
      style={{
        padding: '24px 28px', borderRadius: '16px',
        background: '#FAFBFF', border: '1px solid rgba(59,79,216,0.10)',
        marginBottom: '14px',
      }}
    >
      <h3 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '15.5px', lineHeight: 1.4, marginBottom: '10px' }}>
        <span style={{ color: '#3B4FD8', marginRight: '8px' }}>Q.</span>{q}
      </h3>
      <p style={{ color: '#374151', fontSize: '14px', lineHeight: 1.75, margin: 0 }}>{a}</p>
    </motion.div>
  )
}

/* ── Page ────────────────────────────────────────────────────────── */
export default function BlogFormationsIAOPCO() {
  const isMobile = useIsMobile()
  useSEO({
    title: 'Formations IA & OPCO : Guide complet 2026',
    description: 'Financement OPCO IA, prise en charge formation IA 100%. Guide 2026 pour former vos équipes à l\'IA sans budget supplémentaire. Audit IA entreprise gratuit.',
    path: '/blog/formations-ia-opco-guide-2026',
    jsonLd: BLOG_SCHEMA,
  })

  return (
    <main style={{ background: '#fff', minHeight: 'calc(100vh - 72px)' }}>

      {/* ── Hero article ──────────────────────────────── */}
      <header style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(59,79,216,0.04) 0%, rgba(155,48,232,0.04) 100%)',
        borderBottom: '1px solid rgba(59,79,216,0.08)',
        padding: isMobile ? '40px 20px 36px' : '64px 48px 56px',
      }}>
        {/* Blobs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: -80, right: -80, width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,48,232,0.08) 0%, transparent 70%)', pointerEvents: 'none' }}
        />

        <div style={{ maxWidth: '780px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Breadcrumb */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '13px', color: '#9CA3AF', flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Accueil</Link>
            <span>/</span>
            <span style={{ color: '#3B4FD8', fontWeight: 500 }}>Blog</span>
            <span>/</span>
            <span style={{ color: '#3B4FD8', fontWeight: 500 }}>Guide OPCO 2026</span>
          </nav>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <Tag label="IA" color="#3B4FD8" />
            <Tag label="RH" color="#9B30E8" />
            <Tag label="OPCO" color="#059669" />
            <Tag label="Formation" color="#D97706" />
          </div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{
              color: '#0F0C1E', fontWeight: 800,
              fontSize: isMobile ? '1.75rem' : 'clamp(1.9rem, 3.5vw, 2.8rem)',
              lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '20px',
            }}
          >
            Formations IA et OPCO :{' '}
            <motion.span
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundImage: 'linear-gradient(135deg,#3B4FD8,#9B30E8,#E83B9B,#3B4FD8)', backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              Le guide complet 2026
            </motion.span>{' '}
            pour former vos équipes sans budget supplémentaire.
          </motion.h1>

          {/* Meta article */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', color: '#9CA3AF', fontSize: '13px' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              8 min de lecture
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/></svg>
              19 mars 2026
            </span>
            <span>Par l'équipe Smart Optimisation</span>
          </motion.div>
        </div>
      </header>

      {/* ── Corps de l'article ─────────────────────────────────── */}
      <article style={{ maxWidth: '780px', margin: '0 auto', padding: isMobile ? '40px 20px 60px' : '64px 48px 80px' }}>

        {/* Intro / résumé */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            padding: '24px 28px', borderRadius: '16px', marginBottom: '48px',
            background: 'linear-gradient(135deg, rgba(59,79,216,0.05), rgba(155,48,232,0.05))',
            border: '1px solid rgba(59,79,216,0.15)',
            borderLeft: '4px solid #3B4FD8',
          }}
        >
          <p style={{ color: '#374151', fontSize: isMobile ? '15px' : '16px', lineHeight: 1.8, margin: 0 }}>
            <strong style={{ color: '#0F0C1E' }}>En résumé :</strong> En 2026, ne pas former vos équipes à l'IA n'est plus une option — c'est un risque concurrentiel. La bonne nouvelle ? Votre OPCO peut financer{' '}
            <strong style={{ color: '#3B4FD8' }}>100% de la formation</strong>. Voici le guide complet pour en profiter, sans paperasse ni avance de trésorerie.
          </p>
        </motion.div>

        {/* CTA #1 */}
        <InlineCTA
          label="Vérifiez votre éligibilité OPCO maintenant"
          sub="Réponse de faisabilité sous 48h — gratuit et sans engagement"
        />

        {/* ══ SECTION 1 ══ */}
        <Section number="01" title="L'IA n'est plus un luxe, c'est une nécessité">
          <h3 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '16px', marginBottom: '12px', marginTop: 0 }}>
            Pourquoi 2026 est l'année charnière pour l'acculturation des équipes
          </h3>
          <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.8, marginBottom: '16px' }}>
            L'intelligence artificielle a franchi un cap décisif. Ce n'est plus une technologie réservée aux startups ou aux grandes entreprises tech. Elle est désormais{' '}
            <strong style={{ color: '#0F0C1E' }}>au cœur des processus métier</strong> de toutes les organisations — PME, ETI, associations, services publics.
          </p>
          <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.8, marginBottom: '20px' }}>
            Les chiffres parlent d'eux-mêmes :
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <StatCard val="73%" label="des entreprises françaises prévoient d'intégrer l'IA d'ici fin 2026" color="#3B4FD8" />
            <StatCard val="2–3h" label="économisées/jour par collaborateur formé à l'IA générative" color="#9B30E8" />
            <StatCard val="100%" label="de prise en charge possible via votre OPCO" color="#059669" />
          </div>
          <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.8, marginBottom: '12px' }}>
            Mais voilà le vrai problème : <strong>former coûte cher.</strong> Ou du moins, c'est la croyance la plus répandue.
          </p>
          <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.8 }}>
            La réalité est tout autre. Grâce au <strong style={{ color: '#3B4FD8' }}>financement OPCO IA</strong>, la prise en charge formation IA de vos équipes peut être <strong>totale et sans avance de votre part</strong>.
          </p>
        </Section>

        {/* ══ SECTION 2 ══ */}
        <Section number="02" title="Qu'est-ce qu'un OPCO et comment finance-t-il l'IA ?">
          <h3 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '16px', marginBottom: '12px', marginTop: 0 }}>
            Le rôle de l'Opérateur de Compétences (OPCO)
          </h3>
          <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.8, marginBottom: '16px' }}>
            Un <strong>OPCO</strong> <em>(Opérateur de Compétences)</em> est un organisme paritaire — géré conjointement par les représentants des employeurs et des salariés — dont la mission est de <strong>financer la formation professionnelle continue</strong> des entreprises relevant de sa branche.
          </p>
          <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.8, marginBottom: '20px' }}>
            Il existe <strong>11 OPCO en France</strong>, couvrant l'ensemble des secteurs d'activité :
          </p>
          <CompTable
            headers={['OPCO', 'Secteurs couverts']}
            rows={[
              ['<strong>Atlas</strong>', 'Banque, finance, assurance, numérique'],
              ['<strong>Akto</strong>', 'Commerce, services, hôtellerie-restauration'],
              ['<strong>AFDAS</strong>', 'Culture, médias, sport, tourisme'],
              ['<strong>Uniformation</strong>', 'Social, médico-social, coopération'],
              ['<strong>OCAPIAT</strong>', 'Agriculture, pêche, agroalimentaire'],
              ['<strong>OPCO 2i</strong>', 'Industrie'],
              ['<strong>Constructys</strong>', 'Construction'],
              ['<em>+ 4 autres</em>', 'Couvrent tous les secteurs restants'],
            ]}
          />
          <h3 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '16px', marginBottom: '12px', marginTop: '28px' }}>
            Comment fonctionne le financement concrètement ?
          </h3>
          <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.8, marginBottom: '16px' }}>
            Le mécanisme est simple en 4 étapes :
          </p>
          {[
            { n: '1', t: 'Votre entreprise cotise', d: 'Chaque année, vous versez une cotisation obligatoire à votre OPCO (liée à votre masse salariale).' },
            { n: '2', t: 'Ces fonds sont mobilisables', d: 'Ils financent les formations de vos collaborateurs — c\'est votre argent, utilisez-le.' },
            { n: '3', t: "L'OPCO règle directement", d: "L'OPCO règle l'organisme de formation (Smart Optimisation) — sans que vous ayez à avancer quoi que ce soit." },
            { n: '4', t: 'Vous recevez la confirmation', d: "Votre seule tâche : valider que la formation a bien eu lieu. Rien de plus." },
          ].map((step) => (
            <div key={step.n} style={{ display: 'flex', gap: '14px', marginBottom: '14px', alignItems: 'flex-start' }}>
              <span style={{ width: 28, height: 28, borderRadius: '8px', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 800, flexShrink: 0, marginTop: '1px' }}>{step.n}</span>
              <div>
                <span style={{ fontWeight: 700, color: '#0F0C1E', fontSize: '14px' }}>{step.t} : </span>
                <span style={{ color: '#374151', fontSize: '14px', lineHeight: 1.7 }}>{step.d}</span>
              </div>
            </div>
          ))}
          <div style={{ marginTop: '20px', padding: '16px 20px', borderRadius: '12px', background: 'rgba(5,150,105,0.07)', border: '1px solid rgba(5,150,105,0.20)' }}>
            <p style={{ margin: 0, color: '#047857', fontSize: '15px', fontWeight: 600 }}>
              Résultat : <span style={{ fontWeight: 800 }}>vos équipes se forment à l'IA, vous ne déboursez rien.</span>
            </p>
          </div>
        </Section>

        {/* ══ SECTION 3 ══ */}
        <Section number="03" title="Les différents leviers de financement disponibles en 2026">
          <h3 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '16px', marginBottom: '12px', marginTop: 0 }}>
            Le Plan de Développement des Compétences (PDC)
          </h3>
          <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.8, marginBottom: '12px' }}>
            C'est le levier <strong>le plus courant</strong> pour les entreprises. Il vous permet de financer des formations décidées par l'employeur dans le cadre de la stratégie RH.
          </p>
          {[
            'Accessible à <strong>toutes les entreprises</strong>, quelle que soit leur taille.',
            'Financement <strong>jusqu\'à 100%</strong> selon votre OPCO et votre secteur.',
            'Idéal pour des <strong>formations collectives</strong> (plusieurs collaborateurs simultanément).',
            'Compatible avec nos programmes IA sur mesure et nos <strong>formations OPCO dédiées</strong>.',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '8px', alignItems: 'flex-start' }}>
              <span style={{ color: '#3B4FD8', marginTop: '4px', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <p style={{ margin: 0, fontSize: '14px', color: '#374151', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: item }} />
            </div>
          ))}

          <h3 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '16px', marginBottom: '12px', marginTop: '28px' }}>
            Le FNE-Formation
          </h3>
          <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.8, marginBottom: '12px' }}>
            Le <strong>FNE-Formation</strong> <em>(Fonds National de l'Emploi)</em> est un dispositif d'aide de l'État, géré par les DREETS, destiné aux entreprises en mutation économique ou transition numérique.
          </p>
          {[
            'Particulièrement pertinent si votre entreprise est en <strong>transition numérique ou digitale</strong>.',
            'Peut couvrir jusqu\'à <strong>70% à 80%</strong> du coût pédagogique.',
            'Se combine parfois avec le financement OPCO pour une <strong>prise en charge totale</strong>.',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '8px', alignItems: 'flex-start' }}>
              <span style={{ color: '#9B30E8', marginTop: '4px', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <p style={{ margin: 0, fontSize: '14px', color: '#374151', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: item }} />
            </div>
          ))}

          <h3 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '16px', marginBottom: '12px', marginTop: '28px' }}>
            Les co-financements possibles
          </h3>
          <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.8, marginBottom: '12px' }}>
            Dans certains cas, plusieurs dispositifs peuvent être combinés pour une couverture maximale :
          </p>
          {[
            '<strong>OPCO + CPF</strong> : Le CPF d\'un salarié peut compléter le financement OPCO pour des formations certifiantes (ex. notre formation RS7411).',
            '<strong>OPCO + Région</strong> : Certaines régions (dont l\'Alsace) proposent des aides complémentaires pour la montée en compétences numériques des PME.',
            '<strong>OPCO + EDEC</strong> : Accord-cadre sectoriel pouvant augmenter les plafonds de financement.',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '8px', alignItems: 'flex-start' }}>
              <span style={{ color: '#D97706', marginTop: '4px', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <p style={{ margin: 0, fontSize: '14px', color: '#374151', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: item }} />
            </div>
          ))}

          {/* CTA #2 */}
          <InlineCTA
            label="Vous ne savez pas quel dispositif s'applique à votre situation ?"
            sub="Demandez votre audit IA entreprise gratuit — analyse de vos droits sous 48h"
          />
        </Section>

        {/* ══ SECTION 4 ══ */}
        <Section number="04" title="Pourquoi choisir Smart Optimisation pour votre formation IA financée OPCO ?">
          <h3 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '16px', marginBottom: '12px', marginTop: 0 }}>
            L'accompagnement "zéro paperasse"
          </h3>
          <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.8, marginBottom: '16px' }}>
            La principale raison pour laquelle les entreprises ne forment pas leurs équipes à l'IA ?{' '}
            <strong>La complexité administrative.</strong> Dossier de prise en charge, convention de formation, attestation d'assiduité, demande de remboursement... Autant d'étapes qui découragent les RH déjà surchargés.
          </p>
          <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.8, marginBottom: '16px' }}>
            <strong style={{ color: '#0F0C1E' }}>Chez Smart Optimisation, nous gérons tout à votre place :</strong>
          </p>
          {[
            'Identification de votre OPCO et vérification de votre éligibilité.',
            'Montage complet du dossier de financement.',
            'Soumission et relances auprès de l\'OPCO.',
            'Suivi jusqu\'au paiement direct à notre organisme.',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '8px', alignItems: 'flex-start' }}>
              <span style={{ color: '#3B4FD8', marginTop: '4px', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <p style={{ margin: 0, fontSize: '14px', color: '#374151', lineHeight: 1.7 }}>{item}</p>
            </div>
          ))}
          <div style={{ margin: '20px 0', padding: '16px 20px', borderRadius: '12px', background: 'rgba(59,79,216,0.06)', border: '1px solid rgba(59,79,216,0.15)' }}>
            <p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#3B4FD8' }}>
              Votre seule tâche : décider de former vos équipes. Le reste, c'est nous.
            </p>
          </div>

          <h3 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '16px', marginBottom: '12px', marginTop: '28px' }}>
            Une expertise terrain reconnue
          </h3>
          <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.8, marginBottom: '16px' }}>
            Smart Optimisation, ce n'est pas un catalogue de formations génériques. C'est une équipe d'experts IA qui :
          </p>
          {[
            'A accompagné <strong>+20 entreprises</strong> dans leur transformation IA avec des résultats mesurables.',
            'A formé des équipes de <strong>5 à 200 collaborateurs</strong> sur des outils concrets (ChatGPT, Claude, Make, n8n...).',
            'Maîtrise les enjeux de <strong>conformité EU AI Act et RGPD</strong> qui touchent votre entreprise.',
            'Mesure le <strong>ROI formation dès J+30</strong> avec des indicateurs factuels et actionnables.',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '8px', alignItems: 'flex-start' }}>
              <span style={{ color: '#9B30E8', marginTop: '4px', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <p style={{ margin: 0, fontSize: '14px', color: '#374151', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: item }} />
            </div>
          ))}
          <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.8, marginTop: '16px' }}>
            Nous ne formons pas pour former. Nous formons pour que vos équipes <strong>changent concrètement leur façon de travailler.</strong>
          </p>
        </Section>

        {/* ══ SECTION 5 ══ */}
        <Section number="05" title="Cas d'usage : comment une PME alsacienne a gagné 2h/jour par collaborateur">
          <h3 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '16px', marginBottom: '12px', marginTop: 0 }}>
            Contexte
          </h3>
          <p style={{ color: '#374151', fontSize: '15px', lineHeight: 1.8, marginBottom: '16px' }}>
            Une <strong>PME de 35 collaborateurs</strong> dans le secteur des services (rattachée à l'OPCO Akto) souhaitait réduire le temps passé sur les tâches administratives répétitives : rédaction d'emails, comptes-rendus de réunion, synthèses de documents.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
            {[
              { label: 'Secteur', val: 'Services B2B' },
              { label: 'Taille', val: '35 collaborateurs' },
              { label: 'OPCO', val: 'Akto' },
              { label: 'Budget formation', val: '0 € (cotisation OPCO non utilisée)' },
            ].map((item) => (
              <div key={item.label} style={{ padding: '14px 18px', borderRadius: '12px', background: '#F9F8FF', border: '1px solid rgba(59,79,216,0.08)' }}>
                <div style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontSize: '14px', color: '#0F0C1E', fontWeight: 600 }}>{item.val}</div>
              </div>
            ))}
          </div>

          <h3 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '16px', marginBottom: '12px', marginTop: '8px' }}>
            Notre intervention
          </h3>
          {[
            { n: '1', t: 'Audit IA gratuit (2h)', d: "Identification des processus les plus chronophages et des opportunités d'automatisation à fort ROI." },
            { n: '2', t: 'Montage du dossier OPCO Akto', d: 'Prise en charge validée en 4 jours ouvrés. Zéro action de leur part.' },
            { n: '3', t: 'Formation sur mesure (2 jours)', d: 'Maîtrise de l\'IA générative appliquée aux cas d\'usage métier réels de l\'entreprise.' },
            { n: '4', t: 'Suivi à J+30', d: 'Mesure des gains concrets par collaborateur avec indicateurs factuels.' },
          ].map((step) => (
            <div key={step.n} style={{ display: 'flex', gap: '14px', marginBottom: '12px', alignItems: 'flex-start' }}>
              <span style={{ width: 28, height: 28, borderRadius: '8px', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 800, flexShrink: 0, marginTop: '1px' }}>{step.n}</span>
              <div>
                <span style={{ fontWeight: 700, color: '#0F0C1E', fontSize: '14px' }}>{step.t} : </span>
                <span style={{ color: '#374151', fontSize: '14px', lineHeight: 1.7 }}>{step.d}</span>
              </div>
            </div>
          ))}

          <h3 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '16px', marginBottom: '16px', marginTop: '28px' }}>
            Résultats mesurés à J+30
          </h3>
          <CompTable
            headers={['Indicateur', 'Avant', 'Après', 'Gain']}
            rows={[
              ['Temps de rédaction d\'un email complexe', '18 min', '4 min', '<strong style="color:#059669">-78%</strong>'],
              ['Synthèse d\'un document 20 pages', '45 min', '8 min', '<strong style="color:#059669">-82%</strong>'],
              ['Satisfaction collaborateurs', '—', '97%', '<strong style="color:#059669">✓</strong>'],
              ['<strong>Temps économisé/jour/collaborateur</strong>', '—', '<strong>~2h</strong>', '<strong style="color:#059669">✓</strong>'],
            ]}
          />
          <div style={{ marginTop: '20px', padding: '20px 24px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(5,150,105,0.07), rgba(59,79,216,0.07))', border: '1px solid rgba(5,150,105,0.20)' }}>
            <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.75, color: '#374151' }}>
              Pour une équipe de 35 personnes, c'est <strong style={{ color: '#059669', fontSize: '18px' }}>70h de productivité récupérées chaque jour.</strong>
              <br />
              Le tout financé à <strong style={{ color: '#3B4FD8' }}>100% par l'OPCO Akto</strong>, sans un euro déboursé par l'entreprise.
            </p>
          </div>
        </Section>

        {/* ══ SECTION FAQ ══ */}
        <Section number="FAQ" title="Vos questions sur le financement OPCO de la formation IA">
          {[
            {
              q: 'Quel est le délai entre la demande et le début de la formation IA financée OPCO ?',
              a: 'En moyenne, comptez 2 à 3 semaines entre le premier contact et le démarrage de la formation. Notre équipe obtient généralement une réponse de faisabilité de l\'OPCO sous 48h ouvrées. Le dossier complet est traité en 1 à 2 semaines selon l\'OPCO.',
            },
            {
              q: 'Comment savoir si mon entreprise est éligible au financement OPCO pour une formation IA ?',
              a: 'Toute entreprise employant au moins un salarié cotise à un OPCO et est donc éligible par défaut. Le montant disponible dépend de votre masse salariale, de votre secteur et de votre historique de formations. Le moyen le plus rapide : contacter directement Smart Optimisation pour une vérification gratuite sous 48h.',
            },
            {
              q: 'Quelle est la différence entre une formation IA standard et une formation IA sur mesure OPCO ?',
              a: 'Une formation IA standard (ex. RS7411 CPF) est un programme certifiant défini, avec des sessions planifiées à Strasbourg, Mulhouse et Colmar, idéal pour une montée en compétences individuelle. Une formation IA sur mesure OPCO est co-construite avec votre équipe, basée sur vos outils réels et vos processus métier. Plus adaptée aux formations collectives d\'équipe (3 à 200 personnes). Les deux sont finançables via votre OPCO.',
            },
          ].map((item, i) => <FAQItem key={i} q={item.q} a={item.a} i={i} />)}
        </Section>

        {/* CTA #3 final */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
          viewport={{ once: true }}
          style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', background: '#fff', border: '1px solid rgba(59,79,216,0.10)', boxShadow: '0 8px 48px rgba(59,79,216,0.08)' }}
        >
          <div style={{ height: '4px', background: 'linear-gradient(90deg, #3B4FD8, #9B30E8, #E83B9B)', width: '100%' }} />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: -60, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,48,232,0.06) 0%, transparent 70%)', pointerEvents: 'none' }}
          />
          <div style={{ padding: isMobile ? '28px 20px' : '48px 48px', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '999px', background: 'rgba(59,79,216,0.07)', border: '1px solid rgba(59,79,216,0.18)', marginBottom: '20px' }}>
              <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', display: 'block', flexShrink: 0 }} />
              <span style={{ color: '#3B4FD8', fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Diagnostic gratuit · Réponse sous 48h</span>
            </div>
            <h2 style={{ fontWeight: 800, fontSize: isMobile ? '1.6rem' : '2rem', color: '#0F0C1E', lineHeight: 1.2, letterSpacing: '-0.025em', marginBottom: '14px' }}>
              Prêt à passer à l'action ?{' '}
              <motion.span
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundImage: 'linear-gradient(135deg,#3B4FD8,#9B30E8,#E83B9B,#3B4FD8)', backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                Vérifiez votre éligibilité.
              </motion.span>
            </h2>
            <p style={{ color: '#6B7280', fontSize: '15px', lineHeight: 1.75, maxWidth: '520px', marginBottom: '28px' }}>
              Notre conseiller analyse votre situation, identifie votre OPCO et vous présente un plan de financement clé en main sous 48h. <strong style={{ color: '#374151' }}>Sans engagement.</strong>
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link to="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '15px 32px', borderRadius: '999px', fontWeight: 700, fontSize: '15px',
                  color: '#fff', textDecoration: 'none',
                  background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
                  boxShadow: '0 4px 20px rgba(155,48,232,0.30)',
                }}>
                  Vérifier mon éligibilité OPCO
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link to="/formation/opco" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 28px', borderRadius: '999px', fontWeight: 600, fontSize: '14px',
                  color: '#3B4FD8', textDecoration: 'none',
                  border: '1.5px solid rgba(59,79,216,0.25)',
                }}>
                  Voir nos formations OPCO
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Liens internes */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { duration: 0.5 } }}
          viewport={{ once: true }}
          style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid rgba(59,79,216,0.08)' }}
        >
          <p style={{ color: '#9CA3AF', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>Articles et pages liés</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {[
              { label: 'Formation IA financée OPCO', to: '/formation/opco' },
              { label: 'Formation IA CPF RS7411', to: '/formation/cpf' },
              { label: 'Formation IA sur mesure', to: '/formation/sur-mesure' },
              { label: 'Solution IA sur mesure', to: '/solution-ia' },
            ].map((link) => (
              <Link key={link.to} to={link.to} style={{
                padding: '8px 16px', borderRadius: '999px', fontSize: '13px', fontWeight: 500,
                color: '#3B4FD8', textDecoration: 'none',
                background: 'rgba(59,79,216,0.06)', border: '1px solid rgba(59,79,216,0.15)',
                transition: 'background 0.18s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,79,216,0.12)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(59,79,216,0.06)' }}
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Signature */}
        <p style={{ color: '#C4B8FF', fontSize: '12px', marginTop: '40px', textAlign: 'center' }}>
          Cet article a été rédigé par l'équipe Smart Optimisation · Dernière mise à jour : mars 2026
        </p>

      </article>
    </main>
  )
}
