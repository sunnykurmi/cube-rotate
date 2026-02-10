"use client"

import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import gsap from "gsap"
import InnovisModel from "../../../public/models/InnovisModel"

const COUNT = 3
const SPACING = 5
const SPEED = 0.5

export default function MarqueeModel({ holded }) {
  const items = useRef([])
  const offset = useRef(0)

  const LOOP_LENGTH = COUNT * SPACING

  useFrame((_, delta) => {
    if (holded) return

    // RIGHT → LEFT
    offset.current -= SPEED * delta

    // wrap offset safely
    offset.current = offset.current % LOOP_LENGTH

    items.current.forEach((item, i) => {
      if (!item) return

      // 🔒 anchored marquee (NO centering math)
      item.position.x =
        (i * SPACING + offset.current + LOOP_LENGTH) % LOOP_LENGTH
    })
  })

  useEffect(() => {
    items.current.forEach(item => {
      if (!item) return

      gsap.to(item.scale, {
        x: holded ? 0 : 1,
        y: holded ? 0 : 1,
        z: holded ? 0 : 1,
        duration: 0.6,
        ease: "power3.out",
      })
    })
  }, [holded])

  return (
    <group position={[-9, -0.55, 6]}>
      {Array.from({ length: COUNT }).map((_, i) => (
        <group
          key={i}
          ref={el => (items.current[i] = el)}
        >
          <InnovisModel
            scale={1}
            rotation={[0, Math.PI / 2, 0]}
          />
        </group>
      ))}
    </group>
  )
}
