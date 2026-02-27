/* eslint-disable react-hooks/immutability */
"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { debug } from "@/src/config/debug";

/** Default gradient values — edit these to change the look */
const DEFAULTS = {
  color1: "#ffffff",
  color2: "#cbcbcb",
  color3: "#9d9d9d",
  color4: "#a3a3a3",
  speed: 0.1,
  scale: 0.5,
  complexity: 1.0,
  softness: 0.05,
  grainStrength: 0.1,
} as const;

function FlowGradientPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  // 🔹 Lataa blue noise
  const blueNoise = useLoader(
    THREE.TextureLoader,
    "/textures/blue_noise_med.png",
  );

  // 🔹 Tärkeät texture-asetukset
  blueNoise.wrapS = blueNoise.wrapT = THREE.RepeatWrapping;
  blueNoise.minFilter = THREE.NearestFilter;
  blueNoise.magFilter = THREE.NearestFilter;
  blueNoise.generateMipmaps = false;

  // 🎛 Leva UI - only active when debug.leva is true, otherwise use DEFAULTS
  const levaControls = useControls("Flow Gradient", {
    color1: { value: DEFAULTS.color1 },
    color2: { value: DEFAULTS.color2 },
    color3: { value: DEFAULTS.color3 },
    color4: { value: DEFAULTS.color4 },
    speed: { value: DEFAULTS.speed, min: 0, max: 1, step: 0.01 },
    scale: { value: DEFAULTS.scale, min: 0.5, max: 3, step: 0.1 },
    complexity: { value: DEFAULTS.complexity, min: 1, max: 5, step: 0.1 },
    softness: {
      value: DEFAULTS.softness,
      min: 0.05,
      max: 1.0,
      step: 0.01,
      label: "Softness (blur)",
    },
    grainStrength: {
      value: DEFAULTS.grainStrength,
      min: 0,
      max: 0.4,
      step: 0.005,
    },
  });

  const controls = debug.leva ? levaControls : DEFAULTS;

  // ✅ Uniformit luodaan VAIN KERRAN
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uColor1: { value: new THREE.Color(controls.color1) },
      uColor2: { value: new THREE.Color(controls.color2) },
      uColor3: { value: new THREE.Color(controls.color3) },
      uColor4: { value: new THREE.Color(controls.color4) },
      uSpeed: { value: controls.speed },
      uScale: { value: controls.scale },
      uComplexity: { value: controls.complexity },
      uSoftness: { value: controls.softness },
      uGrainStrength: { value: controls.grainStrength },
      uBlueNoise: { value: blueNoise },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [blueNoise],
  );

  // ✅ Päivitetään vain .value, EI luoda uudelleen
  useEffect(() => {
    uniforms.uColor1.value.set(controls.color1);
    uniforms.uColor2.value.set(controls.color2);
    uniforms.uColor3.value.set(controls.color3);
    uniforms.uColor4.value.set(controls.color4);
    uniforms.uSpeed.value = controls.speed;
    uniforms.uScale.value = controls.scale;
    uniforms.uComplexity.value = controls.complexity;
    uniforms.uSoftness.value = controls.softness;
    uniforms.uGrainStrength.value = controls.grainStrength;
  }, [controls, uniforms]);

  // ✅ Aika ja resoluutio päivittyvät
  useFrame(({ clock, size }) => {
    uniforms.uTime.value = clock.elapsedTime;
    uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
        vertexShader={`
          void main() {
            gl_Position = vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          precision highp float;

          uniform float uTime;
          uniform vec2 uResolution;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uColor3;
          uniform vec3 uColor4;
          uniform float uSpeed;
          uniform float uScale;
          uniform float uComplexity;
          uniform float uSoftness;
          uniform float uGrainStrength;
          uniform sampler2D uBlueNoise;

          // Simplex 3D Noise
          vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
          vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

          float snoise(vec3 v) {
            const vec2 C = vec2(1.0/6.0, 1.0/3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

            vec3 i  = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);

            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);

            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;

            i = mod(i, 289.0);
            vec4 p = permute(permute(permute(
                      i.z + vec4(0.0, i1.z, i2.z, 1.0))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

            float n_ = 1.0/7.0;
            vec3 ns = n_ * D.wyz - D.xzx;

            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);

            vec4 x = x_ * ns.x + ns.yyyy;
            vec4 y = y_ * ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);

            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);

            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));

            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

            vec3 p0 = vec3(a0.xy, h.x);
            vec3 p1 = vec3(a0.zw, h.y);
            vec3 p2 = vec3(a1.xy, h.z);
            vec3 p3 = vec3(a1.zw, h.w);

            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
            p0 *= norm.x;
            p1 *= norm.y;
            p2 *= norm.z;
            p3 *= norm.w;

            vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
          }

          // FBM - kerrostettu kohina
          float fbm(vec3 p, int octaves) {
            float value = 0.0;
            float amplitude = 0.5;
            float frequency = 1.0;
            
            for (int i = 0; i < 6; i++) {
              if (i >= octaves) break;
              value += amplitude * snoise(p * frequency);
              amplitude *= 0.5;
              frequency *= 2.0;
            }
            return value;
          }

          void main() {
            vec2 uv = gl_FragCoord.xy / uResolution;
            float aspect = uResolution.x / uResolution.y;
            vec2 scaledUV = vec2(uv.x * aspect, uv.y);
            
            float time = uTime * uSpeed;
            int octaves = int(uComplexity);
            
            // 🌊 Fluid noise kentät - täyttää koko ruudun
            float n1 = fbm(vec3(scaledUV * uScale, time * 0.8), octaves);
            float n2 = fbm(vec3(scaledUV * uScale + 50.0, time * 0.6 + 100.0), octaves);
            float n3 = fbm(vec3(scaledUV * uScale + 100.0, time * 0.7 + 200.0), octaves);
            float n4 = fbm(vec3(scaledUV * uScale + 150.0, time * 0.5 + 300.0), octaves);
            
            // Normalisoi arvot 0-1 välille
            n1 = n1 * 0.5 + 0.5;
            n2 = n2 * 0.5 + 0.5;
            n3 = n3 * 0.5 + 0.5;
            n4 = n4 * 0.5 + 0.5;
            
            // 🎨 Värien sekoitus - jatkuva fluid-efekti
            vec3 color = vec3(0.0);
            
            // Softness säätää smoothstepin leveyttä (pienempi = terävämpi, suurempi = pehmeämpi)
            float edge1 = 0.5 - uSoftness;
            float edge2 = 0.5 + uSoftness;
            
            // Pehmeä värien sekoitus noise-kentillä
            color += uColor1 * smoothstep(edge1, edge2, n1) * 0.8;
            color += uColor2 * smoothstep(edge1 + 0.05, edge2 + 0.05, n2) * 0.7;
            color += uColor3 * smoothstep(edge1 - 0.05, edge2 - 0.05, n3) * 0.75;
            color += uColor4 * smoothstep(edge1 + 0.1, edge2 + 0.1, n4) * 0.6;
            
            // Tumma tausta sekoittuu reunoille
            float darkness = 1.0 - (n1 + n2 + n3 + n4) * 0.25;
            darkness = smoothstep(0.2, 0.8, darkness);
            color = mix(color, vec3(0.02, 0.02, 0.04), darkness * 0.5);
            
            // Värien intensiteetti
            color = pow(color, vec3(0.9));
            
            // 🔹 Blue noise grain
            vec2 noiseUV = gl_FragCoord.xy / 256.0;
            vec2 timeOffset = vec2(
              fract(uTime * 0.5),
              fract(uTime * 0.37)
            );
            float grain = texture2D(uBlueNoise, fract(noiseUV + timeOffset)).r;
            grain = (grain - 0.5) * uGrainStrength;
            color += grain;
            
            // Varmista värien pysyvän oikealla alueella
            color = clamp(color, 0.0, 1.0);
            
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
}

export default function GrainyNoiseBackground() {
  return (
    <>
      {/* 🎛 UI - näkyy vain kun debug.leva = true */}
      <Leva hidden={!debug.leva} collapsed={false} />

      {/* 🎨 Fullscreen canvas */}
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        gl={{ antialias: false, alpha: false }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          isolation: "auto",
        }}
      >
        <FlowGradientPlane />
      </Canvas>
    </>
  );
}
