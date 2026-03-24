import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' })
  }

  const { nom, email, telephone, service, message } = req.body

  if (!email || !service) {
    return res.status(400).json({ error: 'Email et service requis' })
  }

  try {
    await resend.emails.send({
      from: 'Formulaire Contact <contact@smartoptimisation.fr>',
      to: ['contact@smartoptimisation.fr'],
      replyTo: email,
      subject: `[Smart Optimisation] Demande de ${nom} — ${service}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #3B4FD8, #9B30E8); border-radius: 16px 16px 0 0; padding: 28px 32px;">
            <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 700;">Nouvelle demande de contact</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">Via le formulaire Smart Optimisation</p>
          </div>
          <div style="background: white; border-radius: 0 0 16px 16px; padding: 32px; border: 1px solid #e5e7eb; border-top: none;">

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6B7280; font-size: 13px; font-weight: 600; width: 130px;">Nom</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #0F0C1E; font-size: 14px;">${nom || 'Non renseigné'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6B7280; font-size: 13px; font-weight: 600;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
                  <a href="mailto:${email}" style="color: #3B4FD8; font-size: 14px;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6B7280; font-size: 13px; font-weight: 600;">Téléphone</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #0F0C1E; font-size: 14px;">${telephone || 'Non renseigné'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6B7280; font-size: 13px; font-weight: 600;">Service</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
                  <span style="background: rgba(59,79,216,0.08); color: #3B4FD8; padding: 3px 12px; border-radius: 999px; font-size: 13px; font-weight: 600;">${service}</span>
                </td>
              </tr>
            </table>

            ${message ? `
            <div style="margin-top: 24px;">
              <p style="color: #6B7280; font-size: 13px; font-weight: 600; margin: 0 0 10px;">Message</p>
              <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; color: #0F0C1E; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${message}</div>
            </div>
            ` : ''}

            <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #f3f4f6; text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #3B4FD8, #9B30E8); color: white; padding: 12px 28px; border-radius: 999px; text-decoration: none; font-size: 14px; font-weight: 700;">
                Répondre à ${nom || email} →
              </a>
            </div>
          </div>
          <p style="text-align: center; color: #9CA3AF; font-size: 11px; margin-top: 16px;">Smart Optimisation · Alsace, France</p>
        </div>
      `,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Erreur envoi email:', error)
    return res.status(500).json({ error: 'Erreur lors de l\'envoi. Réessayez.' })
  }
}
