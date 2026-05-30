/**
 * Renders body copy as plain, static paragraphs (no scroll/blur effect).
 * Kept the same props/signature so callers don't need to change.
 */
export default function ScrollTell({ text, className = '' }) {
  const paragraphs = (text || '')
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className={`tell-body ${className}`}>
      {paragraphs.map((p, i) => (
        <p key={i} className="body-lg tell-para">{p}</p>
      ))}
    </div>
  );
}
