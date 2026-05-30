import { useEffect, useRef } from 'react';
import {
  Truck,
  Brain,
  Workflow,
  BarChart3,
  ShieldCheck,
} from 'lucide-react';

// Floating product layers — purely a brand illustration.
// Every label is a real product + its honest category. No metrics.
const LAYERS = [
  { Icon: Truck,       label: 'neXgen TMS',   sub: 'Transport management',  accent: '#06B6D4', tx: -190, ty: -130, tz:  80 },
  { Icon: Brain,       label: 'AI Studio',    sub: 'Model development',     accent: '#0891B2', tx:  150, ty: -160, tz: 110 },
  { Icon: BarChart3,   label: 'Analytics',    sub: 'Business intelligence', accent: '#22D3EE', tx: -220, ty:   40, tz: 140 },
  { Icon: ShieldCheck, label: 'neXgen IdP',   sub: 'Identity & access',     accent: '#14B8A6', tx:  190, ty:   20, tz:  60 },
  { Icon: Workflow,    label: 'ProcessFlow',  sub: 'Workflow engine',       accent: '#0E7490', tx:  130, ty:  170, tz:  90 },
];

export default function HeroVisual() {
  const sceneRef = useRef(null);

  // Subtle pointer-parallax — moves the whole scene a few degrees.
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return undefined;
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (window.matchMedia('(hover: none)').matches) return undefined; // skip on touch

    let raf = 0;
    function onMove(e) {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', dx.toFixed(3));
        el.style.setProperty('--my', dy.toFixed(3));
      });
    }
    function onLeave() {
      el.style.setProperty('--mx', '0');
      el.style.setProperty('--my', '0');
    }
    window.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className="fx" ref={sceneRef} aria-hidden="true">
      <div className="fx-aura fx-aura-a" />
      <div className="fx-aura fx-aura-b" />

      <div className="fx-scene">
        {/* Perspective grid floor */}
        <div className="fx-floor">
          <div className="fx-grid" />
          <div className="fx-floor-glow" />
        </div>

        {/* Ascending particles */}
        <div className="fx-particles" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className="fx-particle" style={{ '--i': i }} />
          ))}
        </div>

        {/* Floating brand mark — no slab, just gradient text */}
        <div className="fx-mark">
          <span className="fx-mark-name">neXgen</span>
          <span className="fx-mark-sub">SUITE</span>
        </div>

        {/* Floating product layers */}
        {LAYERS.map((l, i) => {
          const Cmp = l.Icon;
          return (
            <div
              key={l.label}
              className="fx-card"
              style={{
                '--accent': l.accent,
                '--i': i,
                '--tx': `${l.tx}px`,
                '--ty': `${l.ty}px`,
                '--tz': `${l.tz}px`,
              }}
            >
              <div className="fx-card-face">
                <div className="fx-card-icon"><Cmp size={20} strokeWidth={2.3} /></div>
                <div className="fx-card-text">
                  <span className="fx-card-label">{l.label}</span>
                  <span className="fx-card-sub">{l.sub}</span>
                </div>
                <span className="fx-card-corner" />
              </div>
              <div className="fx-card-glow" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
