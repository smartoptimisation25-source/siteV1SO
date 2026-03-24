import { Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSEO } from '../hooks/useSEO'
import useIsMobile from '../hooks/useIsMobile'
import { articles, CATEGORIES, getFeaturedArticle } from '../data/blogArticles'

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
  const cat = CATEGORIES[category] || { color: '#6b7280', bg: 'rgba(107,114,128,0.10)' }
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

function ArticleCard({ article, index, isMobile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        to={`/blog/${article.slug}`}
        style={{ textDecoration: 'none', display: 'block' }}
      >
        <div style={{
          background: '#fff',
          borderRadius: 14,
          padding: '24px',
          border: '1px solid #e5e7eb',
          transition: 'box-shadow 0.2s, transform 0.2s',
          cursor: 'pointer',
          height: '100%',
        }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(59,79,216,0.12)'
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <CategoryBadge category={article.category} />
            <span style={{ fontSize: 12, color: '#9ca3af' }}>{article.readTime} min</span>
          </div>

          <h2 style={{
            fontSize: 17,
            fontWeight: 700,
            color: '#111827',
            lineHeight: 1.4,
            marginBottom: 10,
          }}>
            {article.title}
          </h2>

          <p style={{
            fontSize: 14,
            color: '#6b7280',
            lineHeight: 1.6,
            marginBottom: 16,
          }}>
            {article.excerpt}
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #f3f4f6',
            paddingTop: 14,
            marginTop: 'auto',
          }}>
            <span style={{ fontSize: 12, color: '#9ca3af' }}>
              {new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span style={{ fontSize: 13, color: '#3B4FD8', fontWeight: 700 }}>
              Lire →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function BlogIndex() {
  const featured = getFeaturedArticle()

  /* Redirect directly to the article when there's only one */
  if (articles.length === 1 && featured) {
    return <Navigate to={`/blog/${featured.slug}`} replace />
  }

  const isMobile = useIsMobile()
  const rest = articles.filter(a => !a.featured)

  useSEO({
    title: 'Blog IA & Formation — Actualités et Guides 2026',
    description: 'Guides financement OPCO, études de cas IA en entreprise, conformité EU AI Act et actualités formation IA. Ressources gratuites par Smart Optimisation.',
    path: '/blog',
    jsonLd: BLOG_INDEX_SCHEMA,
  })

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '32px 16px 60px' : '56px 24px 80px' }}>

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
            color: '#6b7280',
            maxWidth: 560,
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Guides financement OPCO, études de cas, conformité EU AI Act et stratégies de formation pour transformer vos équipes à l'IA.
          </p>
        </motion.div>
      </div>

      {/* Hero card */}
      {featured && <HeroCard article={featured} isMobile={isMobile} />}

      {/* Grid */}
      {rest.length > 0 && (
        <>
          <h2 style={{
            fontSize: 20,
            fontWeight: 700,
            color: '#374151',
            marginBottom: 24,
            paddingBottom: 12,
            borderBottom: '1px solid #e5e7eb',
          }}>
            Tous les articles
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 24,
          }}>
            {rest.map((article, i) => (
              <ArticleCard key={article.slug} article={article} index={i} isMobile={isMobile} />
            ))}
          </div>
        </>
      )}

      {/* Empty state when only 1 article */}
      {rest.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af' }}>
          <p style={{ fontSize: 15 }}>D'autres articles arrivent bientôt.</p>
          <Link to="/contact" style={{ color: '#3B4FD8', fontWeight: 700, fontSize: 14 }}>
            Être notifié →
          </Link>
        </div>
      )}
    </main>
  )
}
