"use client"

import { Canvas, useThree } from "@react-three/fiber"
import { Suspense, useEffect, useRef } from "react"
import Cube from "./Cube"
import { OrbitControls } from "@react-three/drei"
import gsap from "gsap"
import Effects from "./Effects"
import { MeshReflectorMaterial } from "@react-three/drei"
import * as THREE from "three"
import MarqueeModel from "./MarqueeModel"

export default function CubeScene({ slide, holded }) {
    const cubeRef = useRef()

    const video1 = useRef(null)
    const video2 = useRef(null)
    const video3 = useRef(null)
    const video4 = useRef(null)

    return (
        <>
            <video
                ref={video1}
                src="/videos/vid_3.mp4"
                muted
                loop
                playsInline
                preload="auto"
                crossOrigin="anonymous"
                style={{ display: "none" }}
            />
            <video
                ref={video2}
                src="/videos/vid_1.mp4"
                muted
                playsInline
                preload="auto"
                crossOrigin="anonymous"
                style={{ display: "none" }}
            />
            <video
                ref={video3}
                src="/videos/vid_2.mp4"
                muted
                playsInline
                preload="auto"
                crossOrigin="anonymous"
                style={{ display: "none" }}
            />
            <video
                ref={video4}
                src="/videos/vid_3.mp4"
                muted
                playsInline
                preload="auto"
                crossOrigin="anonymous"
                style={{ display: "none" }}
            />

            <Canvas camera={{ position: [0, 0, 5], fov: 30 }}>
                {/* <OrbitControls/> */}
                <CameraHold isHolded={holded} />
                <Effects isHolded={holded} />
                <Suspense fallback={null}>
                    <MarqueeModel holded={holded} />
                    <Cube
                        ref={cubeRef}
                        currentSlide={slide}
                        isHolded={holded}
                        videoRefs={{ video1, video2, video3, video4 }}
                    />
                    <mesh
                        rotation={[-Math.PI / 1.88, 0, 0]}
                        position={[0, -1.15, 0]}
                    >
                        <planeGeometry args={[10, 10]} />
                        <ambientLight intensity={1} />

                        <MeshReflectorMaterial
                            resolution={1024}
                            mirror={1}
                            mixBlur={6}
                            mixStrength={1}
                            roughness={0.2}
                            metalness={0.6}
                            blur={[800, 500]}
                            depthScale={1}
                            minDepthThreshold={0.4}
                            maxDepthThreshold={1.2}
                            color="#fff"
                            transparent={false}
                            depthWrite
                        />
                    </mesh>
                </Suspense>
            </Canvas>
        </>
    )
}


function CameraHold({ isHolded }) {
    const { camera } = useThree()

    useEffect(() => {
        gsap.to(camera.position, {
            z: isHolded ? 6.2 : 7,
            duration: 1,
            ease: "power3.out",
        })
    }, [isHolded])

    return null
}
