import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const REVIEWS = [
  {
    stars: 5,
    quote: "Built like a tank. Three camping trips, one river crossing, and it still looks brand new. The chronograph is butter-smooth.",
    name: "Marcus T.",
    detail: "Verified Buyer · Expedition Owner, 2 years",
  },
  {
    stars: 5,
    quote: "Best watch under $100, full stop. The leather strap broke in beautifully after a month. Looks twice what it costs.",
    name: "Sarah K.",
    detail: "Verified Buyer · Daily Wearer",
  },
  {
    stars: 5,
    quote: "I'm a watch snob and I'll admit it — this Timex embarrasses pieces three times the price. Dial legibility is exceptional.",
    name: "James O.",
    detail: "Verified Buyer · Watch Collector",
  },
]

export default function ReviewsSection() {
  const sectionRef  = useRef(null)
  const labelRef    = useRef(null)
  const headlineRef = useRef(null)
  const cardsRef    = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.querySelectorAll('.review-card')

      // Single timeline drives everything while section is pinned
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=900',
          scrub: 1.5,
          pin: true,
          pinSpacing: true,
        },
      })

      // Label + headline fade in first
      tl.from(labelRef.current, {
        opacity: 0, y: 20, duration: 1,
      }, 0)
      tl.from(headlineRef.current, {
        opacity: 0, y: 36, duration: 1.5,
      }, 0.3)

      // Cards stagger in as user continues scrolling
      tl.from(cards, {
        opacity: 0,
        y: 64,
        stagger: 1.5,
        duration: 2,
        ease: 'power3.out',
      }, 1.8)

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 py-24"
      style={{ zIndex: 2, background: '#111111' }}
    >
      {/* Label */}
      <p
        ref={labelRef}
        className="font-condensed tracking-[0.35em] text-[0.65rem] uppercase mb-4"
        style={{ color: '#c5a45a' }}
      >
        What People Are Saying
      </p>

      {/* Headline */}
      <h2
        ref={headlineRef}
        className="font-serif font-light italic text-white mb-16 leading-tight"
        style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
      >
        Trusted by explorers,<br />worn by everyone.
      </h2>

      {/* Cards */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {REVIEWS.map((review, i) => (
          <div
            key={i}
            className="review-card flex flex-col gap-6 p-8"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '2px',
            }}
          >
            {/* Stars */}
            <div className="flex gap-1">
              {[...Array(review.stars)].map((_, j) => (
                <span key={j} style={{ color: '#c5a45a', fontSize: '0.8rem' }}>
                  ★
                </span>
              ))}
            </div>

            {/* Quote */}
            <p
              className="font-serif font-light italic text-white leading-relaxed flex-1"
              style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)' }}
            >
              "{review.quote}"
            </p>

            {/* Reviewer */}
            <div>
              <p className="font-condensed text-white tracking-wider text-sm">
                {review.name}
              </p>
              <p
                className="font-condensed tracking-[0.15em] text-[0.6rem] uppercase mt-1"
                style={{ color: '#555' }}
              >
                {review.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}