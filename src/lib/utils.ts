/**
 * Minimal `cn` classname joiner (filters falsy values). Kept dependency-free —
 * this project doesn't use clsx / tailwind-merge, and the class sets here are
 * authored explicitly so no conflict-resolution is needed.
 */
export function cn(
  ...classes: Array<string | number | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}
