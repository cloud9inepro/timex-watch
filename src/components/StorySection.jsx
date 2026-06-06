import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function StorySection() {
  const sectionRef  = useRef(null)
  const labelRef    = useRef(null)
  const lineRef     = useRef(null)
  const headlineRef = useRef(null)
  const bodyRef     = useRef(null)
  const statsRef    = useRef(null)
useEffect(() => {
  const ctx = gsap.context(() => {
    const words = headlineRef.current.querySelectorAll('.word')
    const stats = statsRef.current.querySelectorAll('.stat-item')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=1000',
        scrub: 1.5,
        pin: true,
        pinSpacing: true,
      },
    })

    // Label
    tl.from(labelRef.current, {
      opacity: 0, y: 20, duration: 1,
    }, 0)

    // Divider expands
    tl.from(lineRef.current, {
      scaleX: 0,
      transformOrigin: 'left',
      duration: 1.5,
    }, 0.5)

    // Headline words stagger
    tl.from(words, {
      opacity: 0, y: 40,
      stagger: 0.3,
      duration: 1,
    }, 1)

    // Body text
    tl.from(bodyRef.current, {
      opacity: 0, y: 24, duration: 1.5,
    }, 2.5)

    // Stats stagger in
    tl.from(stats, {
      opacity: 0, y: 30,
      stagger: 0.8,
      duration: 1.2,
    }, 3)

    // Stat counters — scrub drives them up and down naturally
    stats.forEach((stat, i) => {
      const numEl  = stat.querySelector('.stat-num')
      const target = parseInt(numEl.dataset.target)
      const obj    = { val: 0 }

      tl.to(obj, {
        val: target,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => {
          if (numEl) numEl.textContent = Math.round(obj.val) + numEl.dataset.suffix
        },
      }, 3 + i * 0.8)
    })

    // Bottom quote
    tl.from(sectionRef.current.querySelector('.bottom-quote'), {
      opacity: 0, duration: 1.5,
    }, 5.5)

  }, sectionRef)

  return () => ctx.revert()
}, [])

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 py-24"
      style={{ zIndex: 2, background: '#0d0d0d' }}
    >
      {/* Label */}
      <p
        ref={labelRef}
        className="font-condensed tracking-[0.35em] text-[0.65rem] uppercase mb-6"
        style={{ color: '#c5a45a' }}
      >
        Timex Expedition — Est. 1854
      </p>

      {/* Divider */}
      <div
        ref={lineRef}
        className="mb-10 md:mb-14"
        style={{ height: '1px', background: 'rgba(255,255,255,0.15)', width: '100%' }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

        {/* Left — headline + body */}
        <div>
          <h2
            ref={headlineRef}
            className="font-serif font-light italic text-white mb-8 leading-tight"
            style={{ fontSize: 'clamp(2.6rem, 5vw, 4.2rem)' }}
          >
            {['Made', 'for', 'those', 'who', "don't", 'watch', 'the', 'clock.'].map((word, i) => (
              <span key={i} className="word inline-block mr-[0.25em]">{word}</span>
            ))}
          </h2>

          <p
            ref={bodyRef}
            className="font-condensed font-light leading-relaxed"
            style={{
              color: '#999',
              fontSize: '1rem',
              maxWidth: '420px',
              lineHeight: 1.8,
            }}
          >
            In 1854, a small factory in Waterbury, Connecticut began making
            watches for the American worker. Not for ballrooms or boardrooms —
            for the field, the factory floor, and the long road home. 170 years
            later that promise hasn't changed. The Expedition Scout Chronograph
            is built for the same person: someone who needs a watch that works
            as hard as they do.
          </p>
        </div>

        {/* Right — stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 gap-8 md:gap-10 md:pt-4"
        >
          {[
            { num: 170,  suffix: '',   label: 'Years of Precision'   },
            { num: 100,  suffix: 'M',  label: 'Water Resistance'     },
            { num: 42,   suffix: 'MM', label: 'Field-Ready Case'     },
            { num: 1854, suffix: '',   label: 'Year Established'     },
          ].map(({ num, suffix, label }) => (
            <div key={label} className="stat-item">
              <p
                className="stat-num text-white font-condensed font-light mb-1"
                style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', letterSpacing: '-0.02em' }}
                data-target={num}
                data-suffix={suffix}
              >
                0{suffix}
              </p>
              <p
                className="font-condensed tracking-[0.2em] text-[0.62rem] uppercase"
                style={{ color: '#666' }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom quote */}
      <div
        className="bottom-quote mt-16 md:mt-24 pt-10 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <p
          className="font-serif italic font-light"
          style={{
            color: 'rgba(255,255,255,0.25)',
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
          }}
        >
          "It takes a licking and keeps on ticking." — Timex, 1956
        </p>
      </div>

    </section>
  )
}