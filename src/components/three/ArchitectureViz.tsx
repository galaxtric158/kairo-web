"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function LayerStack() {
  const groupRef = useRef<THREE.Group>(null!);
  const layers = 8;
  const spacing = 0.6;
  const reducedMotion = useRef(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mql.matches;
    const onChange = (e: MediaQueryListEvent) => {
      reducedMotion.current = e.matches;
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const materials = useMemo(
    () =>
      Array.from({ length: layers }, (_item, i) =>
        new THREE.MeshBasicMaterial({
          color: new THREE.Color("#d4a853"),
          transparent: true,
          opacity: 0.08 + (i / layers) * 0.12,
          side: THREE.DoubleSide,
          wireframe: false,
        })
      ),
    []
  );

  const edges = useMemo(
    () =>
      Array.from({ length: layers }, () => {
        const geo = new THREE.PlaneGeometry(3, 0.4);
        const edge = new THREE.EdgesGeometry(geo);
        return edge;
      }),
    []
  );

  useFrame((state) => {
    if (!groupRef.current || reducedMotion.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.x = Math.sin(time * 0.15) * 0.15 + 0.3;
    groupRef.current.rotation.y = time * 0.05;
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: layers }, (_, i) => {
        const y = (i - (layers - 1) / 2) * spacing;
        return (
          <group key={i} position={[0, y, 0]}>
            <mesh material={materials[i]}>
              <planeGeometry args={[3, 0.4]} />
            </mesh>
            <lineSegments geometry={edges[i]}>
              <lineBasicMaterial color="#d4a853" transparent opacity={0.25} />
            </lineSegments>
          </group>
        );
      })}

      {/* Flow particle */}
      <FlowParticle layerCount={layers} spacing={spacing} />
    </group>
  );
}

function FlowParticle({ layerCount, spacing }: { layerCount: number; spacing: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mql.matches;
    const onChange = (e: MediaQueryListEvent) => {
      reducedMotion.current = e.matches;
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useFrame((state) => {
    if (!meshRef.current || reducedMotion.current) return;
    const time = state.clock.getElapsedTime();
    const cycle = (time * 0.4) % layerCount;
    const layerIndex = Math.floor(cycle);
    const frac = cycle - layerIndex;

    const y = (layerIndex - (layerCount - 1) / 2) * spacing + frac * spacing;
    const x = Math.sin(time * 2) * 0.3;
    const z = 0.3;

    meshRef.current.position.set(x, y, z);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial color="#d4a853" transparent opacity={0.9} />
    </mesh>
  );
}

export function ArchitectureViz() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[400px] md:h-[500px]" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        frameloop={inView ? "always" : "demand"}
      >
        <LayerStack />
      </Canvas>
    </div>
  );
}
