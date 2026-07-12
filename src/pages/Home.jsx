import { useEffect, useRef, useState } from 'react'

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

import StoryVisual from '../components/StoryVisual'

import TestimonialsMarquee from '../components/TestimonialsMarquee'

import { PORTFOLIO_PROJECTS } from '../data/portfolio'

import './Home.css'







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



import signatureImg from '../assets/portfolio/modern-villa-boat-club-road.webp'
import renovationImg from '../assets/portfolio/penthouse-renovation-ecr.webp'
import stylingImg from '../assets/portfolio/boutique-cafe-nungambakkam.webp'
import consultationImg from '../assets/portfolio/corporate-hq-anna-salai.webp'

const SERVICES = [
  {
    icon: <Layers3 size={24} />,
    title: 'Signature Interior Projects',
    desc: 'A unified interior service for homes, offices, retail, and hospitality spaces designed to feel elevated, usable, and execution-ready.',
    href: '/services',
    image: signatureImg,
  },
  {
    icon: <Hammer size={24} />,
    title: 'Renovation & Remodeling',
    desc: 'Breathe new life into existing spaces. Structural, aesthetic, or both: we handle end-to-end renovation.',
    href: '/services',
    image: renovationImg,
  },
  {
    icon: <Sparkles size={24} />,
    title: 'Interior Styling',
    desc: 'Curated furniture, art, and decor to perfect your space. The final touch that makes it uniquely yours.',
    href: '/services',
    image: stylingImg,
  },
  {
    icon: <MessagesSquare size={24} />,
    title: 'Design Consultation',
    desc: 'Clear expert guidance for layouts, finishes, budgets, and planning so both families and professionals can move forward with confidence.',
    href: '/services',
    image: consultationImg,
  },
]



const FEATURED_PROJECTS = PORTFOLIO_PROJECTS.slice(0, 6)



export default function Home() {
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const sections = document.querySelectorAll('main.home > section')
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(sections).indexOf(entry.target)
          if (index !== -1) {
            setActiveSection(index)
          }
        }
      })
    }, observerOptions)

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <main className="home">
      <section className="hero">
        {/* Background Overlay */}
        <div className="hero__overlay" />

        <div className="container hero__layout">
          {/* Headline & Subtitle */}
          <div className="hero__left-content">
            <motion.h1 
              className="hero__new-heading"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, delay: 0.4 }}
            >
              Why settle for <span className="italic-serif">less</span><br />
              when you can have the <span className="italic-serif">best</span>?
            </motion.h1>
            <motion.p
              className="hero__new-subtitle"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, delay: 0.6 }}
            >
              We design spaces that reflect your unique style.
            </motion.p>
          </div>

          {/* Socials vertically stacked on right */}
          <div className="hero__socials-container">
            <a href="https://youtube.com" className="hero__social-link" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://instagram.com" className="hero__social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="https://twitter.com" className="hero__social-link" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>

          {/* Explore Projects Button in Center-Bottom */}
          <div className="hero__center-cta">
            <Link to="/portfolio" className="hero__explore-btn">
              <span>Explore Projects</span>
              <span className="hero__explore-arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </Link>
          </div>

          {/* Interactive Scroll-Spy Dots in Center-Bottom */}
          <div className="hero__pager-dots">
            {Array.from({ length: 5 }).map((_, i) => (
              <button 
                key={i} 
                className={`hero__pager-dot ${activeSection === i ? 'active' : ''}`}
                onClick={() => {
                  const sections = document.querySelectorAll('main.home > section')
                  if (sections[i]) {
                    sections[i].scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                aria-label={`Scroll to section ${i + 1}`}
              />
            ))}
          </div>

          {/* Bottom Right Widget Card: Experience in 3D */}
          <div className="hero__widget-card glass-card">
            <div className="hero__widget-card-content">
              <div className="hero__widget-card-text">
                <div className="hero__widget-title">Experience</div>
                <div className="hero__widget-subtitle">in 3D</div>
              </div>
              <Link to="/presentation" className="hero__widget-btn" aria-label="Experience in 3D">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
            <div className="hero__widget-img-container">
              <img src="/images/rooms/living-room.png" alt="3D Interior Scene" className="hero__widget-img" />
            </div>
          </div>
        </div>
      </section>

      {/* Proven Excellence Section */}
      <section className="proven-excellence">
        <div className="container">
          <div className="proven-excellence__header-row">
            <div className="proven-excellence__title-col">
              <h2 className="proven-excellence__heading">
                Proven <span className="italic-serif">Excellence</span>
              </h2>
              {/* Custom gold decorative line divider */}
              <div className="proven-excellence__divider">
                <span className="proven-excellence__divider-line" />
                <span className="proven-excellence__divider-arch" />
                <span className="proven-excellence__divider-line" />
              </div>
              <p className="proven-excellence__subtitle">
                Interiors shaped with purpose, for real living. Numbers that speak to our commitment and passion for creating extraordinary spaces
              </p>
            </div>
            
            <div className="proven-excellence__cta-col">
              <Link to="/contact" className="proven-excellence__cta-btn">
                Start Your Project
              </Link>
            </div>
          </div>

          <div className="proven-excellence__body-row">
            {/* Left side: decor image */}
            <div className="proven-excellence__decor-img-container">
              <img 
                src={renovationImg} 
                alt="Renovated living space showcasing De Interio Cafe craftsmanship" 
                className="proven-excellence__decor-img" 
              />
            </div>

            {/* Right side: black stats container with 4 glass tiles */}
            <div className="proven-excellence__stats-container">
              <div className="proven-excellence__stats-grid">
                <div className="proven-excellence__stat-card glass-tile">
                  <div className="proven-excellence__stat-num">
                    <StatCounter value={500} suffix="+" label="" />
                  </div>
                  <div className="proven-excellence__stat-label">
                    Projects Completed
                  </div>
                </div>

                <div className="proven-excellence__stat-card glass-tile">
                  <div className="proven-excellence__stat-num">
                    <StatCounter value={15} suffix="+" label="" />
                  </div>
                  <div className="proven-excellence__stat-label">
                    Years of Excellence
                  </div>
                </div>

                <div className="proven-excellence__stat-card glass-tile">
                  <div className="proven-excellence__stat-num">
                    <StatCounter value={98} suffix="%" label="" />
                  </div>
                  <div className="proven-excellence__stat-label">
                    Client Satisfaction
                  </div>
                </div>

                <div className="proven-excellence__stat-card glass-tile">
                  <div className="proven-excellence__stat-num">
                    <StatCounter value={200} suffix="+" label="" />
                  </div>
                  <div className="proven-excellence__stat-label">
                    Happy Families
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section home-services">
        <div className="home-services__blobs">
          <div className="home-services__blob home-services__blob--1" />
          <div className="home-services__blob home-services__blob--2" />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
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
                  <div className="service-card__img-container">
                    <img src={service.image} alt={service.title} className="service-card__img" />
                    <div className="service-card__img-overlay" />
                  </div>
                  <div className="service-card__glass">
                    <div className="service-card__header">
                      <div className="service-card__icon">{service.icon}</div>
                      <h3 className="heading-3 service-card__title">{service.title}</h3>
                    </div>
                    <p className="body-sm service-card__desc">{service.desc}</p>
                    <span className="service-card__arrow">
                      <span>Explore</span>
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-about section-brown">
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



    </main>
  )
}

