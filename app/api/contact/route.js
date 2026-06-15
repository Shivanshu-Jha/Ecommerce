import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, message } = body || {}

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^\S+@\S+\.\S+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // For now, just log the message. Integrate an email service here if desired.
    console.log('Contact submission:', { name, email, message })

    return NextResponse.json({ ok: true, message: 'Message received' })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
