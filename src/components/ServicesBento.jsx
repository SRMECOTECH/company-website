import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import Icon from './Icon.jsx';
import { SERVICES } from '../data/services.js';

/** Mini animated SVG patterns — one per service.
 *  Each renders inside the card's background, behind the content. */
function ServiceArt({ id }) {
  switch (id) {
    case 'ai-ml':
      return (
        <svg className="bento-art" viewBox="0 0 200 140" aria-hidden="true">
          {/* neural net */}
          {[...Array(3)].map((_, col) => (
            [...Array(4)].map((_, row) => (
              <circle key={`${col}-${row}`} cx={40 + col * 60} cy={20 + row * 30} r="4"
                fill="currentColor" opacity="0.85"
                style={{ animation: `bento-pulse 2.4s ease-in-out ${(col + row) * 180}ms infinite` }} />
            ))
          ))}
          {[...Array(3)].map((_, col) => (
            [...Array(4)].map((_, r1) => (
              [...Array(4)].map((_, r2) => (
                col < 2 ? <line key={`l-${col}-${r1}-${r2}`}
                  x1={40 + col * 60} y1={20 + r1 * 30}
                  x2={40 + (col + 1) * 60} y2={20 + r2 * 30}
                  stroke="currentColor" strokeWidth="0.6" opacity="0.18" /> : null
              ))
            ))
          ))}
        </svg>
      );
    case 'data':
      return (
        <svg className="bento-art" viewBox="0 0 200 140" aria-hidden="true">
          {/* stacked database cylinders */}
          {[0, 1, 2].map((i) => (
            <g key={i} style={{ animation: `bento-float 5s ease-in-out ${i * 400}ms infinite` }}>
              <ellipse cx={100} cy={30 + i * 36} rx={50} ry={8} fill="currentColor" opacity={0.25 + i * 0.15} />
              <rect x={50} y={30 + i * 36} width={100} height={24} fill="currentColor" opacity={0.18 + i * 0.12} />
              <ellipse cx={100} cy={54 + i * 36} rx={50} ry={8} fill="currentColor" opacity={0.3 + i * 0.18} />
            </g>
          ))}
        </svg>
      );
    case 'gps':
      return (
        <svg className="bento-art" viewBox="0 0 200 140" aria-hidden="true">
          {/* route */}
          <path d="M 10 110 C 50 90, 70 60, 100 70 S 160 80, 190 30"
            stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="4 6"
            style={{ animation: 'bento-dash 2s linear infinite' }} />
          {[20, 80, 140].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy={100 - i * 25} r="6" fill="currentColor" opacity="0.5"
                style={{ animation: `bento-pulse 2s ease-out ${i * 300}ms infinite` }} />
              <circle cx={x} cy={100 - i * 25} r="2.5" fill="currentColor" />
            </g>
          ))}
        </svg>
      );
    case 'cloud':
      return (
        <svg className="bento-art" viewBox="0 0 200 140" aria-hidden="true">
          {/* cloud nodes connecting */}
          {[
            { x: 50, y: 40 }, { x: 150, y: 40 }, { x: 100, y: 90 }, { x: 30, y: 100 }, { x: 170, y: 100 },
          ].map((n, i) => (
            <g key={i}>
              <rect x={n.x - 14} y={n.y - 10} width="28" height="20" rx="4"
                fill="currentColor" opacity="0.18"
                style={{ animation: `bento-float 4s ease-in-out ${i * 250}ms infinite` }} />
            </g>
          ))}
          <path d="M 50 40 L 100 90 L 150 40 M 30 100 L 100 90 L 170 100"
            stroke="currentColor" strokeWidth="0.8" opacity="0.4" fill="none" strokeDasharray="2 4"
            style={{ animation: 'bento-dash 2s linear infinite' }} />
        </svg>
      );
    case 'custom':
      return (
        <svg className="bento-art" viewBox="0 0 200 140" aria-hidden="true">
          {/* code window with sliding lines */}
          {[30, 50, 70, 90].map((y, i) => (
            <rect key={i} x="20" y={y} width={50 + (i % 3) * 40} height="6" rx="3"
              fill="currentColor" opacity={0.35 - i * 0.05}
              style={{ animation: `bento-line 3s cubic-bezier(0.16,1,0.3,1) ${i * 200}ms infinite`, transformOrigin: 'left' }} />
          ))}
          <circle cx="22" cy="18" r="3" fill="currentColor" opacity="0.35" />
          <circle cx="34" cy="18" r="3" fill="currentColor" opacity="0.55" />
          <circle cx="46" cy="18" r="3" fill="currentColor" opacity="0.75" />
        </svg>
      );
    case 'iot':
      return (
        <svg className="bento-art" viewBox="0 0 200 140" aria-hidden="true">
          {/* device with concentric waves */}
          <rect x="80" y="90" width="40" height="28" rx="4" fill="currentColor" opacity="0.45" />
          {[1, 2, 3].map((r) => (
            <circle key={r} cx="100" cy="90" r={r * 22} fill="none" stroke="currentColor" strokeWidth="1"
              opacity={0.5 - r * 0.12}
              style={{ animation: `bento-ring 2.4s ease-out ${r * 300}ms infinite`, transformOrigin: '100px 90px' }} />
          ))}
        </svg>
      );
    case 'security':
      return (
        <svg className="bento-art" viewBox="0 0 200 140" aria-hidden="true">
          {/* shield + check */}
          <path d="M 100 20 L 140 36 V 78 C 140 100 124 116 100 124 C 76 116 60 100 60 78 V 36 Z"
            fill="currentColor" opacity="0.18" stroke="currentColor" strokeWidth="1" />
          <path d="M 82 72 L 96 86 L 122 60"
            stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="60" style={{ animation: 'bento-draw 2.4s ease-out infinite' }} />
        </svg>
      );
    case 'epr':
      return (
        <svg className="bento-art" viewBox="0 0 200 140" aria-hidden="true">
          {/* recycle triangle */}
          <g style={{ animation: 'bento-spin 14s linear infinite', transformOrigin: '100px 70px' }}>
            {[0, 120, 240].map((rot) => (
              <path key={rot}
                d="M 100 30 L 130 80 L 110 80 L 110 95 L 90 95 L 90 80 L 70 80 Z"
                fill="currentColor" opacity="0.35"
                transform={`rotate(${rot} 100 70)`} />
            ))}
          </g>
        </svg>
      );
    case 'java':
      return (
        <svg className="bento-art" viewBox="0 0 200 140" aria-hidden="true">
          {/* stacked server racks with status lights */}
          {[0, 1, 2].map((i) => (
            <g key={i} style={{ animation: `bento-float 4.4s ease-in-out ${i * 280}ms infinite` }}>
              <rect x="40" y={22 + i * 32} width="120" height="22" rx="3"
                fill="currentColor" opacity={0.18 + i * 0.08} stroke="currentColor" strokeOpacity="0.35" strokeWidth="0.6" />
              <circle cx="52" cy={33 + i * 32} r="2.5" fill="currentColor" opacity="0.9"
                style={{ animation: `bento-pulse 2s ease-in-out ${i * 200}ms infinite` }} />
              <rect x="62" y={29 + i * 32} width="60" height="8" rx="1" fill="currentColor" opacity="0.22" />
              <rect x="126" y={29 + i * 32} width="26" height="8" rx="1" fill="currentColor" opacity="0.32" />
            </g>
          ))}
        </svg>
      );
    case 'blockchain':
      return (
        <svg className="bento-art" viewBox="0 0 200 140" aria-hidden="true">
          {/* chained blocks */}
          {[0, 1, 2, 3].map((i) => (
            <g key={i} style={{ animation: `bento-float 5s ease-in-out ${i * 220}ms infinite` }}>
              <rect x={18 + i * 44} y="50" width="32" height="32" rx="4"
                fill="currentColor" opacity={0.18 + i * 0.06}
                stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.8" />
              {i < 3 && (
                <line x1={50 + i * 44} y1="66" x2={62 + i * 44} y2="66"
                  stroke="currentColor" strokeWidth="1.2" opacity="0.55"
                  strokeDasharray="2 3"
                  style={{ animation: 'bento-dash 1.6s linear infinite' }} />
              )}
            </g>
          ))}
        </svg>
      );
    case 'mobile':
      return (
        <svg className="bento-art" viewBox="0 0 200 140" aria-hidden="true">
          {/* phone with sliding UI rows */}
          <rect x="76" y="20" width="48" height="96" rx="8"
            fill="currentColor" opacity="0.16" stroke="currentColor" strokeOpacity="0.4" strokeWidth="0.8" />
          <rect x="92" y="26" width="16" height="3" rx="1.5" fill="currentColor" opacity="0.4" />
          {[36, 50, 64, 78, 92].map((y, i) => (
            <rect key={i} x="82" y={y} width={36 - (i % 2) * 12} height="6" rx="2"
              fill="currentColor" opacity={0.45 - i * 0.05}
              style={{ animation: `bento-line 3s cubic-bezier(0.16,1,0.3,1) ${i * 200}ms infinite`, transformOrigin: 'left' }} />
          ))}
          <circle cx="100" cy="108" r="2.5" fill="currentColor" opacity="0.55" />
        </svg>
      );
    case 'workflow':
      return (
        <svg className="bento-art" viewBox="0 0 200 140" aria-hidden="true">
          {/* nodes + arrows in a loop */}
          {[
            { x: 40, y: 36 }, { x: 110, y: 36 }, { x: 160, y: 70 },
            { x: 110, y: 104 }, { x: 40, y: 104 },
          ].map((n, i) => (
            <g key={i} style={{ animation: `bento-float 4s ease-in-out ${i * 260}ms infinite` }}>
              <circle cx={n.x} cy={n.y} r="11" fill="currentColor" opacity="0.18"
                stroke="currentColor" strokeOpacity="0.5" strokeWidth="0.8" />
              <circle cx={n.x} cy={n.y} r="3" fill="currentColor" opacity="0.55"
                style={{ animation: `bento-pulse 2.4s ease-in-out ${i * 200}ms infinite` }} />
            </g>
          ))}
          <path d="M 51 36 L 99 36 M 121 39 L 153 65 M 156 80 L 121 100 M 99 104 L 51 104 M 40 93 L 40 47"
            stroke="currentColor" strokeWidth="1.2" opacity="0.45" fill="none"
            strokeDasharray="3 4"
            style={{ animation: 'bento-dash 1.8s linear infinite' }} />
        </svg>
      );
    default:
      return null;
  }
}

export default function ServicesBento() {
  return (
    <div className="bento">
      {SERVICES.map((s, i) => {
        return (
          <article
            key={s.id}
            id={s.id}
            className={`bento-card bento-${s.id}`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="bento-bg" />
            <div className="bento-art-wrap"><ServiceArt id={s.id} /></div>
            <div className="bento-content">
              <div className="bento-head">
                <div className="bento-icon"><Icon name={s.icon} size={22} /></div>
                <span className="bento-num">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="bento-title">{s.title}</h3>
              <p className="bento-desc">{s.description}</p>
              <ul className="bento-bullets">
                {s.bullets.map((b) => (
                  <li key={b} className="bento-bullet">
                    <Check size={13} className="bento-bullet-icon" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="bento-arrow" aria-label={`Talk to us about ${s.title}`}>
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
