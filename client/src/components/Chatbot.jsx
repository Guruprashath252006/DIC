import React, { useState, useRef, useEffect } from 'react'
import './Chatbot.css'

const INITIAL = [
  { role: 'bot', text: 'Hello! 👋 I\'m the De Interio Café assistant. How can I help you today?' },
]

const QUICK_REPLIES = [
  'Get a free consultation',
  'View our services',
  'Portfolio & past work',
  'Pricing & budget',
  'Contact the team',
]

const BOT_RESPONSES = {
  'consultation': 'Great! We offer free consultations. Please call us at +91 95000 78674 or fill the contact form at /contact and our team will reach out within 24 hours.',
  'service': 'We offer Signature Interior Projects, Renovation, Interior Styling, Modular Kitchens, and Design Consultations. Visit /services for full details!',
  'portfolio': 'We have 500+ completed projects! Browse our portfolio at /portfolio — residential villas, corporate offices, restaurants, and more.',
  'price': 'Our pricing depends on scope and requirements. Typically ₹2L–₹50L+. Book a free consultation and we\'ll give you a custom quote with no obligations.',
  'contact': 'You can reach us at:\n📞 +91 95000 78674\n📧 mohanaraodeinteriocafe@gmail.com\n🕐 Mon-Sat, 9AM–7PM',
  'default': 'Thanks for reaching out! For quick assistance, please call us at +91 95000 78674 or use our contact form. Our design experts are always happy to help! 😊',
}

function getBotReply(text) {
  const t = text.toLowerCase()
  if (t.includes('consult') || t.includes('free') || t.includes('appointment')) return BOT_RESPONSES.consultation
  if (t.includes('service') || t.includes('design') || t.includes('kitchen') || t.includes('bedroom')) return BOT_RESPONSES.service
  if (t.includes('portfolio') || t.includes('work') || t.includes('project')) return BOT_RESPONSES.portfolio
  if (t.includes('price') || t.includes('cost') || t.includes('budget') || t.includes('₹')) return BOT_RESPONSES.price
  if (t.includes('contact') || t.includes('phone') || t.includes('call') || t.includes('email')) return BOT_RESPONSES.contact
  return BOT_RESPONSES.default
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(INITIAL)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (open && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, open])

  const send = (text) => {
    const msg = text || input.trim()
    if (!msg) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: msg }])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, { role: 'bot', text: getBotReply(msg) }])
    }, 900)
  }

  const handleKey = e => { if (e.key === 'Enter') send() }

  return (
    <>
      {/* Toggle Button */}
      <button
        className={`chatbot-toggle${open ? ' open' : ''}`}
        onClick={() => setOpen(v => !v)}
        aria-label="Open chat"
        id="chatbot-toggle"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
        )}
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window${open ? ' open' : ''}`} role="dialog" aria-label="Chat with De Interio Café">
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header__avatar">DIC</div>
          <div>
            <div className="chatbot-header__name">De Interio Café</div>
            <div className="chatbot-header__status">
              <span className="chatbot-header__dot" /> Online
            </div>
          </div>
          <button className="chatbot-header__close" onClick={() => setOpen(false)} aria-label="Close chat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((m, i) => (
            <div key={i} className={`chatbot-msg chatbot-msg--${m.role}`}>
              {m.role === 'bot' && <div className="chatbot-msg__avatar">DIC</div>}
              <div className="chatbot-msg__bubble">{m.text}</div>
            </div>
          ))}
          {typing && (
            <div className="chatbot-msg chatbot-msg--bot">
              <div className="chatbot-msg__avatar">DIC</div>
              <div className="chatbot-msg__bubble chatbot-typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick Replies */}
        <div className="chatbot-quick">
          {QUICK_REPLIES.map(q => (
            <button key={q} className="chatbot-quick-btn" onClick={() => send(q)}>
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="chatbot-input-row">
          <input
            type="text"
            className="chatbot-input"
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            id="chatbot-input"
          />
          <button className="chatbot-send" onClick={() => send()} id="chatbot-send">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </>
  )
}
