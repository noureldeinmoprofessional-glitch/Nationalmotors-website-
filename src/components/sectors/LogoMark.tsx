import Image from "next/image";

type Props = {
  /** White for dark backgrounds (default), dark for light backgrounds. */
  variant?: "white" | "dark";
  className?: string;
};

/**
 * National Motors vertical monogram lockup — the central mark of the Sectors
 * experience. Renders the supplied brand SVG unmodified (from /public/logos),
 * so the artwork is never recreated in code. Kept as a reusable component so
 * the entrance/ambient timeline can animate its wrapper.
 */
export default function LogoMark({ variant = "white", className }: Props) {
  const src =
    variant === "dark" ? "/logos/nm-logo-dark.svg" : "/logos/nm-logo-white.svg";
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={261}
      height={361}
      className={className}
      priority
    />
  );
}
