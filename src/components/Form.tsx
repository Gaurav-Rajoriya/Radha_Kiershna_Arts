import { FormEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { site } from '../config/site'
import { artworks } from '../data/artworks'

const types: Record<string, string[]> = {
  contact: ['General question', 'Visiting / exhibition', 'Other studio inquiry'],
  enquiry: ['Collector acquisition enquiry', 'Artwork availability & pricing', 'Shipping & insurance'],
  commission: ['Custom Radha-Krishna canvas', 'Devotional Durga / Kali relief', 'Temple altar installation'],
}

export default function Form({ kind }: { kind: 'contact' | 'enquiry' | 'commission' }) {
  const [sp] = useSearchParams()
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')
  const [errs, setErrs] = useState<Record<string, string>>({})
  const [errMsg, setErrMsg] = useState('')

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const v = Object.fromEntries(new FormData(form).entries()) as Record<string, string>

    const er: Record<string, string> = {}
    if (!v.name?.trim()) er.name = 'Please enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email || '')) er.email = 'Please enter a valid email address.'
    if (!v.message?.trim()) er.message = 'Please share your message or commission requirements.'
    setErrs(er)

    if (Object.keys(er).length > 0 || v._honey) return

    setState('sending')
    setErrMsg('')

    try {
      const formEmail = import.meta.env.VITE_FORM_EMAIL?.trim()
      if (!formEmail) throw new Error('Form recipient email is not configured.')

      const r = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(formEmail)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: v.name,
          email: v.email,
          country: v.country,
          type: v.type,
          artwork: v.artwork,
          message: v.message,
          _subject: `${site.name}: ${v.type || kind}`,
          _template: 'table',
          _captcha: 'false',
          _replyto: v.email,
        }),
      })

      const j = await r.json().catch(() => ({}))
      console.log('FormSubmit response:', r.status, j)

      if (r.ok && (j.success === true || j.success === 'true')) {
        setState('ok')
        setErrMsg('')
        form.reset()
        setErrs({})
      } else {
        setErrMsg(j.message || `HTTP ${r.status}: delivery failed`)
        setState('err')
      }
    } catch (error) {
      console.error('Form submission failed:', error)
      setErrMsg(error instanceof Error ? error.message : 'Network error')
      setState('err')
    }
  }

  if (state === 'ok') {
    return (
      <div className="notice good" role="status">
        <strong>Thank you!</strong> Your message has been directly sent to the artist. We will respond within 24 hours.
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="form" aria-busy={state === 'sending'}>
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <label>
        Full name
        <input name="name" placeholder="Your Name" required />
        {errs.name && <em>{errs.name}</em>}
      </label>
      <label>
        Email address
        <input name="email" type="email" placeholder="you@example.com" required />
        {errs.email && <em>{errs.email}</em>}
      </label>
      <label>
        City / Country
        <input name="country" placeholder="e.g. Mumbai, India or London, UK" />
      </label>
      <label>
        Inquiry category
        <select name="type">
          {types[kind].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label>
        Specific artwork (if applicable)
        <select name="artwork" defaultValue={sp.get('artwork') || ''}>
          <option value="">None selected / General inquiry</option>
          {artworks.map((a) => (
            <option key={a.id} value={a.title}>
              {a.title}
            </option>
          ))}
        </select>
      </label>
      <label>
        Your message / dimensions / questions
        <textarea
          name="message"
          rows={5}
          placeholder="Please tell us about your requirements or questions..."
          required
        />
        {errs.message && <em>{errs.message}</em>}
      </label>
      {state === 'err' && (
        <div className="notice bad" role="alert">
          We could not deliver your message right now. Please email directly at <strong>{site.email}</strong>.
          {errMsg && <small style={{ display: 'block', marginTop: 6, opacity: 0.8 }}>Debug: {errMsg}</small>}
        </div>
      )}
      <button className="btn btn-primary" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending Message…' : 'Send Studio Inquiry'}
      </button>
    </form>
  )
}