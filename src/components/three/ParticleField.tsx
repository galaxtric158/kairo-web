"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 400;

function initPositions(): Float32Array {
  const arr = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    arr[i * 3] = (Math.random() - 0.5) * 12;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }
  return arr;
}

function initSizes(): Float32Array {
  const arr = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    arr[i] = Math.random() * 2.5 + 0.3;
  }
  return arr;
}

const initialPositions = initPositions();
const initialSizes = initSizes();

function Particles() {
  const mesh = useRef<THREE.Points>(null!);
  const mouse = useRef({ x: 0, y: 0 });
  const initialized = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (initialized.current || !mesh.current) return;
    initialized.current = true;

    const geo = mesh.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const sizeAttr = geo.attributes.size as THREE.BufferAttribute;

    if (posAttr && sizeAttr) {
      posAttr.needsUpdate = true;
      sizeAttr.needsUpdate = true;
    }
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();

    mesh.current.rotation.y = time * 0.015 + mouse.current.x * 0.1;
    mesh.current.rotation.x = Math.sin(time * 0.008) * 0.08 + mouse.current.y * 0.05;

    const posAttr = mesh.current.geometry.attributes.position;
    if (posAttr) {
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < COUNT; i++) {
        arr[i * 3 + 1] += Math.sin(time * 0.5 + i * 0.08) * 0.0003;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[initialPositions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[initialSizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#d4a853"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function ParticleField() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
