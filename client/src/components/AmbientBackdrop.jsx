import React, { useEffect, useRef } from 'react'

const BLOBS = [
  { x: 0.14, y: 0.18, radius: 0.28, color: '184, 154, 66', alpha: 0.22, drift: 28, phase: 0.2 },
  { x: 0.82, y: 0.2, radius: 0.24, color: '119, 164, 194', alpha: 0.2, drift: 24, phase: 1.3 },
  { x: 0.55, y: 0.68, radius: 0.3, color: '211, 168, 112', alpha: 0.16, drift: 34, phase: 2.7 },
  { x: 0.28, y: 0.82, radius: 0.22, color: '110, 138, 167', alpha: 0.14, drift: 22, phase: 4.1 },
]

const LINES = Array.from({ length: 9 }, (_, index) => ({
  y: 0.12 + index * 0.1,
  length: 0.22 + (index % 3) * 0.1,
  width: 1 + (index % 2),
  speed: 0.018 + index * 0.002,
  phase: index * 0.8,
}))

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export default function AmbientBackdrop() {
  const canvasRef = useRef(null)
  const pointerRef = useRef({ x: 0.5, y: 0.3, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const context = canvas.getContext('2d')
    let width = 0
    let height = 0
    let dpr = 1
    let frameId = 0
    let reducedMotion = false

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updateMotionPreference = () => {
      reducedMotion = media.matches
    }

    updateMotionPreference()

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onPointerMove = (event) => {
      pointerRef.current = {
        x: clamp(event.clientX / Math.max(window.innerWidth, 1), 0, 1),
        y: clamp(event.clientY / Math.max(window.innerHeight, 1), 0, 1),
        active: true,
      }
    }

    const onPointerLeave = () => {
      pointerRef.current.active = false
    }

    const drawBackgroundWash = () => {
      const gradient = context.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, '#fbf7f1')
      gradient.addColorStop(0.45, '#f4ebdf')
      gradient.addColorStop(1, '#efe2d1')
      context.fillStyle = gradient
      context.fillRect(0, 0, width, height)
    }

    const drawAuroraBlobs = (time) => {
      BLOBS.forEach((blob, index) => {
        const drift = reducedMotion ? 0 : Math.sin(time * 0.00018 + blob.phase) * blob.drift
        const offsetX = reducedMotion ? 0 : Math.cos(time * 0.00012 + index) * blob.drift * 0.75
        const px = width * blob.x + offsetX
        const py = height * blob.y + drift
        const radius = Math.max(width, height) * blob.radius
        const glow = context.createRadialGradient(px, py, 0, px, py, radius)
        glow.addColorStop(0, `rgba(${blob.color}, ${blob.alpha})`)
        glow.addColorStop(0.38, `rgba(${blob.color}, ${blob.alpha * 0.45})`)
        glow.addColorStop(1, 'rgba(255, 255, 255, 0)')
        context.fillStyle = glow
        context.fillRect(px - radius, py - radius, radius * 2, radius * 2)
      })
    }

    const drawWaveLines = (time) => {
      context.save()
      context.globalCompositeOperation = 'multiply'

      LINES.forEach((line, index) => {
        const travel = reducedMotion ? 0.5 : (time * line.speed * 0.01 + line.phase) % 1.4
        const startX = width * (travel - 0.25)
        const startY = height * line.y
        const controlY = startY + Math.sin(time * 0.00035 + index) * (8 + index * 1.5)
        const endX = startX + width * line.length

        context.beginPath()
        context.moveTo(startX, startY)
        context.quadraticCurveTo((startX + endX) * 0.5, controlY, endX, startY + 2)
        context.strokeStyle = index % 2 === 0 ? 'rgba(184, 154, 66, 0.1)' : 'rgba(110, 138, 167, 0.12)'
        context.lineWidth = line.width
        context.stroke()
      })

      context.restore()
    }

    const drawPointerAura = () => {
      const { x, y, active } = pointerRef.current
      const px = width * x
      const py = height * y
      const radius = active ? 240 : 180
      const glow = context.createRadialGradient(px, py, 0, px, py, radius)
      glow.addColorStop(0, active ? 'rgba(255, 244, 213, 0.2)' : 'rgba(255, 244, 213, 0.1)')
      glow.addColorStop(0.36, 'rgba(184, 154, 66, 0.08)')
      glow.addColorStop(1, 'rgba(255, 255, 255, 0)')
      context.fillStyle = glow
      context.fillRect(px - radius, py - radius, radius * 2, radius * 2)
    }

    const drawArchitecturalArcs = (time) => {
      context.save()
      context.globalAlpha = 0.28
      context.strokeStyle = 'rgba(92, 74, 34, 0.18)'
      context.lineWidth = 1

      const sway = reducedMotion ? 0 : Math.sin(time * 0.00022) * 18

      for (let index = 0; index < 3; index += 1) {
        const radius = Math.min(width, height) * (0.24 + index * 0.08)
        const centerX = width * 0.88 + sway
        const centerY = height * 0.9
        context.beginPath()
        context.arc(centerX, centerY, radius, Math.PI, Math.PI * 1.5)
        context.stroke()
      }

      context.restore()
    }

    const drawSoftColumns = (time) => {
      context.save()
      context.globalAlpha = 0.18

      const columns = [
        { x: 0.1, width: 0.12, color: 'rgba(255, 249, 236, 0.52)' },
        { x: 0.74, width: 0.1, color: 'rgba(243, 226, 196, 0.42)' },
        { x: 0.86, width: 0.08, color: 'rgba(224, 236, 246, 0.36)' },
      ]

      columns.forEach((column, index) => {
        const drift = reducedMotion ? 0 : Math.sin(time * 0.00018 + index) * 10
        const x = width * column.x + drift
        const w = width * column.width
        const gradient = context.createLinearGradient(x, 0, x + w, 0)
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
        gradient.addColorStop(0.5, column.color)
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        context.fillStyle = gradient
        context.fillRect(x, 0, w, height)
      })

      context.restore()
    }

    const drawContourBands = (time) => {
      context.save()
      context.globalAlpha = 0.22
      context.lineWidth = 1

      for (let index = 0; index < 4; index += 1) {
        const baseY = height * (0.62 + index * 0.08)
        const sweep = reducedMotion ? 0 : Math.sin(time * 0.00024 + index) * 24

        context.beginPath()
        context.moveTo(-40, baseY + sweep)
        context.bezierCurveTo(
          width * 0.18,
          baseY - 28 + sweep,
          width * 0.62,
          baseY + 18 - sweep,
          width + 40,
          baseY - 12 + sweep
        )
        context.strokeStyle = index % 2 === 0 ? 'rgba(184, 154, 66, 0.1)' : 'rgba(125, 163, 190, 0.1)'
        context.stroke()
      }

      context.restore()
    }

    const draw = (time) => {
      context.clearRect(0, 0, width, height)
      drawBackgroundWash()
      drawAuroraBlobs(time)
      drawSoftColumns(time)
      drawWaveLines(time)
      drawContourBands(time)
      drawArchitecturalArcs(time)
      drawPointerAura()
      frameId = window.requestAnimationFrame(draw)
    }

    resize()
    frameId = window.requestAnimationFrame(draw)

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerleave', onPointerLeave)

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', updateMotionPreference)
    } else {
      media.addListener(updateMotionPreference)
    }

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      if (typeof media.removeEventListener === 'function') {
        media.removeEventListener('change', updateMotionPreference)
      } else {
        media.removeListener(updateMotionPreference)
      }
      window.cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <div className="app-background" aria-hidden="true">
      <canvas ref={canvasRef} className="app-background__canvas" />
      <div className="app-background__glow app-background__glow--primary" />
      <div className="app-background__glow app-background__glow--secondary" />
      <div className="app-background__grain" />
    </div>
  )
}
