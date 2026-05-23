import { Truck, Brain, Database, MapPin, Leaf, ShieldCheck, BarChart3 } from 'lucide-react';

const NODES = [
  { Icon: Truck,       angle: 0,   r: 168, color: 'var(--brand-primary)',   delay: 0 },
  { Icon: Brain,       angle: 51,  r: 200, color: 'var(--brand-secondary)', delay: 0.4 },
  { Icon: Database,    angle: 102, r: 168, color: 'var(--brand-accent)',    delay: 0.8 },
  { Icon: MapPin,      angle: 154, r: 200, color: 'var(--brand-primary)',   delay: 1.2 },
  { Icon: Leaf,        angle: 205, r: 168, color: 'var(--brand-accent)',    delay: 1.6 },
  { Icon: ShieldCheck, angle: 257, r: 200, color: 'var(--brand-secondary)', delay: 2.0 },
  { Icon: BarChart3,   angle: 308, r: 168, color: 'var(--brand-primary)',   delay: 2.4 },
];

export default function HeroOrbit() {
  return (
    <div className="orbit" aria-hidden="true">
      <div className="orbit-spin">
        <svg viewBox="-240 -240 480 480" style={{ position: 'absolute', inset: 0 }}>
          <circle r="168" fill="none" stroke="var(--border-default)" strokeDasharray="2 6" />
          <circle r="200" fill="none" stroke="var(--border-default)" strokeDasharray="2 8" />
          <circle r="108" fill="none" stroke="var(--border-default)" />
        </svg>
      </div>

      <div className="orbit-center">
        <div className="orbit-core">
          <div className="orbit-core-inner">
            <span>neXgen<small>CORE</small></span>
          </div>
        </div>
      </div>

      {NODES.map((n, i) => {
        const x = Math.cos((n.angle * Math.PI) / 180) * n.r;
        const y = Math.sin((n.angle * Math.PI) / 180) * n.r;
        const Cmp = n.Icon;
        return (
          <div
            key={i}
            className="orbit-node"
            style={{
              transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
              animationDelay: `${n.delay}s`,
            }}
          >
            <Cmp size={22} style={{ color: n.color }} />
          </div>
        );
      })}
    </div>
  );
}
