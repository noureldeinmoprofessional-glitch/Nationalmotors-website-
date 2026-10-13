"use client";

import Link from "next/link";
import { Phone, Mail, ArrowUpRight } from "lucide-react";
import { Facebook, Instagram, Linkedin, Youtube } from "@/components/ui/SocialIcons";
import { useReveal } from "@/lib/hooks";
import { CONTACT, FOOTER_NAV } from "@/lib/site";
import Logo from "@/components/ui/Logo";

const YEAR = 2026;

export default function Footer() {
  const colsRef = useReveal<HTMLDivElement>({ y: 30, stagger: 0.07, start: "top 88%" });

  return (
    <footer className="nm-footer" aria-label="Site footer">
      <div className="nm-shell">
        {/* Main */}
        <div ref={colsRef} className="nm-footer__main">
          <div className="nm-footer__brand" data-reveal>
            <Link href="/" aria-label="National Motors — home" className="nm-footer__logo">
              <Logo className="nm-footer__logo-svg" />
            </Link>
            <p className="nm-footer__tag">
              Automotive &amp; mobility solutions in Egypt — moving toward National
              Motors Group.
            </p>
            <div className="nm-footer__contact">
              <a href={`tel:${CONTACT.hotline}`} className="nm-footer__contact-item">
                <Phone strokeWidth={1.6} />
                <span>{CONTACT.hotline}</span>
              </a>
              <a href={`mailto:${CONTACT.email}`} className="nm-footer__contact-item">
                <Mail strokeWidth={1.6} />
                <span>{CONTACT.email}</span>
              </a>
            </div>
          </div>

          <nav className="nm-footer__cols" aria-label="Footer">
            {FOOTER_NAV.map((col) => (
              <div key={col.heading} className="nm-footer__col" data-reveal>
                <h3 className="nm-footer__heading">{col.heading}</h3>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="nm-footer__link">
                        <span>{l.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="nm-footer__col nm-footer__col--contact" data-reveal>
              <h3 className="nm-footer__heading">Contact</h3>
              <ul>
                <li><Link href="/contact" className="nm-footer__link"><span>Contact Us</span></Link></li>
                <li><a href={`tel:${CONTACT.hotline}`} className="nm-footer__link"><span>Hotline {CONTACT.hotline}</span></a></li>
                <li><a href={`mailto:${CONTACT.email}`} className="nm-footer__link"><span>Email Us</span></a></li>
              </ul>
              <Link href="/contact" className="nm-footer__contact-cta" data-cursor="VIEW">
                Get in touch <ArrowUpRight strokeWidth={1.6} />
              </Link>
            </div>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="nm-footer__bottom">
          <p className="nm-footer__copy">
            &copy; {YEAR} National Motors. All Rights Reserved.
          </p>
          <ul className="nm-footer__legal">
            <li><Link href="/legal/privacy">Privacy Policy</Link></li>
            <li><Link href="/legal/cookies">Cookie Policy</Link></li>
            <li><Link href="/legal/terms">Terms &amp; Conditions</Link></li>
          </ul>
          <div className="nm-footer__end">
            <div className="nm-footer__lang">
              <button className="is-active">English</button>
              <span aria-hidden="true">/</span>
              <button lang="ar">العربية</button>
            </div>
            <ul className="nm-footer__social">
              <li><a href={CONTACT.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook /></a></li>
              <li><a href={CONTACT.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram /></a></li>
              <li><a href={CONTACT.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin /></a></li>
              <li><a href={CONTACT.socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube /></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
