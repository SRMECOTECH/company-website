import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo.jsx';
import NewsletterInline from './NewsletterInline.jsx';

const QUICK_LINKS = [
  { to: '/services',          label: 'Services & Expertise' },
  { to: '/about',             label: 'About Us' },
  { to: '/epr#process',       label: 'Our Process' },
  { to: '/services#domains',  label: 'Domain Expertise' },
  { to: '/about#contact',     label: 'Contact Us' },
];

const SERVICE_LINKS = [
  { to: '/services#capabilities', label: 'IT Capabilities' },
  { to: '/services#domains',      label: 'Domain Expertise' },
  { to: '/epr',                   label: 'EPR Registration' },
  { to: '/epr#solutions',         label: 'Compliance' },
];

const LEGAL = [
  { to: '#', label: 'Privacy Policy' },
  { to: '#', label: 'Terms of Service' },
  { to: '#', label: 'Cookie Policy' },
  { to: '#', label: 'Sitemap' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ paddingBlock: 48 }}>
        <NewsletterInline />
      </div>
      <div className="divider-grad" />

      <div className="container footer-grid">
        {/* Brand column */}
        <div>
          <Logo size="md" />
          <p className="body-sm mt-4" style={{ maxWidth: 340 }}>
            Sustainable solutions for a greener tomorrow. Expert guidance on EPR compliance,
            waste management, and innovative IT services.
          </p>
          <div className="social mt-5">
            {[
              { Icon: Facebook,  label: 'Facebook',  href: '#' },
              { Icon: Instagram, label: 'Instagram', href: '#' },
              { Icon: Linkedin,  label: 'LinkedIn',  href: '#' },
              { Icon: Twitter,   label: 'Twitter',   href: '#' },
            ].map(({ Icon, label, href }) => (
              <a key={label} href={href} aria-label={label} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            {QUICK_LINKS.map((l) => <li key={l.label}><Link to={l.to}>{l.label}</Link></li>)}
          </ul>
        </div>

        {/* Our Services */}
        <div className="footer-col">
          <h4>Our Services</h4>
          <ul>
            {SERVICE_LINKS.map((l) => <li key={l.label}><Link to={l.to}>{l.label}</Link></li>)}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Contact Us</h4>
          <ul>
            <li className="flex items-start gap-3">
              <MapPin size={14} style={{ color: 'var(--brand-primary)', marginTop: 3, flexShrink: 0 }} />
              <span>
                <strong style={{ display: 'block', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Our Location</strong>
                SRM ECO TECH PVT. LTD.<br />
                A-21, Ground Floor,<br />
                Pandav Nagar, Delhi – 110092
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={14} style={{ color: 'var(--brand-primary)', marginTop: 3, flexShrink: 0 }} />
              <span>
                <strong style={{ display: 'block', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Call Us</strong>
                <a href="tel:+919874830490" style={{ display: 'block' }}>(+91) 98748 30490</a>
                <a href="tel:+919581983786" style={{ display: 'block' }}>(+91) 95819 83786</a>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={14} style={{ color: 'var(--brand-primary)', marginTop: 3, flexShrink: 0 }} />
              <span>
                <strong style={{ display: 'block', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Email Us</strong>
                <a href="mailto:info@srmecotech.com">info@srmecotech.com</a>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="divider-grad" />
      <div className="container footer-legal" style={{ paddingBlock: 20 }}>
        <p className="body-sm">© {new Date().getFullYear()} SRM ECO TECH. All rights reserved.</p>
        <ul className="footer-legal-links">
          {LEGAL.map((l) => (
            <li key={l.label}>
              <Link to={l.to}>{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
