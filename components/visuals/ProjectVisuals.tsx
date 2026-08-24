import type { ReactNode } from "react";

/**
 * Product renders for the work section.
 *
 * Each is a vector interface, not an illustration — they use the real vocabulary
 * of that product (a scheduler grid, a request stream, a node matrix) so the work
 * section shows what was built rather than describing it. SVG keeps them crisp at
 * any density, and they carry no network weight.
 */

/** Round generated coordinates so server and client serialise them identically. */
const r2 = (n: number) => Math.round(n * 100) / 100;

const INK = "rgba(244,246,247,";
const LINE = "rgba(255,255,255,0.1)";
const LINE_SOFT = "rgba(255,255,255,0.055)";
const ACCENT = "#23d18b";

const VIEWBOX = "0 0 800 500";

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox={VIEWBOX}
      fill="none"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {children}
    </svg>
  );
}

/** A block of dummy copy, drawn as weighted rules. */
function Lines({
  x,
  y,
  widths,
  gap = 9,
  h = 4,
  opacity = 0.14,
}: {
  x: number;
  y: number;
  widths: number[];
  gap?: number;
  h?: number;
  opacity?: number;
}) {
  return (
    <>
      {widths.map((w, i) => (
        <rect
          key={i}
          x={x}
          y={y + i * gap}
          width={w}
          height={h}
          rx={h / 2}
          fill={`${INK}${opacity})`}
        />
      ))}
    </>
  );
}

/** Window chrome shared by the desktop-style renders. */
function Chrome({ title }: { title: string }) {
  return (
    <>
      <rect x="0" y="0" width="800" height="34" fill="rgba(255,255,255,0.03)" />
      <line x1="0" y1="34" x2="800" y2="34" stroke={LINE} />
      <circle cx="20" cy="17" r="3.5" fill={`${INK}0.16)`} />
      <circle cx="34" cy="17" r="3.5" fill={`${INK}0.1)`} />
      <circle cx="48" cy="17" r="3.5" fill={`${INK}0.1)`} />
      <text x="70" y="21" fontSize="9.5" fill={`${INK}0.4)`} fontFamily="monospace">
        {title}
      </text>
    </>
  );
}

/* ========================================================================== */
/* 001 — HealthSync: clinical scheduling                                       */
/* ========================================================================== */

const DAYS = ["MON", "TUE", "WED", "THU", "FRI"];
const APPOINTMENTS = [
  { d: 0, start: 0, span: 2, live: false },
  { d: 0, start: 3, span: 1, live: false },
  { d: 1, start: 1, span: 3, live: false },
  { d: 2, start: 0, span: 1, live: false },
  { d: 2, start: 2, span: 2, live: true },
  { d: 3, start: 1, span: 2, live: false },
  { d: 3, start: 4, span: 1, live: false },
  { d: 4, start: 0, span: 3, live: false },
];

export function HealthSyncVisual() {
  const gridX = 232;
  const colW = 74;
  const rowH = 42;
  const gridY = 92;

  return (
    <Frame>
      <Chrome title="healthsync — scheduling" />

      {/* Patient rail */}
      <line x1="200" y1="34" x2="200" y2="500" stroke={LINE} />
      <text x="24" y="60" fontSize="8.5" fill={`${INK}0.34)`} fontFamily="monospace" letterSpacing="1.4">
        PATIENTS · 148
      </text>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <g key={i}>
          {i === 2 && <rect x="12" y={72 + i * 46} width="176" height="38" rx="3" fill="rgba(35,209,139,0.09)" />}
          <circle cx="30" cy={91 + i * 46} r="9" fill={`${INK}${i === 2 ? 0.2 : 0.09})`} />
          <Lines x={48} y={84 + i * 46} widths={[i === 2 ? 82 : 64, 44]} gap={11} h={4} opacity={i === 2 ? 0.28 : 0.12} />
          <line x1="12" y1={118 + i * 46} x2="188" y2={118 + i * 46} stroke={LINE_SOFT} />
        </g>
      ))}

      {/* Scheduler header */}
      <text x={gridX} y="60" fontSize="8.5" fill={`${INK}0.34)`} fontFamily="monospace" letterSpacing="1.4">
        WEEK 32 — CLINIC A
      </text>
      {DAYS.map((d, i) => (
        <text
          key={d}
          x={gridX + i * colW + 6}
          y="82"
          fontSize="8"
          fill={`${INK}0.3)`}
          fontFamily="monospace"
          letterSpacing="1"
        >
          {d}
        </text>
      ))}

      {/* Time grid */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((r) => (
        <line
          key={`h${r}`}
          x1={gridX}
          y1={gridY + r * rowH}
          x2={gridX + DAYS.length * colW}
          y2={gridY + r * rowH}
          stroke={LINE_SOFT}
        />
      ))}
      {DAYS.map((_, c) => (
        <line
          key={`v${c}`}
          x1={gridX + c * colW}
          y1={gridY}
          x2={gridX + c * colW}
          y2={gridY + 8 * rowH}
          stroke={LINE_SOFT}
        />
      ))}

      {/* Appointment blocks */}
      {APPOINTMENTS.map((a, i) => (
        <g key={i}>
          <rect
            x={gridX + a.d * colW + 4}
            y={gridY + a.start * rowH + 4}
            width={colW - 10}
            height={a.span * rowH - 8}
            rx="3"
            fill={a.live ? "rgba(35,209,139,0.2)" : "rgba(255,255,255,0.07)"}
            stroke={a.live ? ACCENT : LINE}
          />
          <rect
            x={gridX + a.d * colW + 4}
            y={gridY + a.start * rowH + 4}
            width="2.5"
            height={a.span * rowH - 8}
            fill={a.live ? ACCENT : `${INK}0.22)`}
          />
          <Lines
            x={gridX + a.d * colW + 14}
            y={gridY + a.start * rowH + 14}
            widths={[38, 24]}
            gap={9}
            h={3}
            opacity={a.live ? 0.4 : 0.16}
          />
        </g>
      ))}

      {/* Record panel */}
      <line x1="620" y1="34" x2="620" y2="500" stroke={LINE} />
      <rect x="620" y="34" width="180" height="466" fill="rgba(255,255,255,0.018)" />
      <text x="640" y="60" fontSize="8.5" fill={`${INK}0.34)`} fontFamily="monospace" letterSpacing="1.4">
        RECORD
      </text>
      <Lines x={640} y={76} widths={[96, 62]} gap={12} h={5} opacity={0.22} />

      {/* Vitals sparkline */}
      <text x="640" y="128" fontSize="7.5" fill={`${INK}0.3)`} fontFamily="monospace" letterSpacing="1">
        VITALS · 24H
      </text>
      <polyline
        points="640,168 656,158 672,164 688,144 704,152 720,132 736,140 752,124 768,130"
        stroke={ACCENT}
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="768" cy="130" r="2.5" fill={ACCENT} />

      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <line x1="640" y1={202 + i * 40} x2="780" y2={202 + i * 40} stroke={LINE_SOFT} />
          <Lines x={640} y={212 + i * 40} widths={[54]} gap={0} h={4} opacity={0.12} />
          <Lines x={744} y={212 + i * 40} widths={[36]} gap={0} h={4} opacity={0.2} />
        </g>
      ))}

      <rect x="640" y="404" width="140" height="26" rx="3" fill="rgba(35,209,139,0.16)" stroke={ACCENT} />
      <text x="710" y="421" fontSize="8.5" fill={ACCENT} fontFamily="monospace" textAnchor="middle" letterSpacing="1">
        CONFIRM VISIT
      </text>
    </Frame>
  );
}

/* ========================================================================== */
/* 002 — FinFlow: streaming analytics                                          */
/* ========================================================================== */

/** A deterministic series so the chart is stable between server and client. */
const SERIES = Array.from({ length: 56 }, (_, i) => {
  const base = 150 - Math.sin(i / 5) * 42 - Math.sin(i / 13) * 26;
  const jitter = ((i * 37) % 11) - 5;
  return r2(base + jitter);
});

const ANOMALIES = [17, 34, 47];

export function FinFlowVisual() {
  const x0 = 60;
  const stepX = r2((700 - x0) / (SERIES.length - 1));
  const yAt = (v: number) => r2(300 - v);

  const path = SERIES.map((v, i) => `${i === 0 ? "M" : "L"}${r2(x0 + i * stepX)},${yAt(v)}`).join(" ");
  const area = `${path} L700,300 L${x0},300 Z`;

  return (
    <Frame>
      <Chrome title="finflow — transaction stream" />

      {/* KPI row */}
      {[
        { k: "VOLUME", v: "4.2M", d: "+8.1%" },
        { k: "LATENCY", v: "1.8s", d: "-12%" },
        { k: "FLAGGED", v: "312", d: "+3" },
        { k: "PRECISION", v: "94%", d: "stable" },
      ].map((m, i) => (
        <g key={m.k}>
          <line x1={40 + i * 182} y1="58" x2={40 + i * 182} y2="106" stroke={i === 0 ? "transparent" : LINE_SOFT} />
          <text x={56 + i * 182} y="72" fontSize="7.5" fill={`${INK}0.3)`} fontFamily="monospace" letterSpacing="1.2">
            {m.k}
          </text>
          <text x={56 + i * 182} y="96" fontSize="21" fill={`${INK}0.9)`} fontFamily="monospace">
            {m.v}
          </text>
          <text x={56 + i * 182 + 62} y="96" fontSize="8" fill={i === 2 ? ACCENT : `${INK}0.32)`} fontFamily="monospace">
            {m.d}
          </text>
        </g>
      ))}
      <line x1="0" y1="126" x2="800" y2="126" stroke={LINE} />

      {/* Chart grid */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <line x1={x0} y1={r2(150 + i * 37.5)} x2="700" y2={r2(150 + i * 37.5)} stroke={LINE_SOFT} />
          <text x="28" y={r2(154 + i * 37.5)} fontSize="7" fill={`${INK}0.22)`} fontFamily="monospace">
            {200 - i * 50}
          </text>
        </g>
      ))}

      <defs>
        <linearGradient id="ff-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.22" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#ff-area)" />
      <path d={path} stroke={ACCENT} strokeWidth="1.6" fill="none" />

      {/* Anomaly markers */}
      {ANOMALIES.map((i) => (
        <g key={i}>
          <line
            x1={r2(x0 + i * stepX)}
            y1="150"
            x2={r2(x0 + i * stepX)}
            y2="300"
            stroke="rgba(244,246,247,0.22)"
            strokeDasharray="2 4"
          />
          <rect
            x={r2(x0 + i * stepX) - 5}
            y={yAt(SERIES[i]) - 5}
            width="10"
            height="10"
            fill="none"
            stroke={`${INK}0.7)`}
            strokeWidth="1.2"
          />
        </g>
      ))}

      {/* Transaction table */}
      <line x1="0" y1="332" x2="800" y2="332" stroke={LINE} />
      <text x="40" y="352" fontSize="7.5" fill={`${INK}0.3)`} fontFamily="monospace" letterSpacing="1.2">
        LEDGER — LIVE
      </text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <line x1="40" y1={r2(370 + i * 30)} x2="760" y2={r2(370 + i * 30)} stroke={LINE_SOFT} />
          <text x="40" y={r2(388 + i * 30)} fontSize="8" fill={`${INK}0.4)`} fontFamily="monospace">
            {`TX-90${412 + i}`}
          </text>
          <Lines x={160} y={r2(382 + i * 30)} widths={[110]} gap={0} h={4} opacity={0.12} />
          <Lines x={340} y={r2(382 + i * 30)} widths={[70]} gap={0} h={4} opacity={0.1} />
          <rect
            x="470"
            y={r2(378 + i * 30)}
            width={i === 1 ? 54 : 42}
            height="13"
            rx="2"
            fill={i === 1 ? "rgba(35,209,139,0.16)" : "rgba(255,255,255,0.05)"}
            stroke={i === 1 ? ACCENT : LINE}
          />
          <text x="660" y={r2(388 + i * 30)} fontSize="8.5" fill={`${INK}0.55)`} fontFamily="monospace" textAnchor="end">
            {["₹ 41,220", "₹ 8,905", "₹ 132,400", "₹ 2,310"][i]}
          </text>
        </g>
      ))}
    </Frame>
  );
}

/* ========================================================================== */
/* 003 — SecureVault: gateway console                                          */
/* ========================================================================== */

const REQUESTS = [
  { path: "POST /v1/auth/token", code: "200", ok: true },
  { path: "GET  /v1/accounts/:id", code: "200", ok: true },
  { path: "POST /v1/transfer", code: "429", ok: false },
  { path: "GET  /v1/audit/events", code: "200", ok: true },
  { path: "POST /v1/keys/rotate", code: "201", ok: true },
  { path: "GET  /v1/accounts", code: "403", ok: false },
];

export function SecureVaultVisual() {
  return (
    <Frame>
      <Chrome title="securevault — gateway" />

      {/* Token lifecycle */}
      <text x="40" y="62" fontSize="7.5" fill={`${INK}0.3)`} fontFamily="monospace" letterSpacing="1.2">
        TOKEN LIFECYCLE
      </text>
      {["ISSUE", "VERIFY", "SCOPE", "AUDIT"].map((s, i) => (
        <g key={s}>
          <rect
            x={40 + i * 122}
            y="76"
            width="98"
            height="40"
            rx="3"
            fill={i === 1 ? "rgba(35,209,139,0.12)" : "rgba(255,255,255,0.035)"}
            stroke={i === 1 ? ACCENT : LINE}
          />
          <text
            x={89 + i * 122}
            y="101"
            fontSize="8.5"
            fill={i === 1 ? ACCENT : `${INK}0.5)`}
            fontFamily="monospace"
            textAnchor="middle"
            letterSpacing="1"
          >
            {s}
          </text>
          {i < 3 && (
            <>
              <line x1={138 + i * 122} y1="96" x2={162 + i * 122} y2="96" stroke={LINE} />
              <path d={`M${157 + i * 122},92 L${162 + i * 122},96 L${157 + i * 122},100`} stroke={`${INK}0.3)`} fill="none" />
            </>
          )}
        </g>
      ))}

      {/* Rate-limit meters */}
      <line x1="540" y1="34" x2="540" y2="500" stroke={LINE} />
      <text x="562" y="62" fontSize="7.5" fill={`${INK}0.3)`} fontFamily="monospace" letterSpacing="1.2">
        RATE LIMIT — SLIDING
      </text>
      {[
        { k: "tier:free", pct: 0.86 },
        { k: "tier:pro", pct: 0.42 },
        { k: "tier:internal", pct: 0.18 },
      ].map((m, i) => (
        <g key={m.k}>
          <text x="562" y={r2(92 + i * 46)} fontSize="8" fill={`${INK}0.45)`} fontFamily="monospace">
            {m.k}
          </text>
          <rect x="562" y={r2(100 + i * 46)} width="200" height="6" rx="3" fill="rgba(255,255,255,0.06)" />
          <rect
            x="562"
            y={r2(100 + i * 46)}
            width={r2(200 * m.pct)}
            height="6"
            rx="3"
            fill={m.pct > 0.8 ? `${INK}0.75)` : ACCENT}
          />
          <text x="762" y={r2(92 + i * 46)} fontSize="8" fill={`${INK}0.35)`} fontFamily="monospace" textAnchor="end">
            {Math.round(m.pct * 100)}%
          </text>
        </g>
      ))}

      {/* Request stream */}
      <line x1="0" y1="146" x2="540" y2="146" stroke={LINE} />
      <text x="40" y="170" fontSize="7.5" fill={`${INK}0.3)`} fontFamily="monospace" letterSpacing="1.2">
        REQUEST STREAM
      </text>
      {REQUESTS.map((rq, i) => (
        <g key={rq.path}>
          <rect
            x="30"
            y={r2(184 + i * 44)}
            width="480"
            height="34"
            rx="2"
            fill={i === 2 ? "rgba(244,246,247,0.045)" : "transparent"}
          />
          <rect x="30" y={r2(184 + i * 44)} width="2" height="34" fill={rq.ok ? ACCENT : `${INK}0.4)`} />
          <text x="46" y={r2(205 + i * 44)} fontSize="9" fill={`${INK}0.62)`} fontFamily="monospace">
            {rq.path}
          </text>
          <text
            x="440"
            y={r2(205 + i * 44)}
            fontSize="9"
            fill={rq.ok ? ACCENT : `${INK}0.75)`}
            fontFamily="monospace"
          >
            {rq.code}
          </text>
          <text x="500" y={r2(205 + i * 44)} fontSize="8" fill={`${INK}0.28)`} fontFamily="monospace" textAnchor="end">
            {[4, 6, 3, 11, 8, 5][i]}ms
          </text>
        </g>
      ))}

      {/* Audit counter */}
      <line x1="540" y1="212" x2="800" y2="212" stroke={LINE} />
      <text x="562" y="242" fontSize="7.5" fill={`${INK}0.3)`} fontFamily="monospace" letterSpacing="1.2">
        AUDIT EVENTS
      </text>
      <text x="562" y="286" fontSize="34" fill={`${INK}0.9)`} fontFamily="monospace">
        1,284,902
      </text>
      <text x="562" y="306" fontSize="8" fill={`${INK}0.3)`} fontFamily="monospace">
        RETENTION 7Y · IMMUTABLE
      </text>
      {Array.from({ length: 40 }, (_, i) => (
        <rect
          key={i}
          x={r2(562 + i * 5.6)}
          y={r2(340 + (i % 7) * 3)}
          width="3"
          height={r2(40 - (i % 7) * 3)}
          fill={i % 9 === 0 ? ACCENT : `${INK}0.14)`}
        />
      ))}
    </Frame>
  );
}

/* ========================================================================== */
/* 004 — CloudOps: cluster control                                             */
/* ========================================================================== */

export function CloudOpsVisual() {
  const cols = 18;
  const rows = 7;

  return (
    <Frame>
      <Chrome title="cloudops — cluster / prod-eu-1" />

      {/* Gauges */}
      {[
        { k: "CPU", v: 0.62 },
        { k: "MEMORY", v: 0.48 },
        { k: "NETWORK", v: 0.31 },
      ].map((g, i) => (
        <g key={g.k} transform={`translate(${52 + i * 118}, 56)`}>
          <circle cx="34" cy="34" r="26" stroke="rgba(255,255,255,0.08)" strokeWidth="5" fill="none" />
          <circle
            cx="34"
            cy="34"
            r="26"
            stroke={ACCENT}
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${r2(163 * g.v)} 163`}
            transform="rotate(-90 34 34)"
          />
          <text x="34" y="38" fontSize="12" fill={`${INK}0.85)`} fontFamily="monospace" textAnchor="middle">
            {Math.round(g.v * 100)}
          </text>
          <text x="34" y="80" fontSize="7.5" fill={`${INK}0.3)`} fontFamily="monospace" textAnchor="middle" letterSpacing="1">
            {g.k}
          </text>
        </g>
      ))}

      {/* Cost panel */}
      <line x1="420" y1="34" x2="420" y2="164" stroke={LINE} />
      <text x="446" y="62" fontSize="7.5" fill={`${INK}0.3)`} fontFamily="monospace" letterSpacing="1.2">
        SPEND — 30D
      </text>
      <text x="446" y="98" fontSize="26" fill={`${INK}0.9)`} fontFamily="monospace">
        $18,240
      </text>
      <text x="446" y="118" fontSize="8.5" fill={ACCENT} fontFamily="monospace">
        ↓ 31% vs. previous
      </text>
      {Array.from({ length: 30 }, (_, i) => {
        const h = 10 + ((i * 13) % 26);
        return (
          <rect
            key={i}
            x={r2(620 + i * 5.6)}
            y={r2(128 - h)}
            width="3.4"
            height={h}
            fill={i > 20 ? ACCENT : `${INK}0.16)`}
          />
        );
      })}

      {/* Node matrix */}
      <line x1="0" y1="164" x2="800" y2="164" stroke={LINE} />
      <text x="40" y="190" fontSize="7.5" fill={`${INK}0.3)`} fontFamily="monospace" letterSpacing="1.2">
        NODES — 340 / 12 CLUSTERS
      </text>
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => {
          const seed = (r * cols + c * 7) % 23;
          const state = seed === 3 ? "warn" : seed % 5 === 0 ? "hot" : "ok";
          return (
            <rect
              key={`${r}-${c}`}
              x={40 + c * 24}
              y={204 + r * 24}
              width="17"
              height="17"
              rx="2"
              fill={
                state === "warn"
                  ? "rgba(244,246,247,0.55)"
                  : state === "hot"
                    ? "rgba(35,209,139,0.5)"
                    : "rgba(35,209,139,0.14)"
              }
              stroke={state === "warn" ? `${INK}0.7)` : "transparent"}
            />
          );
        })
      )}

      {/* Deploy timeline */}
      <line x1="500" y1="164" x2="500" y2="500" stroke={LINE} />
      <text x="524" y="190" fontSize="7.5" fill={`${INK}0.3)`} fontFamily="monospace" letterSpacing="1.2">
        DEPLOYMENTS
      </text>
      {["api-gateway", "ledger-svc", "worker-pool", "web", "search-idx"].map((s, i) => (
        <g key={s}>
          <circle cx="530" cy={r2(216 + i * 42)} r="3.5" fill={i === 0 ? ACCENT : `${INK}0.25)`} />
          {i < 4 && <line x1="530" y1={r2(220 + i * 42)} x2="530" y2={r2(254 + i * 42)} stroke={LINE_SOFT} />}
          <text x="548" y={r2(213 + i * 42)} fontSize="9" fill={`${INK}0.6)`} fontFamily="monospace">
            {s}
          </text>
          <text x="548" y={r2(227 + i * 42)} fontSize="7.5" fill={`${INK}0.26)`} fontFamily="monospace">
            {["2m ago · v2.14.0", "1h ago · v8.2.1", "3h ago · v1.9.4", "6h ago · v4.0.2", "1d ago · v0.7.7"][i]}
          </text>
          <rect
            x="740"
            y={r2(204 + i * 42)}
            width="36"
            height="14"
            rx="2"
            fill={i === 0 ? "rgba(35,209,139,0.16)" : "rgba(255,255,255,0.04)"}
          />
        </g>
      ))}
    </Frame>
  );
}

/* ========================================================================== */
/* 005 — EduTrack: learning platform                                           */
/* ========================================================================== */

export function EduTrackVisual() {
  return (
    <Frame>
      <Chrome title="edutrack — cohort / distributed systems" />

      {/* Module list */}
      <text x="32" y="62" fontSize="7.5" fill={`${INK}0.3)`} fontFamily="monospace" letterSpacing="1.2">
        MODULES
      </text>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          {i === 1 && <rect x="20" y={r2(74 + i * 44)} width="200" height="36" rx="3" fill="rgba(35,209,139,0.09)" />}
          <text x="34" y={r2(90 + i * 44)} fontSize="8" fill={`${INK}0.28)`} fontFamily="monospace">
            {String(i + 1).padStart(2, "0")}
          </text>
          <Lines x={58} y={r2(83 + i * 44)} widths={[i === 1 ? 128 : 104, 62]} gap={11} h={4} opacity={i === 1 ? 0.3 : 0.12} />
          <circle cx="206" cy={r2(92 + i * 44)} r="5" fill="none" stroke={i <= 1 ? ACCENT : LINE} strokeWidth="1.5" />
          {i <= 1 && <path d={`M203,${r2(92 + i * 44)} l2.2,2.4 l4,-4.6`} stroke={ACCENT} strokeWidth="1.5" fill="none" />}
        </g>
      ))}

      {/* Player */}
      <line x1="240" y1="34" x2="240" y2="500" stroke={LINE} />
      <rect x="264" y="60" width="352" height="198" rx="4" fill="rgba(255,255,255,0.035)" stroke={LINE} />
      <circle cx="440" cy="152" r="24" fill="none" stroke={ACCENT} strokeWidth="1.5" />
      <path d="M433,142 L456,152 L433,162 Z" fill={ACCENT} />
      <rect x="264" y="244" width="352" height="3" fill="rgba(255,255,255,0.09)" />
      <rect x="264" y="244" width="148" height="3" fill={ACCENT} />
      <circle cx="412" cy="245.5" r="4" fill={ACCENT} />
      <text x="264" y="274" fontSize="8" fill={`${INK}0.34)`} fontFamily="monospace">
        18:42 / 44:10
      </text>
      <text x="616" y="274" fontSize="8" fill={ACCENT} fontFamily="monospace" textAnchor="end">
        ● LIVE · 312 WATCHING
      </text>

      {/* Cohort progress */}
      <line x1="240" y1="300" x2="800" y2="300" stroke={LINE} />
      <text x="264" y="326" fontSize="7.5" fill={`${INK}0.3)`} fontFamily="monospace" letterSpacing="1.2">
        COHORT PROGRESS
      </text>
      {Array.from({ length: 26 }, (_, i) => {
        const h = 12 + ((i * 17) % 62);
        return (
          <rect
            key={i}
            x={r2(264 + i * 14)}
            y={r2(424 - h)}
            width="8"
            height={h}
            rx="1.5"
            fill={h > 55 ? ACCENT : `${INK}0.15)`}
          />
        );
      })}
      <line x1="264" y1="424" x2="628" y2="424" stroke={LINE} />
      <text x="264" y="446" fontSize="7.5" fill={`${INK}0.24)`} fontFamily="monospace">
        WEEK 1
      </text>
      <text x="628" y="446" fontSize="7.5" fill={`${INK}0.24)`} fontFamily="monospace" textAnchor="end">
        WEEK 26
      </text>

      {/* Right stats */}
      <line x1="656" y1="34" x2="656" y2="300" stroke={LINE} />
      {[
        { k: "ENROLLED", v: "6,812" },
        { k: "COMPLETION", v: "78%" },
        { k: "ASSIGNMENTS", v: "52K" },
      ].map((s, i) => (
        <g key={s.k}>
          <text x="680" y={r2(72 + i * 76)} fontSize="7.5" fill={`${INK}0.3)`} fontFamily="monospace" letterSpacing="1.2">
            {s.k}
          </text>
          <text x="680" y={r2(102 + i * 76)} fontSize="20" fill={`${INK}0.88)`} fontFamily="monospace">
            {s.v}
          </text>
          {i < 2 && <line x1="680" y1={r2(124 + i * 76)} x2="776" y2={r2(124 + i * 76)} stroke={LINE_SOFT} />}
        </g>
      ))}
    </Frame>
  );
}

/* ========================================================================== */
/* 006 — ShopStream: recommendation engine                                     */
/* ========================================================================== */

/** Deterministic embedding scatter. */
const POINTS = Array.from({ length: 64 }, (_, i) => {
  const a = (i * 2.39996) % (Math.PI * 2);
  const rad = 18 + ((i * 29) % 92);
  return {
    x: r2(300 + Math.cos(a) * rad * 1.5),
    y: r2(300 + Math.sin(a) * rad * 0.72),
    cluster: i % 4,
  };
});

export function ShopStreamVisual() {
  return (
    <Frame>
      <Chrome title="shopstream — inference / recommendations" />

      {/* Embedding space */}
      <text x="40" y="66" fontSize="7.5" fill={`${INK}0.3)`} fontFamily="monospace" letterSpacing="1.2">
        EMBEDDING SPACE — 180K ITEMS
      </text>
      <ellipse cx="300" cy="300" rx="230" ry="112" fill="none" stroke={LINE_SOFT} strokeDasharray="3 6" />
      <ellipse cx="300" cy="300" rx="150" ry="72" fill="none" stroke={LINE_SOFT} strokeDasharray="3 6" />

      {POINTS.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={p.cluster === 0 ? 3 : 2}
          fill={p.cluster === 0 ? ACCENT : `${INK}0.2)`}
          opacity={p.cluster === 0 ? 0.95 : 0.7}
        />
      ))}

      {/* Query item and its nearest neighbours */}
      <circle cx="300" cy="300" r="6" fill={ACCENT} />
      <circle cx="300" cy="300" r="13" fill="none" stroke={ACCENT} strokeWidth="1" opacity="0.5" />
      {[
        [376, 262],
        [232, 268],
        [352, 344],
        [246, 340],
      ].map(([x, y], i) => (
        <g key={i}>
          <line x1="300" y1="300" x2={x} y2={y} stroke="rgba(35,209,139,0.4)" strokeWidth="1" />
          <circle cx={x} cy={y} r="4" fill="none" stroke={ACCENT} strokeWidth="1.4" />
        </g>
      ))}

      {/* Result rail */}
      <line x1="560" y1="34" x2="560" y2="500" stroke={LINE} />
      <text x="584" y="66" fontSize="7.5" fill={`${INK}0.3)`} fontFamily="monospace" letterSpacing="1.2">
        TOP-K RESULTS
      </text>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect
            x="584"
            y={r2(82 + i * 72)}
            width="184"
            height="58"
            rx="3"
            fill={i === 0 ? "rgba(35,209,139,0.08)" : "rgba(255,255,255,0.025)"}
            stroke={i === 0 ? "rgba(35,209,139,0.4)" : LINE}
          />
          <rect x="594" y={r2(92 + i * 72)} width="38" height="38" rx="2" fill={`${INK}0.08)`} />
          <Lines x={642} y={r2(96 + i * 72)} widths={[92, 58]} gap={12} h={4} opacity={i === 0 ? 0.3 : 0.14} />
          <text
            x="758"
            y={r2(128 + i * 72)}
            fontSize="8"
            fill={i === 0 ? ACCENT : `${INK}0.3)`}
            fontFamily="monospace"
            textAnchor="end"
          >
            {[0.94, 0.91, 0.88, 0.85, 0.81][i].toFixed(2)}
          </text>
        </g>
      ))}

      {/* Latency footer */}
      <line x1="0" y1="446" x2="560" y2="446" stroke={LINE} />
      <text x="40" y="472" fontSize="8" fill={`${INK}0.34)`} fontFamily="monospace">
        INFERENCE
      </text>
      <text x="120" y="472" fontSize="8" fill={ACCENT} fontFamily="monospace">
        12ms
      </text>
      <text x="200" y="472" fontSize="8" fill={`${INK}0.34)`} fontFamily="monospace">
        CACHE HIT
      </text>
      <text x="290" y="472" fontSize="8" fill={`${INK}0.6)`} fontFamily="monospace">
        88%
      </text>
      <text x="360" y="472" fontSize="8" fill={`${INK}0.34)`} fontFamily="monospace">
        MODEL
      </text>
      <text x="420" y="472" fontSize="8" fill={`${INK}0.6)`} fontFamily="monospace">
        cf-v4 · nightly
      </text>
    </Frame>
  );
}

/** Lookup by project id, so the work section stays declarative. */
export const projectVisuals: Record<string, () => ReactNode> = {
  healthsync: HealthSyncVisual,
  finflow: FinFlowVisual,
  securevault: SecureVaultVisual,
  cloudops: CloudOpsVisual,
  edutrack: EduTrackVisual,
  shopstream: ShopStreamVisual,
};
