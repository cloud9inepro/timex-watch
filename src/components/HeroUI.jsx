import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useAnimStore } from '../store/animStore'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
export default function HeroUI() {
  const heroAnimComplete = useAnimStore((s) => s.heroAnimComplete)

  const navRef     = useRef(null)
  const labelRef   = useRef(null)
  const line1Ref   = useRef(null)
  const line2Ref   = useRef(null)
  const dividerRef = useRef(null)
  const scrollRef  = useRef(null)
  const containerRef = useRef(null)

  // Nav fades in quietly on mount regardless of watch animation
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.4, ease: 'power2.out', delay: 0.5 }
    )
  }, [])

  // Text block reveals once watch zoom lands
  useEffect(() => {
    if (!heroAnimComplete) return

    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .fromTo(labelRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7 }
      )
      .fromTo(line1Ref.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.85 },
        '-=0.4'
      )
      .fromTo(line2Ref.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.85 },
        '-=0.6'
      )
      .fromTo(dividerRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, transformOrigin: 'left' },
        '-=0.3'
      )
      .fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 0.45, duration: 0.6 },
        '-=0.1'
      )
  }, [heroAnimComplete])

  useEffect(() => {
  gsap.to(containerRef.current, {
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      start: 'top top',
      end: '+=300',
      scrub: true,
    }
  })
}, [])

  return (
    <div
      
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 10 }}
    >

      {/* ── Vignette ───────────────────────────────────────────── */}
      {/* <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.7) 100%)',
          pointerEvents: 'none',
        }}
      /> */}

      {/* ── Nav ───────────────────────────────────────────────── */}
      <nav
        ref={navRef}
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 pt-8 md:px-12 md:pt-10 opacity-0 pointer-events-auto"
      >
        {/* Hamburger */}
        <button aria-label="Menu" className="flex flex-col gap-[5px] group">
          <span className="block h-px bg-white transition-all duration-300 group-hover:w-8" style={{ width: '24px' }} />
          <span className="block h-px bg-white transition-all duration-300 group-hover:w-8" style={{ width: '16px' }} />
          <span className="block h-px bg-white transition-all duration-300 group-hover:w-8" style={{ width: '24px' }} />
        </button>

        {/* Logo */}
        <span
          className="text-white select-none"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: '0.78rem',
            letterSpacing: '0.38em',
            fontWeight: 400,
          }}
        >
          TIMEX
        </span>

        {/* Balance spacer */}
        <div style={{ width: '24px' }} />
      </nav>

      {/* ── Text block ────────────────────────────────────────── */}
      <div
      ref={containerRef}
        className="absolute bottom-0 left-0 px-8 pb-12 md:px-12 md:pb-16"
        style={{ maxWidth: '520px' }}
      >
        {/* Label */}
        <p
          ref={labelRef}
          className="opacity-0 mb-3"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#aaaaaa',
            fontWeight: 400,
          }}
        >
          Expedition Scout Chronograph
        </p>

        {/* Headline */}
        <h1
          ref={line1Ref}
          className="text-white opacity-0 leading-none"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(3rem, 7.5vw, 6rem)',
            fontWeight: 300,
            fontStyle: 'italic',
          }}
        >
          Built for
        </h1>
        <h1
          ref={line2Ref}
          className="text-white opacity-0 leading-none mb-6"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(3rem, 7.5vw, 6rem)',
            fontWeight: 300,
            fontStyle: 'italic',
          }}
        >
          the Field.
        </h1>

        {/* Divider */}
        <div
          ref={dividerRef}
          style={{
            width: '48px',
            height: '1px',
            background: 'rgba(255,255,255,0.5)',
            marginBottom: '18px',
            transform: 'scaleX(0)',
          }}
        />

        {/* Scroll hint */}
        <p
          ref={scrollRef}
          className="opacity-0 text-white"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: '0.62rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontWeight: 300,
          }}
        >
          Scroll to explore &nbsp;↓
        </p>
      </div>

    </div>
  )
}