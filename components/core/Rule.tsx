import React from "react";

export interface RuleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Uppercase mono label sitting on the line. */
  label?: string;
  /** Section number, e.g. "01". Rendered in blue. */
  number?: string | number;
  /** @default "hair" */
  weight?: "hair" | "strong" | "accent";
  /** @default "left" */
  align?: "left" | "center" | "between";
  /** Use on dark surfaces. @default "default" */
  tone?: "default" | "onDark";
  style?: React.CSSProperties;
}

/**
 * Rule — the Miesian hairline. A structural divider that can carry a
 * mono label and/or a section number sitting on the line. The core
 * unit of the system's grid language.
 */
export function Rule({
  label,
  number,
  weight = "hair",
  align = "left",
  tone = "default",
  style = {},
  ...props
}: RuleProps) {
  const lineColor =
    weight === "accent"
      ? "var(--accent)"
      : weight === "strong"
        ? tone === "onDark"
          ? "var(--rule-on-dark)"
          : "var(--rule-strong)"
        : tone === "onDark"
          ? "var(--rule-on-dark)"
          : "var(--rule)";
  const lineH = weight === "accent" || weight === "strong" ? 2 : 1;

  const labelColor = tone === "onDark" ? "var(--neutral-400)" : "var(--text-muted)";
  const numberColor = "var(--accent)";

  const line = <span style={{ flex: 1, height: lineH, background: lineColor }} />;

  const labelEl = (label || number != null) && (
    <span style={{ display: "inline-flex", alignItems: "baseline", gap: 10, flex: "none" }}>
      {number != null && (
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: numberColor }}>
          {number}
        </span>
      )}
      {label && (
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: labelColor }}>
          {label}
        </span>
      )}
    </span>
  );

  if (!labelEl) {
    return <hr style={{ border: "none", height: lineH, background: lineColor, margin: 0, ...style }} {...(props as React.HTMLAttributes<HTMLHRElement>)} />;
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, width: "100%", ...style }} {...props}>
      {align === "between" ? (
        <>
          {labelEl}
          {line}
        </>
      ) : align === "center" ? (
        <>
          {line}
          {labelEl}
          {line}
        </>
      ) : (
        <>
          {labelEl}
          {line}
        </>
      )}
    </div>
  );
}
