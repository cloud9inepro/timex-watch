import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAnimStore } from '../store/animStore'

export default function ExplodeScene({ watchRef }) {
  const disableFloat = useAnimStore(s => s.disableFloat)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!watchRef?.current) return

      const g       = watchRef.current
      const isMobile = window.innerWidth < 768

      const crystal  = g.getObjectByName('Object_18')
      const caseBack = g.getObjectByName('Object_4')
      const strap1   = g.getObjectByName('Object_44')
      const strap2   = g.getObjectByName('Object_47')

      if (!crystal || !caseBack) return

      const orig = {}
      ;[crystal, caseBack, strap1, strap2]
        .filter(Boolean)
        .forEach(m => { orig[m.name] = m.position.clone() })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#explode',
          start: 'top top',
          end: 'bottom top',
          scrub: 3,
          onEnter: () => disableFloat(),
        },
      })

      const Scale = isMobile ? 0.20 : 0.26

      // Reorient
      tl.to(g.rotation, { x: -0.7, y: -0.9, z: -1.4, duration: 2 }, 0)
      tl.to(g.position, { x:  0, y: 0, z: 0, duration: 1.5 }, 0)
      tl.to(g.scale,    { x: Scale, y: Scale, z: Scale, duration: 1.5 }, 0)

      // ── Phase 1: Burst ────────────────────────────────────
      tl.to(crystal.position,  { z: orig.Object_18.z + 2 },          0.5)
      tl.to(caseBack.position, { z: orig.Object_4.z  - 3 },          0.5)
      tl.to(strap1.position,   { z: orig.Object_44.z - 2 },          0.5)
      tl.to(strap2.position,   { z: orig.Object_47.z - 2 },          0.5)

      // ── Phase 2: Hold — gear slides in on desktop only ───
      tl.to({}, { duration: 3 }, 4)

      // if (!isMobile && gearRef?.current) {
      //   tl.to(gearRef.current.position, {
      //     x: 2, y: 0, z: 0,
      //     duration: 2,
      //     ease: 'power2.out',
      //   }, 0.5)
      //   tl.to(gearRef.current.scale, {
      //     x: 0.5, y: 0.5, z: 0.5,
      //     duration: 2,
      //     ease: 'power2.out',
      //   }, 0.5)
      // }

      // ── Phase 3: Reassemble ───────────────────────────────
      tl.to(crystal.position,  { z: orig.Object_18.z },               7)
      tl.to(caseBack.position, { z: orig.Object_4.z },                7)
      tl.to(strap1.position,   { z: orig.Object_44.z },               7)
      tl.to(strap2.position,   { z: orig.Object_47.z },               7)

      // Gear slides back out on desktop
      // if (!isMobile && gearRef?.current) {
      //   tl.to(gearRef.current.position, {
      //     x: 20, duration: 1.5, ease: 'power2.in',
      //   }, 7)
      //   tl.to(gearRef.current.scale, {
      //     x: 0, y: 0, z: 0, duration: 1.5,
      //   }, 7)
      // }

    }, 200)

    return () => clearTimeout(timer)
  }, [watchRef, disableFloat])

  return null
}