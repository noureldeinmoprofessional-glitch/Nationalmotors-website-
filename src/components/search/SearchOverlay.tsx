"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
  Search, X, CornerDownLeft, ArrowUp, ArrowDown,
  Car, Layers, Building2, Wrench, Share2, MapPin, Newspaper, Briefcase, Mail, HelpCircle,
} from "lucide-react";
import { searchSite, QUICK_LINKS, type SearchCategory, type SearchEntry } from "@/lib/searchIndex";

const CATEGORY_ICON: Record<SearchCategory, React.ComponentType<{ strokeWidth?: number }>> = {
  Brands: Car,
  Sectors: Layers,
  Company: Building2,
  Support: Wrench,
  Network: Share2,
  Locations: MapPin,
  News: Newspaper,
  Careers: Briefcase,
  Contact: Mail,
  Help: HelpCircle,
};

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Wrap matched query tokens in the given text with <mark>. */
function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (!q) return <>{text}</>;
  const tokens = q.split(/\s+/).filter(Boolean);
  if (!tokens.length) return <>{text}</>;
  const re = new RegExp(`(${tokens.map(escapeRe).join("|")})`, "ig");
  const lower = new Set(tokens.map((t) => t.toLowerCase()));
  const parts = text.split(re);
  return (
    <>
      {parts.map((p, i) =>
        lower.has(p.toLowerCase()) ? (
          <mark key={i} className="nm-srch__hl">{p}</mark>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);

  const results = useMemo(() => searchSite(q), [q]);
  const typing = q.trim().length > 0;
  const list: SearchEntry[] = typing ? results : QUICK_LINKS;

  // Reset active row whenever the visible list changes.
  useEffect(() => { setActive(0); }, [q]);

  const go = useCallback(
    (entry: SearchEntry | undefined) => {
      if (!entry) return;
      onClose();
      router.push(entry.href);
    },
    [onClose, router]
  );

  // Open/close lifecycle: scroll lock, focus, reset query.
  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement | null;
    setQ("");
    setActive(0);

    const lenis = window.__lenis;
    if (lenis) lenis.stop();
    else document.documentElement.classList.add("nm-scroll-lock");

    const raf = requestAnimationFrame(() => inputRef.current?.focus());

    return () => {
      cancelAnimationFrame(raf);
      if (lenis) lenis.start();
      else document.documentElement.classList.remove("nm-scroll-lock");
      lastFocused.current?.focus?.();
    };
  }, [open]);

  // Keyboard navigation.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, list.length - 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
      else if (e.key === "Enter") { e.preventDefault(); go(list[active]); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, list, active, go, onClose]);

  // Keep the active row in view.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="nm-srch" role="dialog" aria-modal="true" aria-label="Search">
      <button className="nm-srch__scrim" aria-label="Close search" onClick={onClose} tabIndex={-1} />

      <div className="nm-srch__panel" role="document">
        <div className="nm-srch__field">
          <Search className="nm-srch__field-icon" strokeWidth={1.7} aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            className="nm-srch__input"
            placeholder="Search National Motors…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            role="combobox"
            aria-expanded="true"
            aria-controls="nm-srch-list"
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
          />
          {q && (
            <button className="nm-srch__clear" aria-label="Clear search" onClick={() => { setQ(""); inputRef.current?.focus(); }}>
              <X strokeWidth={1.7} aria-hidden="true" />
            </button>
          )}
          <button className="nm-srch__esc" onClick={onClose} aria-label="Close search">Esc</button>
        </div>

        <div className="nm-srch__results" ref={listRef} id="nm-srch-list" role="listbox">
          {!typing && (
            <p className="nm-srch__hint-label">Quick links</p>
          )}

          {list.length === 0 ? (
            <div className="nm-srch__empty">
              <p className="nm-srch__empty-title">No results for &ldquo;{q}&rdquo;</p>
              <p className="nm-srch__empty-sub">Try a brand, a vehicle, a sector, or &ldquo;service&rdquo;.</p>
            </div>
          ) : (
            <ul className="nm-srch__list">
              {list.map((entry, i) => {
                const Icon = CATEGORY_ICON[entry.category];
                return (
                  <li key={`${entry.href}-${entry.title}-${i}`}>
                    <button
                      type="button"
                      data-idx={i}
                      className={`nm-srch__row${i === active ? " is-active" : ""}`}
                      role="option"
                      aria-selected={i === active}
                      onMouseMove={() => setActive(i)}
                      onClick={() => go(entry)}
                    >
                      <span className="nm-srch__row-icon" aria-hidden="true"><Icon strokeWidth={1.6} /></span>
                      <span className="nm-srch__row-main">
                        <span className="nm-srch__row-title">
                          <Highlight text={entry.title} query={q} />
                        </span>
                        {entry.description && (
                          <span className="nm-srch__row-desc">{entry.description}</span>
                        )}
                      </span>
                      <span className="nm-srch__row-cat">{entry.category}</span>
                      <CornerDownLeft className="nm-srch__row-enter" strokeWidth={1.6} aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <footer className="nm-srch__foot" aria-hidden="true">
          <span className="nm-srch__foot-group">
            <kbd className="nm-srch__kbd"><ArrowUp strokeWidth={2} /></kbd>
            <kbd className="nm-srch__kbd"><ArrowDown strokeWidth={2} /></kbd>
            <span>Navigate</span>
          </span>
          <span className="nm-srch__foot-group">
            <kbd className="nm-srch__kbd"><CornerDownLeft strokeWidth={2} /></kbd>
            <span>Open</span>
          </span>
          <span className="nm-srch__foot-group">
            <kbd className="nm-srch__kbd nm-srch__kbd--wide">Esc</kbd>
            <span>Close</span>
          </span>
        </footer>
      </div>
    </div>,
    document.body
  );
}
