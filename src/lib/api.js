// API base — points to the mail server. Override via VITE_API_BASE in .env.
// In dev: leave the server on http://localhost:8787 (its default).
export function apiBase() {
  return import.meta.env.VITE_API_BASE || 'http://localhost:8787';
}
