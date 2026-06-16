"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// ─── Preloader ──────────────────────────────────────────────────────────────
// Figma node 1788:27115 ("Preloder"): a white screen with the centered A11 mark
// (70×77). Five frames each give the mark a different fill — solid, charcoal,
// gradient, sandstone, metallic — exported with their actual fills as PNGs.
//
// The mark hard-cuts between fills (instant swap, no crossfade), resolves on the
// solid brand mark, then the whole overlay blurs + fades out to reveal the page.

const LOGOS = [
  "/assets/preload-logo-1.png", // 001 — solid #282328
  "/assets/preload-logo-2.png", // 002 — charcoal texture
  "/assets/preload-logo-3.png", // 003 — blue→purple→orange gradient
  "/assets/preload-logo-4.png", // 004 — sandstone
  "/assets/preload-logo-5.png", // 005 — metallic
];

// Cycle through the textured fills, resolve on the solid mark (index 0).
const SEQUENCE = [1, 2, 3, 4, 0];
const STEP_MS = 160; // hold per fill — the swap between them is instant
const HOLD_MS = 380; // pause on the final mark before the blur exit

export default function Preloader() {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  // Advance through the sequence, then settle and trigger the exit.
  // Reduced motion: skip the flicker entirely, just hold the solid mark briefly.
  useEffect(() => {
    if (!reduceMotion && step < SEQUENCE.length - 1) {
      const t = setTimeout(() => setStep((s) => s + 1), STEP_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setDone(true), HOLD_MS);
    return () => clearTimeout(t);
  }, [step, reduceMotion]);

  // Lock scroll while the overlay is up.
  useEffect(() => {
    if (done) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [done]);

  // Reduced motion shows only the resolved solid mark (index 0).
  const current = reduceMotion ? 0 : SEQUENCE[step];

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          aria-hidden
          initial={{ opacity: 1, filter: "blur(0px)" }}
          // Reduced motion: plain, quick opacity fade — no blur.
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, filter: "blur(20px)" }
          }
          transition={{
            duration: reduceMotion ? 0.3 : 0.7,
            ease: [0.2, 0, 0, 1],
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            willChange: "opacity, filter",
          }}
        >
          {/* Mark — Figma aspect ratio 70:77 */}
          <div style={{ position: "relative", width: 80, height: 88 }}>
            {LOGOS.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  opacity: i === current ? 1 : 0, // instant hard cut
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
