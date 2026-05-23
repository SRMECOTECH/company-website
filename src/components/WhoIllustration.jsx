/**
 * Animated illustration: a stylised "globe" of latitude/longitude lines with
 * eco + tech glyphs orbiting it. Used as a beautiful default when no real
 * photograph or video is supplied for the "Who we are" section.
 */
export default function WhoIllustration() {
  const orbits = [
    { Icon: GlyphLeaf,    angle: 18,  r: 165 },
    { Icon: GlyphCpu,     angle: 95,  r: 175 },
    { Icon: GlyphRecycle, angle: 200, r: 160 },
    { Icon: GlyphSpark,   angle: 310, r: 175 },
  ];

  return (
    <svg viewBox="0 0 480 360" className="illus illus-who" role="img" aria-label="Globe with eco and tech glyphs orbiting">
      <defs>
        <radialGradient id="who-bg" cx="0.5" cy="0.5" r="0.7">
          <stop offset="0" stopColor="var(--brand-primary)" stopOpacity="0.25" />
          <stop offset="1" stopColor="var(--brand-primary)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="who-globe" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--brand-primary)" />
          <stop offset="1" stopColor="var(--brand-accent)" />
        </linearGradient>
      </defs>

      <circle cx="240" cy="180" r="180" fill="url(#who-bg)" />

      {/* dashed orbits — counter-rotating */}
      <g className="illus-spin-slow" style={{ transformOrigin: '240px 180px' }}>
        <ellipse cx="240" cy="180" rx="190" ry="64" fill="none" stroke="var(--border-strong)" strokeDasharray="3 6" opacity="0.55" />
      </g>
      <g className="illus-spin-rev" style={{ transformOrigin: '240px 180px' }}>
        <ellipse cx="240" cy="180" rx="64" ry="190" fill="none" stroke="var(--border-strong)" strokeDasharray="3 6" opacity="0.55" />
      </g>

      {/* globe */}
      <g className="illus-globe">
        <circle cx="240" cy="180" r="88" fill="none" stroke="url(#who-globe)" strokeWidth="2" />
        {/* longitudes */}
        {[0.35, 0.65, 1].map((rx, i) => (
          <ellipse key={`lon-${i}`} cx="240" cy="180" rx={88 * rx} ry="88" fill="none" stroke="url(#who-globe)" strokeWidth="1.2" opacity={0.55 - i * 0.1} />
        ))}
        {/* latitudes */}
        {[40, 70, 100, 130].map((r, i) => (
          <line key={`lat-${i}`} x1="152" y1={r + 60} x2="328" y2={r + 60} stroke="url(#who-globe)" strokeWidth="1.2" opacity={0.55 - (i % 2) * 0.2} />
        ))}
        {/* poles */}
        <circle cx="240" cy="92"  r="3" fill="var(--brand-accent)" />
        <circle cx="240" cy="268" r="3" fill="var(--brand-accent)" />
      </g>

      {/* spinning orbit ring with glyphs */}
      <g className="illus-spin" style={{ transformOrigin: '240px 180px' }}>
        {orbits.map((o, i) => {
          const x = 240 + Math.cos((o.angle * Math.PI) / 180) * o.r;
          const y = 180 + Math.sin((o.angle * Math.PI) / 180) * o.r * 0.6;
          const Cmp = o.Icon;
          return (
            <g key={i} transform={`translate(${x}, ${y})`} className="illus-glyph" style={{ animationDelay: `${i * 0.4}s` }}>
              <circle r="22" fill="var(--bg-surface)" stroke="var(--brand-primary)" strokeWidth="1.5" />
              <Cmp />
            </g>
          );
        })}
      </g>

      {/* sparkly dots */}
      {[[80, 60], [410, 90], [70, 290], [420, 280], [240, 30], [240, 340]].map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="2" fill="var(--brand-primary)" className="illus-twinkle" style={{ animationDelay: `${i * 0.3}s` }} />
      ))}
    </svg>
  );
}

function GlyphLeaf() {
  return <path d="M -8 6 C -8 -6 -2 -10 8 -8 C 8 2 2 8 -8 6 Z M -8 6 L 6 -6" fill="var(--brand-accent)" stroke="var(--brand-primary)" strokeWidth="1.2" />;
}
function GlyphCpu() {
  return (
    <g stroke="var(--brand-primary)" strokeWidth="1.5" fill="none">
      <rect x="-7" y="-7" width="14" height="14" rx="2" fill="var(--brand-primary-soft)" />
      <line x1="-7" y1="-2" x2="-10" y2="-2" /><line x1="-7" y1="2" x2="-10" y2="2" />
      <line x1="7" y1="-2" x2="10" y2="-2" /><line x1="7" y1="2" x2="10" y2="2" />
      <line x1="-2" y1="-7" x2="-2" y2="-10" /><line x1="2" y1="-7" x2="2" y2="-10" />
      <line x1="-2" y1="7" x2="-2" y2="10" /><line x1="2" y1="7" x2="2" y2="10" />
    </g>
  );
}
function GlyphRecycle() {
  return (
    <g stroke="var(--brand-primary)" strokeWidth="1.5" fill="none">
      <path d="M -6 4 L 0 -6 L 6 4 L 4 4 L 6 8 L 2 8 Z" fill="var(--brand-accent)" />
      <path d="M -8 -2 L -3 -7 L 0 -3" />
    </g>
  );
}
function GlyphSpark() {
  return (
    <g fill="var(--brand-primary)">
      <path d="M 0 -8 L 1.6 -2 L 8 0 L 1.6 2 L 0 8 L -1.6 2 L -8 0 L -1.6 -2 Z" />
    </g>
  );
}
