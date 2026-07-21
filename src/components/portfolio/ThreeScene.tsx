"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMotionValue, type MotionValue } from "framer-motion";
import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

/* ──────────────────────────── constants ──────────────────────────── */

const PARTICLE_COUNT = 50;

const INDIGO_HEX = "#6366F1";
const LIGHT_INDIGO_HEX = "#818CF8";

/* ──────────────────────── visibility hook ──────────────────────── */

function useHeroVisible() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = document.getElementById("hero-section");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return visible;
}

/* ──────────────────────────── particles ──────────────────────────── */

function Particles() {
  const ref = useRef<THREE.Points>(null!);

  const geometry = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    ref.current.rotation.y = t * 0.012;
    ref.current.rotation.x = Math.sin(t * 0.008) * 0.08;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.035}
        color={INDIGO_HEX}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ──────────────────────── wireframe shape ────────────────────────── */

interface WireframeShapeProps {
  geometry: THREE.BufferGeometry;
  position: [number, number, number];
  rotationSpeed: [number, number, number];
  floatSpeed: number;
  floatAmplitude: number;
}

function WireframeShape({
  geometry,
  position,
  rotationSpeed,
  floatSpeed,
  floatAmplitude,
}: WireframeShapeProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const initialY = position[1];

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    ref.current.rotation.x += rotationSpeed[0];
    ref.current.rotation.y += rotationSpeed[1];
    ref.current.rotation.z += rotationSpeed[2];
    ref.current.position.y = initialY + Math.sin(t * floatSpeed) * floatAmplitude;
  });

  return (
    <mesh ref={ref} position={position} geometry={geometry}>
      <meshBasicMaterial color={LIGHT_INDIGO_HEX} wireframe transparent opacity={0.12} />
    </mesh>
  );
}

/* ─────────────────── wireframe shapes group ──────────────────────── */

function WireframeShapes() {
  const shapes = useMemo(
    () => [
      {
        geometry: new THREE.IcosahedronGeometry(1.2, 1),
        position: [-3.5, 1.2, -2] as [number, number, number],
        rotationSpeed: [0.001, 0.002, 0.001] as [number, number, number],
        floatSpeed: 0.4,
        floatAmplitude: 0.4,
      },
      {
        geometry: new THREE.OctahedronGeometry(0.9, 0),
        position: [3.2, -1, -1.5] as [number, number, number],
        rotationSpeed: [0.002, 0.001, 0.0015] as [number, number, number],
        floatSpeed: 0.5,
        floatAmplitude: 0.3,
      },
      {
        geometry: new THREE.TorusGeometry(0.8, 0.3, 16, 32),
        position: [0.5, 2.5, -3] as [number, number, number],
        rotationSpeed: [0.001, 0.003, 0.001] as [number, number, number],
        floatSpeed: 0.35,
        floatAmplitude: 0.35,
      },
      {
        geometry: new THREE.DodecahedronGeometry(0.7, 0),
        position: [-1.5, -2.2, -1] as [number, number, number],
        rotationSpeed: [0.0015, 0.001, 0.002] as [number, number, number],
        floatSpeed: 0.45,
        floatAmplitude: 0.25,
      },
    ],
    [],
  );

  return (
    <>
      {shapes.map((props, i) => (
        <WireframeShape key={i} {...props} />
      ))}
    </>
  );
}

/* ────────────────────── camera controller ────────────────────────── */

function CameraController({
  mouseX,
  mouseY,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  const targetRotY = useRef(0);
  const targetRotX = useRef(0);

  useFrame(() => {
    const cam = cameraRef.current;
    if (!cam) return;
    const mx = mouseX.get();
    const my = mouseY.get();
    targetRotY.current = mx * 0.04;
    targetRotX.current = -my * 0.04;
    cam.rotation.y = THREE.MathUtils.lerp(cam.rotation.y, targetRotY.current, 0.05);
    cam.rotation.x = THREE.MathUtils.lerp(cam.rotation.x, targetRotX.current, 0.05);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 8]} fov={60} />;
}

/* ────────────────────── scene content ────────────────────────────── */

function SceneContent({
  mouseX,
  mouseY,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  return (
    <>
      <CameraController mouseX={mouseX} mouseY={mouseY} />
      <ambientLight intensity={0.3} color={INDIGO_HEX} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color={LIGHT_INDIGO_HEX} />
      <pointLight position={[-5, -3, 2]} intensity={0.3} color={INDIGO_HEX} />
      <Particles />
      <WireframeShapes />
      <EffectComposer>
        <Bloom intensity={0.25} luminanceThreshold={0.85} luminanceSmoothing={0.9} />
      </EffectComposer>
    </>
  );
}

/* ─────────────────────── main export ─────────────────────────────── */

export default function ThreeScene() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isVisible = useHeroVisible();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      id="hero-3d"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        visibility: isVisible ? "visible" : "hidden",
      }}
    >
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        dpr={[1, 1.5]}
        frameloop={isVisible ? "always" : "never"}
        camera={{ fov: 60 }}
      >
        <SceneContent mouseX={mouseX} mouseY={mouseY} />
      </Canvas>
    </div>
  );
}