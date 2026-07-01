"use client";

import React from "react";

export interface PhotoFrameProps extends React.HTMLAttributes<HTMLElement> {
  src?: string;
  alt?: string;
  /** CSS aspect-ratio. @default "4 / 3" */
  ratio?: string;
  /** Plate number, e.g. "04". */
  figure?: string;
  /** Place / moment caption. */
  caption?: string;
  /** Camera metadata line. */
  meta?: string;
  /** Subtle scale-in on hover. @default false */
  zoom?: boolean;
  style?: React.CSSProperties;
}

/**
 * PhotoFrame — an image inside a hairline frame with a mono caption
 * carrying the "plate" metadata (figure no., place, camera). The
 * photography unit. Subtle scale on hover (off by default for grids).
 */
export function PhotoFrame({
  src,
  alt = "",
  ratio = "4 / 3",
  figure,
  caption,
  meta,
  zoom = false,
  style = {},
  ...props
}: PhotoFrameProps) {
  const onEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoom) return;
    const img = e.currentTarget.querySelector("img");
    if (img) img.style.transform = "scale(1.04)";
  };
  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector("img");
    if (img) img.style.transform = "scale(1)";
  };

  return (
    <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: 12, ...style }} {...props}>
      <div
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{
          position: "relative",
          aspectRatio: ratio,
          overflow: "hidden",
          background: "var(--neutral-200)",
          boxShadow: "inset 0 0 0 1px var(--rule-strong)",
          borderRadius: "var(--radius-1)",
        }}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform var(--dur-drift) var(--ease-out)",
            }}
          />
        ) : (
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            Plate {figure || ""}
          </span>
        )}
      </div>
      {(figure || caption || meta) && (
        <figcaption style={{ display: "flex", gap: 12, alignItems: "baseline", fontFamily: "var(--font-mono)" }}>
          {figure && (
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "var(--accent)", flex: "none" }}>
              FIG.{figure}
            </span>
          )}
          <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {caption && <span style={{ fontSize: 12.5, color: "var(--text-primary)", letterSpacing: "0.01em" }}>{caption}</span>}
            {meta && <span style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.04em" }}>{meta}</span>}
          </span>
        </figcaption>
      )}
    </figure>
  );
}
