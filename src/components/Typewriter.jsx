import { useEffect, useState, useRef } from 'react';

/**
 * Typewriter — types each phrase, holds, then deletes, then moves on.
 * Respects prefers-reduced-motion (just shows the first phrase statically).
 */
export default function Typewriter({
  phrases = [],
  typeSpeed = 70,
  deleteSpeed = 35,
  holdMs = 1600,
  className = '',
}) {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState('typing'); // typing | holding | deleting
  const [idx, setIdx] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    if (reduced.current && phrases.length) {
      setText(phrases[0]);
    }
  }, [phrases]);

  useEffect(() => {
    if (reduced.current || !phrases.length) return undefined;
    const current = phrases[idx % phrases.length];
    let t;

    if (phase === 'typing') {
      if (text.length < current.length) {
        t = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed);
      } else {
        t = setTimeout(() => setPhase('deleting'), holdMs);
      }
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        t = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteSpeed);
      } else {
        setIdx((i) => (i + 1) % phrases.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(t);
  }, [text, phase, idx, phrases, typeSpeed, deleteSpeed, holdMs]);

  return (
    <span className={`typewriter ${className}`} aria-live="polite">
      <span className="typewriter-text">{text || ' '}</span>
      <span className="typewriter-caret" aria-hidden="true">|</span>
    </span>
  );
}
