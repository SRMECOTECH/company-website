import { useState } from 'react';
import { Loader2, Send, CheckCircle2, AlertCircle, Mail } from 'lucide-react';
import { apiBase } from '../lib/api.js';

const TOPICS = ['General enquiry', 'Schedule a demo', 'EPR compliance', 'Smart-Truck GPS', 'Data / ML engagement', 'Careers'];
const INBOX = 'info@srmecotech.com';

/** Build a mailto: link from the form data so submissions still work even if
 *  the backend isn't reachable (no server, no SMTP creds, dev environment, etc.). */
function buildMailto(d) {
  const subject = `[${d.topic || 'General enquiry'}] ${d.name || 'New enquiry'} — SRM ECO TECH`;
  const lines = [
    `Name: ${d.name || ''}`,
    `Email: ${d.email || ''}`,
    d.phone   ? `Phone: ${d.phone}`     : '',
    d.company ? `Company: ${d.company}` : '',
    `Topic: ${d.topic || ''}`,
    '',
    'Message:',
    d.message || '',
  ].filter(Boolean).join('\n');
  return `mailto:${INBOX}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`;
}

async function tryApi(payload) {
  // 6 second timeout — if the mail server isn't running we don't want to hang.
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 6000);
  try {
    const res = await fetch(`${apiBase()}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, error: json?.error || `Server error (${res.status})` };
    return { ok: true, message: json.message };
  } catch {
    return { ok: false, error: 'network' };
  } finally {
    clearTimeout(t);
  }
}

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | loading | ok | mailto | err
  const [msg, setMsg] = useState('');
  const [lastPayload, setLastPayload] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    setStatus('loading');
    setLastPayload(payload);

    const result = await tryApi(payload);
    if (result.ok) {
      setStatus('ok');
      setMsg(result.message || "Thanks — we'll get back to you shortly.");
      e.target.reset();
      return;
    }

    // Backend unreachable / not configured → fall back to mailto so the user
    // still has a one-click path to send their message.
    const mailto = buildMailto(payload);
    setStatus('mailto');
    setMsg("Our mail server isn't reachable from this preview build. We've opened your email client with the message pre-filled — just hit send.");
    // Open in the same tab so popup blockers don't interfere
    window.location.href = mailto;
  }

  if (status === 'ok') {
    return (
      <div style={{ borderRadius: 18, border: '1px solid var(--border-default)', background: 'var(--brand-primary-soft)', padding: 32, textAlign: 'center' }}>
        <CheckCircle2 size={44} style={{ color: 'var(--brand-primary)', margin: '0 auto' }} />
        <h3 className="display-sm mt-4">Message sent.</h3>
        <p className="body-md mt-2">{msg}</p>
      </div>
    );
  }

  if (status === 'mailto') {
    const mailto = lastPayload ? buildMailto(lastPayload) : `mailto:${INBOX}`;
    return (
      <div style={{ borderRadius: 18, border: '1px solid var(--border-default)', background: 'var(--bg-surface-2)', padding: 28 }}>
        <Mail size={32} style={{ color: 'var(--brand-primary)' }} />
        <h3 className="heading-lg mt-3">Sending via your email app</h3>
        <p className="body-md mt-2">{msg}</p>
        <div className="flex gap-3 mt-5" style={{ flexWrap: 'wrap' }}>
          <a href={mailto} className="btn btn-primary">
            <Mail size={16} /> Open mail app again
          </a>
          <a href={`mailto:${INBOX}`} className="btn btn-secondary">
            Email us directly
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid" style={{ gap: 16, gridTemplateColumns: '1fr' }}>
      <div className="grid" style={{ gap: 16, gridTemplateColumns: '1fr 1fr' }}>
        <label>
          <span className="field-label">Name *</span>
          <input name="name" required minLength={2} className="input" placeholder="Your full name" />
        </label>
        <label>
          <span className="field-label">Email *</span>
          <input name="email" type="email" required className="input" placeholder="you@company.com" autoComplete="email" />
        </label>
      </div>
      <div className="grid" style={{ gap: 16, gridTemplateColumns: '1fr 1fr' }}>
        <label>
          <span className="field-label">Phone</span>
          <input name="phone" type="tel" className="input" placeholder="+91 ..." autoComplete="tel" />
        </label>
        <label>
          <span className="field-label">Company</span>
          <input name="company" className="input" placeholder="Your organisation" />
        </label>
      </div>
      <label>
        <span className="field-label">What's this about? *</span>
        <select name="topic" required className="select">
          {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </label>
      <label>
        <span className="field-label">Message *</span>
        <textarea name="message" required minLength={10} className="textarea" rows={6} placeholder="Tell us a little about your project, scale, and timeline." />
      </label>

      <button type="submit" className="btn btn-primary btn-lg mt-2" disabled={status === 'loading'} aria-busy={status === 'loading'} style={{ justifySelf: 'start' }}>
        {status === 'loading' ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
        {status === 'loading' ? 'Sending…' : 'Send message'}
      </button>

      {status === 'err' && (
        <p style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--status-danger)', marginTop: 8 }}>
          <AlertCircle size={16} /> {msg}
        </p>
      )}
    </form>
  );
}
