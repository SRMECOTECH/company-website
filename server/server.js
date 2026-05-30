import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SUBS_FILE = path.join(__dirname, 'subscribers.json');

const PORT = Number(process.env.PORT || 8787);

// ---------- App ----------
const app = express();
app.use(express.json({ limit: '256kb' }));

const allowed = (process.env.CORS_ORIGINS || 'http://localhost:5173').split(',').map((s) => s.trim());
app.use(cors({
  origin(origin, cb) {
    if (!origin || allowed.includes(origin) || allowed.includes('*')) return cb(null, true);
    cb(new Error('CORS blocked: ' + origin));
  },
}));

// ---------- Mailer ----------
let _transporter = null;
function transporter() {
  if (_transporter) return _transporter;
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    throw new Error('SMTP not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS in server/.env');
  }
  _transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || 'false').toLowerCase() === 'true',
    auth: { user, pass },
  });
  return _transporter;
}

async function send({ to, subject, html, text, bcc, replyTo }) {
  const from = process.env.MAIL_FROM || process.env.SMTP_USER;
  return transporter().sendMail({
    from, to, bcc, subject, html,
    text: text || html.replace(/<[^>]+>/g, ''),
    replyTo,
  });
}

// ---------- Subscriber store ----------
async function readSubs() {
  try { return JSON.parse(await fs.readFile(SUBS_FILE, 'utf-8')); }
  catch (e) { if (e.code === 'ENOENT') return []; throw e; }
}
async function writeSubs(list) {
  await fs.writeFile(SUBS_FILE, JSON.stringify(list, null, 2), 'utf-8');
}
function isEmail(s) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(s).trim()); }
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ---------- Email templates ----------
const BRAND = '#00A86B', INK = '#0F172A', MUTED = '#64748B', BG = '#F8FAFC';

function shell(title, body, ctaText, ctaHref) {
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:${BG};font-family:'Inter','Segoe UI',Helvetica,Arial,sans-serif;color:${INK};">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:32px 0;background:${BG};">
    <tr><td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #E2E8F0;">
        <tr><td style="padding:24px 28px;background:linear-gradient(135deg,#00A86B 0%,#14B8A6 100%);">
          <table role="presentation" width="100%"><tr>
            <td style="color:#fff;font-size:18px;font-weight:800;letter-spacing:-0.01em;">SRM ECO TECH</td>
            <td align="right" style="color:#ECFDF5;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;">smart · sustainable</td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:36px 32px;">
          <h1 style="margin:0 0 16px;font-size:24px;line-height:1.25;color:${INK};letter-spacing:-0.02em;">${title}</h1>
          <div style="font-size:15px;line-height:1.65;color:${INK};">${body}</div>
          ${ctaText && ctaHref ? `<p style="margin:28px 0 0;"><a href="${ctaHref}" style="display:inline-block;background:${BRAND};color:#fff;text-decoration:none;font-weight:600;padding:12px 22px;border-radius:10px;">${ctaText}</a></p>` : ''}
        </td></tr>
        <tr><td style="padding:20px 32px;border-top:1px solid #E2E8F0;color:${MUTED};font-size:12px;">
          You are receiving this from SRM ECO TECH PVT LTD · Kolkata, India · <a href="mailto:info@srmecotech.com" style="color:${BRAND};text-decoration:none;">info@srmecotech.com</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function tplContactAdmin(d) {
  const rows = Object.entries(d).map(([k, v]) =>
    `<tr><td style="padding:8px 0;color:${MUTED};font-size:13px;width:120px;text-transform:uppercase;letter-spacing:0.08em;">${esc(k)}</td><td style="padding:8px 0;color:${INK};font-size:14px;">${esc(v).replace(/\n/g, '<br/>')}</td></tr>`
  ).join('');
  return shell(
    'New contact form submission',
    `<p style="margin:0 0 18px;color:${MUTED};">A new enquiry came in through the website.</p>
     <table role="presentation" width="100%" style="border-top:1px solid #E2E8F0;">${rows}</table>`
  );
}

function tplContactAck(name) {
  return shell(
    `Thanks${name ? `, ${esc(name)}` : ''} — we got your message.`,
    `<p>Your message has reached the SRM ECO TECH inbox. A senior engineer or compliance lead will read it
     personally and reply within one business day.</p>
     <p>In the meantime, feel free to browse our case studies — see how we built our Smart-Truck GPS,
     OSRM snap-to-road, and ML/DL platform.</p>`,
    'Browse case studies',
    `${process.env.SITE_URL || 'https://www.srmecotech.com'}/projects`
  );
}

function tplWelcome() {
  return shell(
    'Welcome to the SRM ECO TECH newsletter',
    `<p>You&rsquo;re subscribed. Once a month, we&rsquo;ll send you:</p>
     <ul style="padding-left:20px;line-height:1.7;">
       <li>Product drops from the neXgen Suite</li>
       <li>Engineering deep-dives — GPS, OSRM, data lakes, ML/DL</li>
     </ul>
     <p style="color:${MUTED};font-size:13px;">You can unsubscribe any time by replying with &ldquo;unsubscribe&rdquo;.</p>`,
    'Visit srmecotech.com',
    process.env.SITE_URL || 'https://www.srmecotech.com'
  );
}

function tplNewsletter(subject, html) { return shell(subject, html); }

// ---------- Routes ----------
app.get('/health', (_req, res) => res.json({ ok: true, ts: Date.now() }));

app.post('/api/contact', async (req, res) => {
  const b = req.body || {};
  // Honeypot
  if (typeof b.website === 'string' && b.website.length > 0) return res.json({ message: 'ok' });

  const fields = ['name', 'email', 'phone', 'company', 'topic', 'message'];
  const data = {};
  for (const f of fields) {
    const v = String(b[f] ?? '').trim();
    if (v.length > 4000) return res.status(400).json({ error: `Field "${f}" is too long.` });
    data[f] = v;
  }
  if (!data.name || data.name.length < 2) return res.status(400).json({ error: 'Please enter your name.' });
  if (!isEmail(data.email)) return res.status(400).json({ error: 'Please enter a valid email address.' });
  if (!data.message || data.message.length < 10) return res.status(400).json({ error: 'Please write a slightly longer message.' });

  try {
    const adminTo = process.env.MAIL_TO_CONTACT || process.env.SMTP_USER;
    await send({
      to: adminTo,
      subject: `New enquiry — ${data.topic || 'General'} — ${data.name}`,
      html: tplContactAdmin(data),
      replyTo: data.email,
    });
    await send({
      to: data.email,
      subject: 'We got your message · SRM ECO TECH',
      html: tplContactAck(data.name),
    });
    res.json({ message: "Thanks — we'll get back within one business day." });
  } catch (e) {
    console.error('[/api/contact]', e);
    res.status(500).json({ error: 'Could not send the email right now. Please try again, or write to info@srmecotech.com.' });
  }
});

app.post('/api/newsletter/subscribe', async (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase();
  if (!isEmail(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });

  const subs = await readSubs();
  const exists = subs.find((s) => s.email === email);
  if (exists) return res.json({ message: "You're already subscribed — thanks for being with us!" });

  subs.push({ email, subscribedAt: new Date().toISOString(), source: req.body?.source || 'newsletter-inline' });
  await writeSubs(subs);

  // best-effort welcome
  send({ to: email, subject: 'Welcome to the SRM ECO TECH newsletter', html: tplWelcome() })
    .catch((e) => console.error('[welcome]', e));

  res.json({ message: "You're in. Check your inbox for a welcome note." });
});

function adminGuard(req, res, next) {
  const expected = process.env.ADMIN_KEY;
  if (!expected) return res.status(500).json({ error: 'ADMIN_KEY not set on server.' });
  if (req.header('x-admin-key') !== expected) return res.status(401).json({ error: 'Unauthorized.' });
  next();
}

app.get('/api/newsletter/send', adminGuard, async (_req, res) => {
  const subs = await readSubs();
  res.json({ total: subs.length, subscribers: subs });
});

app.post('/api/newsletter/send', adminGuard, async (req, res) => {
  const subject = String(req.body?.subject || '').trim();
  const html = String(req.body?.html || '').trim();
  if (!subject || !html) return res.status(400).json({ error: 'subject and html are required.' });

  const wrapped = tplNewsletter(subject, html);

  // Test
  if (req.body.test) {
    const to = String(req.body.testTo || process.env.MAIL_TO_CONTACT || process.env.SMTP_USER || '').trim();
    if (!to) return res.status(400).json({ error: 'testTo (or MAIL_TO_CONTACT) required for test send.' });
    await send({ to, subject: `[TEST] ${subject}`, html: wrapped });
    return res.json({ message: `Test newsletter sent to ${to}.`, sent: 1 });
  }

  const subs = await readSubs();
  if (subs.length === 0) return res.json({ message: 'No subscribers yet.', sent: 0 });

  const BATCH = 30;
  const fromAddr = process.env.MAIL_FROM || process.env.SMTP_USER;
  let sent = 0, failed = 0;

  for (let i = 0; i < subs.length; i += BATCH) {
    const chunk = subs.slice(i, i + BATCH).map((s) => s.email);
    try {
      await send({ to: fromAddr, bcc: chunk, subject, html: wrapped });
      sent += chunk.length;
    } catch (e) {
      console.error('[broadcast batch]', e);
      failed += chunk.length;
    }
  }
  res.json({ message: 'Newsletter dispatched.', total: subs.length, sent, failed });
});

app.listen(PORT, () => {
  console.log(`✓ SRM ECO TECH mail server running on http://localhost:${PORT}`);
});
