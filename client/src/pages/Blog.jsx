import React from 'react'
import { Link } from 'react-router-dom'
import AnimatedSection from '../components/AnimatedSection'
import trends2024Image from '../assets/blog/insight-trends-2024.webp'
import colorPaletteImage from '../assets/blog/insight-color-palette.webp'
import penthouseRenovationImage from '../assets/blog/insight-penthouse-renovation.webp'
import officeWellbeingImage from '../assets/blog/insight-office-wellbeing.webp'
import modularKitchenImage from '../assets/blog/insight-modular-kitchen.webp'
import smallSpaceImage from '../assets/blog/insight-small-space.webp'
import sustainableMaterialsImage from '../assets/blog/insight-sustainable-materials.webp'
import './Blog.css'

const POSTS = [
  {
    id: 1,
    category: 'Trends',
    title: '2024 Interior Design Trends Shaping Chennai Homes',
    excerpt: 'From japandi minimalism to biophilic design, discover the interior trends defining luxury homes in Chennai this year.',
    readTime: '5 min read',
    date: 'April 15, 2024',
    tags: ['Trends', 'Residential'],
    featured: true,
    image: trends2024Image,
    imageAlt: 'Luxury Chennai living room showing warm contemporary 2024 interior design trends.',
  },
  {
    id: 2,
    category: 'Tips',
    title: 'How to Choose the Right Color Palette for Your Home',
    excerpt: 'Color can make or break an interior. Our principal designer shares the foolproof framework for picking a palette that works.',
    readTime: '4 min read',
    date: 'March 28, 2024',
    tags: ['Color', 'Tips'],
    featured: false,
    image: colorPaletteImage,
    imageAlt: 'Interior designer palette board with paint swatches, fabric samples, and material finishes.',
  },
  {
    id: 3,
    category: 'Project Spotlight',
    title: 'Inside the ECR Penthouse: A Complete Renovation Story',
    excerpt: 'A 3,800 sq ft sea-view penthouse transformed from dated to dramatically modern. A behind-the-scenes look at our process.',
    readTime: '7 min read',
    date: 'March 10, 2024',
    tags: ['Residential', 'Renovation'],
    featured: false,
    image: penthouseRenovationImage,
    imageAlt: 'Modern sea-view penthouse interior after a dramatic luxury renovation.',
  },
  {
    id: 4,
    category: 'Commercial',
    title: 'Designing Offices That Boost Employee Well-Being',
    excerpt: 'The science behind biophilic design, ergonomics, and natural light in commercial spaces that make employees thrive.',
    readTime: '6 min read',
    date: 'February 20, 2024',
    tags: ['Commercial', 'Wellness'],
    featured: false,
    image: officeWellbeingImage,
    imageAlt: 'Biophilic office interior with natural light, plants, and ergonomic work areas.',
  },
  {
    id: 5,
    category: 'Tips',
    title: 'Modular Kitchen Buying Guide: What Nobody Tells You',
    excerpt: 'Before you spend ₹2-5 lakhs on a modular kitchen, read this. Material grades, hardware quality, and what to watch out for.',
    readTime: '8 min read',
    date: 'February 5, 2024',
    tags: ['Kitchen', 'Budget'],
    featured: false,
    image: modularKitchenImage,
    imageAlt: 'Premium modular kitchen with organized cabinetry, durable finishes, and refined hardware details.',
  },
  {
    id: 6,
    category: 'Inspiration',
    title: 'Small Space, Big Ideas: Maximizing a 650 sq ft Apartment',
    excerpt: 'Space constraints are a design opportunity in disguise. How clever planning turned a compact apartment into a dream home.',
    readTime: '5 min read',
    date: 'January 18, 2024',
    tags: ['Small Space', 'Tips'],
    featured: false,
    image: smallSpaceImage,
    imageAlt: 'Compact apartment interior using multifunctional furniture and smart storage solutions.',
  },
  {
    id: 7,
    category: 'Sustainability',
    title: 'Sustainable Materials We Love (and Use) in Chennai',
    excerpt: 'From recycled teak to bamboo flooring and low-VOC paints — the eco-conscious materials that look beautiful and last longer.',
    readTime: '4 min read',
    date: 'January 5, 2024',
    tags: ['Sustainable', 'Materials'],
    featured: false,
    image: sustainableMaterialsImage,
    imageAlt: 'Eco-conscious interior corner featuring bamboo, reclaimed wood, natural textiles, and indoor plants.',
  },
]

export default function Blog() {
  const featured = POSTS.find(p => p.featured)
  const regular = POSTS.filter(p => !p.featured)

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <AnimatedSection>
            <p className="overline">Design Insights</p>
            <h1 className="heading-1 page-hero-heading">
              Ideas, Trends &<br />
              <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Expert Advice</em>
            </h1>
            <p className="lead page-hero-lead">
              Our designers share their knowledge on interior design, trends, tips, and project behind-the-scenes.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Featured Post */}
          {featured && (
            <AnimatedSection>
              <div className="blog-featured">
                <div className="blog-featured__visual">
                  <img
                    src={featured.image}
                    alt={featured.imageAlt}
                    className="blog-featured__image"
                  />
                  <div className="blog-featured__pattern" />
                  <span className="badge blog-featured__badge">{featured.category}</span>
                </div>
                <div className="blog-featured__content">
                  <div className="blog-post-meta">
                    <span className="badge">{featured.category}</span>
                    <span className="body-sm">{featured.date}</span>
                    <span className="body-sm">·</span>
                    <span className="body-sm">{featured.readTime}</span>
                  </div>
                  <h2 className="heading-1 blog-featured__title">{featured.title}</h2>
                  <p className="lead blog-featured__excerpt">{featured.excerpt}</p>
                  <div className="blog-featured__tags">
                    {featured.tags.map(t => <span key={t} className="badge">{t}</span>)}
                  </div>
                  <a href="#" className="btn btn-primary" id={`blog-post-${featured.id}`}>
                    Read Article
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Regular Posts */}
          <div className="section-label" style={{ marginTop: '4rem' }}>
            <span className="overline">Latest Articles</span>
          </div>
          <div className="blog-grid">
            {regular.map((post, i) => (
              <AnimatedSection key={post.id} delay={(i % 3) + 1}>
                <article className="blog-card" id={`blog-card-${post.id}`}>
                  <div className="blog-card__visual">
                    <img
                      src={post.image}
                      alt={post.imageAlt}
                      className="blog-card__image"
                    />
                    <div className="blog-card__pattern" />
                    <span className="badge blog-card__badge">{post.category}</span>
                  </div>
                  <div className="blog-card__content">
                    <div className="blog-post-meta">
                      <span className="body-sm">{post.date}</span>
                      <span className="body-sm">·</span>
                      <span className="body-sm">{post.readTime}</span>
                    </div>
                    <h3 className="heading-3 blog-card__title">{post.title}</h3>
                    <p className="body-sm blog-card__excerpt">{post.excerpt}</p>
                    <div className="blog-card__footer">
                      <div className="blog-card__tags">
                        {post.tags.map(t => <span key={t} className="badge">{t}</span>)}
                      </div>
                      <a href="#" className="blog-card__read-more">
                        Read
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </a>
                    </div>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>

          {/* Newsletter CTA */}
          <AnimatedSection className="blog-newsletter">
            <div className="blog-newsletter__content">
              <h2 className="heading-2">Get Design Inspiration in Your Inbox</h2>
              <p className="lead" style={{ fontSize: '1rem' }}>Monthly newsletter with trends, tips, and project spotlights from our studio.</p>
            </div>
            <div className="blog-newsletter__form">
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email address"
                id="newsletter-email"
              />
              <button className="btn btn-primary" id="newsletter-subscribe">Subscribe</button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  )
}
