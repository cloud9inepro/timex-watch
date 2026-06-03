import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { Model as Watch } from './models/Watch'
import { useAnimStore } from '../store/animStore'

export default function HeroScene() {
  const groupRef    = useRef(null)
  const floatActive = useRef(false)
  const baseY       = useRef(0)

  const setHeroAnimComplete = useAnimStore((s) => s.setHeroAnimComplete)

  useEffect(() => {
    if (!groupRef.current) return

    const isMobile = window.innerWidth < 768

    // Phase 1 — settled position after entrance
    const settledScale = isMobile ? 0.27 : 0.33
    const settledX     = isMobile ? 0    : 0
    const settledY     = isMobile ? 0.2  : 0
    const settledRotY  = isMobile ? 0    : 0

    // Phase 2 — zoomed dial-fill position
    const zoomedScale  = isMobile ? 0.47  : 0.63
    const zoomedX      = isMobile ? 1   : 1.5
    const zoomedY      = isMobile ? -1  : -1
    const zoomedRotX   = isMobile ? -0.70 : -0.70   // ← tilts face toward camera
    const zoomedRotY   = isMobile ? -0.08    : -0.08
    const zoomedRotZ   = isMobile ? -1.4    : -1.4
    // Set start state
    gsap.set(groupRef.current.rotation, { y: Math.PI })
    gsap.set(groupRef.current.scale,    { x: 0.08, y: 0.08, z: 0.08 })
    gsap.set(groupRef.current.position, { x: 0, y: 0, z: 0 })

    baseY.current = settledY

    gsap.timeline({ delay: 0.4 })

      // ── Phase 1: entrance from back ──────────────────────────
      .to(groupRef.current.rotation, {
        y: settledRotY,
        duration: 2,
        ease: 'power2.inOut'
      }, 0)
      .to(groupRef.current.position, {
        x: settledX, y: settledY,
        duration: 2,
        ease: 'power2.inOut'
      }, 0)
      .to(groupRef.current.scale, {
        x: settledScale, y: settledScale, z: settledScale,
        duration: 2,
        ease: 'power2.inOut'
      }, 0)

      // Start float once settled
      .call(() => { floatActive.current = true })

      // ── 3 second hold ────────────────────────────────────────
      .to({}, { duration: 1 })

      // ── Phase 2: zoom into dial ──────────────────────────────
      // Stop float before zoom so it doesn't fight GSAP
      .call(() => { floatActive.current = false })
      .to(groupRef.current.scale, {
        x: zoomedScale, y: zoomedScale, z: zoomedScale,
        duration: 1.8,
        ease: 'power3.inOut'
      })
      .to(groupRef.current.position, {
        x: zoomedX, y: zoomedY,
        duration: 1.8,
        ease: 'power3.inOut'
      }, '<')
      .to(groupRef.current.rotation, {
        y: zoomedRotY,
        x: zoomedRotX,
        z: zoomedRotZ,
        duration: 1.8,
        ease: 'power3.inOut'
      }, '<')

      // Trigger text reveal once zoom lands
      .call(() => { setHeroAnimComplete() })

  }, [setHeroAnimComplete])

  useFrame(({ clock }) => {
    if (!groupRef.current || !floatActive.current) return
    const t = clock.elapsedTime
    groupRef.current.position.y = baseY.current + Math.sin(t * 0.65) * 0.055
  })

  return (
    <group ref={groupRef}>
      <Watch />
    </group>
  )
}