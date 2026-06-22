import type { Metadata } from "next";
import NavMenu from "../NavMenu";
import PageEnter from "../PageEnter";

export const metadata: Metadata = {
  title: "Let's Talk",
  description: "Got an idea we can help with? Want to join our team? Reach out to A11 Product Studio.",
  alternates: { canonical: "/contact" },
};

const BG = "#302424";
const FONT = "var(--font-system), sans-serif";

// ── Form field: label + underline-only input ──────────────────────────────────
function FormField({
  label,
  placeholder,
  type = "text",
  multiline = false,
  style,
}: {
  label: string;
  placeholder: string;
  type?: string;
  multiline?: boolean;
  style?: React.CSSProperties;
}) {
  const base: React.CSSProperties = {
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(255,255,255,0.4)",
    color: "#ffffff",
    fontFamily: FONT,
    fontWeight: 400,
    fontSize: "clamp(14px, 1.3vw, 16px)",
    lineHeight: 1.4,
    width: "100%",
    padding: "0 0 8px",
    outline: "none",
    display: "block",
  };

  return (
    <div style={style}>
      <label
        style={{
          display: "block",
          fontFamily: FONT,
          fontWeight: 400,
          fontSize: 12,
          lineHeight: "19px",
          letterSpacing: "-0.137px",
          color: "#ffffff",
          marginBottom: 8,
        }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          placeholder={placeholder}
          rows={4}
          style={{
            ...base,
            resize: "none",
            height: 89,
            borderBottom: "1px solid rgba(255,255,255,0.4)",
          }}
        />
      ) : (
        <input type={type} placeholder={placeholder} style={base} />
      )}
    </div>
  );
}

// ── Submit button — white bg / dark text (inverse of CtaButton) ───────────────
function SendButton() {
  return (
    <button
      type="submit"
      className="hover:opacity-90 active:scale-95 transition-[opacity,scale] duration-150"
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 137,
        height: 44,
        background: "#ffffff",
        border: "none",
        borderRadius: 0,
        fontFamily: FONT,
        fontWeight: 500,
        fontSize: 15,
        lineHeight: 0.95,
        letterSpacing: "-0.3px",
        color: "#282328",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      Send message
      {/* Corner dot — mirrors CtaButton's dot */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 4,
          height: 4,
          borderRadius: 1,
          background: "#282328",
          pointerEvents: "none",
        }}
      />
    </button>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <>
    {/* eslint-disable-next-line react/no-unknown-property */}
    <style>{`
      /* Prevent the fixed NavMenu header from exposing the white body bg on wide viewports */
      body { overflow-x: hidden; background: #302424; }

      .contact-form input::placeholder,
      .contact-form textarea::placeholder { color: rgba(255,255,255,0.5); }
      .contact-form input, .contact-form textarea { caret-color: #ffffff; }

      /*
       * Decorative card shape — built from the Figma vector (263:11868).
       * The card is a plain rectangle. Two pseudo-elements painted in the page
       * background (#302424) create the fixed-size corner cuts so the shape
       * NEVER deforms when the container resizes.
       *
       * Screen-space polygon (652×618, after 90° CCW rotation from Figma local):
       *   Bottom-right cut: (652,496) → (565,618) → (652,618) = 87×122px triangle
       *   Bottom-left cut:  (0,595) → (264,595) → (326,618) → (0,618) = trapezoid
       */
      /* Mobile card img: hidden by default, shown inside the mobile media query */
      .cp-card-mobile { display: none; }

      .decorative-card {
        border-radius: 10px;
        overflow: hidden; /* clips pseudo-elements to card bounds; prevents shape bleed */
      }
      .decorative-card::after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 87px;
        height: 122px;
        background: #302424;
        /* Triangle: covers (right-87,bottom-122) to (right,bottom) */
        clip-path: polygon(100% 0%, 0% 100%, 100% 100%);
        pointer-events: none;
      }
      .decorative-card::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 326px;
        height: 23px;
        background: #302424;
        /* Trapezoid: (0,0)→(81%,0)→(100%,100%)→(0,100%) = 264px wide at top, 326px at bottom */
        clip-path: polygon(0% 0%, 80.97% 0%, 100% 100%, 0% 100%);
        pointer-events: none;
      }

      /* ── Mobile layout (≤767px) ─────────────────────────────────────────────
       * Figma mobile frame: 393×1410px (scrollable).
       * Single column, 20px side padding, elements in normal document flow.
       * Vertical rhythm derived from Figma mobile y-positions.
       */
      @media (max-width: 767px) {
        /* Root: release fixed 100vh, become scrollable */
        .cp-root {
          height: auto !important;
          min-height: 100vh;
          overflow: visible !important;
          overflow-x: hidden !important;
        }

        /* PageEnter wrapper: stop flex-growing, let content define height */
        .cp-page-enter {
          flex: none !important;
        }

        /* Main: stack columns vertically, reset height */
        .cp-main {
          flex-direction: column !important;
          height: auto !important;
          padding-left: 20px !important;
          padding-right: 20px !important;
          padding-bottom: 60px;
        }

        /* Left column: static flow */
        .cp-left {
          flex: none !important;
          width: 100% !important;
          height: auto !important;
          position: static !important;
          min-width: 0;
        }

        /* Headline — Figma y=132, nav=80 → 52px below content start */
        .cp-headline {
          position: static !important;
          font-size: clamp(32px, 10.2vw, 40px) !important;
          margin-top: 52px !important;
          margin-bottom: 0 !important;
        }

        /* Address — Figma: title bottom≈212, address y=308 → 96px gap */
        .cp-address {
          position: static !important;
          max-width: none !important;
          margin-top: 96px !important;
        }

        /* Social links — Figma y=1371 (near bottom); here just follow address */
        .cp-social {
          position: static !important;
          margin-top: 40px !important;
          bottom: auto !important;
        }

        /* Right column: static flow, below left content */
        .cp-right {
          flex: none !important;
          width: 100% !important;
          height: auto !important;
          position: static !important;
          min-width: 0;
          padding-bottom: 40px;
        }

        /* Subtitle — Figma: address end≈468, subtitle y=588 → 120px gap */
        .cp-subtitle {
          position: static !important;
          width: 100% !important;
          margin-top: 120px !important;
          margin-bottom: 0 !important;
        }

        /* Form — follows subtitle with 32px gap (Figma: subtitle end≈672, first field y=704) */
        .contact-form {
          position: static !important;
          width: 100% !important;
          margin-top: 32px !important;
        }

        /* Form rows: stack fields vertically with 32px gap */
        .cp-form-row {
          flex-direction: column !important;
          gap: 32px !important;
          margin-bottom: 32px !important;
        }
        .cp-form-row > * {
          flex: none !important;
          min-width: 0;
        }

        /* Desktop card hidden on mobile — replaced by .cp-card-mobile SVG img */
        .decorative-card { display: none !important; }

        /* Mobile card — rectangle_responsive.svg (Figma 263:12206, 711×373px).
         * Figma: x=383 in 393px frame → left edge at right edge of screen.
         * y=564 in 1410px frame, nav=76px → 488px below nav bottom.
         * Only the leftmost ~10px is visible; the rest extends off-screen right. */
        .cp-card-mobile {
          display: block !important;
          position: absolute;
          top: 568px; /* 80px nav + 488px content offset */
          left: calc(100% - 10px); /* left edge 10px from right edge of container */
          width: 711px;
          height: 373px;
          pointer-events: none;
          z-index: 0;
        }
      }
    `}</style>
    <div
      className="cp-root"
      style={{
        background: BG,
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <NavMenu theme="dark" />

      {/* Decorative card shape — Figma group 263:11868, w=652 h=618.
       * FIXED pixel size: the card never scales, so the fixed-pixel corner cuts
       * (::after 87×122px, ::before 326×23px) always have identical proportions
       * relative to the card regardless of viewport width.
       * Positioned from the left with vw so it tracks the right column anchor.
       */}
      <div
        aria-hidden
        className="decorative-card"
        style={{
          position: "absolute",
          left: "52.12vw",   /* 788/1512 — tracks the right column start */
          top: "23.52vh",    /* 254/1080 — tracks below nav */
          width: 652,        /* fixed — Figma dimension, never scales */
          height: 618,       /* fixed — Figma dimension, never scales */
          background: "rgba(255,255,255,0.05)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Mobile-only card — rectangle_responsive.svg (Figma 263:12206).
        * Positioned so its left edge is at x≈383 (right edge of a 393px viewport).
        * Hidden on desktop via .cp-card-mobile { display:none } above. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        aria-hidden
        alt=""
        src="/assets/contact-page/rectangle_responsive.svg"
        className="cp-card-mobile"
      />

      <PageEnter className="cp-page-enter" style={{ flex: 1, minHeight: 0, position: "relative", zIndex: 1 }}>
        {/*
         * Main layout — mirrors Figma 1512×1080 canvas (40px side margins):
         *   Left column  = 780px wide (headline + address + social)
         *   Right column = 620px wide (subtitle + form)
         *   Gap          = 32px
         * Vertical positions are absolute within each column, derived from Figma y
         * values with the 80px fixed nav height subtracted.
         */}
        <main
          className="cp-main"
          style={{
            height: "100%",
            display: "flex",
            gap: 0,
            paddingLeft: "clamp(20px, 2.65vw, 40px)",
            paddingRight: "clamp(20px, 2.65vw, 40px)",
          }}
        >
          {/* ── Left column ───────────────────────────────────────────────── */}
          <div
            className="cp-left"
            style={{
              flex: "780 780 0",
              position: "relative",
              minWidth: 0,
              height: "100%",
            }}
          >
            {/* Headline — Figma y=200, nav=80 → top=120px */}
            <h1
              className="cp-headline"
              style={{
                position: "absolute",
                top: "clamp(60px, 11.11vh, 120px)",
                left: 0,
                fontFamily: FONT,
                fontWeight: 500,
                fontSize: "clamp(40px, 7.41vh, 80px)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#ffffff",
                margin: 0,
                whiteSpace: "pre-line",
              }}
            >
              {"We'd Love to\nHear from You"}
            </h1>

            {/* Address block — Figma y=472, nav=80 → top=392px */}
            <address
              className="cp-address"
              style={{
                position: "absolute",
                top: "clamp(220px, 36.3vh, 392px)",
                left: 0,
                maxWidth: 500,
                fontStyle: "normal",
              }}
            >
              <p
                style={{
                  fontFamily: FONT,
                  fontWeight: 400,
                  fontSize: "clamp(14px, 1.85vh, 20px)",
                  lineHeight: 1.4,
                  color: "#ffffff",
                  margin: 0,
                  whiteSpace: "pre-line",
                }}
              >
                {"DMCC Business Centre, Level 12, Uptown Tower,\nDubai, United Arab Emirates\ninfo@a11.studio"}
              </p>
            </address>

            {/* Social links — Figma y=1020, bottom=60px */}
            <div
              className="cp-social"
              style={{
                position: "absolute",
                bottom: "clamp(20px, 5.56vh, 60px)",
                left: 0,
                display: "flex",
                gap: 24,
              }}
            >
              {[
                { label: "Linkedin", href: "#" },
                { label: "Twitter/X", href: "#" },
                { label: "Medium", href: "#" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  style={{
                    fontFamily: FONT,
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: 1,
                    color: "rgba(255,255,255,0.66)",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* ── Right column ──────────────────────────────────────────────── */}
          <div
            className="cp-right"
            style={{
              flex: "652 652 0",
              position: "relative",
              minWidth: 0,
              height: "100%",
            }}
          >
            {/* Subtitle — Figma y=294, nav=80 → top=214px; x=828→8px from col left, w=519px */}
            <p
              className="cp-subtitle"
              style={{
                position: "absolute",
                top: "clamp(100px, 19.81vh, 214px)",
                left: 0,
                width: "clamp(260px, 34.3vw, 519px)",
                fontFamily: FONT,
                fontWeight: 400,
                fontSize: "clamp(14px, 1.85vh, 20px)",
                lineHeight: 1.4,
                color: "#ffffff",
                margin: 0,
              }}
            >
              Got an idea we can help with? Want to join our team?{" "}
              Here&apos;s how you can reach us.
            </p>

            {/* Form — Figma row-1 y=386, nav=80 → top=306px; content 580px wide */}
            <form
              className="contact-form"
              style={{
                position: "absolute",
                top: "clamp(170px, 28.33vh, 306px)",
                left: 0,
                width: "clamp(300px, 38.36vw, 580px)",
              }}
            >
              {/* Row 1 — First name + Last name */}
              <div
                className="cp-form-row"
                style={{
                  display: "flex",
                  gap: "clamp(20px, 2.77vw, 40px)",
                  marginBottom: "clamp(28px, 4.81vh, 52px)",
                }}
              >
                <FormField
                  label="First name*"
                  placeholder="Enter your name"
                  style={{ flex: "274 274 0" }}
                />
                <FormField
                  label="Last name*"
                  placeholder="Enter your last name"
                  style={{ flex: "266 266 0" }}
                />
              </div>

              {/* Row 2 — Email + How did you hear */}
              <div
                className="cp-form-row"
                style={{
                  display: "flex",
                  gap: "clamp(20px, 2.77vw, 40px)",
                  marginBottom: "clamp(28px, 4.81vh, 52px)",
                }}
              >
                <FormField
                  label="Email*"
                  placeholder="Enter your email"
                  type="email"
                  style={{ flex: "274 274 0" }}
                />
                <FormField
                  label="How did you hear of us?*"
                  placeholder="Enter the answer"
                  style={{ flex: "266 266 0" }}
                />
              </div>

              {/* Message */}
              <FormField
                label="Message*"
                placeholder="Type your message"
                multiline
                style={{ marginBottom: "clamp(28px, 4.81vh, 52px)" }}
              />

              {/* Submit */}
              <SendButton />
            </form>
          </div>
        </main>
      </PageEnter>
    </div>
    </>
  );
}
