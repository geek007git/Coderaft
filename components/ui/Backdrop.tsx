/**
 * The page's atmosphere: a vertical wash, two low-intensity blooms, an
 * architectural grid, and grain.
 *
 * Deliberately inert — no drifting blobs, no cursor light. It exists to give the
 * glass something to refract and to keep the large dark areas from banding, and
 * being static is what lets it render on the server and ship no JavaScript.
 */
export default function Backdrop() {
  return (
    <div className="grain pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Base wash — lighter at the top, settling into the void below the fold */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #101214 0%, #0c0d10 38%, #0b0c0e 72%, #0a0b0d 100%)",
        }}
      />

      {/* A single accent bloom, low intensity, anchored to the hero */}
      <div
        className="absolute"
        style={{
          top: "-24%",
          right: "-10%",
          width: "70vw",
          height: "70vw",
          maxWidth: 1100,
          maxHeight: 1100,
          background:
            "radial-gradient(circle, rgba(216,199,160,0.07) 0%, rgba(216,199,160,0.02) 38%, transparent 68%)",
          filter: "blur(20px)",
        }}
      />

      {/* Steel counterweight keeps the warm bloom from tinting the whole page */}
      <div
        className="absolute"
        style={{
          bottom: "-30%",
          left: "-15%",
          width: "60vw",
          height: "60vw",
          maxWidth: 900,
          maxHeight: 900,
          background: "radial-gradient(circle, rgba(154,167,173,0.045) 0%, transparent 65%)",
          filter: "blur(30px)",
        }}
      />

      {/* Architectural grid — an engineering drawing, faded out at the edges */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage:
            "radial-gradient(ellipse 120% 80% at 50% 0%, #000 10%, rgba(0,0,0,0.35) 55%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 120% 80% at 50% 0%, #000 10%, rgba(0,0,0,0.35) 55%, transparent 90%)",
        }}
      />

      {/* Vignette keeps the edges heavy so content holds the centre */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 95% 85% at 50% 40%, transparent 45%, rgba(8,9,11,0.7) 100%)",
        }}
      />
    </div>
  );
}
