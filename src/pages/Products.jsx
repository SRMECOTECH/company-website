import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';
import ProductModal from '../components/ProductModal.jsx';
import CTABanner from '../components/CTABanner.jsx';
import Reveal from '../components/Reveal.jsx';
import Counter from '../components/Counter.jsx';
import { PRODUCTS, CATEGORIES } from '../data/products.js';
import { googleCalendarUrl } from '../lib/calendar.js';

export default function Products() {
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(null);

  const items = useMemo(
    () => filter === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter),
    [filter]
  );

  return (
    <>
      {/* Hero */}
      <section className="hero" style={{ paddingTop: 132, paddingBottom: 80 }}>
        <div className="hero-grid" />
        <div className="orb" style={{ top: -180, left: -120, width: 420, height: 420, background: 'radial-gradient(circle, var(--brand-primary), transparent 60%)' }} />
        <div className="orb" style={{ bottom: -220, right: -160, width: 480, height: 480, background: 'radial-gradient(circle, var(--brand-secondary), transparent 60%)', animationDelay: '-8s' }} />
        <div className="container" style={{ position: 'relative', maxWidth: 880 }}>
          <Reveal><span className="eyebrow">The neXgen Suite</span></Reveal>
          <Reveal delay={80}>
            <h1 className="display-xl mt-5">
              One platform. Ten products. <span className="text-flow">Infinite possibilities.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="body-lg mt-6">
              Purpose-built, AI-first products that snap together to power your entire enterprise stack — from logistics and analytics to identity and accounts payable.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="flex gap-3 mt-8" style={{ flexWrap: 'wrap' }}>
              <a href="#suite" className="btn btn-primary btn-lg">Explore the Suite <ArrowRight size={16} /></a>
              <a
                href={googleCalendarUrl({ title: 'Demo · neXgen Suite', details: 'Product walkthrough of the neXgen Suite from SRM ECO TECH.' })}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg"
              >
                <Calendar size={16} /> Schedule a Demo
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Filter bar */}
      <div className="filter-bar" id="suite">
        <div className="container filter-row">
          <span className="body-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.14em', marginRight: 8 }}>Filter</span>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={`chip ${filter === c ? 'active' : ''}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="section">
        <div className="container">
          <div className="grid-3" style={{ gap: 24 }}>
            {items.map((p, i) => (
              <div
                key={p.slug}
                id={p.slug}
                style={{ scrollMarginTop: 140, animation: `word-in 520ms cubic-bezier(0.16,1,0.3,1) ${(i % 6) * 60}ms both` }}
              >
                <ProductCard product={p} onOpen={() => setOpen(p)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why neXgen stats */}
      <section className="section bordered" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <Reveal><span className="eyebrow">Why neXgen</span></Reveal>
          <Reveal delay={80}><h2 className="display-md mt-4 max-w-2xl">The numbers behind the suite.</h2></Reveal>
          <div className="stats mt-12">
            {[
              { v: 99.9, suffix: '%', l: 'platform uptime', decimals: 1 },
              { v: 500, suffix: '+', l: 'enterprise clients' },
              { v: 10, suffix: '', l: 'integrated modules' },
              { v: 24, suffix: '/7', l: 'global support' },
            ].map((s) => (
              <div key={s.l}>
                <div className="stat-value"><Counter to={s.v} suffix={s.suffix} decimals={s.decimals || 0} /></div>
                <p className="stat-label">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration diagram */}
      <section className="section">
        <div className="container">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Integration</span>
            <h2 className="display-md mt-4">Every product talks to every other.</h2>
            <p className="body-lg mt-4">
              A common event bus, shared identity, and unified observability mean the suite behaves as one product —
              with the autonomy to pick only what you need.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="diagram-wrap mt-14">
              <svg viewBox="0 0 400 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                {Array.from({ length: 10 }).map((_, i) => {
                  const angle = (i * 36 * Math.PI) / 180;
                  const x = 200 + Math.cos(angle) * 160;
                  const y = 200 + Math.sin(angle) * 160;
                  return (
                    <g key={i}>
                      <line x1="200" y1="200" x2={x} y2={y} stroke="var(--border-default)" strokeDasharray="4 6">
                        <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="3s" repeatCount="indefinite" />
                      </line>
                      <circle cx={x} cy={y} r="22" fill="var(--bg-surface)" stroke="var(--brand-primary)" />
                      <text x={x} y={y + 4} textAnchor="middle" style={{ fontSize: 9, fontWeight: 700, fill: 'var(--text-primary)' }}>
                        {PRODUCTS[i]?.name.replace('neXgen ', '')}
                      </text>
                    </g>
                  );
                })}
                <circle cx="200" cy="200" r="50" fill="var(--brand-primary)" />
                <text x="200" y="198" textAnchor="middle" style={{ fontSize: 12, fontWeight: 800, fill: '#fff' }}>neXgen</text>
                <text x="200" y="214" textAnchor="middle" style={{ fontSize: 8, fontWeight: 700, letterSpacing: 2, fill: '#fff' }}>CORE</text>
              </svg>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABanner
        eyebrow="See it live"
        title="Book a 30-minute product walkthrough."
        body="Pick the products that matter to you. We'll demo the actual production system — not slides."
      />

      <ProductModal product={open} onClose={() => setOpen(null)} />
    </>
  );
}
