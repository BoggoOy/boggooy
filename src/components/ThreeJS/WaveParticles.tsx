"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";

const COUNT_X = 80;
const COUNT_Y = 35;
const SPACING = 0.5;
const REPULSE_RADIUS = 3.2;
const REPULSE_STRENGTH = 1.2;
const BOUNCE = 0.18;
const WAVE_SPEED = 4;
const WAVE_AMPLITUDE = 0.08;

type Wave = {
  x: number;
  y: number;
  start: number;
  id: number;
};

function WavePoints() {
  const ref = useRef<any>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);

  // Muutettu: useita aaltoja samanaikaisesti
  const wavesRef = useRef<Wave[]>([]);
  const waveIdCounter = useRef(0);
  const currentTimeRef = useRef(0);

  // Alkuperäiset paikat
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

  // Z-arvot
  const zState = useRef<Float32Array>(
    new Float32Array(basePositions.length).fill(0)
  );

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    currentTimeRef.current = t; // Tallenna nykyinen aika

    // Gridin maksimietäisyys
    const maxDist = Math.sqrt(
      Math.pow(COUNT_X * SPACING, 2) + Math.pow(COUNT_Y * SPACING, 2)
    );

    // Poista aalto jos se on mennyt gridin yli
    wavesRef.current = wavesRef.current.filter((wave) => {
      const waveFront = (t - wave.start) * WAVE_SPEED;
      return waveFront <= maxDist + 4;
    });

    for (let i = 0; i < basePositions.length; i++) {
      const [px, py] = basePositions[i];
      let targetZ = 0;

      // Hiiren repulsio
      if (mouse) {
        const dx = px - mouse.x;
        const dy = py - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPULSE_RADIUS) {
          const force = (REPULSE_RADIUS - dist) / REPULSE_RADIUS;
          targetZ += force * REPULSE_STRENGTH;
        }
      }

      // Aaltojen interferenssi - kaikkien aaltojen vaikutus lasketaan yhteen
      let totalWaveEffect = 0;
      for (const wave of wavesRef.current) {
        const { x: wx, y: wy, start } = wave;
        const dx = px - wx;
        const dy = py - wy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const waveFront = (t - start) * WAVE_SPEED;

        // Aallon vaikutus tässä pisteessä
        if (waveFront > dist && waveFront < dist + 4) {
          const waveContribution =
            Math.sin((waveFront - dist) * 2.0) *
            WAVE_AMPLITUDE *
            Math.exp(-0.5 * (waveFront - dist));
          // Interferenssi: aaltojen amplitudit lasketaan yhteen
          totalWaveEffect += waveContribution;
        }
      }

      targetZ += totalWaveEffect;

      // Bouncy palautus
      zState.current[i] += (targetZ - zState.current[i]) * BOUNCE;

      // Päivitä geometryn z-arvo
      ref.current.geometry.attributes.position.setZ(i, zState.current[i]);
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  // Hiiren liikkeen tallennus
  const { size } = useThree();
  function handlePointerMove(e: any) {
    const { width, height } = size;
    const x = (e.clientX / width - 0.5) * COUNT_X * SPACING;
    const y = -(e.clientY / height - 0.5) * COUNT_Y * SPACING;
    setMouse({ x, y });
  }

  function handlePointerOut() {
    setMouse(null);
  }

  function handlePointerDown(e: any) {
    const { width, height } = size;
    const x = (e.clientX / width - 0.5) * COUNT_X * SPACING;
    const y = -(e.clientY / height - 0.5) * COUNT_Y * SPACING;

    // Käytä samaa aikaskaalaa kuin useFrame
    const newWave: Wave = {
      x,
      y,
      start: currentTimeRef.current,
      id: waveIdCounter.current++,
    };

    wavesRef.current.push(newWave);
  }

  return (
    <group>
      <Points
        ref={ref}
        positions={new Float32Array(basePositions.flat())}
        stride={3}
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
        onPointerDown={handlePointerDown}
      >
        <PointMaterial
          color="#fff"
          size={0.1}
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
        width: "100%",
        height: "100%",
        display: "block",
        background: "transparent",
        pointerEvents: "auto",
        zIndex: -50,
        position: "absolute",
        top: 0,
        left: 0,
        opacity: 0.15,
      }}
      aria-hidden="true"
    >
      <WavePoints />
    </Canvas>
  );
}
