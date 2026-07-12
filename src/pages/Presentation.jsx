import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Maximize2, Minimize2, Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react'
import BrandLogo from '../components/BrandLogo'
import './Presentation.css'

// Topic-Suited Background Images
import ourStoryImg from '../assets/home/our-story.webp'
import modernVillaImg from '../assets/portfolio/modern-villa-boat-club-road.webp'
import livingRoomImg from '../assets/design-ideas/living-room.webp'
import kitchenImg from '../assets/design-ideas/kitchen.webp'
import restaurantImg from '../assets/portfolio/restaurant-t-nagar.webp'
import corporateHqImg from '../assets/portfolio/corporate-hq-anna-salai.webp'
import boutiqueCafeImg from '../assets/portfolio/boutique-cafe-nungambakkam.webp'
import penthouseRenovationImg from '../assets/portfolio/penthouse-renovation-ecr.webp'

const PRESENTATION_SLIDES = [
  {
    category: 'DE INTERIO CAFE',
    title: 'Design Presentation',
    subtitle: 'Commercial & Residential Interiors',
    desc: 'A showcase of high-end, bespoke interior design concepts crafted for modern living and high-performance corporate workspaces.',
    stats: [
      { label: 'Founded', value: '2008' },
      { label: 'Completed Projects', value: '500+' },
      { label: 'Designers', value: '15+' }
    ],
    image: ourStoryImg
  },
  {
    category: 'RESIDENTIAL SIGNATURE',
    title: 'Warmth, Comfort & Sanctuary',
    subtitle: 'High-End Residential Interiors',
    desc: 'Designing spaces that reflect personal stories, daily rituals, and long-term livability. We balance natural light, organic textures, and premium layout planning.',
    stats: [
      { label: 'Avg. Project Area', value: '2,500 sq ft' },
      { label: 'Custom Finishes', value: '100%' },
      { label: 'Client Satisfaction', value: '98%' }
    ],
    image: modernVillaImg
  },
  {
    category: 'RESIDENTIAL',
    title: 'The Living Room Space',
    subtitle: 'Conversational Seating & Statement Units',
    desc: 'The social hub of the home. Features floating media walls, customized modular sectionals, nested coffee tables, and layered plaster ceilings with warm indirect LED coves.',
    stats: [
      { label: 'Seating Capacity', value: '8-12 Guests' },
      { label: 'Lighting Scenes', value: '4 Settings' },
      { label: 'Finish Language', value: 'Oak & Brass' }
    ],
    image: livingRoomImg
  },
  {
    category: 'RESIDENTIAL',
    title: 'The Modular Kitchen',
    subtitle: 'Ergonomic Work Triangles & Premium Stones',
    desc: 'Blending high-performance cooking workflows with premium aesthetics. Integrated appliance garages, quartz surfaces, seamless profile handles, and corner pull-out trays.',
    stats: [
      { label: 'Layout Style', value: 'Island / L-Shape' },
      { label: 'Pantry Type', value: 'Slide-Out' },
      { label: 'Hardware Warranty', value: 'Lifetime' }
    ],
    image: kitchenImg
  },
  {
    category: 'COMMERCIAL PRESTIGE',
    title: 'Structure, Brand & Presence',
    subtitle: 'High-Performance Commercial Spaces',
    desc: 'Inspiring workspaces designed to foster collaboration, productivity, and professional presence. Tailored corporate headquarters, boutique retail, and hospitality layouts.',
    stats: [
      { label: 'Corporate HQ Projects', value: '45+' },
      { label: 'Boutique Cafes', value: '12+' },
      { label: 'Space Optimization', value: 'Maximized' }
    ],
    image: restaurantImg
  },
  {
    category: 'COMMERCIAL',
    title: 'Corporate Headquarters',
    subtitle: 'Biophilic Design & Acoustic Clarity',
    desc: 'Modern tech and corporate offices featuring sound-dampening acoustic wall panels, vertical garden partition screens, adjustable standing desks, and intelligent cable pathways.',
    stats: [
      { label: 'Workstations', value: '150+ Seats' },
      { label: 'Acoustic Rating', value: '0.85 NRC' },
      { label: 'Greenery Areas', value: '15% of Space' }
    ],
    image: corporateHqImg
  },
  {
    category: 'COMMERCIAL',
    title: 'Boutique Retail & Cafes',
    subtitle: 'Immersive Customer Journeys',
    desc: 'Creating memorable sensory touchpoints. Elegant live-edge counter tables, custom brass lighting fixtures, accent wallpaper backdrops, and strategic customer flow layouts.',
    stats: [
      { label: 'Footfall Flow', value: 'Optimized' },
      { label: 'Material Theme', value: 'Stone & Copper' },
      { label: 'Visual Focal Points', value: '3 Zones' }
    ],
    image: boutiqueCafeImg
  },
  {
    category: 'EXECUTION DETAILS',
    title: 'Finishes & Craftsmanship',
    subtitle: 'From 3D Render to Real-world Precision',
    desc: 'Our design thinking translates seamlessly into final execution. Curated marble panels, warm wood cladding, matte-gold metal trims, and custom-engineered sliding partitions.',
    stats: [
      { label: 'On-Time Delivery', value: '100%' },
      { label: 'Material Sourcing', value: 'Global / Premium' },
      { label: 'Supervision', value: 'Daily Site Audit' }
    ],
    image: penthouseRenovationImg
  }
]

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showUi, setShowUi] = useState(true)
  const containerRef = useRef(null)

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % PRESENTATION_SLIDES.length)
  }

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + PRESENTATION_SLIDES.length) % PRESENTATION_SLIDES.length)
  }

  const toggleFullscreen = () => {
    const container = containerRef.current
    if (!container) return

    if (!document.fullscreenElement) {
      container.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(err => console.error(err))
    } else {
      document.exitFullscreen()
        .then(() => setIsFullscreen(false))
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen()
      } else if (e.key === 'h' || e.key === 'H') {
        setShowUi(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const slide = PRESENTATION_SLIDES[currentSlide]

  return (
    <main className="pres-page">
      <div 
        ref={containerRef} 
        className={`pres-container ${isFullscreen ? 'fullscreen' : ''} ${!showUi ? 'hide-ui' : ''}`}
      >
        {/* Slide-specific Background Image */}
        <div className="pres-bg-image-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 0.28, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="pres-bg-image"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          </AnimatePresence>
        </div>

        {/* Soft Glass Reflections and vignette */}
        <div className="pres-vignette" />
        <div className="pres-glass-reflection" />

        {/* Content Area */}
        <div className="pres-content-wrapper container">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="pres-slide"
            >
              {/* Category / Eyebrow */}
              <div className="pres-slide__category">
                <span className="pres-category-badge">{slide.category}</span>
              </div>

              {/* Title & Subtitle */}
              <h1 className="pres-slide__title">
                {slide.title}
                <br />
                <em className="pres-slide__subtitle">{slide.subtitle}</em>
              </h1>

              {/* Description */}
              <p className="pres-slide__desc">
                {slide.desc}
              </p>

              {/* Stats Block */}
              <div className="pres-slide__stats">
                {slide.stats.map((stat, i) => (
                  <div key={i} className="pres-stat">
                    <span className="pres-stat__value">{stat.value}</span>
                    <span className="pres-stat__label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Control Bar */}
        {showUi && (
          <div className="pres-controls">
            <div className="pres-controls__left">
              <span className="pres-logo">
                <BrandLogo markClassName="pres-logo__mark" textClassName="pres-logo__text" size={28} />
              </span>
              <span className="pres-divider" />
              <span className="pres-slide-indicator">
                {String(currentSlide + 1).padStart(2, '0')} / {String(PRESENTATION_SLIDES.length).padStart(2, '0')}
              </span>
            </div>

            <div className="pres-controls__center">
              <button onClick={handlePrev} className="pres-btn" aria-label="Previous Slide">
                <ChevronLeft size={16} />
              </button>
              <button onClick={handleNext} className="pres-btn" aria-label="Next Slide">
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="pres-controls__right">
              <button 
                onClick={() => setShowUi(false)} 
                className="pres-btn" 
                title="Hide Controls (Press H to toggle)"
              >
                <EyeOff size={16} />
              </button>
              <button 
                onClick={toggleFullscreen} 
                className="pres-btn" 
                title="Toggle Fullscreen (Press F)"
              >
                {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
            </div>
          </div>
        )}

        {/* UI Overlay Toggle Reminder (when UI is hidden) */}
        {!showUi && (
          <button 
            onClick={() => setShowUi(true)} 
            className="pres-floating-toggle"
            title="Show Controls"
          >
            <Eye size={16} />
          </button>
        )}
      </div>
    </main>
  )
}
