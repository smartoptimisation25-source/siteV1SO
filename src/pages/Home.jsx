import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import ClientsMarquee from '../components/ClientsMarquee'
import { useSEO } from '../hooks/useSEO'
import useIsMobile from '../hooks/useIsMobile'

const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1], delay: i * 0.12 },
  }),
}

const TESTIMONIALS = [
  {
    name: 'Sophie Marchand',
    role: 'Responsable RH',
    company: 'Alstom',
    type: 'Formation OPCO',
    accent: '#3B4FD8',
    initials: 'SM',
    text: "En deux jours, mon équipe a complètement changé sa façon de travailler. On utilise l'IA pour rédiger nos offres d'emploi, analyser les CV, préparer les entretiens. Le formateur a su adapter chaque exercice à nos vrais cas RH. Retour sur investissement immédiat.",
    stars: 5,
  },
  {
    name: 'Thomas Riegert',
    role: 'Directeur des opérations',
    company: 'Hager Group',
    type: 'Solution IA sur mesure',
    accent: '#9B30E8',
    initials: 'TR',
    text: "Smart Optimisation a automatisé notre reporting hebdomadaire — ce qui prenait 4h à un analyste prend maintenant 8 minutes. Le déploiement a été propre, bien documenté, et l'équipe a été formée dans la foulée. C'est exactement ce qu'on cherchait.",
    stars: 5,
  },
  {
    name: 'Amina Benali',
    role: 'Chargée de communication',
    company: 'CTS Strasbourg',
    type: 'Formation CPF',
    accent: '#059669',
    initials: 'AB',
    text: "J'avais peur que la formation soit trop technique pour moi. Pas du tout. En partant de zéro, j'ai appris à utiliser l'IA pour créer des visuels, rédiger des posts LinkedIn et analyser nos stats réseaux. Aujourd'hui je gagne 6h par semaine.",
    stars: 5,
  },
  {
    name: 'Julien Koenig',
    role: 'Manager équipe commerciale',
    company: 'Crédit Mutuel',
    type: 'Formation OPCO',
    accent: '#D97706',
    initials: 'JK',
    text: "La pédagogie est vraiment différente. Pas de slides interminables — on est dans le concret dès le premier exercice. Mon équipe de 8 commerciaux a adoré, et on a réduit le temps de préparation client de 40%. Je recommande sans hésiter.",
    stars: 5,
  },
  {
    name: 'Marie-Claire Hoffmann',
    role: 'Directrice administrative',
    company: 'HUS Strasbourg',
    type: 'Solution IA sur mesure',
    accent: '#E83B9B',
    initials: 'MH',
    text: "Nous avons fait appel à Smart Optimisation pour structurer notre gestion documentaire avec l'IA. Le résultat dépasse nos attentes : les demandes internes sont traitées 3× plus vite, avec moins d'erreurs. Une vraie transformation opérationnelle.",
    stars: 5,
  },
]

const DNA_PILLARS = [
  {
    num: '01',
    titre: 'Notre conviction',
    corps: "L'IA n'est pas une révolution qui arrive sur vous — c'est un outil que vous pouvez maîtriser. Notre rôle : faire en sorte que vous restiez aux commandes, quel que soit votre point de départ.",
    accent: '#3B4FD8',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
  },
  {
    num: '02',
    titre: 'Notre méthode',
    corps: "Pas de copier-coller. Chaque accompagnement est construit autour de votre réalité : vos outils, votre secteur, vos contraintes. Du sur-mesure, ou rien.",
    accent: '#7B4FE8',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    num: '03',
    titre: 'Notre engagement',
    corps: "Qu'il s'agisse de former un enfant de 10 ans, un manager ou une équipe entière — nous apportons la même exigence. Pas de client de seconde zone.",
    accent: '#9B30E8',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    num: '04',
    titre: 'Notre impact',
    corps: "Ce qui nous anime, ce n'est pas la technologie pour elle-même. C'est le moment où quelqu'un nous dit : « maintenant je comprends, et je sais quoi en faire. »",
    accent: '#C030E8',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
]

const SERVICE_LINKS = [
  {
    label: 'Formation CPF & OPCO',
    sub: 'Financement 100% pris en charge',
    to: '/formation/cpf',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    label: 'Solution IA sur mesure',
    sub: 'Intégrée à vos processus',
    to: '/solution-ia',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M4.93 4.93a10 10 0 0 0 0 14.14"/>
      </svg>
    ),
  },
  {
    label: 'Éduc IA',
    sub: 'Pour les 8–15 ans',
    to: '/educ-ia',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
]

/* ── Carte témoignage ── */
function TestimonialCard({ t }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '20px',
      padding: '28px 28px 24px',
      border: '1.5px solid rgba(59,79,216,0.08)',
      boxShadow: '0 4px 24px rgba(59,79,216,0.07)',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      position: 'relative',
      overflow: 'hidden',
      width: '340px',
      flexShrink: 0,
    }}>
      {/* Barre accent haut */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${t.accent}, transparent)` }} />

      {/* Badge type */}
      <div style={{ display: 'inline-flex', alignSelf: 'flex-start', padding: '3px 10px', borderRadius: '999px', background: `${t.accent}12`, border: `1px solid ${t.accent}25` }}>
        <span style={{ color: t.accent, fontSize: '11px', fontWeight: 700 }}>{t.type}</span>
      </div>

      {/* Grand guillemet décoratif */}
      <div style={{ position: 'absolute', top: 16, right: 18, fontSize: '60px', lineHeight: 1, color: `${t.accent}10`, fontFamily: 'Georgia, serif', fontWeight: 900, userSelect: 'none', pointerEvents: 'none' }}>"</div>

      {/* Texte */}
      <p style={{ color: '#1F2937', fontSize: '13.5px', lineHeight: 1.75, margin: 0, fontStyle: 'italic', flex: 1 }}>
        "{t.text}"
      </p>

      {/* Étoiles */}
      <div style={{ display: 'flex', gap: '3px' }}>
        {Array.from({ length: t.stars }).map((_, s) => (
          <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B" stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        ))}
      </div>

      {/* Auteur — sans entreprise */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '12px', borderTop: '1px solid rgba(59,79,216,0.07)' }}>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: `linear-gradient(135deg, ${t.accent}, ${t.accent}80)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ color: '#fff', fontSize: '12px', fontWeight: 800 }}>{t.initials}</span>
        </div>
        <div>
          <p style={{ color: '#0F0C1E', fontSize: '13px', fontWeight: 700, margin: 0 }}>{t.name}</p>
          <p style={{ color: '#6B7280', fontSize: '11px', margin: 0 }}>{t.role}</p>
        </div>
      </div>
    </div>
  )
}

/* ── Section Témoignages avec défilement automatique ── */
function TestimonialsSection() {
  const ITEMS = [...TESTIMONIALS, ...TESTIMONIALS]
  return (
    <section style={{ background: '#F9F8FF', borderTop: '1px solid rgba(59,79,216,0.07)', padding: '64px 0', overflow: 'hidden' }}>

      {/* Entête centré */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '48px', padding: '0 24px' }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 16px', borderRadius: '999px', border: '1px solid rgba(59,79,216,0.18)', background: 'rgba(59,79,216,0.07)', marginBottom: '16px' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span style={{ color: '#3B4FD8', fontSize: '13px', fontWeight: 600, letterSpacing: '0.02em' }}>Ils témoignent</span>
        </div>
        <h2 style={{ color: '#0F0C1E', fontWeight: 800, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 10px' }}>
          Ce que disent ceux qui nous font confiance
        </h2>
        <p style={{ color: '#4B5563', fontSize: '15px', maxWidth: '460px', margin: '0 auto', lineHeight: 1.6 }}>
          Formations ou solutions sur mesure — voici les retours de ceux qui sont passés à l'action.
        </p>
      </motion.div>

      {/* Ruban défilant */}
      <div style={{
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        overflow: 'hidden',
      }}>
        <div className="testimonials-track">
          {ITEMS.map((t, i) => (
            <div key={i} style={{ marginRight: '20px' }}>
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

/* Carte ADN avec tilt 3D */
function DNACard({ pillar, i }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 })

  function onMouseMove(e) {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function onMouseLeave() { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] } }}
      viewport={{ once: true }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{
        borderColor: `${pillar.accent}55`,
        boxShadow: `0 24px 64px ${pillar.accent}18`,
        transition: { duration: 0.25 },
      }}
      style={{
        background: '#F9F8FF',
        border: '1.5px solid rgba(59,79,216,0.09)',
        borderRadius: '20px',
        padding: '22px 24px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        rotateX, rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 800,
      }}
    >
      {/* Lueur de fond au survol */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1, transition: { duration: 0.3 } }}
        style={{
          position: 'absolute', inset: 0, borderRadius: '24px', pointerEvents: 'none',
          background: `radial-gradient(ellipse at 30% 0%, ${pillar.accent}18 0%, transparent 65%)`,
        }}
      />

      {/* Numéro décoratif */}
      <motion.div
        whileHover={{ scale: 1.15, transition: { duration: 0.3 } }}
        style={{
          position: 'absolute', top: 16, right: 20,
          fontSize: '56px', fontWeight: 900, lineHeight: 1,
          userSelect: 'none', pointerEvents: 'none',
          background: `linear-gradient(135deg, ${pillar.accent}30, transparent)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}
      >
        {pillar.num}
      </motion.div>

      {/* Icône */}
      <motion.div
        whileHover={{ rotate: [0, -10, 10, -5, 5, 0], scale: 1.1, transition: { duration: 0.5 } }}
        style={{
          width: 36, height: 36, borderRadius: '10px',
          background: `linear-gradient(135deg, ${pillar.accent}30, ${pillar.accent}18)`,
          border: `1px solid ${pillar.accent}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: pillar.accent, marginBottom: '12px',
        }}
      >
        {pillar.icon}
      </motion.div>

      <h3 style={{ color: '#000000', fontWeight: 700, fontSize: '17px', marginBottom: '12px', letterSpacing: '-0.01em' }}>
        {pillar.titre}
      </h3>
      <p style={{ color: '#0D0D0D', fontSize: '14px', lineHeight: 1.75, margin: 0 }}>
        {pillar.corps}
      </p>

      {/* Trait de couleur en bas */}
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1, transition: { duration: 0.6, delay: i * 0.1 + 0.3 } }}
        viewport={{ once: true }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, ${pillar.accent}, transparent)`,
        }}
      />
    </motion.div>
  )
}

function ADNSection() {
  const isMobile = useIsMobile()
  return (
    <section style={{ background: '#fff', position: 'relative', overflow: 'hidden', padding: isMobile ? '40px 20px' : '48px 48px 40px', borderTop: '1px solid rgba(59,79,216,0.07)' }}>

      {/* Blobs */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: -200, left: -200, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,79,216,0.06) 0%, transparent 65%)', pointerEvents: 'none' }}
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{ position: 'absolute', bottom: -150, right: -150, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,48,232,0.05) 0%, transparent 65%)', pointerEvents: 'none' }}
      />
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,48,232,0.04) 0%, transparent 70%)', pointerEvents: 'none' }}
      />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Entête ── */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            viewport={{ once: true }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '999px', border: '1px solid rgba(59,79,216,0.18)', background: 'rgba(59,79,216,0.07)', marginBottom: '16px' }}
          >
            <motion.span
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg,#3B4FD8,#9B30E8)', flexShrink: 0, display: 'block' }}
            />
            <span style={{ color: '#3B4FD8', fontSize: '13px', fontWeight: 600, letterSpacing: '0.02em' }}>L'ADN de Smart Optimisation</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.08 } }}
            viewport={{ once: true }}
            style={{ color: '#0F0C1E', fontWeight: 800, fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '0' }}
          >
            Nous ne vendons pas de la technologie.
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.16 } }}
            viewport={{ once: true }}
            style={{ fontWeight: 800, fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)', lineHeight: 1.15, letterSpacing: '-0.025em', margin: '0 0 12px' }}
          >
            <motion.span
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundImage: 'linear-gradient(135deg,#3B4FD8,#9B30E8,#E83B9B,#3B4FD8)', backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              Nous aidons les humains à s'en emparer.
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.25 } }}
            viewport={{ once: true }}
            style={{ color: '#0D0D0D', fontSize: '15px', maxWidth: '520px', margin: '0 auto', lineHeight: 1.5 }}
          >
            Depuis notre création, une seule boussole : que chaque personne que nous accompagnons reparte avec plus de clarté qu'avant.
          </motion.p>
        </div>

        {/* ── Ligne de séparation ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } }}
          viewport={{ once: true }}
          style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(59,79,216,0.20), rgba(155,48,232,0.20), transparent)', marginBottom: '24px', originX: 0.5 }}
        />

        {/* ── 4 piliers ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {DNA_PILLARS.map((pillar, i) => <DNACard key={i} pillar={pillar} i={i} />)}
        </div>

        {/* ── Ligne de séparation basse ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1, transition: { duration: 0.8 } }}
          viewport={{ once: true }}
          style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(59,79,216,0.15), transparent)', marginBottom: '20px', originX: 0.5 }}
        />

        {/* ── Liens services ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          viewport={{ once: true }}
        >
          <p style={{ color: '#6B7280', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', marginBottom: '24px' }}>
            Ce que nous faisons concrètement
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {SERVICE_LINKS.map((s, i) => (
              <motion.div
                key={s.to}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.4 } }}
                viewport={{ once: true }}
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(59,79,216,0.12)', borderColor: 'rgba(59,79,216,0.30)', transition: { duration: 0.2 } }}
              >
                <Link
                  to={s.to}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '14px 22px', borderRadius: '16px',
                    background: '#fff',
                    border: '1.5px solid rgba(59,79,216,0.10)',
                    boxShadow: '0 4px 16px rgba(59,79,216,0.06)',
                    textDecoration: 'none',
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.1, transition: { type: 'spring', stiffness: 300 } }}
                    style={{ color: '#3B4FD8' }}
                  >
                    {s.icon}
                  </motion.div>
                  <div>
                    <p style={{ color: '#0F0C1E', fontWeight: 600, fontSize: '14px', margin: 0, lineHeight: 1.2 }}>{s.label}</p>
                    <p style={{ color: '#6B7280', fontSize: '11px', margin: 0 }}>{s.sub}</p>
                  </div>
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    style={{ color: '#3B4FD8', fontSize: '16px', marginLeft: '4px' }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}



const HOME_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://smartoptimisation.fr/#webpage',
      'url': 'https://smartoptimisation.fr/',
      'name': 'Formation IA & Solutions IA sur mesure en Alsace | Smart Optimisation',
      'description': 'Expert en IA : formations certifiées CPF RS7344, financement OPCO 100%, audit IA gratuit, déploiement solution IA sur mesure. +150 entreprises accompagnées.',
      'isPartOf': { '@id': 'https://smartoptimisation.fr/#website' },
      'about': { '@id': 'https://smartoptimisation.fr/#organization' },
      'breadcrumb': { '@id': 'https://smartoptimisation.fr/#breadcrumb' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://smartoptimisation.fr/#breadcrumb',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://smartoptimisation.fr/' },
      ],
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://smartoptimisation.fr/#service',
      'name': 'Smart Optimisation',
      'description': 'Expert en intelligence artificielle : formations certifiées Qualiopi (CPF RS7344, OPCO), solutions IA sur mesure, audit IA gratuit. Basé à Strasbourg, Alsace.',
      'url': 'https://smartoptimisation.fr',
      'areaServed': [
        { '@type': 'City', 'name': 'Strasbourg' },
        { '@type': 'City', 'name': 'Mulhouse' },
        { '@type': 'City', 'name': 'Colmar' },
        { '@type': 'AdministrativeArea', 'name': 'Alsace' },
        { '@type': 'Country', 'name': 'France' },
      ],
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'Services Smart Optimisation',
        'itemListElement': [
          {
            '@type': 'OfferCatalog',
            'name': 'Formations IA',
            'itemListElement': [
              { '@type': 'Offer', 'itemOffered': { '@type': 'Course', 'name': 'Formation IA CPF RS7344', 'url': 'https://smartoptimisation.fr/formation/cpf' } },
              { '@type': 'Offer', 'itemOffered': { '@type': 'Course', 'name': 'Formation IA OPCO', 'url': 'https://smartoptimisation.fr/formation/opco' } },
              { '@type': 'Offer', 'itemOffered': { '@type': 'Course', 'name': 'Formation IA sur mesure', 'url': 'https://smartoptimisation.fr/formation/sur-mesure' } },
              { '@type': 'Offer', 'itemOffered': { '@type': 'Course', 'name': 'Formation Claude, ChatGPT, Gemini', 'url': 'https://smartoptimisation.fr/formation/environnements' } },
            ],
          },
          {
            '@type': 'Offer',
            'itemOffered': { '@type': 'Service', 'name': 'Solution IA sur mesure', 'url': 'https://smartoptimisation.fr/solution-ia' },
          },
          {
            '@type': 'Offer',
            'itemOffered': { '@type': 'Service', 'name': 'Ateliers IA enfants (Éduc IA)', 'url': 'https://smartoptimisation.fr/educ-ia' },
          },
        ],
      },
      'knowsAbout': [
        'Intelligence Artificielle',
        'Formation professionnelle IA',
        'ChatGPT', 'Claude', 'Google Gemini',
        'EU AI Act',
        'Automatisation processus métier',
        'LLMs',
        'RGPD IA',
        'Financement OPCO',
        'CPF RS7344',
      ],
      'priceRange': '€€',
      'speakable': {
        '@type': 'SpeakableSpecification',
        'cssSelector': ['h1', '.hero-subtitle'],
      },
      'about': [
        { '@type': 'Thing', 'name': 'Formation Intelligence Artificielle' },
        { '@type': 'Thing', 'name': 'Solutions IA sur mesure' },
        { '@type': 'Thing', 'name': 'Audit IA' },
      ],
      'mentions': [
        { '@type': 'Thing', 'name': 'ChatGPT' },
        { '@type': 'Thing', 'name': 'Claude' },
        { '@type': 'Thing', 'name': 'Google Gemini' },
        { '@type': 'Thing', 'name': 'EU AI Act' },
        { '@type': 'Thing', 'name': 'Certification Qualiopi' },
        { '@type': 'Thing', 'name': 'CPF RS7344' },
        { '@type': 'Thing', 'name': 'Financement OPCO' },
      ],
    },
  ],
}

export default function Home() {
  useSEO({
    title: 'Formation IA & Solutions IA sur mesure à Strasbourg | Smart Optimisation',
    description: 'Smart Optimisation : formations IA certifiées Qualiopi (CPF RS7344, OPCO 100%), solutions IA sur mesure et audit IA gratuit. Basés à Strasbourg, nous intervenons en Alsace et dans toute la France.',
    path: '/',
    jsonLd: HOME_SCHEMA,
    keywords: 'formation IA, solution IA sur mesure, audit IA gratuit, formation intelligence artificielle, Smart Optimisation, Strasbourg, certifié Qualiopi',
  })
  const isMobile = useIsMobile()

  return (
    <main>
      {/* HERO */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        background: '#ffffff',
        height: isMobile ? 'auto' : 'calc(100vh - 72px)',
        minHeight: isMobile ? 'auto' : 'calc(100vh - 72px)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Blobs décoratifs */}
        <motion.div animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -20, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '-160px', left: '-120px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,79,216,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <motion.div animate={{ scale: [1, 1.15, 1], x: [0, -15, 0], y: [0, 25, 0] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ position: 'absolute', bottom: '80px', right: '80px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(155,48,232,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <motion.div animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', background: 'radial-gradient(ellipse at top right, rgba(123,158,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Zone texte */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          padding: isMobile ? '24px 24px 4px' : '24px 48px 4px',
          position: 'relative', zIndex: 2,
        }}>
          <div style={{ maxWidth: isMobile ? '100%' : '680px', width: '100%' }}>
            <motion.div variants={FADE_UP} initial="hidden" animate="show" custom={0}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'rgba(59,79,216,0.07)', border: '1px solid rgba(59,79,216,0.18)', marginBottom: '20px' }}>
              <motion.span animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
                style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', flexShrink: 0, display: 'block' }} />
              <span style={{ color: '#3B4FD8', fontSize: '13px', fontWeight: 600 }}>Experts en Intelligence Artificielle</span>
            </motion.div>

            <motion.h1 variants={FADE_UP} initial="hidden" animate="show" custom={1}
              style={{ color: '#0F0C1E', fontWeight: 800, fontSize: isMobile ? '2rem' : 'clamp(2.4rem, 4.5vw, 3.8rem)', lineHeight: 1.12, letterSpacing: '-0.025em', marginBottom: '18px' }}>
              Maîtrisez l&apos;IA.{' '}
              <motion.span
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundImage: 'linear-gradient(135deg,#3B4FD8,#9B30E8,#E83B9B,#3B4FD8)', backgroundSize: '200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Élevez votre vision.
              </motion.span>
              <br />Multipliez votre impact.
            </motion.h1>

            <motion.p variants={FADE_UP} initial="hidden" animate="show" custom={2}
              style={{ color: '#374151', fontSize: isMobile ? '15px' : '17px', lineHeight: 1.65, marginBottom: '32px', maxWidth: '540px' }}>
              Formation certifiée ou solution sur mesure — <strong style={{ color: '#0F0C1E' }}>100% financé OPCO ou CPF</strong>, résultats mesurables dès le 1er mois.
            </motion.p>

            <motion.div variants={FADE_UP} initial="hidden" animate="show" custom={3}
              style={{ display: 'flex', gap: '12px', flexDirection: isMobile ? 'column' : 'row', flexWrap: 'wrap' }}>
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link to="/formation/cpf"
                  style={{ padding: '15px 36px', borderRadius: '999px', fontWeight: 600, fontSize: '15px', color: '#fff', background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)', textDecoration: 'none', boxShadow: '0 4px 20px rgba(155,48,232,0.30)', display: 'block', textAlign: 'center' }}>
                  Découvrir nos formations
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link to="/solution-ia"
                  style={{ padding: '15px 36px', borderRadius: '999px', fontWeight: 600, fontSize: '15px', color: '#3B4FD8', textDecoration: 'none', border: '1.5px solid rgba(59,79,216,0.30)', display: 'block', textAlign: 'center' }}>
                  Solutions IA
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Ruban clients — ancré en bas du hero, toujours visible */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ position: 'relative', zIndex: 2, borderTop: '1px solid rgba(59,79,216,0.07)', background: '#fff', flexShrink: 0, marginTop: '80px' }}
        >
          <ClientsMarquee fullWidth />
        </motion.div>
      </section>

      {/* ADN */}
      <ADNSection />

      {/* Témoignages */}
      <TestimonialsSection />

      {/* Derniers articles */}
      <section className="sr-up" style={{ padding: isMobile ? '48px 20px' : '64px 48px', borderTop: '1px solid rgba(59,79,216,0.07)', background: '#FAFBFF' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
            viewport={{ once: true }}
            style={{ color: '#6B7280', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}
          >
            Derniers articles
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            viewport={{ once: true }}
          >
            <Link
              to="/blog/formations-ia-opco-guide-2026"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
                padding: '20px 24px', borderRadius: '16px', background: '#fff',
                border: '1.5px solid rgba(59,79,216,0.10)', boxShadow: '0 4px 16px rgba(59,79,216,0.06)',
                textDecoration: 'none', maxWidth: '600px', margin: '0 auto',
                transition: 'box-shadow 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(59,79,216,0.12)'; e.currentTarget.style.borderColor = 'rgba(59,79,216,0.25)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(59,79,216,0.06)'; e.currentTarget.style.borderColor = 'rgba(59,79,216,0.10)' }}
            >
              <div style={{ textAlign: 'left' }}>
                <p style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '15px', margin: '0 0 4px', lineHeight: 1.3 }}>
                  Formations IA & OPCO : le guide complet 2026
                </p>
                <p style={{ color: '#6B7280', fontSize: '12px', margin: 0 }}>
                  Financez la formation IA de vos équipes sans budget supplémentaire
                </p>
              </div>
              <span style={{ color: '#3B4FD8', fontSize: '18px', flexShrink: 0 }}>→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

const FORMATIONS_DATA = [
  {
    label: 'CPF',
    badge: '100% Financé',
    badgeColor: '#10B981',
    path: '/formation/cpf',
    title: 'Formation IA financée CPF',
    hook: 'Certifiée RS7344 — formez-vous à l\'IA sans débourser un euro. Dossier pris en charge.',
    stat: { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>, val: 'RS7344', desc: 'Certification officielle' },
    accent: '#3B4FD8',
    features: ['Financement 100% CPF', 'Certifié Qualiopi', 'Accompagnement dossier'],
  },
  {
    label: 'OPCO',
    badge: 'Pour les équipes',
    badgeColor: '#F59E0B',
    path: '/formation/opco',
    title: 'Formation OPCO entreprise',
    hook: 'Financez la montée en compétences IA de toute votre équipe — sans budget supplémentaire.',
    stat: { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, val: '0 €', desc: 'Reste à charge entreprise' },
    accent: '#7B4FE8',
    features: ['Financement OPCO', 'Groupes & individuel', 'Sur site ou à distance'],
  },
  {
    label: 'Sur mesure',
    badge: 'Personnalisé',
    badgeColor: '#6366F1',
    path: '/formation/sur-mesure',
    title: 'Formation taillée pour vous',
    hook: 'Vos outils, votre secteur, vos contraintes — intégrés au programme. Aucun copier-coller.',
    stat: { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>, val: '100%', desc: 'Adapté à votre métier' },
    accent: '#9B30E8',
    features: ['Programme sur mesure', 'Formateur expert IA', 'Suivi post-formation'],
  },
  {
    label: 'Vibe Coding',
    badge: 'Tendance 2025',
    badgeColor: '#EC4899',
    path: '/formation/vibe-coding',
    title: 'Vibe Coding — coder avec l\'IA',
    hook: 'Créez des applications complètes en langage naturel. Aucune expérience en code requise.',
    stat: { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>, val: '10×', desc: 'Plus rapide qu\'un dev classique' },
    accent: '#C030E8',
    features: ['Cursor · Bolt · Lovable', 'De l\'idée à l\'app en live', 'Sans expérience requise'],
  },
]

const LIVE_NOTIFICATIONS = [
  { initials: 'ML', color: '#3B4FD8', name: 'Marie L.', company: 'Bosch Strasbourg', action: 's\'est inscrite', formation: 'Formation OPCO', time: 'il y a 2 min' },
  { initials: 'TR', color: '#10B981', name: 'Thomas R.', company: 'Indépendant', action: 'a financé sa', formation: 'Formation CPF', time: 'il y a 5 min' },
  { initials: 'SC', color: '#9B30E8', name: 'Sophie C.', company: 'Agence digitale', action: 'a démarré la', formation: 'Vibe Coding', time: 'il y a 11 min' },
  { initials: 'PD', color: '#F59E0B', name: 'Pierre D.', company: 'PME Alsace', action: 'a demandé une', formation: 'Formation sur mesure', time: 'il y a 18 min' },
]

function FormationsWidget() {
  const [notifIndex, setNotifIndex] = useState(0)
  const [notifVisible, setNotifVisible] = useState(true)
  const [activeFormation, setActiveFormation] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setNotifVisible(false)
      setTimeout(() => {
        setNotifIndex(i => (i + 1) % LIVE_NOTIFICATIONS.length)
        setNotifVisible(true)
      }, 400)
    }, 3800)
    return () => clearInterval(interval)
  }, [])

  const notif = LIVE_NOTIFICATIONS[notifIndex]

  return (
    <div style={{ position: 'relative', width: '340px' }}>

      {/* LIVE notification bubble */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '-24px', right: '-10px', zIndex: 10,
          background: '#fff', borderRadius: '14px', padding: '8px 12px',
          boxShadow: '0 8px 28px rgba(59,79,216,0.18), 0 2px 8px rgba(0,0,0,0.06)',
          border: '1px solid rgba(59,79,216,0.12)',
          display: 'flex', alignItems: 'center', gap: '8px', minWidth: '190px',
        }}
      >
        {/* Live pulse */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
          <motion.div
            animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#10B981' }}
          />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={notifIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: notifVisible ? 1 : 0, y: notifVisible ? 0 : -6 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg, ${notif.color}, ${notif.color}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: '9px', fontWeight: 800, color: '#fff' }}>{notif.initials}</span>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, color: '#0F0C1E', lineHeight: 1.2 }}>
                {notif.name} · <span style={{ color: '#6B7280', fontWeight: 500 }}>{notif.company}</span>
              </p>
              <p style={{ margin: 0, fontSize: '10px', color: '#6B7280' }}>
                {notif.action} <span style={{ color: notif.color, fontWeight: 700 }}>{notif.formation}</span> · {notif.time}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Main card */}
      <div style={{
        background: '#fff',
        border: '1px solid rgba(59,79,216,0.10)',
        borderRadius: '20px',
        padding: '18px',
        boxShadow: '0 20px 60px rgba(59,79,216,0.10), 0 4px 16px rgba(0,0,0,0.06)',
        marginTop: '14px',
      }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <p style={{ margin: 0, fontSize: '10px', color: '#6B7280', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Choisir mon financement</p>
            <h3 style={{ margin: '2px 0 0', fontSize: '15px', fontWeight: 800, color: '#0F0C1E', letterSpacing: '-0.02em' }}>4 parcours IA disponibles</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '999px', background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', display: 'block' }} />
            <span style={{ fontSize: '9px', fontWeight: 700, color: '#059669' }}>Places dispo</span>
          </div>
        </div>

        {/* Formations list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {FORMATIONS_DATA.map((f, i) => (
            <motion.div
              key={f.label}
              onHoverStart={() => setActiveFormation(i)}
              onHoverEnd={() => setActiveFormation(null)}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.15 }}
              style={{ position: 'relative' }}
            >
              <Link to={f.path} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '9px 11px', borderRadius: '12px',
                  background: activeFormation === i ? `linear-gradient(135deg, ${f.accent}10, ${f.accent}04)` : '#F9F8FF',
                  border: `1.5px solid ${activeFormation === i ? f.accent + '40' : 'transparent'}`,
                  transition: 'all 0.18s ease', cursor: 'pointer',
                }}>
                  {/* Color dot */}
                  <div style={{ width: 30, height: 30, borderRadius: '9px', background: `linear-gradient(135deg, ${f.accent}, #9B30E8)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 3px 10px ${f.accent}35` }}>
                    <span style={{ fontSize: '9px', fontWeight: 800, color: '#fff' }}>{f.label.slice(0, 3)}</span>
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '1px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#0F0C1E' }}>{f.title}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '10px', color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {f.features[0]} · {f.features[1]}
                    </p>
                  </div>

                  {/* Right: stat + arrow */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ margin: 0, fontSize: '12px', fontWeight: 800, color: f.accent }}>{f.stat.val}</p>
                      <p style={{ margin: 0, fontSize: '8px', color: '#9CA3AF' }}>{f.stat.desc}</p>
                    </div>
                    <motion.div
                      animate={{ x: activeFormation === i ? 3 : 0 }}
                      transition={{ duration: 0.15 }}
                      style={{ color: activeFormation === i ? f.accent : '#D1D5DB' }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom urgency bar */}
        <div style={{ marginTop: '12px', padding: '8px 12px', borderRadius: '10px', background: 'linear-gradient(135deg, #FEF3C7, #FDE68A30)', border: '1px solid #FCD34D50', display: 'flex', alignItems: 'center', gap: '7px' }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <p style={{ margin: 0, fontSize: '10px', color: '#92400E', fontWeight: 600 }}>
            <span style={{ fontWeight: 800 }}>Session de mai presque complète</span> — avant le 30 avril
          </p>
        </div>
      </div>
    </div>
  )
}
