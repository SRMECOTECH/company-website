import { useState } from 'react';

/**
 * Framed media panel — accepts either an `src` (image/video) or renders the
 * supplied fallback SVG illustration. Falls back gracefully if the image fails
 * to load (so dropping a real photo into /public is always non-breaking).
 */
export default function MediaPanel({ src, alt, video = false, fallback, chips = [], side = 'left' }) {
  const [broken, setBroken] = useState(false);
  const useFallback = !src || broken;

  return (
    <div className={`media-panel media-panel-${side}`}>
      <div className="media-frame">
        {useFallback ? (
          <div className="media-asset media-fallback">{fallback}</div>
        ) : video ? (
          <video src={src} autoPlay muted loop playsInline className="media-asset" onError={() => setBroken(true)} />
        ) : (
          <img src={src} alt={alt || ''} className="media-asset" loading="lazy" onError={() => setBroken(true)} />
        )}
        <div className="media-overlay" />
        <div className="media-grid" />
      </div>

      {chips.length > 0 && (
        <div className="media-chips">
          {chips.map((c, i) => (
            <span key={i} className="media-chip" style={{ animationDelay: `${i * 0.18}s` }}>
              {c.icon ? <span className="media-chip-icon">{c.icon}</span> : null}
              {c.label}
            </span>
          ))}
        </div>
      )}

      <div className="media-glow" aria-hidden="true" />
    </div>
  );
}
