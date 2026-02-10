"use client"

import { useEffect, useState } from "react"
import CubeScene from "@/components/three/CubeScene"
import MagnetButton from "@/components/ui/MagnetButton"
import LiquidEther from "@/components/ui/LiquidEther"

export default function HomePage() {
  const [slide, setSlide] = useState(0)
  const [direction, setDirection] = useState(1)
  const [holded, setHolded] = useState(false)

  const SLIDES = 4
  const LAST_SLIDE = SLIDES - 1

  const nextSlide = () => {
    if (slide >= LAST_SLIDE) return
    setDirection(1)
    setSlide(prev => prev + 1)
  }

  const prevSlide = () => {
    if (slide <= 0) return
    setDirection(-1)
    setSlide(prev => prev - 1)
  }

  useEffect(() => {
    const release = () => setHolded(false)

    window.addEventListener("pointerup", release)
    window.addEventListener("pointercancel", release)
    window.addEventListener("blur", release)

    return () => {
      window.removeEventListener("pointerup", release)
      window.removeEventListener("pointercancel", release)
      window.removeEventListener("blur", release)
    }
  }, [])

  return (
    <div style={{ height: "100vh" }}>
      <div className=" hidden lg:block fixed z-[10] top-0 left-0  w-full h-screen center ">
        <LiquidEther
          colors={['#D70000', '#D70000', '#D70000']}
          mouseForce={20}
          cursorSize={20}
          isViscous={false}
          viscous={100}
          iterationsViscous={20}
          iterationsPoisson={20}
          resolution={0.1}
          isBounce={false}
          autoDemo={false}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={1000}
          autoRampDuration={0.6}
        />
      </div>

       <button
        onPointerDown={() => setHolded(true)}
        className={` font-semibold  z-[1000] capitalize fixed bottom-10 left-1/2 -translate-x-1/2 text-white border-white border rounded-sm px-6  py-2 flex items-center justify-center  cursor-pointer ${holded ? " opacity-30  cursor-not-allowed" : " hover:bg-white hover:text-black cursor-pointer"} transition-all duration-300 `}
      >
            click & hold
          </button>

      <div style={{ position: "fixed", inset: 0 }} className="flex pointer-events-none items-center justify-center">
        <CubeScene slide={slide} direction={direction} holded={holded} />
      </div>

      <div className="relative z-10 w-full flex justify-between p-4">


        <div className="w-screen flex px-10 max-sm:px-5 items-center justify-between left-0 fixed top-[50vh] -translate-y-1/2">
          {/* Previous */}
          <MagnetButton padding={10} disabled={false} magnetStrength={2}>
            <span
              onClick={prevSlide}
              disabled={slide === 0}
              className={`text-white max-sm:text-sm max-sm:w-8 max-sm:pb-1  border-white border rounded-full w-14 aspect-square shrink-0  flex items-center justify-center  transition-all duration-300 text-3xl cursor-pointer pb-1.5 ${slide === 0 ? " opacity-30  cursor-not-allowed" : " hover:bg-white hover:text-black cursor-pointer"}  `} >
              ←
            </span>
          </MagnetButton>

          {/* Next  */}
          <MagnetButton padding={10} disabled={false} magnetStrength={2}>
            <span
              onClick={nextSlide}
              disabled={slide === LAST_SLIDE}
              className={`text-white max-sm:text-sm max-sm:w-8 max-sm:pb-1 border-white border rounded-full w-14 aspect-square shrink-0  flex items-center justify-center  transition-all duration-300 text-3xl cursor-pointer pb-1.5 ${slide === LAST_SLIDE ? " opacity-30  cursor-not-allowed" : " hover:bg-white hover:text-black cursor-pointer"}  `} >
              →
            </span>
          </MagnetButton>
        </div>
      </div>
    </div>
  )
}
