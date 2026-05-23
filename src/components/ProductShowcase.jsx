import { useEffect, useRef } from 'react';
import { Truck, Brain, Database, Workflow, Leaf, ShieldCheck, BarChart3, Cpu } from 'lucide-react';

const CARDS = [
  { Icon: Truck,       label: 'neXgen TMS',         meta: 'Fleet · Live GPS',     color: 'var(--brand-primary)',   x: -120, y: -160, delay: 0    },
  { Icon: Brain,       label: 'AI Studio',          meta: 'AutoML · Models',      color: 'var(--brand-secondary)', x:  130, y: -180, delay: 120  },
  { Icon: Workflow,    label: 'ProcessFlow',        meta: 'No-code · SLAs',       color: 'var(--brand-accent)',    x: -180, y:   30, delay: 240  },
  { Icon: BarChart3,   label: 'Analytics',          meta: 'BI · Lakehouse',       color: 'var(--brand-primary)',   x:  170, y:   40, delay: 360  },
  { Icon: Leaf,        label: 'EPR Suite',          meta: 'CPCB · Compliance',    color: 'var(--brand-accent)',    x:  -90, y:  180, delay: 480  },
  { Icon: ShieldCheck, label: 'neXgen IdP',         meta: 'Auth · Audit',         color: 'var(--brand-secondary)', x:  120, y:  200, delay: 600  },
];

export default function ProductShowcase() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let raf = 0;
    function onMove(e) {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const px = (e.clientX - cx) / rect.width;
      const py = (e.clientY - cy) / rect.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--px', px.toFixed(3));
        el.style.setProperty('--py', py.toFixed(3));
      });
    }
    function onLeave() {
      el.style.setProperty('--px', '0');
      el.style.setProperty('--py', '0');
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
    <div className="showcase" ref={ref} aria-hidden="true">
      <svg className="showcase-rings" viewBox="-260 -260 520 520" preserveAspectRatio="xMidYMid meet">
        <circle r="120" fill="none" stroke="var(--border-default)" />
        <circle r="180" fill="none" stroke="var(--border-default)" strokeDasharray="2 6" />
        <circle r="240" fill="none" stroke="var(--border-default)" strokeDasharray="2 10" opacity="0.6" />
      </svg>

      <div className="showcase-core">
        <div className="showcase-core-inner">
          <span className="showcase-core-label">neXgen</span>
          <span className="showcase-core-sub">PLATFORM</span>
        </div>
        <span className="showcase-core-ring showcase-core-ring-a" />
        <span className="showcase-core-ring showcase-core-ring-b" />
      </div>

      {CARDS.map((c, i) => {
        const Cmp = c.Icon;
        return (
          <div
            key={i}
            className="showcase-card"
            style={{
              '--tx': `${c.x}px`,
              '--ty': `${c.y}px`,
              '--delay': `${c.delay}ms`,
              '--depth': (i % 3) + 1,
            }}
          >
            <div className="showcase-card-icon" style={{ color: c.color }}><Cmp size={18} /></div>
            <div>
              <div className="showcase-card-label">{c.label}</div>
              <div className="showcase-card-meta">{c.meta}</div>
            </div>
            <span className="showcase-card-dot" style={{ background: c.color }} />
          </div>
        );
      })}

      <svg className="showcase-wires" viewBox="-260 -260 520 520" preserveAspectRatio="xMidYMid meet">
        {CARDS.map((c, i) => (
          <line
            key={i}
            x1="0" y1="0"
            x2={c.x} y2={c.y}
            stroke="url(#wire-grad)"
            strokeWidth="1"
            strokeDasharray="2 6"
            opacity="0.45"
          />
        ))}
        <defs>
          <linearGradient id="wire-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--brand-primary)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--brand-secondary)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
