/**
 * Bespoke per-product animated SVG visuals.
 * Each visual has an ambient idle animation; cards add a hover-state amplifier via CSS.
 */

const COMMON = { width: '100%', height: '100%', viewBox: '0 0 200 120', preserveAspectRatio: 'xMidYMid meet' };

export default function ProductVisual({ slug, className = '' }) {
  switch (slug) {
    case 'nexgen-tms':         return <TMS className={className} />;
    case 'nexgen-processflow': return <ProcessFlow className={className} />;
    case 'nexgen-ai-studio':   return <AIStudio className={className} />;
    case 'nexgen-analytics':   return <Analytics className={className} />;
    case 'nexgen-billing':     return <Billing className={className} />;
    case 'nexgen-chatbot':     return <Chatbot className={className} />;
    case 'nexgen-integration': return <Integration className={className} />;
    case 'nexgen-idp':         return <IdP className={className} />;
    case 'nexgen-ap':          return <AP className={className} />;
    case 'nexgen-helpdesk':    return <Helpdesk className={className} />;
    default:                   return <Default className={className} />;
  }
}

/* 1. TMS — truck rolling along a wavy road, with snap-to-road points pinging */
function TMS({ className }) {
  return (
    <svg {...COMMON} className={`pv pv-tms ${className}`} role="img" aria-label="Truck moving along a route">
      <defs>
        <linearGradient id="tms-road" x1="0" x2="1">
          <stop offset="0" stopColor="var(--brand-primary)" />
          <stop offset="1" stopColor="var(--brand-accent)" />
        </linearGradient>
      </defs>
      <path d="M 5 80 Q 50 30, 100 70 T 195 60" stroke="var(--border-strong)" strokeWidth="2" strokeDasharray="3 4" fill="none" />
      <path d="M 5 80 Q 50 30, 100 70 T 195 60" stroke="url(#tms-road)" strokeWidth="2.5" fill="none" pathLength="100" className="pv-route" />
      {[18, 52, 90, 130, 170].map((cx, i) => (
        <circle key={i} cx={cx} cy={cx === 18 ? 75 : cx === 52 ? 48 : cx === 90 ? 68 : cx === 130 ? 70 : 62} r="2.5" fill="var(--brand-primary)" className="pv-ping" style={{ animationDelay: `${i * 0.4}s` }} />
      ))}
      {/* Truck */}
      <g className="pv-truck">
        <rect x="-22" y="-14" width="20" height="14" rx="2" fill="var(--bg-surface)" stroke="var(--brand-primary)" strokeWidth="1.5" />
        <rect x="-2" y="-10" width="10" height="10" rx="1" fill="var(--brand-primary)" />
        <circle cx="-16" cy="2" r="3" fill="var(--text-primary)" />
        <circle cx="3" cy="2" r="3" fill="var(--text-primary)" />
      </g>
    </svg>
  );
}

/* 2. ProcessFlow — nodes connected by flowing dashed lines */
function ProcessFlow({ className }) {
  return (
    <svg {...COMMON} className={`pv pv-flow ${className}`} role="img" aria-label="Workflow steps with flowing connectors">
      <defs>
        <marker id="pf-arrow" viewBox="0 0 6 6" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M 0 0 L 6 3 L 0 6 z" fill="var(--brand-primary)" />
        </marker>
      </defs>
      {[
        { x: 28, y: 30 }, { x: 100, y: 30 }, { x: 172, y: 30 },
        { x: 28, y: 90 }, { x: 100, y: 90 }, { x: 172, y: 90 },
      ].map((n, i) => (
        <g key={i}>
          <rect x={n.x - 14} y={n.y - 10} width="28" height="20" rx="6" fill="var(--bg-surface)" stroke="var(--brand-primary)" strokeWidth="1.4" />
          <circle cx={n.x} cy={n.y} r="2" fill="var(--brand-primary)" className="pv-node-dot" style={{ animationDelay: `${i * 0.18}s` }} />
        </g>
      ))}
      <path d="M 42 30 L 86 30" stroke="var(--brand-primary)" strokeWidth="1.5" strokeDasharray="4 3" className="pv-dash" markerEnd="url(#pf-arrow)" />
      <path d="M 114 30 L 158 30" stroke="var(--brand-primary)" strokeWidth="1.5" strokeDasharray="4 3" className="pv-dash" style={{ animationDelay: '0.3s' }} markerEnd="url(#pf-arrow)" />
      <path d="M 172 40 Q 190 60, 172 80" stroke="var(--brand-primary)" strokeWidth="1.5" strokeDasharray="4 3" className="pv-dash" style={{ animationDelay: '0.6s' }} markerEnd="url(#pf-arrow)" />
      <path d="M 158 90 L 114 90" stroke="var(--brand-primary)" strokeWidth="1.5" strokeDasharray="4 3" className="pv-dash" style={{ animationDelay: '0.9s' }} markerEnd="url(#pf-arrow)" />
      <path d="M 86 90 L 42 90" stroke="var(--brand-primary)" strokeWidth="1.5" strokeDasharray="4 3" className="pv-dash" style={{ animationDelay: '1.2s' }} markerEnd="url(#pf-arrow)" />
    </svg>
  );
}

/* 3. AI Studio — neural network nodes with travelling pulses */
function AIStudio({ className }) {
  const layers = [[40], [80, 60], [100, 40, 70], [80, 30, 50, 70], [55, 65]];
  // x columns
  const cols = [22, 65, 105, 145, 180];
  return (
    <svg {...COMMON} className={`pv pv-ai ${className}`} role="img" aria-label="Neural network firing">
      {/* edges */}
      {layers.slice(0, -1).map((layer, li) =>
        layer.flatMap((_, ni) =>
          layers[li + 1].map((_, mi) => {
            const y1 = nodeY(layers[li], ni);
            const y2 = nodeY(layers[li + 1], mi);
            return (
              <line
                key={`${li}-${ni}-${mi}`}
                x1={cols[li]} y1={y1} x2={cols[li + 1]} y2={y2}
                stroke="var(--border-strong)" strokeWidth="0.6" opacity="0.7"
              />
            );
          })
        )
      )}
      {/* travelling pulses */}
      {[0, 0.5, 1.0, 1.5].map((d, i) => (
        <circle key={i} r="2.4" fill="var(--brand-primary)" className="pv-ai-pulse" style={{ animationDelay: `${d}s` }}>
          <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${d}s`}>
            <mpath href={`#ai-path-${i % 3}`} />
          </animateMotion>
        </circle>
      ))}
      <path id="ai-path-0" d={`M ${cols[0]} 50 L ${cols[1]} 70 L ${cols[2]} 40 L ${cols[3]} 50 L ${cols[4]} 65`} fill="none" />
      <path id="ai-path-1" d={`M ${cols[0]} 50 L ${cols[1]} 50 L ${cols[2]} 70 L ${cols[3]} 70 L ${cols[4]} 55`} fill="none" />
      <path id="ai-path-2" d={`M ${cols[0]} 50 L ${cols[1]} 60 L ${cols[2]} 60 L ${cols[3]} 40 L ${cols[4]} 55`} fill="none" />
      {/* nodes */}
      {layers.map((layer, li) =>
        layer.map((_, ni) => (
          <circle
            key={`${li}-${ni}`}
            cx={cols[li]} cy={nodeY(layer, ni)} r="3.5"
            fill="var(--bg-surface)" stroke="var(--brand-primary)" strokeWidth="1.4"
            className="pv-ai-node" style={{ animationDelay: `${(li * 0.15 + ni * 0.07)}s` }}
          />
        ))
      )}
    </svg>
  );
  function nodeY(layer, idx) {
    const total = layer.length;
    const gap = 14;
    const start = 60 - ((total - 1) * gap) / 2;
    return start + idx * gap;
  }
}

/* 4. Analytics — bars rising + sparkline drawing */
function Analytics({ className }) {
  const bars = [42, 28, 58, 36, 70, 50, 84];
  return (
    <svg {...COMMON} className={`pv pv-bars ${className}`} role="img" aria-label="Bars rising and trend line drawing">
      <defs>
        <linearGradient id="bar-g" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="var(--brand-primary)" stopOpacity="0.25" />
          <stop offset="1" stopColor="var(--brand-primary)" />
        </linearGradient>
      </defs>
      <line x1="14" y1="100" x2="186" y2="100" stroke="var(--border-strong)" strokeWidth="0.8" />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={20 + i * 24}
          y={100 - h}
          width="14" height={h}
          rx="3"
          fill="url(#bar-g)"
          className="pv-bar"
          style={{ animationDelay: `${i * 0.08}s`, transformOrigin: `${27 + i * 24}px 100px` }}
        />
      ))}
      <path
        d={bars.map((h, i) => `${i === 0 ? 'M' : 'L'} ${27 + i * 24} ${100 - h - 8}`).join(' ')}
        fill="none" stroke="var(--brand-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        pathLength="100" className="pv-spark"
      />
      {bars.map((h, i) => (
        <circle key={i} cx={27 + i * 24} cy={100 - h - 8} r="2" fill="var(--brand-accent)" className="pv-spark-dot" style={{ animationDelay: `${0.6 + i * 0.08}s` }} />
      ))}
    </svg>
  );
}

/* 5. Billing — invoice printing out of a printer */
function Billing({ className }) {
  return (
    <svg {...COMMON} className={`pv pv-bill ${className}`} role="img" aria-label="Invoice line items printing">
      <rect x="50" y="14" width="100" height="92" rx="6" fill="var(--bg-surface)" stroke="var(--brand-primary)" strokeWidth="1.5" />
      <rect x="58" y="24" width="40" height="6" rx="2" fill="var(--brand-primary)" opacity="0.6" />
      <rect x="58" y="36" width="84" height="3" rx="1" fill="var(--border-strong)" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} className="pv-line" style={{ animationDelay: `${0.2 + i * 0.18}s` }}>
          <rect x="58" y={46 + i * 11} width="62" height="3" rx="1" fill="var(--text-secondary)" opacity="0.55" />
          <rect x="124" y={46 + i * 11} width="18" height="3" rx="1" fill="var(--brand-primary)" />
        </g>
      ))}
      <rect x="58" y="94" width="84" height="6" rx="2" fill="var(--brand-primary-soft)" stroke="var(--brand-primary)" strokeDasharray="2 2" className="pv-bill-total" />
      <text x="62" y="98.5" fill="var(--brand-primary)" style={{ fontSize: 5, fontWeight: 700 }}>TOTAL</text>
    </svg>
  );
}

/* 6. Chatbot — speech bubbles + typing dots */
function Chatbot({ className }) {
  return (
    <svg {...COMMON} className={`pv pv-chat ${className}`} role="img" aria-label="Chat bubbles with typing">
      {/* customer bubble */}
      <g className="pv-bubble-a">
        <rect x="18" y="22" width="80" height="28" rx="10" fill="var(--bg-surface-2)" stroke="var(--border-strong)" />
        <path d="M 28 50 L 22 56 L 34 50 z" fill="var(--bg-surface-2)" stroke="var(--border-strong)" />
        <rect x="26" y="30" width="50" height="3" rx="1" fill="var(--text-secondary)" />
        <rect x="26" y="38" width="36" height="3" rx="1" fill="var(--text-secondary)" opacity="0.6" />
      </g>
      {/* bot bubble */}
      <g className="pv-bubble-b">
        <rect x="98" y="68" width="84" height="28" rx="10" fill="var(--brand-primary)" />
        <path d="M 172 96 L 178 102 L 166 96 z" fill="var(--brand-primary)" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={114 + i * 12} cy="82" r="3" fill="white" className="pv-typing" style={{ animationDelay: `${i * 0.18}s` }} />
        ))}
      </g>
    </svg>
  );
}

/* 7. Integration — two plugs coming together with a spark */
function Integration({ className }) {
  return (
    <svg {...COMMON} className={`pv pv-plug ${className}`} role="img" aria-label="Plugs connecting">
      <g className="pv-plug-l">
        <rect x="14" y="46" width="56" height="28" rx="6" fill="var(--bg-surface)" stroke="var(--brand-primary)" strokeWidth="1.5" />
        <rect x="70" y="52" width="14" height="6" fill="var(--brand-primary)" />
        <rect x="70" y="62" width="14" height="6" fill="var(--brand-primary)" />
        <text x="22" y="65" fill="var(--brand-primary)" style={{ fontSize: 8, fontWeight: 800 }}>API</text>
      </g>
      <g className="pv-plug-r">
        <rect x="130" y="46" width="56" height="28" rx="6" fill="var(--bg-surface)" stroke="var(--brand-secondary)" strokeWidth="1.5" />
        <rect x="116" y="52" width="14" height="6" fill="var(--brand-secondary)" />
        <rect x="116" y="62" width="14" height="6" fill="var(--brand-secondary)" />
        <text x="142" y="65" fill="var(--brand-secondary)" style={{ fontSize: 8, fontWeight: 800 }}>ERP</text>
      </g>
      <g className="pv-spark-burst" transform="translate(100,60)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
          <line key={i} x1="0" y1="0" x2={Math.cos((a * Math.PI) / 180) * 10} y2={Math.sin((a * Math.PI) / 180) * 10}
            stroke="var(--brand-accent)" strokeWidth="1.5" strokeLinecap="round" />
        ))}
        <circle r="5" fill="var(--brand-accent)" />
      </g>
    </svg>
  );
}

/* 8. IdP — shield drawing in, then check mark */
function IdP({ className }) {
  return (
    <svg {...COMMON} className={`pv pv-idp ${className}`} role="img" aria-label="Shield with checkmark">
      <path
        d="M 100 12 L 150 30 V 60 C 150 80 130 100 100 110 C 70 100 50 80 50 60 V 30 Z"
        fill="var(--brand-primary-soft)" stroke="var(--brand-primary)" strokeWidth="2"
        pathLength="100" className="pv-shield"
      />
      <path d="M 80 60 L 96 76 L 124 48" fill="none" stroke="var(--brand-primary)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" pathLength="100" className="pv-check" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx="100" cy="60" r={26 + i * 14} fill="none" stroke="var(--brand-primary)" strokeOpacity="0.18" className="pv-idp-ring" style={{ animationDelay: `${i * 0.6}s` }} />
      ))}
    </svg>
  );
}

/* 9. AP — wallet with coins dropping in */
function AP({ className }) {
  return (
    <svg {...COMMON} className={`pv pv-ap ${className}`} role="img" aria-label="Coins dropping into a wallet">
      {/* coins falling */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} className="pv-coin" style={{ animationDelay: `${i * 0.4}s` }}>
          <circle cx={70 + i * 22} cy="0" r="6" fill="var(--brand-accent)" stroke="var(--brand-primary)" strokeWidth="1" />
          <text x={70 + i * 22} y="3" textAnchor="middle" fill="white" style={{ fontSize: 7, fontWeight: 800 }}>₹</text>
        </g>
      ))}
      {/* wallet body */}
      <rect x="40" y="60" width="120" height="50" rx="8" fill="var(--bg-surface)" stroke="var(--brand-primary)" strokeWidth="1.5" />
      <rect x="40" y="55" width="120" height="14" rx="6" fill="var(--brand-primary)" />
      <circle cx="142" cy="86" r="4" fill="var(--brand-primary)" />
      <rect x="40" y="68" width="120" height="3" fill="rgba(0,0,0,0.1)" />
    </svg>
  );
}

/* 10. Helpdesk — headset with radiating sound rings */
function Helpdesk({ className }) {
  return (
    <svg {...COMMON} className={`pv pv-hd ${className}`} role="img" aria-label="Headset with sound rings">
      {/* rings */}
      {[0, 1, 2].map((i) => (
        <circle key={i} cx="100" cy="62" r="24" fill="none" stroke="var(--brand-primary)" strokeOpacity="0.4" className="pv-hd-ring" style={{ animationDelay: `${i * 0.7}s` }} />
      ))}
      {/* headset arc */}
      <path d="M 60 60 Q 100 20, 140 60" fill="none" stroke="var(--brand-primary)" strokeWidth="3" strokeLinecap="round" />
      {/* ear cups */}
      <rect x="50" y="58" width="20" height="28" rx="6" fill="var(--brand-primary)" />
      <rect x="130" y="58" width="20" height="28" rx="6" fill="var(--brand-primary)" />
      {/* mic */}
      <path d="M 70 82 Q 90 100, 100 92" fill="none" stroke="var(--brand-primary)" strokeWidth="2" />
      <circle cx="100" cy="92" r="3" fill="var(--brand-accent)" />
    </svg>
  );
}

/* fallback */
function Default({ className }) {
  return (
    <svg {...COMMON} className={`pv ${className}`} role="img" aria-label="Product">
      <circle cx="100" cy="60" r="36" fill="var(--brand-primary-soft)" stroke="var(--brand-primary)" />
    </svg>
  );
}
