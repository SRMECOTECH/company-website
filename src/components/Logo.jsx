import { Link } from 'react-router-dom';

/**
 * Brand logo rendered from the actual company PNG — no inline SVG.
 * Dark-mode handling via CSS filter so the mark stays visible on both themes.
 *
 * The PNG lives at /images/logo.png (served from public/).
 * Sizing is driven by a CSS custom property `--logo-h` set per size variant.
 */
export default function Logo({ size = 'md' }) {
  return (
    <Link to="/" className={`logo logo-${size}`} aria-label="SRM ECO TECH — home">
      <img
        src="/images/logo.png"
        alt="SRM ECO TECH"
        className="logo-img"
        draggable={false}
      />
    </Link>
  );
}
