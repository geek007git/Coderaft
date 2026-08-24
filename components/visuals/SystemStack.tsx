"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/** A node sitting on a plate, in plate-local coordinates. */
interface Node {
  x: number;
  z: number;
  /** Larger nodes read as primary components of that tier. */
  w: number;
}

interface Plate {
  label: string;
  /** Vertical position in world units; 0 is the top plate. */
  y: number;
  nodes: Node[];
}

/** A request in flight between two plates. */
interface Packet {
  tier: number;
  from: number;
  to: number;
  t: number;
  speed: number;
}

const PLATE_W = 330;
const PLATE_D = 176;
const TIER_GAP = 84;

/**
 * Five tiers of a request path. Deliberately the shape of a real system —
 * a client talks to a gateway, which fans out to services, which read data,
 * all of it sitting on infrastructure.
 */
const PLATES: Plate[] = [
  {
    label: "CLIENT",
    y: 0,
    nodes: [
      { x: -95, z: -34, w: 15 },
      { x: 8, z: 18, w: 12 },
      { x: 92, z: -12, w: 10 },
    ],
  },
  {
    label: "GATEWAY",
    y: TIER_GAP,
    nodes: [
      { x: -30, z: -8, w: 20 },
      { x: 74, z: 30, w: 11 },
    ],
  },
  {
    label: "SERVICES",
    y: TIER_GAP * 2,
    nodes: [
      { x: -112, z: 14, w: 13 },
      { x: -34, z: -30, w: 13 },
      { x: 44, z: 20, w: 13 },
      { x: 116, z: -18, w: 13 },
    ],
  },
  {
    label: "DATA",
    y: TIER_GAP * 3,
    nodes: [
      { x: -74, z: -18, w: 17 },
      { x: 20, z: 24, w: 14 },
      { x: 104, z: -6, w: 11 },
    ],
  },
  {
    label: "INFRASTRUCTURE",
    y: TIER_GAP * 4,
    nodes: [
      { x: -110, z: 8, w: 9 },
      { x: -36, z: -22, w: 9 },
      { x: 38, z: 12, w: 9 },
      { x: 112, z: -14, w: 9 },
    ],
  },
];

/** How far the horizontal plane is squashed vertically. */
const TILT = 0.4;

interface Point {
  x: number;
  y: number;
}

/**
 * An axonometric projection of a layered software architecture, drawn to canvas.
 *
 * Plates stack downward as the request descends through the system; packets
 * travel between tiers along real connections. The pointer rotates the scene.
 */
export default function SystemStack({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const camRef = useRef({ yaw: -0.34, targetYaw: -0.34, lift: 0, targetLift: 0 });
  const packetsRef = useRef<Packet[]>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      camRef.current.targetYaw = -0.34 + nx * 0.42;
      camRef.current.targetLift = ny * 26;
    };
    const onLeave = () => {
      camRef.current.targetYaw = -0.34;
      camRef.current.targetLift = 0;
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    // Seed the request traffic.
    for (let tier = 0; tier < PLATES.length - 1; tier++) {
      const count = tier === 1 ? 3 : 2;
      for (let i = 0; i < count; i++) {
        packetsRef.current.push({
          tier,
          from: i % PLATES[tier].nodes.length,
          to: i % PLATES[tier + 1].nodes.length,
          t: (i * 0.37 + tier * 0.21) % 1,
          speed: 0.0032 + ((tier + i) % 4) * 0.0009,
        });
      }
    }

    // next/font generates a hashed family name; canvas cannot read the CSS var,
    // so resolve it once here.
    const monoFamily =
      getComputedStyle(document.documentElement).getPropertyValue("--font-jetbrains").trim() ||
      "monospace";

    let time = 0;

    /** Project a world point onto the canvas. */
    const project = (x: number, y: number, z: number, scale: number): Point => {
      const { yaw, lift } = camRef.current;
      const cos = Math.cos(yaw);
      const sin = Math.sin(yaw);
      const px = x * cos - z * sin;
      const pz = x * sin + z * cos;
      return {
        x: w / 2 + px * scale,
        y: h / 2 + (y - TIER_GAP * 2 + lift) * scale * 0.86 + pz * scale * TILT,
      };
    };

    const draw = () => {
      const cam = camRef.current;
      cam.yaw += (cam.targetYaw - cam.yaw) * 0.055;
      cam.lift += (cam.targetLift - cam.lift) * 0.055;

      if (!reduced) time += 0.0055;

      // Fit the scene to the shorter axis so it never overflows its frame.
      const scale = Math.min(w / 620, h / 560) * 1.06;

      ctx.clearRect(0, 0, w, h);

      // A highlight that descends the stack, tracing one request through the system.
      const sweep = reduced ? 1.6 : (time * 0.42) % (PLATES.length + 1.4);

      PLATES.forEach((plate, i) => {
        const corners: Point[] = [
          project(-PLATE_W / 2, plate.y, -PLATE_D / 2, scale),
          project(PLATE_W / 2, plate.y, -PLATE_D / 2, scale),
          project(PLATE_W / 2, plate.y, PLATE_D / 2, scale),
          project(-PLATE_W / 2, plate.y, PLATE_D / 2, scale),
        ];

        // Proximity of the descending highlight to this plate.
        const heat = Math.max(0, 1 - Math.abs(sweep - i) * 1.5);

        // Plate face
        ctx.beginPath();
        corners.forEach((c, k) => (k === 0 ? ctx.moveTo(c.x, c.y) : ctx.lineTo(c.x, c.y)));
        ctx.closePath();

        const face = ctx.createLinearGradient(corners[0].x, corners[0].y, corners[2].x, corners[2].y);
        face.addColorStop(0, `rgba(255,255,255,${0.035 + heat * 0.05})`);
        face.addColorStop(1, `rgba(255,255,255,${0.008 + heat * 0.02})`);
        ctx.fillStyle = face;
        ctx.fill();

        ctx.strokeStyle = `rgba(255,255,255,${0.1 + heat * 0.22})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // The leading edge picks up the accent as the request passes through.
        if (heat > 0.02) {
          ctx.beginPath();
          ctx.moveTo(corners[3].x, corners[3].y);
          ctx.lineTo(corners[2].x, corners[2].y);
          ctx.strokeStyle = `rgba(216,199,160,${heat * 0.8})`;
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }

        // Corner pillars down to the next plate — the structure holding it up.
        if (i < PLATES.length - 1) {
          const below = PLATES[i + 1];
          corners.forEach((c, k) => {
            const bx = k === 0 || k === 3 ? -PLATE_W / 2 : PLATE_W / 2;
            const bz = k === 0 || k === 1 ? -PLATE_D / 2 : PLATE_D / 2;
            const b = project(bx, below.y, bz, scale);
            ctx.beginPath();
            ctx.moveTo(c.x, c.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = "rgba(255,255,255,0.05)";
            ctx.lineWidth = 1;
            ctx.stroke();
          });
        }

        // Connections from this plate's nodes down to the next.
        if (i < PLATES.length - 1) {
          plate.nodes.forEach((node, ni) => {
            const target = PLATES[i + 1].nodes[ni % PLATES[i + 1].nodes.length];
            const a = project(node.x, plate.y, node.z, scale);
            const b = project(target.x, PLATES[i + 1].y, target.z, scale);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = "rgba(255,255,255,0.07)";
            ctx.lineWidth = 1;
            ctx.stroke();
          });
        }

        // Nodes
        plate.nodes.forEach((node) => {
          const p = project(node.x, plate.y, node.z, scale);
          const size = node.w * scale * 0.5;

          // Footprint on the plate
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, size * 1.5, size * 1.5 * TILT, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(154,167,173,${0.05 + heat * 0.1})`;
          ctx.fill();

          // Body
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, size * 0.5, size * 0.5 * TILT + 1, 0, 0, Math.PI * 2);
          ctx.fillStyle = heat > 0.4 ? "#f1e6c9" : "rgba(241,240,235,0.72)";
          ctx.fill();
        });

        // Tier label, pinned to the plate's left edge
        const anchor = project(-PLATE_W / 2 - 22, plate.y, PLATE_D / 2, scale);
        ctx.font = `500 10px ${monoFamily}, ui-monospace, monospace`;
        ctx.textAlign = "right";
        ctx.fillStyle = heat > 0.4 ? "rgba(216,199,160,0.95)" : "rgba(138,142,139,0.75)";
        ctx.fillText(plate.label, anchor.x, anchor.y);
      });

      // Packets, drawn last so they sit above the structure.
      packetsRef.current.forEach((packet) => {
        const from = PLATES[packet.tier];
        const to = PLATES[packet.tier + 1];
        const a = from.nodes[packet.from % from.nodes.length];
        const b = to.nodes[packet.to % to.nodes.length];

        if (!reduced) {
          packet.t += packet.speed;
          if (packet.t > 1) packet.t = 0;
        }

        const pa = project(a.x, from.y, a.z, scale);
        const pb = project(b.x, to.y, b.z, scale);
        const t = packet.t;
        const px = pa.x + (pb.x - pa.x) * t;
        const py = pa.y + (pb.y - pa.y) * t;

        // Trail
        const tt = Math.max(0, t - 0.16);
        const tx = pa.x + (pb.x - pa.x) * tt;
        const ty = pa.y + (pb.y - pa.y) * tt;
        const trail = ctx.createLinearGradient(tx, ty, px, py);
        trail.addColorStop(0, "rgba(154,167,173,0)");
        trail.addColorStop(1, "rgba(154,167,173,0.8)");
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(px, py);
        ctx.strokeStyle = trail;
        ctx.lineWidth = 1.6;
        ctx.lineCap = "round";
        ctx.stroke();

        // Head
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "#c9d3d8";
        ctx.fill();
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      observer.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frameRef.current);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
      role="img"
      aria-label="Layered architecture diagram: client, gateway, services, data and infrastructure tiers with requests flowing between them."
    />
  );
}
