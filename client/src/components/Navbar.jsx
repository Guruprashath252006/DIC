import React, { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const SERVICES_LINKS = [
  { path: '/services/signature-interiors', label: 'Signature Interior Projects' },
  { path: '/services/full-home', label: 'Full Home Interiors' },
  { path: '/services/specific-area', label: 'Specific Area Interiors' },
  { path: '/services/space-planning', label: 'Space Planning' },
  { path: '/services/renovation', label: 'Renovation Interior' },
]

const DESIGN_IDEAS_LINKS = [
  { path: '/design-ideas/kitchen', label: 'Kitchen' },
  { path: '/design-ideas/living-room', label: 'Living Room' },
  { path: '/design-ideas/dining-area', label: 'Dining Area' },
  { path: '/design-ideas/foyer-area', label: 'Foyer Area' },
  { path: '/design-ideas/kids-bedroom', label: 'Kids Bedroom' },
  { path: '/design-ideas/master-bedroom', label: 'Master Bedroom' },
  { path: '/design-ideas/parents-bedroom', label: 'Parents Bedroom' },
  { path: '/design-ideas/guest-bedroom', label: 'Guest Bedroom' },
  { path: '/design-ideas/home-office', label: 'Home Office Room' },
  { path: '/design-ideas/balcony', label: 'Balcony / Sit-out Areas' },
  { path: '/design-ideas/bathroom', label: 'Bathroom' },
  { path: '/design-ideas', label: 'View All Ideas' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  const isActive = (path) => pathname === path ? 'active' : ''
  const isPartiallyActive = (path) => pathname.startsWith(path) ? 'active' : ''
  const solidNavbar = scrolled || pathname !== '/'

  return (
    <nav className={`navbar ${solidNavbar ? 'scrolled' : ''}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo" id="nav-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>De Interio Café</span>
        </Link>

        {/* Desktop Links */}
        <div className="navbar__links">
          <Link to="/" className={`navbar__link ${isActive('/')}`}>Home</Link>
          <Link to="/about" className={`navbar__link ${isActive('/about')}`}>About</Link>
          
          {/* Services Dropdown */}
          <div 
            className={`navbar__dropdown-wrap ${isPartiallyActive('/services')}`}
            onMouseEnter={() => setActiveDropdown('services')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link to="/services" className="navbar__link">
              Services
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <div className={`navbar__dropdown ${activeDropdown === 'services' ? 'open' : ''}`}>
              {SERVICES_LINKS.map(link => (
                <Link key={link.path} to={link.path} className="navbar__dropdown-link">{link.label}</Link>
              ))}
            </div>
          </div>

          <Link to="/portfolio" className={`navbar__link ${isActive('/portfolio')}`}>Portfolio</Link>
          <Link to="/presentation" className={`navbar__link ${isActive('/presentation')}`}>Presentation</Link>

          {/* Design Ideas Dropdown */}
          <div 
            className={`navbar__dropdown-wrap ${isPartiallyActive('/design-ideas')}`}
            onMouseEnter={() => setActiveDropdown('ideas')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link to="/design-ideas" className="navbar__link">
              Design Ideas
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <div className={`navbar__dropdown ${activeDropdown === 'ideas' ? 'open' : ''}`}>
              {DESIGN_IDEAS_LINKS.map(link => (
                <Link key={link.path} to={link.path} className="navbar__dropdown-link">{link.label}</Link>
              ))}
            </div>
          </div>

          <Link to="/testimonials" className={`navbar__link ${isActive('/testimonials')}`}>Testimonials</Link>
          <Link to="/blog" className={`navbar__link ${isActive('/blog')}`}>Insights</Link>
          <Link to="/contact" className={`navbar__link ${isActive('/contact')}`}>Contact</Link>
        </div>

        {/* Actions */}
        <div className="navbar__actions">
          <Link to="/contact" className="btn btn-primary btn-sm" id="nav-cta">BOOK CONSULTATION</Link>
          
          {/* Mobile Toggle */}
          <button 
            className={`navbar__mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span /> <span /> <span />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`navbar__mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="navbar__mobile-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/presentation">Presentation</Link>
          <Link to="/design-ideas">Design Ideas</Link>
          <Link to="/testimonials">Testimonials</Link>
          <Link to="/blog">Insights</Link>
          <Link to="/contact">Contact</Link>
          <div style={{ marginTop: '2rem', padding: '0 2rem' }}>
            <Link to="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>BOOK CONSULTATION</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
