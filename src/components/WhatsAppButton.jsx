import React from 'react'
import './WhatsAppButton.css'

export default function WhatsAppButton() {
  const phone = '919500078674'
  const message = encodeURIComponent('Hi! I am interested in interior design services from De Interio Café. Please share more details.')

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="Chat on WhatsApp"
      id="whatsapp-float"
    >
      <span className="whatsapp-btn__icon-wrap" aria-hidden="true">
        <svg viewBox="0 0 32 32" className="whatsapp-btn__icon" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 3.2C8.95 3.2 3.2 8.86 3.2 15.86c0 2.23.58 4.41 1.67 6.32L3.2 28.8l6.8-1.72a13 13 0 0 0 6 .92c7.06 0 12.8-5.66 12.8-12.64C28.8 8.86 23.06 3.2 16 3.2Z" fill="currentColor" />
          <path d="M22.11 18.5c-.28-.14-1.64-.81-1.89-.9-.25-.09-.43-.14-.61.14-.18.27-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.24-1.39-.83-.73-1.38-1.63-1.55-1.91-.16-.27-.02-.42.12-.56.13-.12.28-.32.41-.48.14-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.14-.61-1.46-.84-2-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.47.07-.71.34-.25.27-.95.93-.95 2.27s.97 2.64 1.11 2.82c.13.18 1.89 2.85 4.58 4 .64.27 1.14.43 1.53.55.64.2 1.22.17 1.68.11.51-.08 1.64-.67 1.87-1.32.23-.66.23-1.22.16-1.32-.07-.09-.25-.16-.53-.3Z" fill="#fff" />
        </svg>
      </span>
      <span className="whatsapp-btn__tooltip">Chat on WhatsApp</span>
    </a>
  )
}
