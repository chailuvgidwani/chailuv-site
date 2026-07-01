"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/core/Button";
import { NAV } from "./nav";

function Monogram() {
  const fg = "var(--ink-900)";
  return (
    <Link
      href="/"
      aria-label="Chailuv Gidwani — home"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        textDecoration: "none",
      }}
    >
      <span
        style={{
          width: 38,
          height: 38,
          border: `1.5px solid ${fg}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 17,
          letterSpacing: "-0.04em",
          color: fg,
          position: "relative",
        }}
      >
        CG
        <span style={{ position: "absolute", bottom: -1.5, left: 8, width: 12, height: 2.5, background: "var(--gold-500)" }} />
      </span>
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.05, textAlign: "left" }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em", color: fg }}>
          Chailuv Gidwani
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.02em", color: "var(--text-muted)" }}>
          Chay-love Gid-wah-knee
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  React.useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: scrolled ? "color-mix(in srgb, var(--egg-100) 86%, transparent)" : "var(--egg-100)",
        backdropFilter: scrolled ? "blur(10px) saturate(1.1)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(10px) saturate(1.1)" : "none",
        borderBottom: `1px solid ${scrolled ? "var(--rule)" : "transparent"}`,
        transition: "background var(--dur-base) var(--ease-precise), border-color var(--dur-base) var(--ease-precise)",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "16px clamp(20px, 5vw, 56px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <Monogram />

        {/* Desktop nav */}
        <nav className="cg-nav-desktop" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {NAV.map((n) => {
            const active = isActive(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className="cg-nav-link"
                style={{
                  position: "relative",
                  textDecoration: "none",
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: active ? "var(--ink-900)" : "var(--text-muted)",
                  padding: "8px 12px",
                  transition: "color var(--dur-fast) var(--ease-precise)",
                }}
              >
                {n.label}
                <span
                  style={{
                    position: "absolute",
                    left: 12,
                    right: 12,
                    bottom: 4,
                    height: 2,
                    background: "var(--gold-500)",
                    transform: active ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform var(--dur-base) var(--ease-out)",
                  }}
                />
              </Link>
            );
          })}
          <span style={{ width: 1, height: 20, background: "var(--rule)", margin: "0 8px" }} />
          <Button as={Link} href="/about#contact" size="sm">
            Get in touch
          </Button>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="cg-nav-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            display: "none",
            background: "none",
            border: "1px solid var(--rule-strong)",
            borderRadius: "var(--radius-2)",
            width: 42,
            height: 42,
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
            fontSize: 18,
            color: "var(--ink-900)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {menuOpen ? "✕" : "≡"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav
          className="cg-nav-mobile"
          style={{
            display: "none",
            flexDirection: "column",
            gap: 2,
            padding: "8px clamp(20px, 5vw, 56px) 20px",
            borderTop: "1px solid var(--rule)",
          }}
        >
          {NAV.map((n) => {
            const active = isActive(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                style={{
                  textDecoration: "none",
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: active ? "var(--ink-900)" : "var(--text-muted)",
                  padding: "12px 0",
                  borderBottom: "1px solid var(--rule-faint)",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 2,
                    background: active ? "var(--gold-500)" : "transparent",
                    display: "inline-block",
                  }}
                />
                {n.label}
              </Link>
            );
          })}
          <div style={{ marginTop: 14 }}>
            <Button as={Link} href="/about#contact" size="md" full>
              Get in touch
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
