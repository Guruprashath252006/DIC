import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Home, ScanSearch, Ruler, Layers3, Hammer } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import './ServiceDetail.css'

const SERVICES = {
  'signature-interiors': {
    title: 'Signature Interior Projects',
    icon: Layers3,
    img: '/images/services/residential.png',
    tagline: 'Unified design for modern living and modern business.',
    desc: 'Our signature project service brings homes, workplaces, retail environments, and hospitality spaces under one refined design framework. We combine usability, brand fit, comfort, and technical precision so the result works beautifully for normal day-to-day life as well as professional expectations.',
    includes: ['Project Discovery and Design Brief', 'Space Planning and Zoning', 'Mood Boards and Material Direction', 'Photorealistic 3D Visualization', 'Lighting, Furniture, and Storage Strategy', 'Kitchen, Workstation, and Common Area Design', 'Brand and Lifestyle Alignment', 'Execution Drawings and Site Coordination', 'Vendor and Finish Selection', 'Final Styling and Handover'],
    duration: '6 to 20 weeks',
    suitable: 'Homes, offices, retail, hospitality, mixed-use spaces',
    start: 'Custom quote based on scope'
  },
  'full-home': {
    title: 'Full Home Interiors',
    icon: Home,
    img: '/images/services/residential.png',
    tagline: 'Complete transformation, room by room.',
    desc: 'Our full home interior service is a comprehensive, end-to-end design experience covering every room in your home. From initial space planning and concept development to furniture procurement, execution, and final styling, we manage every detail so you can enjoy a seamless transformation.',
    includes: ['Space Planning and Layout', 'Concept and Mood Board', '3D Visualization', 'Material and Finish Selection', 'Modular Kitchen Design', 'Bedroom and Living Room Design', 'Bathroom Design', 'Execution and Site Management', 'Furniture and Decor Sourcing', 'Final Styling and Handover'],
    duration: '3 to 6 months',
    suitable: 'New homes, flats, villas',
    start: 'Rs. 8L onwards'
  },
  'specific-area': {
    title: 'Specific Area Interiors',
    icon: ScanSearch,
    img: '/images/rooms/living-room.png',
    tagline: 'Perfect one room at a time.',
    desc: 'Not ready for a full home overhaul? Our specific area interior service lets you transform individual rooms or areas with the same premium quality and attention to detail as our complete home packages.',
    includes: ['Single Room Design', 'Concept and 3D Render', 'Material Selection', 'Custom Furniture Design', 'Lighting Plan', 'Execution and Supervision', 'Styling and Accessorizing'],
    duration: '3 to 8 weeks per area',
    suitable: 'Any individual room',
    start: 'Rs. 1.5L per room'
  },
  'space-planning': {
    title: 'Space Planning',
    icon: Ruler,
    img: '/images/rooms/home-office.png',
    tagline: 'Maximize every square foot.',
    desc: 'Effective space planning is the foundation of great interior design. Our space planning service optimizes your floor layout for flow, function, and future flexibility whether you are building new or reconfiguring an existing space.',
    includes: ['Existing Layout Analysis', 'Traffic Flow Optimization', 'Furniture Arrangement Plans', 'Multi-functional Space Design', 'Storage Strategy', 'Zoning and Room Separation', '2D and 3D Floor Plans'],
    duration: '1 to 2 weeks',
    suitable: 'All property types',
    start: 'Rs. 25,000 onwards'
  },
  renovation: {
    title: 'Renovation Interior',
    icon: Hammer,
    img: '/images/services/renovation.png',
    tagline: 'Old space, brand new story.',
    desc: 'Breathe new life into your existing property. Our renovation service handles everything from minor cosmetic updates to complete structural transformations with minimal disruption and on-time delivery.',
    includes: ['Renovation Scope Assessment', 'Structural Changes Planning', 'False Ceiling and Flooring', 'Wall Treatment and Paint', 'Electrical and Plumbing Upgrades', 'Kitchen and Bathroom Renovation', 'New Furniture and Fixtures', 'Before and After Documentation', 'Waste Disposal Management', 'Quality Inspection and Handover'],
    duration: '4 to 12 weeks',
    suitable: 'Apartments, villas, commercial spaces',
    start: 'Rs. 3L onwards'
  }
}

export default function ServiceDetail() {
  const { serviceId } = useParams()
  const normalizedServiceId = {
    commercial: 'signature-interiors',
    residential: 'signature-interiors',
  }[serviceId] || serviceId
  const service = SERVICES[normalizedServiceId]

  if (!service) {
    return (
      <main style={{ textAlign: 'center', padding: '10rem 2rem' }}>
        <h1 className="heading-1">Service Not Found</h1>
        <Link to="/services" className="btn btn-primary" style={{ marginTop: '2rem' }}>Back to Services</Link>
      </main>
    )
  }

  const Icon = service.icon

  return (
    <main>
      <section className="room-hero service-hero">
        <img src={service.img} alt={service.title} className="room-hero__img" />
        <div className="room-hero__overlay service-hero__overlay" />
        <div className="container room-hero__content">
          <AnimatedSection>
            <Link to="/services" className="room-hero__back">Back to all services</Link>
            <div className="service-hero__icon">
              <Icon size={24} strokeWidth={1.8} />
            </div>
            <p className="overline" style={{ marginBottom: '0.75rem' }}>{service.tagline}</p>
            <h1 className="display room-hero__title">{service.title}</h1>
            <p className="lead room-hero__desc">{service.desc}</p>
            <div className="room-hero__ctas">
              <Link to="/contact" className="btn btn-primary" id={`svc-cta-${normalizedServiceId}`}>Get Free Quote</Link>
              <Link to="/portfolio" className="btn btn-outline">View Projects</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section">
        <div className="container svc-detail-grid">
          <AnimatedSection className="svc-includes">
            <div className="section-label"><span className="overline">What&apos;s Included</span></div>
            <h2 className="heading-2 svc-includes__heading">Everything we handle for you</h2>
            <div className="svc-includes__list">
              {service.includes.map((item, index) => (
                <div key={item} className="svc-include-card">
                  <span className="svc-include-card__index">{String(index + 1).padStart(2, '0')}</span>
                  <div className="svc-include-card__icon">
                    <Icon size={16} strokeWidth={1.8} />
                  </div>
                  <h3 className="svc-include-card__title">{item}</h3>
                  <p className="svc-include-card__text">Planned and delivered with premium detailing and execution support.</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={2} className="svc-meta">
            <div className="svc-meta__card">
              <h3 className="svc-meta__title">Project Info</h3>
              <div className="svc-meta__row"><span>Duration</span><strong>{service.duration}</strong></div>
              <div className="svc-meta__row"><span>Suitable For</span><strong>{service.suitable}</strong></div>
              <div className="svc-meta__row"><span>Starting From</span><strong style={{ color: 'var(--accent)' }}>{service.start}</strong></div>
            </div>
            <div className="svc-meta__cta-card">
              <h3>Start Your Project</h3>
              <p className="body-sm">Get a free consultation and custom quote for your project.</p>
              <Link to="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} id={`svc-detail-cta-${normalizedServiceId}`}>Book Free Consultation</Link>
              <a href="https://wa.me/919500078674" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem' }}>WhatsApp Us</a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  )
}
