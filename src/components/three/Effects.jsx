"use client"

import { EffectComposer } from "@react-three/postprocessing"
import { LensDistortionEffect } from "postprocessing"
import { useEffect, useMemo } from "react"
import { Vector2 } from "three"
import gsap from "gsap"

export default function Effects({ isHolded }) {
  const effect = useMemo(
    () =>
      new LensDistortionEffect({
        distortion: new Vector2(0, 0),
        focalLength: new Vector2(1, 1),
      }),
    []
  )

  useEffect(() => {
    if (isHolded) {
      gsap.to(effect.distortion, {
        x: -0.28,
        y: -0.28,
        duration: 1,
        ease: "power3.out",
      })
      gsap.to(effect.focalLength, {
        x: 0.95,
        y: 0.95,
        duration: 1,
        ease: "power3.out",
      })
    } else {
      gsap.to(effect.distortion, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "power3.out",
      })
      gsap.to(effect.focalLength, {
        x: 1,
        y: 1,
        duration: 1,
        ease: "power3.out",
      })
    }
  }, [isHolded])

  return (
    <EffectComposer>
      <primitive object={effect} />
    </EffectComposer>
  )
}
