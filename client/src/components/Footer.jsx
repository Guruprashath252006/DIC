import React from 'react'
import { Link } from 'react-router-dom'
import { User, Download } from 'lucide-react'
import BrandLogo from './BrandLogo'
import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__col footer__col--brand">
            <Link to="/" className="footer__logo">
              <BrandLogo markClassName="footer__logo-mark" textClassName="footer__logo-text" />
            </Link>
            <p className="footer__desc">
              Chennai&apos;s interior design studio for homes, offices, retail, and lifestyle spaces, bringing everyday comfort and professional-grade execution together for over 15 years.
            </p>
            <div className="footer__buttons">
              <div className="footer__button-item">
                <Link to="/admin" className="footer__round-btn" title="Admin Portal">
                  <User size={18} />
                </Link>
                <span className="footer__button-label">Admin</span>
              </div>
              <div className="footer__button-item">
                <a
                  href="/ecatalog.pdf"
                  download
                  className="footer__round-btn"
                  title="Download E-Catalog"
                  onClick={() => {
                    const current = parseInt(localStorage.getItem('dic_catalog_downloads') || '142', 10)
                    localStorage.setItem('dic_catalog_downloads', (current + 1).toString())
                    window.dispatchEvent(new Event('storage-update'))
                  }}
                >
                  <Download size={18} />
                </a>
                <span className="footer__button-label">Catalog</span>
              </div>
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Quick Links</h4>
            <ul className="footer__links">
              {['Home', 'About', 'Services', 'Portfolio', 'Presentation', 'Testimonials', 'Insights', 'Contact'].map((label) => (
                <li key={label}>
                  <Link to={label === 'Home' ? '/' : label === 'Insights' ? '/blog' : `/${label.toLowerCase()}`}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Services</h4>
            <ul className="footer__links">
              {[
                'Signature Interior Projects',
                'Renovation & Remodeling',
                'Interior Styling',
                'Modular Kitchens',
                'Bedroom Planning',
                'Balcony Designs',
              ].map((service) => (
                <li key={service}><Link to="/services">{service}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Contact</h4>
            <ul className="footer__contact-list">
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" stroke="currentColor" strokeWidth="1.5" /></svg>
                <span>Chennai, Tamil Nadu, India</span>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" /><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 8l9 5 9-5V18a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm18-2H3l9 5 9-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
                <span>mohanaraodeinteriocafe@gmail.com</span>
              </li>
            </ul>
            <Link to="/contact" className="btn btn-primary footer__cta">
              Get Free Consultation
            </Link>
          </div>
        </div>

        <div className="divider" style={{ margin: '3rem 0 2rem' }} />

        <div className="footer__bottom">
          <p>&copy; {currentYear} De Interio Cafe. All rights reserved. A group company of Zenith77 Multi Business Pvt Ltd.</p>
          <div className="footer__legal">
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
