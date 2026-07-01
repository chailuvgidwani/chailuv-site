"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/core/Button";
import { Rule } from "@/components/core/Rule";
import { NAV } from "./nav";

const CONTACT_EMAIL = "chailuvgidwani@gmail.com";
/* Social URLs are still placeholders — replace the hrefs below when ready. */
const ELSEWHERE: { label: string; href: string }[] = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Signal", href: "#" },
  { label: "Résumé (PDF)", href: "#" },
];

function InternalCol({ title }: { title: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--neutral-500)", marginBottom: 4 }}>
        {title}
      </span>
      {NAV.map((n) => (
        <Link
          key={n.href}
          href={n.href}
          style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--egg-100)", textDecoration: "none", width: "fit-content" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--blue-300)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--egg-100)")}
        >
          {n.label}
        </Link>
      ))}
    </div>
  );
}

function ExternalCol({ title }: { title: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--neutral-500)", marginBottom: 4 }}>
        {title}
      </span>
      {ELSEWHERE.map((l) => (
        <a
          key={l.label}
          href={l.href}
          style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--egg-100)", textDecoration: "none", width: "fit-content" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--blue-300)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--egg-100)")}
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <footer style={{ background: "var(--ink-900)", color: "var(--egg-100)", marginTop: 0 }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(48px, 7vw, 88px) clamp(20px, 5vw, 56px)" }}>
        <Rule tone="onDark" number="04" label="Colophon" />
        <div className="cg-footer-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 40, marginTop: 40, alignItems: "start" }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.025em", lineHeight: 1.05, color: "var(--egg-50)", maxWidth: "16ch" }}>
              Singapore born. Chicago raised.
            </h3>
            <div style={{ marginTop: 24 }}>
              <Button as="a" href={`mailto:${CONTACT_EMAIL}`} variant="primary">
                {CONTACT_EMAIL}
              </Button>
            </div>
          </div>
          <InternalCol title="Pages" />
          <ExternalCol title="Elsewhere" />
        </div>
        <div
          style={{
            marginTop: 56,
            paddingTop: 20,
            borderTop: "1px solid var(--rule-on-dark)",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.06em",
            color: "var(--neutral-400)",
          }}
        >
          <span>© 2026 Chailuv Gidwani · Chicago, Illinois</span>
          <span>Set in Schibsted Grotesk &amp; IBM Plex Mono</span>
        </div>
      </div>
    </footer>
  );
}
