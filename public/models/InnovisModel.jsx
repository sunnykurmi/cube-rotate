"use client"
import * as THREE from "three"
import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function InnovisModel(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/about_innovis.gltf')
  const { actions } = useAnimations(animations, group)
   useEffect(() => {
    if (!actions) return

   Object.values(actions).forEach(action => {
  action.setLoop(THREE.LoopRepeat, Infinity)
  action.clampWhenFinished = false
  action.play()
})
  }, [actions])
  return (
    <group ref={group} {...props} dispose={null}>
      <group>
        <group name="Cube" position={[0, 0.563, 0]} />
        <group name="Null3">
          <mesh
            name="Cylinder"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder.geometry}
            material={materials.PBR}
            position={[1.889, 0.6, 1.214]}
          />
          <mesh
            name="eye"
            castShadow
            receiveShadow
            geometry={nodes.eye.geometry}
            material={materials.PBR}
            morphTargetDictionary={nodes.eye.morphTargetDictionary}
            morphTargetInfluences={nodes.eye.morphTargetInfluences}
            position={[1.889, 0.599, 1.214]}
          />
          <mesh
            name="V"
            castShadow
            receiveShadow
            geometry={nodes.V.geometry}
            material={materials.PBR}
            morphTargetDictionary={nodes.V.morphTargetDictionary}
            morphTargetInfluences={nodes.V.morphTargetInfluences}
            position={[1.894, 0.5, 0.996]}
          />
          <mesh
            name="plus"
            castShadow
            receiveShadow
            geometry={nodes.plus.geometry}
            material={materials.PBR}
            morphTargetDictionary={nodes.plus.morphTargetDictionary}
            morphTargetInfluences={nodes.plus.morphTargetInfluences}
            position={[1.889, 0.5, 0.757]}
          />
          <mesh
            name="A"
            castShadow
            receiveShadow
            geometry={nodes.A.geometry}
            material={materials.PBR}
            morphTargetDictionary={nodes.A.morphTargetDictionary}
            morphTargetInfluences={nodes.A.morphTargetInfluences}
            position={[1.889, 0.599, 0.55]}
          />
          <mesh
            name="F"
            castShadow
            receiveShadow
            geometry={nodes.F.geometry}
            material={materials.PBR}
            morphTargetDictionary={nodes.F.morphTargetDictionary}
            morphTargetInfluences={nodes.F.morphTargetInfluences}
            position={[1.887, 0.499, 0.302]}
          />
          <mesh
            name="*"
            castShadow
            receiveShadow
            geometry={nodes['*'].geometry}
            material={materials.PBR}
            morphTargetDictionary={nodes['*'].morphTargetDictionary}
            morphTargetInfluences={nodes['*'].morphTargetInfluences}
            position={[1.886, 0.702, 0.054]}
          />
          <mesh
            name="w"
            castShadow
            receiveShadow
            geometry={nodes.w.geometry}
            material={materials.PBR}
            morphTargetDictionary={nodes.w.morphTargetDictionary}
            morphTargetInfluences={nodes.w.morphTargetInfluences}
            position={[1.889, 0.499, -0.286]}
          />
          <mesh
            name="arrow"
            castShadow
            receiveShadow
            geometry={nodes.arrow.geometry}
            material={materials.PBR}
            morphTargetDictionary={nodes.arrow.morphTargetDictionary}
            morphTargetInfluences={nodes.arrow.morphTargetInfluences}
            position={[1.887, 0.702, -0.589]}
          />
          <mesh
            name="L"
            castShadow
            receiveShadow
            geometry={nodes.L.geometry}
            material={materials.PBR}
            morphTargetDictionary={nodes.L.morphTargetDictionary}
            morphTargetInfluences={nodes.L.morphTargetInfluences}
            position={[1.886, 0.5, -0.834]}
          />
        </group>
        <group name="Null4" position={[0, 0, 2.3]}>
          <mesh
            name="Cylinder_1"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder_1.geometry}
            material={materials.PBR}
            position={[1.889, 0.6, 1.214]}
          />
          <mesh
            name="eye_1"
            castShadow
            receiveShadow
            geometry={nodes.eye_1.geometry}
            material={materials.PBR}
            morphTargetDictionary={nodes.eye_1.morphTargetDictionary}
            morphTargetInfluences={nodes.eye_1.morphTargetInfluences}
            position={[1.889, 0.599, 1.214]}
          />
          <mesh
            name="V_1"
            castShadow
            receiveShadow
            geometry={nodes.V_1.geometry}
            material={materials.PBR}
            morphTargetDictionary={nodes.V_1.morphTargetDictionary}
            morphTargetInfluences={nodes.V_1.morphTargetInfluences}
            position={[1.894, 0.5, 0.996]}
          />
          <mesh
            name="plus_1"
            castShadow
            receiveShadow
            geometry={nodes.plus_1.geometry}
            material={materials.PBR}
            morphTargetDictionary={nodes.plus_1.morphTargetDictionary}
            morphTargetInfluences={nodes.plus_1.morphTargetInfluences}
            position={[1.889, 0.5, 0.757]}
          />
          <mesh
            name="A_1"
            castShadow
            receiveShadow
            geometry={nodes.A_1.geometry}
            material={materials.PBR}
            morphTargetDictionary={nodes.A_1.morphTargetDictionary}
            morphTargetInfluences={nodes.A_1.morphTargetInfluences}
            position={[1.889, 0.599, 0.55]}
          />
          <mesh
            name="F_1"
            castShadow
            receiveShadow
            geometry={nodes.F_1.geometry}
            material={materials.PBR}
            morphTargetDictionary={nodes.F_1.morphTargetDictionary}
            morphTargetInfluences={nodes.F_1.morphTargetInfluences}
            position={[1.887, 0.499, 0.302]}
          />
          <mesh
            name="*_1"
            castShadow
            receiveShadow
            geometry={nodes['*_1'].geometry}
            material={materials.PBR}
            morphTargetDictionary={nodes['*_1'].morphTargetDictionary}
            morphTargetInfluences={nodes['*_1'].morphTargetInfluences}
            position={[1.886, 0.702, 0.054]}
          />
          <mesh
            name="w_1"
            castShadow
            receiveShadow
            geometry={nodes.w_1.geometry}
            material={materials.PBR}
            morphTargetDictionary={nodes.w_1.morphTargetDictionary}
            morphTargetInfluences={nodes.w_1.morphTargetInfluences}
            position={[1.889, 0.499, -0.286]}
          />
          <mesh
            name="arrow_1"
            castShadow
            receiveShadow
            geometry={nodes.arrow_1.geometry}
            material={materials.PBR}
            morphTargetDictionary={nodes.arrow_1.morphTargetDictionary}
            morphTargetInfluences={nodes.arrow_1.morphTargetInfluences}
            position={[1.887, 0.702, -0.589]}
          />
          <mesh
            name="L_1"
            castShadow
            receiveShadow
            geometry={nodes.L_1.geometry}
            material={materials.PBR}
            morphTargetDictionary={nodes.L_1.morphTargetDictionary}
            morphTargetInfluences={nodes.L_1.morphTargetInfluences}
            position={[1.886, 0.5, -0.834]}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/about_innovis.gltf')