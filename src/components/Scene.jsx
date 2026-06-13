import { Environment, Preload } from '@react-three/drei'
import HeroScene from './HeroScene'
import ScrollScene from './ScrollScene'
import ExplodeScene from './ExplodeScene'
import { useRef } from 'react'
import { Model as Gear } from './models/MechanicalGear'
import MovementScene from './MovementScene'

export default function Scene() {
  const watchRef = useRef(null)
  const gearRef  = useRef(null)

  return (
    <>
      {/* <color attach="background" args={['#050505']} /> */}
      {/* <fog attach="fog" args={['#050505', 18, 35]} /> */}

      {/* Ambient — barely there, keeps deep shadows */}
      <ambientLight intensity={0.06} />

      {/* Key light — warm white from upper-right */}
      {/* <spotLight
        position={[6, 8, 6]}
        intensity={4}
        angle={0.3}
        penumbra={0.85}
        color="#fff5e6"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      /> */}

      {/* Rim light — cool blue from behind-left, separates watch from bg */}
      <pointLight
        position={[0, 0, 3]}
        intensity={7}
        color="#3366cc"
      />

      {/* Orange fill — echoes the watch's accent hands */}
      {/* <pointLight
        position={[0, -6, 3]}
        intensity={5}
        color="#ff6600"
      /> */}

      {/* Under fill — lifts the strap slightly */}
      <pointLight
        position={[0, -6, 3]}
        intensity={0.35}
        color="#ffffff"
      />

      {/* Environment map for metallic case reflections */}
      <Environment files="/blue.hdr" intensity={0.02} />
      <Preload all />

      <HeroScene watchRef={watchRef} gearRef={gearRef} />
      <ScrollScene watchRef={watchRef} />
      <ExplodeScene watchRef={watchRef} gearRef={gearRef} />
      <MovementScene gearRef={gearRef} />

        <group ref={gearRef} position={[20, 0, 0]} scale={[0, 0, 0]}>
        <Gear />
      </group>
    </>
  )
}