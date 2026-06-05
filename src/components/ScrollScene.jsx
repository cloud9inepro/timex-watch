import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAnimStore } from '../store/animStore'

export default function ScrollScene({ watchRef }) {
    const heroAnimComplete = useAnimStore((s) => s.heroAnimComplete)
    const disableFloat = useAnimStore((s) => s.disableFloat)

    useEffect(() => {
        if (!heroAnimComplete) return

        const w = watchRef.current
        const ctx = gsap.context(() => {



        const isMobile = window.innerWidth < 768
        const Scale = isMobile ? 0.27 : 0.38
        // const X     = isMobile ? 0    : 0
        // const Y     = isMobile ? 0.2  : 0


            // ── Case section ─────────────────────────────────────────
            // Watch shifts right, rotates to show bezel side profile
            gsap.timeline({
                scrollTrigger: {
                    trigger: '#case',
                    start: 'top 80%',      // fires when case reaches top of viewport
                    end: 'top 20%',
                    scrub: 2,
                    // markers: true,
                    onEnter: () => disableFloat(),
                },
            })
                .to(w.rotation, { x: 0, y: 0.9, z: 0.1 }, 0)
                .to(w.position, { x: -1.2, y: 0 }, 0)
                .to(w.scale, { x: Scale, y: Scale, z: Scale }, 0)

            // ── Dial section ─────────────────────────────────────────
            // Watch moves to center, rotates face-on
            gsap.timeline({
                scrollTrigger: {
                    trigger: '#dial',
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: 2,
                    // markers: true,
                },
            })
                .to(w.rotation, { x: 0, y: -1, z: 0 }, 0)
                .to(w.position, { x: 1, y: 0 }, 0)
                .to(w.scale, { x: Scale, y: Scale, z: Scale }, 0)

            // ── Strap section ─────────────────────────────────────────
            // Watch tilts down and forward to expose the leather strap
            gsap.timeline({
                scrollTrigger: {
                    trigger: '#strap',
                    start: 'top 100%',
                    end: 'bottom top',
                    // markers: true,
                    scrub: 1,
                },
            })
                .to(w.rotation, { x: 0, y: -2, z: 0 }, 0)
                .to(w.position, { x: 0, y: 0 }, 0)
                .to(w.scale, { x: Scale, y: Scale, z: Scale }, 0)

        })

        return () => ctx.revert()

    }, [heroAnimComplete, watchRef, disableFloat])

    return null
}

