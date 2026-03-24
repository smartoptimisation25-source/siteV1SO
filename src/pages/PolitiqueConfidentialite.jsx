export default function PolitiqueConfidentialite() {
  return (
    <main style={{ background: '#fff', minHeight: 'calc(100vh - 72px)', padding: '64px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'rgba(59,79,216,0.07)', border: '1px solid rgba(59,79,216,0.18)', marginBottom: '20px' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg,#3B4FD8,#9B30E8)', flexShrink: 0 }} />
            <span style={{ color: '#3B4FD8', fontSize: '13px', fontWeight: 600 }}>Documents légaux</span>
          </div>
          <h1 style={{ color: '#0F0C1E', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Politique de confidentialité
          </h1>
          <p style={{ color: '#9CA3AF', fontSize: '14px' }}>Dernière mise à jour : mars 2025</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

          <Section title="1. Responsable du traitement">
            <p>Le responsable du traitement des données personnelles collectées via le site <strong>smartoptimisation.fr</strong> est la société <strong>Smart Optimisation</strong>, dont le siège social est situé en Alsace, France.</p>
            <p>Contact DPO : <strong>contact@smartoptimisation.fr</strong></p>
          </Section>

          <Section title="2. Données collectées">
            <p>Dans le cadre de notre activité, nous collectons les données suivantes :</p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><strong>Via le formulaire de contact :</strong> nom, adresse e-mail, numéro de téléphone, type de demande, message libre.</li>
              <li><strong>Via la navigation :</strong> données de connexion (adresse IP, type de navigateur, pages visitées, durée de visite) via des cookies techniques.</li>
            </ul>
          </Section>

          <Section title="3. Finalités du traitement">
            <DataTable rows={[
              { finalite: 'Répondre à vos demandes de contact', base: 'Intérêt légitime', duree: '3 ans' },
              { finalite: 'Envoi de communications commerciales', base: 'Consentement', duree: '3 ans' },
              { finalite: 'Amélioration du site (analytics)', base: 'Consentement', duree: '13 mois' },
              { finalite: 'Obligations légales et comptables', base: 'Obligation légale', duree: '10 ans' },
            ]} />
          </Section>

          <Section title="4. Vos droits">
            <p>Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez des droits suivants :</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', marginTop: '8px' }}>
              {[
                { droit: 'Droit d\'accès', desc: 'Consulter vos données personnelles', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> },
                { droit: 'Droit de rectification', desc: 'Corriger vos données inexactes', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> },
                { droit: 'Droit à l\'effacement', desc: 'Supprimer vos données', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg> },
                { droit: 'Droit à la limitation', desc: 'Limiter le traitement de vos données', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg> },
                { droit: 'Droit à la portabilité', desc: 'Récupérer vos données dans un format lisible', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> },
                { droit: 'Droit d\'opposition', desc: 'Vous opposer à certains traitements', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg> },
              ].map(d => (
                <div key={d.droit} style={{ padding: '12px', background: '#F9F8FF', borderRadius: '10px', border: '1px solid rgba(59,79,216,0.07)', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '7px', background: 'rgba(59,79,216,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>{d.icon}</div>
                  <div>
                    <p style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '13px', margin: '0 0 2px' }}>{d.droit}</p>
                    <p style={{ color: '#6B7280', fontSize: '12px', margin: 0 }}>{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p>Pour exercer vos droits, contactez-nous à : <strong>contact@smartoptimisation.fr</strong></p>
            <p>En cas de réponse insatisfaisante, vous pouvez introduire une réclamation auprès de la <strong>CNIL</strong> (www.cnil.fr).</p>
          </Section>

          <Section title="5. Destinataires des données">
            <p>Vos données sont destinées exclusivement aux équipes de Smart Optimisation. Elles ne sont jamais vendues à des tiers. Elles peuvent être transmises à des prestataires techniques (hébergeur, outils d'emailing) dans le cadre strict de nos activités, sous contrat de traitement.</p>
          </Section>

          <Section title="6. Transfert hors UE">
            <p>Smart Optimisation s'assure que tout transfert de données hors de l'Union Européenne est encadré par des garanties appropriées (clauses contractuelles types de la Commission Européenne, Privacy Shield ou équivalent).</p>
          </Section>

          <Section title="7. Sécurité">
            <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre toute destruction, perte, altération ou divulgation non autorisée.</p>
          </Section>

          <Section title="8. Modifications">
            <p>Smart Optimisation se réserve le droit de modifier la présente politique de confidentialité à tout moment. La version en vigueur est celle publiée sur le site à la date de votre consultation.</p>
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

function DataTable({ rows }) {
  return (
    <div style={{ overflowX: 'auto', marginTop: '10px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr style={{ background: 'linear-gradient(135deg,#3B4FD8,#9B30E8)' }}>
            {['Finalité', 'Base légale', 'Durée de conservation'].map(h => (
              <th key={h} style={{ color: '#fff', padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#F9F8FF' : '#fff', borderBottom: '1px solid rgba(59,79,216,0.07)' }}>
              <td style={{ padding: '10px 14px', color: '#0F0C1E', fontWeight: 500 }}>{row.finalite}</td>
              <td style={{ padding: '10px 14px', color: '#6B7280' }}>{row.base}</td>
              <td style={{ padding: '10px 14px', color: '#6B7280' }}>{row.duree}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
