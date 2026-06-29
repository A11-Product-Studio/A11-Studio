"use client";

import CoverImage from "./CoverImage";

// ── PhotoCarousel ─────────────────────────────────────────────────────────────
// Two full-bleed rows of portrait photos that auto-scroll horizontally in
// opposite directions at different speeds (the "Photo Carousel — Mixed" Figma
// section on the Studio page). Pure-CSS marquee: each track holds the photos
// twice and translates by -50%, so the loop is seamless regardless of count.
//
// Reduced motion: the global backstop in globals.css freezes infinite CSS
// animations (iteration-count:1 at 0.01ms), which would leave a track shifted
// mid-loop. We override that here — under `prefers-reduced-motion` the tracks
// don't translate and the rows become horizontally scrollable instead.

const ROW_ONE = Array.from(
  { length: 17 },
  (_, i) => `/assets/studio-photo-r1-${String(i + 1).padStart(2, "0")}.jpg`,
);
const ROW_TWO = Array.from(
  { length: 16 },
  (_, i) => `/assets/studio-photo-r2-${String(i + 1).padStart(2, "0")}.jpg`,
);

// Photos sit at 3:4 portrait. `sizes` matches the rendered cell width (height is
// the driver via clamp; width ≈ 0.75 × height), keeping srcset selection tight.
const CELL_SIZES = "(max-width: 768px) 38vw, 18vw";

function Row({
  photos,
  durationSec,
  reverse = false,
}: {
  photos: string[];
  durationSec: number;
  reverse?: boolean;
}) {
  // Duplicate once for the seamless -50% loop. The second copy is decorative
  // (the originals already carry the region's alt context) and cache-hits the
  // same URLs, so it costs no extra network.
  const loop = [...photos, ...photos];
  return (
    <div className="pc-row">
      <ul
        className="pc-track"
        style={{
          animationDuration: `${durationSec}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {loop.map((src, i) => (
          <li className="pc-cell" key={i}>
            <CoverImage src={src} alt="" sizes={CELL_SIZES} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PhotoCarousel() {
  return (
    <section
      className="pc-root"
      aria-label="Photos from life around the A11 studio"
    >
      {/* Row 1 scrolls left; Row 2 scrolls right at a different pace. */}
      <Row photos={ROW_ONE} durationSec={104} />
      <Row photos={ROW_TWO} durationSec={80} reverse />

      <style>{`
        .pc-root {
          /* Full-bleed: the parent <main> is edge-to-edge and .bleed-root clips
             any sub-pixel horizontal overflow. */
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
          overflow: hidden;
        }
        .pc-row {
          overflow: hidden;
        }
        .pc-track {
          display: flex;
          gap: 16px;
          width: max-content;
          margin: 0;
          padding: 0;
          list-style: none;
          /* GPU-composited, steady transform — no hover pause. translate3d +
             backface-visibility keep it on its own layer so the scroll stays
             smooth (no per-frame repaint or subpixel jitter). */
          will-change: transform;
          backface-visibility: hidden;
          animation-name: pc-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .pc-cell {
          position: relative;       /* CoverImage uses fill → needs positioned box */
          flex: 0 0 auto;
          height: clamp(180px, 22vw, 320px);
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background: #444;          /* matches the Figma section ground while loading */
        }
        @keyframes pc-scroll {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        /* Reduced motion: don't translate; let people scroll the rows by hand.
           Overrides the global *{animation-iteration-count:1} backstop, which
           would otherwise strand a track at the -50% midpoint. */
        @media (prefers-reduced-motion: reduce) {
          .pc-track {
            animation: none !important;
            transform: none !important;
          }
          .pc-row {
            overflow-x: auto;
            scrollbar-width: none;
          }
          .pc-row::-webkit-scrollbar { display: none; }
        }
      `}</style>
    </section>
  );
}
