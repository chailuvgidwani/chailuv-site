"use client";

import React from "react";
import Link from "next/link";
import { SectionLabel } from "@/components/core/SectionLabel";
import { Tag } from "@/components/core/Tag";
import { Button } from "@/components/core/Button";
import { StatBlock } from "@/components/content/StatBlock";
import { Reveal } from "@/components/content/Reveal";
import { CG_WORK, type WorkItem } from "@/lib/data";

const WRAP: React.CSSProperties = {
  maxWidth: 1320,
  margin: "0 auto",
  padding: "0 clamp(20px, 5vw, 56px)",
};

function CaseStudy({ w, flip }: { w: WorkItem; flip: boolean }) {
  return (
    <article style={{ paddingTop: "clamp(40px, 6vw, 80px)", paddingBottom: "clamp(40px, 6vw, 80px)", borderTop: "1px solid var(--rule)" }}>
      <div
        className="cg-collapse cg-case"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(28px, 5vw, 64px)", alignItems: "center", direction: flip ? "rtl" : "ltr" }}
      >
        <Reveal style={{ direction: "ltr" }}>
          <div style={{ position: "relative", aspectRatio: "1 / 1", overflow: "hidden", borderRadius: "var(--radius-2)", background: "var(--color-bg)", boxShadow: "inset 0 0 0 1px var(--rule-strong)" }}>
            {/* District map, drawn in the brand palette (square source). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={w.img} alt={`${w.title} — district map`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <span style={{ position: "absolute", top: 14, left: 14, fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", color: "var(--egg-50)", background: "var(--accent)", padding: "6px 10px" }}>{w.no}</span>
          </div>
        </Reveal>
        <Reveal delay={100} style={{ direction: "ltr" }}>
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
              {w.tags.map((t) => (
                <Tag key={t} tone="neutral" variant="outline" size="sm">
                  {t}
                </Tag>
              ))}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>{w.role} · {w.place}</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.8rem, 3.4vw, 2.9rem)", letterSpacing: "-0.028em", lineHeight: 1.02 }}>{w.title}</h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", lineHeight: 1.6, color: "var(--text-secondary)", margin: "18px 0 0", maxWidth: "46ch" }}>{w.blurb}</p>
            <div className="cg-stats" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 22, marginTop: 32 }}>
              {w.stats.map((s, i) => (
                <StatBlock key={i} value={s.value} unit={s.unit} label={s.label} delta={s.delta} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </article>
  );
}

export function WorkView() {
  const work = CG_WORK;
  return (
    <div className="cg-view">
      <section style={{ ...WRAP, paddingTop: "clamp(48px, 7vw, 96px)", paddingBottom: "clamp(8px, 2vw, 24px)" }}>
        <Reveal>
          <SectionLabel number="01">Selected Work</SectionLabel>
        </Reveal>
        <Reveal delay={80}>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.4rem, 5vw, 4rem)", letterSpacing: "-0.035em", lineHeight: 1, margin: "22px 0 0", maxWidth: "16ch" }}>
            Finance operations, call time, and the dollars that decide races.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.15rem", lineHeight: 1.6, color: "var(--text-secondary)", maxWidth: "52ch", margin: "24px 0 0" }}>
            The campaigns whose finance operations I&apos;ve built and run — congressional and state, in California and Chicago.
          </p>
        </Reveal>
      </section>
      <section style={{ ...WRAP, marginTop: "clamp(32px, 5vw, 56px)" }}>
        {work.map((w, i) => (
          <CaseStudy key={w.id} w={w} flip={i % 2 === 1} />
        ))}
      </section>
      <section style={{ ...WRAP, paddingTop: "clamp(48px, 7vw, 88px)", paddingBottom: "clamp(48px, 7vw, 88px)" }}>
        <Reveal>
          <div style={{ background: "var(--egg-200)", borderRadius: "var(--radius-3)", padding: "clamp(28px, 5vw, 56px)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", letterSpacing: "-0.02em" }}>Building a finance team?</h3>
              <p style={{ fontFamily: "var(--font-sans)", color: "var(--text-secondary)", marginTop: 8, fontSize: "1.05rem" }}>Let&apos;s connect and talk about it.</p>
            </div>
            <Button as={Link} href="/about#contact" size="lg">
              Start a conversation
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
