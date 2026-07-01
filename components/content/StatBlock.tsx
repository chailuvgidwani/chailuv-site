import React from "react";

export interface StatBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The figure, e.g. "+18.4" or "212k". */
  value: React.ReactNode;
  /** Mono uppercase caption under the figure. */
  label: React.ReactNode;
  /** Signed delta — "+" green, "-" clay, else blue. */
  delta?: string;
  unit?: string;
  /** @default "default" */
  tone?: "default" | "onDark";
  /** @default "left" */
  align?: "left" | "center";
  style?: React.CSSProperties;
}

/**
 * StatBlock — a campaign metric. Big grotesk figure, mono label,
 * optional signed delta. Sits on a hairline-topped column so a row of
 * them reads as a measured field.
 */
export function StatBlock({
  value,
  label,
  delta,
  unit,
  tone = "default",
  align = "left",
  style = {},
  ...props
}: StatBlockProps) {
  const fg = tone === "onDark" ? "var(--egg-50)" : "var(--text-primary)";
  const sub = tone === "onDark" ? "var(--neutral-400)" : "var(--text-muted)";
  const ruleColor = tone === "onDark" ? "var(--rule-on-dark)" : "var(--rule-strong)";
  const positive = typeof delta === "string" && delta.trim().startsWith("+");
  const negative = typeof delta === "string" && delta.trim().startsWith("-");
  const deltaColor = positive ? "var(--green-600)" : negative ? "var(--danger-600)" : "var(--accent)";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        textAlign: align,
        paddingTop: 14,
        borderTop: `2px solid ${ruleColor}`,
        ...style,
      }}
      {...props}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, justifyContent: align === "center" ? "center" : "flex-start" }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", letterSpacing: "-0.03em", lineHeight: 0.95, color: fg }}>
          {value}
        </span>
        {unit && (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: sub, letterSpacing: "0.04em" }}>{unit}</span>
        )}
        {delta && (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, color: deltaColor, letterSpacing: "0.02em" }}>{delta}</span>
        )}
      </div>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: sub, maxWidth: "28ch" }}>
        {label}
      </span>
    </div>
  );
}
