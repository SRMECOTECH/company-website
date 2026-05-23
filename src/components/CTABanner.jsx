import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { googleCalendarUrl } from '../lib/calendar.js';

export default function CTABanner({
  eyebrow = "Let's build something",
  title = 'Ready to ship the next thing?',
  body = 'Tell us where you are headed. We bring the engineering, the data, and the compliance know-how.',
}) {
  return (
    <section className="section">
      <div className="container">
        <Reveal variant="zoom">
          <div className="cta-banner">
            <div className="orb" style={{ top: -120, left: -80, width: 280, height: 280, background: 'radial-gradient(circle, rgba(255,255,255,0.45), transparent 70%)' }} />
            <div className="orb" style={{ bottom: -140, right: -100, width: 320, height: 320, background: 'radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%)' }} />
            <div style={{ position: 'relative' }}>
              <span className="pill">{eyebrow}</span>
              <h2 className="display-md mt-4">{title}</h2>
              <p className="body-lg mt-3 mx-auto max-w-2xl" style={{ color: 'rgba(255,255,255,0.88)' }}>{body}</p>
              <div className="flex items-center justify-center gap-3 mt-6" style={{ flexWrap: 'wrap' }}>
                <a href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-white">
                  <Calendar size={16} /> Schedule a Call
                </a>
                <Link to="/products" className="btn btn-glass">
                  Explore neXgen Suite <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
