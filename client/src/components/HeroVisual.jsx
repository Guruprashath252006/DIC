import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import residentialImage from '../assets/portfolio/modern-villa-boat-club-road.png'
import commercialImage from '../assets/portfolio/corporate-hq-anna-salai.png'

const HeroVisual = () => {
  const { scrollY } = useScroll()
  const yPrimary = useTransform(scrollY, [0, 500], [0, -60])
  const ySecondary = useTransform(scrollY, [0, 500], [0, -110])

  return (
    <div className="hero__visual-container">
      {/* Background ambient glows */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="hero__visual-blob hero__visual-blob--1"
      />
      <motion.div
        animate={{
          scale: [1.15, 1, 1.15],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="hero__visual-blob hero__visual-blob--2"
      />

      {/* Primary Card (Residential) */}
      <motion.div
        style={{ y: yPrimary }}
        className="hero__visual-primary"
      >
        <motion.div
          whileHover={{ y: -8, rotate: -1, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="hero__photo-card hero__photo-card--primary"
        >
          <img
            src={residentialImage}
            alt="Luxury Residential Design by De Interio Cafe"
            className="hero__photo"
          />
          <span className="hero__photo-badge">RESIDENTIAL</span>
        </motion.div>
      </motion.div>

      {/* Secondary Card (Commercial Office) */}
      <motion.div
        style={{ y: ySecondary }}
        className="hero__visual-secondary"
      >
        <motion.div
          whileHover={{ y: -8, rotate: 1, scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="hero__photo-card hero__photo-card--secondary"
        >
          <img
            src={commercialImage}
            alt="Corporate Office Commercial Design by De Interio Cafe"
            className="hero__photo"
          />
          <span className="hero__photo-badge">COMMERCIAL</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default HeroVisual
