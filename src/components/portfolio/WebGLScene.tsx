'use client'

import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

/* -------------------------------------------------------------------------- */
/*  Constants                                                                  */
/* -------------------------------------------------------------------------- */

const PARTICLE_COUNT = 100
const ACCENT = '#4F8FFF'
const BG = '#090909'
const MOUSE_RADIUS = 3.5
const MOUSE_FORCE = 0.35
const SPREAD_X = 18
const SPREAD_Y = 12
const SPREAD_Z = 10

/* Reusable temp vectors (avoid GC in the render loop) */
const _dummy = new THREE.Object3D()
const _mouseWorld = new THREE.Vector3()

/* -------------------------------------------------------------------------- */
/*  Particle Data                                                              */
/* -------------------------------------------------------------------------- */

interface Particle {
  base: THREE.Vector3
  phase: number
  speed: number
  drift: THREE.Vector3
  scale: number
}

/* -------------------------------------------------------------------------- */
/*  Particles — InstancedMesh with mouse-reactive motion                      */
/* -------------------------------------------------------------------------- */

function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const { pointer, camera } = useThree()

  /* Mutable particle state lives in a ref — safe from React immutability rules */
  const particles = useRef<Particle[]>(
    Array.from({ length: PARTICLE_COUNT }, () => {
      const scale = 0.6 + Math.random() * 0.8
      return {
        base: new THREE.Vector3(
          (Math.random() - 0.5) * SPREAD_X,
          (Math.random() - 0.5) * SPREAD_Y,
          (Math.random() - 0.5) * SPREAD_Z - 2,
        ),
        phase: Math.random() * Math.PI * 2,
        speed: 0.25 + Math.random() * 0.45,
        drift: new THREE.Vector3(
          (Math.random() - 0.5) * 0.003,
          0,
          (Math.random() - 0.5) * 0.002,
        ),
        scale,
      }
    }),
  ).current

  useFrame(({ clock }) => {
    const mesh = meshRef.current
    if (!mesh) return

    const t = clock.elapsedTime

    /* Project pointer from NDC → world-space on z = 0 plane */
    _mouseWorld.set(pointer.x, pointer.y, 0.5).unproject(camera)
    const dir = _mouseWorld.sub(camera.position).normalize()
    const dist = -camera.position.z / dir.z
    const mx = camera.position.x + dir.x * dist
    const my = camera.position.y + dir.y * dist

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i]

      /* Organic float */
      const fx = Math.cos(t * p.speed * 0.6 + p.phase) * 0.2
      const fy = Math.sin(t * p.speed + p.phase) * 0.35
      const fz = Math.cos(t * p.speed * 0.4 + p.phase * 1.3) * 0.12

      let x = p.base.x + fx
      let y = p.base.y + fy
      let z = p.base.z + fz

      /* Mouse repulsion */
      const dx = x - mx
      const dy = y - my
      const d = Math.sqrt(dx * dx + dy * dy)

      if (d < MOUSE_RADIUS && d > 0.001) {
        const strength = (1 - d / MOUSE_RADIUS) ** 2 * MOUSE_FORCE
        x += (dx / d) * strength
        y += (dy / d) * strength
        z += strength * 0.4
      }

      /* Slow lateral drift */
      p.base.x += p.drift.x
      p.base.z += p.drift.z

      /* Wrap boundaries */
      if (p.base.x > SPREAD_X / 2) p.base.x = -SPREAD_X / 2
      if (p.base.x < -SPREAD_X / 2) p.base.x = SPREAD_X / 2
      if (p.base.z > SPREAD_Z / 2 - 2) p.base.z = -SPREAD_Z / 2 - 2
      if (p.base.z < -SPREAD_Z / 2 - 2) p.base.z = SPREAD_Z / 2 - 2

      /* Pulse scale subtly */
      const s = p.scale * (0.85 + Math.sin(t * 0.4 + p.phase) * 0.15)
      _dummy.position.set(x, y, z)
      _dummy.scale.setScalar(s)
      _dummy.updateMatrix()
      mesh.setMatrixAt(i, _dummy.matrix)
    }

    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[0.035, 8, 8]} />
      <meshBasicMaterial color={ACCENT} transparent opacity={0.75} />
    </instancedMesh>
  )
}

/* -------------------------------------------------------------------------- */
/*  Wireframe Geometries — floating, slowly rotating, semi-transparent        */
/* -------------------------------------------------------------------------- */

const wireframe = { color: ACCENT, wireframe: true, transparent: true }

function WireframeShapes() {
  const icoRef = useRef<THREE.Mesh>(null!)
  const octRef = useRef<THREE.Mesh>(null!)
  const torusRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (icoRef.current) {
      icoRef.current.rotation.x = t * 0.04
      icoRef.current.rotation.y = t * 0.06
    }
    if (octRef.current) {
      octRef.current.rotation.x = t * 0.05
      octRef.current.rotation.z = t * 0.07
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.03
      torusRef.current.rotation.y = t * 0.05
    }
  })

  return (
    <>
      {/* Primary icosahedron — upper left */}
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.7}>
        <mesh ref={icoRef} position={[-5.5, 2.8, -4]}>
          <icosahedronGeometry args={[2, 0]} />
          <meshBasicMaterial {...wireframe} opacity={0.13} />
        </mesh>
      </Float>

      {/* Octahedron — right, slightly lower */}
      <Float speed={1.1} rotationIntensity={0.5} floatIntensity={0.55}>
        <mesh ref={octRef} position={[6, -1.8, -5]}>
          <octahedronGeometry args={[1.5, 0]} />
          <meshBasicMaterial {...wireframe} opacity={0.1} />
        </mesh>
      </Float>

      {/* Torus — upper right, deeper */}
      <Float speed={1.7} rotationIntensity={0.2} floatIntensity={0.9}>
        <mesh ref={torusRef} position={[3.5, 3.5, -6]}>
          <torusGeometry args={[1.3, 0.28, 8, 28]} />
          <meshBasicMaterial {...wireframe} opacity={0.08} />
        </mesh>
      </Float>

      {/* Small detail icosahedron — lower left, closer */}
      <Float speed={0.9} rotationIntensity={0.6} floatIntensity={0.4}>
        <mesh position={[-6.5, -3.5, -2]}>
          <icosahedronGeometry args={[0.85, 1]} />
          <meshBasicMaterial {...wireframe} opacity={0.09} />
        </mesh>
      </Float>

      {/* Tiny octahedron — far background accent */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[1, -4, -8]}>
          <octahedronGeometry args={[0.6, 0]} />
          <meshBasicMaterial {...wireframe} opacity={0.06} />
        </mesh>
      </Float>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*  Scene — all 3D content (must live inside <Canvas>)                        */
/* -------------------------------------------------------------------------- */

function Scene() {
  return (
    <>
      <color attach="background" args={[BG]} />
      <fog attach="fog" args={[BG, 6, 22]} />

      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[4, 4, 6]} intensity={0.6} color={ACCENT} distance={20} decay={2} />

      <Particles />
      <WireframeShapes />
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*  WebGLScene — default export, fills parent absolutely                      */
/* -------------------------------------------------------------------------- */

export default function WebGLScene() {
  return (
    <div
      className="absolute inset-0"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}