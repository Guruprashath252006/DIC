import { useEffect, useRef } from 'react'
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
  Check,
  Users,
  Briefcase,
  CalendarClock,
} from 'lucide-react'
import AnimatedSection from '../components/AnimatedSection'
import { PORTFOLIO_PROJECTS } from '../data/portfolio'
import ourStoryImage from '../assets/home/our-story.webp'
import vaseDecor from '../assets/about/vase-decor.png'
import founderDecor from '../assets/about/founder-decor.png'
import './About.css'

const TEAM = [
  { name: 'Mohana Rao', role: 'Founder & Principal Designer', initial: 'M', image: ourStoryImage },
]

const VALUES = [
  { icon: <Target size={22} strokeWidth={1.5} />, title: 'Purpose-Driven', desc: 'Every design decision is intentional, serving both aesthetics and function.' },
  { icon: <Handshake size={22} strokeWidth={1.5} />, title: 'Client-First', desc: 'Your vision drives our process. We listen, collaborate, and deliver.' },
  { icon: <Clock size={22} strokeWidth={1.5} />, title: 'Timely Delivery', desc: 'We respect your time. On-time delivery is non-negotiable for us.' },
  { icon: <Leaf size={22} strokeWidth={1.5} />, title: 'Sustainable Choices', desc: 'Eco-conscious materials and practices are at the heart of our work.' },
  { icon: <Award size={22} strokeWidth={1.5} />, title: 'Quality Craftsmanship', desc: 'Premium materials and skilled artisans ensure lasting excellence.' },
  { icon: <Lightbulb size={22} strokeWidth={1.5} />, title: 'Innovation', desc: 'We blend timeless design with contemporary trends and technology.' },
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
    year: '2026',
    title: 'Future-Ready Leadership',
    event: 'Expanded into a more mature design brand with stronger execution systems, refined client journeys, and a roadmap built for the next phase of premium interiors.',
    iconName: 'Trophy',
    stage: '2026 Vision',
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
  // Small gold-framed photo shown top-left of the dark "Journey" band,
  // mirroring the larger ambient photo that bleeds in on the right.
  // Swap the index for whichever project photo you'd like to feature there.
  journeyFrame: PORTFOLIO_PROJECTS[3],
}

// Condensed checklist copy, paraphrased from the existing Core Values copy
// (kept 1:1 in meaning — nothing new claimed).
const AESTHETIC_CHECKLIST = [
  'Purpose-driven decisions in every design',
  'Your vision guides our entire process',
  'Premium materials, end-to-end execution',
]

// Stats for the dark "journey" band — all derived from real data already
// in this file (lead copy, 2019 milestone, and the milestone count).
const JOURNEY_STATS = [
  { icon: <Users size={20} strokeWidth={1.5} />, num: '15+', label: 'Years Experience' },
  { icon: <Briefcase size={20} strokeWidth={1.5} />, num: '300+', label: 'Projects Completed' },
  { icon: <CalendarClock size={20} strokeWidth={1.5} />, num: '06', label: 'Key Milestones' },
]

// Generic 4-step process copy — placeholder to fill this design slot,
// since a stated design process wasn't part of your existing content.
// Swap the titles/descriptions for your actual workflow whenever you're ready.
const PROCESS_STEPS = [
  { num: '01', title: 'Discovery', desc: 'Understanding your vision and needs.' },
  { num: '02', title: 'Planning', desc: 'Crafting the right plan and layout.' },
  { num: '03', title: 'Design', desc: 'Bringing the concept to life in 3D.' },
  { num: '04', title: 'Execution', desc: 'Building it with precision and care.' },
]

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

/**
 * Dried pampas / eucalyptus branch decoration, matching the reference image.
 * `withVase` renders it sitting in a small ceramic vase (as it appears twice
 * in the reference: bottom-right of the "aesthetics" section, and
 * bottom-left of the closing CTA section).
 * It drifts gently on scroll (a light parallax), so the motif reads
 * differently as you move down the page, the way it does in the reference.
 */
// A single delicate, pointed leaf silhouette (tip up), used as a template
// and re-positioned/rotated/scaled per sprig — reads as fine botanical line
// art rather than a cluster of plain ellipses.
function Leaflet({ x, y, rotate, scale = 1, opacity = 1 }) {
  return (
    <path
      d="M0,0 C2.6,-4 2.8,-11 0,-17 C-2.8,-11 -2.6,-4 0,0 Z"
      fill="currentColor"
      opacity={opacity}
      transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
    />
  )
}

function LeafMotif({ className, withVase = false, speed = 0.06 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const viewportCenter = window.innerHeight / 2
      const distance = rect.top + rect.height / 2 - viewportCenter
      el.style.transform = `translateY(${distance * -speed}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])

  // hand-placed sprigs along three graceful stems, thinning toward the tips —
  // fewer, finer leaves than a bushy cluster reads as refined dried pampas.
  const sprigs = [
    // main stem (base 110,205 → tip 100,40)
    [104, 165, -35, 0.95, 0.85], [116, 148, 28, 0.85, 0.8],
    [100, 128, -30, 0.9, 0.8], [114, 108, 26, 0.8, 0.75],
    [98, 88, -28, 0.8, 0.7], [110, 66, 22, 0.7, 0.65],
    [101, 46, -20, 0.6, 0.6],
    // left stem (branches off around 108,150 → tip 55,95)
    [88, 140, -55, 0.75, 0.6], [72, 122, -48, 0.65, 0.55],
    [58, 102, -40, 0.55, 0.5],
    // right stem (branches off around 112,120 → tip 158,60)
    [128, 108, 45, 0.75, 0.55], [143, 88, 40, 0.65, 0.5],
    [156, 66, 32, 0.55, 0.45],
  ]

  return (
    <svg
      ref={ref}
      className={`a-leaf ${className || ''}`}
      viewBox="0 0 220 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {withVase && (
        <g opacity="0.9">
          <path
            d="M99,204 C95,210 92,219 94,228 C89,238 85,247 90,257 L128,257 C133,247 129,238 124,228 C126,219 123,210 119,204 C112,208 106,208 99,204 Z"
            fill="currentColor"
            opacity="0.1"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeOpacity="0.35"
          />
          <path d="M96,232 C104,235 114,235 122,232" stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.3" />
        </g>
      )}

      {/* stems — thin, tapering, naturalistic */}
      <path d="M110 205 C 105 155, 116 95, 100 40" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.55" />
      <path d="M108 150 C 90 140, 70 128, 55 95" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" opacity="0.45" />
      <path d="M112 120 C 128 112, 145 98, 158 60" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" opacity="0.45" />

      {sprigs.map(([x, y, rotate, scale, opacity], i) => (
        <Leaflet key={i} x={x} y={y} rotate={rotate} scale={scale} opacity={opacity} />
      ))}

      <circle cx="100" cy="40" r="1.6" fill="currentColor" opacity="0.6" />
    </svg>
  )
}

/**
 * Sparse scattered gold dots connected by faint broken (dashed) lines,
 * softly blurred — the bokeh-like accent scattered across the dark
 * "Journey" band in the reference design.
 */
function GoldDotsMotif({ className }) {
  const dots = [
    [90, 70, 2.2], [230, 150, 1.6], [330, 55, 2], [470, 190, 1.4],
    [70, 240, 1.6], [510, 90, 1.8], [600, 270, 1.3], [170, 300, 2],
    [410, 330, 1.5], [670, 150, 1.7], [20, 140, 1.3], [550, 300, 2.1],
    [260, 260, 1.4], [630, 60, 1.5],
  ]
  const lines = [
    'M55,75 L215,145',
    'M295,50 L410,130',
    'M460,180 L590,255',
    'M90,235 L250,290',
    'M505,85 L640,155',
    'M180,290 L390,325',
  ]
  return (
    <svg
      className={`a-journey-dots ${className || ''}`}
      viewBox="0 0 720 400"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <filter id="goldDotBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.3" />
        </filter>
      </defs>
      <g stroke="var(--a-gold)" strokeWidth="1" strokeDasharray="4 9" opacity="0.32" filter="url(#goldDotBlur)">
        {lines.map((d, i) => <path key={i} d={d} />)}
      </g>
      <g fill="var(--a-gold)" filter="url(#goldDotBlur)">
        {dots.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} opacity={0.45 + (i % 3) * 0.18} />
        ))}
      </g>
    </svg>
  )
}

export default function About() {
  return (
    <main className="about-page">
      {/* HERO */}
      <section className="page-hero a-hero">
        <div className="container a-hero__grid">
          <AnimatedSection className="a-hero__content">
            <p className="overline">Our Story</p>
            <h1 className="heading-1 a-hero__heading">
              Designing Spaces.
              <br />
              <em>Building Relationships.</em>
            </h1>
            <span className="a-underline" aria-hidden="true" />
            <p className="lead a-hero__lead">
              For over 15 years, De Interio Cafe has been transforming spaces across Chennai
              with thoughtful design, premium craftsmanship, and an unwavering client-first approach.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={2} className="a-hero__visuals">
            <div className="a-hero__frame a-hero__frame--primary">
              <img src={ABOUT_VISUALS.heroPrimary.image} alt={ABOUT_VISUALS.heroPrimary.imageAlt} />
              <div className="a-hero__caption">
                <span>Residential Signature</span>
                <strong>{ABOUT_VISUALS.heroPrimary.title}</strong>
              </div>
            </div>
            <div className="a-hero__frame a-hero__frame--secondary">
              <img src={ABOUT_VISUALS.heroSecondary.image} alt={ABOUT_VISUALS.heroSecondary.imageAlt} />
            </div>
            <div className="a-hero__frame a-hero__frame--accent">
              <img src={ABOUT_VISUALS.heroAccent.image} alt={ABOUT_VISUALS.heroAccent.imageAlt} />
            </div>

            <div className="a-hero__stats">
              <div className="a-hero__stat">
                <Users size={20} strokeWidth={1.5} className="a-hero__stat-icon" />
                <span className="a-hero__stat-num">15+</span>
                <span className="a-hero__stat-label">Years Experience</span>
              </div>
              <div className="a-hero__stat">
                <Briefcase size={20} strokeWidth={1.5} className="a-hero__stat-icon" />
                <span className="a-hero__stat-num">300+</span>
                <span className="a-hero__stat-label">Projects Completed</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* AESTHETICS + MISSION / VISION */}
      <section className="section a-aesthetics">
        <LeafMotif className="a-leaf--top-right" />
        <div className="container a-aesthetics__grid">
          <AnimatedSection className="a-aesthetics__visual">
            <div className="a-aesthetics__img a-aesthetics__img--main">
              <img src={ABOUT_VISUALS.processA.image} alt={ABOUT_VISUALS.processA.imageAlt} />
            </div>
            <div className="a-aesthetics__img a-aesthetics__img--sub">
              <img src={ABOUT_VISUALS.processB.image} alt={ABOUT_VISUALS.processB.imageAlt} />
            </div>
            <div className="a-aesthetics__ring">
              <span>Crafted<br />with Purpose</span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={2} className="a-aesthetics__copy">
            <svg className="a-aesthetics__arc" viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M40 20 C 220 40, 260 180, 160 260 C 90 320, 100 370, 220 390" stroke="currentColor" strokeWidth="1" />
            </svg>
            <span className="overline">How We Design</span>
            <h2 className="heading-1">Visual thinking, material depth, and real-world functionality.</h2>
            <p className="lead a-aesthetics__lead">
              Every project moves through concept framing, layout refinement, and finish curation. This layout shows the kind of spaces and moods we build across homes, workplaces, and renovation projects.
            </p>

            <ul className="a-aesthetics__checklist">
              {AESTHETIC_CHECKLIST.map((item) => (
                <li key={item}>
                  <span className="a-aesthetics__check"><Check size={14} strokeWidth={2.5} /></span>
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>

        <div className="container about-mv">
          <img src={vaseDecor} alt="" className="a-story-vase" aria-hidden="true" />
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

        <LeafMotif className="a-leaf--bottom-right" withVase speed={0.03} />
      </section>

      {/* CORE VALUES */}
      <section className="section a-values-section">
        <div className="container a-values__grid">
          <AnimatedSection className="a-values__copy">
            <div className="section-label"><span className="overline">What Drives Us</span></div>
            <h2 className="heading-1">Our Core Values</h2>

            <div className="a-values__list">
              {VALUES.map((value, index) => (
                <AnimatedSection key={value.title} delay={(index % 3) + 1}>
                  <div className="about-value-card">
                    <div className="about-value-card__icon">{value.icon}</div>
                    <div>
                      <h3 className="heading-3">{value.title}</h3>
                      <p className="body-sm about-value-card__desc">{value.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={2} className="a-values__visual">
            <img src={ABOUT_VISUALS.processC.image} alt={ABOUT_VISUALS.processC.imageAlt} />
            <div className="a-values__quote">
              <p>&quot;Every detail we design is a step closer to your dream space.&quot;</p>
              <span>— De Interio Cafe</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* JOURNEY — dark full-bleed band: stats + timeline together, like the reference */}
      <section className="section roadmap-section">
        <GoldDotsMotif className="a-journey-dots--top" />
        <div className="a-journey-ambient" aria-hidden="true">
          <img src={ABOUT_VISUALS.heroAccent.image} alt="" />
          <div className="a-journey-ambient__glow" />
          <div className="a-journey-ambient__glow--low" />
          <div className="a-journey-ambient__fade" />
        </div>

        {/* Small gold-framed photo, top-left — mirrors the larger ambient
            photo bleeding in on the right, per the reference design. */}
        <div className="a-journey-frame">
          <img src={ABOUT_VISUALS.journeyFrame.image} alt={ABOUT_VISUALS.journeyFrame.imageAlt} />
        </div>

        <div className="roadmap-section__inner">
          <div className="container">

            {/* Numbers — minimal inline row, exactly like the reference */}
            <AnimatedSection className="a-journey-row">
              <div className="a-journey-heading">
                <div className="section-label"><span className="overline">Our Experience</span></div>
                <h2 className="heading-1 roadmap-section__title">
                  Numbers That Reflect Our <em>Journey.</em>
                </h2>
                <span className="a-underline" aria-hidden="true" />
              </div>

              <div className="a-journey-stats">
                {JOURNEY_STATS.map((stat) => (
                  <div className="a-journey-stat" key={stat.label}>
                    <span className="a-journey-stat__icon">{stat.icon}</span>
                    <span className="a-journey-stat__num">{stat.num}</span>
                    <span className="a-journey-stat__label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Process — gold-bordered glass cards with a connecting line, like the reference.
                Note: these 4 steps are generic placeholder copy (not pulled from your existing
                content) since your site didn't have a stated process yet — adjust the wording
                to match how you actually describe your workflow. */}
            <AnimatedSection delay={2} className="a-process-row">
              <div className="a-process-heading">
                <div className="section-label"><span className="overline">Our Process</span></div>
                <h2 className="heading-1 roadmap-section__title">
                  From Concept to <em>Creation.</em>
                </h2>
                <span className="a-underline" aria-hidden="true" />
                <p className="lead roadmap-section__lead a-process-lead">
                  A seamless journey from idea to reality, with complete design transparency.
                </p>
              </div>

              <div className="a-process-cards">
                <svg className="a-process-connector" viewBox="0 0 620 40" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M20 30 C 160 -10, 220 45, 320 20 C 420 -5, 480 40, 600 15" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 6" fill="none" />
                </svg>
                {PROCESS_STEPS.map((step) => (
                  <div className="a-process-card" key={step.num}>
                    <span className="a-process-card__dot" />
                    <span className="a-process-card__num">{step.num}</span>
                    <h3 className="a-process-card__title">{step.title}</h3>
                    <p className="a-process-card__desc">{step.desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={3}>
              <div className="section-label" style={{ marginTop: '5rem' }}><span className="overline">Our Journey</span></div>
              <h2 className="heading-1 roadmap-section__title">Milestones &amp; Roadmap</h2>
              <span className="a-underline" aria-hidden="true" />
              <p className="lead roadmap-section__lead">
                How we grew from a small local team of designers to one of Chennai&apos;s premier interior firms.
              </p>
            </AnimatedSection>

            <div className="roadmap">
              <div className="roadmap__line" aria-hidden="true" />
              <div className="roadmap__items">
                {MILESTONES.map((milestone, index) => (
                  <div key={milestone.year} className={`roadmap__item ${index % 2 === 0 ? 'roadmap__item--left' : 'roadmap__item--right'}`}>
                    <div className="roadmap__node" aria-hidden="true">
                      <span className="roadmap__node-dot" />
                    </div>
                    <article className="roadmap__card">
                      <span className="roadmap__watermark">{milestone.year}</span>

                      <div className="roadmap__card-top">
                        <span className="roadmap__index">{String(index + 1).padStart(2, '0')}</span>
                        <span className="roadmap__stage">{milestone.stage}</span>
                      </div>

                      <div className="roadmap__card-main">
                        <div className="roadmap__badge">
                          {getMilestoneIcon(milestone.iconName)}
                        </div>
                        <div className="roadmap__headline">
                          <div className="roadmap__year">{milestone.year}</div>
                          <h3 className="roadmap__title">{milestone.title}</h3>
                        </div>
                      </div>

                      <p className="roadmap__desc">{milestone.event}</p>

                      <div className="roadmap__footer">
                        <div className="roadmap__meter" aria-hidden="true">
                          <span className="roadmap__meter-bar" style={{ width: `${milestone.progress}%` }} />
                        </div>
                        <span className="roadmap__progress-note">{milestone.progress}% evolution</span>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="section a-founder-section">
        <div className="container">
          <div className="a-founder-top">
            <AnimatedSection className="a-founder-top__text">
              <div className="section-label"><span className="overline">The People</span></div>
              <h2 className="heading-1" style={{ marginBottom: '3rem' }}>Meet Our Team</h2>
            </AnimatedSection>
            <img src={founderDecor} alt="" className="a-founder-decor" aria-hidden="true" />
          </div>

          {TEAM.map((member) => (
            <AnimatedSection delay={2} key={member.name}>
              <div className="about-founder-layout">
                <div className="about-founder__card">
                  <div className="about-founder__avatar">{member.initial}</div>
                  <div className="about-founder__meta">
                    <h3 className="about-founder__name">{member.name}</h3>
                    <span className="about-founder__role">{member.role}</span>
                  </div>
                  <p className="about-founder__bio">
                    Mohana Rao established De Interio Cafe in 2008 with a passion for designing residential and commercial spaces that blend aesthetic excellence with everyday practicality. Over the past 15+ years, he has guided the firm from a boutique Chennai studio into a premier interior design brand, leading projects with an unwavering focus on details, craftsmanship, and custom finishes.
                  </p>
                </div>

                <div className="about-founder__right">
                  {/*<div className="about-founder__image-wrap">
                   <img src={member.image} alt={`${member.name} - De Interio Cafe Design Studio`} />
                  </div>*/}
                  <div className="about-founder__quote-card">
                    <p className="about-founder__quote-text">
                      &quot;Design is not just about placing furniture; it's about translating personal stories and daily rituals into spaces that feel premium, warm, and timeless.&quot;
                    </p>
                    <span className="about-founder__quote-author">— {member.name}</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section--sm a-cta-section">
        <LeafMotif className="a-leaf--cta" withVase speed={0.03} />
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