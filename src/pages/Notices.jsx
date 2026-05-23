import { Link } from 'react-router-dom';
import { ArrowRight, FileText, AlertCircle, Megaphone, Calendar, Download } from 'lucide-react';
import CTABanner from '../components/CTABanner.jsx';
import Reveal, { Stagger } from '../components/Reveal.jsx';

const CATEGORY_META = {
  Regulatory: { Icon: AlertCircle, accent: '#F97316' },
  Update:     { Icon: Megaphone,   accent: '#60A5FA' },
  Filing:     { Icon: FileText,    accent: '#60A5FA' },
  Public:     { Icon: Calendar,    accent: '#A78BFA' },
};

const NOTICES = [
  {
    id: 'cpcb-pwm-2025',
    date: '2025-04-12',
    category: 'Regulatory',
    title: 'CPCB releases revised EPR targets for Plastic Waste Management (FY 2025-26)',
    summary:
      'The Central Pollution Control Board has issued updated category-wise plastic recycling targets for Producers, Importers and Brand Owners. New thresholds apply from April 2025.',
    tags: ['CPCB', 'PWM', 'EPR'],
    href: 'https://cpcb.nic.in',
  },
  {
    id: 'q4-fy25-filing',
    date: '2025-03-31',
    category: 'Filing',
    title: 'Q4 FY 2024-25 EPR returns due on 30 June 2025',
    summary:
      'Producers must file their quarterly return on the CPCB EPR portal. Reach out to our EPR desk for documentation support and filing assistance.',
    tags: ['Filing', 'Quarterly'],
  },
  {
    id: 'battery-rules-2024',
    date: '2025-02-08',
    category: 'Regulatory',
    title: 'Battery Waste Management Rules — amended notification',
    summary:
      'The Ministry of Environment has notified an amendment that brings additional categories of portable batteries under the EPR framework. We have begun outreach to affected clients.',
    tags: ['BWM', 'Amendment'],
  },
  {
    id: 'newsletter-mar25',
    date: '2025-03-15',
    category: 'Update',
    title: 'SRM ECO TECH monthly digest — March 2025',
    summary:
      "This month: a deep-dive on E-Waste credit reconciliation, the neXgen TMS 2.1 release notes, and what's changing in the CPCB EPR portal next quarter.",
    tags: ['Newsletter', 'Digest'],
  },
  {
    id: 'office-closure-may',
    date: '2025-05-01',
    category: 'Public',
    title: 'Office observance — 1 May 2025',
    summary:
      'Our Delhi office will remain closed on 1st May 2025 in observance of International Labour Day. Urgent compliance queries can still reach us at info@srmecotech.com.',
    tags: ['Holiday'],
  },
];

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: '2-digit' });
}

export default function Notices() {
  return (
    <>
      <section className="hero" style={{ paddingTop: 132, paddingBottom: 56 }}>
        <div className="hero-grid" />
        <div className="container" style={{ position: 'relative', maxWidth: 880 }}>
          <Reveal><span className="eyebrow">Notice Board</span></Reveal>
          <Reveal delay={80}>
            <h1 className="display-lg mt-5">
              Regulatory updates, filings & <span className="text-flow">official communications.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="body-lg mt-5">
              The latest from the CPCB, MoEFCC and state pollution control boards — alongside our own
              client notices and product releases. Bookmark this page or subscribe to our newsletter
              so nothing slips past you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Stagger className="grid" style={{ gridTemplateColumns: '1fr', gap: 20 }}>
            {NOTICES.map((n) => {
              const meta = CATEGORY_META[n.category] || CATEGORY_META.Update;
              const Icon = meta.Icon;
              return (
                <article
                  key={n.id}
                  id={n.id}
                  className="notice"
                  style={{ '--accent': meta.accent }}
                >
                  <div className="notice-date">
                    <span className="notice-date-day">{new Date(n.date).getDate().toString().padStart(2, '0')}</span>
                    <span className="notice-date-mon">{new Date(n.date).toLocaleDateString('en-IN', { month: 'short' }).toUpperCase()}</span>
                    <span className="notice-date-yr">{new Date(n.date).getFullYear()}</span>
                  </div>

                  <div className="notice-body">
                    <div className="notice-meta">
                      <span className="notice-cat"><Icon size={12} /> {n.category}</span>
                      <span className="notice-date-text">{formatDate(n.date)}</span>
                    </div>
                    <h2 className="notice-title">{n.title}</h2>
                    <p className="notice-summary">{n.summary}</p>
                    <div className="notice-tags">
                      {n.tags.map((t) => <span key={t} className="pill">{t}</span>)}
                    </div>
                    <div className="notice-actions">
                      {n.href ? (
                        <a href={n.href} target="_blank" rel="noopener noreferrer" className="notice-link">
                          Read full notice <ArrowRight size={14} />
                        </a>
                      ) : (
                        <Link to="/about#contact" className="notice-link">
                          Ask the EPR desk <ArrowRight size={14} />
                        </Link>
                      )}
                      {n.category === 'Filing' && (
                        <Link to="/epr" className="notice-link notice-link-ghost">
                          <Download size={14} /> Filing checklist
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </Stagger>
        </div>
      </section>

      <CTABanner
        eyebrow="Stay ahead of compliance"
        title="Want these in your inbox?"
        body="Subscribe to the SRM ECO TECH digest. One email a month, no spam, just regulatory updates and engineering deep-dives."
      />
    </>
  );
}
