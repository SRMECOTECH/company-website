import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import ProductVisual from './ProductVisual.jsx';

const PILL_CLASS = {
  Operations: 'pill pill-brand',
  Intelligence: 'pill pill-info',
  Communication: 'pill',
  Security: 'pill',
  Finance: 'pill pill-accent',
};

export default function ProductCard({ product, onOpen }) {
  const ref = useRef(null);

  function onMove(e) {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }
  function onKey(e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen?.(); }
  }

  return (
    <article
      ref={ref}
      className="card card-interactive spotlight product-card"
      onMouseMove={onMove}
      onClick={onOpen}
      onKeyDown={onKey}
      role="button"
      tabIndex={0}
      aria-label={`${product.name} — open details`}
    >
      <div className="product-visual"><ProductVisual slug={product.slug} /></div>

      <div className="flex items-center justify-between mt-4">
        <h3 className="heading-lg">{product.name}</h3>
        <span className={PILL_CLASS[product.category] || 'pill'}>{product.category}</span>
      </div>
      <p className="body-md mt-2">{product.tagline}</p>

      <ul className="product-features" style={{ listStyle: 'none', padding: 0, margin: '14px 0 0' }}>
        {product.features.map((f) => <li key={f}>{f}</li>)}
      </ul>

      <span className="mt-4" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--brand-primary)', fontWeight: 600, fontSize: 14 }}>
        Explore <ArrowRight size={14} className="product-arrow" />
      </span>
    </article>
  );
}
