import { Link } from 'react-router-dom';
import { ArrowRight, AlertCircle, Megaphone, Calendar } from 'lucide-react';
import CTABanner from '../components/CTABanner.jsx';
import Reveal, { Stagger } from '../components/Reveal.jsx';

const CATEGORY_META = {
  Update:  { Icon: Megaphone,   accent: '#60A5FA' },
  Release: { Icon: AlertCircle, accent: '#F97316' },
  Public:  { Icon: Calendar,    accent: '#A78BFA' },
};

const NOTICES = [
  {
    id: 'nexgen-tms-2-1',
    date: '2025-03-15',
    category: 'Release',
    title: 'neXgen TMS 2.1 — release notes',
    summary:
      'Live trip replay, faster anomaly alerts, and a redesigned driver scorecard. Available to all neXgen TMS customers from this week.',
    tags: ['neXgen', 'Release'],
  },
  {
    id: 'newsletter-mar25',
    date: '2025-03-15',
    category: 'Update',
    title: 'SRM ECO TECH monthly digest — March 2025',
    summary:
      "This month: a deep-dive on lakehouse cost economics, the neXgen TMS 2.1 release notes, and what we've been building on the AI Studio.",
    tags: ['Newsletter', 'Digest'],
  },
  {
    id: 'office-closure-may',
    date: '2025-05-01',
    category: 'Public',
    title: 'Office observance — 1 May 2025',
    summary:
      'Our Delhi office will remain closed on 1st May 2025 in observance of International Labour Day. Urgent queries can still reach us at info@srmecotech.com.',
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
              Product releases & <span className="text-flow">official communications.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="body-lg mt-5">
              Release notes from the neXgen Suite, monthly digests, and client notices.
              Bookmark this page or subscribe to our newsletter so nothing slips past you.
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
                          Contact us <ArrowRight size={14} />
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
