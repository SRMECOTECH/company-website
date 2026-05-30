import { Link } from 'react-router-dom';
import {
  ArrowRight, Sparkles, Truck, MapPin, Database, Brain, Leaf, Code, Cloud,
  Shield, Cpu, Boxes, Link2, BarChart3, Globe2, Layers, Workflow,
  Smartphone, Server, Lock, Zap, GitBranch, Container, Landmark,
} from 'lucide-react';
import CTABanner from '../components/CTABanner.jsx';
import Reveal, { Stagger } from '../components/Reveal.jsx';
import { googleCalendarUrl } from '../lib/calendar.js';

/* ────────────────────────── DOMAIN DATA ────────────────────────── */

const DOMAINS = [
  {
    id: 'enterprise-java',
    Icon: Server,
    title: 'Enterprise Java & Spring Boot',
    body: 'High-throughput microservices, workflow schedulers, and transaction-heavy backends built on Spring Boot, Hibernate, and JPA — battle-tested in banking, logistics, and manufacturing.',
    tags: ['Spring Boot', 'Hibernate', 'JPA', 'REST API', 'Quartz Scheduler'],
    accent: '#3B82F6',
    highlight: 'Toscana Work-Items Scheduler — a high-concurrency Spring Boot backend orchestrating 100K+ daily work-items across distributed queues.',
  },
  {
    id: 'blockchain',
    Icon: Link2,
    title: 'Blockchain & Web3',
    body: 'Smart-contract development, DeFi protocols, NFT marketplaces, and enterprise DLT solutions. From Solidity on Ethereum to Hyperledger Fabric for permissioned networks.',
    tags: ['Solidity', 'Ethereum', 'Hyperledger Fabric', 'Smart Contracts', 'Web3.js'],
    accent: '#7C3AED',
    highlight: 'Supply-chain provenance on Hyperledger — immutable track-and-trace from farm to shelf for an FMCG major.',
  },
  {
    id: 'ai-ml',
    Icon: Brain,
    title: 'AI & Machine Learning',
    body: 'From classical ML (XGBoost, Random Forest) to deep learning (PyTorch, TensorFlow) and LLM-powered RAG pipelines. 60+ models running in production with drift monitoring.',
    tags: ['PyTorch', 'TensorFlow', 'LLM / RAG', 'Computer Vision', 'MLOps'],
    accent: '#D97706',
    highlight: 'Fuel-anomaly detection model saving ₹3.2 Cr/year in unrecorded diesel loss across 8,000+ trucks.',
  },
  {
    id: 'data-eng',
    Icon: Database,
    title: 'Data Engineering & Lakehouse',
    body: 'Bronze → Silver → Gold lakehouse on S3 + Apache Iceberg, with Debezium CDC from 14+ source systems and dbt-driven transforms, served via Trino + Metabase.',
    tags: ['Apache Iceberg', 'Kafka', 'dbt', 'Trino', 'Spark'],
    accent: '#2563EB',
    highlight: 'Enterprise Data Lake — 8.2 TB compressed, 14 source systems, time-to-insight under 1 day.',
  },
  {
    id: 'geospatial',
    Icon: Globe2,
    title: 'GPS & Geospatial Analytics',
    body: 'OSRM snap-to-road, HMM-based map matching for Indian roads, geofencing, dwell detection, and real-time trip reconstruction from 50M+ GPS pings/day.',
    tags: ['OSRM', 'PostGIS', 'Mapbox', 'H3', 'Map Matching'],
    accent: '#059669',
    highlight: 'Custom OSRM fork with truck profiles — 96.4% map-match accuracy, API cost collapsed from ₹40L to ₹35K/month.',
  },
  {
    id: 'cloud-devops',
    Icon: Cloud,
    title: 'Cloud & DevOps',
    body: 'Multi-cloud (AWS, Azure, GCP) infrastructure as code with Terraform, CI/CD with GitHub Actions, and SRE-grade observability. We own 99.95% uptime SLAs.',
    tags: ['AWS', 'Azure', 'Kubernetes', 'Terraform', 'CI/CD'],
    accent: '#F97316',
    highlight: 'Zero-downtime Kubernetes migration — 23 microservices moved from bare-metal to EKS in 6 weeks.',
  },
  {
    id: 'fullstack',
    Icon: Code,
    title: 'Full-Stack Product Engineering',
    body: 'Design-led product teams shipping React/Next.js front-ends, Node/Python/Go services, and React Native mobile apps — owned end-to-end from sprint 0 to production.',
    tags: ['React', 'Next.js', 'Node.js', 'Python', 'Go'],
    accent: '#6366F1',
    highlight: 'Built 4 SaaS products from zero to production in under 18 months with a 6-person team.',
  },
  {
    id: 'iot-edge',
    Icon: Cpu,
    title: 'IoT & Edge Computing',
    body: 'Connect physical assets — vehicles, plants, sensors — into your software. MQTT brokers, time-series DBs, and edge ML inference on ARM devices.',
    tags: ['MQTT', 'AWS IoT Core', 'TimescaleDB', 'Jetson', 'OTA'],
    accent: '#EAB308',
    highlight: 'Real-time OBD-II telemetry from 8,000+ trucks — sub-second ingestion with Kafka + TimescaleDB.',
  },
  {
    id: 'security',
    Icon: Shield,
    title: 'Cybersecurity & Identity',
    body: 'SSO, MFA, RBAC/ABAC, secrets management, SAST/DAST in CI, and SOC2-aligned audit logging. Security baked into every layer.',
    tags: ['OIDC / SAML', 'Vault', 'SAST / DAST', 'SOC2', 'Zero Trust'],
    accent: '#DC2626',
    highlight: 'Enterprise IAM overhaul — migrated 14K users to OIDC SSO with zero-password policy in 4 weeks.',
  },
  {
    id: 'mobile',
    Icon: Smartphone,
    title: 'Mobile App Development',
    body: 'Cross-platform mobile apps with React Native and Flutter — from driver-facing logistics apps to consumer fintech and field-force management tools.',
    tags: ['React Native', 'Flutter', 'iOS', 'Android', 'Push Notifications'],
    accent: '#14B8A6',
    highlight: 'Driver app used by 3,200+ truckers daily — offline-first architecture with background GPS sync.',
  },
  {
    id: 'workflow',
    Icon: Workflow,
    title: 'Workflow Automation & RPA',
    body: 'Business process automation using custom workflow engines, rule-based schedulers, and RPA bots. Eliminate manual data entry and repetitive back-office tasks.',
    tags: ['Workflow Engine', 'RPA', 'Quartz', 'Camunda', 'n8n'],
    accent: '#0EA5E9',
    highlight: 'Automated invoice reconciliation pipeline — processing 50K+ invoices/month with 99.7% accuracy.',
  },
];

const STATS = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '12+', label: 'Industry Verticals' },
  { value: '30+', label: 'Technologies Mastered' },
  { value: '99.95%', label: 'Platform Uptime' },
];

const INDUSTRIES = [
  { Icon: Truck, label: 'Logistics & Fleet' },
  { Icon: Landmark, label: 'Banking & Finance' },
  { Icon: Leaf, label: 'Sustainability' },
  { Icon: Boxes, label: 'Manufacturing' },
  { Icon: BarChart3, label: 'Analytics & BI' },
  { Icon: Globe2, label: 'GovTech' },
  { Icon: Lock, label: 'Cybersecurity' },
  { Icon: Layers, label: 'SaaS Products' },
  { Icon: Container, label: 'Supply Chain' },
  { Icon: Zap, label: 'Energy & Cleantech' },
  { Icon: GitBranch, label: 'Open Source' },
  { Icon: Smartphone, label: 'Consumer Mobile' },
];

/* ─────────────────────── COMPONENT ─────────────────────── */

export default function Expertise() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="hero" style={{ paddingTop: 132, paddingBottom: 80 }}>
        <div className="hero-grid" />
        <div className="orb" style={{ top: -160, left: -100, width: 420, height: 420, background: 'radial-gradient(circle, var(--brand-primary), transparent 60%)' }} />
        <div className="orb" style={{ bottom: -200, right: -160, width: 520, height: 520, background: 'radial-gradient(circle, var(--brand-secondary), transparent 60%)', animationDelay: '-8s' }} />

        <div className="container" style={{ position: 'relative', maxWidth: 980 }}>
          <Reveal><span className="eyebrow"><Sparkles size={12} /> Our Expertise</span></Reveal>
          <Reveal delay={80}>
            <h1 className="display-xl mt-5">
              Decades of craft across <span className="text-flow">every layer of the stack.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="body-lg mt-5" style={{ maxWidth: 760 }}>
              From enterprise Java backends and blockchain smart contracts to AI-powered analytics
              and regulatory compliance — we don't just consult. We build, deploy, and run
              production systems that businesses depend on every single day.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="flex gap-3 mt-7" style={{ flexWrap: 'wrap' }}>
              <Link to="/about#contact" className="btn btn-primary btn-lg">
                Start a Conversation <ArrowRight size={16} />
              </Link>
              <a
                href={googleCalendarUrl({ title: 'Technical deep-dive — SRM ECO TECH', details: 'Discuss your project requirements with our engineering team.' })}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg"
              >
                Schedule a Deep-Dive
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHO WE ARE — image + text ── */}
      <section className="section bordered" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="exp-intro">
            <Reveal className="exp-intro-media">
              <div className="exp-intro-img-stack">
                <img src="/images/expertise/team-collab.jpeg" alt="Team collaboration" className="exp-intro-img exp-intro-img-main" loading="lazy" />
                <img src="/images/expertise/hero-banner.jpeg" alt="Digital solutions" className="exp-intro-img exp-intro-img-float" loading="lazy" />
              </div>
            </Reveal>
            <Reveal delay={100} className="exp-intro-text">
              <span className="eyebrow">Who we are</span>
              <h2 className="display-md mt-4">Engaging Creative Minds Via Technology</h2>
              <p className="body-lg mt-4">
                SRM ECO TECH is a trusted technology company dedicated to empowering businesses
                with the agility and expertise required to succeed in today's dynamic landscape.
                We specialize in building elite engineering teams without compromising on quality,
                helping you bring your IT initiatives to life efficiently and effectively.
              </p>
              <div className="exp-highlights mt-6">
                <div className="exp-highlight">
                  <div className="exp-highlight-icon"><Zap size={20} /></div>
                  <div>
                    <strong>Our Achievements</strong>
                    <span>Quality focus, client growth, 50+ projects shipped</span>
                  </div>
                </div>
                <div className="exp-highlight">
                  <div className="exp-highlight-icon"><Sparkles size={20} /></div>
                  <div>
                    <strong>Our Culture</strong>
                    <span>Developer-centric, innovation-driven corporate focus</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── WHAT WE OFFER — highlight cards ── */}
      <section className="section" id="offerings">
        <div className="container">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">What we offer</span>
            <h2 className="display-md mt-4">Tailored Solutions For You</h2>
            <p className="body-lg mt-4">
              Dedicated skilled and certified resources for each project — accelerated release
              cycles resulting in tangible gains at a fraction of the cost.
            </p>
          </Reveal>
          <Stagger className="exp-offers mt-12">
            {[
              { Icon: Server, title: 'Skilled & Certified Resources', body: 'Dedicated experts — Java architects, ML engineers, DevOps leads — handpicked for your project requirements.' },
              { Icon: Zap, title: 'Faster Product Development', body: 'Accelerated release cycles with CI/CD, automated testing, and design sprints that ship features weekly.' },
              { Icon: BarChart3, title: 'Cost Effective Development', body: 'Quality enhancements at lower cost — our offshore + onshore model delivers tier-1 talent at competitive rates.' },
            ].map(({ Icon, title, body }, i) => (
              <article key={title} className={`exp-offer-card ${i === 1 ? 'exp-offer-featured' : ''}`}>
                <div className="exp-offer-art" aria-hidden="true">
                  <svg viewBox="0 0 200 120" className="exp-offer-svg">
                    {[...Array(6)].map((_, j) => (
                      <line key={j} x1={20 + j * 36} y1="20" x2={20 + j * 36} y2="100"
                        stroke="currentColor" strokeWidth="0.5" opacity="0.2"
                        strokeDasharray="2 4" />
                    ))}
                    {[...Array(4)].map((_, j) => (
                      <line key={`h${j}`} x1="10" y1={30 + j * 22} x2="190" y2={30 + j * 22}
                        stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
                    ))}
                    <circle cx={40 + i * 60} cy={60 - i * 10} r="18" fill="currentColor" opacity="0.08" />
                    <circle cx={40 + i * 60} cy={60 - i * 10} r="6" fill="currentColor" opacity="0.25" />
                  </svg>
                </div>
                <div className="exp-offer-icon"><Icon size={24} /></div>
                <h3 className="heading-lg mt-4">{title}</h3>
                <p className="body-md mt-2">{body}</p>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="section bordered" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="stats">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="stat-value">{s.value}</div>
                <p className="stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOMAIN EXPERTISE GRID ── */}
      <section className="section" id="domains">
        <div className="container">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Domain expertise</span>
            <h2 className="display-md mt-4">Your Gateway To Cutting-Edge Solutions</h2>
            <p className="body-lg mt-4">
              From traditional enterprise backends to frontier technologies like blockchain and
              edge computing — our team has deep production experience across 12+ domains.
            </p>
          </Reveal>

          <Stagger className="exp-domains mt-12">
            {DOMAINS.map(({ id, Icon, title, body, tags, accent, highlight }) => (
              <article key={id} className="exp-domain" style={{ '--domain-accent': accent }}>
                <div className="exp-domain-glow" />
                <div className="exp-domain-icon"><Icon size={28} /></div>
                <h3 className="exp-domain-title">{title}</h3>
                <p className="exp-domain-body">{body}</p>
                {highlight && (
                  <div className="exp-domain-highlight">
                    <Zap size={12} />
                    <span>{highlight}</span>
                  </div>
                )}
                <div className="exp-domain-tags">
                  {tags.map((t) => <span key={t} className="exp-domain-tag">{t}</span>)}
                </div>
              </article>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── INDUSTRIES SERVED ── */}
      <section className="section bordered" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <Reveal className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Industries served</span>
            <h2 className="display-md mt-4">Cross-Industry Impact</h2>
            <p className="body-lg mt-4">
              Our solutions span verticals from banking and logistics to cleantech and government.
            </p>
          </Reveal>
          <Stagger className="exp-industries mt-12">
            {INDUSTRIES.map(({ Icon, label }) => (
              <div key={label} className="exp-industry">
                <div className="exp-industry-icon"><Icon size={24} /></div>
                <span className="exp-industry-label">{label}</span>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── SERVICES IMAGE SHOWCASE ── */}
      <section className="section">
        <div className="container">
          <div className="exp-showcase">
            <Reveal className="exp-showcase-text">
              <span className="eyebrow">Why SRM ECO TECH</span>
              <h2 className="display-md mt-4">Digital Solutions That Drive Success</h2>
              <p className="body-lg mt-4">
                We empower businesses, deliver results, and bring visions to life with our
                innovative approach and world-class developer team. Every engagement is outcome-driven —
                if it doesn't move your business forward, it doesn't ship.
              </p>
              <div className="flex gap-3 mt-6" style={{ flexWrap: 'wrap' }}>
                <Link to="/services" className="btn btn-primary btn-sm">
                  View All Services <ArrowRight size={14} />
                </Link>
                <Link to="/projects" className="btn btn-secondary btn-sm">
                  See Case Studies <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={120} className="exp-showcase-media">
              <img src="/images/expertise/services.jpeg" alt="Cutting-edge solutions" className="exp-showcase-img" loading="lazy" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTABanner
        eyebrow="Ready to build?"
        title="Let's turn your idea into production-grade software."
        body="Tell us what you're building. The right engineer will get back — not a sales rep."
      />
    </>
  );
}
