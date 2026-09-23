import type { SectorId } from "@/lib/sectorsContent";

/**
 * Art-directed spatial configuration for the Stage-2 sector layout. Scoped to
 * the Sectors experience only (not part of the global design system).
 *
 * Each plane is a flat 16:9 image positioned around the central National Motors
 * logo. Depth/rotation give the 3D feel — the images themselves stay flat and
 * unlit. Values are intentionally asymmetric (no grid): x/y are viewport-%
 * offsets from centre, z is translateZ in px (depth ordering), r* are degrees.
 */
export type PlaneConfig = {
  x: number; // % of viewport width offset from centre
  y: number; // % of viewport height offset from centre
  z: number; // translateZ depth (px)
  rx: number;
  ry: number;
  rz: number;
  scale: number;
  /** Parallax strength multiplier (near planes react a touch more). */
  depthStrength: number;
};

// All planes share the same scale (1) and depth (z: 0) so no sector is
// visually prioritised — they read as equal 16:9 frames. Only the rotations
// (mirrored per quadrant, equal magnitude) give the flat-plane-in-space feel;
// the ~2% foreshortening they add is uniform across all four. A slight vertical
// stagger keeps the composition editorial rather than a rigid grid.
export const SECTOR_PLANES: Record<SectorId, PlaneConfig> = {
  automotive: { x: -26, y: -19, z: 0, rx: 5, ry: 12, rz: -2, scale: 1, depthStrength: 1 },
  agriculture: { x: 27, y: -14, z: 0, rx: 4, ry: -12, rz: 2, scale: 1, depthStrength: 1 },
  "real-estate": { x: -27, y: 16, z: 0, rx: -5, ry: 12, rz: 2, scale: 1, depthStrength: 1 },
  csr: { x: 26, y: 21, z: 0, rx: -4, ry: -12, rz: -2, scale: 1, depthStrength: 1 },
};

/** The transform string for a plane's settled state. */
export function planeTransform(p: PlaneConfig): string {
  return (
    `translate(-50%, -50%) ` +
    `translate3d(${p.x}vw, ${p.y}vh, ${p.z}px) ` +
    `rotateX(${p.rx}deg) rotateY(${p.ry}deg) rotateZ(${p.rz}deg) ` +
    `scale(${p.scale})`
  );
}
