import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollReset from './components/ScrollReset'
import WhatsAppButton from './components/WhatsAppButton'
import Chatbot from './components/Chatbot'
import AmbientBackdrop from './components/AmbientBackdrop'

import { Suspense } from 'react'

// Core Pages (Dynamic Imports)
const Home = React.lazy(() => import('./pages/Home'))
const About = React.lazy(() => import('./pages/About'))
const Services = React.lazy(() => import('./pages/Services'))
const ServiceDetail = React.lazy(() => import('./pages/ServiceDetail'))
const Portfolio = React.lazy(() => import('./pages/Portfolio'))
const DesignIdeas = React.lazy(() => import('./pages/DesignIdeas'))
const RoomPage = React.lazy(() => import('./pages/RoomPage'))
const Testimonials = React.lazy(() => import('./pages/Testimonials'))
const Blog = React.lazy(() => import('./pages/Blog'))
const Contact = React.lazy(() => import('./pages/Contact'))
const Admin = React.lazy(() => import('./pages/Admin'))
const Presentation = React.lazy(() => import('./pages/Presentation'))

// Policy Pages (Dynamic Imports)
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'))
const CookiePolicy = React.lazy(() => import('./pages/CookiePolicy'))
const TermsAndConditions = React.lazy(() => import('./pages/Terms'))

const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    width: '100%',
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid rgba(184, 154, 66, 0.1)',
      borderTopColor: 'var(--accent)',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
)

import './App.css'

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Live Settings State
  const [settings, setSettings] = useState({
    whatsappActive: true,
    chatbotActive: true
  })

  useEffect(() => {
    // Load initial settings
    const stored = localStorage.getItem('dic_settings')
    if (stored) {
      try {
        setSettings(JSON.parse(stored))
      } catch (e) {
        console.error('Error loading settings:', e)
      }
    } else {
      // Default seed
      localStorage.setItem('dic_settings', JSON.stringify({ whatsappActive: true, chatbotActive: true }))
    }

    const handleSettingsUpdate = () => {
      const updated = localStorage.getItem('dic_settings')
      if (updated) {
        try {
          setSettings(JSON.parse(updated))
        } catch (e) {
          console.error(e)
        }
      }
    }

    window.addEventListener('storage-update', handleSettingsUpdate)
    return () => window.removeEventListener('storage-update', handleSettingsUpdate)
  }, [])

  return (
    <BrowserRouter>
      <AmbientBackdrop />

      {/* Global Scroll Progress Bar */}
      <motion.div
        className="scroll-progress"
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'var(--accent)',
          transformOrigin: '0%',
          zIndex: 9999
        }}
      />

      <ScrollReset />
      <div className="app-shell">
        <Navbar />
        
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/design-ideas" element={<DesignIdeas />} />
            <Route path="/design-ideas/:roomId" element={<RoomPage />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/presentation" element={<Presentation />} />
            
            {/* Policies */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />
          </Routes>
        </Suspense>

        <Footer />
      </div>
      <ScrollToTop />
      {settings.whatsappActive && <WhatsAppButton />}
      {settings.chatbotActive && <Chatbot />}
    </BrowserRouter>
  )
}
