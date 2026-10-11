"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, ChevronDown } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { NAV } from "@/lib/site";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lang, setLang] = useState<"EN" | "AR">("EN");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    let last = window.scrollY;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 40);
        // Past the hero (~1.5 screens): hide on scroll-down, show on scroll-up.
        const afterHero = window.innerHeight * 1.5;
        if (y < afterHero) setHidden(false);
        else if (y > last + 6) setHidden(true);
        else if (y < last - 6) setHidden(false);
        last = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Never keep the bar hidden while the mobile menu is open.
  const barHidden = hidden && !mobileOpen;

  return (
    <>
      <header className="nm-nav" data-scrolled={scrolled || undefined} data-hidden={barHidden || undefined}>
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
                  {item.disabled ? (
                    <button type="button" className="nm-nav__link nm-nav__link--trigger" aria-haspopup="true">
                      {item.label}
                      {item.children && (
                        <ChevronDown className="nm-nav__caret" aria-hidden="true" />
                      )}
                    </button>
                  ) : (
                    <Link href={item.href} className="nm-nav__link">
                      {item.label}
                      {item.children && (
                        <ChevronDown className="nm-nav__caret" aria-hidden="true" />
                      )}
                    </Link>
                  )}
                  {item.children && (
                    <div className="nm-nav__panel" role="menu">
                      {item.groups ? (
                        item.groups.map((g) => (
                          <div key={g.heading} className="nm-nav__group">
                            <p className="nm-nav__group-heading">{g.heading}</p>
                            <ul>
                              {g.links.map((c) => (
                                <li key={c.label} role="none">
                                  <Link href={c.href} role="menuitem" className="nm-nav__sublink">
                                    <span>{c.label}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))
                      ) : (
                        <ul>
                          {item.children.map((c) => (
                            <li key={c.label} role="none">
                              <Link href={c.href} role="menuitem" className="nm-nav__sublink">
                                <span>{c.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
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
