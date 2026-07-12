import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import BrandLogo from './BrandLogo'
import './Navbar.css'


const DESIGN_IDEAS_GROUPS = [
  {
    title: 'Living Spaces',
    className: 'group--living',
    links: [
      { path: '/design-ideas/kitchen', label: 'Kitchen' },
      { path: '/design-ideas/living-room', label: 'Living Room' },
      { path: '/design-ideas/dining-area', label: 'Dining Area' },
      { path: '/design-ideas/foyer-area', label: 'Foyer Area' },
    ],
  },
  {
    title: 'Bedroom Suites',
    className: 'group--bedrooms',
    links: [
      { path: '/design-ideas/kids-bedroom', label: 'Kids Bedroom' },
      { path: '/design-ideas/master-bedroom', label: 'Master Bedroom' },
      { path: '/design-ideas/parents-bedroom', label: 'Parents Bedroom' },
      { path: '/design-ideas/guest-bedroom', label: 'Guest Bedroom' },
    ],
  },
  {
    title: 'Work & Leisure',
    className: 'group--work',
    links: [
      { path: '/design-ideas/home-office', label: 'Home Office Room' },
      { path: '/design-ideas/balcony', label: 'Balcony / Sit-out Areas' },
      { path: '/design-ideas/bathroom', label: 'Bathroom' },
    ],
  },
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
          <BrandLogo markWrapperClassName="navbar__logo-mark-hidden" markClassName="navbar__logo-mark" textClassName="navbar__logo-text" />
        </Link>

        {/* Desktop Links */}
        <div className="navbar__links">
          <Link to="/" className={`navbar__link ${isActive('/')}`}>
            {isActive('/') === 'active' && (
              <motion.span
                className="navbar__link-active-bg"
                layoutId="activeNavIndicator"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            Home
          </Link>
          <Link to="/about" className={`navbar__link ${isActive('/about')}`}>
            {isActive('/about') === 'active' && (
              <motion.span
                className="navbar__link-active-bg"
                layoutId="activeNavIndicator"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            About
          </Link>

          <Link to="/services" className={`navbar__link ${isPartiallyActive('/services')}`}>
            {isPartiallyActive('/services') === 'active' && (
              <motion.span
                className="navbar__link-active-bg"
                layoutId="activeNavIndicator"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            Services
          </Link>

          <Link to="/portfolio" className={`navbar__link ${isActive('/portfolio')}`}>
            {isActive('/portfolio') === 'active' && (
              <motion.span
                className="navbar__link-active-bg"
                layoutId="activeNavIndicator"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            Portfolio
          </Link>

          <Link to="/presentation" className={`navbar__link ${isActive('/presentation')}`}>
            {isActive('/presentation') === 'active' && (
              <motion.span
                className="navbar__link-active-bg"
                layoutId="activeNavIndicator"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            3D Experience
          </Link>

          {/* Design Ideas Dropdown */}
          <div
            className={`navbar__dropdown-wrap ${isPartiallyActive('/design-ideas')}`}
            onMouseEnter={() => setActiveDropdown('ideas')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link to="/design-ideas" className={`navbar__link ${isPartiallyActive('/design-ideas')}`}>
              {isPartiallyActive('/design-ideas') === 'active' && (
                <motion.span
                  className="navbar__link-active-bg"
                  layoutId="activeNavIndicator"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              Design Ideas
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
            <div className={`navbar__dropdown ${activeDropdown === 'ideas' ? 'open' : ''}`}>
              {DESIGN_IDEAS_GROUPS.map((group) => (
                <div key={group.title} className={`navbar__dropdown-group ${group.className}`}>
                  <span className="navbar__dropdown-group-title">{group.title}</span>
                  {group.links.map((link) => (
                    <Link key={link.path} to={link.path} className="navbar__dropdown-link">{link.label}</Link>
                  ))}
                </div>
              ))}
              <div className="navbar__dropdown-divider" />
              <Link to="/design-ideas" className="navbar__dropdown-link navbar__dropdown-link--all">View All Ideas</Link>
            </div>
          </div>

          <Link to="/testimonials" className={`navbar__link ${isActive('/testimonials')}`}>
            {isActive('/testimonials') === 'active' && (
              <motion.span
                className="navbar__link-active-bg"
                layoutId="activeNavIndicator"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            Testimonials
          </Link>

          <Link to="/blog" className={`navbar__link ${isActive('/blog')}`}>
            {isActive('/blog') === 'active' && (
              <motion.span
                className="navbar__link-active-bg"
                layoutId="activeNavIndicator"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            Insights
          </Link>
        </div>

        {/* Actions */}
        <div className="navbar__actions">
          {/* Contact button in capsule black pill */}
          <Link to="/contact" className="navbar__contact-btn" id="nav-contact">
            <span>Contact</span>
            <span className="navbar__contact-icon">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </Link>

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
          <Link to="/design-ideas">Design Ideas</Link>
          <Link to="/presentation">3D Experience</Link>
          <Link to="/testimonials">Testimonials</Link>
          <Link to="/blog">Insights</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  )
}
