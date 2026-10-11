"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScreenQuad, useTexture } from "@react-three/drei";
import * as THREE from "three";

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    // Derive UV straight from the fullscreen-triangle clip positions so we
    // don't depend on a uv attribute being present on the geometry.
    vUv = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTex;
  uniform float uTime;
  uniform vec2 uMouse;     // 0..1, smoothed
  uniform float uHover;    // 0..1
  uniform float uAspectImg;
  uniform float uAspectQuad;

  // cover-fit uv (like object-fit: cover)
  vec2 cover(vec2 uv) {
    if (uAspectQuad > uAspectImg) {
      float s = uAspectImg / uAspectQuad;
      return vec2(uv.x, (uv.y - 0.5) * s + 0.5);
    } else {
      float s = uAspectQuad / uAspectImg;
      return vec2((uv.x - 0.5) * s + 0.5, uv.y);
    }
  }

  void main() {
    vec2 uv = vUv;

    // ripple centered on cursor + a gentle idle wave
    vec2 toM = uv - uMouse;
    float d = length(toM);
    vec2 dir = toM / (d + 1e-4);
    float ripple = sin(d * 22.0 - uTime * 2.6) * exp(-d * 6.0) * uHover * 0.03;
    float idle = sin(uv.y * 9.0 + uTime * 0.6) * 0.0016
               + cos(uv.x * 7.0 - uTime * 0.5) * 0.0014;
    vec2 disp = dir * ripple + vec2(idle);

    // chromatic aberration grows with interaction + ripple strength
    float shift = (0.0025 + abs(ripple) * 0.6) * (0.35 + uHover);
    vec2 base = uv + disp;
    float r = texture2D(uTex, cover(base + dir * shift)).r;
    float g = texture2D(uTex, cover(base)).g;
    float b = texture2D(uTex, cover(base - dir * shift)).b;
    vec3 col = vec3(r, g, b);

    // subtle vignette + slight lift on hover
    float vig = smoothstep(1.15, 0.35, length(uv - 0.5));
    col *= 0.82 + 0.18 * vig;
    col += uHover * 0.04 * vig;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Plane({ src }: { src: string }) {
  const texture = useTexture(src, (t) => {
    const arr = Array.isArray(t) ? t : [t];
    arr.forEach((x) => {
      x.colorSpace = THREE.SRGBColorSpace;
    });
  });
  const { size } = useThree();

  // Memoised uniforms are passed to the material as a stable prop and never
  // mutated during render; per-frame updates go through the material ref
  // inside useFrame (ref access outside render is allowed).
  const uniforms = useMemo(
    () => ({
      uTex: { value: texture },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 0 },
      uAspectImg: { value: 1 },
      uAspectQuad: { value: 1 },
    }),
    [texture]
  );

  const matRef = useRef<THREE.ShaderMaterial>(null);
  // smoothed cursor position (0..1) and last sample, to detect movement
  const target = useRef(new THREE.Vector2(0.5, 0.5));
  const last = useRef(new THREE.Vector2(0.5, 0.5));
  const hoverTarget = useRef(0.12);

  useFrame((state, delta) => {
    const u = matRef.current?.uniforms;
    if (!u) return;
    const d = Math.min(delta, 0.05);
    u.uTime.value += d;
    u.uAspectQuad.value = size.width / size.height;
    const img = texture.image as { width: number; height: number } | undefined;
    if (img?.width) u.uAspectImg.value = img.width / img.height;

    // r3f pointer is NDC (-1..1); map to 0..1 (y already up)
    target.current.set(state.pointer.x * 0.5 + 0.5, state.pointer.y * 0.5 + 0.5);
    const moved = target.current.distanceTo(last.current);
    last.current.copy(target.current);
    hoverTarget.current = moved > 0.0008 ? 1 : hoverTarget.current + (0.12 - hoverTarget.current) * 0.04;

    u.uMouse.value.lerp(target.current, 0.09);
    u.uHover.value += (hoverTarget.current - u.uHover.value) * 0.07;
  });

  return (
    <ScreenQuad>
      <shaderMaterial
        ref={matRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </ScreenQuad>
  );
}

export default function HeroImage({ src }: { src: string }) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
      camera={{ position: [0, 0, 1] }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#0c0f11"]} />
      <Suspense fallback={null}>
        <Plane src={src} />
      </Suspense>
    </Canvas>
  );
}
