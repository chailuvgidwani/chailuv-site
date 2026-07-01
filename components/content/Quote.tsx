import React from "react";

export interface QuoteProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  /** Attribution name. */
  cite?: string;
  /** Attribution role / source. */
  role?: string;
  /** @default "default" */
  tone?: "default" | "onDark" | "accent";
  style?: React.CSSProperties;
}

/**
 * Quote — a pullquote. Grotesk medium at display scale, opened by a
 * short gold rule rather than quotation marks. Optional attribution
 * with role. Restrained: no italics, no big curly glyphs.
 */
export function Quote({ children, cite, role, tone = "default", style = {}, ...props }: QuoteProps) {
  const palettes = {
    default: { fg: "var(--text-primary)", sub: "var(--text-muted)", mark: "var(--highlight)" },
    onDark: { fg: "var(--egg-50)", sub: "var(--neutral-400)", mark: "var(--blue-300)" },
    accent: { fg: "var(--egg-50)", sub: "var(--blue-100)", mark: "var(--egg-50)" },
  } as const;
  const p = palettes[tone] || palettes.default;

  return (
    <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: 22, maxWidth: "26ch", ...style }} {...props}>
      <span style={{ width: 40, height: 3, background: p.mark }} />
      <blockquote
        style={{
          margin: 0,
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
          lineHeight: 1.28,
          letterSpacing: "-0.015em",
          color: p.fg,
        }}
      >
        {children}
      </blockquote>
      {(cite || role) && (
        <figcaption style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.06em", color: p.sub }}>
          {cite && <span style={{ color: p.fg, fontWeight: 500 }}>{cite}</span>}
          {cite && role && <span> · </span>}
          {role}
        </figcaption>
      )}
    </figure>
  );
}
