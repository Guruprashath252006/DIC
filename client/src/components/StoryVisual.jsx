import React from 'react'
import { motion } from 'framer-motion'
import ourStoryImage from '../assets/home/our-story.png'

export default function StoryVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="story-marquee glass-card"
      style={{ 
        position: 'relative',
        minHeight: '520px', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'flex-end', 
        padding: '2.5rem',
        overflow: 'hidden',
        borderRadius: '28px',
        border: '1px solid rgba(184, 154, 66, 0.18)',
        boxShadow: '0 24px 80px rgba(53, 35, 17, 0.12)'
      }}
    >
      <motion.img
        src={ourStoryImage}
        alt="Elegant premium interior reflecting the De Interio Cafe design philosophy"
        className="story-marquee__image"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      />
      <div 
        className="story-marquee__veil" 
        style={{ 
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(23, 15, 10, 0.1) 0%, rgba(23, 15, 10, 0.75) 100%)',
          zIndex: 1 
        }} 
      />

      <div 
        className="story-marquee__header" 
        style={{ 
          position: 'relative', 
          zIndex: 2, 
          margin: 0, 
          maxWidth: '100%' 
        }}
      >
        <span 
          className="badge" 
          style={{ 
            marginBottom: '1rem', 
            background: 'var(--accent)', 
            color: '#0a0a0a',
            fontWeight: '700',
            letterSpacing: '0.1em'
          }}
        >
          Since 2008
        </span>
        <h3 
          style={{ 
            fontSize: '1.8rem', 
            lineHeight: '1.25', 
            color: 'white', 
            textShadow: '0 2px 10px rgba(0,0,0,0.4)', 
            fontFamily: 'var(--font-display)',
            fontWeight: '600'
          }}
        >
          Stories, spaces, and design decisions that keep moving forward.
        </h3>
      </div>
    </motion.div>
  )
}
