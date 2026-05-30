import { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { apiBase } from '../lib/api.js';

export default function NewsletterInline() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [msg, setMsg] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${apiBase()}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Subscription failed');
      setStatus('ok');
      setMsg(json.message || "You're in. Check your inbox.");
      setEmail('');
    } catch (err) {
      setStatus('err');
      setMsg(err.message || 'Something went wrong.');
    }
  }

  return (
    <div className="grid-2 items-center">
      <div>
        <span className="eyebrow"><Mail size={12} /> Newsletter</span>
        <h3 className="display-sm mt-3">Stay ahead of the curve.</h3>
        <p className="body-md mt-2 max-w-xl">
          Get monthly product drops and engineering deep-dives delivered straight to
          your inbox. No spam — unsubscribe any time.
        </p>
      </div>
      <form onSubmit={onSubmit} className="flex gap-3" style={{ flexWrap: 'wrap' }}>
        <label htmlFor="nl-email" className="visually-hidden" style={{ position: 'absolute', left: '-9999px' }}>Email</label>
        <input
          id="nl-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          disabled={status === 'loading'}
          style={{ flex: '1 1 220px', minWidth: 0 }}
        />
        <button type="submit" className="btn btn-primary" disabled={status === 'loading'} aria-busy={status === 'loading'}>
          {status === 'loading' ? <Loader2 size={16} className="spin" /> : null}
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>
      {status === 'ok' && (
        <div className="flex items-center gap-2" style={{ gridColumn: '1 / -1', color: 'var(--status-success)', fontSize: 14, marginTop: -8 }}>
          <CheckCircle2 size={16} /> {msg}
        </div>
      )}
      {status === 'err' && (
        <div className="flex items-center gap-2" style={{ gridColumn: '1 / -1', color: 'var(--status-danger)', fontSize: 14, marginTop: -8 }}>
          <AlertCircle size={16} /> {msg}
        </div>
      )}
    </div>
  );
}
