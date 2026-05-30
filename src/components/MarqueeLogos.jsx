import { CLIENTS } from '../data/clients.js';

export default function MarqueeLogos({ size = 'md' }) {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <div className={`marquee marquee-${size}`} aria-label="Trusted clients">
      <div className="marquee-track">
        {row.map((c, i) => (
          <div key={i} className="marquee-cell">
            <img
              src={c.logo}
              alt={c.name}
              className="logo-mono"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
