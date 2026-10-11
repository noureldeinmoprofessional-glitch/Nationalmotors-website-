"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * National Motors monogram mark, isolated from the horizontal lockup
 * (viewBox 0 0 165.2 165.09). Extruded into 3D and finished in brushed metal.
 */
const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 165.2 165.09">
<path d="M165.2,0c-10.31.06-20.63.04-30.93.03h-11.31v1.24c0,10.26.14,20.54-.08,30.8-2.82-7.71-5.35-15.53-8-23.31-1.05-2.87-2.05-5.73-2.89-8.68h-8.56C68.95.1,34.47-.22,0,.31v164.78h42.64v-1.93s.01-.31.01-.31c-.03-9.67-.24-19.3.11-28.94v-.56.03s.01-.04.01-.04l1.26,3.85,9.2,27.9h111.97c0-12.15.04-24.3.04-36.46V46.08c-.02-15.34-.04-30.69-.04-46.07ZM117.58,112.59c-8.47,9.83-21,16.06-34.97,16.06-25.47,0-46.19-20.73-46.19-46.19,0-15.58,7.74-29.36,19.57-37.73,7.54-5.32,16.72-8.46,26.62-8.46,25.46,0,46.19,20.72,46.19,46.19,0,11.49-4.23,22.04-11.22,30.13Z"/>
<path d="M112.6,77.97v26.08h-16.85v-2.38c0-.11.03-.23.03-.36v-22.96c0-1.31-1.06-2.36-2.37-2.36s-2.36,1.06-2.36,2.36v25.7h-16.84v-25.7c0-1.31-1.06-2.36-2.37-2.36s-2.36,1.06-2.36,2.36v1.61s0,.03,0,.07v24.02h-16.85v-27.26c0-4.1,2.14-9.17,5.21-11.76,3.07-2.61,6.46-4.17,11.35-4.17,5.81,0,10.28,2.17,13.41,6.5,1.91-2.34,3.95-4,6.14-5,2.18-1.01,4.88-1.51,8.09-1.51,5.1,0,8.86,2.13,11.58,4.74,2.71,2.6,4.2,7.49,4.2,12.38"/>
</svg>`;

function buildGeometry(): THREE.BufferGeometry {
  const data = new SVGLoader().parse(MARK_SVG);
  const geoms: THREE.ExtrudeGeometry[] = [];
  const opts: THREE.ExtrudeGeometryOptions = {
    depth: 22,
    bevelEnabled: true,
    bevelThickness: 3.4,
    bevelSize: 2.2,
    bevelOffset: 0,
    bevelSegments: 5,
    curveSegments: 32,
  };
  for (const path of data.paths) {
    for (const shape of SVGLoader.createShapes(path)) {
      geoms.push(new THREE.ExtrudeGeometry(shape, opts));
    }
  }
  const merged = mergeGeometries(geoms, false) ?? geoms[0];

  // Center on origin, normalise to a predictable world size.
  merged.computeBoundingBox();
  const bb = merged.boundingBox!;
  const center = new THREE.Vector3();
  const size = new THREE.Vector3();
  bb.getCenter(center);
  bb.getSize(size);
  merged.translate(-center.x, -center.y, -center.z);
  const scale = 4.4 / Math.max(size.x, size.y);
  merged.scale(scale, scale, scale);
  merged.computeVertexNormals();
  return merged;
}

function Emblem({ animate }: { animate: boolean }) {
  const geometry = useMemo(() => buildGeometry(), []);
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!animate) return;
    const t = state.clock.elapsedTime;
    const d = Math.min(delta, 0.05); // clamp to avoid jumps on tab refocus
    if (spin.current) spin.current.rotation.y += d * 0.3;
    if (tilt.current) {
      tilt.current.position.y = Math.sin(t * 0.9) * 0.14;
      tilt.current.rotation.x = THREE.MathUtils.lerp(
        tilt.current.rotation.x,
        -state.pointer.y * 0.38,
        0.06
      );
      tilt.current.rotation.z = THREE.MathUtils.lerp(
        tilt.current.rotation.z,
        state.pointer.x * 0.14,
        0.06
      );
    }
  });

  return (
    <group ref={tilt}>
      <group ref={spin}>
        {/* scale.y = -1 converts SVG's y-down space to three's y-up */}
        <mesh geometry={geometry} scale={[1, -1, 1]}>
          <meshStandardMaterial
            color="#d2d7db"
            metalness={1}
            roughness={0.26}
            envMapIntensity={1.35}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function LogoCanvas() {
  const animate = !prefersReducedMotion();

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 9], fov: 35 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 7, 8]} intensity={1.7} />
      <directionalLight position={[-7, -2, 4]} intensity={0.6} color="#6f91c7" />

      {/* Lightformer environment gives the metal something to reflect
          without fetching an external HDR (blocked in this environment). */}
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3.2} position={[0, 3, -6]} scale={[14, 7, 1]} />
        <Lightformer form="rect" intensity={2.2} position={[-6, 1, 3]} scale={[7, 9, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={1.6} position={[6, -2, 3]} scale={[7, 7, 1]} color="#8fa9d8" />
        <Lightformer form="ring" intensity={1.4} position={[0, 0, 7]} scale={[5, 5, 1]} color="#ffffff" />
      </Environment>

      <Emblem animate={animate} />
    </Canvas>
  );
}
