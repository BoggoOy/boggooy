"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";

const COUNT_X = 80;
const COUNT_Y = 35;
const SPACING = 0.5;

function WavePoints() {
  const ref = useRef<any>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Luo pisteiden paikat
  const basePositions = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let x = 0; x < COUNT_X; x++) {
      for (let y = 0; y < COUNT_Y; y++) {
        const px = (x - COUNT_X / 2) * SPACING;
        const py = (y - COUNT_Y / 2) * SPACING;
        arr.push([px, py, 0]);
      }
    }
    return arr;
  }, []);

  // Päivitä pisteiden z-arvot hiiren mukaan
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    for (let i = 0; i < basePositions.length; i++) {
      const [px, py] = basePositions[i];
      // Hiiren X/Y vaikuttaa aaltoon
      const wave =
        Math.sin(px * 1.2 + t * 1.2 + mouse.x * 2) *
        Math.cos(py * 1.5 + t * 0.8 + mouse.y * 2) *
        0.8;
      ref.current.geometry.attributes.position.setZ(i, wave);
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  // Hiiren liikkeen tallennus
  const { size, viewport } = useThree();
  function handlePointerMove(e: any) {
    // Normalisoi hiiren sijainti -1 ... 1
    const x = (e.clientX / size.width) * 2 - 1;
    const y = (e.clientY / size.height) * 2 - 1;
    setMouse({ x, y });
  }

  return (
    <group>
      <Points
        ref={ref}
        positions={new Float32Array(basePositions.flat())}
        stride={3}
        onPointerMove={handlePointerMove}
      >
        <PointMaterial
          color="#fff"
          size={0.08}
          sizeAttenuation
          transparent
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function WaveParticles() {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 60 }}
      style={{
        width: "100dvw",
        height: "100dvh",
        display: "block",
        background: "transparent",
        pointerEvents: "auto",
      }}
    >
      <WavePoints />
    </Canvas>
  );
}
