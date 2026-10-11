import type Lenis from "lenis";

declare global {
  interface Window {
    /** Lenis smooth-scroll instance, exposed by SmoothScroll provider. */
    __lenis?: Lenis;
  }
}

export {};
