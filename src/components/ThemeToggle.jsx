import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const t = document.documentElement.dataset.theme || 'dark';
    setTheme(t);
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('srmtheme', next); } catch {}
    setTheme(next);
  }

  const isDark = theme === 'dark';
  return (
    <button
      className="icon-btn"
      onClick={toggle}
      aria-label="Toggle theme"
      aria-pressed={isDark}
      style={{ position: 'relative' }}
    >
      <Sun size={16} className={`theme-icon ${isDark ? 'hidden' : 'shown'}`} />
      <Moon size={16} className={`theme-icon ${isDark ? 'shown' : 'hidden'}`} />
    </button>
  );
}
