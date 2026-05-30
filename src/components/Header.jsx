import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Home as HomeIcon, Users, Wrench, Leaf, Package, FolderKanban, Mail,
  Calendar, X,
} from 'lucide-react';
import Logo from './Logo.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import { googleCalendarUrl } from '../lib/calendar.js';

const NAV = [
  { to: '/',              label: 'Home',                 Icon: HomeIcon },
  { to: '/about',         label: 'About Us',             Icon: Users },
  { to: '/services',      label: 'Services & Expertise', Icon: Wrench },
  { to: '/epr',           label: 'EPR Services',         Icon: Leaf },
  { to: '/products',      label: 'Products',             Icon: Package },
  { to: '/projects',      label: 'Projects',             Icon: FolderKanban },
  { to: '/about#contact', label: 'Contact',              Icon: Mail },
];

function MobileMenu({ open, onClose }) {
  // Render via portal so the menu is a child of <body>, escaping any
  // containing-block created by the fixed header / parents.
  return createPortal(
    <div
      className={`mm-overlay${open ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
    >
      <div className="mm-bg" aria-hidden="true">
        <div className="mm-orb mm-orb-a" />
        <div className="mm-orb mm-orb-b" />
      </div>

      <div className="mm-top">
        <span className="mm-eyebrow">Navigate</span>
        <button
          type="button"
          className="mm-close"
          aria-label="Close menu"
          onClick={onClose}
        >
          <X size={22} />
        </button>
      </div>

      <nav className="mm-nav" aria-label="Mobile primary">
        {NAV.map((n, i) => {
          const Cmp = n.Icon;
          return (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/'}
              className={({ isActive }) => `mm-link${isActive ? ' is-active' : ''}`}
              style={{ '--i': i }}
              onClick={onClose}
            >
              <span className="mm-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="mm-icon"><Cmp size={20} strokeWidth={2.2} /></span>
              <span className="mm-label">{n.label}</span>
              <ArrowRight className="mm-arrow" size={18} />
            </NavLink>
          );
        })}
      </nav>

      <div className="mm-foot">
        <a
          href={googleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-lg mm-cta"
          onClick={onClose}
        >
          <Calendar size={16} /> Schedule a Call <ArrowRight size={16} />
        </a>
        <p className="mm-tag">
          SRM ECO TECH &middot; Technology &middot; Sustainability &middot; Scale
        </p>
      </div>
    </div>,
    document.body
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 8); }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <Logo />

        <nav className="nav" aria-label="Primary">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={googleCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm cta-call"
          >
            Schedule a Call <ArrowRight size={14} />
          </a>
          <button
            type="button"
            className={`menu-btn-x icon-btn${open ? ' is-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="menu-bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
