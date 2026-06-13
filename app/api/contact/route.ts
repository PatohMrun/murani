import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const MAX = { name: 120, email: 200, subject: 200, message: 5000 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const fromName = String(body.from_name ?? '').trim()
  const replyTo = String(body.reply_to ?? '').trim()
  const subject = String(body.subject ?? '').trim()
  const message = String(body.message ?? '').trim()
  // honeypot: a hidden field humans never see; bots tend to fill it.
  // Pretend success so the bot doesn't retry.
  const honeypot = String(body.company ?? '').trim()
  if (honeypot) return NextResponse.json({ ok: true })

  if (!fromName || !replyTo || !subject || !message) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
  }
  if (!EMAIL_RE.test(replyTo)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }
  if (
    fromName.length > MAX.name ||
    replyTo.length > MAX.email ||
    subject.length > MAX.subject ||
    message.length > MAX.message
  ) {
    return NextResponse.json({ error: 'One or more fields are too long.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('Contact form: RESEND_API_KEY is not set')
    return NextResponse.json(
      { error: 'The contact form is not configured yet. Please email me directly.' },
      { status: 503 }
    )
  }

  const to = process.env.CONTACT_TO_EMAIL || 'patrickmurani@gmail.com'
  // Use a verified domain sender once murani.signiqe.com is verified in Resend;
  // onboarding@resend.dev works out of the box but only delivers to the
  // Resend account owner's email.
  const from = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>'

  const safe = {
    name: escapeHtml(fromName),
    email: escapeHtml(replyTo),
    subject: escapeHtml(subject),
    message: escapeHtml(message).replace(/\n/g, '<br>'),
  }

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo,
      subject: `[Portfolio] ${subject}`,
      html: `<div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.6;color:#111">
        <h2 style="margin:0 0 16px">New message from your portfolio</h2>
        <p style="margin:4px 0"><strong>Name:</strong> ${safe.name}</p>
        <p style="margin:4px 0"><strong>Email:</strong> ${safe.email}</p>
        <p style="margin:4px 0"><strong>Subject:</strong> ${safe.subject}</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0" />
        <p style="margin:0;white-space:pre-wrap">${safe.message}</p>
      </div>`,
      text: `New message from your portfolio\n\nName: ${fromName}\nEmail: ${replyTo}\nSubject: ${subject}\n\n${message}`,
    })

    if (error) {
      console.error('Resend send error:', error)
      return NextResponse.json(
        { error: 'Could not send your message right now. Please try again later.' },
        { status: 502 }
      )
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Contact send failed:', e)
    return NextResponse.json(
      { error: 'Could not send your message right now. Please try again later.' },
      { status: 502 }
    )
  }
}
