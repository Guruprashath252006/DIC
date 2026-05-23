import React from 'react'
import { Link } from 'react-router-dom'
import {
  Target,
  Handshake,
  Clock,
  Leaf,
  Award,
  Lightbulb,
  Store,
  Building2,
  Workflow,
  CheckSquare,
  ChefHat,
  Trophy,
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { PORTFOLIO_PROJECTS } from '../data/portfolio'
import ourStoryImage from '../assets/home/our-story.png'
import './About.css'

const TEAM = [
  { name: 'Mohana Rao', role: 'Founder & Principal Designer', initial: 'M', image: ourStoryImage },
]

const VALUES = [
  { icon: <Target size={28} strokeWidth={1.5} />, title: 'Purpose-Driven', desc: 'Every design decision is intentional, serving both aesthetics and function.' },
  { icon: <Handshake size={28} strokeWidth={1.5} />, title: 'Client-First', desc: 'Your vision drives our process. We listen, collaborate, and deliver.' },
  { icon: <Clock size={28} strokeWidth={1.5} />, title: 'Timely Delivery', desc: 'We respect your time. On-time delivery is non-negotiable for us.' },
  { icon: <Leaf size={28} strokeWidth={1.5} />, title: 'Sustainable Choices', desc: 'Eco-conscious materials and practices are at the heart of our work.' },
  { icon: <Award size={28} strokeWidth={1.5} />, title: 'Quality Craftsmanship', desc: 'Premium materials and skilled artisans ensure lasting excellence.' },
  { icon: <Lightbulb size={28} strokeWidth={1.5} />, title: 'Innovation', desc: 'We blend timeless design with contemporary trends and technology.' },
]

const MILESTONES = [
  {
    year: '2008',
    title: 'Boutique Inception',
    event: 'Founded as a boutique design studio in Chennai, focusing on custom residential spaces.',
    iconName: 'Store',
    stage: 'Foundation',
    progress: 16,
  },
  {
    year: '2012',
    title: 'Commercial Expansion',
    event: 'Expanded our operations to commercial office layout designs and premium hospitality spaces.',
    iconName: 'Building2',
    stage: 'Scale Up',
    progress: 32,
  },
  {
    year: '2016',
    title: 'Zenith77 Merger',
    event: 'Joined the prestigious Zenith77 Multi Business Pvt Ltd group, scaling our operations PAN Tamil Nadu.',
    iconName: 'Workflow',
    stage: 'Integration',
    progress: 48,
  },
  {
    year: '2019',
    title: 'Milestone Scale',
    event: 'Proudly crossed the 300+ completed projects threshold, solidifying our brand trust.',
    iconName: 'CheckSquare',
    stage: 'Proof',
    progress: 64,
  },
  {
    year: '2022',
    title: 'Vertical Innovation',
    event: 'Launched dedicated premium modular kitchens and home renovation verticals.',
    iconName: 'ChefHat',
    stage: 'Innovation',
    progress: 82,
  },
  {
    year: '2024',
    title: 'Prestige Recognition',
    event: 'Recognized and awarded as the Top Interior Studio in Chennai for quality and design excellence.',
    iconName: 'Trophy',
    stage: 'Leadership',
    progress: 100,
  },
]

const ABOUT_VISUALS = {
  heroPrimary: PORTFOLIO_PROJECTS[0],
  heroSecondary: PORTFOLIO_PROJECTS[1],
  heroAccent: PORTFOLIO_PROJECTS[2],
  processA: PORTFOLIO_PROJECTS[8],
  processB: PORTFOLIO_PROJECTS[5],
  processC: PORTFOLIO_PROJECTS[7],
}

const getMilestoneIcon = (name) => {
  switch (name) {
    case 'Store': return <Store size={20} strokeWidth={1.5} />
    case 'Building2': return <Building2 size={20} strokeWidth={1.5} />
    case 'Workflow': return <Workflow size={20} strokeWidth={1.5} />
    case 'CheckSquare': return <CheckSquare size={20} strokeWidth={1.5} />
    case 'ChefHat': return <ChefHat size={20} strokeWidth={1.5} />
    case 'Trophy': return <Trophy size={20} strokeWidth={1.5} />
    default: return <Award size={20} strokeWidth={1.5} />
  }
}

export default function About() {
  return (
    <main>
      <section className="page-hero">
        <div className="container about-hero">
          <AnimatedSection className="about-hero__content">
            <p className="overline">Our Story</p>
            <h1 className="heading-1 about-hero__heading">
              Designing Spaces.
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Building Relationships.</em>
            </h1>
            <p className="lead about-hero__lead">
              For over 15 years, De Interio Cafe has been transforming spaces across Chennai
              with thoughtful design, premium craftsmanship, and an unwavering client-first approach.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={2} className="about-hero__visuals">
            <div className="about-hero__frame about-hero__frame--primary">
              <img src={ABOUT_VISUALS.heroPrimary.image} alt={ABOUT_VISUALS.heroPrimary.imageAlt} />
              <div className="about-hero__caption">
                <span>Residential Signature</span>
                <strong>{ABOUT_VISUALS.heroPrimary.title}</strong>
              </div>
            </div>
            <div className="about-hero__frame about-hero__frame--secondary">
              <img src={ABOUT_VISUALS.heroSecondary.image} alt={ABOUT_VISUALS.heroSecondary.imageAlt} />
            </div>
            <div className="about-hero__frame about-hero__frame--accent">
              <img src={ABOUT_VISUALS.heroAccent.image} alt={ABOUT_VISUALS.heroAccent.imageAlt} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section">
        <div className="container about-mv">
          <AnimatedSection className="about-mv__card about-mv__card--mission">
            <span className="overline">Our Mission</span>
            <h2 className="heading-2">To make exceptional design accessible to every home and business in Chennai.</h2>
            <p className="body-sm about-mv__text">
              We believe great design is not a luxury: it is a right. Our team works tirelessly to deliver
              world-class interiors at every budget level, without compromising on quality or creativity.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={2} className="about-mv__card about-mv__card--vision">
            <span className="overline">Our Vision</span>
            <h2 className="heading-2">To become South India&apos;s most trusted interior design firm by 2030.</h2>
            <p className="body-sm about-mv__text">
              Expanding beyond Chennai to serve clients across Tamil Nadu and beyond, setting new benchmarks
              in sustainable, innovative, and human-centered interior design.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section about-gallery-section">
        <div className="container about-gallery">
          <AnimatedSection className="about-gallery__copy">
            <div className="section-label"><span className="overline">How We Design</span></div>
            <h2 className="heading-1">Visual thinking, material depth, and real-world functionality.</h2>
            <p className="lead">
              Every project moves through concept framing, layout refinement, and finish curation. This layout shows the kind of spaces and moods we build across homes, workplaces, and renovation projects.
            </p>
          </AnimatedSection>

          <div className="about-gallery__grid">
            <AnimatedSection className="about-gallery__card about-gallery__card--tall">
              <img src={ABOUT_VISUALS.processA.image} alt={ABOUT_VISUALS.processA.imageAlt} />
              <div className="about-gallery__overlay">
                <span className="badge">Workflow</span>
                <h3>{ABOUT_VISUALS.processA.title}</h3>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={2} className="about-gallery__card">
              <img src={ABOUT_VISUALS.processB.image} alt={ABOUT_VISUALS.processB.imageAlt} />
              <div className="about-gallery__overlay">
                <span className="badge">Commercial Energy</span>
                <h3>{ABOUT_VISUALS.processB.title}</h3>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={3} className="about-gallery__card">
              <img src={ABOUT_VISUALS.processC.image} alt={ABOUT_VISUALS.processC.imageAlt} />
              <div className="about-gallery__overlay">
                <span className="badge">Renovation Sensitivity</span>
                <h3>{ABOUT_VISUALS.processC.title}</h3>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section section-brown-soft">
        <div className="container">
          <AnimatedSection>
            <div className="section-label"><span className="overline">What Drives Us</span></div>
            <h2 className="heading-1" style={{ marginBottom: '3rem' }}>Our Core Values</h2>
          </AnimatedSection>
          <div className="grid-3 about-values">
            {VALUES.map((value, index) => (
              <AnimatedSection key={value.title} delay={(index % 3) + 1}>
                <div className="card about-value-card">
                  <div className="about-value-card__icon">{value.icon}</div>
                  <h3 className="heading-3">{value.title}</h3>
                  <p className="body-sm about-value-card__desc">{value.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section roadmap-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-label"><span className="overline">Our Journey</span></div>
            <h2 className="heading-1 roadmap-section__title">Milestones & Roadmap</h2>
            <p className="lead roadmap-section__lead">
              How we grew from a small local team of designers to one of Chennai&apos;s premier interior firms.
            </p>
          </AnimatedSection>

          <div className="roadmap">
            <div className="roadmap__line" />
            <div className="roadmap__progress">
              <span className="roadmap__progress-label">Growth trajectory</span>
              <span className="roadmap__progress-value">2008 to 2024</span>
            </div>
            <div className="roadmap__particles" aria-hidden="true">
              {Array.from({ length: 18 }).map((_, index) => (
                <span key={index} className={`roadmap__particle roadmap__particle--${(index % 6) + 1}`} />
              ))}
            </div>

            {MILESTONES.map((milestone) => (
              <div key={milestone.year} className="roadmap__item">
                <div className="roadmap__dot-container">
                  <div className="roadmap__dot" />
                </div>

                <div className="roadmap__card">
                  <div className="roadmap__header">
                    <div className="roadmap__badge">
                      {getMilestoneIcon(milestone.iconName)}
                    </div>
                    <div className="roadmap__year">{milestone.year}</div>
                  </div>
                  <h3 className="roadmap__title">{milestone.title}</h3>
                  <p className="roadmap__desc">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <AnimatedSection>
            <div className="section-label"><span className="overline">The People</span></div>
            <h2 className="heading-1" style={{ marginBottom: '3rem' }}>Meet Our Team</h2>
          </AnimatedSection>

          <AnimatedSection delay={2}>
            <div className="about-founder-layout">
              {/* Left Column: Founder Card Info */}
              <div className="about-founder__card">
                <div className="about-founder__avatar">M</div>
                <div className="about-founder__meta">
                  <h3 className="about-founder__name">Mohana Rao</h3>
                  <span className="about-founder__role">Founder & Principal Designer</span>
                </div>
                <p className="about-founder__bio">
                  Mohana Rao established De Interio Cafe in 2008 with a passion for designing residential and commercial spaces that blend aesthetic excellence with everyday practicality. Over the past 15+ years, he has guided the firm from a boutique Chennai studio into a premier interior design brand, leading projects with an unwavering focus on details, craftsmanship, and custom finishes.
                </p>
              </div>

              {/* Right Column: Small Photo & Quote */}
              <div className="about-founder__right">
                <div className="about-founder__image-wrap">
                  <img src={ourStoryImage} alt="Mohana Rao - De Interio Cafe Design Studio" />
                </div>
                <div className="about-founder__quote-card">
                  <p className="about-founder__quote-text">
                    &quot;Design is not just about placing furniture; it's about translating personal stories and daily rituals into spaces that feel premium, warm, and timeless.&quot;
                  </p>
                  <span className="about-founder__quote-author">— Mohana Rao</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section--sm section-brown">
        <div className="container" style={{ textAlign: 'center' }}>
          <AnimatedSection>
            <h2 className="heading-1" style={{ marginBottom: '1rem' }}>Ready to work with us?</h2>
            <p className="lead" style={{ marginBottom: '2rem' }}>Let&apos;s create something extraordinary together.</p>
            <Link to="/contact" className="btn btn-primary" id="about-contact-cta">Get in Touch</Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  )
}
