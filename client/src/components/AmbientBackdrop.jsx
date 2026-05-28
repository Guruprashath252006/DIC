import React from 'react'
import './AmbientBackdrop.css'
import Squares from './Squares'

export default function AmbientBackdrop() {
  return (
    <div className="amb" aria-hidden="true">
      {/* Base warm gradient wash */}
      <div className="amb__base" />

      {/* Marble-like organic blobs */}
      <div className="amb__blob amb__blob--gold-top" />
      <div className="amb__blob amb__blob--champagne-right" />
      <div className="amb__blob amb__blob--amber-bottom" />
      <div className="amb__blob amb__blob--clay-left" />

      {/* Moving box grid design in warm gold tones, completely static/no cursor tracking */}
      <Squares 
        direction="right"
        speed={0.12}
        borderColor="rgba(184, 154, 66, 0.15)"
        squareSize={60}
        accentColor="184, 154, 66"
      />

      {/* Subtle vignette to deepen corners */}
      <div className="amb__vignette" />

      {/* Premium linen / paper noise grain */}
      <div className="amb__grain" />
    </div>
  )
}
