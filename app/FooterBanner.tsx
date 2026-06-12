"use client";

import { useRef, useEffect, useState } from "react";

const TEXT = "Let's build something";
// Repeat enough times so the strip always fills any viewport during the scroll loop
const REPEAT = 8;

export default function FooterBanner() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <section
      style={{
        width: "100%",
        background: "#282328",
        overflow: "hidden",
        cursor: "default",
        // 32px margin on sides, 32px bottom like the old footer
        margin: "0 0 0 0",
        borderRadius: "8px 8px 8px 8px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          willChange: "transform",
          // animationPlayState lets us pause on hover
          animation: `marquee 18s linear infinite`,
          animationPlayState: hovered ? "paused" : "running",
          padding: "48px 0",
        }}
      >
        {Array.from({ length: REPEAT }).map((_, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0,
            }}
          >
            <span
              style={{
                fontFamily: "'TWK Continental', serif",
                fontWeight: 400,
                fontSize: "clamp(56px, 7vw, 96px)",
                lineHeight: 1,
                letterSpacing: "-1.5px",
                color: "#EFE9E5",
                paddingRight: "0.55em",
              }}
            >
              {TEXT}
            </span>
            {/* Dot separator */}
            <span
              style={{
                display: "inline-block",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#EFE9E5",
                flexShrink: 0,
                marginRight: "0.55em",
                verticalAlign: "middle",
              }}
            />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
