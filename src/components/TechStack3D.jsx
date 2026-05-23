import { useEffect, useState } from 'react';
import { TECH_STACK } from '../data/services.js';

/** Inline SVGs for brands that simpleicons doesn't host (or has removed for policy reasons). */
const INLINE_SVGS = {
  // OpenAI — simpleicons removed the slug; we inline the official mark.
  OpenAI: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"
      />
    </svg>
  ),
  // LangChain — simpleicons slug is "langchain" but unreliable. Inline a parrot-style chain glyph.
  LangChain: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M9.5 4.5h3a4 4 0 0 1 4 4v.5h-2v-.5a2 2 0 0 0-2-2h-3a2 2 0 0 0-2 2v.5h-2v-.5a4 4 0 0 1 4-4Zm5 14.5h-3a4 4 0 0 1-4-4v-.5h2v.5a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-.5h2v.5a4 4 0 0 1-4 4Zm-3-9h1a3 3 0 0 1 0 6h-1v-2h1a1 1 0 0 0 0-2h-1v-2Zm0 0v-2h-1a3 3 0 0 0 0 6h1v-2h-1a1 1 0 0 1 0-2h1Z"/>
    </svg>
  ),
  // gRPC — google's open-source RPC framework, no public mark in simpleicons.
  gRPC: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M3 8h4v8H3V8Zm6 0h6v3H9V8Zm0 5h6v3H9v-3Zm8-5h4v8h-4V8Zm-13 0V6h16v2H4Zm0 12v-2h16v2H4Z"/>
    </svg>
  ),
  // Iceberg — Apache Iceberg lakehouse format.
  Iceberg: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 2 4 11h4v9h8v-9h4L12 2Zm0 3.2 4 4.5h-2.4l-1.6 4.3-1.6-4.3H8L12 5.2Z"/>
    </svg>
  ),
  // OSRM — Open Source Routing Machine.
  OSRM: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 2a8 8 0 0 0-8 8c0 5.5 8 12 8 12s8-6.5 8-12a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
    </svg>
  ),
  // GeoServer — open-source geospatial server.
  GeoServer: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 2C7.6 2 4 5.6 4 10c0 5 8 12 8 12s8-7 8-12c0-4.4-3.6-8-8-8Zm0 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"/>
    </svg>
  ),
  // H3 — Uber's hexagonal hierarchical geospatial index.
  H3: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="m12 2 8.66 5v10L12 22 3.34 17V7L12 2Zm0 2.31L5.34 8.15v7.7L12 19.69l6.66-3.84v-7.7L12 4.31Z"/>
    </svg>
  ),
  // DuckDB
  DuckDB: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm5-1a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm9 2H13a3 3 0 1 1 0-2h5v2Z"/>
    </svg>
  ),
  // Trino
  Trino: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 3a9 9 0 1 0 9 9h-2a7 7 0 1 1-7-7V3Zm5.6 1.6 1.4 1.4-3.1 3.1-1.4-1.4 3.1-3.1Z"/>
    </svg>
  ),
};

const TECH_META = {
  React:            { slug: 'react',             color: '#61DAFB' },
  'Next.js':        { slug: 'nextdotjs',         color: '#0F172A', dark: '#F8FAFC' },
  TypeScript:       { slug: 'typescript',        color: '#3178C6' },
  TailwindCSS:      { slug: 'tailwindcss',       color: '#06B6D4' },
  Vite:             { slug: 'vite',              color: '#7C3AED' },
  'React Native':   { slug: 'react',             color: '#61DAFB' },
  'Node.js':        { slug: 'nodedotjs',         color: '#5FA04E' },
  Python:           { slug: 'python',            color: '#3776AB' },
  FastAPI:          { slug: 'fastapi',           color: '#009688' },
  Go:               { slug: 'go',                color: '#00ADD8' },
  GraphQL:          { slug: 'graphql',           color: '#E10098' },
  gRPC:             { slug: null,                color: '#244C5A' },
  PostgreSQL:       { slug: 'postgresql',        color: '#4169E1' },
  MongoDB:          { slug: 'mongodb',           color: '#47A248' },
  Redis:            { slug: 'redis',             color: '#FF4438' },
  Kafka:            { slug: 'apachekafka',       color: '#0F172A', dark: '#F8FAFC' },
  Trino:            { slug: null,                color: '#DD00A1' },
  DuckDB:           { slug: null,                color: '#FFD000' },
  dbt:              { slug: 'dbt',               color: '#FF694A' },
  Iceberg:          { slug: null,                color: '#3BAFDA' },
  PyTorch:          { slug: 'pytorch',           color: '#EE4C2C' },
  TensorFlow:       { slug: 'tensorflow',        color: '#FF6F00' },
  'scikit-learn':   { slug: 'scikitlearn',       color: '#F7931E' },
  OpenAI:           { slug: null,                color: '#0F172A', dark: '#F8FAFC' },
  LangChain:        { slug: null,                color: '#1C3C3C', dark: '#9CA3AF' },
  HuggingFace:      { slug: 'huggingface',       color: '#FFB200' },
  AWS:              { slug: 'amazonwebservices', color: '#FF9900' },
  Azure:            { slug: 'microsoftazure',    color: '#0078D4' },
  GCP:              { slug: 'googlecloud',       color: '#4285F4' },
  Kubernetes:       { slug: 'kubernetes',        color: '#326CE5' },
  Terraform:        { slug: 'terraform',         color: '#7B42BC' },
  'GitHub Actions': { slug: 'githubactions',     color: '#2088FF' },
  Grafana:          { slug: 'grafana',           color: '#F46800' },
  OSRM:             { slug: null,                color: '#3B82F6' },
  PostGIS:          { slug: 'postgresql',        color: '#336791' },
  Mapbox:           { slug: 'mapbox',            color: '#0F172A', dark: '#F8FAFC' },
  OpenStreetMap:    { slug: 'openstreetmap',     color: '#7EBC6F' },
  GeoServer:        { slug: null,                color: '#83BD3B' },
  H3:               { slug: null,                color: '#9F4FFF' },
};

function logoUrl(meta, isDark) {
  if (!meta?.slug) return null;
  const hex = (isDark && meta.dark ? meta.dark : meta.color).replace('#', '');
  return `https://cdn.simpleicons.org/${meta.slug}/${hex}`;
}

function hexToRgb(hex) {
  const m = hex.replace('#', '');
  const full = m.length === 3 ? m.split('').map((c) => c + c).join('') : m;
  const num = parseInt(full, 16);
  return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
}

function initials(label) {
  return label
    .replace(/[^A-Za-z0-9]/g, ' ')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

function Chip({ label, isDark }) {
  const meta = TECH_META[label] || { slug: null, color: '#60A5FA' };
  const inline = INLINE_SVGS[label];
  const url = inline ? null : logoUrl(meta, isDark);
  const color = (isDark && meta.dark) ? meta.dark : meta.color;
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="lane-chip" style={{ '--brand': color, '--brand-rgb': hexToRgb(color) }}>
      <div className="lane-chip-icon" style={{ color }}>
        {inline ? (
          inline
        ) : url && !imgFailed ? (
          <img
            src={url}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span className="lane-chip-mono">{initials(label)}</span>
        )}
      </div>
      <span className="lane-chip-label">{label}</span>
    </div>
  );
}

const TABS = Object.keys(TECH_STACK);

/** Single-set marquee lane that bounces between the walls. */
function Lane({ name, items, isDark, accent, durationSec = 32 }) {
  return (
    <div className="lane" style={{ '--lane-accent': accent || 'var(--brand-primary)' }}>
      <div className="lane-label">
        <span className="lane-label-tick" />
        <span className="lane-label-name">{name}</span>
        <span className="lane-label-count">{String(items.length).padStart(2, '0')}</span>
      </div>
      <div className="lane-marquee">
        <div
          className="lane-track lane-track-bounce"
          style={{ animationDuration: `${durationSec}s` }}
        >
          {items.map((label) => (
            <Chip key={label} label={label} isDark={isDark} />
          ))}
        </div>
      </div>
    </div>
  );
}

const LANE_ACCENTS = [
  '#61DAFB', // Frontend
  '#5FA04E', // Backend
  '#4169E1', // Data
  '#EE4C2C', // AI / ML
  '#FF9900', // Cloud
  '#3B82F6', // Geospatial
];

export default function TechStack3D() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const check = () => setIsDark(root.getAttribute('data-theme') === 'dark');
    check();
    const obs = new MutationObserver(check);
    obs.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="lanes-wrap">
      <div className="lanes-glow" />
      <div className="lanes">
        {TABS.map((name, i) => (
          <Lane
            key={name}
            name={name}
            items={TECH_STACK[name]}
            isDark={isDark}
            accent={LANE_ACCENTS[i % LANE_ACCENTS.length]}
            durationSec={18 + (i % 4) * 4}
          />
        ))}
      </div>
    </div>
  );
}
