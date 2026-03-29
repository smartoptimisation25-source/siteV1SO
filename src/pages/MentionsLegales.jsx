import { useSEO } from '../hooks/useSEO'

export default function MentionsLegales() {
  useSEO({
    title: 'Mentions légales',
    description: 'Mentions légales du site smartoptimisation.fr — Smart Optimisation, organisme de formation IA certifié Qualiopi en Alsace.',
    path: '/mentions-legales',
    robots: 'noindex, follow',
  })

  return (
    <main style={{ background: '#fff', minHeight: 'calc(100vh - 72px)', padding: '64px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'rgba(59,79,216,0.07)', border: '1px solid rgba(59,79,216,0.18)', marginBottom: '20px' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg,#3B4FD8,#9B30E8)', flexShrink: 0 }} />
            <span style={{ color: '#3B4FD8', fontSize: '13px', fontWeight: 600 }}>Documents légaux</span>
          </div>
          <h1 style={{ color: '#0F0C1E', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Mentions légales
          </h1>
          <p style={{ color: '#6B7280', fontSize: '14px' }}>Dernière mise à jour : mars 2026</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

          <Section title="1. Éditeur du site">
            <p>Le site <strong>smartoptimisation.fr</strong> est édité par :</p>
            <InfoGrid items={[
              { label: 'Raison sociale', value: "SMART'OPTIMISATION" },
              { label: 'Forme juridique', value: 'SAS au capital de 500 €' },
              { label: 'SIRET', value: '990 743 346 00019' },
              { label: 'RCS', value: 'Paris 990 743 346' },
              { label: 'TVA intracommunautaire', value: 'FR88990743346' },
              { label: 'Siège social', value: '200 rue de la Croix Nivert, 75015 Paris' },
              { label: 'Email', value: 'contact@smartoptimisation.fr' },
              { label: 'Téléphone', value: '06 88 67 39 61' },
              { label: 'Directeur de la publication', value: 'Jounayd OUADAH LOUBARDI, Président' },
              { label: 'NDA formation', value: '11757342375' },
              { label: 'Certification Qualiopi', value: 'Certificat n° CERT_S1125_1328, délivré par CEVA Solution' },
            ]} />
          </Section>

          <Section title="2. Hébergement">
            <p>Le site est hébergé par <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133, Walnut, CA 91789, USA.</p>
          </Section>

          <Section title="3. Propriété intellectuelle">
            <p>L'ensemble des contenus présents sur le site (textes, images, graphismes, logos, icônes, sons, logiciels…) sont la propriété exclusive de Smart Optimisation ou de ses partenaires, et sont protégés par les lois françaises et internationales relatives à la propriété intellectuelle.</p>
            <p>Toute reproduction, représentation, modification, publication ou adaptation, totale ou partielle, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation préalable et écrite de Smart Optimisation.</p>
          </Section>

          <Section title="4. Limitation de responsabilité">
            <p>Smart Optimisation s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Cependant, Smart Optimisation ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition. En conséquence, Smart Optimisation décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur ce site.</p>
          </Section>

          <Section title="5. Liens hypertextes">
            <p>Le site peut contenir des liens hypertextes vers d'autres sites. Smart Optimisation n'a pas la possibilité de vérifier le contenu des sites ainsi visités et décline toute responsabilité quant à l'accès, au contenu ou à l'utilisation de ces sites tiers.</p>
          </Section>

          <Section title="6. Droit applicable">
            <p>Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.</p>
          </Section>

          <Section title="7. Contact">
            <p>Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter à l'adresse suivante : <strong>contact@smartoptimisation.fr</strong></p>
          </Section>

        </div>
      </div>
    </main>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ borderLeft: '3px solid', borderImage: 'linear-gradient(180deg,#3B4FD8,#9B30E8) 1', paddingLeft: '24px' }}>
      <h2 style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '18px', marginBottom: '14px' }}>{title}</h2>
      <div style={{ color: '#1F2937', fontSize: '15px', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {children}
      </div>
    </div>
  )
}

function InfoGrid({ items }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
      {items.map(item => (
        <div key={item.label} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', padding: '10px 14px', background: '#F9F8FF', borderRadius: '10px', border: '1px solid rgba(59,79,216,0.07)' }}>
          <span style={{ color: '#6B7280', fontSize: '13px', minWidth: '120px', fontWeight: 500 }}>{item.label}</span>
          <span style={{ color: '#0F0C1E', fontSize: '13px', fontWeight: 600 }}>{item.value}</span>
        </div>
      ))}
    </div>
  )
}
