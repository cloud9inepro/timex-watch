import { useRef } from 'react'
import { Text } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


import { Model as Watch } from './models/Watch' 

gsap.registerPlugin(ScrollTrigger)

export default function Scene({ Hero }) {
  const groupRef = useRef()


  return (
    <>
      <group ref={groupRef} position={[0, 0, 0]}>
        
        <Watch
          position={[0, 0, 0]} 
          rotation={[-0.2, 0.4, 0]}
          scale={0.37} 
        />

      </group>
    </>
  )
}