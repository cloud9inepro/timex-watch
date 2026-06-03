import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Scene from './components/Scene'
import HeroUI from './components/HeroUI'
// import './fonts.css'

gsap.registerPlugin(ScrollTrigger)

export default function App() {

  useEffect(() => {
    const lenis = new Lenis()

    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <div className="relative bg-black" style={{ height: '700vh' }}>

      <Canvas
        className="fixed top-0 left-0 w-full"
        style={{ height: '100dvh', zIndex: 1 }}
        camera={{ position: [0, 0, 8], fov: 42 }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
        shadows
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.1
          gl.outputColorSpace = THREE.SRGBColorSpace
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      <HeroUI />

      <section id="hero"     className="h-screen pointer-events-none" />
      <section id="case"     className="h-screen pointer-events-none" />
      <section id="dial"     className="h-screen pointer-events-none" />
      <section id="strap"    className="h-screen pointer-events-none" />
      <section id="explode"  className="h-screen pointer-events-none" />
      <section id="movement" className="h-screen pointer-events-none" />
      <section id="cta"      className="h-screen pointer-events-none" />

    </div>
  )
}