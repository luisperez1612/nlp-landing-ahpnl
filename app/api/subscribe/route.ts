import { NextRequest, NextResponse } from 'next/server'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const N8N_WEBHOOK = 'https://n8nproduction.sistemashpnl.com/webhook/nlp-registro'

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

    const res = await fetch(N8N_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
      }),
    })

    if (!res.ok) {
      console.error('[subscribe] n8n webhook error:', res.status, await res.text())
      return NextResponse.json(
        { error: 'Failed to process registration. Please try again.' },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[subscribe] Error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 },
    )
  }
}
