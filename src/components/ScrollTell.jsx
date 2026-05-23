import { Fragment, useEffect, useMemo, useRef, useState } from 'react';

/**
 * Cinematic word-by-word reveal driven by actual scroll position.
 * Words fade from a soft blur to a crisp, fully-lit state as the block scrolls past.
 */
export default function ScrollTell({ text, className = '', overshoot = 1.45, lead = 6 }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    function compute() {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const winH = window.innerHeight || document.documentElement.clientHeight;
      const total = rect.height + winH * 0.6;
      const passed = winH - rect.top - winH * 0.25;
      const p = Math.max(0, Math.min(1, passed / total));
      setProgress(p);
    }
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    }
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const paragraphs = useMemo(
    () => (text || '').split(/\n{2,}/).map((p) => p.trim()).filter(Boolean),
    [text]
  );

  const flat = paragraphs.flatMap((p) => p.split(/\s+/));
  const activeCount = Math.floor(flat.length * Math.min(1, progress * overshoot));

  let i = 0;
  return (
    <div ref={ref} className={`scroll-tell ${className}`}>
      {paragraphs.map((p, pi) => {
        const words = p.split(/\s+/);
        return (
          <p key={pi} className="st-para">
            {words.map((w, wi) => {
              const idx = i++;
              const active = idx < activeCount;
              const distance = idx - activeCount;
              return (
                <Fragment key={wi}>
                  <span
                    className={`st-word ${active ? 'active' : ''}`}
                    style={{ transitionDelay: `${Math.max(0, lead - Math.abs(distance)) * 12}ms` }}
                  >
                    {w}
                  </span>
                  {wi < words.length - 1 ? ' ' : ''}
                </Fragment>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}
