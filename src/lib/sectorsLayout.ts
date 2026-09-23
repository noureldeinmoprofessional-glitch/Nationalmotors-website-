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

export const SECTOR_PLANES: Record<SectorId, PlaneConfig> = {
  automotive: { x: -26, y: -16, z: 80, rx: 5, ry: 15, rz: -3, scale: 1.06, depthStrength: 1.15 },
  agriculture: { x: 27, y: -20, z: -60, rx: 4, ry: -17, rz: 2, scale: 0.92, depthStrength: 0.7 },
  "real-estate": { x: -29, y: 19, z: -110, rx: -6, ry: 13, rz: 3, scale: 0.86, depthStrength: 0.55 },
  csr: { x: 28, y: 21, z: 40, rx: -5, ry: -13, rz: -2, scale: 1.0, depthStrength: 1.0 },
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
