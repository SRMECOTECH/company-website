import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import HeroVisual from './HeroVisual.jsx';
import Typewriter from './Typewriter.jsx';
import { googleCalendarUrl } from '../lib/calendar.js';

const ROTATING_PHRASES = [
  "what's next.",
  "AI platforms.",
  "data pipelines.",
  "fleet systems.",
];

export default function Hero() {
  return (
    <section className="hero hero-pro">
      <div className="hero-grid" />
      <div className="orb hero-orb hero-orb-1" />
      <div className="orb hero-orb hero-orb-2" />

      <div className="hero-pro-inner">
        <div className="hero-pro-copy">
          <span className="eyebrow"><Sparkles size={12} /> SRM ECO TECH | Technology · Sustainability · Scale</span>

          <h1 className="display-xl mt-5 hero-pro-h1">
            <span className="hero-line word" style={{ animationDelay: '0ms' }}>We engineer</span>
            <span className="hero-line hero-typewriter-line">
              <Typewriter phrases={ROTATING_PHRASES} />
            </span>
            <span className="hero-line word" style={{ animationDelay: '200ms' }}>from code to compliance.</span>
          </h1>

          <p className="body-lg mt-6 max-w-xl word hero-pro-sub" style={{ animationDelay: '550ms' }}>
            Enterprise software, AI-driven intelligence, and regulatory expertise — fused
            into one platform. SRM ECO TECH powers the teams that move freight, manage
            data, and keep India compliant.
          </p>

          <div className="flex gap-3 mt-8 word hero-pro-cta" style={{ animationDelay: '600ms', flexWrap: 'wrap' }}>
            <Link to="/products" className="btn btn-primary btn-lg">
              Explore neXgen Products <ArrowRight size={16} />
            </Link>
            <a
              href={googleCalendarUrl({ title: 'Demo · SRM ECO TECH', details: "Product walkthrough — neXgen Suite. We'll demo the actual production system, not slides." })}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg"
            >
              Schedule a Demo
            </a>
          </div>

          <div className="hero-pro-stats word" style={{ animationDelay: '800ms' }}>
            {[
              { v: '50M+', l: 'GPS pings / day' },
              { v: '60+',  l: 'live ML models' },
              { v: '99.95%', l: 'pipeline uptime' },
            ].map((s) => (
              <div key={s.l}>
                <div className="num-grad hero-pro-stat-v">{s.v}</div>
                <p className="hero-pro-stat-l">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-pro-visual">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
