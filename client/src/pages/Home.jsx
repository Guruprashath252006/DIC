import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Layers3,
  Hammer,
  Sparkles,
  MessagesSquare,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import ShinyText from '../components/ShinyText'
import StoryVisual from '../components/StoryVisual'
import TestimonialsMarquee from '../components/TestimonialsMarquee'
import { PORTFOLIO_PROJECTS } from '../data/portfolio'
import './Home.css'

const InteriorScene = React.lazy(() => import('../components/InteriorScene'))

function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return undefined

    let startTime = null

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(ease * target))

      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
    return undefined
  }, [target, duration, start])

  return count
}

function StatCounter({ value, suffix, label }) {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)
  const count = useCounter(value, 1600, started)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="stat">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="stat__number"
      >
        {count}
        {suffix}
      </motion.span>
      <span className="stat__label">{label}</span>
    </div>
  )
}

const SERVICES = [
  {
    icon: <Layers3 size={32} />,
    title: 'Signature Interior Projects',
    desc: 'A unified interior service for homes, offices, retail, and hospitality spaces designed to feel elevated, usable, and execution-ready.',
    href: '/services',
  },
  {
    icon: <Hammer size={32} />,
    title: 'Renovation & Remodeling',
    desc: 'Breathe new life into existing spaces. Structural, aesthetic, or both: we handle end-to-end renovation.',
    href: '/services',
  },
  {
    icon: <Sparkles size={32} />,
    title: 'Interior Styling',
    desc: 'Curated furniture, art, and decor to perfect your space. The final touch that makes it uniquely yours.',
    href: '/services',
  },
  {
    icon: <MessagesSquare size={32} />,
    title: 'Design Consultation',
    desc: 'Clear expert guidance for layouts, finishes, budgets, and planning so both families and professionals can move forward with confidence.',
    href: '/services',
  },
]

const FEATURED_PROJECTS = PORTFOLIO_PROJECTS.slice(0, 6)

const RevealText = ({ children, delay = 0 }) => (
  <div style={{ position: 'relative', overflow: 'hidden' }}>
    <motion.div
      initial={{ y: '100%' }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  </div>
)

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="container hero__content">
          <div className="hero__text">
            <RevealText delay={0.1}>
              <p className="overline hero__overline">Unified Interiors For Living, Work, And Growth</p>
            </RevealText>

            <h1 className="display hero__heading">
              <RevealText delay={0.2}>Spaces That Tell</RevealText>
              <RevealText delay={0.3}>
                <ShinyText text="Your Story" className="hero__heading-em" speed={3} />
              </RevealText>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="lead hero__lead"
            >
              De Interio Cafe creates one seamless interior experience for homeowners, businesses, and project teams across Chennai with a design language that feels premium, practical, and beautifully resolved in 3D before execution starts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="hero__ctas"
            >
              <Link to="/portfolio" className="btn btn-primary hoverable" id="hero-view-portfolio">
                View Our Work
                <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn btn-outline hoverable" id="hero-book-consultation">
                Get In Touch
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="hero__feature-strip"
            >
              <div className="hero__feature-pill">
                <span className="hero__feature-dot" />
                Everyday comfort
              </div>
              <div className="hero__feature-pill">
                <span className="hero__feature-dot" />
                Professional precision
              </div>
              <div className="hero__feature-pill">
                <span className="hero__feature-dot" />
                Immersive 3D design
              </div>
            </motion.div>
          </div>

          <Suspense fallback={<div className="interior-scene interior-scene--loading" aria-hidden="true" />}>
            <InteriorScene />
          </Suspense>
        </div>

        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hero__stats glass-card"
          >
            <StatCounter value={500} suffix="+" label="Projects Completed" />
            <div className="hero__stat-divider" />
            <StatCounter value={15} suffix="+" label="Years of Excellence" />
            <div className="hero__stat-divider" />
            <StatCounter value={98} suffix="%" label="Client Satisfaction" />
            <div className="hero__stat-divider" />
            <StatCounter value={200} suffix="+" label="Happy Families" />
          </motion.div>
        </div>
      </section>

      <section className="section home-services">
        <div className="container">
          <div className="section-label">
            <span className="overline">What We Do</span>
          </div>
          <div className="home-services__header">
            <h2 className="heading-1">Our Services</h2>
            <Link to="/services" className="btn btn-ghost hoverable">View All Services</Link>
          </div>

          <div className="home-services__grid">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={service.href} className="service-card hoverable" id={`service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="service-card__icon">{service.icon}</div>
                  <h3 className="heading-3 service-card__title">{service.title}</h3>
                  <p className="body-sm service-card__desc">{service.desc}</p>
                  <span className="service-card__arrow">
                    <ArrowRight size={20} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-about section-brown-soft">
        <div className="container">
          <div className="home-about__inner">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="home-about__text"
            >
              <div className="section-label">
                <span className="overline">Our Story</span>
              </div>
              <h2 className="heading-1 home-about__heading">
                Designing Dreams
                <br />
                Since 2008
              </h2>
              <p className="lead home-about__lead">
                Founded with a vision to redefine interiors in Chennai, De Interio Cafe has grown from a boutique studio into one of the city&apos;s most trusted design firms. Every project is a collaboration: your vision, our expertise.
              </p>
              <ul className="home-about__pillars">
                {['Client-First Philosophy', 'Timeless Design Aesthetic', 'On-Time, On-Budget Delivery', 'End-to-End Project Management'].map((pillar) => (
                  <li key={pillar}>
                    <CheckCircle2 size={18} />
                    {pillar}
                  </li>
                ))}
              </ul>
              <Link to="/about" className="btn btn-outline hoverable" id="about-learn-more">
                Learn Our Story
              </Link>
            </motion.div>

            <div className="home-about__visual">
              <StoryVisual />
            </div>
          </div>
        </div>
      </section>

      <section className="section home-portfolio">
        <div className="container">
          <div className="section-label">
            <span className="overline">Our Work</span>
          </div>
          <div className="home-portfolio__header">
            <h2 className="heading-1">Featured Projects</h2>
            <Link to="/portfolio" className="btn btn-ghost hoverable" id="portfolio-view-all">View All Projects</Link>
          </div>

          <div className="home-portfolio__grid">
            {FEATURED_PROJECTS.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                className={`portfolio-item portfolio-item--${index}`}
              >
                <Link to="/portfolio" className="portfolio-card hoverable">
                  <img src={item.image} alt={item.imageAlt} className="portfolio-card__img" />
                  <div className="portfolio-card__overlay" />
                  <div className="portfolio-card__content">
                    <span className="badge">{item.category}</span>
                    <h3 className="portfolio-card__title">{item.title}</h3>
                  </div>
                  <div className="portfolio-card__hover">
                    <span>View Project</span>
                    <ArrowRight size={20} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-testimonials testimonials-gradient-bg">
        <div className="container">
          <div className="section-label">
            <span className="overline">Client Stories</span>
          </div>
          <h2 className="heading-1 home-testimonials__heading">What Clients Say</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          style={{ width: '100%', overflow: 'hidden', marginTop: '3.5rem' }}
        >
          <TestimonialsMarquee />
        </motion.div>

        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="home-testimonials__cta"
            style={{ marginTop: '3.5rem' }}
          >
            <Link to="/testimonials" className="btn btn-outline hoverable" id="testimonials-view-all">
              Read All Reviews
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="home-cta-band section-brown">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="home-cta-band__inner glass-card"
          >
            <div>
              <h2 className="heading-1 home-cta-band__heading">
                Ready to Transform
                <br />
                Your Space?
              </h2>
              <p className="lead home-cta-band__lead">Schedule a free consultation and let&apos;s bring your vision to life.</p>
            </div>
            <div className="home-cta-band__actions">
              <Link to="/contact" className="btn btn-primary hoverable" id="cta-band-consult">Get Free Consultation</Link>
              <a href="tel:+919500078674" className="btn btn-outline hoverable" id="cta-band-call">Call +91 95000 78674</a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
