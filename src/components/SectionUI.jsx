import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ── Section data ───────────────────────────────────────────
const SECTIONS = [
  {
    id:    'case',
    side:  'right',
    label: 'EXPEDITION CASE',
    lines: ['Built to', 'Last.'],
    spec:  { number: 100, unit: 'M',  detail: 'Water Resistance' },
    body:  'Stainless steel construction engineered for every terrain and condition.',
  },
  {
    id:    'dial',
    side:  'left',
    label: 'CHRONOGRAPH DIAL',
    lines: ['Read the', 'Field.'],
    spec:  { number: 42, unit: 'MM', detail: 'Case Diameter' },
    body:  'Luminous indices and subdials for absolute legibility.',
  },
  {
    id:    'strap',
    side:  'right',
    label: 'FULL-GRAIN LEATHER',
    lines: ['Worn In,', 'Not Out.'],
    spec:  { number: 20, unit: 'MM', detail: 'Lug Width' },
    body:  'Expedition-grade leather that shapes to your wrist over time.',
  },
]

// ── Scramble util ──────────────────────────────────────────
function scramble(el, finalText) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const total = 48
  let frame = 0
  const run = () => {
    if (!el) return
    el.textContent = finalText
      .split('')
      .map((char, i) =>
        frame / total > i / finalText.length
          ? char
          : chars[Math.floor(Math.random() * chars.length)]
      )
      .join('')
    frame++
    if (frame < total) requestAnimationFrame(run)
    else el.textContent = finalText
  }
  requestAnimationFrame(run)
}

// ── Single panel ───────────────────────────────────────────
function SectionPanel({ section }) {
  const containerRef  = useRef(null)
  const labelRef      = useRef(null)
  const line1Ref      = useRef(null)
  const line2Ref      = useRef(null)
  const dividerRef    = useRef(null)
  const specNumRef    = useRef(null)
  const specDetailRef = useRef(null)
  const bodyRef       = useRef(null)

  const animateIn = () => {
    if (!containerRef.current) return

    // Kill any running tweens and reset
    gsap.killTweensOf([
      containerRef.current, line1Ref.current, line2Ref.current,
      dividerRef.current, specDetailRef.current, bodyRef.current,
    ])
    gsap.set(containerRef.current,                   { opacity: 1, y: 0 })
    gsap.set([line1Ref.current, line2Ref.current],   { y: '105%' })
    gsap.set(dividerRef.current,                     { scaleX: 0 })
    gsap.set([specDetailRef.current, bodyRef.current], { opacity: 0, y: 10 })
    if (specNumRef.current)
      specNumRef.current.textContent = '0' + section.spec.unit

    // Label scramble
    scramble(labelRef.current, section.label)

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Headline lines slide up from clip
    tl.to([line1Ref.current, line2Ref.current], {
      y: '0%',
      duration: 1,
      stagger: 0.1,
    }, 0.25)

    // Divider expands
    .to(dividerRef.current, {
      scaleX: 1,
      duration: 0.5,
    }, 0.75)

    // Spec counter
    .call(() => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: section.spec.number,
        duration: 1.4,
        ease: 'power2.out',
        onUpdate: () => {
          if (specNumRef.current)
            specNumRef.current.textContent =
              Math.round(obj.val) + section.spec.unit
        },
      })
    }, null, 0.85)

    // Spec detail + body
    .to([specDetailRef.current, bodyRef.current], {
      opacity: 1,
      y: 0,
      stagger: 0.12,
      duration: 0.6,
    }, 0.95)
  }

  const animateOut = () => {
    if (!containerRef.current) return
    gsap.to(containerRef.current, {
      opacity: 0,
      y: -14,
      duration: 0.35,
      ease: 'power2.in',
    })
  }

  useEffect(() => {
    gsap.set(containerRef.current, { opacity: 0 })
    gsap.set([line1Ref.current, line2Ref.current], { y: '105%' })

    const trigger = ScrollTrigger.create({
      trigger: `#${section.id}`,
      start: 'top 45%',
      end: 'bottom 45%',
      onEnter:      animateIn,
      onLeave:      animateOut,
      onEnterBack:  animateIn,
      onLeaveBack:  animateOut,
    })

    return () => trigger.kill()
  }, [])

  const isRight = section.side === 'right'

  

  return (
    <div
      ref={containerRef}
      className={`fixed top-1/2 -translate-y-1/2 pointer-events-none z-10 flex flex-col ${
        isRight
          ? 'right-8 md:right-16 items-end text-right'
          : 'left-8 md:left-16 items-start text-left'
      }`}
      style={{ maxWidth: '360px',
          background: isRight
      ? 'linear-gradient(to left, rgba(0,0,0,0.55) 0%, transparent 100%)'
      : 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 100%)',
    padding: '32px 24px',
    borderRadius: '4px',
       }}
    >
      {/* Label */}
      <p
        ref={labelRef}
        className="text-[#c5a45a] mb-5 font-condensed tracking-[0.28em] text-[0.62rem] uppercase"
      >
        &nbsp;
      </p>

      {/* Headline — each line in its own overflow:hidden clip */}
      <div className="overflow-hidden">
        <h2
          ref={line1Ref}
          className="text-white leading-none font-serif font-light italic"
          style={{ fontSize: 'clamp(2.4rem, 4vw, 3.8rem)' }}
        >
          {section.lines[0]}
        </h2>
      </div>
      <div className="overflow-hidden mb-6">
        <h2
          ref={line2Ref}
          className="text-white leading-none font-serif font-light italic"
          style={{ fontSize: 'clamp(2.4rem, 4vw, 3.8rem)' }}
        >
          {section.lines[1]}
        </h2>
      </div>

      {/* Divider */}
      <div
        ref={dividerRef}
        className={`h-px bg-white opacity-40 mb-5 w-10 ${
          isRight ? 'self-end' : 'self-start'
        }`}
        style={{
          transformOrigin: isRight ? 'right' : 'left',
        }}
      />

      {/* Spec number + detail */}
      <div className="mb-3">
        <span
          ref={specNumRef}
          className="text-white font-condensed font-light tracking-wider"
          style={{ fontSize: '1.9rem' }}
        >
          0{section.spec.unit}
        </span>
        <span
          ref={specDetailRef}
          className="text-[#c5a45a] font-condensed tracking-[0.22em] text-[0.62rem] uppercase block"
        >
          {section.spec.detail}
        </span>
      </div>

      {/* Body */}
      <p
        ref={bodyRef}
        className="text-[#c5a45a] font-condensed font-light leading-relaxed text-sm"
        style={{ maxWidth: '260px' }}
      >
        {section.body}
      </p>
    </div>
  )
}

// ── Export ─────────────────────────────────────────────────
export default function SectionUI() {
  return (
    <>
      {SECTIONS.map((s) => (
        <SectionPanel key={s.id} section={s} />
      ))}
    </>
  )
}