import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  cursor?: string;
  arrow?: boolean;
  download?: boolean;
  ariaLabel?: string;
};

export default function CTAButton({
  href,
  children,
  variant = "primary",
  className = "",
  cursor,
  arrow = true,
  download = false,
  ariaLabel,
}: Props) {
  const external = href.startsWith("http");
  const content = (
    <>
      <span className="nm-btn__text">{children}</span>
      {arrow && (
        <span className="nm-btn__arrow" aria-hidden="true">
          <ArrowRight strokeWidth={1.75} />
        </span>
      )}
    </>
  );

  const cls = `nm-btn nm-btn--${variant} ${className}`;
  const cursorAttr = cursor ?? (variant === "primary" ? "OPEN" : "VIEW");

  if (external || download) {
    return (
      <a
        href={href}
        className={cls}
        data-cursor={cursorAttr}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: true } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} data-cursor={cursorAttr} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
