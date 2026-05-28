import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Sun, Sunset, Moon, RotateCw, Sparkles, X, Settings } from 'lucide-react'

const SCENE_COPY = {
  eyebrow: 'Live 3D Design Preview',
  title: 'Real-time Spatial Rendering',
  description: 'Explore layouts, finishes, and spatial flow in high fidelity. Walk through your customized space, previewing material textures and lighting before execution begins.',
}

const HOTSPOTS = [
  {
    id: 'sofa',
    title: 'Modular Sofa Sectional',
    pos: new THREE.Vector3(-1.45, 0.82, 0.78),
    desc: 'Premium Italian upholstery with warm accents, splayed timber armrests, and plush modular lounge cushioning.'
  },
  {
    id: 'tables',
    title: 'Nesting Coffee Tables',
    pos: new THREE.Vector3(0.18, 0.48, 0.5),
    desc: 'Twin nesting tables featuring Roman Travertine stone tops, a brushed brass cylindrical pedestal, and a charcoal oak frame.'
  },
  {
    id: 'desk',
    title: 'Executive Designer Desk',
    pos: new THREE.Vector3(1.9, 0.88, -0.08),
    desc: 'Structured study desk with floating solid travertine work surface, dark iron legs, and integrated cable management.'
  },
  {
    id: 'chair',
    title: 'Luxury Splayed Task Chair',
    pos: new THREE.Vector3(1.88, 0.72, 0.58),
    desc: 'Ergonomic task chair crafted in dark textured wool and splayed brass-plated leg frame.'
  },
  {
    id: 'planter',
    title: 'Olive Tree Bio-Planter',
    pos: new THREE.Vector3(-2.8, 0.95, -0.62),
    desc: 'Handcrafted matte black ceramic pot with real olive branches and splayed foliage to introduce biophilic accents.'
  }
]

const createRoundedBox = (width, height, depth, radius, smoothness = 4) => {
  const shape = new THREE.Shape()
  const x = -width / 2
  const y = -height / 2

  shape.moveTo(x + radius, y)
  shape.lineTo(x + width - radius, y)
  shape.quadraticCurveTo(x + width, y, x + width, y + radius)
  shape.lineTo(x + width, y + height - radius)
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  shape.lineTo(x + radius, y + height)
  shape.quadraticCurveTo(x, y + height, x, y + height - radius)
  shape.lineTo(x, y + radius)
  shape.quadraticCurveTo(x, y, x + radius, y)

  return new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: smoothness,
    steps: 1,
    bevelSize: radius * 0.6,
    bevelThickness: radius * 0.6,
    curveSegments: smoothness * 3,
  }).center()
}

// Programmatic Canvas Texture Generators
const createWoodParquetTexture = () => {
  if (typeof document === 'undefined') return null
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  
  ctx.fillStyle = '#b88a54'
  ctx.fillRect(0, 0, 512, 512)
  
  const plankWidth = 32
  const plankHeight = 128
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)'
  ctx.lineWidth = 1
  
  for (let x = 0; x < canvas.width; x += plankWidth) {
    const offset = (x / plankWidth) % 2 === 0 ? 0 : plankHeight / 2
    for (let y = -plankHeight; y < canvas.height + plankHeight; y += plankHeight) {
      const py = y + offset
      
      ctx.fillStyle = `rgba(0, 0, 0, ${0.03 + Math.random() * 0.06})`
      ctx.fillRect(x, py, plankWidth, plankHeight)
      ctx.strokeRect(x, py, plankWidth, plankHeight)
      
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.04)'
      ctx.beginPath()
      for (let g = 0; g < 3; g++) {
        const gx = x + Math.random() * plankWidth
        ctx.moveTo(gx, py)
        ctx.bezierCurveTo(
          gx + (Math.random() - 0.5) * 6, py + plankHeight * 0.3,
          gx + (Math.random() - 0.5) * 6, py + plankHeight * 0.6,
          gx + (Math.random() - 0.5) * 3, py + plankHeight
        )
      }
      ctx.stroke()
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)'
    }
  }
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(2, 2)
  return texture
}

const createTravertineTexture = () => {
  if (typeof document === 'undefined') return null
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')
  
  ctx.fillStyle = '#efe4d3'
  ctx.fillRect(0, 0, 512, 512)
  
  ctx.strokeStyle = 'rgba(184, 154, 66, 0.06)'
  ctx.lineWidth = 1.5
  for (let i = 0; i < 12; i++) {
    ctx.beginPath()
    let x = Math.random() * 512
    let y = 0
    ctx.moveTo(x, y)
    while (y < 512) {
      x += (Math.random() - 0.5) * 20
      y += Math.random() * 25 + 8
      ctx.lineTo(x, y)
    }
    ctx.stroke()
  }
  
  ctx.strokeStyle = 'rgba(184, 154, 66, 0.14)'
  ctx.lineWidth = 1
  for (let i = 0; i <= 512; i += 128) {
    ctx.beginPath()
    ctx.moveTo(0, i)
    ctx.lineTo(512, i)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, 512)
    ctx.stroke()
  }
  
  const texture = new THREE.CanvasTexture(canvas)
  return texture
}

const createRugTexture = () => {
  if (typeof document === 'undefined') return null
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')
  
  ctx.fillStyle = '#ece2d1'
  ctx.fillRect(0, 0, 128, 128)
  
  ctx.strokeStyle = 'rgba(184, 154, 66, 0.1)'
  ctx.lineWidth = 0.8
  for (let i = 0; i < 128; i += 3) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, 128)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(0, i)
    ctx.lineTo(128, i)
    ctx.stroke()
  }
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(4, 4)
  return texture
}

const buildSignatureSet = (materials) => {
  const {
    sofaMaterial,
    woodMaterial,
    charcoalMaterial,
    stoneMaterial,
    goldMaterial,
    rugMaterial,
    deskLampBulbMaterial,
    deskScreenMatRef,
    wallScreenMatRef,
    laptopGlowMatRef,
    pendantLightsMatRef,
    deskLampLightRef
  } = materials

  const group = new THREE.Group()

  const platform = new THREE.Mesh(createRoundedBox(6.1, 0.16, 3.4, 0.14), stoneMaterial)
  platform.position.set(0.05, 0.04, 0.12)
  group.add(platform)

  const rug = new THREE.Mesh(
    createRoundedBox(3.6, 0.03, 2.16, 0.1),
    rugMaterial
  )
  rug.position.set(-0.32, 0.14, 0.42)
  group.add(rug)

  // Rug Fringes
  const fringeMaterial = new THREE.MeshStandardMaterial({
    color: '#dfd5c4',
    roughness: 0.92,
    metalness: 0.02
  })
  
  // Right fringes
  for (let z = -1.0; z <= 1.0; z += 0.06) {
    const fringe = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.08, 6), fringeMaterial)
    fringe.position.set(1.48, 0.14, 0.42 + z)
    fringe.rotation.z = Math.PI / 2
    group.add(fringe)
  }
  
  // Left fringes
  for (let z = -1.0; z <= 1.0; z += 0.06) {
    const fringe = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.08, 6), fringeMaterial)
    fringe.position.set(-2.12, 0.14, 0.42 + z)
    fringe.rotation.z = Math.PI / 2
    group.add(fringe)
  }

  const sofaBase = new THREE.Mesh(createRoundedBox(2.55, 0.72, 1.06, 0.12), sofaMaterial)
  sofaBase.position.set(-1.45, 0.42, 0.78)
  group.add(sofaBase)

  const sofaBack = new THREE.Mesh(createRoundedBox(2.45, 0.84, 0.25, 0.08), sofaMaterial)
  sofaBack.position.set(-1.45, 0.92, 0.22)
  group.add(sofaBack)

  const armRestGeometry = createRoundedBox(0.24, 0.62, 1.02, 0.08)
  const leftArm = new THREE.Mesh(armRestGeometry, woodMaterial)
  leftArm.position.set(-2.61, 0.58, 0.77)
  group.add(leftArm)

  const rightArm = leftArm.clone()
  rightArm.position.x = -0.29
  group.add(rightArm)

  const cushionGeometry = createRoundedBox(0.72, 0.26, 0.78, 0.08)
  ;[-2.12, -1.45, -0.78].forEach((x) => {
    const cushion = new THREE.Mesh(cushionGeometry, sofaMaterial)
    cushion.position.set(x, 0.82, 0.82)
    cushion.rotation.x = -0.05
    group.add(cushion)
  })

  // Throw Blanket draped over the right sofa seat
  const blanketMat = new THREE.MeshStandardMaterial({
    color: '#ceb17c',
    roughness: 0.85,
    metalness: 0.05
  })
  
  const p1 = new THREE.Mesh(createRoundedBox(0.38, 0.015, 0.64, 0.008), blanketMat)
  p1.position.set(-0.64, 0.95, 0.84)
  p1.rotation.set(-0.05, 0.08, 0)
  group.add(p1)
  
  const p2 = new THREE.Mesh(createRoundedBox(0.38, 0.24, 0.015, 0.008), blanketMat)
  p2.position.set(-0.62, 0.83, 1.15)
  p2.rotation.set(0.08, 0.08, 0)
  group.add(p2)

  const tableTop = new THREE.Mesh(createRoundedBox(1.42, 0.12, 0.82, 0.08), charcoalMaterial)
  tableTop.position.set(0.18, 0.42, 0.5)
  group.add(tableTop)

  // Coffee Table Legs
  ;[
    [-0.34, 0.17],
    [0.7, 0.17],
    [-0.34, 0.83],
    [0.7, 0.83],
  ].forEach(([x, z]) => {
    const legCharcoal = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.26, 16), charcoalMaterial)
    legCharcoal.position.set(x, 0.23, z)
    group.add(legCharcoal)
    
    const legTip = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.08, 16), goldMaterial)
    legTip.position.set(x, 0.06, z)
    group.add(legTip)
  })

  // Circular Nesting Coffee Table
  const nestingTop = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.08, 24), stoneMaterial)
  nestingTop.position.set(0.85, 0.52, 0.9)
  group.add(nestingTop)
  
  const nestingLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.44, 16), goldMaterial)
  nestingLeg.position.set(0.85, 0.26, 0.9)
  group.add(nestingLeg)

  // Stack of 3 books on the Nesting Coffee Table
  const bookColors = [
    new THREE.MeshStandardMaterial({ color: '#2b3d4f', roughness: 0.65 }),
    new THREE.MeshStandardMaterial({ color: '#8c3523', roughness: 0.65 }),
    new THREE.MeshStandardMaterial({ color: '#b89a42', roughness: 0.3, metalness: 0.6 }),
  ]
  
  const b1 = new THREE.Mesh(createRoundedBox(0.25, 0.028, 0.18, 0.008), bookColors[0])
  b1.position.set(0.85, 0.575, 0.9)
  b1.rotation.y = 0.22
  group.add(b1)
  
  const b2 = new THREE.Mesh(createRoundedBox(0.23, 0.024, 0.16, 0.008), bookColors[1])
  b2.position.set(0.84, 0.601, 0.89)
  b2.rotation.y = -0.12
  group.add(b2)
  
  const b3 = new THREE.Mesh(createRoundedBox(0.18, 0.02, 0.13, 0.008), bookColors[2])
  b3.position.set(0.84, 0.623, 0.89)
  b3.rotation.y = 0.05
  group.add(b3)

  // Ceramic mug next to books
  const coffeeMug = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.07, 16), sofaMaterial)
  coffeeMug.position.set(0.68, 0.595, 0.98)
  group.add(coffeeMug)

  const deskTop = new THREE.Mesh(createRoundedBox(1.72, 0.1, 0.72, 0.07), stoneMaterial)
  deskTop.position.set(1.9, 0.84, -0.08)
  group.add(deskTop)

  // Desk Legs
  ;[
    [1.2, -0.32],
    [2.6, -0.32],
    [1.2, 0.16],
    [2.6, 0.16],
  ].forEach(([x, z]) => {
    const legCharcoal = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.68, 16), charcoalMaterial)
    legCharcoal.position.set(x, 0.46, z)
    group.add(legCharcoal)

    const legTip = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.12, 16), goldMaterial)
    legTip.position.set(x, 0.06, z)
    group.add(legTip)
  })

  const chairSeat = new THREE.Mesh(createRoundedBox(0.56, 0.14, 0.56, 0.06), charcoalMaterial)
  chairSeat.position.set(1.88, 0.56, 0.58)
  group.add(chairSeat)

  const chairBack = new THREE.Mesh(createRoundedBox(0.56, 0.76, 0.12, 0.05), charcoalMaterial)
  chairBack.position.set(1.88, 0.98, 0.84)
  group.add(chairBack)

  // Chair Legs
  ;[
    [1.68, 0.38],
    [2.08, 0.38],
    [1.68, 0.78],
    [2.08, 0.78],
  ].forEach(([x, z]) => {
    const chairLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.48, 12), goldMaterial)
    chairLeg.position.set(x, 0.25, z)
    chairLeg.rotation.z = x < 1.88 ? 0.08 : -0.08
    group.add(chairLeg)
  })

  // Open laptop on desk
  const laptopBase = new THREE.Mesh(createRoundedBox(0.44, 0.02, 0.3, 0.01), charcoalMaterial)
  laptopBase.position.set(1.9, 0.9, 0.1)
  group.add(laptopBase)

  const laptopScreen = new THREE.Mesh(createRoundedBox(0.44, 0.3, 0.01, 0.01), charcoalMaterial)
  laptopScreen.position.set(1.9, 1.03, -0.03)
  laptopScreen.rotation.x = -0.22
  group.add(laptopScreen)

  const laptopGlowMat = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    emissive: '#e3f2fd',
    emissiveIntensity: 0.85,
    roughness: 0.1,
  })
  laptopGlowMatRef.current = laptopGlowMat
  const laptopGlow = new THREE.Mesh(createRoundedBox(0.41, 0.27, 0.005, 0.01), laptopGlowMat)
  laptopGlow.position.set(1.9, 1.03, -0.02)
  laptopGlow.rotation.x = -0.22
  group.add(laptopGlow)

  // Ceramic mug on desk
  const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.08, 16), sofaMaterial)
  mug.position.set(1.45, 0.93, 0.08)
  group.add(mug)

  const deskScreenMat = new THREE.MeshStandardMaterial({
    color: '#8fb6c9',
    emissive: '#8fb6c9',
    emissiveIntensity: 0.38,
    roughness: 0.24,
    metalness: 0.18,
  })
  deskScreenMatRef.current = deskScreenMat
  const deskScreen = new THREE.Mesh(createRoundedBox(0.92, 0.58, 0.05, 0.04), deskScreenMat)
  deskScreen.position.set(1.9, 1.18, -0.06)
  group.add(deskScreen)

  const lampPole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 1.45, 16), woodMaterial)
  lampPole.position.set(2.95, 0.78, 0.78)
  group.add(lampPole)

  const lampShade = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.22, 0.35, 24, 1, true), sofaMaterial)
  lampShade.position.set(2.95, 1.58, 0.78)
  group.add(lampShade)

  const artFrame = new THREE.Mesh(
    createRoundedBox(1.45, 0.92, 0.08, 0.04),
    new THREE.MeshStandardMaterial({ color: '#d9c5a1', roughness: 0.62, metalness: 0.2 })
  )
  artFrame.position.set(-0.72, 1.38, -1.62)
  group.add(artFrame)

  const artPanel = new THREE.Mesh(
    createRoundedBox(1.18, 0.65, 0.04, 0.03),
    new THREE.MeshStandardMaterial({
      color: '#f7f1e5',
      roughness: 0.82,
      metalness: 0.06,
      emissive: '#f0d8a6',
      emissiveIntensity: 0.08,
    })
  )
  artPanel.position.set(-0.72, 1.38, -1.56)
  group.add(artPanel)

  const divider = new THREE.Mesh(createRoundedBox(0.12, 1.84, 2.4, 0.04), woodMaterial)
  divider.position.set(0.98, 1.02, 0.18)
  group.add(divider)

  const wallScreenFrame = new THREE.Mesh(createRoundedBox(1.9, 1.1, 0.08, 0.05), charcoalMaterial)
  wallScreenFrame.position.set(1.85, 1.56, -1.58)
  group.add(wallScreenFrame)

  const wallScreenMat = new THREE.MeshStandardMaterial({
    color: '#95b8c5',
    emissive: '#95b8c5',
    emissiveIntensity: 0.46,
    roughness: 0.22,
    metalness: 0.1,
  })
  wallScreenMatRef.current = wallScreenMat
  const wallScreen = new THREE.Mesh(createRoundedBox(1.62, 0.82, 0.04, 0.04), wallScreenMat)
  wallScreen.position.set(1.85, 1.56, -1.52)
  group.add(wallScreen)

  const pendantBar = new THREE.Mesh(new THREE.BoxGeometry(4.9, 0.06, 0.08), charcoalMaterial)
  pendantBar.position.set(0.15, 2.28, 0.18)
  group.add(pendantBar)

  const pendantLightsMat = new THREE.MeshStandardMaterial({
    color: '#f1e8d4',
    emissive: '#f1e8d4',
    emissiveIntensity: 0.28,
    roughness: 0.5,
  })
  pendantLightsMatRef.current = pendantLightsMat

  ;[-1.5, 0, 1.5].forEach((x) => {
    const light = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.48, 18),
      pendantLightsMat
    )
    light.position.set(x, 1.98, 0.18)
    group.add(light)
  })

  // Gold Throw Pillow on Sofa
  const pillow = new THREE.Mesh(
    createRoundedBox(0.44, 0.44, 0.18, 0.08),
    new THREE.MeshStandardMaterial({
      color: '#b89a42',
      roughness: 0.65,
      metalness: 0.1,
    })
  )
  pillow.position.set(-2.25, 0.84, 0.88)
  pillow.rotation.set(-0.1, 0.4, 0.15)
  group.add(pillow)

  // Planter Pot + branches/leaves
  const leafMaterial = new THREE.MeshStandardMaterial({
    color: '#4f5d3e',
    roughness: 0.8,
    metalness: 0.05,
  })

  const planterPot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.14, 0.65, 18),
    new THREE.MeshStandardMaterial({
      color: '#2b2a28',
      roughness: 0.5,
      metalness: 0.2,
    })
  )
  planterPot.position.set(-2.8, 0.46, -0.62)
  group.add(planterPot)

  ;[
    [-0.05, 0.4, 0.08, 0.1, 1.25],
    [0.08, -0.05, -0.15, -0.08, 1.45],
    [-0.02, -0.08, -0.05, 0.05, 1.1]
  ].forEach(([dx, dz, rx, rz, h]) => {
    const branchGeometry = new THREE.CylinderGeometry(0.012, 0.018, h, 8)
    const branch = new THREE.Mesh(branchGeometry, woodMaterial)
    branch.position.set(-2.8 + dx, 0.46 + h/2, -0.62 + dz)
    branch.rotation.set(rx, 0, rz)
    group.add(branch)

    for (let l = 0; l < 5; l++) {
      const progress = (l + 1) / 6
      const leafY = 0.46 + h * progress
      const leafScale = 0.14 * (1 - progress * 0.4)
      
      const leaf = new THREE.Mesh(new THREE.SphereGeometry(leafScale, 8, 8), leafMaterial)
      leaf.scale.set(1.4, 0.2, 0.6)
      
      const side = l % 2 === 0 ? 1 : -1
      leaf.position.set(-2.8 + dx + Math.sin(rz) * progress * h + side * 0.08, leafY, -0.62 + dz + side * 0.06)
      leaf.rotation.set(0.4 * side, 0.5 * l, 0.3 * side)
      group.add(leaf)
    }
  })

  // Second Gallery Wall Art Frame
  const secondFrame = new THREE.Mesh(
    createRoundedBox(0.68, 1.15, 0.08, 0.04),
    new THREE.MeshStandardMaterial({ color: '#2f3440', roughness: 0.52, metalness: 0.3 })
  )
  secondFrame.position.set(-1.95, 1.48, -1.62)
  group.add(secondFrame)

  const secondArtPanel = new THREE.Mesh(
    createRoundedBox(0.48, 0.95, 0.04, 0.03),
    new THREE.MeshStandardMaterial({
      color: '#fdfbf7',
      roughness: 0.9,
      metalness: 0.05,
      emissive: '#e8d5b5',
      emissiveIntensity: 0.06,
    })
  )
  secondArtPanel.position.set(-1.95, 1.48, -1.56)
  group.add(secondArtPanel)

  // Gold Minimalist Desk Lamp
  const lampBaseMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.02, 16), goldMaterial)
  lampBaseMesh.position.set(1.15, 0.9, 0.22)
  group.add(lampBaseMesh)

  const lampStem = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.32, 8), goldMaterial)
  lampStem.position.set(1.15, 1.05, 0.22)
  lampStem.rotation.z = -0.3
  group.add(lampStem)

  const lampHead = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 0.1, 16), goldMaterial)
  lampHead.position.set(1.1, 1.2, 0.22)
  lampHead.rotation.z = -0.8
  group.add(lampHead)

  const lampBulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.038, 12, 12),
    deskLampBulbMaterial
  )
  lampBulb.position.set(1.08, 1.18, 0.22)
  group.add(lampBulb)

  // Point light for lamp glow
  const deskLampLight = new THREE.PointLight('#fff0b3', 0, 1.8, 1.5)
  deskLampLight.position.set(1.08, 1.18, 0.22)
  group.add(deskLampLight)
  deskLampLightRef.current = deskLampLight

  // Traverse to configure cast/receive shadows for all components
  group.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })

  return group
}

export default function InteriorScene() {
  const mountRef = useRef(null)
  const sceneSetRef = useRef(null)
  const frameRef = useRef(0)
  const pointerRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const [sceneReady, setSceneReady] = useState(false)

  // Studio Configurator states
  const [lightingMode, setLightingMode] = useState('day')
  const [sofaColor, setSofaColor] = useState('boucle')
  const [woodFinish, setWoodFinish] = useState('oak')
  const [floorType, setFloorType] = useState('travertine')
  const [activeHotspot, setActiveHotspot] = useState(null)
  const [autoRotate, setAutoRotate] = useState(true)
  const [customizerOpen, setCustomizerOpen] = useState(true)

  // Toggle layout default based on screen size on client mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCustomizerOpen(window.innerWidth > 900)
    }
  }, [])

  // Config refs for Three.js animate thread access
  const stateRef = useRef({
    lightingMode,
    sofaColor,
    woodFinish,
    autoRotate,
  })

  // Sync state values to ref for render loop read (prevents loop re-initialization stuttering)
  useEffect(() => {
    stateRef.current.lightingMode = lightingMode
    stateRef.current.sofaColor = sofaColor
    stateRef.current.woodFinish = woodFinish
    stateRef.current.autoRotate = autoRotate
  }, [lightingMode, sofaColor, woodFinish, autoRotate])

  // Lighting & fog refs
  const ambientRef = useRef(null)
  const keyLightRef = useRef(null)
  const fillLightRef = useRef(null)
  const coolLightRef = useRef(null)
  const rimLightRef = useRef(null)
  const deskLampLightRef = useRef(null)

  // Material refs
  const sofaMaterialRef = useRef(null)
  const woodMaterialRef = useRef(null)
  const floorMaterialRef = useRef(null)
  const rugMaterialRef = useRef(null)
  const deskLampBulbMatRef = useRef(null)
  const deskScreenMatRef = useRef(null)
  const wallScreenMatRef = useRef(null)
  const laptopGlowMatRef = useRef(null)
  const pendantLightsMatRef = useRef(null)
  const backdropMatRef = useRef(null)

  // Texture refs
  const travertineTextureRef = useRef(null)
  const woodTextureRef = useRef(null)

  // Floor type swapper effect
  useEffect(() => {
    if (floorMaterialRef.current) {
      if (floorType === 'wood') {
        floorMaterialRef.current.map = woodTextureRef.current
        floorMaterialRef.current.color.set('#c49e70')
        floorMaterialRef.current.roughness = 0.5
      } else if (floorType === 'travertine') {
        floorMaterialRef.current.map = travertineTextureRef.current
        floorMaterialRef.current.color.set('#ffffff')
        floorMaterialRef.current.roughness = 0.7
      } else {
        floorMaterialRef.current.map = null
        floorMaterialRef.current.color.set('#efe4d3')
        floorMaterialRef.current.roughness = 0.9
      }
      floorMaterialRef.current.needsUpdate = true
    }
  }, [floorType])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog('#f5efe4', 7.5, 16)

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
    camera.position.set(0, 2.2, 7.2)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    
    // Enable soft shadow map rendering
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    
    mount.appendChild(renderer.domElement)

    // Lighting setup
    const ambient = new THREE.AmbientLight('#fff8ef', 1.4)
    scene.add(ambient)
    ambientRef.current = ambient

    const keyLight = new THREE.DirectionalLight('#fff3db', 2.8)
    keyLight.position.set(4, 7, 6)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.width = 1024
    keyLight.shadow.mapSize.height = 1024
    keyLight.shadow.camera.near = 0.5
    keyLight.shadow.camera.far = 16
    keyLight.shadow.camera.left = -4
    keyLight.shadow.camera.right = 4
    keyLight.shadow.camera.top = 4
    keyLight.shadow.camera.bottom = -4
    keyLight.shadow.bias = -0.0005
    scene.add(keyLight)
    keyLightRef.current = keyLight

    const fillLight = new THREE.PointLight('#cfa766', 16, 18, 2)
    fillLight.position.set(-4.2, 2.8, 3.4)
    scene.add(fillLight)
    fillLightRef.current = fillLight

    const coolLight = new THREE.PointLight('#8fb6c9', 13, 18, 2)
    coolLight.position.set(3.6, 2.4, 1.8)
    scene.add(coolLight)
    coolLightRef.current = coolLight

    const rimLight = new THREE.SpotLight('#f8dfad', 22, 18, 0.58, 0.44, 1.3)
    rimLight.position.set(0, 4.8, 2.2)
    rimLight.target.position.set(0.1, 0.8, 0.2)
    rimLight.castShadow = true
    rimLight.shadow.mapSize.width = 512
    rimLight.shadow.mapSize.height = 512
    rimLight.shadow.bias = -0.001
    scene.add(rimLight)
    scene.add(rimLight.target)
    rimLightRef.current = rimLight

    // Instantiate Shared Materials
    const sofaMaterial = new THREE.MeshStandardMaterial({
      color: '#eadfcb',
      roughness: 0.78,
      metalness: 0.08,
    })
    sofaMaterialRef.current = sofaMaterial

    const woodMaterial = new THREE.MeshStandardMaterial({
      color: '#b88a54',
      roughness: 0.58,
      metalness: 0.2,
    })
    woodMaterialRef.current = woodMaterial

    const charcoalMaterial = new THREE.MeshStandardMaterial({
      color: '#2f3440',
      roughness: 0.56,
      metalness: 0.34,
    })

    const stoneMaterial = new THREE.MeshStandardMaterial({
      color: '#d9d5cf',
      roughness: 0.42,
      metalness: 0.14,
    })

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: '#d4af37',
      roughness: 0.18,
      metalness: 0.95,
    })

    const rugMaterial = new THREE.MeshStandardMaterial({
      color: '#ece2d1',
      roughness: 0.92,
      metalness: 0.02
    })
    rugMaterialRef.current = rugMaterial

    const deskLampBulbMaterial = new THREE.MeshStandardMaterial({
      color: '#fff9e6',
      emissive: '#fff9e6',
      emissiveIntensity: 0.0,
      roughness: 0.1,
    })
    deskLampBulbMatRef.current = deskLampBulbMaterial

    // Textures initialization
    const rugTexture = createRugTexture()
    if (rugTexture) rugMaterial.map = rugTexture

    const travertineTexture = createTravertineTexture()
    travertineTextureRef.current = travertineTexture
    
    const woodParquetTexture = createWoodParquetTexture()
    woodTextureRef.current = woodParquetTexture

    const floorMat = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      map: travertineTexture,
      roughness: 0.7,
      metalness: 0.08,
    })
    floorMaterialRef.current = floorMat

    // Structural elements (Floor, Ring, Backdrop)
    const floor = new THREE.Mesh(new THREE.CircleGeometry(4.8, 64), floorMat)
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -0.02
    floor.receiveShadow = true
    scene.add(floor)

    const inset = new THREE.Mesh(
      new THREE.RingGeometry(2.2, 3.45, 64),
      new THREE.MeshStandardMaterial({
        color: '#e1d0b8',
        roughness: 0.7,
        metalness: 0.08,
        side: THREE.DoubleSide,
      })
    )
    inset.rotation.x = -Math.PI / 2
    inset.position.y = -0.01
    inset.receiveShadow = true
    scene.add(inset)

    const backdropMat = new THREE.MeshStandardMaterial({
      color: '#ceb17c',
      emissive: '#ceb17c',
      emissiveIntensity: 0.2,
      roughness: 0.35,
      metalness: 0.3,
    })
    backdropMatRef.current = backdropMat

    const backdrop = new THREE.Mesh(
      new THREE.TorusGeometry(2.9, 0.08, 24, 120, Math.PI),
      backdropMat
    )
    backdrop.position.set(0, 1.8, -2.2)
    backdrop.rotation.z = Math.PI
    scene.add(backdrop)

    const backPanel = new THREE.Mesh(
      createRoundedBox(6.1, 3.3, 0.1, 0.12),
      new THREE.MeshStandardMaterial({
        color: '#f9f4eb',
        roughness: 0.92,
        metalness: 0.03,
      })
    )
    backPanel.position.set(0, 1.6, -2.42)
    backPanel.receiveShadow = true
    scene.add(backPanel)

    const slatGeometry = new THREE.BoxGeometry(0.08, 2.6, 0.08)
    for (let index = -10; index <= 10; index += 1) {
      const slat = new THREE.Mesh(
        slatGeometry,
        new THREE.MeshStandardMaterial({
          color: index % 2 === 0 ? '#d7b782' : '#e8d8c0',
          roughness: 0.75,
          metalness: 0.1,
        })
      )
      slat.position.set(index * 0.28, 1.35, -2.26)
      slat.scale.y = index % 3 === 0 ? 0.95 : 1
      slat.castShadow = true
      slat.receiveShadow = true
      scene.add(slat)
    }

    // Build Detailed Set
    const signatureSet = buildSignatureSet({
      sofaMaterial,
      woodMaterial,
      charcoalMaterial,
      stoneMaterial,
      goldMaterial,
      rugMaterial,
      deskLampBulbMaterial,
      deskScreenMatRef,
      wallScreenMatRef,
      laptopGlowMatRef,
      pendantLightsMatRef,
      deskLampLightRef
    })
    signatureSet.position.set(0.08, 0, 0.15)
    signatureSet.rotation.y = 0.08
    scene.add(signatureSet)
    sceneSetRef.current = signatureSet

    // Dust particles
    const particleGeometry = new THREE.BufferGeometry()
    const particleCount = 220
    const positions = new Float32Array(particleCount * 3)
    for (let index = 0; index < particleCount; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 8
      positions[index * 3 + 1] = Math.random() * 3.8 + 0.5
      positions[index * 3 + 2] = (Math.random() - 0.5) * 6
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: '#e6c17b',
        size: 0.04,
        transparent: true,
        opacity: 0.6,
      })
    )
    scene.add(particles)

    const clock = new THREE.Clock()
    setSceneReady(true)

    const resize = () => {
      const { clientWidth, clientHeight } = mount
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight, false)
    }

    const onPointerMove = (event) => {
      const bounds = mount.getBoundingClientRect()
      const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
      const y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1
      targetRef.current.x = x
      targetRef.current.y = y
    }

    const onPointerLeave = () => {
      targetRef.current.x = 0
      targetRef.current.y = 0
    }

    const animate = () => {
      const elapsed = clock.getElapsedTime()
      const pointer = pointerRef.current
      const target = targetRef.current
      pointer.x += (target.x - pointer.x) * 0.045
      pointer.y += (target.y - pointer.y) * 0.045

      // Orbit camera positioning
      camera.position.x = pointer.x * 0.85
      camera.position.y = 2.15 + pointer.y * -0.35
      camera.lookAt(pointer.x * 0.8, 1.05 + pointer.y * 0.16, 0.15)

      // Get current configurations
      const {
        lightingMode: currentLightingMode,
        sofaColor: currentSofaColor,
        woodFinish: currentWoodFinish,
        autoRotate: currentAutoRotate,
      } = stateRef.current

      // Orbit & rotation updates
      if (sceneSetRef.current) {
        if (currentAutoRotate) {
          sceneSetRef.current.rotation.y = 0.08 + elapsed * 0.06 + pointer.x * 0.18
        } else {
          sceneSetRef.current.rotation.y = 0.08 + pointer.x * 0.35
        }
        sceneSetRef.current.rotation.x = pointer.y * 0.06
        sceneSetRef.current.position.y = Math.sin(elapsed * 0.8) * 0.03
      }

      particles.rotation.y = elapsed * 0.035
      particles.position.y = Math.sin(elapsed * 0.5) * 0.05

      // ─── SMOOTH COLOR & LIGHTING LERPS ───
      // Sofa color options
      if (sofaMaterialRef.current) {
        let sofaHex = '#eadfcb' // sand
        if (currentSofaColor === 'charcoal') sofaHex = '#2f3440'
        else if (currentSofaColor === 'forest') sofaHex = '#223c2d'
        else if (currentSofaColor === 'terracotta') sofaHex = '#c46c4f'
        sofaMaterialRef.current.color.lerp(new THREE.Color(sofaHex), 0.06)
      }

      // Wood color options
      if (woodMaterialRef.current) {
        let woodHex = '#b88a54' // oak
        if (currentWoodFinish === 'walnut') woodHex = '#4e3626'
        else if (currentWoodFinish === 'ebony') woodHex = '#1f1e1d'
        woodMaterialRef.current.color.lerp(new THREE.Color(woodHex), 0.06)
      }

      // Atmospheric configurations
      let fogHex = '#f5efe4'
      let ambientHex = '#fffcf5'
      let ambientInt = 1.4
      let keyHex = '#fff3db'
      let keyInt = 2.8
      let fillHex = '#cfa766'
      let fillInt = 16
      let coolHex = '#8fb6c9'
      let coolInt = 13
      let rimInt = 22

      let screenHex = '#8fb6c9'
      let screenInt = 0.38
      
      let laptopGlowHex = '#e3f2fd'
      let laptopGlowInt = 0.85
      
      let lampBulbHex = '#fff9e6'
      let lampBulbInt = 0.0
      
      let pendantHex = '#f1e8d4'
      let pendantInt = 0.28
      
      let backdropHex = '#ceb17c'
      let backdropInt = 0.2

      if (currentLightingMode === 'sunset') {
        fogHex = '#ebd7c1'
        ambientHex = '#ffd9b3'
        ambientInt = 0.95
        keyHex = '#ff7c3b'
        keyInt = 3.6
        fillHex = '#d45d2a'
        fillInt = 22
        coolHex = '#a55bb8'
        coolInt = 16
        rimInt = 28
        
        screenHex = '#ffa07a'
        screenInt = 0.6
        
        laptopGlowHex = '#ffe4b5'
        laptopGlowInt = 1.2
        
        lampBulbHex = '#ffbb77'
        lampBulbInt = 1.5
        
        pendantHex = '#ffddaa'
        pendantInt = 0.7
        
        backdropHex = '#ff8c00'
        backdropInt = 0.4
      } else if (currentLightingMode === 'night') {
        fogHex = '#0a0d16'
        ambientHex = '#141a2c'
        ambientInt = 0.3
        keyHex = '#3a669e'
        keyInt = 0.6
        fillHex = '#e69d12'
        fillInt = 4.0
        coolHex = '#1a3c6d'
        coolInt = 12.0
        rimInt = 8
        
        screenHex = '#70c0e0'
        screenInt = 1.2
        
        laptopGlowHex = '#aae6ff'
        laptopGlowInt = 1.8
        
        lampBulbHex = '#fff0b3'
        lampBulbInt = 3.0
        
        pendantHex = '#ffe699'
        pendantInt = 1.4
        
        backdropHex = '#4a7bb5'
        backdropInt = 0.15
      }

      // Lerping properties dynamically
      if (scene.fog) {
        scene.fog.color.lerp(new THREE.Color(fogHex), 0.04)
      }
      if (ambientRef.current) {
        ambientRef.current.color.lerp(new THREE.Color(ambientHex), 0.04)
        ambientRef.current.intensity += (ambientInt - ambientRef.current.intensity) * 0.04
      }
      if (keyLightRef.current) {
        keyLightRef.current.color.lerp(new THREE.Color(keyHex), 0.04)
        keyLightRef.current.intensity += (keyInt - keyLightRef.current.intensity) * 0.04
      }
      if (fillLightRef.current) {
        fillLightRef.current.color.lerp(new THREE.Color(fillHex), 0.04)
        fillLightRef.current.intensity += (fillInt - fillLightRef.current.intensity) * 0.04
      }
      if (coolLightRef.current) {
        coolLightRef.current.color.lerp(new THREE.Color(coolHex), 0.04)
        coolLightRef.current.intensity += (coolInt - coolLightRef.current.intensity) * 0.04
      }
      if (rimLightRef.current) {
        rimLightRef.current.intensity += (rimInt - rimLightRef.current.intensity) * 0.04
      }

      // Screen glowing meshes
      if (deskScreenMatRef.current) {
        deskScreenMatRef.current.color.lerp(new THREE.Color(screenHex), 0.04)
        deskScreenMatRef.current.emissive.lerp(new THREE.Color(screenHex), 0.04)
        deskScreenMatRef.current.emissiveIntensity += (screenInt - deskScreenMatRef.current.emissiveIntensity) * 0.04
      }
      if (wallScreenMatRef.current) {
        wallScreenMatRef.current.color.lerp(new THREE.Color(screenHex), 0.04)
        wallScreenMatRef.current.emissive.lerp(new THREE.Color(screenHex), 0.04)
        wallScreenMatRef.current.emissiveIntensity += (screenInt - wallScreenMatRef.current.emissiveIntensity) * 0.04
      }
      if (laptopGlowMatRef.current) {
        laptopGlowMatRef.current.emissive.lerp(new THREE.Color(laptopGlowHex), 0.04)
        laptopGlowMatRef.current.emissiveIntensity += (laptopGlowInt - laptopGlowMatRef.current.emissiveIntensity) * 0.04
      }

      // Desk lamp bulb & bulb light source
      if (deskLampBulbMatRef.current) {
        deskLampBulbMatRef.current.emissive.lerp(new THREE.Color(lampBulbHex), 0.04)
        deskLampBulbMatRef.current.emissiveIntensity += (lampBulbInt - deskLampBulbMatRef.current.emissiveIntensity) * 0.04
      }
      if (deskLampLightRef.current) {
        deskLampLightRef.current.color.lerp(new THREE.Color(lampBulbHex), 0.04)
        deskLampLightRef.current.intensity += (lampBulbInt * 1.5 - deskLampLightRef.current.intensity) * 0.04
      }

      // Pendants & backdrop loop glow
      if (pendantLightsMatRef.current) {
        pendantLightsMatRef.current.emissive.lerp(new THREE.Color(pendantHex), 0.04)
        pendantLightsMatRef.current.emissiveIntensity += (pendantInt - pendantLightsMatRef.current.emissiveIntensity) * 0.04
      }
      if (backdropMatRef.current) {
        backdropMatRef.current.emissive.lerp(new THREE.Color(backdropHex), 0.04)
        backdropMatRef.current.emissiveIntensity += (backdropInt - backdropMatRef.current.emissiveIntensity) * 0.04
      }

      // Update projected screen positions of Hotspots
      HOTSPOTS.forEach((hs) => {
        const el = document.getElementById(`hotspot-${hs.id}`)
        if (el) {
          const tempV = new THREE.Vector3().copy(hs.pos)
          if (sceneSetRef.current) {
            sceneSetRef.current.localToWorld(tempV)
          }
          tempV.project(camera)
          
          if (tempV.z > 1) {
            el.style.display = 'none'
          } else {
            el.style.display = 'flex'
            const x = (tempV.x * 0.5 + 0.5) * 100
            const y = (-tempV.y * 0.5 + 0.5) * 100
            el.style.left = `${x}%`
            el.style.top = `${y}%`
          }
        }

        const popupEl = document.getElementById(`popup-${hs.id}`)
        if (popupEl) {
          const tempV = new THREE.Vector3().copy(hs.pos)
          if (sceneSetRef.current) {
            sceneSetRef.current.localToWorld(tempV)
          }
          tempV.project(camera)
          
          if (tempV.z > 1) {
            popupEl.style.display = 'none'
          } else {
            popupEl.style.display = 'block'
            const x = (tempV.x * 0.5 + 0.5) * 100
            const y = (-tempV.y * 0.5 + 0.5) * 100
            popupEl.style.left = `${x}%`
            popupEl.style.top = `${y - 12}%`
          }
        }
      })

      renderer.render(scene, camera)
      frameRef.current = window.requestAnimationFrame(animate)
    }

    resize()
    animate()

    window.addEventListener('resize', resize)
    mount.addEventListener('pointermove', onPointerMove)
    mount.addEventListener('pointerleave', onPointerLeave)

    return () => {
      window.removeEventListener('resize', resize)
      mount.removeEventListener('pointermove', onPointerMove)
      mount.removeEventListener('pointerleave', onPointerLeave)
      window.cancelAnimationFrame(frameRef.current)
      renderer.dispose()
      scene.traverse((child) => {
        if (child.geometry) child.geometry.dispose()
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => material.dispose())
        } else if (child.material) {
          child.material.dispose()
        }
      })
      if (travertineTexture) travertineTexture.dispose()
      if (woodParquetTexture) woodParquetTexture.dispose()
      if (rugTexture) rugTexture.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div className={`interior-scene theme-${lightingMode}`}>
      <div ref={mountRef} className="interior-scene__canvas" aria-hidden="true" />

      {/* Pulsing Hotspots Layer */}
      <div className="interior-scene__hotspots-layer">
        {HOTSPOTS.map((hs) => (
          <button
            key={hs.id}
            id={`hotspot-${hs.id}`}
            className={`interior-scene__hotspot-btn ${activeHotspot === hs.id ? 'is-active' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              setActiveHotspot(activeHotspot === hs.id ? null : hs.id)
            }}
            title={hs.title}
          >
            <span className="interior-scene__hotspot-pulse" />
            <span className="interior-scene__hotspot-icon">+</span>
          </button>
        ))}

        {HOTSPOTS.map((hs) => {
          if (activeHotspot !== hs.id) return null
          return (
            <div
              key={`popup-${hs.id}`}
              id={`popup-${hs.id}`}
              className="interior-scene__hotspot-popup glass-card"
              style={{ pointerEvents: 'auto' }}
            >
              <div className="interior-scene__popup-header">
                <h4>{hs.title}</h4>
                <button
                  className="interior-scene__popup-close"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveHotspot(null)
                  }}
                >
                  <X size={14} />
                </button>
              </div>
              <p>{hs.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Overlay HUD Panel Details */}
      <div className="interior-scene__hud">
        <div className="interior-scene__eyebrow">{SCENE_COPY.eyebrow}</div>
        <div className="interior-scene__metrics" aria-label="Interior scene highlights">
          <span className={`interior-scene__metric ${sceneReady ? 'is-active' : ''}`}>Spatial Rendering</span>
          <span className="interior-scene__metric">Textured Geometry</span>
          <span className="interior-scene__metric">Configurator Active</span>
        </div>

        <div className="interior-scene__panel glass-card">
          <span className="interior-scene__panel-label">Interactive 3D Engine</span>
          <h3>{SCENE_COPY.title}</h3>
          <p>{SCENE_COPY.description}</p>
        </div>
      </div>

      {/* Collapsed customizer toggle cog button */}
      {!customizerOpen && (
        <button
          className="interior-scene__toggle-btn"
          onClick={() => setCustomizerOpen(true)}
          title="Open Customizer"
        >
          <Settings size={16} />
        </button>
      )}

      {/* 3D Studio Configurator Control Panel */}
      <div className={`interior-scene__customizer ${customizerOpen ? 'is-open' : ''}`}>
        <div className="interior-scene__customizer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Sparkles size={14} className="interior-scene__customizer-icon" />
            <span>3D Studio</span>
          </div>
          <button
            className="interior-scene__popup-close"
            onClick={() => setCustomizerOpen(false)}
            title="Hide Panel"
            style={{ pointerEvents: 'auto' }}
          >
            <X size={14} />
          </button>
        </div>
        
        {/* Lighting Atmosphere Selector */}
        <div className="interior-scene__customizer-section">
          <label className="interior-scene__customizer-label">Atmosphere</label>
          <div className="interior-scene__lighting-grid">
            <button
              className={`interior-scene__light-btn ${lightingMode === 'day' ? 'is-active' : ''}`}
              onClick={() => setLightingMode('day')}
              title="Day Mode"
            >
              <Sun size={14} />
              <span>Day</span>
            </button>
            <button
              className={`interior-scene__light-btn ${lightingMode === 'sunset' ? 'is-active' : ''}`}
              onClick={() => setLightingMode('sunset')}
              title="Sunset Mode"
            >
              <Sunset size={14} />
              <span>Sunset</span>
            </button>
            <button
              className={`interior-scene__light-btn ${lightingMode === 'night' ? 'is-active' : ''}`}
              onClick={() => setLightingMode('night')}
              title="Night Mode"
            >
              <Moon size={14} />
              <span>Night</span>
            </button>
          </div>
        </div>

        {/* Sofa upholstery options */}
        <div className="interior-scene__customizer-section">
          <label className="interior-scene__customizer-label">Sofa Fabric</label>
          <div className="interior-scene__color-row">
            {[
              { id: 'boucle', color: '#eadfcb', name: 'Sand Bouclé' },
              { id: 'charcoal', color: '#2f3440', name: 'Charcoal Wool' },
              { id: 'forest', color: '#223c2d', name: 'Forest Velvet' },
              { id: 'terracotta', color: '#c46c4f', name: 'Terracotta' }
            ].map((opt) => (
              <button
                key={opt.id}
                className={`interior-scene__color-chip ${sofaColor === opt.id ? 'is-active' : ''}`}
                style={{ backgroundColor: opt.color }}
                onClick={() => setSofaColor(opt.id)}
                title={opt.name}
              />
            ))}
          </div>
        </div>

        {/* Timber finish options */}
        <div className="interior-scene__customizer-section">
          <label className="interior-scene__customizer-label">Wood Detail</label>
          <div className="interior-scene__color-row">
            {[
              { id: 'oak', color: '#b88a54', name: 'Natural Oak' },
              { id: 'walnut', color: '#4e3626', name: 'Dark Walnut' },
              { id: 'ebony', color: '#1f1e1d', name: 'Smoked Ebony' }
            ].map((opt) => (
              <button
                key={opt.id}
                className={`interior-scene__color-chip ${woodFinish === opt.id ? 'is-active' : ''}`}
                style={{ backgroundColor: opt.color }}
                onClick={() => setWoodFinish(opt.id)}
                title={opt.name}
              />
            ))}
          </div>
        </div>

        {/* Flooring Selector */}
        <div className="interior-scene__customizer-section">
          <label className="interior-scene__customizer-label">Flooring Type</label>
          <div className="interior-scene__floor-grid">
            <button
              className={`interior-scene__floor-btn ${floorType === 'travertine' ? 'is-active' : ''}`}
              onClick={() => setFloorType('travertine')}
            >
              Travertine
            </button>
            <button
              className={`interior-scene__floor-btn ${floorType === 'wood' ? 'is-active' : ''}`}
              onClick={() => setFloorType('wood')}
            >
              Parquet
            </button>
            <button
              className={`interior-scene__floor-btn ${floorType === 'sand' ? 'is-active' : ''}`}
              onClick={() => setFloorType('sand')}
            >
              Minimal
            </button>
          </div>
        </div>

        {/* Orbit toggle */}
        <div className="interior-scene__customizer-footer">
          <button
            className={`interior-scene__control-btn ${autoRotate ? 'is-active' : ''}`}
            onClick={() => setAutoRotate(!autoRotate)}
            title={autoRotate ? 'Pause Rotation' : 'Resume Rotation'}
          >
            <RotateCw size={12} className={autoRotate ? 'spinning' : ''} />
            <span>{autoRotate ? 'Orbit Active' : 'Orbit Stopped'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
