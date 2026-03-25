export default function CGV() {
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
            Conditions Générales de Vente
          </h1>
          <p style={{ color: '#9CA3AF', fontSize: '14px' }}>Dernière mise à jour : mars 2026</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

          <Section title="1. Objet">
            <p>Les présentes Conditions Générales de Vente (ci-après « CGV ») régissent l'ensemble des prestations de formation professionnelle et de conseil en intelligence artificielle proposées par <strong>Smart Optimisation</strong> (ci-après « le Prestataire ») à ses clients professionnels (ci-après « le Client »).</p>
            <p>Toute commande ou demande de devis implique l'acceptation sans réserve des présentes CGV.</p>
          </Section>

          <Section title="2. Identification du prestataire">
            <InfoGrid items={[
              { label: 'Raison sociale', value: 'Smart Optimisation' },
              { label: 'Forme juridique', value: 'SAS (Société par Actions Simplifiée)' },
              { label: 'Siège social', value: 'Alsace, France' },
              { label: 'Activité', value: 'Organisme de formation professionnelle certifié Qualiopi' },
              { label: 'Email', value: 'contact@smartoptimisation.fr' },
            ]} />
          </Section>

          <Section title="3. Prestations proposées">
            <p>Smart Optimisation propose les prestations suivantes :</p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Formations professionnelles en intelligence artificielle (inter et intra-entreprises)</li>
              <li>Formations sur mesure adaptées aux besoins métier du Client</li>
              <li>Accompagnement et conseil en transformation numérique par l'IA</li>
              <li>Ateliers pratiques sur les outils IA (Claude, ChatGPT, Gemini, etc.)</li>
            </ul>
            <p>Le détail de chaque prestation est précisé dans la convention de formation ou le devis signé entre les parties.</p>
          </Section>

          <Section title="4. Modalités de commande">
            <p>Toute commande fait l'objet d'un devis ou d'une convention de formation transmis au Client par voie électronique. La commande est réputée ferme et définitive dès réception :</p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Du devis signé et retourné par le Client, ou</li>
              <li>De la convention de formation signée par les deux parties, ou</li>
              <li>Du bon de commande émis par le Client.</li>
            </ul>
          </Section>

          <Section title="5. Tarifs et conditions financières">
            <p>Les tarifs des formations et prestations sont ceux figurant sur le devis ou la convention de formation acceptés par le Client. Ils sont exprimés en euros hors taxes (HT). La TVA applicable est ajoutée au montant HT selon le taux en vigueur.</p>
            <p>Smart Optimisation se réserve le droit de modifier ses tarifs à tout moment. Les prestations sont facturées sur la base des tarifs en vigueur au moment de la validation de la commande.</p>
          </Section>

          <Section title="6. Financement et prise en charge OPCO">
            <p>Les formations proposées par Smart Optimisation sont éligibles à une prise en charge par les Opérateurs de Compétences (OPCO) dans le cadre de la formation professionnelle continue.</p>
            <p>Le Client est responsable de ses démarches de demande de financement auprès de son OPCO. Smart Optimisation peut accompagner le Client dans la constitution du dossier de financement mais ne garantit pas l'obtention de la prise en charge.</p>
            <p>En cas de financement partiel ou de refus de l'OPCO, le solde restant dû sera facturé au Client.</p>
          </Section>

          <Section title="7. Modalités de paiement">
            <p>Sauf dispositions contraires précisées sur le devis, les modalités de paiement sont les suivantes :</p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>30 % d'acompte à la signature de la convention ou du devis</li>
              <li>Solde à réception de la facture, dans un délai de 30 jours</li>
            </ul>
            <p>En cas de financement OPCO, la facturation est adressée directement à l'OPCO pour la part prise en charge, et au Client pour le reliquat éventuel.</p>
            <p>Tout retard de paiement entraînera l'application de pénalités de retard au taux légal en vigueur, ainsi qu'une indemnité forfaitaire de recouvrement de 40 euros conformément à l'article L.441-10 du Code de commerce.</p>
          </Section>

          <Section title="8. Annulation et report">
            <p><strong>Annulation par le Client :</strong></p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Annulation plus de 14 jours avant le début de la formation : aucune facturation</li>
              <li>Annulation entre 7 et 14 jours avant le début : 50 % du montant HT sera facturé</li>
              <li>Annulation moins de 7 jours avant le début : 100 % du montant HT sera facturé</li>
            </ul>
            <p><strong>Report par le Client :</strong> Un report de date est possible sans frais si la demande est formulée au moins 7 jours avant le début de la formation, sous réserve de disponibilité du Prestataire.</p>
            <p><strong>Annulation par le Prestataire :</strong> Smart Optimisation se réserve le droit d'annuler ou de reporter une formation en cas de force majeure, d'insuffisance du nombre de participants (pour les sessions inter-entreprises) ou de maladie du formateur. Dans ce cas, aucune pénalité ne sera appliquée et le Client sera informé dans les meilleurs délais.</p>
          </Section>

          <Section title="9. Obligations du prestataire">
            <p>Smart Optimisation s'engage à :</p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Réaliser les prestations avec soin et professionnalisme</li>
              <li>Mettre à disposition des formateurs qualifiés et expérimentés</li>
              <li>Fournir les supports pédagogiques nécessaires à la formation</li>
              <li>Délivrer les attestations et documents de fin de formation requis</li>
              <li>Respecter la confidentialité des informations communiquées par le Client</li>
            </ul>
          </Section>

          <Section title="10. Obligations du client">
            <p>Le Client s'engage à :</p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Fournir les informations nécessaires à la bonne réalisation de la prestation</li>
              <li>S'assurer de la présence et de la disponibilité des participants aux dates convenues</li>
              <li>Régler les factures dans les délais impartis</li>
              <li>Ne pas reproduire ou diffuser les supports pédagogiques sans autorisation</li>
            </ul>
          </Section>

          <Section title="11. Propriété intellectuelle">
            <p>L'ensemble des supports pédagogiques, méthodes, outils et contenus remis dans le cadre des formations restent la propriété exclusive de Smart Optimisation. Ils sont destinés à un usage exclusivement interne au Client et ne peuvent être reproduits, diffusés ou commercialisés sans accord écrit préalable du Prestataire.</p>
          </Section>

          <Section title="12. Confidentialité">
            <p>Les parties s'engagent à maintenir confidentielles toutes les informations échangées dans le cadre de leurs relations commerciales. Cette obligation de confidentialité est valable pendant toute la durée de la relation contractuelle et pendant une durée de 3 ans après son terme.</p>
          </Section>

          <Section title="13. Responsabilité">
            <p>La responsabilité de Smart Optimisation est limitée aux dommages directs et prévisibles résultant d'une faute prouvée dans l'exécution de ses obligations. Smart Optimisation ne saurait être tenu responsable des dommages indirects, perte de chiffre d'affaires ou préjudice commercial.</p>
            <p>En tout état de cause, la responsabilité de Smart Optimisation est plafonnée au montant des sommes effectivement perçues au titre de la prestation en cause.</p>
          </Section>

          <Section title="14. Données personnelles">
            <p>Les données personnelles collectées dans le cadre des prestations sont traitées conformément à notre <strong>Politique de Confidentialité</strong> et au règlement RGPD. Elles sont utilisées uniquement pour la gestion administrative et pédagogique des formations.</p>
          </Section>

          <Section title="15. Règlement des litiges">
            <p>En cas de litige, les parties s'engagent à rechercher une solution amiable avant tout recours judiciaire. À défaut d'accord amiable dans un délai de 30 jours, le litige sera soumis aux tribunaux compétents du ressort du siège social de Smart Optimisation, nonobstant pluralité de défendeurs ou appel en garantie.</p>
          </Section>

          <Section title="16. Droit applicable">
            <p>Les présentes CGV sont soumises au droit français. Toute modification des présentes CGV sera portée à la connaissance du Client par tout moyen. Les CGV applicables sont celles en vigueur à la date de la commande.</p>
          </Section>

          <Section title="17. Contact">
            <p>Pour toute question relative aux présentes CGV, vous pouvez nous contacter à l'adresse suivante : <strong>contact@smartoptimisation.fr</strong></p>
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
      <div style={{ color: '#4B5563', fontSize: '15px', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
          <span style={{ color: '#9CA3AF', fontSize: '13px', minWidth: '120px', fontWeight: 500 }}>{item.label}</span>
          <span style={{ color: '#0F0C1E', fontSize: '13px', fontWeight: 600 }}>{item.value}</span>
        </div>
      ))}
    </div>
  )
}
