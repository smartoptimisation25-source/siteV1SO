import { motion } from 'framer-motion'

const CARDS = [
  {
    id: 'formation',
    label: 'Formation',
    desc: "Montez en compétences sur l'IA générative avec des programmes conçus pour les professionnels ambitieux.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    stat: '24 modules',
  },
  {
    id: 'solution-sur-mesure',
    label: 'Solution sur mesure',
    desc: "Des architectures IA conçues spécifiquement pour vos processus métier, vos données et vos objectifs de croissance.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        <path d="M4.93 4.93a10 10 0 0 0 0 14.14" />
      </svg>
    ),
    stat: 'ROI ×3.4',
  },
  {
    id: 'educ-ia',
    label: 'Educ IA',
    desc: "Sensibilisez vos équipes aux enjeux de l'intelligence artificielle avec des formats pédagogiques engageants.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    stat: '98% satisfaction',
  },
]

export default function Sections() {
  return (
    <section aria-label="Nos expertises" style={{
      background: '#F9F8FF',
      padding: '100px 48px',
    }}>
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          style={{
            backgroundImage: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}
        >
          Nos expertises
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          style={{
            color: '#0F0C1E',
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
            letterSpacing: '-0.02em',
          }}
        >
          Tout ce dont vous avez besoin
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.14 }}
          style={{
            color: '#374151',
            fontSize: '16px',
            marginTop: '12px',
          }}
        >
          Un écosystème complet pour maîtriser l&apos;IA à chaque étape.
        </motion.p>
      </div>

      {/* Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        maxWidth: '1000px',
        margin: '0 auto',
      }}>
        {CARDS.map((card, i) => (
          <SectionCard key={card.id} card={card} index={i} />
        ))}
      </div>
    </section>
  )
}

function SectionCard({ card, index }) {
  return (
    <motion.div
      id={card.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      style={{
        background: '#ffffff',
        border: '1px solid rgba(59,79,216,0.08)',
        borderRadius: '24px',
        padding: '32px',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(59,79,216,0.06)',
      }}
    >
      {/* Top gradient line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #3B4FD8, #9B30E8)',
      }} />

      {/* Icon */}
      <div style={{
        width: '52px', height: '52px', borderRadius: '14px',
        background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '20px',
        boxShadow: '0 4px 16px rgba(155,48,232,0.25)',
      }}>
        {card.icon}
      </div>

      {/* Label */}
      <h3 style={{
        color: '#0F0C1E',
        fontWeight: 700,
        fontSize: '18px',
        marginBottom: '10px',
        letterSpacing: '-0.01em',
      }}>
        {card.label}
      </h3>

      {/* Desc */}
      <p style={{
        color: '#374151',
        fontSize: '14px',
        lineHeight: '1.7',
        marginBottom: '24px',
      }}>
        {card.desc}
      </p>

      {/* Stat badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        padding: '6px 14px',
        borderRadius: '999px',
        background: 'rgba(59,79,216,0.07)',
        border: '1px solid rgba(59,79,216,0.15)',
      }}>
        <span style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #3B4FD8, #9B30E8)',
        }} />
        <span style={{ color: '#3B4FD8', fontSize: '12px', fontWeight: 600 }}>
          {card.stat}
        </span>
      </div>
    </motion.div>
  )
}
