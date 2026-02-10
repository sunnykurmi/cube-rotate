"use client"

import { forwardRef, useEffect, useRef, useState } from "react"
import * as THREE from "three"
import gsap from "gsap"

const Cube = forwardRef(function Cube(
    { currentSlide = 0, isHolded = false, videoRefs },
    cubeRef
) {
    const { video1, video2, video3, video4 } = videoRefs

    const [textures, setTextures] = useState(null)
    const activeIndex = currentSlide

    // create textures
    useEffect(() => {
        if (!video1.current || !video2.current || !video3.current || !video4.current) return

        const t1 = new THREE.VideoTexture(video1.current)
        const t2 = new THREE.VideoTexture(video2.current)
        const t3 = new THREE.VideoTexture(video3.current)
        const t4 = new THREE.VideoTexture(video4.current)

            ;[t1, t2, t3, t4].forEach(t => {
                t.colorSpace = THREE.SRGBColorSpace
                t.needsUpdate = true
            })

        setTextures([t1, t2, t3, t4])

        return () => {
            t1.dispose()
            t2.dispose()
            t3.dispose()
            t4.dispose()
        }
    }, [video1, video2, video3, video4])

    useEffect(() => {
        // video1 → autoplay & loop
        if (video1.current) {
            video1.current.loop = true
            video1.current.muted = true
            video1.current.playsInline = true

            video1.current.play().catch(() => { })
        }

        // video2 & video3 → paused initially
        ;[video2, video3, video4].forEach(v => {
            if (!v.current) return
            v.current.pause()
            v.current.currentTime = 0
        })
    }, [video1, video2, video3, video4])



    useEffect(() => {
        if (!cubeRef.current) return

        const rotations = [
            0,                    // front
            -Math.PI / 2,         // right
            -Math.PI,             // back
            -Math.PI * 1.5,       // left
        ]

        gsap.to(cubeRef.current.rotation, {
            y: rotations[currentSlide],
            duration: 1.2,
            ease: "power3.inOut",
        })
    }, [currentSlide])


    useEffect(() => {
        if (!textures) return

        const videos = [
            video1.current,
            video2.current,
            video3.current,
            video4.current
        ]

        const activeVideo = videos[activeIndex]
        if (!activeVideo) return

        let onEnded

        if (isHolded) {
            activeVideo.currentTime = 0
            activeVideo.play().catch(() => { })
        }
        else {
            // ▶️ Let it finish, then stop
            onEnded = () => {
                activeVideo.pause()
                activeVideo.currentTime = activeVideo.duration
            }

            activeVideo.addEventListener("ended", onEnded)
        }

        return () => {
            if (onEnded) {
                activeVideo.removeEventListener("ended", onEnded)
            }
        }
    }, [isHolded, activeIndex, textures])









    const SIZE = 2
    const HALF = SIZE / 2



    if (!textures) return null

    return (
        <group ref={cubeRef} position={[0, 0, 0]}>
            {/* FRONT (+Z) */}
            <group position={[0, 0, HALF]}>
                <DeformPlane
                    texture={textures[0]}
                    isHolded={isHolded}
                    isActive={activeIndex === 0}
                />
            </group>

            {/* RIGHT (+X) */}
            <group rotation={[0, -Math.PI / 2, 0]} position={[HALF, 0, 0]}>
                <DeformPlane
                    texture={textures[1]}
                    isHolded={isHolded}
                    isActive={activeIndex === 1}
                />
            </group>

            {/* BACK (-Z) */}
            <group rotation={[0, Math.PI, 0]} position={[0, 0, -HALF]}>
                <DeformPlane
                    texture={textures[2]}
                    isHolded={isHolded}
                    isActive={activeIndex === 2}
                />
            </group>

            {/* LEFT (-X) */}
            <group rotation={[0, Math.PI / 2, 0]} position={[-HALF, 0, 0]}>
                <DeformPlane
                    texture={textures[3]}
                    isHolded={isHolded}
                    isActive={activeIndex === 3}
                />
            </group>


        </group>


    )
})

export default Cube


function DeformPlane({ texture, isHolded, isActive }) {
    const geoRef = useRef()
    const original = useRef(null)

    useEffect(() => {
        if (!geoRef.current) return

        const pos = geoRef.current.attributes.position
        if (!original.current) {
            original.current = pos.array.slice()
        }

        const count = pos.count

        gsap.to({}, {
            duration: 0.9,
            ease: "power3.out",
            onUpdate() {
                for (let i = 0; i < count; i++) {
                    const ix = i * 3

                    const ox = original.current[ix]
                    const oy = original.current[ix + 1]
                    const oz = original.current[ix + 2]

                    const d = Math.sqrt(ox * ox + oy * oy)
                    const nd = Math.min(d / 1.0, 1)

                    const core = Math.pow(1 - nd, 3.0)
                    const edge = Math.pow(1 - nd, 1.2) * 0.15

                    const strength =
                        isHolded && isActive ? core * 0.95 + edge : 0

                    pos.array[ix + 2] = oz - strength
                }

                pos.needsUpdate = true
                geoRef.current.computeVertexNormals()
            },
        })
    }, [isHolded, isActive])

    return (
        <mesh>
            <planeGeometry ref={geoRef} args={[2, 2, 40, 40]} />
            <meshBasicMaterial
                map={texture}
                side={THREE.DoubleSide}   
            />
        </mesh>
    )
}

