import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { PROJECTS } from '../data/projects.js';

/** Map each project slug → a real image (Unsplash CDN) + accent color. */
const PROJECT_MEDIA = {
  'smart-truck-gps': {
    img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1400&q=80',
    accent: '16,217,160',
  },
  'osrm-snap-to-road': {
    img: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1400&q=80',
    accent: '45,212,191',
  },
  'data-lake-platform': {
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80',
    accent: '96,165,250',
  },
  'ml-dl-platform': {
    img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1400&q=80',
    accent: '251,191,36',
  },
  'epr-portal': {
    img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1400&q=80',
    accent: '16,217,160',
  },
};

function ProjectRow({ project, index }) {
  const rowRef = useRef(null);
  const figureRef = useRef(null);
  const media = PROJECT_MEDIA[project.slug] || {};
  const isFlipped = index % 2 === 1; // odd → text left, figure right

  // Reveal on enter
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in');
          io.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 3D cursor parallax on the figure
  useEffect(() => {
    const fig = figureRef.current;
    if (!fig) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    function onMove(e) {
      const rect = fig.getBoundingClientRect();
      const px = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const py = (e.clientY - rect.top - rect.height / 2) / rect.height;
      fig.style.setProperty('--mx', Math.max(-1, Math.min(1, px)).toFixed(3));
      fig.style.setProperty('--my', Math.max(-1, Math.min(1, py)).toFixed(3));
    }
    function onLeave() {
      fig.style.setProperty('--mx', '0');
      fig.style.setProperty('--my', '0');
    }
    fig.addEventListener('mousemove', onMove);
    fig.addEventListener('mouseleave', onLeave);
    return () => {
      fig.removeEventListener('mousemove', onMove);
      fig.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const titleWords = project.title.split(/\s+/);

  return (
    <article
      ref={rowRef}
      id={project.slug}
      data-flip={isFlipped ? 'true' : 'false'}
      className="proj-row"
      style={{ '--accent-rgb': media.accent || '16,217,160' }}
    >
      {/* Figure */}
      <div className="proj-figure-col">
        <div className="proj-figure" ref={figureRef}>
          <span className="proj-figure-orb proj-figure-orb-a" />
          <span className="proj-figure-orb proj-figure-orb-b" />
          {media.img && (
            <img
              className="proj-figure-img"
              src={media.img}
              alt={project.title}
              loading="lazy"
              decoding="async"
            />
          )}
          <span className="proj-figure-grid" />
          <div className="proj-figure-overlay">
            <span className="proj-figure-pill">{project.category}</span>
            <div className="proj-figure-title">{project.title}</div>
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="proj-text-col">
        <div className="proj-block-index">
          {String(index + 1).padStart(2, '0')} · {project.category}
        </div>
        <h2 className="proj-title">
          {titleWords.map((w, wi) => (
            <span
              key={wi}
              className="proj-title-word"
              style={{ transitionDelay: `${wi * 60}ms` }}
            >
              {w}{wi < titleWords.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h2>
        <p className="proj-summary">{project.summary}</p>

        <div className="proj-section">
          <p className="proj-section-label">The problem</p>
          <p>{project.problem}</p>
        </div>
        <div className="proj-section">
          <p className="proj-section-label">What we built</p>
          <p>{project.solution}</p>
        </div>
        <div className="proj-section">
          <p className="proj-section-label">The outcome</p>
          <p>{project.outcome}</p>
        </div>

        <div className="proj-metrics">
          {project.metrics.map((m) => (
            <div key={m.label} className="proj-metric">
              <div className="proj-metric-v num-grad">{m.value}</div>
              <div className="proj-metric-l">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="proj-stack">
          {project.stack.map((s) => <span key={s} className="pill">{s}</span>)}
        </div>

        <Link to="/contact" className="proj-cta">Talk to the team that built this</Link>
      </div>
    </article>
  );
}

export default function ProjectsScrolly() {
  return (
    <div className="proj-list">
      {PROJECTS.map((p, i) => (
        <ProjectRow key={p.slug} project={p} index={i} />
      ))}
    </div>
  );
}
