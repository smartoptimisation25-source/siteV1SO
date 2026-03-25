/**
 * Script de pré-rendu statique pour Smart Optimisation.
 *
 * Génère un fichier HTML par route afin que les crawlers (Googlebot, Bingbot,
 * GPTBot…) reçoivent du contenu complet sans exécuter de JavaScript.
 *
 * Usage :  node scripts/prerender.js
 * Pré-requis : Chrome/Chromium installé sur la machine (puppeteer-core).
 */

import { launch } from 'puppeteer-core'
import { createServer } from 'http'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')
const PORT = 4173
const ORIGIN = `http://localhost:${PORT}`

/* ── Routes à pré-rendre ──────────────────────────────────────────────── */
const ROUTES = [
  '/',
  '/formation/cpf',
  '/formation/opco',
  '/formation/sur-mesure',
  '/formation/environnements',
  '/solution-ia',
  '/educ-ia',
  '/contact',
  '/equipe',
  '/blog',
  '/blog/formations-ia-opco-guide-2026',
  '/blog/chatgpt-vs-claude-vs-gemini-comparatif-2026',
  '/blog/eu-ai-act-entreprises-guide-conformite',
  '/blog/formation-ia-cpf-guide-salaries-2026',
  '/blog/automatiser-processus-ia-entreprise',
  '/formation-ia-strasbourg',
  '/formation-ia-mulhouse',
  '/formation-ia-colmar',
  '/mentions-legales',
  '/confidentialite',
  '/rgpd',
  '/cookies',
]

/* ── Détecter Chrome sur le système ──────────────────────────────────── */
function findChrome() {
  const candidates = [
    // Windows
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.LOCALAPPDATA &&
      `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
    // macOS
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    // Linux
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
  ].filter(Boolean)

  for (const p of candidates) {
    if (existsSync(p)) return p
  }
  return null
}

/* ── Serveur statique minimaliste (SPA fallback) ─────────────────────── */
function startServer() {
  const mime = {
    '.html': 'text/html',
    '.js':   'application/javascript',
    '.css':  'text/css',
    '.json': 'application/json',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg':  'image/svg+xml',
    '.webp': 'image/webp',
    '.woff2':'font/woff2',
    '.otf':  'font/otf',
    '.pdf':  'application/pdf',
  }

  const server = createServer((req, res) => {
    let filePath = join(DIST, req.url === '/' ? 'index.html' : req.url)

    // SPA fallback : si le fichier n'existe pas → index.html
    if (!existsSync(filePath) || filePath.endsWith('/')) {
      filePath = join(DIST, 'index.html')
    }

    try {
      const data = readFileSync(filePath)
      const ext = '.' + filePath.split('.').pop()
      res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' })
      res.end(data)
    } catch {
      const fallback = readFileSync(join(DIST, 'index.html'))
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(fallback)
    }
  })

  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`  ✓ Serveur statique démarré sur ${ORIGIN}`)
      resolve(server)
    })
  })
}

/* ── Pré-rendu d'une route ───────────────────────────────────────────── */
async function renderRoute(page, route) {
  const url = `${ORIGIN}${route}`
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })

  // Attendre que React ait rendu le contenu
  await page.waitForSelector('#root > *', { timeout: 10000 })

  // Petit délai pour les animations framer-motion (initial render)
  await new Promise((r) => setTimeout(r, 800))

  const html = await page.content()
  return html
}

/* ── Écriture du fichier HTML ────────────────────────────────────────── */
function writeHtml(route, html) {
  // / → dist/index.html (déjà existant, on l'écrase avec le pré-rendu)
  // /formation/cpf → dist/formation/cpf/index.html
  let outDir, outFile
  if (route === '/') {
    outDir = DIST
    outFile = join(DIST, 'index.html')
  } else {
    outDir = join(DIST, ...route.split('/').filter(Boolean))
    outFile = join(outDir, 'index.html')
  }

  mkdirSync(outDir, { recursive: true })
  writeFileSync(outFile, html, 'utf-8')
}

/* ── Main ────────────────────────────────────────────────────────────── */
async function main() {
  console.log('\n🚀 Pré-rendu statique — Smart Optimisation\n')

  // 1. Vérifier que dist/ existe
  if (!existsSync(join(DIST, 'index.html'))) {
    console.error('  ✗ dist/index.html introuvable. Lancez "vite build" d\'abord.')
    process.exit(1)
  }

  // 2. Détecter Chrome
  const chromePath = findChrome()
  if (!chromePath) {
    console.error('  ✗ Chrome/Chromium introuvable. Installez Google Chrome.')
    process.exit(1)
  }
  console.log(`  ✓ Chrome trouvé : ${chromePath}`)

  // 3. Démarrer le serveur
  const server = await startServer()

  // 4. Lancer le navigateur
  const browser = await launch({
    executablePath: chromePath,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
  })
  console.log('  ✓ Chrome headless lancé\n')

  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })

  // Bloquer les ressources non essentielles pour accélérer le rendu
  await page.setRequestInterception(true)
  page.on('request', (req) => {
    const type = req.resourceType()
    if (['image', 'media', 'font'].includes(type)) {
      req.abort()
    } else {
      req.continue()
    }
  })

  // 5. Pré-rendre chaque route
  let success = 0
  let errors = 0

  for (const route of ROUTES) {
    try {
      process.stdout.write(`  ⏳ ${route} ... `)
      const html = await renderRoute(page, route)
      writeHtml(route, html)
      const sizeKb = (Buffer.byteLength(html, 'utf-8') / 1024).toFixed(1)
      console.log(`✓ ${sizeKb} KB`)
      success++
    } catch (err) {
      console.log(`✗ ${err.message}`)
      errors++
    }
  }

  // 6. Nettoyage
  await browser.close()
  server.close()

  console.log(`\n  ────────────────────────────`)
  console.log(`  ✓ ${success} pages pré-rendues`)
  if (errors) console.log(`  ✗ ${errors} erreurs`)
  console.log(`  📁 Sortie : ${DIST}/`)
  console.log()
}

main().catch((err) => {
  console.error('Erreur fatale :', err)
  process.exit(1)
})
