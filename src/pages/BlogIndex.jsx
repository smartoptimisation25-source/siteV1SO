import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSEO } from '../hooks/useSEO'
import useIsMobile from '../hooks/useIsMobile'
import { articles as rawArticles, CATEGORIES } from '../data/blogArticles'

const articles = [...rawArticles].sort((a, b) => new Date(b.date) - new Date(a.date))

const BLOG_INDEX_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': 'https://smartoptimisation.fr/blog',
  'name': 'Blog Smart Optimisation — IA & Formation',
  'description': 'Actualités IA, guides de financement OPCO, études de cas et conformité EU AI Act pour les entreprises.',
  'url': 'https://smartoptimisation.fr/blog',
  'inLanguage': 'fr-FR',
  'publisher': { '@id': 'https://smartoptimisation.fr/#organization' },
}

function CategoryBadge({ category }) {
  const cat = CATEGORIES[category] || { color: '#374151', bg: 'rgba(107,114,128,0.10)' }
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 700,
      color: cat.color,
      background: cat.bg,
      letterSpacing: 0.3,
    }}>
      {category}
    </span>
  )
}

function HeroCard({ article, isMobile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: 'linear-gradient(135deg, #0f1629 0%, #1a2456 50%, #2d1b69 100%)',
        borderRadius: 20,
        padding: isMobile ? '32px 24px' : '48px 56px',
        marginBottom: 48,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(59,79,216,0.25)',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: -80, right: -80,
        width: 300, height: 300,
        background: 'radial-gradient(circle, rgba(155,48,232,0.3) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 700 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{
            background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
            color: '#fff',
            padding: '4px 12px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 0.5,
          }}>
            Article à la une
          </span>
          <CategoryBadge category={article.category} />
        </div>

        <h1 style={{
          fontSize: isMobile ? 22 : 32,
          fontWeight: 800,
          color: '#fff',
          lineHeight: 1.25,
          marginBottom: 16,
        }}>
          {article.title}
        </h1>

        <p style={{
          fontSize: isMobile ? 15 : 17,
          color: 'rgba(255,255,255,0.75)',
          lineHeight: 1.6,
          marginBottom: 28,
        }}>
          {article.excerpt}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <Link
            to={`/blog/${article.slug}`}
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
              color: '#fff',
              textDecoration: 'none',
              padding: '13px 28px',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 15,
              boxShadow: '0 4px 20px rgba(59,79,216,0.4)',
              transition: 'transform 0.2s',
            }}
          >
            Lire l'article →
          </Link>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
            {article.readTime} min de lecture · {new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

const CARD_GRADIENTS = [
  'linear-gradient(135deg, #3B4FD8 0%, #9B30E8 100%)',
  'linear-gradient(135deg, #0f766e 0%, #3B4FD8 100%)',
  'linear-gradient(135deg, #9B30E8 0%, #E83B9B 100%)',
  'linear-gradient(135deg, #D97706 0%, #9B30E8 100%)',
]

function ArticleCard({ article, index, isMobile }) {
  const cat = CATEGORIES[article.category] || { color: '#374151', bg: 'rgba(107,114,128,0.10)' }
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      <Link to={`/blog/${article.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div style={{
          background: '#fff',
          borderRadius: 20,
          overflow: 'hidden',
          border: '1px solid #e5e7eb',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          transition: 'box-shadow 0.25s, border-color 0.25s',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
        }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 16px 48px rgba(59,79,216,0.16)'
            e.currentTarget.style.borderColor = 'rgba(59,79,216,0.25)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'
            e.currentTarget.style.borderColor = '#e5e7eb'
          }}
        >
          {/* Bande colorée en haut */}
          <div style={{
            height: 6,
            background: gradient,
          }} />

          <div style={{ padding: isMobile ? '24px 20px 20px' : '28px 28px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
            {/* Badge + durée */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <span style={{
                padding: '5px 14px',
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 700,
                color: cat.color,
                background: cat.bg,
                letterSpacing: 0.3,
              }}>
                {article.category}
              </span>
              <span style={{
                fontSize: 12,
                color: '#6B7280',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
                {article.readTime} min
              </span>
            </div>

            {/* Titre */}
            <h2 style={{
              fontSize: isMobile ? 18 : 21,
              fontWeight: 800,
              color: '#111827',
              lineHeight: 1.35,
              marginBottom: 14,
              letterSpacing: '-0.01em',
            }}>
              {article.title}
            </h2>

            {/* Extrait */}
            <p style={{
              fontSize: 14,
              color: '#374151',
              lineHeight: 1.7,
              marginBottom: 24,
              flex: 1,
            }}>
              {article.excerpt}
            </p>

            {/* Footer */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ fontSize: 12, color: '#6B7280' }}>
                {new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '9px 20px',
                borderRadius: 999,
                background: gradient,
                color: '#fff',
                fontWeight: 700,
                fontSize: 13,
                boxShadow: '0 4px 14px rgba(59,79,216,0.25)',
              }}>
                Lire l'article
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function BlogIndex() {
  const isMobile = useIsMobile()

  useSEO({
    title: 'Blog IA & Formation — Actualités et Guides 2026',
    description: 'Guides financement OPCO, études de cas IA en entreprise, conformité EU AI Act et actualités formation IA. Ressources gratuites par Smart Optimisation.',
    path: '/blog',
    jsonLd: BLOG_INDEX_SCHEMA,
  })

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '8px 16px 60px' : '8px 24px 80px' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span style={{
            display: 'inline-block',
            background: 'rgba(59,79,216,0.08)',
            color: '#3B4FD8',
            padding: '6px 16px',
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 700,
            marginBottom: 16,
            letterSpacing: 0.5,
          }}>
            BLOG & RESSOURCES IA
          </span>
          <h1 style={{
            fontSize: isMobile ? 26 : 38,
            fontWeight: 800,
            color: '#111827',
            lineHeight: 1.2,
            marginBottom: 14,
          }}>
            Actualités IA & Guides pratiques
          </h1>
          <p style={{
            fontSize: isMobile ? 15 : 17,
            color: '#374151',
            maxWidth: 560,
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Décryptages, guides pratiques et retours d'expérience sur l'intelligence artificielle — pour les professionnels qui veulent une longueur d'avance.
          </p>
        </motion.div>
      </div>

      {/* Grid uniforme */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 24,
      }}>
        {articles.map((article, i) => (
          <ArticleCard key={article.slug} article={article} index={i} isMobile={isMobile} />
        ))}
      </div>
    </main>
  )
}
