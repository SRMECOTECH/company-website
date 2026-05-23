/**
 * Animated illustration: a stylised "dashboard" of stacked window panels —
 * a code editor, a live chart, and a notification card — with live data
 * animating across them. Default fallback for the "What we do" section.
 */
export default function WhatIllustration() {
  return (
    <svg viewBox="0 0 480 360" className="illus illus-what" role="img" aria-label="Floating dashboard panels with live data">
      <defs>
        <linearGradient id="what-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--brand-secondary)" stopOpacity="0.18" />
          <stop offset="1" stopColor="var(--brand-primary)" stopOpacity="0.0" />
        </linearGradient>
        <linearGradient id="what-bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="var(--brand-primary)" stopOpacity="0.25" />
          <stop offset="1" stopColor="var(--brand-primary)" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="480" height="360" fill="url(#what-bg)" />

      {/* back panel — code editor */}
      <g className="illus-panel illus-panel-back" style={{ transformOrigin: '110px 130px' }}>
        <rect x="40" y="60" width="240" height="160" rx="14" fill="var(--bg-surface)" stroke="var(--border-default)" />
        {/* window dots */}
        <circle cx="56" cy="76" r="3.5" fill="#FF5F57" />
        <circle cx="68" cy="76" r="3.5" fill="#FEBC2E" />
        <circle cx="80" cy="76" r="3.5" fill="#28C840" />
        {/* code lines */}
        {[
          [56, 96, 80], [56, 108, 140], [76, 120, 110], [56, 132, 180],
          [76, 144, 90], [56, 156, 160], [76, 168, 70], [56, 180, 200],
          [56, 192, 130],
        ].map(([x, y, w], i) => (
          <rect key={i} x={x} y={y} width={w} height="5" rx="2"
            fill={i % 3 === 0 ? 'var(--brand-primary)' : i % 3 === 1 ? 'var(--text-secondary)' : 'var(--brand-secondary)'}
            opacity={0.55 + (i % 3) * 0.2}
            className="illus-codeline" style={{ animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </g>

      {/* front panel — live chart card */}
      <g className="illus-panel illus-panel-front" style={{ transformOrigin: '320px 250px' }}>
        <rect x="200" y="170" width="240" height="150" rx="14" fill="var(--bg-surface)" stroke="var(--brand-primary)" strokeWidth="1.5" />
        {/* header */}
        <rect x="216" y="186" width="80" height="6" rx="2" fill="var(--text-primary)" />
        <rect x="216" y="200" width="48" height="4" rx="1" fill="var(--text-muted)" />
        {/* live pill */}
        <rect x="392" y="184" width="36" height="14" rx="7" fill="var(--brand-primary-soft)" stroke="var(--brand-primary)" />
        <circle cx="400" cy="191" r="2.5" fill="var(--brand-primary)" className="illus-live-dot" />
        <text x="408" y="194" style={{ fontSize: 8, fontWeight: 700, fill: 'var(--brand-primary)' }}>LIVE</text>
        {/* bars */}
        {[28, 56, 36, 72, 44, 88, 60].map((h, i) => (
          <rect key={i}
            x={216 + i * 30}
            y={300 - h}
            width="20" height={h} rx="3"
            fill="url(#what-bar)"
            className="illus-bar" style={{ animationDelay: `${i * 0.1}s`, transformOrigin: `${226 + i * 30}px 300px` }}
          />
        ))}
        {/* sparkline */}
        <polyline
          points="226,260 256,232 286,250 316,216 346,234 376,200 406,216"
          fill="none" stroke="var(--brand-accent)" strokeWidth="2" strokeLinecap="round"
          pathLength="100"
          className="illus-spark"
        />
      </g>

      {/* floating notification chip */}
      <g className="illus-toast" style={{ transformOrigin: '380px 80px' }}>
        <rect x="290" y="50" width="170" height="46" rx="12" fill="var(--bg-surface)" stroke="var(--brand-primary)" strokeWidth="1.4" />
        <circle cx="312" cy="73" r="10" fill="var(--brand-primary-soft)" stroke="var(--brand-primary)" />
        <path d="M 308 73 L 312 77 L 318 70" fill="none" stroke="var(--brand-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="330" y="62" width="100" height="6" rx="2" fill="var(--text-primary)" />
        <rect x="330" y="74" width="74"  height="4" rx="1" fill="var(--text-muted)" />
      </g>

      {/* floating cursor */}
      <g className="illus-cursor">
        <path d="M 0 0 L 0 18 L 5 14 L 8 20 L 11 19 L 8 13 L 14 13 Z" fill="var(--brand-primary)" stroke="var(--bg-surface)" strokeWidth="1" />
      </g>

      {/* twinkles */}
      {[[60, 40], [430, 40], [60, 330], [430, 320]].map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="2" fill="var(--brand-primary)" className="illus-twinkle" style={{ animationDelay: `${i * 0.3}s` }} />
      ))}
    </svg>
  );
}
