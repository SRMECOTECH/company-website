import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Quote } from 'lucide-react';
import Hero from '../components/Hero.jsx';
import MarqueeLogos from '../components/MarqueeLogos.jsx';
import CTABanner from '../components/CTABanner.jsx';
import Reveal, { Stagger } from '../components/Reveal.jsx';
import Counter from '../components/Counter.jsx';
import Icon from '../components/Icon.jsx';
import TellSection, { WHO_DEFAULTS, WHAT_DEFAULTS } from '../components/TellSection.jsx';
import { SERVICES } from '../data/services.js';
import { PRODUCTS } from '../data/products.js';
import { PROJECTS } from '../data/projects.js';
import { TESTIMONIALS } from '../data/clients.js';

// To swap the animated illustration for a real photo / mp4, drop a file at
//   public/images/who-we-are.jpg  /  public/images/what-we-do.jpg
// and uncomment the lines below.
// const WHO_MEDIA = '/images/who-we-are.jpg';
// const WHAT_MEDIA = '/images/what-we-do.jpg';

export default function Home() {
  return (
    <>
      <Hero />

      {/* Trust strip */}
      <section className="bordered" style={{ background: 'var(--bg-surface)' }}>
        <div className="container flex items-center gap-6" style={{ paddingBlock: 24, flexWrap: 'wrap' }}>
          <p className="body-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.16em', flexShrink: 0 }}>
            Trusted by teams shipping into production
          </p>
          <div style={{ flex: '1 1 320px', minWidth: 0 }}>
            <MarqueeLogos />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container">
          <Reveal><span className="eyebrow">What we do</span></Reveal>
          <Reveal delay={80}>
            <h2 className="display-md mt-4 max-w-3xl">
              Engineering across the full stack — software, data, AI, geospatial & compliance.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="body-lg mt-4 max-w-3xl">
              We bring product engineers, data engineers, ML researchers and compliance specialists into a single team — so the line between “tech” and “outcome” never blurs.
            </p>
          </Reveal>

          <Stagger className="grid-3 mt-12">
            {SERVICES.slice(0, 6).map((s) => (
              <article key={s.id} className="card card-interactive">
                <div className="icon-tile-grad"><Icon name={s.icon} size={24} /></div>
                <h3 className="heading-lg mt-5">{s.title}</h3>
                <p className="body-md mt-2">{s.description}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {s.bullets.slice(0, 3).map((b) => (
                    <li key={b} className="flex items-start gap-2" style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>
                      <CheckCircle2 size={14} style={{ color: 'var(--brand-primary)', marginTop: 3, flexShrink: 0 }} /> <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link to={`/services#${s.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 18, color: 'var(--brand-primary)', fontWeight: 600, fontSize: 14 }}>
                  Learn more <ArrowRight size={14} />
                </Link>
              </article>
            ))}
          </Stagger>

          <Reveal delay={120}>
            <div className="flex justify-center mt-10">
              <Link to="/services" className="btn btn-outline">See all 8 capabilities <ArrowRight size={16} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Who we are */}
      <TellSection variant="who" {...WHO_DEFAULTS} />

      {/* What we do (image on the left, text on the right) */}
      <TellSection variant="what" reverse background="surface" {...WHAT_DEFAULTS} />

      {/* Stats */}
      <section className="bordered" style={{ background: 'var(--bg-surface)' }}>
        <div className="container" style={{ paddingBlock: 56 }}>
          <Stagger className="stats">
            {[
              { v: 50, suffix: 'M+', l: 'GPS pings processed daily' },
              { v: 99.95, suffix: '%', l: 'pipeline uptime SLA', decimals: 2 },
              { v: 60, suffix: '+', l: 'live ML models in prod' },
              { v: 12, suffix: '+', l: 'enterprise customers' },
            ].map((s) => (
              <div key={s.l}>
                <div className="stat-value"><Counter to={s.v} suffix={s.suffix} decimals={s.decimals || 0} /></div>
                <p className="stat-label">{s.l}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Products preview */}
      <section className="section">
        <div className="container">
          <div className="flex items-start justify-between" style={{ flexWrap: 'wrap', gap: 16 }}>
            <div className="max-w-xl">
              <Reveal><span className="eyebrow">neXgen Suite</span></Reveal>
              <Reveal delay={80}><h2 className="display-md mt-4">Ten modular products. Infinite possibilities.</h2></Reveal>
            </div>
            <Reveal delay={140}>
              <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--brand-primary)', fontWeight: 600 }}>
                View all products <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>

          <Stagger className="grid-4 mt-12">
            {PRODUCTS.slice(0, 4).map((p) => (
              <Link key={p.slug} to={`/products#${p.slug}`}>
                <article className="card card-interactive h-full flex flex-col gap-4">
                  <div className="icon-tile-grad" style={{ width: 48, height: 48 }}><Icon name={p.icon} size={22} /></div>
                  <div>
                    <span className="pill pill-brand">{p.category}</span>
                    <h3 className="heading-md mt-2">{p.name}</h3>
                    <p className="body-sm mt-2">{p.tagline}</p>
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 'auto', color: 'var(--brand-primary)', fontWeight: 600, fontSize: 13.5 }}>
                    Explore <ArrowRight size={14} />
                  </span>
                </article>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Projects preview */}
      <section className="section bordered" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <Reveal><span className="eyebrow">Case studies</span></Reveal>
          <Reveal delay={80}><h2 className="display-md mt-4">Real systems shipping real outcomes.</h2></Reveal>

          <Stagger className="grid-2 mt-12">
            {PROJECTS.slice(0, 4).map((p) => (
              <Link key={p.slug} to={`/projects#${p.slug}`}>
                <article className="card card-interactive h-full">
                  <div className="flex items-start justify-between gap-3">
                    <div className="icon-tile-grad" style={{ width: 48, height: 48 }}><Icon name={p.icon} size={22} /></div>
                    <span className="pill">{p.category}</span>
                  </div>
                  <h3 className="heading-lg mt-4">{p.title}</h3>
                  <p className="body-md mt-2">{p.summary}</p>
                  <div className="grid mt-5" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 }}>
                    {p.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="num-grad" style={{ fontSize: 16 }}>{m.value}</div>
                        <div className="body-sm" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 20, color: 'var(--brand-primary)', fontWeight: 600, fontSize: 14 }}>
                    Read case study <ArrowRight size={14} />
                  </span>
                </article>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <Reveal><span className="eyebrow">What customers say</span></Reveal>
          <Reveal delay={80}><h2 className="display-md mt-4 max-w-3xl">A team that ships — and stays for the next thing.</h2></Reveal>

          <Stagger className="grid-3 mt-12">
            {TESTIMONIALS.map((t, i) => (
              <blockquote key={i} className="card h-full" style={{ display: 'flex', flexDirection: 'column', gap: 16, margin: 0 }}>
                <Quote size={22} style={{ color: 'var(--brand-primary)' }} />
                <p className="text-ink" style={{ fontSize: 15.5, lineHeight: 1.6 }}>“{t.quote}”</p>
                <footer style={{ marginTop: 'auto' }}>
                  <p style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</p>
                  <p className="body-sm" style={{ marginTop: 2 }}>{t.role}</p>
                </footer>
              </blockquote>
            ))}
          </Stagger>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
