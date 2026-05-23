import { CLIENTS } from '../data/clients.js';

export default function MarqueeLogos() {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <div className="marquee" aria-label="Trusted clients">
      <div className="marquee-track">
        {row.map((c, i) => (
          <div key={i} style={{ flexShrink: 0, display: 'grid', placeItems: 'center', width: 160, height: 64 }}>
            <img src={c.logo} alt={c.name} className="logo-mono" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}
