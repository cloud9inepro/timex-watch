import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function MovementScene({ gearRef }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!gearRef?.current) return

      const isMobile = window.innerWidth < 768
      const gearScale = isMobile ? 2.5 : 3.5
      const gearY     = isMobile ? 0.5 : 0

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#movement',
          start: 'top top',
          end: 'bottom top',
          scrub: 2.5,
        },
      })

      // Gear slides in from right to center
      tl.to(gearRef.current.position, {
        x: 0,
        y: gearY,
        z: 0,
        duration: 3,
        ease: 'power2.out',
      }, 0)
      tl.to(gearRef.current.scale, {
        x: gearScale,
        y: gearScale,
        z: gearScale,
        duration: 3,
        ease: 'power2.out',
      }, 0)

      // Hold in center
      tl.to({}, { duration: 4 }, 3)

      // Slide back out before CTA
      tl.to(gearRef.current.position, {
        x: 20,
        duration: 2,
        ease: 'power2.in',
      }, 7)
      tl.to(gearRef.current.scale, {
        x: 0, y: 0, z: 0,
        duration: 2,
      }, 7)

    }, 200)

    return () => clearTimeout(timer)
  }, [gearRef])

  return null
}