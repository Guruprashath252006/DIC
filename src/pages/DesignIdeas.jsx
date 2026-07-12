import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AnimatedSection from '../components/AnimatedSection'
import {
  DESIGN_IDEA_CATEGORIES,
  DESIGN_IDEA_FILTER_MAP,
  DESIGN_IDEA_FILTER_TAGS,
} from '../data/designIdeas'
import './DesignIdeas.css'

export default function DesignIdeas() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? DESIGN_IDEA_CATEGORIES
    : DESIGN_IDEA_CATEGORIES.filter((category) => DESIGN_IDEA_FILTER_MAP[activeFilter]?.includes(category.id))

  return (
    <main>
      <section className="page-hero di-hero">
        <div className="container">
          <AnimatedSection>
            <p className="overline">Explore Inspirations</p>
            <h1 className="heading-1 page-hero-heading">
              Design Ideas &<br />
              <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Room Inspirations</em>
            </h1>
            <p className="lead page-hero-lead">
              Browse hundreds of curated interior design ideas across every room. From kitchens to kids&apos; bedrooms, find your perfect inspiration.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="portfolio-filter-bar">
        <div className="container">
          <AnimatedSection className="portfolio-filters">
            {DESIGN_IDEA_FILTER_TAGS.map((filter) => (
              <button
                key={filter}
                id={`di-filter-${filter.toLowerCase().replace(/\s+/g, '-')}`}
                className={`portfolio-filter-btn${activeFilter === filter ? ' active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
            <span className="portfolio-count">{filtered.length} Categories</span>
          </AnimatedSection>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="di-grid">
            {filtered.map((category, index) => (
              <AnimatedSection key={category.id} delay={(index % 4) + 1}>
                <Link
                  to={`/design-ideas/${category.id}`}
                  className="di-card"
                  id={`di-cat-${category.id}`}
                >
                  <div className="di-card__img-wrap">
                    <img
                      src={category.img}
                      alt={category.label}
                      className="di-card__img"
                      loading="lazy"
                    />
                    <div className="di-card__overlay" />
                    <span className="badge di-card__count">{category.count}+ Ideas</span>
                  </div>
                  <div className="di-card__body">
                    <h3 className="di-card__title">{category.label}</h3>
                    <p className="di-card__desc body-sm">{category.desc}</p>
                    <span className="di-card__arrow">
                      Explore Ideas
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section--sm" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <AnimatedSection>
            <h2 className="heading-1" style={{ marginBottom: '1rem' }}>Love What You See?</h2>
            <p className="lead" style={{ marginBottom: '2rem' }}>Our designers can create any of these looks in your own home.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-primary" id="di-consult-cta">Book Free Consultation</Link>
              <a href="/ecatalog.pdf" download className="btn btn-outline" id="di-ecatalog">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 15l-4-4h3V4h2v7h3l-4 4zM5 18h14v2H5v-2z" fill="currentColor" />
                </svg>
                Download E-Catalog
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  )
}
