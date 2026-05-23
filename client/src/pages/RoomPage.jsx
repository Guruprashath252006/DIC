import React from 'react'
import { useParams, Link } from 'react-router-dom'
import AnimatedSection from '../components/AnimatedSection'
import { ROOM_DATA } from '../data/designIdeas'
import './RoomPage.css'

export default function RoomPage() {
  const { roomId } = useParams()
  const room = ROOM_DATA[roomId]

  if (!room) {
    return (
      <main style={{ paddingTop: 'var(--nav-h)', textAlign: 'center', padding: '10rem 2rem' }}>
        <h1 className="heading-1">Page Not Found</h1>
        <Link to="/design-ideas" className="btn btn-primary" style={{ marginTop: '2rem' }}>Back to Design Ideas</Link>
      </main>
    )
  }

  return (
    <main>
      <section className="room-hero">
        <img src={room.img} alt={room.label} className="room-hero__img" />
        <div className="room-hero__overlay" />
        <div className="container room-hero__content">
          <AnimatedSection>
            <Link to="/design-ideas" className="room-hero__back">
              ← Design Ideas
            </Link>
            <h1 className="display room-hero__title">{room.label} <br /><em>Design Ideas</em></h1>
            <p className="lead room-hero__desc">{room.desc}</p>
            <div className="room-hero__ctas">
              <Link to="/contact" className="btn btn-primary" id={`room-consult-${roomId}`}>Get This Look</Link>
              <Link to="/portfolio" className="btn btn-outline" id={`room-portfolio-${roomId}`}>View Portfolio</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <AnimatedSection>
            <div className="section-label"><span className="overline">Explore {room.label} Ideas</span></div>
            <h2 className="heading-1" style={{ marginBottom: '3rem' }}>Popular Concepts</h2>
          </AnimatedSection>
          <div className="room-ideas-grid">
            {room.ideas.map((idea, index) => (
              <AnimatedSection key={idea.title} delay={(index % 4) + 1} className="room-idea-card">
                <div className="room-idea-card__inner">
                  <div className="room-idea-card__img-wrap">
                    <img src={idea.img} alt={idea.title} loading="lazy" className="room-idea-card__img" />
                    <div className="room-idea-card__overlay" />
                    <span className="badge room-idea-card__num">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="room-idea-card__body">
                    <h3 className="room-idea-card__title">{idea.title}</h3>
                    <Link to="/contact" className="room-idea-card__link" id={`idea-${roomId}-${index}`}>
                      Enquire
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="home-cta-band">
        <div className="container">
          <AnimatedSection className="home-cta-band__inner">
            <div>
              <h2 className="heading-1 home-cta-band__heading">Want This Design in Your Home?</h2>
              <p className="lead home-cta-band__lead">Our {room.label.toLowerCase()} specialists will turn your vision into reality.</p>
            </div>
            <div className="home-cta-band__actions">
              <Link to="/contact" className="btn btn-primary" id={`room-cta-${roomId}`}>Book Free Consultation</Link>
              <a href={`https://wa.me/919500078674?text=Hi! I'm interested in ${room.label} design ideas from De Interio Cafe.`} target="_blank" rel="noreferrer" className="btn btn-outline">WhatsApp Us</a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  )
}
