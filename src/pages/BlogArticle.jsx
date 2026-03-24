import { useRef, useState, useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSEO } from '../hooks/useSEO'
import useIsMobile from '../hooks/useIsMobile'
import { getArticleBySlug, getRelatedArticles, CATEGORIES } from '../data/blogArticles'
import ReadingProgress from '../components/ReadingProgress'
import StickyCTA from '../components/StickyCTA'

/* ── Helpers ──────────────────────────────────────────────────────────── */
function buildJsonLd(article) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `https://smartoptimisation.fr/blog/${article.slug}`,
        headline: article.title,
        description: article.metaDescription,
        url: `https://smartoptimisation.fr/blog/${article.slug}`,
        datePublished: article.date,
        dateModified: article.date,
        inLanguage: 'fr-FR',
        author: { '@type': 'Organization', name: 'Smart Optimisation', url: 'https://smartoptimisation.fr' },
        publisher: { '@id': 'https://smartoptimisation.fr/#organization' },
        image: `https://smartoptimisation.fr${article.image || '/og-image.png'}`,
        keywords: article.keywords,
      },
      article.faq && article.faq.length > 0 && {
        '@type': 'FAQPage',
        mainEntity: article.faq.map(item => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://smartoptimisation.fr' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://smartoptimisation.fr/blog' },
          { '@type': 'ListItem', position: 3, name: article.title, item: `https://smartoptimisation.fr/blog/${article.slug}` },
        ],
      },
    ].filter(Boolean),
  }
}

/* ── Content type renderers ───────────────────────────────────────────── */
function RenderHTML({ text }) {
  return <span dangerouslySetInnerHTML={{ __html: text }} />
}

function StatCard({ value, label, source }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #f0f3ff, #f5f0ff)',
      border: '1px solid rgba(59,79,216,0.15)',
      borderRadius: 12,
      padding: '20px',
      textAlign: 'center',
      flex: '1 1 160px',
    }}>
      <div style={{ fontSize: 32, fontWeight: 800, color: '#3B4FD8', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.4, marginTop: 8 }}>{label}</div>
      {source && <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 6 }}>{source}</div>}
    </div>
  )
}

function SectorsTable({ title, items }) {
  return (
    <div style={{ margin: '20px 0', overflowX: 'auto' }}>
      {title && <p style={{ fontWeight: 700, color: '#374151', marginBottom: 10 }}>{title}</p>}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ background: '#f9fafb' }}>
            <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', color: '#374151', fontWeight: 700, width: '35%' }}>OPCO</th>
            <th style={{ padding: '10px 14px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', color: '#374151', fontWeight: 700 }}>Secteurs couverts</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #f3f4f6', fontWeight: 600, color: '#1e3a8a' }}>{row.name}</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid #f3f4f6', color: '#6b7280' }}>{row.sectors}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ResultsTable({ rows }) {
  return (
    <div style={{ margin: '20px 0', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ background: 'linear-gradient(135deg, #0f1629, #1a2456)' }}>
            <th style={{ padding: '10px 14px', textAlign: 'left', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Indicateur</th>
            <th style={{ padding: '10px 14px', textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Avant</th>
            <th style={{ padding: '10px 14px', textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Après</th>
            <th style={{ padding: '10px 14px', textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Gain</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #f3f4f6', color: '#374151', fontSize: 13 }}>{row.label}</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #f3f4f6', textAlign: 'center', color: '#ef4444', fontWeight: 600 }}>{row.before}</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #f3f4f6', textAlign: 'center', color: '#059669', fontWeight: 600 }}>{row.after}</td>
              <td style={{ padding: '10px 14px', borderBottom: '1px solid #f3f4f6', textAlign: 'center', color: '#3B4FD8', fontWeight: 800 }}>{row.gain}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Steps({ items }) {
  return (
    <ol style={{ listStyle: 'none', padding: 0, margin: '16px 0' }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
          <div style={{
            minWidth: 28, height: 28,
            background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: 13, flexShrink: 0, marginTop: 2,
          }}>
            {item.n}
          </div>
          <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.6, margin: 0 }}>
            <RenderHTML text={item.text} />
          </p>
        </li>
      ))}
    </ol>
  )
}

function Callout({ text }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(59,79,216,0.06), rgba(155,48,232,0.06))',
      border: '1px solid rgba(59,79,216,0.2)',
      borderLeft: '4px solid #3B4FD8',
      borderRadius: '0 10px 10px 0',
      padding: '16px 20px',
      margin: '20px 0',
      fontSize: 15,
      color: '#374151',
      lineHeight: 1.6,
    }}>
      <RenderHTML text={text} />
    </div>
  )
}

function InlineCTA({ title, sub, link, label, id }) {
  const badge = id === 'cta-2'
    ? 'AUDIT GRATUIT · SANS ENGAGEMENT'
    : 'DIAGNOSTIC GRATUIT · SANS ENGAGEMENT'

  return (
    <div style={{
      background: '#fff',
      borderRadius: 18,
      border: '1px solid rgba(59,79,216,0.14)',
      margin: '32px 0',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 4px 32px rgba(59,79,216,0.08)',
    }}>
      {/* gradient top bar */}
      <div style={{
        height: 3,
        background: 'linear-gradient(90deg, #3B4FD8, #9B30E8, #e879a0)',
      }} />

      <div style={{
        padding: '28px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        flexWrap: 'wrap',
      }}>
        {/* Left */}
        <div style={{ flex: '1 1 280px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 11, fontWeight: 700, letterSpacing: 0.8,
            color: '#6b7280',
            border: '1px solid #e5e7eb',
            borderRadius: 999, padding: '4px 12px',
            marginBottom: 14,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
              display: 'inline-block', flexShrink: 0,
            }} />
            {badge}
          </span>
          <p style={{
            fontSize: 20, fontWeight: 800, color: '#111827',
            lineHeight: 1.25, marginBottom: 10,
          }}>
            {title.split(' ').map((word, i, arr) =>
              i >= arr.length - 2
                ? <span key={i} style={{ color: '#7C3AED' }}>{word}{i < arr.length - 1 ? ' ' : ''}</span>
                : <span key={i}>{word} </span>
            )}
          </p>
          <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{sub}</p>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 200 }}>
          <Link to={link} style={{
            display: 'block',
            background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
            color: '#fff',
            textDecoration: 'none',
            padding: '13px 24px',
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 14,
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(59,79,216,0.30)',
            whiteSpace: 'nowrap',
          }}>
            {label}
          </Link>
          <Link to="/formation/sur-mesure" style={{
            display: 'block',
            background: 'transparent',
            color: '#6b7280',
            textDecoration: 'none',
            padding: '12px 24px',
            borderRadius: 999,
            fontWeight: 500,
            fontSize: 14,
            textAlign: 'center',
            border: '1px solid #e5e7eb',
            whiteSpace: 'nowrap',
          }}>
            Formations sur mesure
          </Link>
        </div>
      </div>
    </div>
  )
}

function renderContent(content) {
  if (!Array.isArray(content)) return null
  return content.map((block, i) => {
    switch (block.type) {
      case 'h3':
        return <h3 key={i} style={{ fontSize: 18, fontWeight: 700, color: '#1f2937', marginTop: 28, marginBottom: 10 }}>{block.title}</h3>
      case 'p':
        return <p key={i} style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 14 }}><RenderHTML text={block.text} /></p>
      case 'list':
        return (
          <ul key={i} style={{ paddingLeft: 20, margin: '12px 0' }}>
            {block.items.map((item, j) => (
              <li key={j} style={{ fontSize: 15, color: '#374151', lineHeight: 1.7, marginBottom: 8 }}>
                <RenderHTML text={item} />
              </li>
            ))}
          </ul>
        )
      case 'stats':
        return (
          <div key={i} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', margin: '20px 0' }}>
            {block.items.map((s, j) => <StatCard key={j} {...s} />)}
          </div>
        )
      case 'sectors':
        return <SectorsTable key={i} title={block.title} items={block.items} />
      case 'results':
        return <ResultsTable key={i} rows={block.rows} />
      case 'steps':
        return <Steps key={i} items={block.items} />
      case 'callout':
        return <Callout key={i} text={block.text} />
      default:
        return null
    }
  })
}

/* ── FAQ Accordion ────────────────────────────────────────────────────── */
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: 10,
      marginBottom: 10,
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '16px 20px',
          background: open ? '#f9fafb' : '#fff',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
          transition: 'background 0.2s',
        }}
        aria-expanded={open}
      >
        <span style={{ fontSize: 15, fontWeight: 600, color: '#111827', lineHeight: 1.4 }}>{q}</span>
        <span style={{
          fontSize: 20,
          color: '#3B4FD8',
          transition: 'transform 0.2s',
          transform: open ? 'rotate(45deg)' : 'none',
          flexShrink: 0,
        }}>+</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              padding: '0 20px 16px',
              fontSize: 14,
              color: '#6b7280',
              lineHeight: 1.7,
              margin: 0,
              borderTop: '1px solid #f3f4f6',
              paddingTop: 14,
            }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── TOC Sidebar ──────────────────────────────────────────────────────── */
function TOC({ toc, activeId }) {
  return (
    <nav aria-label="Table des matières" style={{
      position: 'sticky',
      top: 90,
      background: '#f9fafb',
      borderRadius: 12,
      padding: '20px',
      border: '1px solid #e5e7eb',
    }}>
      <p style={{ fontSize: 12, fontWeight: 700, color: '#9ca3af', letterSpacing: 0.8, marginBottom: 14, textTransform: 'uppercase' }}>
        Sommaire
      </p>
      <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {toc.map((item, i) => (
          <li key={item.id} style={{ marginBottom: 6 }}>
            <a
              href={`#${item.id}`}
              style={{
                fontSize: 13,
                color: activeId === item.id ? '#3B4FD8' : '#6b7280',
                textDecoration: 'none',
                fontWeight: activeId === item.id ? 700 : 400,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '4px 6px',
                borderRadius: 6,
                background: activeId === item.id ? 'rgba(59,79,216,0.08)' : 'transparent',
                transition: 'all 0.15s',
              }}
              onClick={e => {
                e.preventDefault()
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
            >
              <span style={{
                width: 18, height: 18,
                background: activeId === item.id ? 'linear-gradient(135deg, #3B4FD8, #9B30E8)' : '#e5e7eb',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, color: activeId === item.id ? '#fff' : '#9ca3af',
                fontWeight: 700, flexShrink: 0,
              }}>
                {i + 1}
              </span>
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/* ── Newsletter box ───────────────────────────────────────────────────── */
function NewsletterBox() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  return (
    <div style={{
      background: 'linear-gradient(135deg, #3B4FD8 0%, #6B3FD8 50%, #9B30E8 100%)',
      borderRadius: 16,
      padding: '32px 28px',
      marginTop: 40,
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 8px 40px rgba(59,79,216,0.30)',
    }}>
      {/* subtle glow */}
      <div style={{
        position: 'absolute', top: -60, right: -60,
        width: 200, height: 200,
        background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <p style={{ fontSize: 19, fontWeight: 800, color: '#fff', marginBottom: 6, position: 'relative' }}>
        Restons connectés
      </p>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 24, position: 'relative' }}>
        Guides IA, actualités OPCO et études de cas — directement dans votre boîte mail.
      </p>
      {sent ? (
        <p style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>✓ Merci ! Vous serez notifié dès le prochain article.</p>
      ) : (
        <form
          onSubmit={e => { e.preventDefault(); setSent(true) }}
          style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}
        >
          <input
            type="email"
            required
            placeholder="votre@email.fr"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              padding: '12px 18px',
              borderRadius: 10,
              border: '1.5px solid rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.15)',
              color: '#fff',
              fontSize: 14,
              width: 240,
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '12px 24px',
              background: '#fff',
              color: '#3B4FD8',
              border: 'none',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
            }}
          >
            M'abonner →
          </button>
        </form>
      )}
    </div>
  )
}

/* ── Related article card ─────────────────────────────────────────────── */
function RelatedCard({ article }) {
  const cat = CATEGORIES[article.category] || { color: '#6b7280', bg: '#f3f4f6' }
  return (
    <Link to={`/blog/${article.slug}`} style={{ textDecoration: 'none' }}>
      <div style={{
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        padding: 20,
        transition: 'box-shadow 0.2s, transform 0.2s',
        background: '#fff',
      }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(59,79,216,0.1)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 700, color: cat.color, background: cat.bg, padding: '2px 8px', borderRadius: 20 }}>
          {article.category}
        </span>
        <p style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginTop: 10, marginBottom: 8, lineHeight: 1.4 }}>
          {article.title}
        </p>
        <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5, marginBottom: 12 }}>
          {article.excerpt.slice(0, 100)}…
        </p>
        <span style={{ fontSize: 13, color: '#3B4FD8', fontWeight: 700 }}>Lire l'article →</span>
      </div>
    </Link>
  )
}

/* ── Main page component ──────────────────────────────────────────────── */
export default function BlogArticle() {
  const { slug } = useParams()
  const isMobile = useIsMobile()
  const articleRef = useRef(null)
  const [activeId, setActiveId] = useState('')

  const article = getArticleBySlug(slug)
  const related = article ? getRelatedArticles(slug) : []

  /* Track active TOC section on scroll */
  useEffect(() => {
    if (!article) return
    const ids = article.toc?.map(t => t.id) || []
    function onScroll() {
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveId(ids[i])
          return
        }
      }
      setActiveId(ids[0] || '')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [article])

  if (!article) return <Navigate to="/blog" replace />

  const jsonLd = buildJsonLd(article)

  useSEO({
    title: article.metaTitle || article.title,
    description: article.metaDescription,
    path: `/blog/${article.slug}`,
    jsonLd,
  })

  const hasToc = article.toc && article.toc.length > 0

  return (
    <>
      <ReadingProgress articleRef={articleRef} />
      <StickyCTA articleRef={articleRef} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '24px 16px 60px' : '40px 24px 80px' }}>

        {/* Breadcrumb */}
        <nav style={{ fontSize: 13, color: '#9ca3af', marginBottom: 28 }}>
          <Link to="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Accueil</Link>
          {' › '}
          <Link to="/blog" style={{ color: '#9ca3af', textDecoration: 'none' }}>Blog</Link>
          {' › '}
          <span style={{ color: '#374151' }}>{article.category}</span>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile || !hasToc ? '1fr' : '1fr 240px', gap: 48, alignItems: 'start' }}>

          {/* Main content */}
          <article ref={articleRef}>

            {/* Article header */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 18 }}>
                {CATEGORIES[article.category] && (
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: 20,
                    fontSize: 12, fontWeight: 700,
                    color: CATEGORIES[article.category].color,
                    background: CATEGORIES[article.category].bg,
                  }}>
                    {article.category}
                  </span>
                )}
                <span style={{ fontSize: 13, color: '#9ca3af' }}>
                  {article.readTime} min de lecture
                </span>
              </div>

              <h1 style={{
                fontSize: isMobile ? 24 : 34,
                fontWeight: 800,
                color: '#111827',
                lineHeight: 1.25,
                marginBottom: 16,
              }}>
                {article.title}
              </h1>

              <div style={{
                fontSize: 13, color: '#9ca3af',
                display: 'flex', gap: 16, alignItems: 'center',
                flexWrap: 'wrap', marginBottom: 32,
                paddingBottom: 24, borderBottom: '1px solid #e5e7eb',
              }}>
                <span>Smart Optimisation</span>
                <span>·</span>
                <span>{new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            </motion.div>

            {/* Mobile TOC */}
            {isMobile && hasToc && (
              <details style={{ marginBottom: 28, border: '1px solid #e5e7eb', borderRadius: 10, padding: '12px 16px' }}>
                <summary style={{ fontSize: 14, fontWeight: 700, color: '#374151', cursor: 'pointer' }}>
                  Sommaire de l'article
                </summary>
                <ol style={{ listStyle: 'none', padding: '12px 0 0', margin: 0 }}>
                  {article.toc.map((item, i) => (
                    <li key={item.id} style={{ marginBottom: 8 }}>
                      <a
                        href={`#${item.id}`}
                        style={{ fontSize: 13, color: '#3B4FD8', textDecoration: 'none' }}
                        onClick={e => {
                          e.preventDefault()
                          document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                        }}
                      >
                        {i + 1}. {item.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            )}

            {/* Article sections */}
            {article.sections.map((section, idx) => {
              if (section.type === 'intro') {
                return (
                  <p key={idx} style={{
                    fontSize: 17, color: '#374151',
                    lineHeight: 1.8, marginBottom: 32,
                    background: '#f9fafb',
                    borderRadius: 10, padding: '20px 24px',
                    borderLeft: '4px solid #3B4FD8',
                  }}>
                    <RenderHTML text={section.text} />
                  </p>
                )
              }

              if (section.type === 'cta') {
                return <InlineCTA key={idx} {...section} />
              }

              if (section.type === 'h2') {
                return (
                  <section key={idx} id={section.id} style={{ marginBottom: 40, scrollMarginTop: 90 }}>
                    <h2 style={{
                      fontSize: isMobile ? 20 : 24,
                      fontWeight: 800, color: '#111827',
                      lineHeight: 1.3, marginBottom: 20,
                      paddingBottom: 12,
                      borderBottom: '2px solid rgba(59,79,216,0.15)',
                    }}>
                      {section.title}
                    </h2>
                    {renderContent(section.content)}
                  </section>
                )
              }

              return null
            })}

            {/* FAQ section */}
            {article.faq && article.faq.length > 0 && (
              <section id="faq" style={{ marginBottom: 40, scrollMarginTop: 90 }}>
                <h2 style={{
                  fontSize: isMobile ? 20 : 24,
                  fontWeight: 800, color: '#111827',
                  marginBottom: 20,
                  paddingBottom: 12,
                  borderBottom: '2px solid rgba(59,79,216,0.15)',
                }}>
                  FAQ — Vos questions sur le financement OPCO
                </h2>
                {article.faq.map((item, i) => (
                  <FAQItem key={i} q={item.q} a={item.a} />
                ))}
              </section>
            )}

            {/* Newsletter */}
            <NewsletterBox />

            {/* Related articles */}
            {related.length > 0 && (
              <div style={{ marginTop: 48 }}>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111827', marginBottom: 20 }}>
                  Articles similaires
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: 20,
                }}>
                  {related.map(a => <RelatedCard key={a.slug} article={a} />)}
                </div>
              </div>
            )}

          </article>

          {/* Desktop TOC sidebar */}
          {!isMobile && hasToc && (
            <aside>
              <TOC toc={article.toc} activeId={activeId} />
            </aside>
          )}
        </div>
      </div>
    </>
  )
}
