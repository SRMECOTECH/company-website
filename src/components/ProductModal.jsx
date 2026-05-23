import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { X, Check, ArrowRight, Calendar } from 'lucide-react';
import Icon from './Icon.jsx';
import { googleCalendarUrl } from '../lib/calendar.js';

export default function ProductModal({ product, onClose }) {
  useEffect(() => {
    if (!product) return;
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  if (!product) return null;

  return createPortal((
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="prod-modal-title" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" aria-label="Close" onClick={onClose}>
          <X size={16} />
        </button>

        <div className="flex items-center gap-4">
          <div className="product-icon" style={{ background: 'var(--gradient-brand)', width: 64, height: 64, borderRadius: 18 }}>
            <Icon name={product.icon} size={30} />
          </div>
          <div>
            <span className="pill pill-brand">{product.category}</span>
            <h2 id="prod-modal-title" className="display-sm mt-2">{product.name}</h2>
          </div>
        </div>

        <p className="body-md mt-6">{product.description}</p>

        <h3 className="mt-8" style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-muted)', fontWeight: 700 }}>
          What you get
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0', display: 'grid', gap: 12, gridTemplateColumns: '1fr' }}>
          {product.highlights.map((h) => (
            <li key={h} className="flex items-start gap-3">
              <span style={{
                display: 'grid', placeItems: 'center',
                width: 22, height: 22, borderRadius: 999,
                background: 'var(--brand-primary-soft)', color: 'var(--brand-primary)',
                flexShrink: 0, marginTop: 2,
              }}>
                <Check size={12} strokeWidth={3} />
              </span>
              <span className="body-md" style={{ color: 'var(--text-secondary)' }}>{h}</span>
            </li>
          ))}
        </ul>

        <div className="flex gap-3 mt-8" style={{ flexWrap: 'wrap' }}>
          <a
            href={googleCalendarUrl({ title: `Demo · ${product.name}`, details: `Walkthrough of ${product.name} from the neXgen Suite.` })}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            onClick={onClose}
          >
            <Calendar size={16} /> Request Demo
          </a>
          <Link to="/services" className="btn btn-secondary" onClick={onClose}>
            See how it integrates <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  ), document.body);
}
