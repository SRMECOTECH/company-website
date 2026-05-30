import { useState } from 'react';
import { ChevronDown, ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/projects.js';
import ProjectMedia from './ProjectMedia.jsx';

export default function ProjectsScrolly() {
  const [openSlug, setOpenSlug] = useState(PROJECTS[0]?.slug || null);

  return (
    <div className="pcard-list">
      {PROJECTS.map((p, i) => {
        const open = openSlug === p.slug;
        return (
          <article
            key={p.slug}
            id={p.slug}
            className={`pcard${open ? ' is-open' : ''}`}
            style={{ '--accent-rgb': p.accent || '6,182,212' }}
          >
            <button
              type="button"
              className="pcard-head"
              aria-expanded={open}
              onClick={() => setOpenSlug(open ? null : p.slug)}
            >
              <div className="pcard-media">
                <ProjectMedia project={p} />
              </div>

              <div className="pcard-intro">
                <div className="pcard-index">
                  {String(i + 1).padStart(2, '0')} · {p.category}
                </div>
                <h3 className="pcard-title">{p.title}</h3>
                <p className="pcard-summary">{p.summary}</p>

                <div className="pcard-metrics">
                  {p.metrics.map((m) => (
                    <div key={m.label} className="pcard-metric">
                      <div className="pcard-metric-v num-grad">{m.value}</div>
                      <div className="pcard-metric-l">{m.label}</div>
                    </div>
                  ))}
                </div>

                <span className="pcard-toggle">
                  {open ? 'Hide details' : 'View details'}
                  <ChevronDown className="pcard-chev" size={16} />
                </span>
              </div>
            </button>

            {open && (
              <div className="pcard-body">
                <div className="pcard-grid">
                  <div className="pcard-block">
                    <p className="pcard-block-label">The problem</p>
                    <p className="pcard-block-text">{p.problem}</p>
                  </div>
                  <div className="pcard-block">
                    <p className="pcard-block-label">What we built</p>
                    <p className="pcard-block-text">{p.solution}</p>
                  </div>
                  <div className="pcard-block">
                    <p className="pcard-block-label">The outcome</p>
                    <p className="pcard-block-text">{p.outcome}</p>
                  </div>
                </div>

                <div className="pcard-stack">
                  {p.stack.map((s) => <span key={s} className="pill">{s}</span>)}
                </div>

                <div className="pcard-actions">
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                    >
                      View repository <ArrowUpRight size={15} />
                    </a>
                  )}
                  <Link to="/contact" className="pcard-cta">
                    Talk to the team that built this <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
