"use client";

import React from "react";
import Link from "next/link";
import { SectionLabel } from "@/components/core/SectionLabel";
import { Rule } from "@/components/core/Rule";
import { Reveal } from "@/components/content/Reveal";
import { PhotoFrame } from "@/components/content/PhotoFrame";
import { CG_WORK, CG_PLATES, CG_PORTRAIT } from "@/lib/data";

const WRAP: React.CSSProperties = {
  maxWidth: 1320,
  margin: "0 auto",
  padding: "0 clamp(20px, 5vw, 56px)",
};

function Hero() {
  const imgRef = React.useRef<HTMLImageElement | null>(null);
  React.useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf: number | null = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        // Slow parallax — keep the drift small (<6%).
        const y = Math.min(window.scrollY, 700);
        if (imgRef.current) imgRef.current.style.transform = `translateY(${y * 0.06}px) scale(1.06)`;
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section style={{ ...WRAP, paddingTop: "clamp(44px, 7vw, 92px)", paddingBottom: "clamp(44px, 7vw, 92px)" }}>
      <div
        className="cg-collapse"
        style={{ display: "grid", gridTemplateColumns: "1fr 0.82fr", gap: "clamp(28px, 6vw, 80px)", alignItems: "center" }}
      >
        <div>
          <Reveal>
            <SectionLabel number="00">Chicago, Illinois</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.6rem, 6vw, 4.6rem)", lineHeight: 1.0, letterSpacing: "-0.035em", margin: "20px 0 0" }}>
              Chailuv Gidwani
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(1.05rem, 1.6vw, 1.3rem)", fontWeight: 500, lineHeight: 1.4, color: "var(--text-secondary)", margin: "20px 0 0", maxWidth: "34ch" }}>
              Campaign finance and photography.
            </p>
          </Reveal>
        </div>
        <Reveal delay={200} style={{ alignSelf: "stretch" }}>
          <div style={{ position: "relative", height: "100%", minHeight: 400, overflow: "hidden", borderRadius: "var(--radius-2)", boxShadow: "inset 0 0 0 1px var(--rule-strong)" }}>
            {/* PLACEHOLDER portrait — replace /public/placeholders/portrait.svg with a real B&W photograph. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={CG_PORTRAIT}
              alt="Chailuv Gidwani in front of Marina City, Chicago"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", filter: "grayscale(1) contrast(1.03)", transform: "scale(1.06)", willChange: "transform" }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatBand() {
  const stats = [
    { value: "$2.2M+", label: "Raised for a single U.S. House race" },
    { value: "3", label: "Campaign finance operations directed" },
    { value: "$3M+", label: "Raised on Chicago finance teams" },
    { value: "2Q", label: "Outraising a sitting incumbent" },
  ];
  return (
    <section style={{ background: "var(--accent)", color: "var(--egg-50)" }}>
      <div style={{ ...WRAP, paddingTop: "clamp(40px, 5vw, 64px)", paddingBottom: "clamp(40px, 5vw, 64px)" }}>
        <div
          className="cg-collapse-4"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "clamp(20px, 3vw, 44px)" }}
        >
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 90}>
              <div style={{ borderTop: "2px solid var(--rule-on-dark)", paddingTop: 14 }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2rem, 3.6vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 0.95 }}>{s.value}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--blue-100)", marginTop: 10, maxWidth: "22ch" }}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SelectedWork() {
  const work = CG_WORK.slice(0, 3);
  return (
    <section style={{ ...WRAP, paddingTop: "clamp(56px, 8vw, 104px)", paddingBottom: "clamp(24px, 4vw, 48px)" }}>
      <Reveal>
        <Rule number="01" label="Selected Work" />
      </Reveal>
      <div style={{ marginTop: 40, display: "flex", flexDirection: "column" }}>
        {work.map((w, i) => (
          <Reveal key={w.id} delay={i * 60}>
            <Link
              href="/work"
              style={{
                width: "100%",
                textAlign: "left",
                textDecoration: "none",
                padding: "26px 0",
                borderTop: i === 0 ? "none" : "1px solid var(--rule)",
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: "clamp(16px, 3vw, 48px)",
                alignItems: "center",
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget.querySelector<HTMLElement>("[data-title]");
                if (t) t.style.color = "var(--accent)";
                const a = e.currentTarget.querySelector<HTMLElement>("[data-arrow]");
                if (a) a.style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget.querySelector<HTMLElement>("[data-title]");
                if (t) t.style.color = "var(--ink-900)";
                const a = e.currentTarget.querySelector<HTMLElement>("[data-arrow]");
                if (a) a.style.transform = "none";
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", color: "var(--accent)" }}>{w.no}</span>
              <span style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span data-title style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.4rem, 2.6vw, 2.1rem)", letterSpacing: "-0.02em", color: "var(--ink-900)", transition: "color var(--dur-base) var(--ease-out)" }}>{w.title}</span>
                <span style={{ display: "flex", gap: 14, alignItems: "baseline", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", color: "var(--text-secondary)" }}>{w.role}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>· {w.place}</span>
                </span>
              </span>
              <span data-arrow style={{ fontFamily: "var(--font-mono)", fontSize: 20, color: "var(--text-muted)", transition: "transform var(--dur-base) var(--ease-out)", justifySelf: "end" }}>→</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PhotoStrip() {
  const plates = CG_PLATES.slice(0, 4);
  return (
    <section style={{ ...WRAP, paddingTop: "clamp(40px, 6vw, 80px)", paddingBottom: "clamp(56px, 8vw, 104px)" }}>
      <Reveal>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, marginBottom: 32 }}>
          <div style={{ maxWidth: "26ch" }}>
            <SectionLabel number="02">Elsewhere</SectionLabel>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.8rem, 3.4vw, 2.8rem)", letterSpacing: "-0.025em", margin: "16px 0 0" }}>Photographs</h2>
          </div>
          <Link
            href="/photographs"
            style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 7, color: "var(--text-link)", fontFamily: "var(--font-sans)", fontWeight: 500, textDecoration: "none", paddingBottom: 2, whiteSpace: "nowrap" }}
            onMouseEnter={(e) => {
              const u = e.currentTarget.querySelector<HTMLElement>("[data-u]");
              if (u) u.style.transform = "scaleX(1)";
              const a = e.currentTarget.querySelector<HTMLElement>("[data-arrow]");
              if (a) a.style.transform = "translateX(3px)";
            }}
            onMouseLeave={(e) => {
              const u = e.currentTarget.querySelector<HTMLElement>("[data-u]");
              if (u) u.style.transform = "scaleX(0)";
              const a = e.currentTarget.querySelector<HTMLElement>("[data-arrow]");
              if (a) a.style.transform = "none";
            }}
          >
            <span style={{ position: "relative" }}>
              All plates
              <span data-u style={{ position: "absolute", left: 0, right: 0, bottom: -2, height: 1.5, background: "var(--highlight)", transform: "scaleX(0)", transformOrigin: "left", transition: "transform var(--dur-base) var(--ease-out)" }} />
            </span>
            <span data-arrow style={{ display: "inline-block", transition: "transform var(--dur-base) var(--ease-out)", fontFamily: "var(--font-mono)" }}>→</span>
          </Link>
        </div>
      </Reveal>
      <div
        className="cg-collapse-4"
        style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}
      >
        {plates.map((p, i) => (
          <Reveal key={p.figure} delay={i * 80}>
            <PhotoFrame src={p.src} alt={p.caption} ratio="4 / 5" figure={p.figure} caption={p.caption} zoom />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="cg-view">
      <Hero />
      <StatBand />
      <SelectedWork />
      <PhotoStrip />
    </div>
  );
}
