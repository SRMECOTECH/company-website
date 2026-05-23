import { Link } from 'react-router-dom';
import { ArrowRight, Quote } from 'lucide-react';
import CTABanner from '../components/CTABanner.jsx';
import Reveal, { Stagger } from '../components/Reveal.jsx';
import ProjectsScrolly from '../components/ProjectsScrolly.jsx';
import { googleCalendarUrl } from '../lib/calendar.js';

export default function Projects() {
  return (
    <>
      <section className="hero" style={{ paddingTop: 132, paddingBottom: 72 }}>
        <div className="hero-grid" />
        <div className="container" style={{ position: 'relative', maxWidth: 800 }}>
          <Reveal><span className="eyebrow">Case studies</span></Reveal>
          <Reveal delay={80}>
            <h1 className="display-lg mt-5">
              The systems behind the slides — <span className="text-flow">in detail.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="body-lg mt-5">
              Five production systems we have built — what broke, what we built, and what the numbers
              say six months later.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="flex gap-3 mt-6" style={{ flexWrap: 'wrap' }}>
              <Link to="/products" className="btn btn-primary">Explore neXgen Products <ArrowRight size={16} /></Link>
              <a
                href={googleCalendarUrl({ title: 'Demo · SRM ECO TECH', details: 'Walkthrough of a production case study from SRM ECO TECH.' })}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Schedule a Demo
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ProjectsScrolly />
        </div>
      </section>

      <section className="section bordered" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <Stagger className="grid-3">
            {[
              { q: "Their snap-to-road work cut our routing bill from ₹40L/month to ₹35K. Same accuracy. Better latency.", a: 'CTO · Mobility SaaS' },
              { q: "The MLOps platform unblocked our data scientists. We went from 6-week deploys to 3 days, across 60 models.", a: 'Head of Data · Logistics enterprise' },
              { q: "Three EPR cycles. Zero CPCB rejections. That's never happened with any other vendor.", a: 'Compliance Lead · PET importer' },
            ].map((t, i) => (
              <div key={i} className="card h-full">
                <Quote size={22} style={{ color: 'var(--brand-primary)' }} />
                <p className="mt-3" style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text-primary)' }}>"{t.q}"</p>
                <p className="mt-4" style={{ fontSize: 14, fontWeight: 700 }}>{t.a}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <CTABanner
        eyebrow="Your project next"
        title="Got a hairy data, GPS or compliance problem?"
        body="We'll tell you in the first call whether we can help — and if not, who can. No upsell, no foot-in-the-door."
      />
    </>
  );
}
