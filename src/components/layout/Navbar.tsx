"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, ChevronDown } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { NAV } from "@/lib/site";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<"EN" | "AR">("EN");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 40));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <header className="nm-nav" data-scrolled={scrolled || undefined}>
        <div className="nm-nav__inner nm-shell">
          <Link href="/" className="nm-nav__logo" aria-label="National Motors — home">
            <Logo className="nm-nav__logo-svg" />
          </Link>

          <nav className="nm-nav__menu" aria-label="Primary">
            <ul className="nm-nav__list">
              {NAV.map((item) => (
                <li
                  key={item.label}
                  className={`nm-nav__item${item.children ? " has-children" : ""}`}
                >
                  <Link href={item.href} className="nm-nav__link">
                    {item.label}
                    {item.children && (
                      <ChevronDown className="nm-nav__caret" aria-hidden="true" />
                    )}
                  </Link>
                  {item.children && (
                    <div className="nm-nav__panel" role="menu">
                      <ul>
                        {item.children.map((c) => (
                          <li key={c.label} role="none">
                            <Link href={c.href} role="menuitem" className="nm-nav__sublink">
                              <span>{c.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="nm-nav__actions">
            <button className="nm-nav__icon" aria-label="Search" data-cursor="SEARCH">
              <Search strokeWidth={1.6} />
            </button>
            <div className="nm-nav__lang" role="group" aria-label="Language">
              <button
                aria-pressed={lang === "EN"}
                className={lang === "EN" ? "is-active" : ""}
                onClick={() => setLang("EN")}
              >
                EN
              </button>
              <span aria-hidden="true">/</span>
              <button
                aria-pressed={lang === "AR"}
                className={lang === "AR" ? "is-active" : ""}
                onClick={() => setLang("AR")}
                lang="ar"
              >
                AR
              </button>
            </div>
            <Link href="/contact" className="nm-nav__cta" data-cursor="VIEW">
              Contact Us
            </Link>
            <button
              className="nm-nav__burger"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
