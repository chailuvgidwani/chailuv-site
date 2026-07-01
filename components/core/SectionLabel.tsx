import React from "react";

export interface SectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Section index — zero-padded to 2 digits automatically. */
  number?: string | number;
  children?: React.ReactNode;
  /** @default "default" */
  tone?: "default" | "onDark";
  style?: React.CSSProperties;
}

/**
 * SectionLabel — a numbered overline that opens a section. Mono number
 * in blue, grotesk eyebrow. The "01 — Selected Work" device that gives
 * the site its architectural, indexed feel.
 */
export function SectionLabel({
  number,
  children,
  tone = "default",
  style = {},
  ...props
}: SectionLabelProps) {
  const fg = tone === "onDark" ? "var(--egg-100)" : "var(--text-primary)";
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: 12,
        fontFamily: "var(--font-mono)",
        ...style,
      }}
      {...props}
    >
      {number != null && (
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", color: "var(--accent)" }}>
          {String(number).padStart(2, "0")}
        </span>
      )}
      <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: fg }}>
        {children}
      </span>
    </div>
  );
}
