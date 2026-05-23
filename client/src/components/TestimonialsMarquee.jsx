import React from 'react'
import { Star, Home, Briefcase, Coffee, Sparkles, GraduationCap } from 'lucide-react'
import './TestimonialsMarquee.css'

const DEFAULT_TESTIMONIALS = [
  {
    name: 'Arun Prakash',
    role: 'Homeowner, Chennai',
    project: 'Spectra By Keystone',
    quote: 'De Interio Cafe designed our home with exceptional attention to detail. The spaces are both functional and stunning. Highly recommended!',
    rating: 5,
    type: 'Residential',
    location: 'CHENNAI'
  },
  {
    name: 'Nandhini Ramesh',
    role: 'Homeowner, Bangalore',
    project: 'Modern Home',
    quote: 'They truly understood our vision and brought it to life beautifully. The team was professional, creative, and a pleasure to work with.',
    rating: 5,
    type: 'Residential',
    location: 'BANGALORE'
  },
  {
    name: 'Vignesh Subramani',
    role: 'Homeowner, Erode',
    project: 'Modern Duplex',
    quote: 'From concept to execution, everything was seamless. Our home looks elegant, comfortable, and timeless. Thank you for the amazing work!',
    rating: 5,
    type: 'Residential',
    location: 'ERODE'
  },
  {
    name: 'Kavya Balaji',
    role: 'Homeowner, Vellore',
    project: 'Modern Duplex',
    quote: 'The design, the quality, and the finishing - everything exceeded our expectations. De Interio Cafe made our dream home a reality.',
    rating: 5,
    type: 'Residential',
    location: 'VELLORE'
  },
  {
    name: 'Harish Kumar',
    role: 'Villa Owner, Pondicherry',
    project: 'French-Themed Home',
    quote: 'We loved the way natural light and space were blended in our villa. It feels peaceful, modern, and uniquely ours.',
    rating: 5,
    type: 'Renovation',
    location: 'PONDICHERRY'
  },
  {
    name: 'Divya Suresh',
    role: 'Homeowner, Bangalore',
    project: 'Modern Villa Redesign',
    quote: 'Their creativity and design sense are outstanding. Every corner of our home feels thoughtfully designed and so inviting.',
    rating: 5,
    type: 'Residential',
    location: 'BANGALORE'
  },
  {
    name: 'Sridhar Rajan',
    role: 'Homeowner, Chennai',
    project: 'Modular Kitchen & Living',
    quote: 'A wonderful experience working with such a dedicated team. They delivered beyond what we imagined. Truly happy with the outcome!',
    rating: 5,
    type: 'Residential',
    location: 'CHENNAI'
  },
  {
    name: 'Meera Krishnan',
    role: 'Homeowner, Erode',
    project: 'Living Room Makeover',
    quote: "The team's professionalism and passion for design reflect in their work. Our home is beautiful and practical - just the way we wanted.",
    rating: 5,
    type: 'Residential',
    location: 'ERODE'
  }
]

const getCategoryIcon = (project) => {
  const p = (project || '').toLowerCase()
  if (p.includes('office') || p.includes('start') || p.includes('commercial')) {
    return <Briefcase size={22} />
  }
  if (p.includes('restaurant') || p.includes('hotel') || p.includes('dining')) {
    return <Coffee size={22} />
  }
  if (p.includes('school') || p.includes('administrative')) {
    return <GraduationCap size={22} />
  }
  if (p.includes('renovation') || p.includes('restoration') || p.includes('heritage')) {
    return <Sparkles size={22} />
  }
  return <Home size={22} />
}

const getCategoryName = (item) => {
  return (item.type || 'Residential').toUpperCase()
}

const getLocation = (item) => {
  if (item.location) return item.location.toUpperCase()
  const commaIndex = item.role ? item.role.indexOf(',') : -1
  if (commaIndex !== -1) {
    return item.role.substring(commaIndex + 1).trim().toUpperCase()
  }
  return 'CHENNAI'
}

function TestimonialCard({ item }) {
  const category = getCategoryName(item)
  const location = getLocation(item)
  const icon = getCategoryIcon(item.project)

  return (
    <div className="testi-card">
      {/* Centered squircle icon container */}
      <div className="testi-card__icon-section">
        <div className="testi-card__squircle">
          {icon}
        </div>
      </div>

      {/* Card Content Section */}
      <div className="testi-card__content">
        <div className="testi-card__step-badge">
          {category} &bull; {location}
        </div>

        <h3 className="testi-card__name">
          {item.name}
        </h3>

        <p className="testi-card__quote">
          &quot;{item.quote}&quot;
        </p>
      </div>

      {/* Bottom badges/pills section */}
      <div className="testi-card__footer">
        <div className="testi-card__divider" />
        <div className="testi-card__pills">
          <span className="testi-card__pill">
            {item.project || 'Interior Project'}
          </span>
          <span className="testi-card__pill testi-card__pill--rating">
            <Star size={10} fill="currentColor" stroke="none" style={{ marginRight: '2px', display: 'inline-block', verticalAlign: 'middle' }} />
            {(item.rating || 5).toFixed(1)} Rating
          </span>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsMarquee({ reviews = DEFAULT_TESTIMONIALS }) {
  if (!reviews || reviews.length === 0) {
    return null
  }

  // Split reviews into two tracks
  const mid = Math.ceil(reviews.length / 2)
  const track1Base = reviews.slice(0, mid)
  const track2Base = reviews.slice(mid)

  // Helper to repeat items until we have a comfortable length (at least 6-8 cards for smooth scrolling)
  const getRepeatedTrack = (baseArray) => {
    if (baseArray.length === 0) return []
    let track = [...baseArray]
    while (track.length < 6) {
      track = [...track, ...baseArray]
    }
    // Duplicate once more to support 50% translation infinite loop
    return [...track, ...track]
  }

  const track1 = getRepeatedTrack(track1Base)
  const track2 = getRepeatedTrack(track2Base)

  return (
    <div className="testi-marquee__container" aria-label="Client Testimonials Marquee">
      {track1.length > 0 && (
        <div className="testi-marquee__track testi-marquee__track--fwd">
          {track1.map((item, index) => (
            <TestimonialCard key={`${item.name}-row1-${index}`} item={item} />
          ))}
        </div>
      )}
      {track2.length > 0 && (
        <div className="testi-marquee__track testi-marquee__track--rev">
          {track2.map((item, index) => (
            <TestimonialCard key={`${item.name}-row2-${index}`} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
