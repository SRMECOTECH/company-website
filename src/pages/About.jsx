import { Leaf, Target, Eye, Sparkles, ShieldCheck, Users, HeartHandshake, Lightbulb, Mail, Phone, MapPin, Clock, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import CTABanner from '../components/CTABanner.jsx';
import Reveal, { Stagger } from '../components/Reveal.jsx';
import Counter from '../components/Counter.jsx';
// import TeamCards from '../components/TeamCards.jsx';
import ContactForm from '../components/ContactForm.jsx';

const VALUES = [
  { Icon: Lightbulb,      title: 'Engineering rigour',   body: 'We treat every code path as production. No demo-grade work that pretends to scale.' },
  { Icon: ShieldCheck,    title: 'Trustworthy by design', body: 'Security, observability and audit trails are baked in from the first commit — never bolted on.' },
  { Icon: Leaf,           title: 'Sustainability first', body: 'Software that supports compliance and circular-economy goals is part of who we are.' },
  { Icon: Users,          title: 'Customer-aligned',     body: "We bill on outcomes, not seats. If it doesn't move your business, it doesn't ship." },
  { Icon: HeartHandshake, title: 'Long-haul partner',    body: 'Our average customer relationship is 4+ years. We stay until you outgrow needing us.' },
  { Icon: Sparkles,       title: 'Bias for elegance',    body: 'Simple beats clever. A short, boring system that runs for years is worth more than a fashionable one.' },
];

const CONTACT_BLOCKS = [
  {
    Icon: MapPin,
    label: 'Office',
    lines: [
      'SRM ECO TECH PVT. LTD.',
      'A-21, Ground Floor,',
      'Pandav Nagar, Delhi',
      'Pin – 110092',
    ],
  },
  { Icon: Phone, label: 'Phone', value: '(+91) 98748 30490', href: 'tel:+919874830490' },
  { Icon: Phone, label: 'Phone', value: '(+91) 95819 83786', href: 'tel:+919581983786' },
  { Icon: Mail,  label: 'Email', value: 'info@srmecotech.com', href: 'mailto:info@srmecotech.com' },
  { Icon: Clock, label: 'Hours', value: 'Mon – Fri · 10:00 AM – 7:00 PM IST' },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="hero" style={{ paddingTop: 132, paddingBottom: 72 }}>
        <div className="hero-grid" />
        <div className="container text-center" style={{ position: 'relative', maxWidth: 880 }}>
          <Reveal><span className="eyebrow">Our story</span></Reveal>
          <Reveal delay={80}>
            <h1 className="display-lg mt-5">
              We build the digital plumbing behind the modern, <span className="text-flow">sustainable enterprise.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="body-lg mt-5 mx-auto" style={{ maxWidth: 720 }}>
              Founded in Delhi in 2023, SRM ECO TECH was born at the intersection of two fast-moving worlds:
              enterprise software and environmental compliance. Our customers don't have to choose between
              the two — we deliver both, under one roof.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="section">
        <div className="container grid-2">
          <Reveal>
            <article className="card-grad h-full">
              <div className="icon-tile-grad"><Target size={26} /></div>
              <h2 className="display-sm mt-5">Our Mission</h2>
              <p className="body-md mt-3">
                To make scalable engineering — software, data, ML and geospatial — accessible to Indian
                enterprises that have outgrown SaaS but aren't ready for a 100-person tech team.
                We become that team, on-demand, with full skin in the game.
              </p>
            </article>
          </Reveal>
          <Reveal delay={80}>
            <article className="card-grad h-full">
              <div className="icon-tile-grad" style={{ background: 'var(--gradient-cta)' }}><Eye size={26} /></div>
              <h2 className="display-sm mt-5">Our Vision</h2>
              <p className="body-md mt-3">
                A world where every truck, every invoice, every kilogram of plastic and every audit log is
                accounted for in software — automatically, transparently, and at a cost that makes business
                sense for the next billion users.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Team section — commented out per request
      <section className="section bordered" id="team" style={{ background: 'var(--bg-surface)', position: 'relative', overflow: 'hidden' }}>
        <div className="team-bg-grid" aria-hidden="true" />
        <div className="container" style={{ position: 'relative' }}>
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <span className="eyebrow">Our team</span>
              <h2 className="display-md mt-4">The people behind the platform.</h2>
              <p className="body-lg mt-4">
                A small, senior team — engineers and architects who have shipped production
                systems at scale before bringing that experience to SRM Eco Tech.
              </p>
            </div>
          </Reveal>
          <div className="mt-12">
            <TeamCards />
          </div>
        </div>
      </section>
      */}

      {/* Values */}
      <section className="section">
        <div className="container">
          <Reveal><span className="eyebrow">What we believe</span></Reveal>
          <Reveal delay={80}><h2 className="display-md mt-4 max-w-3xl">Six values we hire and ship by.</h2></Reveal>
          <Stagger className="grid-3 mt-12">
            {VALUES.map((v) => (
              <article key={v.title} className="card card-interactive h-full">
                <div className="icon-tile"><v.Icon size={22} /></div>
                <h3 className="heading-md mt-4">{v.title}</h3>
                <p className="body-md mt-2">{v.body}</p>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Numbers */}
      <section className="section bordered" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">By the numbers</span>
            <h2 className="display-md mt-4">Three years young. Production-grade footprint.</h2>
          </Reveal>
          <div className="stats mt-12">
            {[
              { v: 12, suffix: '+', l: 'enterprise customers' },
              { v: 8000, suffix: '+', l: 'trucks tracked live' },
              { v: 60, suffix: '+', l: 'ML models in prod' },
              { v: 99.95, suffix: '%', l: 'platform uptime', decimals: 2 },
            ].map((s) => (
              <div key={s.l}>
                <div className="stat-value"><Counter to={s.v} suffix={s.suffix} decimals={s.decimals || 0} /></div>
                <p className="stat-label">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact section (merged from /contact) */}
      <section className="section" id="contact">
        <div className="container">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <span className="eyebrow">Get in touch</span>
              <h2 className="display-md mt-4">
                Let's talk. <span className="text-flow">Usually we reply within a few hours.</span>
              </h2>
              <p className="body-lg mt-4">
                Tell us what you're building. The right engineer or compliance lead will get back —
                not a sales rep.
              </p>
            </div>
          </Reveal>

          <div className="contact-grid mt-12" style={{ display: 'grid', gap: 32 }}>
            <Reveal>
              <div className="flex flex-col gap-4">
                {CONTACT_BLOCKS.map(({ Icon, label, value, lines, href }, idx) => (
                  <div key={`${label}-${idx}`} className="card flex items-start gap-4">
                    <div className="icon-tile shrink-0"><Icon size={18} /></div>
                    <div>
                      <p className="body-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700 }}>{label}</p>
                      {lines ? (
                        <p className="text-ink mt-1" style={{ lineHeight: 1.55 }}>
                          {lines.map((line, i) => (
                            <span key={i} style={{ display: 'block' }}>{line}</span>
                          ))}
                        </p>
                      ) : href ? (
                        <a href={href} className="text-ink mt-1" style={{ display: 'inline-block', transition: 'color 200ms' }}>{value}</a>
                      ) : (
                        <p className="text-ink mt-1">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
                <div className="card">
                  <p className="body-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700 }}>Find us online</p>
                  <div className="social mt-3">
                    {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                      <a key={i} href="#" aria-label="Social"><Icon size={16} /></a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="card">
                <h3 className="heading-lg">Send us a message</h3>
                <p className="body-sm mt-1">All fields marked * are required.</p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <style>{`
          @media (min-width: 1024px) {
            .contact-grid { grid-template-columns: 1fr 1.4fr !important; gap: 40px !important; }
          }
        `}</style>
      </section>

      {/* Map */}
      <section style={{ paddingBottom: 96 }}>
        <div className="container">
          <Reveal>
            <div style={{ overflow: 'hidden', borderRadius: 24, border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-lg)' }}>
              <iframe
                title="Map · SRM ECO TECH · Pandav Nagar, Delhi"
                src="https://www.openstreetmap.org/export/embed.html?bbox=77.2700%2C28.6180%2C77.3050%2C28.6430&layer=mapnik&marker=28.6309%2C77.2826"
                style={{ width: '100%', height: 420, border: 0, display: 'block' }}
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <CTABanner
        eyebrow="Work with us"
        title="Looking for a long-haul engineering partner?"
        body="We work with a deliberately small number of customers at a time. If we're the right fit, you'll know in the first call."
      />
    </>
  );
}
