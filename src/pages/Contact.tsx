import { FormEvent, useState } from 'react'
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2 } from 'lucide-react'
import Reveal from '../components/Reveal'
import { site } from '../config/site'

export default function Contact() {
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [errMsg, setErrMsg] = useState('')

 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  const form = e.currentTarget
  const formData = new FormData(form)
  const values = Object.fromEntries(formData.entries()) as Record<string, string>

  const newErrors: Record<string, string> = {}
  if (!values.name?.trim()) newErrors.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email || '')) newErrors.email = 'Please enter a valid email address.'
  if (!values.phone?.trim()) newErrors.phone = 'Please enter your phone number.'
  if (!values.city?.trim()) newErrors.city = 'Please enter your city.'
  if (!values.message?.trim()) newErrors.message = 'Please enter your message.'

  setErrors(newErrors)
  if (Object.keys(newErrors).length) return

  setState('sending')
  setErrMsg('')
  try {
    const formEmail = (import.meta.env.VITE_FORM_EMAIL || site.email).trim()

    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(formEmail)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        phone: values.phone,
        city: values.city,
        message: values.message,
        _subject: `${site.name}: New Inquiry from ${values.name}`,
        _template: 'table',
        _captcha: 'false',
        _replyto: values.email,
      }),
    })

    const data = await res.json().catch(() => ({}))
    console.log('FormSubmit response:', res.status, data)

    if (res.ok && (data.success === true || data.success === 'true')) {
      setState('ok')
      form.reset()
    } else {
      setErrMsg(data.message || `HTTP ${res.status}: delivery failed`)
      setState('err')
    }
  } catch (error) {
    console.error('Form submission failed:', error)
    setErrMsg(error instanceof Error ? error.message : 'Network error')
    setState('err')
  }
}
  return (
    <main className="page">
      <Reveal>
        <div className="page-header text-center">
          <p className="eyebrow">Direct Studio Connection</p>
          <h1>Contact the Studio & Artist</h1>
          <p className="lead">
            Whether inquiring about an existing painting, commissioning a bespoke Radha Krishna canvas, or planning an altar installation, we welcome your message.
          </p>
        </div>
      </Reveal>

      {/* TWO-COLUMN CONTACT LAYOUT: Left Details, Right Form (Same BG) */}
      <Reveal>
        <div className="contact-two-col-layout">
          {/* LEFT COLUMN: STUDIO DETAILS */}
          <div className="contact-details-box">
            <div className="contact-box-header">
              <h2>Studio Information</h2>
              <p className="contact-box-desc">
                Direct artist studio based in Bengal, creating original sacred devotional art with global insured shipping.
              </p>
            </div>

            <div className="contact-items-list">
              <div className="contact-item-row">
                <div className="contact-icon-circle">
                  <MapPin size={20} className="contact-svg-icon" />
                </div>
                <div>
                  <strong>Studio Location</strong>
                  <p>{site.location}</p>
                  <small>Private studio visits by appointment</small>
                </div>
              </div>

              <div className="contact-item-row">
                <div className="contact-icon-circle">
                  <Mail size={20} className="contact-svg-icon" />
                </div>
                <div>
                  <strong>Email Address</strong>
                  <p>{site.email}</p>
                  <small>Prompt reply within 24 hours</small>
                </div>
              </div>

              <div className="contact-item-row">
                <div className="contact-icon-circle">
                  <Phone size={20} className="contact-svg-icon" />
                </div>
                <div>
                  <strong>Phone / WhatsApp</strong>
                  <p>{site.phone}</p>
                  <small>Available on WhatsApp for instant previews</small>
                </div>
              </div>

              <div className="contact-item-row">
                <div className="contact-icon-circle">
                  <Clock size={20} className="contact-svg-icon" />
                </div>
                <div>
                  <strong>Studio Working Hours</strong>
                  <p>Monday – Saturday: 10:00 AM – 7:00 PM IST</p>
                  <small>Direct communication with the painter</small>
                </div>
              </div>
            </div>

            <div className="contact-pledge-note">
              <strong>Authenticity Pledge</strong>
              <p>Every original painting and relief artwork is hand-signed and delivered with an official Certificate of Authenticity in custom wooden crating.</p>
            </div>
          </div>

          {/* RIGHT COLUMN: CLEAN 5-FIELD FORM (Name, Email, Phone, City, Message, Submit) */}
          <div className="contact-form-box">
            <div className="contact-box-header">
              <h2>Send an Inquiry</h2>
              <p className="contact-box-desc">
                Fill out the form below and the artist will get in touch with you directly.
              </p>
            </div>

            {state === 'ok' ? (
              <div className="contact-success-alert">
                <CheckCircle2 size={32} style={{ color: '#2E7D32', marginBottom: '10px' }} />
                <h3>Thank You!</h3>
                <p>Your message has been sent directly to the artist. We will reach back to you within 24 hours.</p>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setState('idle')}
                  style={{ marginTop: '16px' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="clean-contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    required
                  />
                  {errors.name && <span className="field-err">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                  {errors.email && <span className="field-err">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    required
                  />
                  {errors.phone && <span className="field-err">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="city">City Name *</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="e.g. Mumbai, Kolkata, London"
                    required
                  />
                  {errors.city && <span className="field-err">{errors.city}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Please write your questions, commission vision, or desired dimensions..."
                    required
                  />
                  {errors.message && <span className="field-err">{errors.message}</span>}
                </div>

                {state === 'err' && (
  <div className="contact-error-alert">
    We could not deliver your message right now. Please reach directly via email at {site.email}.
    {errMsg && <small style={{ display: 'block', marginTop: 6, opacity: 0.8 }}>Debug: {errMsg}</small>}
  </div>
)}

                <button
                  type="submit"
                  className="btn btn-primary btn-submit-full"
                  disabled={state === 'sending'}
                >
                  {state === 'sending' ? (
                    'Sending Message…'
                  ) : (
                    <>
                      <Send size={15} style={{ marginRight: '8px' }} />
                      Submit Inquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </Reveal>
    </main>
  )
}
