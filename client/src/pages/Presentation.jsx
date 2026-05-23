import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Maximize2, Minimize2, Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react'
import './Presentation.css'

// Topic-Suited Background Images
import ourStoryImg from '../assets/home/our-story.png'
import modernVillaImg from '../assets/portfolio/modern-villa-boat-club-road.png'
import livingRoomImg from '../assets/design-ideas/living-room.png'
import kitchenImg from '../assets/design-ideas/kitchen.png'
import restaurantImg from '../assets/portfolio/restaurant-t-nagar.png'
import corporateHqImg from '../assets/portfolio/corporate-hq-anna-salai.png'
import boutiqueCafeImg from '../assets/portfolio/boutique-cafe-nungambakkam.png'
import penthouseRenovationImg from '../assets/portfolio/penthouse-renovation-ecr.png'

const PRESENTATION_SLIDES = [
  {
    category: 'DE INTERIO CAFÉ',
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

// Animated Canvas Backdrop logic
function CanvasBackdrop({ isPaused }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    let width = 0
    let height = 0
    let dpr = 1
    let frameId = 0

    // Setup colors matching the warm gold / brown palette
    const colors = {
      darkBrown: '#150d08',
      mediumBrown: '#23150d',
      goldAccent: '184, 154, 66',     // #b89a42
      champagne: '209, 184, 122',     // #d1b87a
      cream: '#fcfaf6',
      softBlack: '#0a0604'
    }

    // Set up particles
    const particles = Array.from({ length: 60 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      size: 1 + Math.random() * 2.5,
      speed: 0.02 + Math.random() * 0.05,
      opacity: 0.15 + Math.random() * 0.45,
      phase: Math.random() * Math.PI * 2
    }))

    // Setup floating streaks/lines
    const streaks = Array.from({ length: 6 }, (_, i) => ({
      baseY: 0.2 + i * 0.12,
      length: 0.3 + Math.random() * 0.3,
      speed: 0.0004 + Math.random() * 0.0006,
      phase: i * 1.5,
      thickness: 1.5 + Math.random() * 2
    }))

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.parentElement.clientWidth
      height = canvas.parentElement.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const drawBackground = () => {
      // Clear the canvas to make it transparent, showing the background image underneath
      context.clearRect(0, 0, width, height)
    }

    const drawGoldStreaks = (time) => {
      context.save()
      context.globalCompositeOperation = 'screen'
      
      streaks.forEach((streak, index) => {
        const drift = Math.sin(time * streak.speed + streak.phase) * (height * 0.08)
        const xOffset = ((time * streak.speed * 10 + streak.phase * 100) % (width + 300)) - 150
        const y = height * streak.baseY + drift

        const grad = context.createLinearGradient(xOffset, y, xOffset + width * streak.length, y)
        grad.addColorStop(0, `rgba(${colors.goldAccent}, 0)`)
        grad.addColorStop(0.5, `rgba(${colors.champagne}, 0.22)`)
        grad.addColorStop(1, `rgba(${colors.goldAccent}, 0)`)

        context.beginPath()
        context.moveTo(xOffset, y)
        context.lineTo(xOffset + width * streak.length, y)
        context.strokeStyle = grad
        context.lineWidth = streak.thickness
        context.stroke()
      })

      context.restore()
    }

    const drawParticles = (time) => {
      context.save()
      context.globalCompositeOperation = 'screen'

      particles.forEach((p) => {
        const sway = Math.sin(time * 0.0005 + p.phase) * 15
        const px = (p.x * width + time * p.speed + sway) % width
        const py = (p.y * height - time * p.speed * 0.3) % height
        const alpha = p.opacity * (0.3 + Math.abs(Math.sin(time * 0.001 + p.phase)) * 0.7)

        context.beginPath()
        context.arc(px, py, p.size, 0, Math.PI * 2)
        context.fillStyle = `rgba(${colors.champagne}, ${alpha})`
        context.shadowColor = `rgba(${colors.goldAccent}, 0.6)`
        context.shadowBlur = p.size * 2
        context.fill()
      })

      context.restore()
    }

    const drawAmbientGlows = (time) => {
      context.save()
      context.globalCompositeOperation = 'screen'

      // Slow moving gold lighting blobs
      const glows = [
        { cx: 0.15, cy: 0.25, r: 0.38, color: colors.goldAccent, alpha: 0.12, speed: 0.00015, phase: 0 },
        { cx: 0.85, cy: 0.75, r: 0.44, color: colors.champagne, alpha: 0.08, speed: 0.00012, phase: Math.PI * 0.5 },
        { cx: 0.5, cy: 0.5, r: 0.28, color: colors.goldAccent, alpha: 0.05, speed: 0.0002, phase: Math.PI }
      ]

      glows.forEach((g) => {
        const x = width * g.cx + Math.cos(time * g.speed + g.phase) * 60
        const y = height * g.cy + Math.sin(time * g.speed + g.phase) * 60
        const radius = Math.max(width, height) * g.r

        const radial = context.createRadialGradient(x, y, 0, x, y, radius)
        radial.addColorStop(0, `rgba(${g.color}, ${g.alpha})`)
        radial.addColorStop(0.4, `rgba(${g.color}, ${g.alpha * 0.3})`)
        radial.addColorStop(1, 'rgba(0, 0, 0, 0)')

        context.fillStyle = radial
        context.fillRect(x - radius, y - radius, radius * 2, radius * 2)
      })

      context.restore()
    }

    const drawArchitecturalArt = (time) => {
      context.save()
      context.strokeStyle = `rgba(${colors.champagne}, 0.06)`
      context.lineWidth = 1
      context.setLineDash([5, 8])

      const sway = Math.sin(time * 0.0001) * 20

      // Draw floating arch silhouettes
      for (let i = 0; i < 3; i++) {
        const r = Math.min(width, height) * (0.2 + i * 0.08)
        const cx = width * 0.88 + sway
        const cy = height * 0.95

        context.beginPath()
        context.arc(cx, cy, r, Math.PI, Math.PI * 1.5)
        context.stroke()
      }

      // Draw perspective room lines
      context.beginPath()
      // Top Left corner lines
      context.moveTo(width * 0.05 + sway, height * 0.05)
      context.lineTo(width * 0.2, height * 0.25)
      context.lineTo(width * 0.2, height * 0.75)
      context.lineTo(width * 0.05 + sway, height * 0.95)

      // Ceiling panels outlines
      context.moveTo(width * 0.2, height * 0.25)
      context.lineTo(width * 0.8, height * 0.25)

      context.stroke()
      context.restore()
    }

    let lastTime = 0
    let accumulatedTime = 0

    const loop = (timestamp) => {
      if (!lastTime) lastTime = timestamp
      const elapsed = timestamp - lastTime
      lastTime = timestamp

      if (!isPaused) {
        accumulatedTime += elapsed
      }

      drawBackground()
      drawAmbientGlows(accumulatedTime)
      drawArchitecturalArt(accumulatedTime)
      drawGoldStreaks(accumulatedTime)
      drawParticles(accumulatedTime)

      frameId = window.requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)
    frameId = window.requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('resize', resize)
      window.cancelAnimationFrame(frameId)
    }
  }, [isPaused])

  return <canvas ref={canvasRef} className="pres-canvas" />
}

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
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
        {/* Luxury Canvas Backdrop */}
        <CanvasBackdrop isPaused={isPaused} />

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
                <span className="pres-logo__icon">▲</span>
                De Interio Café
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
              <button 
                onClick={() => setIsPaused(!isPaused)} 
                className={`pres-btn ${isPaused ? 'active' : ''}`}
                aria-label={isPaused ? 'Resume Background' : 'Pause Background'}
              >
                {isPaused ? <Play size={16} /> : <Pause size={16} />}
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
