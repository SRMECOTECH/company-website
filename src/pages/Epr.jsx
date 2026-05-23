import { Link } from 'react-router-dom';
import {
  ArrowRight, Calendar, Recycle, Scale, Leaf, FileCheck, ClipboardList, Search, Award,
  ShieldCheck, Target, BarChart3, MapPin, Cpu, Sparkles, ChevronRight,
} from 'lucide-react';
import CTABanner from '../components/CTABanner.jsx';
import Reveal, { Stagger } from '../components/Reveal.jsx';
import EprFlow from '../components/EprFlow.jsx';
import { googleCalendarUrl } from '../lib/calendar.js';

const WHY_CARDS = [
  {
    Icon: Scale,
    title: 'Legal Mandate',
    body: 'Compliance with CPCB regulations avoids heavy penalties and legal disruptions.',
    accent: '#F97316',
  },
  {
    Icon: Leaf,
    title: 'Sustainability Goals',
    body: 'Align your brand with environmental excellence and a circular economy.',
    accent: '#60A5FA',
  },
];

const PROCESS_STEPS = [
  {
    Icon: ClipboardList,
    title: 'Documentation',
    body: 'Assistance in collecting and verifying sales, import, and GST data.',
  },
  {
    Icon: FileCheck,
    title: 'Portal Filing',
    body: 'Meticulous application filing on the Central Pollution Control Board (CPCB) portal.',
  },
  {
    Icon: Search,
    title: 'Liaison',
    body: 'Direct coordination with regulatory officials to address queries and expedite approval.',
  },
  {
    Icon: Award,
    title: 'Certification',
    body: 'Official EPR Registration certificate generation and initial credit mapping.',
  },
];

const SOLUTIONS = [
  {
    Icon: Target,
    title: 'Target Fulfillment',
    body: 'Strategic planning to meet annual recycling targets through our certified network of 50+ recyclers.',
  },
  {
    Icon: Calendar,
    title: 'Timely Returns Filing',
    body: 'Automated reminders and expert handling of quarterly and annual return filings on the CPCB portal.',
  },
  {
    Icon: ShieldCheck,
    title: 'Audit Support',
    body: 'Preparation and representation during regulatory audits to ensure 100% record accuracy.',
  },
];

const WHY_US = [
  {
    Icon: Award,
    title: 'Regulatory Experts',
    body: 'Deep understanding of PWM, E-Waste, Battery, and Tyre waste rules.',
  },
  {
    Icon: MapPin,
    title: 'Pan-India Network',
    body: 'Strong tie-ups with authorized recyclers across the country for physical fulfillment.',
  },
  {
    Icon: Cpu,
    title: 'Tech-Led Tracking',
    body: 'Digital monitoring tools that provide 100% transparency in the compliance process.',
  },
];

const WASTE_STREAMS = [
  { label: 'Plastic Waste', code: 'PWM' },
  { label: 'E-Waste',       code: 'EWM' },
  { label: 'Battery Waste', code: 'BWM' },
  { label: 'Tyre Waste',    code: 'TWM' },
];

export default function Epr() {
  return (
    <>
      {/* Hero */}
      <section className="hero" style={{ paddingTop: 132, paddingBottom: 80 }}>
        <div className="hero-grid" />
        <div className="orb" style={{ top: -160, left: -100, width: 420, height: 420, background: 'radial-gradient(circle, var(--brand-primary), transparent 60%)' }} />
        <div className="orb" style={{ bottom: -200, right: -160, width: 520, height: 520, background: 'radial-gradient(circle, var(--brand-secondary), transparent 60%)', animationDelay: '-8s' }} />

        <div className="container" style={{ position: 'relative', maxWidth: 980 }}>
          <Reveal><span className="eyebrow"><Sparkles size={12} /> EPR Services</span></Reveal>
          <Reveal delay={80}>
            <h1 className="display-xl mt-5">
              Dedicated <span className="text-flow">EPR Solutions Center</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="body-lg mt-5" style={{ maxWidth: 760 }}>
              A comprehensive hub for all your Extended Producer Responsibility registration and
              compliance needs in India.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="flex gap-3 mt-7" style={{ flexWrap: 'wrap' }}>
              <Link to="/about#contact" className="btn btn-primary btn-lg">
                EPR Registration <ArrowRight size={16} />
              </Link>
              <a
                href={googleCalendarUrl({ title: 'EPR compliance — free assessment', details: 'Free EPR liability assessment with the SRM ECO TECH compliance desk.' })}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg"
              >
                Compliance Management
              </a>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="epr-streams mt-10">
              {WASTE_STREAMS.map((w) => (
                <div key={w.label} className="epr-stream">
                  <span className="epr-stream-code">{w.code}</span>
                  <span className="epr-stream-label">{w.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why EPR is essential */}
      <section className="section bordered" id="why" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="grid" style={{ gap: 48, gridTemplateColumns: '1fr', alignItems: 'start' }}>
            <Reveal>
              <span className="eyebrow">Why this matters</span>
              <h2 className="display-md mt-4 max-w-3xl">
                Why EPR Registration is Essential
              </h2>
              <p className="body-lg mt-5 max-w-3xl">
                Extended Producer Responsibility (EPR) is a mandatory policy for Producers, Importers,
                and Brand Owners (PIBOs) in India. It ensures that businesses take responsibility for
                the end-of-life management of their products — particularly Plastic, E-Waste, Battery,
                and Tyre waste.
              </p>
              <div className="flex gap-2 mt-6" style={{ flexWrap: 'wrap' }}>
                {['EPR Compliance', 'Regulatory Compliance', 'Authorized Guidance'].map((t) => (
                  <span key={t} className="pill pill-brand">{t}</span>
                ))}
              </div>
            </Reveal>

            <Stagger className="grid-2 mt-2">
              {WHY_CARDS.map(({ Icon, title, body, accent }) => (
                <article key={title} className="epr-why-card" style={{ '--accent': accent }}>
                  <div className="epr-why-icon"><Icon size={22} /></div>
                  <h3 className="heading-lg mt-4">{title}</h3>
                  <p className="body-md mt-2">{body}</p>
                </article>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Streamlined Registration Process */}
      <section className="section" id="process">
        <div className="container">
          <Reveal>
            <span className="eyebrow">How it works</span>
            <h2 className="display-md mt-4 max-w-3xl">Streamlined Registration Process</h2>
            <p className="body-lg mt-4 max-w-3xl">
              We handle the technicalities so you can focus on building your business.
            </p>
          </Reveal>

          <Stagger className="epr-process mt-12">
            {PROCESS_STEPS.map((s, i) => (
              <article key={s.title} className="epr-step">
                <div className="epr-step-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="epr-step-icon"><s.Icon size={22} /></div>
                <h3 className="heading-md mt-3">{s.title}</h3>
                <p className="body-md mt-2">{s.body}</p>
                {i < PROCESS_STEPS.length - 1 && (
                  <span className="epr-step-arrow"><ChevronRight size={18} /></span>
                )}
              </article>
            ))}
          </Stagger>

          {/* Compliance Dashboard teaser */}
          <Reveal delay={120}>
            <div className="epr-dashboard mt-14">
              <div className="epr-dashboard-text">
                <span className="eyebrow">Compliance Dashboard</span>
                <h3 className="display-sm mt-3">Digital Compliance Management</h3>
                <p className="body-md mt-3">
                  Track targets, fulfillment, and reporting through our unified dashboard — every
                  category, every month, every PRO, in one screen.
                </p>
                <Link to="/about#contact" className="btn btn-primary btn-sm mt-5">
                  Request a walkthrough <ArrowRight size={14} />
                </Link>
              </div>
              <div className="epr-dashboard-visual" aria-hidden="true">
                <div className="epr-dash-card">
                  <div className="epr-dash-head">
                    <span className="epr-dash-dot" /> <span>EPR Compliance · FY25</span>
                  </div>
                  <div className="epr-rings">
                    {[
                      { label: 'PET',         pct: 92, color: '#3B82F6' },
                      { label: 'HDPE',        pct: 78, color: '#6366F1' },
                      { label: 'LDPE',        pct: 64, color: '#8B5CF6' },
                      { label: 'PP',          pct: 85, color: '#A78BFA' },
                      { label: 'Multi-layer', pct: 58, color: '#7C3AED' },
                    ].map(({ label, pct, color }) => {
                      const r = 38;
                      const circ = 2 * Math.PI * r;
                      const offset = circ - (circ * pct) / 100;
                      return (
                        <div key={label} className="epr-ring-item">
                          <svg viewBox="0 0 100 100" className="epr-ring-svg">
                            <circle cx="50" cy="50" r={r} fill="none" stroke="var(--border-default)" strokeWidth="7" opacity="0.35" />
                            <circle
                              cx="50" cy="50" r={r}
                              fill="none"
                              stroke={color}
                              strokeWidth="7"
                              strokeLinecap="round"
                              strokeDasharray={circ}
                              strokeDashoffset={offset}
                              className="epr-ring-progress"
                              style={{ '--ring-offset': offset, '--ring-circ': circ }}
                              transform="rotate(-90 50 50)"
                            />
                          </svg>
                          <div className="epr-ring-center">
                            <span className="epr-ring-pct" style={{ color }}>{pct}%</span>
                          </div>
                          <span className="epr-ring-label">{label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Annual Compliance Cycle — hexagonal flow diagram */}
      <section className="section bordered" id="cycle" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">The cycle</span>
            <h2 className="display-md mt-4">EPR Annual Compliance for Plastic Waste</h2>
            <p className="body-lg mt-4">
              Extended Producer Responsibility runs on a recurring cycle — each step feeds the next,
              year on year. Here's how the six stages connect.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-12">
              <EprFlow />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Our EPR Compliance Solutions */}
      <section className="section" id="solutions">
        <div className="container">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">What you get</span>
            <h2 className="display-md mt-4">Our EPR Compliance Solutions</h2>
          </Reveal>
          <Stagger className="grid-3 mt-12">
            {SOLUTIONS.map(({ Icon, title, body }) => (
              <article key={title} className="card card-interactive h-full">
                <div className="icon-tile-grad"><Icon size={22} /></div>
                <h3 className="heading-lg mt-5">{title}</h3>
                <p className="body-md mt-2">{body}</p>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Why Choose SRM ECO TECH */}
      <section className="section" id="why-us">
        <div className="container">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Why us</span>
            <h2 className="display-md mt-4">Why Choose SRM ECO TECH?</h2>
            <p className="body-lg mt-4">
              Combining environmental expertise with digital transparency for the most reliable
              service in India.
            </p>
          </Reveal>
          <Stagger className="grid-3 mt-12">
            {WHY_US.map(({ Icon, title, body }) => (
              <article key={title} className="card card-interactive h-full">
                <div className="icon-tile"><Icon size={22} /></div>
                <h3 className="heading-md mt-4">{title}</h3>
                <p className="body-md mt-2">{body}</p>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Take the Hassle Out CTA */}
      <section className="section">
        <div className="container">
          <Reveal variant="zoom">
            <div className="cta-banner">
              <div className="orb" style={{ top: -120, left: -80, width: 280, height: 280, background: 'radial-gradient(circle, rgba(255,255,255,0.45), transparent 70%)' }} />
              <div className="orb" style={{ bottom: -140, right: -100, width: 320, height: 320, background: 'radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%)' }} />
              <div style={{ position: 'relative' }}>
                <span className="pill">EPR Desk</span>
                <h2 className="display-md mt-4">Take the Hassle Out of EPR</h2>
                <p className="body-lg mt-3 mx-auto max-w-2xl" style={{ color: 'rgba(255,255,255,0.88)' }}>
                  Connect with our dedicated EPR desk today for a free assessment of your compliance liability.
                </p>
                <div className="flex items-center justify-center gap-3 mt-6" style={{ flexWrap: 'wrap' }}>
                  <Link to="/about#contact" className="btn btn-white">
                    <FileCheck size={16} /> Free Liability Assessment
                  </Link>
                  <a
                    href={googleCalendarUrl({ title: 'EPR expert call · SRM ECO TECH', details: 'Expert call with the SRM ECO TECH EPR compliance desk.' })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-glass"
                  >
                    <Calendar size={16} /> Schedule Expert Call
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
