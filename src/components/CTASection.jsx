import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function CTASection() {
  const sectionRef   = useRef(null)
  const labelRef     = useRef(null)
  const dividerRef   = useRef(null)
  const priceRef     = useRef(null)
  const titleRef     = useRef(null)
  const buttonRef    = useRef(null)
  const guaranteeRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
        defaults: { ease: 'power3.out' },
      })

      tl.from(labelRef.current,     { opacity: 0, y: 20, duration: 0.7 })
      tl.from(dividerRef.current,   { scaleY: 0, transformOrigin: 'top', duration: 0.8 }, '-=0.3')
      tl.from(priceRef.current,     { opacity: 0, y: 40, duration: 0.9 }, '-=0.4')
      tl.from(titleRef.current,     { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')
      tl.from(buttonRef.current,    { opacity: 0, y: 20, duration: 0.7 }, '-=0.3')
      tl.from(guaranteeRef.current, { opacity: 0, duration: 0.6 },        '-=0.2')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative min-h-screen flex flex-col items-center justify-center px-8 py-24 text-center"
      style={{ background: '#0a0a0a' }}
    >
      {/* Edition label */}
      <p
        ref={labelRef}
        className="font-condensed tracking-[0.35em] text-[0.65rem] uppercase mb-8"
        style={{ color: '#c5a45a' }}
      >
        Expedition Scout · Limited Edition
      </p>

      {/* Vertical divider */}
      <div
        ref={dividerRef}
        className="mb-10"
        style={{ width: '1px', height: '56px', background: 'rgba(255,255,255,0.18)' }}
      />

      {/* Price */}
      <h2
        ref={priceRef}
        className="font-serif font-light italic text-white mb-4 leading-none"
        style={{ fontSize: 'clamp(4.5rem, 12vw, 9rem)' }}
      >
        $119
      </h2>

      {/* Product name */}
      <p
        ref={titleRef}
        className="font-condensed tracking-[0.22em] text-[0.68rem] uppercase mb-14"
        style={{ color: '#666' }}
      >
        Timex Expedition Scout Chronograph
      </p>

      {/* CTA button — border with fill-on-hover */}
      <button
        ref={buttonRef}
        className="relative overflow-hidden border border-white font-condensed tracking-[0.3em] text-[0.75rem] uppercase px-14 py-4 text-white group"
      >
        <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
          Shop Now
        </span>
        <div
          className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"
        />
      </button>

      {/* Trust signals */}
      <p
        ref={guaranteeRef}
        className="font-condensed tracking-[0.18em] text-[0.6rem] uppercase mt-10"
        style={{ color: '#444' }}
      >
        Free Shipping &nbsp;·&nbsp; 30-Day Returns &nbsp;·&nbsp; 2-Year Warranty
      </p>
    </section>
  )
}