import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    // Only on devices with a fine pointer (mice / trackpads)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';

    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let tx = x, ty = y, raf = 0;

    function move(e) {
      tx = e.clientX; ty = e.clientY;
      el.style.opacity = '1';
    }
    function leave() { el.style.opacity = '0'; }

    function loop() {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener('pointermove', move);
    document.addEventListener('pointerleave', leave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
