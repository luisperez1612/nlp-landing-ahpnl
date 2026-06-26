'use client'

import { useState } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function RegistrationForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName]   = useState('')
  const [email, setEmail]         = useState('')
  const [status, setStatus]       = useState<FormState>('idle')
  const [errorMsg, setErrorMsg]   = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email }),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please check your connection and try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="py-8 text-center space-y-3">
        <div className="text-4xl">✅</div>
        <p className="text-xl font-semibold text-gray-800">
          Check your inbox, {firstName}!
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Your free workbook has been sent to <strong>{email}</strong>.
          <br />
          If you don&apos;t see it, please check your spam folder.
        </p>
      </div>
    )
  }

  const inputClass =
    'w-full border border-gray-300 px-4 py-3 text-gray-700 text-sm focus:outline-none focus:border-[#2563EB] transition-colors placeholder:text-gray-400'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <input
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        disabled={status === 'loading'}
        className={inputClass}
      />
      <input
        type="text"
        placeholder="Last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
        disabled={status === 'loading'}
        className={inputClass}
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={status === 'loading'}
        className={inputClass}
      />

      {status === 'error' && (
        <p className="text-red-500 text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="border border-[#2563EB] text-[#2563EB] px-8 py-3 text-sm tracking-wide hover:bg-[#2563EB] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending…' : 'Get your FREE resource'}
      </button>
    </form>
  )
}
