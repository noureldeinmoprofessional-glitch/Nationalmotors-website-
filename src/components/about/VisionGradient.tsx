"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

/* One living National Motors atmosphere — a dark, slow, blue noise field
   shared behind Vision + Mission. Raw WebGL (no dependencies). Decorative
   (aria-hidden); all content stays in semantic HTML above it. */

const VERT = `attribute vec2 a_pos; void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const FRAG = `precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_speed;
uniform float u_grain;
uniform vec3 u_bg, u_c0, u_c1, u_c2, u_c3;

vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
float fbm(vec2 p){
  float f = 0.0; float a = 0.5;
  for(int i = 0; i < 4; i++){ f += a * snoise(p); p *= 2.0; a *= 0.5; }
  return f * 0.5 + 0.5;
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  float asp = u_res.x / u_res.y;
  vec2 p = vec2(uv.x * asp, uv.y);
  float t = u_time * u_speed;

  float n1 = fbm(p * 1.3 + vec2(t * 0.06, t * 0.03));
  float n2 = fbm(p * 2.0 - vec2(t * 0.04, t * 0.05) + 11.0);
  float n3 = fbm(p * 0.7 + vec2(-t * 0.02, t * 0.025) + 40.0);

  vec3 col = mix(u_c3, u_c2, smoothstep(0.18, 0.74, n3));
  col = mix(col, u_c1, smoothstep(0.32, 0.82, n1) * 0.9);
  float light = smoothstep(0.40, 0.92, n2);
  col = mix(col, u_c0, light * 0.6);
  col = mix(u_bg, col, 0.98);

  float vig = smoothstep(1.35, 0.28, distance(uv, vec2(0.5)));
  col *= mix(0.6, 1.08, vig);

  float grain = fract(sin(dot(gl_FragCoord.xy + u_time * 60.0, vec2(12.9898, 78.233))) * 43758.5453);
  col += (grain - 0.5) * u_grain * 0.14;

  gl_FragColor = vec4(max(col, 0.0), 1.0);
}`;

const hex = (h: string): [number, number, number] => {
  const n = parseInt(h.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

const BG = "#080A0D";
const COLORS = ["#3B60A7", "#29477A", "#162846", "#0A1018"];

export default function VisionGradient() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl || gl.isContextLost()) return; // no/lost WebGL → CSS fallback stays visible

    const reduce = prefersReducedMotion();

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = U("u_res");
    const uTime = U("u_time");
    gl.uniform1f(U("u_speed"), 0.5);
    gl.uniform1f(U("u_grain"), 0.15);
    gl.uniform3fv(U("u_bg"), hex(BG));
    gl.uniform3fv(U("u_c0"), hex(COLORS[0]));
    gl.uniform3fv(U("u_c1"), hex(COLORS[1]));
    gl.uniform3fv(U("u_c2"), hex(COLORS[2]));
    gl.uniform3fv(U("u_c3"), hex(COLORS[3]));

    const SCALE = 0.6; // render at 60% — the field is diffuse, so this is invisible but much cheaper
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const r = wrap.getBoundingClientRect();
      const w = Math.max(1, Math.round(r.width * dpr * SCALE));
      const h = Math.max(1, Math.round(r.height * dpr * SCALE));
      // Only reassign the backing store when it changes (that resets the GL
      // buffer), but ALWAYS push viewport + resolution — otherwise a second
      // mount on the same canvas (React StrictMode) would leave u_res at 0.
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    let raf = 0;
    const start = performance.now();
    const frame = (now: number) => {
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    };
    // Always paint one frame immediately (no blank canvas on first paint),
    // then animate unless reduced motion is requested.
    gl.uniform1f(uTime, reduce ? 8.0 : 0.6);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (!reduce) raf = requestAnimationFrame(frame);

    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      cancelAnimationFrame(raf);
      ro.disconnect();
      // NOTE: do NOT call loseContext() here. In React StrictMode (dev) the
      // effect mounts → cleans up → remounts on the same <canvas>; losing the
      // context in the throwaway cleanup would leave the real mount with a
      // dead context (grey render). The GPU context is released on GC when
      // the canvas is removed.
    };
  }, []);

  return (
    <div ref={wrapRef} className="nm-vm__gradient" aria-hidden="true">
      <canvas ref={canvasRef} className="nm-vm__gradient-canvas" />
      <div className="nm-vm__gradient-overlay" />
    </div>
  );
}
