"use client";

import React from "react";
import { SectionLabel } from "@/components/core/SectionLabel";
import { Rule } from "@/components/core/Rule";
import { Tag } from "@/components/core/Tag";
import { Quote } from "@/components/content/Quote";
import { Reveal } from "@/components/content/Reveal";
import { ContactForm } from "./ContactForm";
import { CG_PORTRAIT } from "@/lib/data";

const WRAP: React.CSSProperties = {
  maxWidth: 1320,
  margin: "0 auto",
  padding: "0 clamp(20px, 5vw, 56px)",
};

const TIMELINE = [
  { yr: "2026", role: "Finance Director, Ammar for Congress (CA-48)" },
  { yr: "2024", role: "Finance Director, Neva Parker for Assembly" },
  { yr: "2023", role: "Finance Director, Jessica Morse for Congress" },
  { yr: "2022", role: "Finance Associate, New Chicago Consulting" },
  { yr: "B.A.", role: "History, Hofstra University" },
];

export function AboutView() {
  return (
    <div className="cg-view">
      <section style={{ ...WRAP, paddingTop: "clamp(48px, 7vw, 96px)", paddingBottom: "clamp(32px, 5vw, 64px)" }}>
        <div
          className="cg-collapse"
          style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: "clamp(28px, 5vw, 72px)", alignItems: "center" }}
        >
          <Reveal>
            <div style={{ position: "relative", aspectRatio: "4 / 5", overflow: "hidden", borderRadius: "var(--radius-2)", boxShadow: "inset 0 0 0 1px var(--rule-strong)" }}>
              {/* Portrait — Marina City, Chicago. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CG_PORTRAIT} alt="Chailuv Gidwani in front of Marina City, Chicago" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <SectionLabel number="03">About</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.2rem, 4.4vw, 3.6rem)", letterSpacing: "-0.035em", lineHeight: 1.02, margin: "20px 0 0" }}>
                I raise the money, and I take the pictures.
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 16, maxWidth: "54ch" }}>
                <p style={{ fontSize: "1.15rem", lineHeight: 1.6, color: "var(--text-secondary)" }}>
                  I run finance operations for political campaigns — building call-time programs, owning budget and cashflow, and raising the money that keeps a race competitive. I&apos;ve directed finance for congressional and state races in California and worked some of the biggest campaigns in Chicago, where I&apos;m based.
                </p>
                <p style={{ fontSize: "1.15rem", lineHeight: 1.6, color: "var(--text-secondary)" }}>
                  The camera is the other half. I shoot when I travel — Paris and Reims, the California coast, a night out in the city — mostly in available light, mostly the ordinary spaces between the big moments.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div style={{ display: "flex", gap: 8, marginTop: 24, flexWrap: "wrap" }}>
                <Tag tone="blue">Finance</Tag>
                <Tag tone="neutral" variant="outline">Call time</Tag>
                <Tag tone="neutral" variant="outline">Budget</Tag>
                <Tag tone="gold" variant="soft">Photography</Tag>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section style={{ ...WRAP, paddingTop: "clamp(24px, 4vw, 48px)", paddingBottom: "clamp(40px, 6vw, 80px)" }}>
        <Reveal>
          <Rule number="—" label="Track record" />
        </Reveal>
        <div
          className="cg-collapse"
          style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "clamp(28px, 5vw, 64px)", alignItems: "start" }}
        >
          <div>
            {TIMELINE.map((t, i) => (
              <Reveal key={t.yr} delay={i * 50}>
                <div style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: 20, padding: "16px 0", borderTop: "1px solid var(--rule)", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, color: "var(--accent)", letterSpacing: "0.04em" }}>{t.yr}</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "1.1rem", color: "var(--text-primary)" }}>{t.role}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <div style={{ background: "var(--ink-900)", borderRadius: "var(--radius-3)", padding: "clamp(28px, 4vw, 44px)" }}>
              <Quote tone="onDark">
                Fundraising isn&apos;t the glamorous part of a campaign. It&apos;s the part that decides whether there&apos;s a campaign at all.
              </Quote>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ ...WRAP, paddingBottom: "clamp(56px, 8vw, 104px)" }}>
        <Reveal>
          <div
            className="cg-collapse"
            style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: "clamp(28px, 5vw, 64px)", alignItems: "start" }}
          >
            <div>
              <SectionLabel number="04">Get in touch</SectionLabel>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)", letterSpacing: "-0.028em", margin: "16px 0 0", lineHeight: 1.05 }}>
                Planning a race, or want a print?
              </h2>
              <p style={{ color: "var(--text-secondary)", marginTop: 14, fontSize: "1.05rem", lineHeight: 1.6, maxWidth: "30ch" }}>
                I take on a few campaigns each cycle and I&apos;m always glad to talk photographs.
              </p>
            </div>
            <ContactForm />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
