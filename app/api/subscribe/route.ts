import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function saveToGoogleSheets(data: {
  firstName: string
  lastName: string
  email: string
}) {
  const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL
  if (!sheetUrl) return

  try {
    await fetch(sheetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        date: new Date().toLocaleString('es-US', { timeZone: 'America/New_York' }),
      }),
    })
  } catch (err) {
    console.error('[sheets] Failed to save:', err)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email } = body as {
      firstName?: string
      lastName?: string
      email?: string
    }

    if (!firstName?.trim() || !lastName?.trim() || !email?.trim()) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    // Save to Google Sheets (runs in background, doesn't block response)
    saveToGoogleSheets({ firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim() })

    if (!process.env.RESEND_API_KEY) {
      console.warn('[subscribe] RESEND_API_KEY not set – skipping email send.')
      return NextResponse.json({ success: true })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
      'https://your-domain.vercel.app'

    const pdfUrl = `${siteUrl}/NLP_For_Success_FabianTejada_NLPMetafest2026.pdf`
    const fromEmail = process.env.FROM_EMAIL || 'Fabian Tejada <onboarding@resend.dev>'
    const notifyEmail = process.env.NOTIFY_EMAIL

    // Send workbook email to the subscriber
    await resend.emails.send({
      from: fromEmail,
      to: email.trim(),
      subject: 'Your Free Workbook: Reprogramming the Subconscious Mind',
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f5f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:4px;overflow:hidden;max-width:600px;">

        <!-- Header -->
        <tr>
          <td style="background:#1a2744;padding:30px 40px;text-align:center;">
            <p style="margin:0;color:#D4AF37;font-size:13px;letter-spacing:3px;text-transform:uppercase;">AHPNL</p>
            <p style="margin:6px 0 0;color:#ffffff;font-size:11px;letter-spacing:2px;">NLP &amp; Principios Para Tu Éxito</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 40px 30px;">
            <h1 style="margin:0 0 16px;color:#E8602C;font-size:26px;font-weight:bold;">
              Hi ${firstName},
            </h1>
            <p style="margin:0 0 16px;color:#333;font-size:15px;line-height:1.7;">
              Thank you for signing up! Your free workbook is ready to download.
            </p>
            <p style="margin:0 0 24px;color:#555;font-size:14px;line-height:1.7;">
              <strong>Reprogramming the Subconscious Mind for Automatic Success</strong><br>
              This hands-on workbook walks you through the exact NLP process to interrupt
              automatic patterns keeping you stuck — and install new ones aligned with the
              results you actually want.
            </p>

            <!-- CTA Button -->
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="background:#E8602C;border-radius:3px;">
                  <a href="${pdfUrl}"
                     target="_blank"
                     style="display:inline-block;padding:14px 32px;color:#ffffff;text-decoration:none;font-size:15px;font-weight:bold;letter-spacing:0.5px;">
                    Download Your Free Workbook →
                  </a>
                </td>
              </tr>
            </table>

            <p style="margin:28px 0 0;color:#888;font-size:12px;">
              If the button above doesn't work, copy and paste this link into your browser:<br>
              <a href="${pdfUrl}" style="color:#E8602C;">${pdfUrl}</a>
            </p>
          </td>
        </tr>

        <!-- Signature -->
        <tr>
          <td style="padding:0 40px 40px;">
            <hr style="border:none;border-top:1px solid #eee;margin:0 0 24px;">
            <p style="margin:0;color:#555;font-size:14px;line-height:1.7;">
              With gratitude,<br>
              <strong style="color:#333;">Fabian Tejada</strong><br>
              <span style="color:#888;font-size:13px;">AHPNL – NLP &amp; Principios Para Tu Éxito</span>
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#1e1e1e;padding:20px 40px;text-align:center;">
            <p style="margin:0;color:#666;font-size:11px;">
              © ${new Date().getFullYear()} Fabian Tejada – AHPNL. All rights reserved.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
    })

    // Notify yourself of new sign-ups
    if (notifyEmail) {
      await resend.emails.send({
        from: fromEmail,
        to: notifyEmail,
        subject: `New sign-up: ${firstName} ${lastName}`,
        html: `<p>New sign-up from your landing page:</p>
               <ul>
                 <li><strong>Name:</strong> ${firstName} ${lastName}</li>
                 <li><strong>Email:</strong> ${email}</li>
               </ul>`,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[subscribe] Error:', error)
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 },
    )
  }
}
