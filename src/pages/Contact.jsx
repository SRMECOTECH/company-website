import { Mail, Phone, MapPin, Clock, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import ContactForm from '../components/ContactForm.jsx';
import Reveal from '../components/Reveal.jsx';
import TellSection, { WHO_DEFAULTS, WHAT_DEFAULTS } from '../components/TellSection.jsx';

export default function Contact() {
  return (
    <>
      <section className="hero" style={{ paddingTop: 132, paddingBottom: 56 }}>
        <div className="hero-grid" />
        <div className="container" style={{ position: 'relative', maxWidth: 800 }}>
          <Reveal><span className="eyebrow">Contact</span></Reveal>
          <Reveal delay={80}>
            <h1 className="display-lg mt-5">
              Let's talk. <span className="text-flow">Usually we reply within a few hours.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="body-lg mt-5">
              Tell us what you're building. The right engineer or compliance lead will get back —
              not a sales rep.
            </p>
          </Reveal>
        </div>
      </section>

      <TellSection variant="who" {...WHO_DEFAULTS} />
      <TellSection variant="what" reverse background="surface" {...WHAT_DEFAULTS} />

      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container grid" style={{ gap: 40, gridTemplateColumns: '1fr' }}>
          <div className="contact-grid" style={{ display: 'grid', gap: 40 }}>
            <Reveal>
              <div className="flex flex-col gap-5">
                {[
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
                  { Icon: Phone,  label: 'Phone',  value: '(+91) 98748 30490', href: 'tel:+919874830490' },
                  { Icon: Phone,  label: 'Phone',  value: '(+91) 95819 83786', href: 'tel:+919581983786' },
                  { Icon: Mail,   label: 'Email',  value: 'info@srmecotech.com', href: 'mailto:info@srmecotech.com' },
                  { Icon: Clock,  label: 'Hours',  value: 'Mon – Fri · 10:00 AM – 7:00 PM IST' },
                ].map(({ Icon, label, value, lines, href }, idx) => (
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
                <h2 className="heading-lg">Send us a message</h2>
                <p className="body-sm mt-1">All fields marked * are required.</p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <style>{`
        @media (min-width: 1024px) {
          .contact-grid { grid-template-columns: 1fr 1.4fr !important; }
        }
      `}</style>

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
    </>
  );
}
