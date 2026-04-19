"use client";

import { useRef } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import * as THREE from "three";

/**
 * Cinematic hero scene:
 *  - Center refractive glass orb (MeshTransmissionMaterial)
 *  - Metallic gold satellites floating around it
 *  - Subtle environment + bloom
 *  - Gentle cursor-reactive camera drift via Scene component
 */
export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 5], fov: 40 }}
      className="!h-full !w-full"
      style={{ pointerEvents: "none" }}
    >
      <color attach="background" args={["#eefafc"]} />
      <Scene />
      <EffectComposer>
        <Bloom
          intensity={0.45}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.9}
          kernelSize={KernelSize.LARGE}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Smoothly chase pointer
    pointer.current.x +=
      (state.pointer.x - pointer.current.x) * Math.min(1, delta * 3);
    pointer.current.y +=
      (state.pointer.y - pointer.current.y) * Math.min(1, delta * 3);

    groupRef.current.rotation.y = pointer.current.x * 0.25;
    groupRef.current.rotation.x = -pointer.current.y * 0.15;
  });

  const handlePointer = (_e: ThreeEvent<PointerEvent>) => {
    /* reserved for future interactions */
  };

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-4, -2, 2]} intensity={0.8} color="#8fe4f0" />
      <Environment preset="studio" />

      <group ref={groupRef} onPointerMove={handlePointer}>
        <Float speed={1.1} rotationIntensity={0.4} floatIntensity={0.7}>
          <mesh castShadow receiveShadow>
            <icosahedronGeometry args={[1.25, 12]} />
            <MeshTransmissionMaterial
              samples={6}
              thickness={1.2}
              chromaticAberration={0.08}
              distortion={0.35}
              distortionScale={0.3}
              temporalDistortion={0.12}
              roughness={0.05}
              transmission={1}
              ior={1.35}
              backside
              color="#ffffff"
            />
          </mesh>
        </Float>

        <Satellite position={[2.2, 0.8, -0.5]} size={0.32} color="#f59e0b" />
        <Satellite position={[-2.5, -0.3, 0.2]} size={0.4} color="#5eead4" />
        <Satellite position={[1.7, -1.5, 0.6]} size={0.22} color="#38bdf8" />
        <Satellite position={[-1.9, 1.4, -0.2]} size={0.28} color="#fbbf24" />
      </group>
    </>
  );
}

function Satellite({
  position,
  size,
  color,
}: {
  position: [number, number, number];
  size: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.12;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.4}>
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.85}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}
