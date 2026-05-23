import { Code2, Cpu, Leaf, ShieldCheck, BarChart3, Workflow, Users, Sparkles } from 'lucide-react';
import Reveal from './Reveal.jsx';
import ScrollTell from './ScrollTell.jsx';
import MediaPanel from './MediaPanel.jsx';
import WhoIllustration from './WhoIllustration.jsx';
import WhatIllustration from './WhatIllustration.jsx';

/**
 * High-level section: eyebrow, title, scroll-tell body, 4 pillars, and a media panel
 * (real image / video / or animated fallback illustration).
 * Used for "Who we are" and "What we do".
 */
export default function TellSection({
  variant = 'who',         // 'who' | 'what'
  eyebrow,
  title,
  bodyText,
  pillars = [],
  mediaSrc,                // optional image/video URL — falls back to illustration
  mediaVideo = false,
  mediaAlt = '',
  mediaChips = [],
  reverse = false,
  background = 'canvas',   // 'canvas' | 'surface'
}) {
  const fallback = variant === 'what' ? <WhatIllustration /> : <WhoIllustration />;
  return (
    <section
      className="tell-section"
      style={{ background: background === 'surface' ? 'var(--bg-surface)' : 'var(--bg-canvas)', borderTop: background === 'surface' ? '1px solid var(--border-default)' : '', borderBottom: background === 'surface' ? '1px solid var(--border-default)' : '' }}
    >
      <div className="container">
        <div className={`tell-grid ${reverse ? 'tell-reverse' : ''}`}>
          {/* Text column */}
          <div>
            <Reveal>
              <span className="eyebrow">{eyebrow}</span>
              <h2 className="display-md mt-4">{title}</h2>
            </Reveal>
            <div className="mt-6">
              <ScrollTell text={bodyText} />
            </div>
            {pillars.length > 0 && (
              <div className="tell-pillars">
                {pillars.map((p, i) => (
                  <div className="tell-pillar" key={i}>
                    <span className="tell-pillar-icon">{p.icon}</span>
                    <div className="tell-pillar-text">
                      {p.label}
                      {p.sub ? <small>{p.sub}</small> : null}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Media column */}
          <div className="tell-media-wrap">
            <MediaPanel
              src={mediaSrc}
              video={mediaVideo}
              alt={mediaAlt}
              fallback={fallback}
              chips={mediaChips}
              side={reverse ? 'right' : 'left'}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export const WHO_DEFAULTS = {
  eyebrow: 'Who we are',
  title: 'A technology company with sustainability in its DNA.',
  bodyText: `At SRM ECO TECH, we are a forward-thinking technology company committed to transforming businesses through smart IT solutions and sustainable compliance services. With a strong foundation in custom software development, automation, and enterprise IT systems, we empower organizations to achieve efficiency, scalability, and innovation.

While technology is our core, we also proudly serve as trusted partners in EPR (Extended Producer Responsibility) compliance and environmental consultancy, helping industries navigate regulatory frameworks with ease and responsibility.`,
  pillars: [
    { icon: <Code2 size={16} />,       label: 'Smart IT',              sub: 'Software, automation, AI/ML' },
    { icon: <Leaf size={16} />,        label: 'EPR Compliance',        sub: 'CPCB-aligned plastic waste mgmt' },
    { icon: <ShieldCheck size={16} />, label: 'Enterprise-grade',      sub: 'SOC2-aligned, audit-ready' },
    { icon: <Users size={16} />,       label: 'Long-haul partner',     sub: '4+ year avg engagement' },
  ],
  mediaChips: [
    { icon: <Leaf size={12} />, label: 'Sustainability first' },
    { icon: <Sparkles size={12} />, label: 'AI-native' },
  ],
};

export const WHAT_DEFAULTS = {
  eyebrow: 'What we do',
  title: 'We build digital ecosystems — not just software.',
  bodyText: `At SRM ECO TECH, we bridge the gap between business needs and digital innovation. Whether you are a growing startup, a mid-size enterprise, or an established industry player, we provide tailored software solutions that solve real-world challenges.

We don't just develop software — we build digital ecosystems that streamline operations, improve decision-making, and enable future growth.

Alongside our IT services, our experienced EPR team supports manufacturers, importers, and brand owners in meeting their plastic waste management obligations under CPCB guidelines with accuracy and peace of mind.`,
  pillars: [
    { icon: <Workflow size={16} />,    label: 'Workflow automation',  sub: 'No-code orchestration' },
    { icon: <BarChart3 size={16} />,   label: 'Data + analytics',     sub: 'Lakehouse, BI, ML' },
    { icon: <Cpu size={16} />,         label: 'AI / ML platform',     sub: '60+ models in prod' },
    { icon: <Leaf size={16} />,        label: 'EPR support team',     sub: 'CPCB filings, end-to-end' },
  ],
  mediaChips: [
    { icon: <BarChart3 size={12} />, label: 'Live dashboards' },
    { icon: <Code2 size={12} />, label: 'Custom builds' },
  ],
};
