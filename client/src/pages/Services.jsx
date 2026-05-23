import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layers3, Hammer, Sparkles, ChefHat, MessagesSquare } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import './Services.css'

const SERVICES = [
  {
    id: 'signature-interiors',
    icon: Layers3,
    title: 'Signature Interior Projects',
    tagline: 'One design system for every kind of space.',
    desc: 'A complete interior design service for homes, offices, studios, retail spaces, hospitality venues, and mixed-use projects. We build spaces that feel refined enough for professionals and intuitive enough for everyday life.',
    features: [
      'Homes, offices, retail, and hospitality planning',
      'Space strategy, zoning, and circulation design',
      '3D visualization and material storytelling',
      'Furniture, lighting, and storage integration',
      'Client-ready detailing for families and teams',
      'Execution support from concept to handover'
    ]
  },
  {
    id: 'renovation',
    icon: Hammer,
    title: 'Renovation and Remodeling',
    tagline: 'Old space, new story.',
    desc: 'Transform your existing space without starting from scratch. We handle full structural renovations, aesthetic remodels, and everything in between with minimal disruption to your daily life.',
    features: [
      'Full and partial renovations',
      'False ceiling and flooring',
      'Electrical and plumbing upgrades',
      'Wall treatments and painting',
      'Before and after documentation',
      'Project timeline management'
    ]
  },
  {
    id: 'styling',
    icon: Sparkles,
    title: 'Interior Styling',
    tagline: 'The art of perfect finishing.',
    desc: 'Already have a space but want the wow factor? Our interior styling service focuses on the finishing touches that make a house a home with curated accessories, art, textiles, and more.',
    features: [
      'Furniture and decor curation',
      'Art and accessory selection',
      'Textile and soft furnishings',
      'Plant and greenery styling',
      'Photography preparation',
      'Seasonal refresh packages'
    ]
  },
  {
    id: 'modular',
    icon: ChefHat,
    title: 'Modular Kitchens',
    tagline: 'Where cooking meets design.',
    desc: 'Bespoke modular kitchen solutions that combine smart storage, ergonomic workflow, and stunning aesthetics. From contemporary to traditional, we design kitchens you will love cooking in.',
    features: [
      'L-shape and U-shape kitchens',
      'Island kitchen designs',
      'Smart storage solutions',
      'Countertop and backsplash design',
      'Appliance integration',
      'Custom cabinetry'
    ]
  },
  {
    id: 'consultation',
    icon: MessagesSquare,
    title: 'Design Consultation',
    tagline: 'Expert advice, your way.',
    desc: 'Not ready for a full project? Our design consultation service gives you access to expert advice on color, layout, furniture, and more, available online and in person.',
    features: [
      '1-hour design sessions',
      'Color scheme consultation',
      'Furniture layout advice',
      'Budget planning guidance',
      'Contractor recommendations',
      'Virtual walkthroughs'
    ]
  }
]

const PROCESS = [
  { step: '01', title: 'Discovery Call', desc: 'We understand your vision, needs, and budget through a detailed consultation.' },
  { step: '02', title: 'Concept Design', desc: 'Our designers create initial concepts with mood boards, layouts, and material palettes.' },
  { step: '03', title: '3D Visualization', desc: 'Photorealistic renders help you visualize the final space before execution begins.' },
  { step: '04', title: 'Execution', desc: 'Our skilled team brings the design to life with precision, on time and on budget.' },
  { step: '05', title: 'Styling and Handover', desc: 'We add the final touches and hand over a move-in ready, beautifully styled space.' }
]

export default function Services() {
  const [active, setActive] = useState('signature-interiors')
  const activeService = SERVICES.find((service) => service.id === active)
  const ActiveIcon = activeService?.icon

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <AnimatedSection>
            <p className="overline">What We Offer</p>
            <h1 className="heading-1 page-hero-heading">
              End-to-End Interior
              <br />
              <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Project Services</em>
            </h1>
            <p className="lead page-hero-lead">
              One complete project flow for personal spaces, professional environments, and everything in between.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <AnimatedSection>
            <div className="section-label"><span className="overline">Services Overview</span></div>
            <h2 className="heading-1" style={{ marginBottom: '3rem' }}>Our Expertise</h2>
          </AnimatedSection>

          <div className="services-overview">
            <div className="services-tabs">
              {SERVICES.map((service) => {
                const Icon = service.icon

                return (
                  <button
                    key={service.id}
                    id={`service-tab-${service.id}`}
                    className={`services-tab${active === service.id ? ' active' : ''}`}
                    onClick={() => setActive(service.id)}
                  >
                    <span className="services-tab__icon">
                      <Icon size={18} strokeWidth={1.8} />
                    </span>
                    <span>{service.title}</span>
                  </button>
                )
              })}
            </div>

            {activeService && ActiveIcon && (
              <div className="services-detail">
                <div className="services-detail__header">
                  <span className="services-tab__icon services-detail__icon">
                    <ActiveIcon size={28} strokeWidth={1.8} />
                  </span>
                  <div>
                    <span className="overline">{activeService.tagline}</span>
                    <h2 className="heading-2" style={{ marginTop: '0.5rem' }}>{activeService.title}</h2>
                  </div>
                </div>

                <p className="lead services-detail__desc">{activeService.desc}</p>

                <ul className="services-detail__features">
                  {activeService.features.map((feature) => (
                    <li key={feature}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link to="/contact" className="btn btn-primary" id={`service-cta-${activeService.id}`}>
                  Plan Your {activeService.title}
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section section-brown-soft">
        <div className="container">
          <AnimatedSection>
            <div className="section-label"><span className="overline">How We Work</span></div>
            <h2 className="heading-1" style={{ marginBottom: '3rem' }}>Our Design Process</h2>
          </AnimatedSection>

          <div className="services-process">
            {PROCESS.map((item, index) => (
              <AnimatedSection key={item.step} delay={(index % 3) + 1} className="process-step">
                <div className="process-step__num">{item.step}</div>
                <h3 className="process-step__title">{item.title}</h3>
                <p className="process-step__desc body-sm">{item.desc}</p>
                {index < PROCESS.length - 1 && <div className="process-step__arrow">{'->'}</div>}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section--sm section-brown">
        <div className="container" style={{ textAlign: 'center' }}>
          <AnimatedSection>
            <h2 className="heading-1" style={{ marginBottom: '1rem' }}>Start Your Project Today</h2>
            <p className="lead" style={{ marginBottom: '2rem' }}>Free consultation for homeowners, founders, teams, and developers who want a clearer design direction.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-primary" id="services-contact-cta">Book Free Consultation</Link>
              <Link to="/portfolio" className="btn btn-outline" id="services-portfolio-link">See Our Portfolio</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  )
}
