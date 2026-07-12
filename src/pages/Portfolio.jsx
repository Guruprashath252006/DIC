import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AnimatedSection from '../components/AnimatedSection'
import { PORTFOLIO_CATEGORIES, PORTFOLIO_PROJECTS } from '../data/portfolio'
import './Portfolio.css'

export default function Portfolio() {
  const [filter, setFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered = filter === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((project) => project.category === filter)

  useEffect(() => {
    if (!selectedProject) return undefined

    const handleEscape = (event) => {
      if (event.key === 'Escape') setSelectedProject(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [selectedProject])

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <AnimatedSection>
            <p className="overline">Our Work</p>
            <h1 className="heading-1 page-hero-heading">
              Award-Winning<br />
              <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Design Portfolio</em>
            </h1>
            <p className="lead page-hero-lead">
              500+ completed projects across residential, commercial, and hospitality sectors. Each one a story told through space.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="portfolio-filter-bar">
        <div className="container">
          <AnimatedSection className="portfolio-filters">
            {PORTFOLIO_CATEGORIES.map((category) => (
              <button
                key={category}
                id={`filter-${category.toLowerCase()}`}
                className={`portfolio-filter-btn${filter === category ? ' active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
            <span className="portfolio-count">{filtered.length} Projects</span>
          </AnimatedSection>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="portfolio-grid">
            {filtered.map((project) => (
              <div
                key={project.id}
                className={`portfolio-item${project.size === 'large' ? ' portfolio-item--large' : ''}`}
              >
                <button
                  type="button"
                  className="portfolio-card-full"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`View details for ${project.title}`}
                >
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="portfolio-card-full__image"
                  />
                  <div className="portfolio-card-full__pattern" />
                  <div className="portfolio-card-full__glow" />
                  <div className="portfolio-card-full__content">
                    <div className="portfolio-card-full__tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="badge">{tag}</span>
                      ))}
                    </div>
                    <div className="portfolio-card-full__info">
                      <h3 className="portfolio-card-full__title">{project.title}</h3>
                      <div className="portfolio-card-full__meta">
                        <span>{project.category}</span>
                        <span>&middot;</span>
                        <span>{project.area}</span>
                        <span>&middot;</span>
                        <span>{project.year}</span>
                      </div>
                    </div>
                  </div>
                  <div className="portfolio-card-full__hover">
                    <span className="portfolio-card-full__view">View Project</span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div className="portfolio-modal" onClick={() => setSelectedProject(null)}>
          <div
            className="portfolio-modal__dialog"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="portfolio-modal-title"
          >
            <button
              type="button"
              className="portfolio-modal__close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project details"
            >
              ×
            </button>
            <div className="portfolio-modal__media">
              <img src={selectedProject.image} alt={selectedProject.imageAlt} className="portfolio-modal__image" />
            </div>
            <div className="portfolio-modal__body">
              <div className="portfolio-modal__eyebrow">{selectedProject.category}</div>
              <h2 className="heading-2 portfolio-modal__title" id="portfolio-modal-title">{selectedProject.title}</h2>
              <p className="portfolio-modal__meta">
                <span>{selectedProject.location}</span>
                <span>&middot;</span>
                <span>{selectedProject.area}</span>
                <span>&middot;</span>
                <span>{selectedProject.year}</span>
              </p>
              <p className="lead portfolio-modal__summary">{selectedProject.summary}</p>
              <div className="portfolio-modal__tags">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="badge">{tag}</span>
                ))}
              </div>
              <div className="portfolio-modal__highlights">
                {selectedProject.highlights.map((highlight) => (
                  <div key={highlight} className="portfolio-modal__highlight">{highlight}</div>
                ))}
              </div>
              <div className="portfolio-modal__actions">
                <Link to="/contact" className="btn btn-primary" onClick={() => setSelectedProject(null)}>
                  Start a Similar Project
                </Link>
                <a href="tel:+919500078674" className="btn btn-outline">Call Our Team</a>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="section--sm" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <AnimatedSection>
            <h2 className="heading-1" style={{ marginBottom: '1rem' }}>Like What You See?</h2>
            <p className="lead" style={{ marginBottom: '2rem' }}>
              Let&apos;s create your dream space together.
            </p>
            <Link to="/contact" className="btn btn-primary" id="portfolio-cta">Start Your Project</Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  )
}
