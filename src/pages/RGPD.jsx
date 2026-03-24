export default function RGPD() {
  return (
    <main style={{ background: '#fff', minHeight: 'calc(100vh - 72px)', padding: '64px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'rgba(59,79,216,0.07)', border: '1px solid rgba(59,79,216,0.18)', marginBottom: '20px' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'linear-gradient(135deg,#3B4FD8,#9B30E8)', flexShrink: 0 }} />
            <span style={{ color: '#3B4FD8', fontSize: '13px', fontWeight: 600 }}>Documents légaux</span>
          </div>
          <h1 style={{ color: '#0F0C1E', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Politique RGPD
          </h1>
          <p style={{ color: '#9CA3AF', fontSize: '14px' }}>Règlement Général sur la Protection des Données — Dernière mise à jour : mars 2025</p>
        </div>

        {/* Bandeau intro */}
        <div style={{ background: 'linear-gradient(135deg, rgba(59,79,216,0.06), rgba(155,48,232,0.06))', border: '1px solid rgba(59,79,216,0.15)', borderRadius: '16px', padding: '20px 24px', marginBottom: '40px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div>
            <p style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '15px', margin: '0 0 6px' }}>Engagement de Smart Optimisation</p>
            <p style={{ color: '#6B7280', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
              Smart Optimisation s'engage à respecter pleinement le Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679), en vigueur depuis le 25 mai 2018. La protection de vos données personnelles est au cœur de nos valeurs.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

          <Section title="1. Qu'est-ce que le RGPD ?">
            <p>Le RGPD (Règlement Général sur la Protection des Données) est un règlement européen qui encadre le traitement des données personnelles dans l'Union Européenne. Il renforce les droits des personnes et responsabilise les organismes qui traitent des données.</p>
            <p>Il s'applique à toute organisation, qu'elle soit publique ou privée, dès lors qu'elle traite des données personnelles de résidents européens.</p>
          </Section>

          <Section title="2. Données personnelles concernées">
            <p>Une donnée personnelle est toute information permettant d'identifier directement ou indirectement une personne physique. Dans le cadre de nos activités, nous pouvons traiter :</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
              {[
                { cat: 'Identité', ex: 'Nom, prénom', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
                { cat: 'Coordonnées', ex: 'Adresse e-mail, numéro de téléphone', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
                { cat: 'Données professionnelles', ex: 'Nom de l\'entreprise, secteur d\'activité, poste occupé', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> },
                { cat: 'Données de connexion', ex: 'Adresse IP, données de navigation, cookies', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
                { cat: 'Données de formation', ex: 'Résultats, évaluations, certificats obtenus', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg> },
              ].map(item => (
                <div key={item.cat} style={{ display: 'flex', gap: '14px', padding: '10px 14px', background: '#F9F8FF', borderRadius: '10px', border: '1px solid rgba(59,79,216,0.07)', alignItems: 'center' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '8px', background: 'rgba(59,79,216,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
                  <span style={{ fontWeight: 600, color: '#374151', fontSize: '13px', minWidth: '100px' }}>{item.cat}</span>
                  <span style={{ color: '#6B7280', fontSize: '13px' }}>{item.ex}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title="3. Bases légales de traitement">
            <p>Conformément au RGPD, tout traitement de données doit reposer sur une base légale. Smart Optimisation fonde ses traitements sur :</p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Le consentement</strong> : pour l'envoi de communications marketing et l'utilisation de cookies non essentiels.</li>
              <li><strong>L'exécution d'un contrat</strong> : pour la gestion de vos formations et prestations.</li>
              <li><strong>L'intérêt légitime</strong> : pour le traitement de vos demandes de contact et l'amélioration de nos services.</li>
              <li><strong>L'obligation légale</strong> : pour respecter nos obligations comptables et fiscales.</li>
            </ul>
          </Section>

          <Section title="4. Durées de conservation">
            <p>Les données personnelles ne sont conservées que le temps nécessaire à la finalité pour laquelle elles ont été collectées :</p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><strong>Données clients actifs :</strong> durée de la relation commerciale + 3 ans</li>
              <li><strong>Données prospects :</strong> 3 ans à compter du dernier contact</li>
              <li><strong>Données de facturation :</strong> 10 ans (obligation légale)</li>
              <li><strong>Données de navigation (cookies) :</strong> 13 mois maximum</li>
              <li><strong>Données de formation :</strong> durée légale de conservation des attestations</li>
            </ul>
          </Section>

          <Section title="5. Mesures de sécurité">
            <p>Smart Optimisation met en place les mesures suivantes pour protéger vos données :</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '8px' }}>
              {[
                { titre: 'Chiffrement SSL/TLS', desc: 'Toutes les communications sont chiffrées', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> },
                { titre: 'Contrôle d\'accès', desc: 'Accès limité aux personnes autorisées', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg> },
                { titre: 'Sauvegardes régulières', desc: 'Backup sécurisé des données', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> },
                { titre: 'Surveillance', desc: 'Monitoring des accès et activités suspectes', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B4FD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> },
              ].map(m => (
                <div key={m.titre} style={{ padding: '14px', background: '#F9F8FF', borderRadius: '12px', border: '1px solid rgba(59,79,216,0.08)', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '8px', background: 'rgba(59,79,216,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{m.icon}</div>
                  <div>
                    <p style={{ color: '#0F0C1E', fontWeight: 700, fontSize: '13px', margin: '0 0 2px' }}>{m.titre}</p>
                    <p style={{ color: '#6B7280', fontSize: '12px', margin: 0 }}>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="6. Vos droits RGPD">
            <p>Vous pouvez exercer vos droits à tout moment en nous contactant à <strong>contact@smartoptimisation.fr</strong> avec une copie de votre pièce d'identité. Nous nous engageons à répondre dans un délai d'<strong>un mois</strong>.</p>
            <p>En cas de réponse insatisfaisante, vous pouvez saisir la <strong>CNIL</strong> :</p>
            <div style={{ padding: '14px 18px', background: '#F9F8FF', borderRadius: '12px', border: '1px solid rgba(59,79,216,0.08)' }}>
              <p style={{ margin: 0, color: '#374151', fontSize: '13px' }}>Commission Nationale de l'Informatique et des Libertés (CNIL)<br />3 Place de Fontenoy — TSA 80715 — 75334 PARIS CEDEX 07<br />Tél : 01 53 73 22 22 — <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: '#3B4FD8' }}>www.cnil.fr</a></p>
            </div>
          </Section>

          <Section title="7. Délégué à la Protection des Données (DPO)">
            <p>Pour toute question relative à la protection de vos données personnelles, vous pouvez contacter notre responsable de la protection des données :</p>
            <div style={{ padding: '14px 18px', background: 'linear-gradient(135deg, rgba(59,79,216,0.05), rgba(155,48,232,0.05))', borderRadius: '12px', border: '1px solid rgba(59,79,216,0.10)' }}>
              <p style={{ margin: 0, color: '#0F0C1E', fontWeight: 600, fontSize: '14px' }}>Smart Optimisation — Responsable RGPD</p>
              <p style={{ margin: '4px 0 0', color: '#6B7280', fontSize: '13px' }}>contact@smartoptimisation.fr</p>
            </div>
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
