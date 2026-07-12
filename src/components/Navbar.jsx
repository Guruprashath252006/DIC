import React from 'react'
import { Link } from 'react-router-dom'
import { Layers3, Home, Grid2X2, LayoutPanelTop, Hammer, Sparkles, ChefHat, MessagesSquare, ArrowRight } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import './Services.css'

import signaturesImg from '../assets/portfolio/luxury-3bhk-velachery.webp'
import heroImg from '../assets/portfolio/modern-villa-boat-club-road.webp'
import renovationImg from '../assets/portfolio/heritage-home-mylapore.webp'
import stylingImg from '../assets/portfolio/boutique-cafe-nungambakkam.webp'
import kitchenImg from '../assets/portfolio/modular-kitchen-adyar.webp'
import consultationImg from '../assets/portfolio/tech-office-sholinganallur.webp'

const SERVICES = [
  {
    id: 'signature-interiors',
    icon: Layers3,
    title: 'Signature Interior Projects',
    desc: 'A complete interior design service for homes, offices, studios, retail spaces, hospitality venues, and mixed-use projects. We build spaces that feel refined enough for professionals and intuitive enough for everyday life.',
    image: signaturesImg
  },
  {
    id: 'full-home',
    icon: Home,
    title: 'Full Home Interiors',
    desc: 'End-to-end interior design for every room in your home. We handle layout planning, material selection, furniture procurement, and complete execution under one roof.',
    image: renovationImg
  },
  {
    id: 'specific-area',
    icon: Grid2X2,
    title: 'Specific Area Interiors',
    desc: 'Focused design solutions for individual rooms — living rooms, bedrooms, bathrooms, or any area you want to transform without a full-home commitment.',
    image: stylingImg
  },
  {
    id: 'space-planning',
    icon: LayoutPanelTop,
    title: 'Space Planning',
    desc: 'Optimised layouts that ensure seamless flow, maximum space utilisation, and ergonomic living. Ideal for new builds, renovations, and commercial fit-outs.',
    image: kitchenImg
  },
  {
    id: 'renovation-interior',
    icon: Hammer,
    title: 'Renovation Interior',
    desc: 'Transform your existing space without starting from scratch. We handle full structural renovations, aesthetic remodels, and everything in between with minimal disruption.',
    image: consultationImg
  },
  {
    id: 'modular-kitchens',
    icon: ChefHat,
    title: 'Modular Kitchens',
    desc: 'Bespoke modular kitchen solutions that combine smart storage, ergonomic workflow, and stunning aesthetics. From contemporary to traditional, we design kitchens you will love.',
    image: signaturesImg
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
  return (
    <main className="services-page">

      {/* PAGE HERO */}
      <section className="svc-page-hero">
        <img src={heroImg} alt="" className="svc-page-hero__bg" aria-hidden="true" />
        <div className="svc-page-hero__overlay" aria-hidden="true" />
        <div className="svc-container svc-page-hero__content">
          <div className="svc-page-hero__text">
            <AnimatedSection>
              <p className="svc-eyebrow svc-eyebrow--light">What We Offer</p>
              <h1 className="svc-hero-heading svc-hero-heading--light">
                End-to-End Interior
                <br />
                <em>Project Services</em>
              </h1>
              <p className="svc-hero-lead svc-hero-lead--light">
                One complete project flow for personal spaces, professional environments, and everything in between.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>


      {/* SERVICES CARDS GRID */}
      <section className="svc-section svc-cards-section">
        <div className="svc-container">
          <AnimatedSection>
            <p className="svc-eyebrow">What We Do</p>
            <div className="svc-cards-header">
              <h2 className="svc-heading-2">Comprehensive Interior<br />Design Services</h2>
              <p className="svc-cards-intro">We combine creativity, functionality, and attention to detail to deliver timeless interiors that enhance the way you live and work.</p>
            </div>
          </AnimatedSection>

          <div className="svc-cards-grid">
            {SERVICES.map((service, index) => {
              const Icon = service.icon
              return (
                <AnimatedSection key={service.id} delay={(index % 3) + 1} className="svc-card-wrapper">
                  <Link
                    to={`/services/${service.id}`}
                    className="svc-card"
                    id={`service-card-${service.id}`}
                    aria-label={`View ${service.title} details`}
                  >
                    <div className="svc-card__img-wrap">
                      <img src={service.image} alt={service.title} className="svc-card__img" />
                      <span className="svc-card__icon-badge">
                        <Icon size={18} strokeWidth={1.6} />
                      </span>
                    </div>
                    <div className="svc-card__body">
                      <h3 className="svc-card__title">{service.title}</h3>
                      <p className="svc-card__desc">{service.desc}</p>
                      <span className="svc-card__arrow">
                        <ArrowRight size={16} strokeWidth={2} />
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              )
            })}
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
