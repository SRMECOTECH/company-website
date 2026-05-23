import { Users, Globe2, BarChart3, FileText, Recycle, Package } from 'lucide-react';

/**
 * EPR Annual Compliance Cycle — six-node hexagonal flow.
 * Rebuilt from EPR_Compliance_Flow.drawio with all nodes/labels mathematically aligned
 * on a single circle and arrows generated from the angle pair (no manual offsets).
 */

// Wide canvas + extra vertical room so the top/bottom labels never clip
const W = 1240;
const H = 1020;
const CX = W / 2;
const CY = H / 2;
const R = 280;          // hexagon radius — node centres sit on this circle
const NODE_R = 58;      // node radius
const RING_R = NODE_R + 6;
const GLOW_R = NODE_R + 14;

// Label box dims — kept identical for every label so they form a tidy outer ring
const LABEL_W = 260;
const LABEL_H = 84;

/**
 * Explicit label offsets per node angle. Radial-only placement overlaps the
 * diagonal nodes because the label box is wide — so the diagonal entries push
 * harder in the X axis. Top/bottom go purely vertical.
 *
 * Result: every label corner sits at least ~90px from its node centre, well
 * outside the glow ring (NODE_R + 14 = 72px).
 */
const LABEL_OFFSETS = {
  150:  { dx: -230, dy: -52 },   // Stakeholders (upper-left)
  90:   { dx:    0, dy: -158 },  // Registration (top)
  30:   { dx:  230, dy: -52 },   // Target Calculation (upper-right)
  '-30':{ dx:  230, dy:  52 },   // Filing of Returns (lower-right)
  '-90':{ dx:    0, dy:  158 },  // Fulfilment (bottom)
  '-150':{dx: -230, dy:  52 },   // Waste Categories (lower-left)
};

const NODES = [
  { Icon: Users,      title: 'Stakeholders',         sub: 'Producers · Importers · Brand Owners (PIBO)', angle: 150 },
  { Icon: Globe2,     title: 'Registration',         sub: 'on the CPCB EPR Portal',                       angle: 90  },
  { Icon: BarChart3,  title: 'Target Calculation',   sub: "Next year's EPR target",                       angle: 30  },
  { Icon: FileText,   title: 'Filing of Returns',    sub: 'Quarterly & annual',                           angle: -30 },
  { Icon: Recycle,    title: 'Fulfilment',           sub: 'of EPR Liability',                             angle: -90, highlight: true },
  { Icon: Package,    title: 'Waste Categories',     sub: 'Rigid · Flexible · Multi-layer · Sheets',      angle: -150 },
];

const rad = (deg) => (deg * Math.PI) / 180;

function nodePos(angle, radius = R) {
  return {
    x: CX + radius * Math.cos(rad(angle)),
    y: CY - radius * Math.sin(rad(angle)), // SVG y is flipped
  };
}

function labelCentre(angle) {
  const off = LABEL_OFFSETS[String(angle)];
  const n = nodePos(angle);
  return { x: n.x + off.dx, y: n.y + off.dy };
}

/** Quadratic-Bezier path from node A → node B, control point pulled
 *  radially outward from the chord midpoint so the curve bows away from centre. */
function arrowPath(fromAngle, toAngle, pullOutward = 70) {
  const a = nodePos(fromAngle);
  const b = nodePos(toAngle);
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  // outward direction from centre through chord midpoint
  const dx = mx - CX, dy = my - CY;
  const mag = Math.hypot(dx, dy) || 1;
  const ux = dx / mag, uy = dy / mag;
  const ctrlX = mx + ux * pullOutward;
  const ctrlY = my + uy * pullOutward;
  // offset endpoints along tangent toward control point so arrows land at node edge
  const off = (p) => {
    const vx = ctrlX - p.x, vy = ctrlY - p.y;
    const vm = Math.hypot(vx, vy) || 1;
    return { x: p.x + (vx / vm) * RING_R, y: p.y + (vy / vm) * RING_R };
  };
  const s = off(a), e = off(b);
  return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} Q ${ctrlX.toFixed(2)} ${ctrlY.toFixed(2)} ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
}

function StepBadge({ x, y, n }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle r="15" fill="#FF6B35" stroke="#fff" strokeWidth="2.5" />
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="13"
        fontWeight="800"
        fill="#fff"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {n}
      </text>
    </g>
  );
}

export default function EprFlow() {
  return (
    <div className="epr-flow-wrap">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="epr-flow"
        role="img"
        aria-label="EPR annual compliance cycle — six step flow"
      >
        <defs>
          <radialGradient id="epr-flow-bg" cx="50%" cy="50%" r="55%">
            <stop offset="0%"  stopColor="rgba(96,165,250,0.16)" />
            <stop offset="60%" stopColor="rgba(96,165,250,0.10)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="epr-flow-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"  stopColor="var(--brand-primary)" />
            <stop offset="100%" stopColor="var(--brand-secondary)" />
          </linearGradient>
          <linearGradient id="epr-flow-stroke-green" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"  stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
          <radialGradient id="epr-flow-node" cx="50%" cy="35%" r="65%">
            <stop offset="0%"  stopColor="#2A4870" />
            <stop offset="100%" stopColor="#10243F" />
          </radialGradient>
          <radialGradient id="epr-flow-node-green" cx="50%" cy="35%" r="65%">
            <stop offset="0%"  stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#5B21B6" />
          </radialGradient>
          <marker
            id="epr-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L10 5 L0 10 z" fill="var(--brand-primary)" />
          </marker>
          <marker
            id="epr-arrow-green"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L10 5 L0 10 z" fill="#7C3AED" />
          </marker>
        </defs>

        {/* Decorative concentric ambience */}
        <circle cx={CX} cy={CY} r={R + 80} fill="url(#epr-flow-bg)" />
        <circle cx={CX} cy={CY} r={R - 30} fill="none" stroke="var(--border-default)" strokeDasharray="2 6" opacity="0.55" />
        <circle cx={CX} cy={CY} r={R + 90} fill="none" stroke="var(--border-default)" strokeDasharray="2 8" opacity="0.4" />

        {/* Central core */}
        <g>
          <circle cx={CX} cy={CY} r={108} fill="var(--bg-surface)" stroke="var(--brand-primary)" strokeWidth="2" />
          <circle cx={CX} cy={CY} r={108} fill="none" stroke="var(--brand-primary)" strokeOpacity="0.25" strokeWidth="16" />
          <text x={CX} y={CY - 18} textAnchor="middle" fontSize="20" fontWeight="800" fill="var(--text-primary)" style={{ letterSpacing: '-0.02em' }}>
            Annual
          </text>
          <text x={CX} y={CY + 8} textAnchor="middle" fontSize="20" fontWeight="800" fill="var(--text-primary)" style={{ letterSpacing: '-0.02em' }}>
            Compliance
          </text>
          <text x={CX} y={CY + 34} textAnchor="middle" fontSize="20" fontWeight="800" fill="var(--text-primary)" style={{ letterSpacing: '-0.02em' }}>
            Cycle
          </text>
          <text
            x={CX} y={CY + 60}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="700"
            letterSpacing="2.4"
            fill="var(--brand-primary)"
            style={{ fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase' }}
          >
            ♻ Never Ending
          </text>
        </g>

        {/* Edges — drawn before nodes so nodes overlay any small overlap */}
        {NODES.map((n, i) => {
          const next = NODES[(i + 1) % NODES.length];
          const isGreen = n.highlight; // the edge LEAVING the green node also uses green
          return (
            <path
              key={`e-${i}`}
              d={arrowPath(n.angle, next.angle)}
              fill="none"
              stroke={isGreen ? 'url(#epr-flow-stroke-green)' : 'url(#epr-flow-stroke)'}
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeDasharray="6 8"
              markerEnd={isGreen ? 'url(#epr-arrow-green)' : 'url(#epr-arrow)'}
              className="epr-flow-edge"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          );
        })}

        {/* Nodes + labels */}
        {NODES.map((n, i) => {
          const { x, y } = nodePos(n.angle);
          const lbl = labelCentre(n.angle);
          const fill = n.highlight ? 'url(#epr-flow-node-green)' : 'url(#epr-flow-node)';
          const ring = n.highlight ? '#A78BFA' : '#60A5FA';

          // Step badge sits on the node ring, rotated 30° back from the radial direction
          // so it never sits behind the central hub.
          const a = rad(n.angle);
          const bx = x + Math.cos(a - Math.PI / 6) * (RING_R + 2);
          const by = y - Math.sin(a - Math.PI / 6) * (RING_R + 2);

          return (
            <g key={n.title} className="epr-flow-node" style={{ animationDelay: `${i * 120}ms` }}>
              <circle cx={x} cy={y} r={GLOW_R} fill={ring} opacity="0.18" />
              <circle cx={x} cy={y} r={RING_R} fill="var(--bg-surface)" stroke={ring} strokeWidth="3" />
              <circle cx={x} cy={y} r={NODE_R} fill={fill} stroke={ring} strokeWidth="2" />

              <foreignObject x={x - 22} y={y - 22} width={44} height={44}>
                <div xmlns="http://www.w3.org/1999/xhtml" style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%', color: '#fff' }}>
                  <n.Icon size={36} strokeWidth={1.6} />
                </div>
              </foreignObject>

              <StepBadge x={bx} y={by} n={i + 1} />

              <foreignObject
                x={lbl.x - LABEL_W / 2}
                y={lbl.y - LABEL_H / 2}
                width={LABEL_W}
                height={LABEL_H}
              >
                <div xmlns="http://www.w3.org/1999/xhtml" className="epr-flow-label">
                  <div className="epr-flow-label-step">Step {i + 1}</div>
                  <div className="epr-flow-label-title">{n.title}</div>
                  <div className="epr-flow-label-sub">{n.sub}</div>
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
