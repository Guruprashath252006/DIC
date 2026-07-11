import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layers3, Hammer, Sparkles, ChefHat, MessagesSquare, ArrowRight, Check } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import './Services.css'

import signaturesImg from '../assets/portfolio/luxury-3bhk-velachery.webp'
import renovationImg from '../assets/portfolio/heritage-home-mylapore.webp'
import stylingImg from '../assets/portfolio/boutique-cafe-nungambakkam.webp'
import kitchenImg from '../assets/portfolio/modular-kitchen-adyar.webp'
import consultationImg from '../assets/portfolio/tech-office-sholinganallur.webp'

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
    ],
    image: signaturesImg
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
    ],
    image: renovationImg
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
    ],
    image: stylingImg
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
    ],
    image: kitchenImg
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
    ],
    image: consultationImg
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
  const activeService = SERVICES.find((s) => s.id === active)
  const ActiveIcon = activeService?.icon

  return (
    <main className="services-page">

      {/* PAGE HERO — same content as before, new class names */}
      <section className="svc-page-hero">
        <div className="svc-container">
          <AnimatedSection>
            <p className="svc-eyebrow">What We Offer</p>
            <h1 className="svc-hero-heading">
              End-to-End Interior
              <br />
              <em>Project Services</em>
            </h1>
            <p className="svc-hero-lead">
              One complete project flow for personal spaces, professional environments, and everything in between.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* SERVICES OVERVIEW — same layout: left tabs, right detail panel */}
      <section className="svc-section">
        <div className="svc-container">
          <AnimatedSection>
            <p className="svc-eyebrow">Services Overview</p>
            <h2 className="svc-heading-2" style={{ marginBottom: '3rem' }}>Our Expertise</h2>
          </AnimatedSection>

          <div className="svc-overview">
            <div className="svc-tabs">
              {SERVICES.map((service) => {
                const Icon = service.icon
                return (
                  <button
                    key={service.id}
                    id={`service-tab-${service.id}`}
                    className={`svc-tab${active === service.id ? ' svc-tab--active' : ''}`}
                    onClick={() => setActive(service.id)}
                  >
                    <span className="svc-tab__icon">
                      <Icon size={17} strokeWidth={1.8} />
                    </span>
                    <span>{service.title}</span>
                  </button>
                )
              })}
            </div>

            {activeService && ActiveIcon && (
              <div className="svc-detail" key={activeService.id}>
                <div className="svc-detail__img-wrap">
                  <img src={activeService.image} alt={activeService.title} className="svc-detail__img" />
                </div>

                <div className="svc-detail__body">
                  <div className="svc-detail__header">
                    <span className="svc-detail__icon-wrap">
                      <ActiveIcon size={22} strokeWidth={1.6} />
                    </span>
                    <div>
                      <p className="svc-eyebrow" style={{ marginBottom: '0.25rem' }}>{activeService.tagline}</p>
                      <h2 className="svc-detail__title">{activeService.title}</h2>
                    </div>
                  </div>

                  <p className="svc-detail__desc">{activeService.desc}</p>

                  <ul className="svc-detail__features">
                    {activeService.features.map((feat) => (
                      <li key={feat} className="svc-detail__feature-item">
                        <Check size={14} strokeWidth={2.5} className="svc-detail__check" />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className="svc-btn-accent"
                    id={`service-cta-${activeService.id}`}
                  >
                    Plan Your {activeService.title}
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PROCESS — same 5 steps */}
      <section className="svc-section svc-process-section">
        <div className="svc-container">
          <AnimatedSection>
            <p className="svc-eyebrow">How We Work</p>
            <h2 className="svc-heading-2" style={{ marginBottom: '3rem' }}>Our Design Process</h2>
          </AnimatedSection>

          <div className="svc-process">
            {PROCESS.map((item, index) => (
              <AnimatedSection key={item.step} delay={(index % 3) + 1} className="svc-process-step">
                <div className="svc-process-step__num">{item.step}</div>
                <div className="svc-process-step__divider" />
                <h3 className="svc-process-step__title">{item.title}</h3>
                <p className="svc-process-step__desc">{item.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — same content */}
      <section className="svc-cta-section">
        <div className="svc-cta-inner">
          <AnimatedSection>
            <h2 className="svc-cta__heading">Start Your Project Today</h2>
            <p className="svc-cta__sub">
              Free consultation for homeowners, founders, teams, and developers who want a clearer design direction.
            </p>
            <div className="svc-cta__actions">
              <Link to="/contact" className="svc-btn-primary" id="services-contact-cta">
                Book Free Consultation
              </Link>
              <Link to="/portfolio" className="svc-btn-outline-dark" id="services-portfolio-link">
                See Our Portfolio
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  )
}
