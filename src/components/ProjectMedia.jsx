import Icon from './Icon.jsx';

// Themed glyph sets for the animated demo-reel placeholder.
const THEME_GLYPHS = {
  truck: ['Truck', 'MapPin', 'BarChart3', 'Clock'],
  chat:  ['Brain', 'MessageSquareCode', 'Database', 'Sparkles'],
  chain: ['ShieldCheck', 'Link2', 'Wallet', 'Check'],
  map:   ['MapPin', 'Map', 'Truck', 'Search'],
  chart: ['BarChart3', 'Receipt', 'Database', 'Award'],
  data:  ['Database', 'Server', 'Workflow', 'Cloud'],
  ml:    ['Cpu', 'Brain', 'Workflow', 'Sparkles'],
  leaf:  ['Leaf', 'Recycle', 'FileCheck', 'Scale'],
};

/**
 * ProjectMedia — a looping "demo reel" placeholder.
 * When `video` is provided it plays the real mp4 instead.
 * Drop files in /public/videos and set `video` on the project to swap in real footage.
 */
export default function ProjectMedia({ project }) {
  const accent = project.accent || '6,182,212';
  const glyphs = THEME_GLYPHS[project.media] || THEME_GLYPHS.data;

  if (project.video) {
    return (
      <div className="pmedia" style={{ '--pm-accent': accent }}>
        <video
          className="pmedia-video"
          src={project.video}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      </div>
    );
  }

  return (
    <div className="pmedia pmedia-reel" style={{ '--pm-accent': accent }} aria-hidden="true">
      <span className="pmedia-grid" />
      <span className="pmedia-scan" />

      <div className="pmedia-stage">
        <div className="pmedia-core">
          <Icon name={project.icon} size={30} strokeWidth={2.1} />
        </div>
        {glyphs.map((g, i) => (
          <div key={g + i} className={`pmedia-glyph pmedia-glyph-${i + 1}`}>
            <Icon name={g} size={18} strokeWidth={2.2} />
          </div>
        ))}
        {/* connecting beams */}
        <svg className="pmedia-beams" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="50" y1="50" x2="18" y2="20" />
          <line x1="50" y1="50" x2="82" y2="24" />
          <line x1="50" y1="50" x2="20" y2="80" />
          <line x1="50" y1="50" x2="84" y2="78" />
        </svg>
      </div>

    </div>
  );
}
