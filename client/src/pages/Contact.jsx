import React, { useState } from 'react'
import AnimatedSection from '../components/AnimatedSection'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', message: '', budget: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handle = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const submit = e => {
    e.preventDefault()

    const newInquiry = {
      id: Date.now().toString(),
      name: form.name,
      email: form.email,
      phone: form.phone,
      service: form.service || 'Design Consultation',
      message: form.message,
      budget: form.budget || 'N/A',
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      status: 'Pending'
    }

    try {
      const existing = localStorage.getItem('dic_inquiries')
      const inquiries = existing ? JSON.parse(existing) : []
      inquiries.unshift(newInquiry)
      localStorage.setItem('dic_inquiries', JSON.stringify(inquiries))
      window.dispatchEvent(new Event('storage-update'))
    } catch (err) {
      console.error('Error saving inquiry:', err)
    }

    setSubmitted(true)
  }

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <AnimatedSection>
            <p className="overline">Let's Connect</p>
            <h1 className="heading-1 page-hero-heading">
              Start Your Design<br />
              <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Journey Today</em>
            </h1>
            <p className="lead page-hero-lead">
              Get a free consultation with our design team. Tell us about your project and let's create something extraordinary.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section section-brown-soft">
        <div className="container contact-grid">
          {/* Contact Info */}
          <AnimatedSection className="contact-info">
            <h2 className="heading-2 contact-info__heading">Get In Touch</h2>

            <div className="contact-info__items">
              <div className="contact-info__item">
                <div className="contact-info__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" stroke="currentColor" strokeWidth="1.5"/></svg>
                </div>
                <div>
                  <strong>Phone</strong>
                  <a href="tel:+919500078674" className="contact-info__value">+91 95000 78674</a>
                  <a href="tel:+917305312201" className="contact-info__value" style={{ opacity: 0.7 }}>+91 73053 12201</a>
                </div>
              </div>

              <div className="contact-info__item">
                <div className="contact-info__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 8l9 5 9-5V18a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm18-2H3l9 5 9-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <strong>Email</strong>
                  <a href="mailto:info@zenith77.com" className="contact-info__value">info@zenith77.com</a>
                  <a href="mailto:mohanaraodeinteriocafe@gmail.com" className="contact-info__value" style={{ opacity: 0.7 }}>mohanaraodeinteriocafe@gmail.com</a>
                </div>
              </div>

              <div className="contact-info__item">
                <div className="contact-info__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" stroke="currentColor" strokeWidth="1.5"/></svg>
                </div>
                <div>
                  <strong>Location</strong>
                  <span className="contact-info__value">Chennai, Tamil Nadu</span>
                  <span className="contact-info__value" style={{ opacity: 0.7 }}>Serving PAN Tamil Nadu</span>
                </div>
              </div>

              <div className="contact-info__item">
                <div className="contact-info__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
                <div>
                  <strong>Business Hours</strong>
                  <span className="contact-info__value">Mon – Sat: 9:00 AM – 7:00 PM</span>
                  <span className="contact-info__value" style={{ opacity: 0.7 }}>Sunday: By Appointment</span>
                </div>
              </div>
            </div>

            {/* Response Time Badge */}
            <div className="contact-info__badge">
              <div className="contact-info__badge-dot" />
              <span>We typically respond within 2 hours during business hours</span>
            </div>

            {/* Quick Actions */}
            <div className="contact-quick">
              <h3 className="contact-quick__title">Quick Connect</h3>
              <div className="contact-quick__links">
                <a href="tel:+919500078674" className="btn btn-primary" id="contact-call-now">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" stroke="currentColor" strokeWidth="1.5"/></svg>
                  Call Now
                </a>
                <a href="https://wa.me/919500078674" target="_blank" rel="noreferrer" className="btn btn-outline" id="contact-whatsapp">
                  WhatsApp Us
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection delay={2} className="contact-form-wrap">
            {!submitted ? (
              <form className="contact-form" onSubmit={submit} id="contact-form">
                <h2 className="heading-2 contact-form__heading">Book Free Consultation</h2>
                <p className="body-sm contact-form__sub">Fill in your details and our team will reach out within 24 hours.</p>

                <div className="contact-form__row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="form-control"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handle}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="form-control"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={handle}
                    />
                  </div>
                </div>

                <div className="contact-form__row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="form-control"
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={handle}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="service">Service Required</label>
                    <select
                      id="service"
                      name="service"
                      className="form-control"
                      value={form.service}
                      onChange={handle}
                    >
                      <option value="">Select a service</option>
                      <option>Signature Interior Project</option>
                      <option>Renovation & Remodeling</option>
                      <option>Interior Styling</option>
                      <option>Modular Kitchen</option>
                      <option>Design Consultation</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="budget">Approximate Budget</label>
                  <select
                    id="budget"
                    name="budget"
                    className="form-control"
                    value={form.budget}
                    onChange={handle}
                  >
                    <option value="">Select budget range</option>
                    <option>₹2L – ₹5L</option>
                    <option>₹5L – ₹10L</option>
                    <option>₹10L – ₹25L</option>
                    <option>₹25L – ₹50L</option>
                    <option>₹50L+</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Tell Us About Your Project *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    className="form-control"
                    placeholder="Describe your space, requirements, and timeline..."
                    value={form.message}
                    onChange={handle}
                  />
                </div>

                <button type="submit" className="btn btn-primary contact-form__submit" id="contact-submit">
                  Send Message & Request Consultation
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </form>
            ) : (
              <div className="contact-success">
                <div className="contact-success__icon">✓</div>
                <h2 className="heading-2">Message Sent!</h2>
                <p className="lead">Thank you, {form.name || 'there'}! Our team will reach out to you at {form.email || 'your email'} within 24 hours.</p>
                <button
                  className="btn btn-outline"
                  onClick={() => setSubmitted(false)}
                  id="contact-send-another"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="contact-map-section section-brown">
        <div className="contact-map-placeholder">
          <div className="contact-map-overlay">
            <div className="contact-map-pin">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/></svg>
            </div>
            <div className="contact-map-label">
              <strong>De Interio Café</strong>
              <span>Chennai, Tamil Nadu</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
