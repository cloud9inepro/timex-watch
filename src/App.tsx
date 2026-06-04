import { Canvas } from '@react-three/fiber'
import { Loader } from '@react-three/drei'
import { Suspense, useEffect } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Scene from './components/Scene'
import HeroUI from './components/HeroUI'

gsap.registerPlugin(ScrollTrigger)

export default function App() {

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

  return (
    <>
    {/* Canvas outside scroll container — truly fixed */}
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
      gl={{ antialias: true }}
      dpr={Math.min(window.devicePixelRatio, 1.5)}
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

    <Loader />
    <HeroUI />

    {/* Scroll spacers — only purpose is scroll height */}
    <div className="relative" style={{ height: '850vh' }}>
      <section id="hero"      className="h-screen pointer-events-none bg-white" />
      <section id="case"      className="h-screen pointer-events-none" />
      <section id="dial"      className="h-screen pointer-events-none" />
      <section id="strap"     className="h-screen pointer-events-none" />
      <section id="explode"   className="pointer-events-none" style={{ height: '150vh' }} />
      <section id="gear-zoom" className="pointer-events-none" style={{ height: '200vh' }} />
      <section id="cta"       className="h-screen pointer-events-none" />
    </div>
  </>
  )
}