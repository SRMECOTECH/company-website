import { useRef } from 'react';
import { Github, Linkedin, MapPin, Briefcase, GraduationCap, Award } from 'lucide-react';
import { TEAM } from '../data/team.js';

function hexToRgb(hex) {
  const m = hex.replace('#', '');
  const full = m.length === 3 ? m.split('').map((c) => c + c).join('') : m;
  const num = parseInt(full, 16);
  return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
}

function avatarUrl({ avatarStyle, avatarSeed, accent }) {
  const bg = accent.replace('#', '');
  return `https://api.dicebear.com/7.x/${avatarStyle || 'personas'}/svg?seed=${encodeURIComponent(avatarSeed)}&backgroundColor=${bg},transparent&backgroundType=gradientLinear&radius=50`;
}

function TeamCard({ member, index }) {
  const cardRef = useRef(null);

  // Subtle cursor tilt — feels premium without being gaming-y
  function onMove(e) {
    const el = cardRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty('--rx', (0.5 - py).toFixed(3));
    el.style.setProperty('--ry', (px - 0.5).toFixed(3));
    el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
  }
  function onLeave() {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0');
    el.style.setProperty('--ry', '0');
  }

  const rgb = hexToRgb(member.accent);

  return (
    <article
      ref={cardRef}
      className="team-card"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        '--accent': member.accent,
        '--accent-rgb': rgb,
        animationDelay: `${index * 90}ms`,
      }}
    >
      <div className="team-card-inner">
        {/* Cursor-tracking glow */}
        <span className="team-card-glow" />

        {/* Top band with department + tenure */}
        <header className="team-card-meta">
          <span className="team-dept">{member.department}</span>
          <span className="team-tenure">{member.tenure}</span>
        </header>

        {/* Avatar */}
        <div className="team-avatar-wrap">
          <span className="team-avatar-ring" />
          <div className="team-avatar">
            <img
              src={avatarUrl(member)}
              alt={member.name}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Identity */}
        <h3 className="team-name">{member.name}</h3>
        <p className="team-role">{member.role}</p>
        <p className="team-company">{member.company}</p>

        <div className="team-loc">
          <MapPin size={12} aria-hidden="true" />
          <span>{member.location}</span>
          <span className="team-sep" aria-hidden="true">·</span>
          <span>{member.pronouns}</span>
        </div>

        <p className="team-bio">{member.bio}</p>

        {/* Highlights — credentials & career notes */}
        <ul className="team-highlights">
          {member.highlights.map((h, i) => {
            const Icon = i === 0 ? Briefcase : i === 1 ? Award : GraduationCap;
            return (
              <li key={h}>
                <span className="team-highlight-icon"><Icon size={12} /></span>
                <span>{h}</span>
              </li>
            );
          })}
        </ul>

        {/* Skills */}
        <div className="team-skills">
          {member.skills.map((s) => (
            <span key={s} className="team-skill">{s}</span>
          ))}
        </div>

        {/* Actions */}
        <div className="team-actions">
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="team-btn"
            aria-label={`${member.name} on GitHub`}
          >
            <Github size={14} /> <span>GitHub</span>
          </a>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="team-btn team-btn-accent"
            aria-label={`${member.name} on LinkedIn`}
          >
            <Linkedin size={14} /> <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function TeamCards() {
  return (
    <div className="team-cards">
      {TEAM.map((m, i) => (
        <TeamCard key={m.name} member={m} index={i} />
      ))}
    </div>
  );
}
