import { useEffect } from 'react'

/**
 * Hook SEO — met à jour dynamiquement title, meta description, OG tags,
 * canonical et injecte un bloc JSON-LD structuré par page.
 * @param {{ title: string, description: string, path?: string, jsonLd?: object|null }} options
 */
export function useSEO({ title, description, path = '', jsonLd = null, ogImage = 'https://smartoptimisation.fr/og-image.png', ogType = 'website', robots = 'index, follow', keywords = null }) {
  const jsonLdStr = jsonLd ? JSON.stringify(jsonLd) : null

  useEffect(() => {
    const siteName = 'Smart Optimisation'
    const fullTitle = title ? `${title} | ${siteName}` : siteName

    document.title = fullTitle

    const setMeta = (selector, attr, value) => {
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        const [key, val] = attr.split('=')
        el.setAttribute(key, val.replace(/"/g, ''))
        document.head.appendChild(el)
      }
      el.setAttribute('content', value)
    }

    setMeta('meta[name="description"]', 'name=description', description)
    setMeta('meta[property="og:title"]', 'property=og:title', fullTitle)
    setMeta('meta[property="og:description"]', 'property=og:description', description)
    setMeta('meta[property="og:url"]', 'property=og:url', `https://smartoptimisation.fr${path}`)
    setMeta('meta[property="og:image"]', 'property=og:image', ogImage)
    setMeta('meta[property="og:type"]', 'property=og:type', ogType)
    setMeta('meta[name="twitter:title"]', 'name=twitter:title', fullTitle)
    setMeta('meta[name="twitter:description"]', 'name=twitter:description', description)
    setMeta('meta[name="twitter:image"]', 'name=twitter:image', ogImage)
    setMeta('meta[name="robots"]', 'name=robots', robots)
    if (keywords) {
      setMeta('meta[name="keywords"]', 'name=keywords', keywords)
    }

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = `https://smartoptimisation.fr${path}`

    /* ── JSON-LD structuré par page ── */
    const existing = document.getElementById('page-schema')
    if (existing) existing.remove()
    if (jsonLdStr) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = 'page-schema'
      script.textContent = jsonLdStr
      document.head.appendChild(script)
    }

    return () => {
      const el = document.getElementById('page-schema')
      if (el) el.remove()
    }
  }, [title, description, path, jsonLdStr, ogImage, ogType, robots, keywords])
}
