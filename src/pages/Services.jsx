import { Link } from 'react-router-dom';
import {
  ArrowRight, Sparkles, Truck, BarChart3, Server, Zap, Factory, Users2,
} from 'lucide-react';
import CTABanner from '../components/CTABanner.jsx';
import Reveal, { Stagger } from '../components/Reveal.jsx';
import TechStack3D from '../components/TechStack3D.jsx';
import ServicesBento from '../components/ServicesBento.jsx';
import { googleCalendarUrl } from '../lib/calendar.js';

const STATS = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '12+', label: 'Industry Verticals' },
  { value: '30+', label: 'Technologies Mastered' },
  { value: '99.95%', label: 'Platform Uptime' },
];

const INDUSTRY_CARDS = [
  { Icon: Truck,   title: 'Logistics & Mobility', body: 'Smart-truck telematics, OSRM-based routing, fleet analytics, e-POD and driver scoring.' },
  { Icon: Factory, title: 'Manufacturing & FMCG', body: 'Vendor portals, plant telemetry, predictive maintenance, audit-ready process automation.' },
  { Icon: Users2,  title: 'BFSI & Services',      body: 'Document AI for AP/AR, KYC pipelines, fraud detection ML, customer-facing chatbots.' },
];

/* ─────────────────────── COMPONENT ─────────────────────── */

export default function Services() {
  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section className="hero" style={{ paddingTop: 132, paddingBottom: 80 }}>
        <div className="hero-grid" />
        <div className="orb" style={{ top: -160, left: -100, width: 420, height: 420, background: 'radial-gradient(circle, var(--brand-primary), transparent 60%)' }} />
        <div className="orb" style={{ bottom: -200, right: -160, width: 520, height: 520, background: 'radial-gradient(circle, var(--brand-secondary), transparent 60%)', animationDelay: '-8s' }} />

        <div className="container" style={{ position: 'relative', maxWidth: 980 }}>
          <Reveal><span className="eyebrow"><Sparkles size={12} /> Services & Our Expertise</span></Reveal>
          <Reveal delay={80}>
            <h1 className="display-xl mt-5">
              Decades of craft across <span className="text-flow">every layer of the stack.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="body-lg mt-5" style={{ maxWidth: 760 }}>
              From enterprise Java backends and blockchain smart contracts to AI-powered analytics
              and regulatory compliance — we don't just consult. We build, deploy, and run
              production systems that businesses depend on every single day.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="flex gap-3 mt-7" style={{ flexWrap: 'wrap' }}>
              <Link to="/about#contact" className="btn btn-primary btn-lg">
                Start a Conversation <ArrowRight size={16} />
              </Link>
              <a
                href={googleCalendarUrl({ title: 'Technical deep-dive — SRM ECO TECH', details: 'Discuss your project requirements with our engineering team.' })}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg"
              >
                Schedule a Deep-Dive
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ WHO WE ARE — text-led ═══════════ */}
      <section className="section bordered" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <Reveal className="text-center max-w-3xl mx-auto">
            <span className="eyebrow">Who we are</span>
            <h2 className="display-md mt-4">Engaging Creative Minds Via Technology</h2>
            <p className="body-lg mt-4">
              SRM ECO TECH is a trusted technology company dedicated to empowering businesses
              with the agility and expertise required to succeed in today's dynamic landscape.
              We specialize in building elite engineering teams without compromising on quality,
              helping you bring your IT initiatives to life efficiently and effectively.
            </p>
          </Reveal>
          <Stagger className="exp-highlights-row mt-10">
            <div className="exp-highlight">
              <div className="exp-highlight-icon"><Zap size={20} /></div>
              <div>
                <strong>Our Achievements</strong>
                <span>Quality focus, client growth, 50+ projects shipped</span>
              </div>
            </div>
            <div className="exp-highlight">
              <div className="exp-highlight-icon"><Sparkles size={20} /></div>
              <div>
                <strong>Our Culture</strong>
                <span>Developer-centric, innovation-driven engineering focus</span>
              </div>
            </div>
          </Stagger>
        </div>
      </section>

      {/* ═══════════ WHAT WE OFFER — 3 highlight cards ═══════════ */}
      <section className="section" id="offerings">
        <div className="container">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">What we offer</span>
            <h2 className="display-md mt-4">Tailored Solutions For You</h2>
            <p className="body-lg mt-4">
              Dedicated skilled and certified resources for each project — accelerated release
              cycles resulting in tangible gains at a fraction of the cost.
            </p>
          </Reveal>
          <Stagger className="exp-offers mt-12">
            {[
              { Icon: Server, title: 'Skilled & Certified Resources', body: 'Dedicated experts — Java architects, ML engineers, DevOps leads — handpicked for your project requirements.' },
              { Icon: Zap, title: 'Faster Product Development', body: 'Accelerated release cycles with CI/CD, automated testing, and design sprints that ship features weekly.' },
              { Icon: BarChart3, title: 'Cost Effective Development', body: 'Quality enhancements at lower cost — our offshore + onshore model delivers tier-1 talent at competitive rates.' },
            ].map(({ Icon, title, body }, i) => (
              <article key={title} className={`exp-offer-card ${i === 1 ? 'exp-offer-featured' : ''}`}>
                <div className="exp-offer-art" aria-hidden="true">
                  <svg viewBox="0 0 200 120" className="exp-offer-svg">
                    {[...Array(6)].map((_, j) => (
                      <line key={j} x1={20 + j * 36} y1="20" x2={20 + j * 36} y2="100"
                        stroke="currentColor" strokeWidth="0.5" opacity="0.2"
                        strokeDasharray="2 4" />
                    ))}
                    {[...Array(4)].map((_, j) => (
                      <line key={`h${j}`} x1="10" y1={30 + j * 22} x2="190" y2={30 + j * 22}
                        stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
                    ))}
                    <circle cx={40 + i * 60} cy={60 - i * 10} r="18" fill="currentColor" opacity="0.08" />
                    <circle cx={40 + i * 60} cy={60 - i * 10} r="6" fill="currentColor" opacity="0.25" />
                  </svg>
                </div>
                <div className="exp-offer-icon"><Icon size={24} /></div>
                <h3 className="heading-lg mt-4">{title}</h3>
                <p className="body-md mt-2">{body}</p>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <section className="section bordered" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="stats">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="stat-value">{s.value}</div>
                <p className="stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICE CAPABILITIES — animated bento grid ═══════════ */}
      <section className="section" id="capabilities">
        <div className="container">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Core capabilities</span>
            <h2 className="display-md mt-4">Twelve deep capabilities. One delivery team.</h2>
            <p className="body-lg mt-4">
              From traditional enterprise backends to frontier technologies like blockchain and
              edge ML — every capability is led by a senior engineer who has shipped production
              systems in that exact domain. No generalists pretending — real depth, real delivery.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-12">
              <ServicesBento />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ TECH STACK — bouncing marquee lanes ═══════════ */}
      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Tech stack</span>
            <h2 className="display-md mt-4 max-w-2xl">What we build with.</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="body-lg mt-4 max-w-2xl">
              We're opinionated about defaults but pragmatic about exceptions.
              Below is what we ship most often.
            </p>
          </Reveal>
          <Reveal delay={160}><div className="mt-10"><TechStack3D /></div></Reveal>
        </div>
      </section>

      {/* ═══════════ INDUSTRIES — icon tiles + detail cards ═══════════ */}
      <section className="section bordered" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Industries served</span>
            <h2 className="display-md mt-4">Cross-Industry Impact</h2>
            <p className="body-lg mt-4">
              Our solutions span verticals from banking and logistics to cleantech and government.
            </p>
          </Reveal>
          <Stagger className="grid-3 mt-12">
            {INDUSTRY_CARDS.map((ind) => (
              <article key={ind.title} className="card card-interactive h-full">
                <div className="icon-tile-grad" style={{ background: 'var(--gradient-cta)' }}><ind.Icon size={24} /></div>
                <h3 className="heading-lg mt-5">{ind.title}</h3>
                <p className="body-md mt-2">{ind.body}</p>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══════════ WHY SRM — text-led CTA strip ═══════════ */}
      <section className="section">
        <div className="container">
          <Reveal className="text-center max-w-3xl mx-auto">
            <span className="eyebrow">Why SRM ECO TECH</span>
            <h2 className="display-md mt-4">Digital Solutions That Drive Success</h2>
            <p className="body-lg mt-4">
              We empower businesses, deliver results, and bring visions to life with our
              innovative approach and world-class developer team. Every engagement is outcome-driven —
              if it doesn't move your business forward, it doesn't ship.
            </p>
            <div className="flex gap-3 mt-6" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/products" className="btn btn-primary btn-sm">
                Explore neXgen Products <ArrowRight size={14} />
              </Link>
              <Link to="/projects" className="btn btn-secondary btn-sm">
                See Case Studies <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <CTABanner
        eyebrow="Ready to build?"
        title="Let's turn your idea into production-grade software."
        body="Tell us what you're building. The right engineer will get back — not a sales rep."
      />
    </>
  );
}
