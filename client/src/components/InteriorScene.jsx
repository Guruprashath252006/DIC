import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const SCENE_COPY = {
  eyebrow: 'Live 3D Design Preview',
  title: 'Real-time Spatial Rendering',
  description: 'Explore layouts, finishes, and spatial flow in high fidelity. Walk through your customized space, previewing material textures and lighting before execution begins.',
  tint: '#c7a469',
}

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

const buildSignatureSet = () => {
  const group = new THREE.Group()

  const softMaterial = new THREE.MeshStandardMaterial({
    color: '#eadfcb',
    roughness: 0.78,
    metalness: 0.08,
  })

  const oakMaterial = new THREE.MeshStandardMaterial({
    color: '#b88a54',
    roughness: 0.58,
    metalness: 0.2,
  })

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

  const platform = new THREE.Mesh(createRoundedBox(6.1, 0.16, 3.4, 0.14), stoneMaterial)
  platform.position.set(0.05, 0.04, 0.12)
  group.add(platform)

  const rug = new THREE.Mesh(
    createRoundedBox(3.6, 0.03, 2.16, 0.1),
    new THREE.MeshStandardMaterial({ color: '#ece2d1', roughness: 0.92, metalness: 0.02 })
  )
  rug.position.set(-0.32, 0.14, 0.42)
  group.add(rug)

  const sofaBase = new THREE.Mesh(createRoundedBox(2.55, 0.72, 1.06, 0.12), softMaterial)
  sofaBase.position.set(-1.45, 0.42, 0.78)
  group.add(sofaBase)

  const sofaBack = new THREE.Mesh(createRoundedBox(2.45, 0.84, 0.25, 0.08), softMaterial)
  sofaBack.position.set(-1.45, 0.92, 0.22)
  group.add(sofaBack)

  const armRestGeometry = createRoundedBox(0.24, 0.62, 1.02, 0.08)
  const leftArm = new THREE.Mesh(armRestGeometry, oakMaterial)
  leftArm.position.set(-2.61, 0.58, 0.77)
  group.add(leftArm)

  const rightArm = leftArm.clone()
  rightArm.position.x = -0.29
  group.add(rightArm)

  const cushionGeometry = createRoundedBox(0.72, 0.26, 0.78, 0.08)
  ;[-2.12, -1.45, -0.78].forEach((x, index) => {
    const cushion = new THREE.Mesh(cushionGeometry, index === 1 ? oakMaterial : softMaterial)
    cushion.position.set(x, 0.82, 0.82)
    cushion.rotation.x = -0.05
    group.add(cushion)
  })

  const tableTop = new THREE.Mesh(createRoundedBox(1.42, 0.12, 0.82, 0.08), charcoalMaterial)
  tableTop.position.set(0.18, 0.42, 0.5)
  group.add(tableTop)

  // Coffee Table Legs (Charcoal leg + gold metal tip)
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

  // Circular Nesting Coffee Table (travertine top + gold leg)
  const nestingTop = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.08, 24), stoneMaterial)
  nestingTop.position.set(0.85, 0.52, 0.9)
  group.add(nestingTop)
  
  const nestingLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.44, 16), goldMaterial)
  nestingLeg.position.set(0.85, 0.26, 0.9)
  group.add(nestingLeg)

  const deskTop = new THREE.Mesh(createRoundedBox(1.72, 0.1, 0.72, 0.07), stoneMaterial)
  deskTop.position.set(1.9, 0.84, -0.08)
  group.add(deskTop)

  // Desk Legs (Charcoal leg + gold tip)
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

  // Designer Chair Legs (Gold metallic splayed legs)
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

  const laptopGlow = new THREE.Mesh(
    createRoundedBox(0.41, 0.27, 0.005, 0.01),
    new THREE.MeshStandardMaterial({
      color: '#ffffff',
      emissive: '#e3f2fd',
      emissiveIntensity: 0.85,
      roughness: 0.1,
    })
  )
  laptopGlow.position.set(1.9, 1.03, -0.02)
  laptopGlow.rotation.x = -0.22
  group.add(laptopGlow)

  // Ceramic mug on desk
  const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.08, 16), softMaterial)
  mug.position.set(1.45, 0.93, 0.08)
  group.add(mug)

  const deskScreen = new THREE.Mesh(
    createRoundedBox(0.92, 0.58, 0.05, 0.04),
    new THREE.MeshStandardMaterial({
      color: '#8fb6c9',
      emissive: '#8fb6c9',
      emissiveIntensity: 0.38,
      roughness: 0.24,
      metalness: 0.18,
    })
  )
  deskScreen.position.set(1.9, 1.18, -0.06)
  group.add(deskScreen)

  const lampPole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 1.45, 16), oakMaterial)
  lampPole.position.set(2.95, 0.78, 0.78)
  group.add(lampPole)

  const lampShade = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.22, 0.35, 24, 1, true), softMaterial)
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

  const divider = new THREE.Mesh(createRoundedBox(0.12, 1.84, 2.4, 0.04), oakMaterial)
  divider.position.set(0.98, 1.02, 0.18)
  group.add(divider)

  const wallScreenFrame = new THREE.Mesh(createRoundedBox(1.9, 1.1, 0.08, 0.05), charcoalMaterial)
  wallScreenFrame.position.set(1.85, 1.56, -1.58)
  group.add(wallScreenFrame)

  const wallScreen = new THREE.Mesh(
    createRoundedBox(1.62, 0.82, 0.04, 0.04),
    new THREE.MeshStandardMaterial({
      color: '#95b8c5',
      emissive: '#95b8c5',
      emissiveIntensity: 0.46,
      roughness: 0.22,
      metalness: 0.1,
    })
  )
  wallScreen.position.set(1.85, 1.56, -1.52)
  group.add(wallScreen)

  const pendantBar = new THREE.Mesh(new THREE.BoxGeometry(4.9, 0.06, 0.08), charcoalMaterial)
  pendantBar.position.set(0.15, 2.28, 0.18)
  group.add(pendantBar)

  ;[-1.5, 0, 1.5].forEach((x) => {
    const light = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.48, 18),
      new THREE.MeshStandardMaterial({
        color: '#f1e8d4',
        emissive: '#f1e8d4',
        emissiveIntensity: 0.28,
        roughness: 0.5,
      })
    )
    light.position.set(x, 1.98, 0.18)
    group.add(light)
  })

  // Gold Throw Pillow on Sofa corner
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

  // Minimalist Olive Planter Pot + branches/leaves
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
  ].forEach(([dx, dz, rx, rz, h], bIdx) => {
    const branchGeometry = new THREE.CylinderGeometry(0.012, 0.018, h, 8)
    const branch = new THREE.Mesh(branchGeometry, oakMaterial)
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

  // Second Gallery Wall Art Frame (Asymmetric vertical layout)
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
    new THREE.MeshStandardMaterial({
      color: '#fff9e6',
      emissive: '#fff9e6',
      emissiveIntensity: 1.2,
    })
  )
  lampBulb.position.set(1.08, 1.18, 0.22)
  group.add(lampBulb)

  return group
}

export default function InteriorScene() {
  const mountRef = useRef(null)
  const sceneSetRef = useRef(null)
  const frameRef = useRef(0)
  const pointerRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const [sceneReady, setSceneReady] = useState(false)

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
    mount.appendChild(renderer.domElement)

    const ambient = new THREE.AmbientLight('#fff8ef', 1.4)
    scene.add(ambient)

    const keyLight = new THREE.DirectionalLight('#fff3db', 2.8)
    keyLight.position.set(4, 7, 6)
    scene.add(keyLight)

    const fillLight = new THREE.PointLight('#cfa766', 16, 18, 2)
    fillLight.position.set(-4.2, 2.8, 3.4)
    scene.add(fillLight)

    const coolLight = new THREE.PointLight('#8fb6c9', 13, 18, 2)
    coolLight.position.set(3.6, 2.4, 1.8)
    scene.add(coolLight)

    const rimLight = new THREE.SpotLight('#f8dfad', 22, 18, 0.58, 0.44, 1.3)
    rimLight.position.set(0, 4.8, 2.2)
    rimLight.target.position.set(0.1, 0.8, 0.2)
    scene.add(rimLight)
    scene.add(rimLight.target)

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(4.8, 64),
      new THREE.MeshStandardMaterial({
        color: '#efe4d3',
        roughness: 0.9,
        metalness: 0.05,
      })
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -0.02
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
    scene.add(inset)

    const backdrop = new THREE.Mesh(
      new THREE.TorusGeometry(2.9, 0.08, 24, 120, Math.PI),
      new THREE.MeshStandardMaterial({
        color: '#ceb17c',
        emissive: '#ceb17c',
        emissiveIntensity: 0.2,
        roughness: 0.35,
        metalness: 0.3,
      })
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
      scene.add(slat)
    }

    const signatureSet = buildSignatureSet()
    signatureSet.position.set(0.08, 0, 0.15)
    signatureSet.rotation.y = 0.08
    scene.add(signatureSet)
    sceneSetRef.current = signatureSet

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

      camera.position.x = pointer.x * 0.85
      camera.position.y = 2.15 + pointer.y * -0.35
      camera.lookAt(pointer.x * 0.8, 1.05 + pointer.y * 0.16, 0.15)

      if (sceneSetRef.current) {
        sceneSetRef.current.rotation.y = 0.08 + elapsed * 0.11 + pointer.x * 0.18
        sceneSetRef.current.rotation.x = pointer.y * 0.06
        sceneSetRef.current.position.y = Math.sin(elapsed * 0.8) * 0.04
      }

      particles.rotation.y = elapsed * 0.035
      particles.position.y = Math.sin(elapsed * 0.5) * 0.05

      fillLight.intensity = 15 + Math.sin(elapsed * 0.9) * 1.5
      coolLight.intensity = 12 + Math.cos(elapsed * 0.75) * 1.2
      backdrop.material.emissive.set(SCENE_COPY.tint)

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
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div className="interior-scene">
      <div ref={mountRef} className="interior-scene__canvas" aria-hidden="true" />

      <div className="interior-scene__hud">
        <div className="interior-scene__eyebrow">{SCENE_COPY.eyebrow}</div>
        <div className="interior-scene__metrics" aria-label="Interior scene highlights">
          <span className={`interior-scene__metric ${sceneReady ? 'is-active' : ''}`}>Unified project design</span>
          <span className="interior-scene__metric">Enhanced 3D detailing</span>
          <span className="interior-scene__metric">Home and professional ready</span>
        </div>

        <div className="interior-scene__panel glass-card">
          <span className="interior-scene__panel-label">Interactive 3D Engine</span>
          <h3>{SCENE_COPY.title}</h3>
          <p>{SCENE_COPY.description}</p>
        </div>
      </div>
    </div>
  )
}
