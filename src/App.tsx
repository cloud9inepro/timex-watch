import { Canvas } from '@react-three/fiber'
import { Loader } from '@react-three/drei'
import { Suspense, useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Scene from './components/Scene'
import HeroUI from './components/HeroUI'
import SectionUI from './components/SectionUI'
import StorySection from './components/StorySection'
import ReviewsSection from './components/ReviewsSection'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
const bgRef = useRef<HTMLDivElement | null>(null)
const canvasRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const lenis = new Lenis()

    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tick)
    }
  }, [])

  useEffect(() => {
  ScrollTrigger.create({
    trigger: '#case',
    start: 'top 50%', end: 'bottom 50%',
    onEnter:     () => gsap.to(bgRef.current, { backgroundColor: '#d4cfc9', duration: 0.8 }),
    onLeaveBack: () => gsap.to(bgRef.current, { backgroundColor: '#000000', duration: 0.8 }),
  })

  ScrollTrigger.create({
    trigger: '#dial',
    start: 'top 50%', end: 'bottom 50%',
    onEnter:     () => gsap.to(bgRef.current, { backgroundColor: '#1a1a1a', duration: 0.8 }),
    onLeaveBack: () => gsap.to(bgRef.current, { backgroundColor: '#d4cfc9', duration: 0.8 }),
  })

  ScrollTrigger.create({
    trigger: '#strap',
    start: 'top 50%', end: 'bottom 50%',
    onEnter:     () => gsap.to(bgRef.current, { backgroundColor: '#2c1f14', duration: 0.8 }),
    onLeaveBack: () => gsap.to(bgRef.current, { backgroundColor: '#1a1a1a', duration: 0.8 }),
  })

  ScrollTrigger.create({
    trigger: '#explode',
    start: 'top 50%',
    onEnter:     () => gsap.to(bgRef.current, { backgroundColor: '#000000', duration: 0.8 }),
    onLeaveBack: () => gsap.to(bgRef.current, { backgroundColor: '#2c1f14', duration: 0.8 }),
  })
}, [])


    // Add to the section background ScrollTriggers useEffect:
ScrollTrigger.create({
  trigger: '#story',
  start: 'top 60%',
  onEnter:     () => {
    const canvas = canvasRef.current
    if (!canvas) return
    gsap.to(canvas, { opacity: 0, duration: 0.6 })
    canvas.style.pointerEvents = 'none'
  },
  onLeaveBack: () => {
    const canvas = canvasRef.current
    if (!canvas) return
    gsap.to(canvas, { opacity: 1, duration: 0.6 })
    canvas.style.pointerEvents = 'auto'
  },
})

ScrollTrigger.create({
  trigger: '#reviews',
  start: 'top 60%',
  onEnter: () => {
    const canvas = canvasRef.current
    if (!canvas) return
    gsap.to(canvas, { opacity: 0, duration: 0.5 })
    canvas.style.pointerEvents = 'none'
  },
  onLeaveBack: () => {
    const canvas = canvasRef.current
    if (!canvas) return
    gsap.to(canvas, { opacity: 1, duration: 0.5 })
    canvas.style.pointerEvents = 'auto'
  },
})

ScrollTrigger.create({
  trigger: '#explode',
  start: 'top 60%',
  onEnter:     () => {
    const canvas = canvasRef.current
    if (!canvas) return
    gsap.to(canvas, { opacity: 1, duration: 0.6 })
    canvas.style.pointerEvents = 'auto'
  },
  onLeaveBack: () => {
    const canvas = canvasRef.current
    if (!canvas) return
    gsap.to(canvas, { opacity: 0, duration: 0.6 })
    canvas.style.pointerEvents = 'none'
  },
})

  return (
    <>
    {/* Canvas outside scroll container — truly fixed */}
    <div ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 1 }}>

    
    <Canvas
       style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 1,
  }}
      camera={{ position: [0, 0, 8], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      dpr={Math.min(window.devicePixelRatio, 1.5)}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.1
        gl.outputColorSpace = THREE.SRGBColorSpace
        gl.setClearColor(0x000000, 0) 
      }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
    </div>

    <Loader />
    <HeroUI />
    <SectionUI/>

    {/* Scroll spacers — only purpose is scroll height */}
    <div ref={bgRef} className="relative" /*style={{ height: '1100vh' }}*/>
      <section id="hero"      className="h-screen pointer-events-none " />
      <section id="case"      className="h-screen pointer-events-none" />
      <section id="dial"      className="h-screen pointer-events-none" />
      <section id="strap"     className="h-screen pointer-events-none" />
      <StorySection />
      <ReviewsSection />
      <section id="explode"   className="pointer-events-none" style={{ height: '150vh' }} />
      <section id="gear-zoom" className="pointer-events-none" style={{ height: '200vh' }} />
      <section id="cta"       className="h-screen " />
    </div>
  </>
  )
}