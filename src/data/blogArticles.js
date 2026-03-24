/* ── Blog Articles Data Store ────────────────────────────────────────────── */

export const CATEGORIES = {
  Financement: { color: '#3B4FD8', bg: 'rgba(59,79,216,0.10)' },
  Technique:   { color: '#9B30E8', bg: 'rgba(155,48,232,0.10)' },
  'Étude de cas': { color: '#059669', bg: 'rgba(5,150,105,0.10)' },
  Conformité:  { color: '#D97706', bg: 'rgba(217,119,6,0.10)' },
}

export const articles = [
  {
    slug: 'formations-ia-opco-guide-2026',
    title: 'Formations IA et OPCO : Le guide complet 2026 pour former vos équipes sans budget supplémentaire',
    excerpt: 'En 2026, votre OPCO peut financer 100% de la formation IA de vos équipes. Découvrez le guide complet : dispositifs, démarches et cas concret d\'une PME alsacienne.',
    date: '2026-03-19',
    category: 'Financement',
    readTime: 9,
    featured: true,
    image: '/og-image.png',
    metaTitle: 'Formations IA & OPCO : Guide complet 2026 — Smart Optimisation',
    metaDescription: 'Financement OPCO IA, prise en charge formation IA 100%. Guide 2026 pour former vos équipes à l\'IA sans budget supplémentaire. Audit IA entreprise gratuit.',
    keywords: ['Financement OPCO IA', 'Formation IA entreprise', 'Prise en charge formation IA', 'Audit IA entreprise gratuit'],

    toc: [
      { id: 'urgence-ia-2026',           title: 'L\'IA n\'est plus un luxe' },
      { id: 'comprendre-opco',           title: 'Qu\'est-ce qu\'un OPCO ?' },
      { id: 'leviers-financement',       title: 'Leviers de financement 2026' },
      { id: 'pourquoi-smart-optimisation', title: 'Pourquoi Smart Optimisation ?' },
      { id: 'cas-concret-pme',           title: 'Cas concret : PME alsacienne' },
      { id: 'faq',                       title: 'FAQ' },
    ],

    faq: [
      {
        q: 'Quel est le délai entre la demande et le début de la formation IA financée OPCO ?',
        a: 'En moyenne, comptez 2 à 3 semaines entre le premier contact et le démarrage de la formation. Notre équipe obtient généralement une réponse de faisabilité de l\'OPCO sous 48h ouvrées. Le dossier complet est traité en 1 à 2 semaines selon l\'OPCO.',
      },
      {
        q: 'Comment savoir si mon entreprise est éligible au financement OPCO pour une formation IA ?',
        a: 'Toute entreprise employant au moins un salarié cotise à un OPCO et est donc éligible par défaut. Le montant disponible dépend de votre masse salariale, de votre secteur et de votre historique de formations. Smart Optimisation vérifie votre éligibilité gratuitement sous 48h ouvrées.',
      },
      {
        q: 'Quelle est la différence entre une formation IA standard et une formation IA sur mesure OPCO ?',
        a: 'Une formation IA standard (ex. RS7411 CPF) est un programme certifiant défini, avec des sessions planifiées, idéal pour une montée en compétences individuelle. Une formation IA sur mesure OPCO est co-construite avec votre équipe, basée sur vos outils réels et processus métier, plus adaptée aux formations collectives de 3 à 200 personnes. Les deux sont finançables via votre OPCO.',
      },
      {
        q: 'L\'IA générative est-elle vraiment utile pour les PME ou seulement pour les grandes entreprises ?',
        a: 'L\'IA générative est particulièrement rentable pour les PME, où le temps est la ressource la plus précieuse. Nos formations ciblent des gains immédiats sur des tâches concrètes : rédaction, synthèse, gestion d\'emails, reporting. Une PME de 10 personnes peut récupérer l\'équivalent d\'un ETP partiel dès les 30 premiers jours.',
      },
      {
        q: 'La formation respecte-t-elle les obligations du EU AI Act ?',
        a: 'Oui. Tous nos programmes intègrent un module conformité EU AI Act et RGPD. Vos collaborateurs apprennent à utiliser l\'IA de manière responsable, en comprenant les limites légales, les biais algorithmiques et les obligations de transparence applicables à votre secteur.',
      },
    ],

    relatedSlugs: [],

    sections: [
      {
        type: 'intro',
        text: 'En 2026, ne pas former vos équipes à l\'IA n\'est plus une option — c\'est un risque concurrentiel. La bonne nouvelle ? Votre OPCO peut financer <strong>100% de la formation</strong>. Voici le guide complet pour en profiter, sans paperasse ni avance de trésorerie.',
      },
      {
        type: 'cta',
        id: 'cta-1',
        title: 'Vérifiez votre éligibilité OPCO',
        sub: 'Réponse de faisabilité sous 48h — gratuit et sans engagement.',
        link: '/contact',
        label: 'Vérifier mon éligibilité →',
        variant: 'primary',
      },
      {
        type: 'h2',
        id: 'urgence-ia-2026',
        title: '1. L\'IA n\'est plus un luxe, c\'est une nécessité',
        content: [
          {
            type: 'h3',
            title: 'Pourquoi 2026 est l\'année charnière pour l\'acculturation des équipes',
          },
          {
            type: 'p',
            text: 'L\'intelligence artificielle a franchi un cap décisif. Ce n\'est plus une technologie réservée aux startups ou aux grandes entreprises tech. Elle est désormais <strong>au cœur des processus métier</strong> de toutes les organisations — PME, ETI, associations, services publics.',
          },
          {
            type: 'stats',
            items: [
              { value: '73%', label: 'des entreprises françaises prévoient d\'intégrer l\'IA d\'ici fin 2026', source: 'Bpifrance Le Lab, 2025' },
              { value: '2–3h', label: 'gagnées par collaborateur formé à l\'IA générative sur les tâches répétitives', source: '' },
              { value: '100%', label: 'de prise en charge formation IA possible via financement OPCO', source: '' },
            ],
          },
          {
            type: 'p',
            text: 'Mais voilà le vrai problème : <strong>former coûte cher.</strong> Ou du moins, c\'est la croyance la plus répandue. La réalité est tout autre. Grâce au <strong>financement OPCO IA</strong>, la prise en charge formation IA de vos équipes peut être <strong>totale et sans avance de votre part</strong>.',
          },
        ],
      },
      {
        type: 'h2',
        id: 'comprendre-opco',
        title: '2. Qu\'est-ce qu\'un OPCO et comment finance-t-il l\'IA ?',
        content: [
          {
            type: 'h3',
            title: 'Le rôle de l\'Opérateur de Compétences (OPCO)',
          },
          {
            type: 'p',
            text: 'Un <strong>OPCO</strong> (Opérateur de Compétences) est un organisme paritaire — géré conjointement par les représentants des employeurs et des salariés — dont la mission est de <strong>financer la formation professionnelle continue</strong> des entreprises relevant de sa branche.',
          },
          {
            type: 'sectors',
            title: 'Les 11 OPCO en France',
            items: [
              { name: 'Atlas', sectors: 'Banque, finance, assurance, numérique' },
              { name: 'Akto', sectors: 'Commerce, services, hôtellerie-restauration' },
              { name: 'AFDAS', sectors: 'Culture, médias, sport, tourisme' },
              { name: 'Uniformation', sectors: 'Social, médico-social, coopération' },
              { name: 'OCAPIAT', sectors: 'Agriculture, pêche, agroalimentaire' },
              { name: 'OPCO 2i', sectors: 'Industrie' },
              { name: 'Constructys', sectors: 'Construction' },
              { name: '+ 4 autres', sectors: 'Couvrent tous les secteurs restants' },
            ],
          },
          {
            type: 'h3',
            title: 'Comment fonctionne le financement concrètement ?',
          },
          {
            type: 'steps',
            items: [
              { n: '1', text: '<strong>Votre entreprise cotise</strong> chaque année à son OPCO (cotisation obligatoire liée à votre masse salariale).' },
              { n: '2', text: '<strong>Ces fonds sont mobilisables</strong> pour financer des formations de vos collaborateurs.' },
              { n: '3', text: '<strong>L\'OPCO règle directement</strong> l\'organisme de formation (Smart Optimisation) — sans que vous ayez à avancer quoi que ce soit.' },
              { n: '4', text: 'Vous recevez <strong>uniquement la confirmation</strong> que la formation est financée.' },
            ],
          },
          {
            type: 'callout',
            text: 'Résultat : vos équipes se forment à l\'IA, vous ne déboursez rien.',
          },
        ],
      },
      {
        type: 'h2',
        id: 'leviers-financement',
        title: '3. Les différents leviers de financement disponibles en 2026',
        content: [
          {
            type: 'h3',
            title: 'Le Plan de Développement des Compétences (PDC)',
          },
          {
            type: 'p',
            text: 'C\'est le levier <strong>le plus courant</strong> pour les entreprises. Il vous permet de financer des formations décidées par l\'employeur dans le cadre de la stratégie RH.',
          },
          {
            type: 'list',
            items: [
              'Accessible à <strong>toutes les entreprises</strong>, quelle que soit leur taille.',
              'Financement <strong>jusqu\'à 100%</strong> selon votre OPCO et votre secteur.',
              'Idéal pour des <strong>formations collectives</strong> (plusieurs collaborateurs en même temps).',
              'Compatible avec nos programmes IA sur mesure et nos formations OPCO dédiées.',
            ],
          },
          {
            type: 'h3',
            title: 'Le FNE-Formation',
          },
          {
            type: 'p',
            text: 'Le <strong>FNE-Formation</strong> (Fonds National de l\'Emploi) est un dispositif d\'aide de l\'État, géré par les DREETS, destiné aux entreprises en difficulté ou en mutation économique.',
          },
          {
            type: 'list',
            items: [
              'Particulièrement pertinent si votre entreprise est en <strong>transition numérique ou digitale</strong>.',
              'Peut couvrir jusqu\'à <strong>70% à 80%</strong> du coût pédagogique.',
              'Se combine parfois avec le financement OPCO pour une <strong>prise en charge totale</strong>.',
            ],
          },
          {
            type: 'h3',
            title: 'Les co-financements possibles',
          },
          {
            type: 'list',
            items: [
              '<strong>OPCO + CPF</strong> : Le CPF d\'un salarié peut compléter le financement OPCO pour des formations certifiantes comme notre formation <strong>RS7411</strong>.',
              '<strong>OPCO + Région</strong> : Certaines régions (dont l\'Alsace) proposent des aides complémentaires pour la montée en compétences numériques des PME.',
              '<strong>OPCO + EDEC</strong> : Accord-cadre sectoriel pouvant augmenter les plafonds de financement.',
            ],
          },
        ],
      },
      {
        type: 'cta',
        id: 'cta-2',
        title: 'Quel dispositif s\'applique à votre situation ?',
        sub: 'Demandez votre audit IA entreprise gratuit — un conseiller analyse vos droits sous 48h.',
        link: '/contact',
        label: 'Obtenir mon audit gratuit →',
        variant: 'secondary',
      },
      {
        type: 'h2',
        id: 'pourquoi-smart-optimisation',
        title: '4. Pourquoi choisir Smart Optimisation pour votre formation IA financée OPCO ?',
        content: [
          {
            type: 'h3',
            title: 'L\'accompagnement "zéro paperasse"',
          },
          {
            type: 'p',
            text: 'La principale raison pour laquelle les entreprises ne forment pas leurs équipes à l\'IA ? <strong>La complexité administrative.</strong>',
          },
          {
            type: 'list',
            items: [
              'Identification de votre OPCO et vérification de votre éligibilité.',
              'Montage complet du dossier de financement.',
              'Soumission et relances auprès de l\'OPCO.',
              'Suivi jusqu\'au paiement direct à notre organisme.',
            ],
          },
          {
            type: 'callout',
            text: '<strong>Votre seule tâche : décider de former vos équipes.</strong> Le reste, c\'est nous.',
          },
          {
            type: 'h3',
            title: 'Une expertise terrain reconnue',
          },
          {
            type: 'list',
            items: [
              'A <strong>accompagné +20 entreprises</strong> dans leur transformation IA.',
              'A formé des équipes de <strong>5 à 200 collaborateurs</strong> sur des outils concrets (ChatGPT, Claude, Make, n8n...).',
              'Maîtrise les enjeux de <strong>conformité EU AI Act et RGPD</strong> qui touchent votre entreprise.',
              'Mesure le <strong>ROI formation dès J+30</strong> avec des indicateurs factuels.',
            ],
          },
        ],
      },
      {
        type: 'h2',
        id: 'cas-concret-pme',
        title: '5. Cas d\'usage : comment une PME alsacienne a gagné 2h/jour par collaborateur',
        content: [
          {
            type: 'h3',
            title: 'Contexte',
          },
          {
            type: 'p',
            text: 'Une <strong>PME de 35 collaborateurs</strong> dans le secteur des services (rattachée à l\'OPCO Akto) souhaitait réduire le temps passé sur les tâches administratives répétitives. Budget formation disponible : 0 €. Mais une cotisation OPCO non utilisée de l\'année précédente.',
          },
          {
            type: 'steps',
            items: [
              { n: '1', text: '<strong>Audit IA gratuit</strong> (2h) : identification des processus les plus chronophages.' },
              { n: '2', text: '<strong>Montage du dossier OPCO Akto</strong> par notre équipe : prise en charge validée en 4 jours.' },
              { n: '3', text: '<strong>Formation sur mesure</strong> sur 2 jours : maîtrise de l\'IA générative appliquée aux cas d\'usage métier réels.' },
              { n: '4', text: '<strong>Suivi à J+30</strong> : mesure des gains par collaborateur.' },
            ],
          },
          {
            type: 'h3',
            title: 'Résultats mesurés à J+30',
          },
          {
            type: 'results',
            rows: [
              { label: 'Temps de rédaction d\'un email complexe', before: '18 min', after: '4 min', gain: '-78%' },
              { label: 'Temps de synthèse d\'un document de 20 pages', before: '45 min', after: '8 min', gain: '-82%' },
              { label: 'Satisfaction collaborateurs', before: '—', after: '97%', gain: '✓' },
              { label: 'Temps total économisé/jour/collab.', before: '—', after: '~2h', gain: '✓' },
            ],
          },
          {
            type: 'callout',
            text: 'Pour une équipe de 35 personnes, c\'est <strong>70h de productivité récupérées chaque jour</strong>. Le tout financé à <strong>100% par l\'OPCO Akto</strong>.',
          },
        ],
      },
      {
        type: 'cta',
        id: 'cta-3',
        title: 'Prêt à passer à l\'action ?',
        sub: 'Notre conseiller analyse votre situation gratuitement et vous présente un plan de financement clé en main sous 48h. Sans engagement.',
        link: '/contact',
        label: 'Démarrer maintenant →',
        variant: 'primary',
      },
    ],
  },
]

export function getArticleBySlug(slug) {
  return articles.find(a => a.slug === slug) || null
}

export function getFeaturedArticle() {
  return articles.find(a => a.featured) || articles[0]
}

export function getRelatedArticles(slug, limit = 3) {
  const article = getArticleBySlug(slug)
  if (!article) return []
  const slugs = article.relatedSlugs || []
  const related = slugs.map(s => getArticleBySlug(s)).filter(Boolean)
  if (related.length < limit) {
    const others = articles.filter(a => a.slug !== slug && !slugs.includes(a.slug))
    related.push(...others.slice(0, limit - related.length))
  }
  return related.slice(0, limit)
}
