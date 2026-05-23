import React, { useState } from 'react'
import AnimatedSection from '../components/AnimatedSection'
import TestimonialsMarquee from '../components/TestimonialsMarquee'
import './Testimonials.css'

const ALL_TESTIMONIALS = [
  {
    name: 'Arun Prakash',
    role: 'Homeowner, Chennai',
    type: 'Residential',
    rating: 5,
    quote: 'De Interio Cafe designed our home with exceptional attention to detail. The spaces are both functional and stunning. Highly recommended!',
    project: 'Spectra By Keystone, Chennai',
  },
  {
    name: 'Nandhini Ramesh',
    role: 'Homeowner, Bangalore',
    type: 'Residential',
    rating: 5,
    quote: 'They truly understood our vision and brought it to life beautifully. The team was professional, creative, and a pleasure to work with.',
    project: 'Modern Home, Bangalore',
  },
  {
    name: 'Vignesh Subramani',
    role: 'Homeowner, Erode',
    type: 'Residential',
    rating: 5,
    quote: 'From concept to execution, everything was seamless. Our home looks elegant, comfortable, and timeless. Thank you for the amazing work!',
    project: 'Modern Duplex, Erode',
  },
  {
    name: 'Kavya Balaji',
    role: 'Homeowner, Vellore',
    type: 'Residential',
    rating: 5,
    quote: 'The design, the quality, and the finishing - everything exceeded our expectations. De Interio Cafe made our dream home a reality.',
    project: 'Modern Duplex, Vellore',
  },
  {
    name: 'Harish Kumar',
    role: 'Villa Owner, Pondicherry',
    type: 'Renovation',
    rating: 5,
    quote: 'We loved the way natural light and space were blended in our villa. It feels peaceful, modern, and uniquely ours.',
    project: 'French-Themed Home',
  },
  {
    name: 'Divya Suresh',
    role: 'Homeowner, Bangalore',
    type: 'Residential',
    rating: 5,
    quote: 'Their creativity and design sense are outstanding. Every corner of our home feels thoughtfully designed and so inviting.',
    project: 'Modern Villa Redesign',
  },
  {
    name: 'Sridhar Rajan',
    role: 'Homeowner, Chennai',
    type: 'Residential',
    rating: 5,
    quote: 'A wonderful experience working with such a dedicated team. They delivered beyond what we imagined. Truly happy with the outcome!',
    project: 'Modular Kitchen & Living',
  },
  {
    name: 'Meera Krishnan',
    role: 'Homeowner, Erode',
    type: 'Residential',
    rating: 5,
    quote: "The team's professionalism and passion for design reflect in their work. Our home is beautiful and practical - just the way we wanted.",
    project: 'Living Room Makeover',
  },
  {
    name: 'Roshini Krishnan',
    role: 'Villa Owner, Bangalore',
    type: 'Residential',
    rating: 5,
    quote: 'De Interio Cafe designed our independent villa with a perfect balance of modern luxury and nature-inspired openness. The spacious layouts, earthy textures, natural lighting, and seamless indoor-outdoor connection created a home that feels elegant, peaceful, and refreshing every single day. Their attention to detail, premium finishes, and thoughtful planning transformed the entire space into a warm and timeless living experience that truly exceeded our expectations.',
    project: 'Independent Villa, Bangalore',
  }
]

const FILTERS = ['All', 'Residential', 'Renovation']
const FEATURED_NAME = 'Roshini Krishnan'

export default function Testimonials() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? ALL_TESTIMONIALS : ALL_TESTIMONIALS.filter((testimonial) => testimonial.type === filter)
  const pinnedFeatured = ALL_TESTIMONIALS.find((testimonial) => testimonial.name === FEATURED_NAME)
  const featuredReview = (filter === 'All' || pinnedFeatured?.type === filter) ? pinnedFeatured : filtered[0]
  const gridReviews = filtered.filter((testimonial) => testimonial.name !== featuredReview?.name)

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <AnimatedSection>
            <p className="overline">Client Stories</p>
            <h1 className="heading-1 page-hero-heading">
              What Our Clients<br />
              <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Say About Us</em>
            </h1>
            <p className="lead page-hero-lead">
              Real words from real clients. Discover why families and businesses across Chennai trust De Interio Cafe with their most important spaces.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={2} className="testimonials-rating">
            <div className="testimonials-rating__score">4.9</div>
            <div className="testimonials-rating__details">
              <div className="stars">
                {Array(5).fill(0).map((_, index) => <span key={index}>★</span>)}
              </div>
              <p className="body-sm">Based on 200+ verified client reviews</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="portfolio-filter-bar">
        <div className="container">
          <AnimatedSection className="portfolio-filters">
            {FILTERS.map((filterOption) => (
              <button
                key={filterOption}
                id={`testimonial-filter-${filterOption.toLowerCase()}`}
                className={`portfolio-filter-btn${filter === filterOption ? ' active' : ''}`}
                onClick={() => setFilter(filterOption)}
              >
                {filterOption}
              </button>
            ))}
            <span className="portfolio-count">{filtered.length} Reviews</span>
          </AnimatedSection>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {featuredReview && (
            <AnimatedSection className="testimonial-spotlight">
              <div className="testimonial-spotlight__media">
                <span className="testimonial-spotlight__label">Highlighted Review</span>
                <div className="testimonial-spotlight__score">
                  <span className="testimonial-spotlight__score-num">{featuredReview.rating}.0</span>
                  <div className="stars">
                    {Array(featuredReview.rating).fill(0).map((_, index) => <span key={index}>★</span>)}
                  </div>
                </div>
              </div>
              <div className="testimonial-spotlight__content">
                <div className="testimonial-full-card__top">
                  <span className="badge">{featuredReview.type}</span>
                  <div className="testimonial-spotlight__project">{featuredReview.project}</div>
                </div>
                <blockquote className="testimonial-spotlight__quote">
                  "{featuredReview.quote}"
                </blockquote>
                <div className="testimonial-spotlight__author">
                  <div className="testimonial-card__avatar">{featuredReview.name.charAt(0)}</div>
                  <div>
                    <strong>{featuredReview.name}</strong>
                    <span className="body-sm">{featuredReview.role}</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )}

        </div>

        <AnimatedSection style={{ width: '100%', overflow: 'hidden', marginTop: '3.5rem' }}>
          <TestimonialsMarquee reviews={filtered} />
        </AnimatedSection>
      </section>

      <section className="section--sm" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <AnimatedSection>
            <h2 className="heading-2" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Rated Across Platforms</h2>
          </AnimatedSection>
          <div className="platform-ratings">
            {[
              { name: 'Google', rating: '4.9', reviews: '180+' },
              { name: 'Justdial', rating: '4.8', reviews: '90+' },
              { name: 'Houzz', rating: '5.0', reviews: '40+' },
              { name: 'Sulekha', rating: '4.7', reviews: '60+' },
            ].map((platform) => (
              <AnimatedSection key={platform.name} className="platform-rating-card">
                <div className="platform-rating-card__name">{platform.name}</div>
                <div className="platform-rating-card__score">{platform.rating}</div>
                <div className="stars" style={{ justifyContent: 'center' }}>
                  {Array(5).fill(0).map((_, index) => <span key={index}>★</span>)}
                </div>
                <div className="body-sm">{platform.reviews} reviews</div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
