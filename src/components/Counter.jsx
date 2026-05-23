import { useEffect, useRef, useState } from 'react';

export default function Counter({ to, suffix = '', prefix = '', duration = 1800, decimals = 0 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || startedRef.current) return;
      startedRef.current = true;

      if (reduce) { setVal(to); io.disconnect(); return; }

      const start = performance.now();
      let raf;
      function tick(now) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 4);
        setVal(to * eased);
        if (t < 1) raf = requestAnimationFrame(tick);
      }
      raf = requestAnimationFrame(tick);
      io.disconnect();
    }, { threshold: 0.3 });

    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  const formatted = val.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return <span ref={ref} className="num-grad">{prefix}{formatted}{suffix}</span>;
}
