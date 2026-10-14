/* Inline brand glyphs (lucide removed brand icons). currentColor, 24x24. */

type P = { className?: string };

export function Facebook({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  );
}

export function Instagram({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Linkedin({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function Youtube({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.5a3 3 0 0 0-2.11-2.12C19.5 3.86 12 3.86 12 3.86s-7.5 0-9.39.52A3 3 0 0 0 .5 6.5 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.5 3 3 0 0 0 2.11 2.12c1.89.52 9.39.52 9.39.52s7.5 0 9.39-.52a3 3 0 0 0 2.11-2.12A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.5ZM9.6 15.57V8.43L15.82 12 9.6 15.57Z" />
    </svg>
  );
}

export function Whatsapp({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35ZM12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.77.46 3.45 1.28 4.92L2 22l5.2-1.36A9.93 9.93 0 0 0 12.02 22c5.52 0 10-4.48 10-10S17.54 2 12.02 2Zm0 18.3c-1.6 0-3.1-.43-4.38-1.18l-.31-.19-3.09.81.82-3.01-.2-.32A8.26 8.26 0 0 1 3.72 12c0-4.58 3.72-8.3 8.3-8.3 4.58 0 8.3 3.72 8.3 8.3 0 4.58-3.72 8.3-8.3 8.3Z" />
    </svg>
  );
}

export function Tiktok({ className }: P) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82a4.28 4.28 0 0 1-1.01-2.82h-3.3v12.9a2.59 2.59 0 0 1-2.58 2.47 2.59 2.59 0 0 1-.58-5.11v-3.37a5.92 5.92 0 0 0-5.1 5.86A5.92 5.92 0 0 0 9.95 21.5a5.92 5.92 0 0 0 5.92-5.92V9.01a7.57 7.57 0 0 0 4.42 1.42V7.12a4.28 4.28 0 0 1-3.69-1.3Z" />
    </svg>
  );
}
