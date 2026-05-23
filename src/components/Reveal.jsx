import { useEffect, useRef, useState } from 'react';

export default function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  variant = 'up',
  delay = 0,
  threshold = 0.15,
  once = true,
  ...props
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') { setShown(true); return; }

    // On mobile, tall elements may never reach the desktop threshold — use a smaller value.
    const isMobile = window.innerWidth < 768;
    const effectiveThreshold = isMobile ? Math.min(threshold, 0.05) : threshold;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShown(true);
        if (once) io.disconnect();
      } else if (!once) {
        setShown(false);
      }
    }, { threshold: effectiveThreshold });

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);

  const variantCls = variant === 'left' ? 'reveal-left' : variant === 'right' ? 'reveal-right' : variant === 'zoom' ? 'reveal-zoom' : '';

  return (
    <Tag
      ref={ref}
      className={`reveal ${variantCls} ${shown ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...(props.style || {}) }}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function Stagger({ children, className = '', as: Tag = 'div', threshold = 0.12, ...props }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isMobile = window.innerWidth < 768;
    const effectiveThreshold = isMobile ? Math.min(threshold, 0.05) : threshold;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: effectiveThreshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag ref={ref} className={`stagger ${shown ? 'in' : ''} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
