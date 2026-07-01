"use client";

import React from "react";
import { SectionLabel } from "@/components/core/SectionLabel";
import { Tag } from "@/components/core/Tag";
import { PhotoFrame } from "@/components/content/PhotoFrame";
import { Reveal } from "@/components/content/Reveal";
import { CG_PLATES, type Plate } from "@/lib/data";

const WRAP: React.CSSProperties = {
  maxWidth: 1320,
  margin: "0 auto",
  padding: "0 clamp(20px, 5vw, 56px)",
};

const FILTERS = ["all", "field", "chicago", "portrait"] as const;
type Filter = (typeof FILTERS)[number];

function ctrlStyle(pos: React.CSSProperties): React.CSSProperties {
  return {
    position: "absolute",
    ...pos,
    zIndex: 1,
    width: 44,
    height: 44,
    borderRadius: "var(--radius-2)",
    background: "color-mix(in srgb, var(--egg-50) 12%, transparent)",
    border: "1px solid var(--rule-on-dark)",
    color: "var(--egg-50)",
    fontFamily: "var(--font-mono)",
    fontSize: 16,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
}

function Lightbox({
  plate,
  onClose,
  onPrev,
  onNext,
}: {
  plate: Plate | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  // Lock body scroll while the lightbox is open.
  React.useEffect(() => {
    if (!plate) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [plate]);

  if (!plate) return null;
  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${plate.caption} — enlarged`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1100,
        background: "color-mix(in srgb, var(--ink-900) 88%, transparent)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(20px, 5vw, 72px)",
        animation: "cg-reveal-fade var(--dur-base) var(--ease-out)",
      }}
    >
      <button aria-label="Close" onClick={(e) => { e.stopPropagation(); onClose(); }} style={ctrlStyle({ top: 24, right: 24 })}>✕</button>
      <button aria-label="Previous" onClick={(e) => { e.stopPropagation(); onPrev(); }} style={ctrlStyle({ left: 24, top: "50%", transform: "translateY(-50%)" })}>←</button>
      <button aria-label="Next" onClick={(e) => { e.stopPropagation(); onNext(); }} style={ctrlStyle({ right: 24, top: "50%", transform: "translateY(-50%)" })}>→</button>
      <figure onClick={(e) => e.stopPropagation()} style={{ margin: 0, display: "flex", flexDirection: "column", gap: 16, maxHeight: "100%", alignItems: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={plate.src} alt={plate.caption} style={{ maxWidth: "100%", maxHeight: "78vh", objectFit: "contain", boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6)" }} />
        <figcaption style={{ display: "flex", gap: 14, alignItems: "baseline", fontFamily: "var(--font-mono)", color: "var(--egg-100)", flexWrap: "wrap", justifyContent: "center" }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "var(--blue-300)" }}>FIG.{plate.figure}</span>
          <span style={{ fontSize: 14 }}>{plate.caption}</span>
          <span style={{ fontSize: 12, color: "var(--neutral-400)" }}>· {plate.meta}</span>
        </figcaption>
      </figure>
    </div>
  );
}

export function GalleryView() {
  const [filter, setFilter] = React.useState<Filter>("all");
  const [idx, setIdx] = React.useState<number | null>(null);

  const plates = React.useMemo(
    () => (filter === "all" ? CG_PLATES : CG_PLATES.filter((p) => p.category === filter)),
    [filter]
  );

  // Reset any open lightbox when the filtered set changes.
  React.useEffect(() => {
    setIdx(null);
  }, [filter]);

  const open = idx != null ? plates[idx] : null;

  return (
    <div className="cg-view">
      <section style={{ ...WRAP, paddingTop: "clamp(48px, 7vw, 96px)", paddingBottom: "clamp(24px, 4vw, 44px)" }}>
        <Reveal>
          <SectionLabel number="02">Photographs</SectionLabel>
        </Reveal>
        <Reveal delay={80}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.4rem, 5vw, 4rem)", letterSpacing: "-0.035em", lineHeight: 1, margin: "22px 0 0", maxWidth: "15ch" }}>
            The mornings that make the margins.
          </h1>
        </Reveal>
        <Reveal delay={140}>
          <div style={{ display: "flex", gap: 10, marginTop: 28, flexWrap: "wrap" }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                <Tag tone={filter === f ? "blue" : "neutral"} variant={filter === f ? "solid" : "outline"}>
                  {f}
                </Tag>
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      <section style={{ ...WRAP, paddingBottom: "clamp(56px, 8vw, 104px)" }}>
        <div style={{ columns: "4 240px", columnGap: 16 }}>
          {plates.map((p, i) => (
            <div key={p.figure} style={{ breakInside: "avoid", marginBottom: 16 }}>
              <Reveal delay={(i % 4) * 70}>
                <div onClick={() => setIdx(i)} style={{ cursor: "zoom-in" }}>
                  <PhotoFrame src={p.src} alt={p.caption} ratio={p.ratio} figure={p.figure} caption={p.caption} meta={p.meta} zoom />
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <Lightbox
        plate={open}
        onClose={() => setIdx(null)}
        onPrev={() => setIdx((v) => (v == null ? v : (v + plates.length - 1) % plates.length))}
        onNext={() => setIdx((v) => (v == null ? v : (v + 1) % plates.length))}
      />
    </div>
  );
}
