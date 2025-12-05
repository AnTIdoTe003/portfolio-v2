"use client"

import { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei"
import type { Mesh, Group } from "three"
import * as THREE from "three"

// Interactive orb that follows mouse
function InteractiveOrb() {
  const meshRef = useRef<Mesh>(null)
  const { viewport, pointer } = useThree()

  useFrame((state) => {
    if (!meshRef.current) return

    // Smooth follow mouse
    const targetX = pointer.x * viewport.width * 0.15
    const targetY = pointer.y * viewport.height * 0.15

    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      targetX,
      0.05
    )
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetY,
      0.05
    )

    // Gentle rotation
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.9}
        />
      </Sphere>
    </Float>
  )
}

// Floating particles cluster
function ParticleCluster() {
  const groupRef = useRef<Group>(null)
  const count = 50

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const radius = 2 + Math.random() * 1.5

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = radius * Math.cos(phi)
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
    groupRef.current.rotation.x = state.clock.elapsedTime * 0.03
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#06b6d4"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
    </group>
  )
}

// Orbit rings
function OrbitRings() {
  const ringRef = useRef<Group>(null)

  useFrame((state) => {
    if (!ringRef.current) return
    ringRef.current.rotation.x = state.clock.elapsedTime * 0.1
    ringRef.current.rotation.z = state.clock.elapsedTime * 0.05
  })

  return (
    <group ref={ringRef}>
      {[2.2, 2.8, 3.4].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.2, 0, i * 0.3]}>
          <torusGeometry args={[radius, 0.01, 16, 100]} />
          <meshBasicMaterial
            color={i === 0 ? "#8b5cf6" : i === 1 ? "#06b6d4" : "#ec4899"}
            transparent
            opacity={0.3 - i * 0.08}
          />
        </mesh>
      ))}
    </group>
  )
}

// Main 3D scene
function Scene() {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />

      {/* Main interactive orb */}
      <InteractiveOrb />

      {/* Particle cluster around orb */}
      <ParticleCluster />

      {/* Orbit rings */}
      <OrbitRings />

      {/* Background stars */}
      <Stars
        radius={50}
        depth={50}
        count={1000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />
    </>
  )
}

// Canvas wrapper with fallback
export function HeroOrb() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  )
}

// Lightweight placeholder for SSR
export function HeroOrbFallback() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-3xl animate-pulse" />
      </div>
    </div>
  )
}

