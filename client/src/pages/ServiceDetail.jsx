import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Home, ScanSearch, Ruler, Layers3, Hammer } from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import './ServiceDetail.css'

const INCLUDE_DESCRIPTIONS = {
  // Signature / Full Home / Specific Area
  'Project Discovery and Design Brief': 'Initial scoping call and design consultation to establish goals, budget, design preferences, and set expectations.',
  'Space Planning and Zoning': 'Detailed analysis of layout opportunities to create logical zones and ensure highly natural spatial movement and flow.',
  'Mood Boards and Material Direction': 'Tactile selection of color palettes, wood species, stone finishes, and fabrics to set the aesthetic tone of the project.',
  'Photorealistic 3D Visualization': 'Creation of photo-accurate 3D renders so you can confidently preview lighting, proportions, and finishes before execution.',
  'Lighting, Furniture, and Storage Strategy': 'Strategic placement of lighting points, bespoke furniture selection, and space-saving smart storage layouts.',
  'Kitchen, Workstation, and Common Area Design': 'Detailed functional design of high-activity hubs to ensure workflow efficacy and visual unity.',
  'Brand and Lifestyle Alignment': 'Custom adjustments to tailor the space to your family routines, developer goals, or corporate culture.',
  'Execution Drawings and Site Coordination': 'Precision blueprints detailing measurements, electrical mappings, and plumbing layouts for build teams.',
  'Vendor and Finish Selection': 'Guided curation of raw materials, fixtures, custom paint finishes, and appliances from trusted, high-end providers.',
  'Final Styling and Handover': 'The art of curation: placing final decorative accents, accessories, plants, and cleaning up for immediate move-in.',
  
  // Duplicated / variations in lists
  'Space Planning and Layout': 'Logical floor layout generation and zoning boundaries designed to maximize circulation efficiency.',
  'Concept and Mood Board': 'Color theme and material direction board aligning visual styles before proceeding with detailed modeling.',
  'Material and Finish Selection': 'Physical curating of tile samples, wood finishes, paint coatings, and hardware components.',
  'Modular Kitchen Design': 'Bespoke cabinet planning, appliance garages, countertop strategy, and kitchen workflow layouts.',
  'Bedroom and Living Room Design': 'Custom media units, statement headboards, structural partitioning, and furniture layout.',
  'Bathroom Design': 'Spa-style zoning, glass partitioning, premium tiling, and high-quality sanitary fixtures installation planning.',
  'Execution and Site Management': 'Consistent on-site quality audits, team coordination, and project timeline tracking.',
  'Furniture and Decor Sourcing': 'Direct procurement from luxury partners, custom woodwork oversight, and decorative item gathering.',
  
  // Specific Area
  'Single Room Design': 'Focused design framework resolving layouts, storage, and visual concepts for one specific room.',
  'Concept and 3D Render': 'Interactive 3D models displaying space, lighting, and textures specifically for the chosen area.',
  'Custom Furniture Design': 'Bespoke design for study desks, customized beds, tv panels, and wardrobes unique to your room size.',
  'Lighting Plan': 'Cove lighting, accent pendants, wall sconces, and task light mapping to build the perfect room ambiance.',
  'Execution and Supervision': 'Complete build oversight, structural safety audits, and installation support of the room details.',
  'Styling and Accessorizing': 'Adding decorative accents, textures, frames, and greenery to give the space a finished, cozy feel.',
  
  // Space Planning
  'Existing Layout Analysis': 'In-depth audit of structural constraints, load-bearing walls, and window locations to optimize the raw space.',
  'Traffic Flow Optimization': 'Clearing movement paths, widening entryways, and planning clean passages to eliminate bottleneck zones.',
  'Furniture Arrangement Plans': 'Strategic scale drawing of furniture placement to secure comfortable legroom and perfect sightlines.',
  'Multi-functional Space Design': 'Flexible zoning enabling sections of the house to adapt to dining, study, play, or rest seamlessly.',
  'Storage Strategy': 'Bespoke vertical cabinetry, hidden nooks, and corner solutions to accommodate storage out of sight.',
  'Zoning and Room Separation': 'Aesthetic partitions, glass dividers, or soft paneling to categorize spaces without losing light.',
  '2D and 3D Floor Plans': 'Detailed orthogonal blueprints and interactive overhead 3D layouts for clear contractor guidance.',
  
  // Renovation
  'Renovation Scope Assessment': 'On-site technical evaluation to map cosmetic improvements, demolition needs, and utility upgrades.',
  'Structural Changes Planning': 'Detailed safety review and coordination to safely adjust walls, expand rooms, and alter doorways.',
  'False Ceiling and Flooring': 'Sophisticated ceiling layers, profile light integrations, and floor tiles or wooden flooring selection.',
  'Wall Treatment and Paint': 'Premium textures, wall panelings, wallpapers, and low-VOC paint coating layouts.',
  'Electrical and Plumbing Upgrades': 'Rewiring pathways, adding modular switch points, and upgrading pipe fittings for modern safety.',
  'Kitchen and Bathroom Renovation': 'Stripping and completely rebuilding utility zones with modern modular hardware and plumbing.',
  'New Furniture and Fixtures': 'Procuring statement furniture pieces and modern light fixtures that complement the new theme.',
  'Before and After Documentation': 'Side-by-side photographic tracking of the transformation, proving high execution accuracy.',
  'Waste Disposal Management': 'Responsible clean-up of site debris, scrap materials, and packaging for safe building handoff.',
  'Quality Inspection and Handover': 'End-to-end multi-point check of joints, locks, paint finishes, and final professional clean-up.'
}

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
            
            <div className="svc-includes__timeline">
              {service.includes.map((item, index) => (
                <div 
                  key={item} 
                  className="timeline-step"
                >
                  <div className="timeline-step__left">
                    <span className="timeline-step__number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="timeline-step__line-container">
                      <div className="timeline-step__dot" />
                      {index < service.includes.length - 1 && <div className="timeline-step__line" />}
                    </div>
                  </div>
                  
                  <div className="timeline-step__content">
                    <h3 className="timeline-step__title">{item}</h3>
                    <p className="timeline-step__desc">
                      {INCLUDE_DESCRIPTIONS[item] || 'Bespoke planning, curation, and delivery handled end-to-end by our expert studio team.'}
                    </p>
                  </div>
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
