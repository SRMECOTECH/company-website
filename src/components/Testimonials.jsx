import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/clients.js';
import Reveal from './Reveal.jsx';

function getInitials(name) {
  return name.split(/\s+/).filter(Boolean).map((p) => p[0]).slice(0, 2).join('').toUpperCase();
}

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg,#06B6D4,#14B8A6)',
  'linear-gradient(135deg,#0891B2,#06B6D4)',
  'linear-gradient(135deg,#0E7490,#22D3EE)',
  'linear-gradient(135deg,#14B8A6,#2DD4BF)',
  'linear-gradient(135deg,#06B6D4,#67E8F9)',
  'linear-gradient(135deg,#0891B2,#14B8A6)',
];

function perViewFor(width) {
  if (width < 640) return 1;
  if (width < 1024) return 2;
  return 3;
}

export default function Testimonials() {
  const total = TESTIMONIALS.length;
  const [perView, setPerView] = useState(
    typeof window !== 'undefined' ? perViewFor(window.innerWidth) : 3
  );
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const maxIndex = Math.max(0, total - perView);

  // keep index valid when the viewport (perView) changes
  useEffect(() => {
    const onResize = () => setPerView(perViewFor(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  // auto-advance every 5s (pauses on hover)
  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, 5000);
    return () => clearInterval(id);
  }, [paused, maxIndex]);

  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));

  const step = 100 / perView;

  return (
    <section className="section testimonials-section">
      <div className="container">
        <div className="tcar-header">
          <div>
            <Reveal><span className="eyebrow">What customers say</span></Reveal>
            <Reveal delay={80}>
              <h2 className="display-md mt-4 max-w-3xl">Real words from the teams we ship with.</h2>
            </Reveal>
          </div>
          <div className="tcar-nav">
            <button type="button" className="tcar-btn" onClick={prev} aria-label="Previous testimonials">
              <ChevronLeft size={20} />
            </button>
            <button type="button" className="tcar-btn" onClick={next} aria-label="Next testimonials">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          className="tcar mt-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="tcar-viewport">
            <div className="tcar-track" style={{ transform: `translateX(-${index * step}%)` }}>
              {TESTIMONIALS.map((t, i) => (
                <div className="tcar-slide" key={i} style={{ flexBasis: `${step}%` }}>
                  <blockquote className="tcard">
                    <div className="tcard-top">
                      <Quote className="tcard-quote-icon" size={26} aria-hidden="true" />
                      <div className="tcard-stars" aria-label="5 out of 5 stars">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star key={s} size={13} fill="currentColor" />
                        ))}
                      </div>
                    </div>

                    <p className="tcard-quote">{t.quote}</p>

                    <footer className="tcard-author">
                      <div
                        className="tcard-avatar"
                        style={{ backgroundImage: AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length] }}
                        aria-hidden="true"
                      >
                        {getInitials(t.name)}
                      </div>
                      <div className="tcard-meta">
                        <p className="tcard-name">{t.name}</p>
                        <p className="tcard-role">
                          {t.role}
                          {t.company ? <span className="tcard-company"> · {t.company}</span> : null}
                        </p>
                      </div>
                    </footer>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>

          {/* dots */}
          <div className="tcar-dots">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                className={`tcar-dot${i === index ? ' is-active' : ''}`}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
