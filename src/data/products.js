export const PRODUCTS = [
  {
    slug: 'nexgen-tms',
    name: 'neXgen TMS',
    tagline: 'Transport Management System for optimized logistics.',
    icon: 'Truck',
    category: 'Operations',
    features: ['Real-time fleet tracking', 'OSRM snap-to-road routing', 'Predictive ETA'],
    description:
      'A complete Transport Management System built around real-time GPS telemetry, OSRM snap-to-road routing, and predictive ETA models. Run a fleet of 10 or 10,000 trucks from a single control tower — with auto-dispatch, fuel intelligence, and trip-level P&L baked in.',
    highlights: [
      'Live GPS dashboard with geofences & alerts',
      'OSRM-based map matching, snap-to-road, isochrones',
      'ML-driven ETA & delay prediction',
      'Driver score, fuel theft detection, idle analytics',
      'Auto-billing & e-POD',
    ],
  },
  {
    slug: 'nexgen-processflow',
    name: 'neXgen ProcessFlow',
    tagline: 'Intelligent workflow automation & orchestration.',
    icon: 'Workflow',
    category: 'Operations',
    features: ['Visual workflow builder', 'Conditional routing', 'SLA enforcement'],
    description:
      'A no-code workflow engine for finance, HR and ops teams. Drag-and-drop your process, attach business rules, and let ProcessFlow enforce SLAs, escalate breaches, and integrate with your existing ERP.',
    highlights: ['Drag-and-drop visual builder', '200+ pre-built connectors', 'Audit trail & versioning', 'SLA & escalation engine'],
  },
  {
    slug: 'nexgen-ai-studio',
    name: 'neXgen AI Studio',
    tagline: 'Build & deploy custom ML / DL models seamlessly.',
    icon: 'Brain',
    category: 'Intelligence',
    features: ['AutoML pipelines', 'Model registry', 'One-click deploy'],
    description:
      'A managed AI/ML platform for your data team. From notebooks to AutoML to deployment behind a REST endpoint — no MLOps team required. Powered by PyTorch & TensorFlow under the hood.',
    highlights: ['JupyterLab + GPU runtimes', 'AutoML for tabular, text & vision', 'Model registry with versioning', 'One-click REST deploy with autoscale'],
  },
  {
    slug: 'nexgen-analytics',
    name: 'neXgen Analytics',
    tagline: 'Deep insights with real-time data processing.',
    icon: 'BarChart3',
    category: 'Intelligence',
    features: ['Streaming ETL', 'Interactive dashboards', 'Anomaly detection'],
    description:
      'A modern analytics stack: streaming ETL from Kafka/RDBMS into a query-fast data lake, served through interactive dashboards. ML-driven anomaly detection flags issues before your customers do.',
    highlights: ['Streaming + batch ETL', 'Parquet-backed data lake', '60+ chart types, embeddable', 'Anomaly detection on metrics'],
  },
  {
    slug: 'nexgen-billing',
    name: 'neXgen Billing',
    tagline: 'Streamlined automated invoicing & settlements.',
    icon: 'Receipt',
    category: 'Finance',
    features: ['Auto-invoicing', 'Multi-currency', 'GST/e-Invoice ready'],
    description:
      'Invoice generation, dispute management and settlements — all in one place. Built for Indian GST + global multi-currency operations.',
    highlights: ['GST + e-Invoice (IRN) ready', 'Multi-currency, multi-entity', 'Dispute & credit-note workflows', 'Tally / SAP / Oracle export'],
  },
  {
    slug: 'nexgen-chatbot',
    name: 'neXgen Chatbot',
    tagline: 'AI-driven customer engagement & support.',
    icon: 'MessageSquareCode',
    category: 'Communication',
    features: ['LLM-powered', 'Multilingual', 'WhatsApp / Web / IVR'],
    description:
      'A conversational AI that lives in your stack — answer customer questions, qualify leads, and trigger workflows. Grounded on your own knowledge base via RAG.',
    highlights: ['Retrieval-augmented generation', 'WhatsApp / Web / IVR channels', '12 Indian languages', 'Human-handoff with full context'],
  },
  {
    slug: 'nexgen-integration',
    name: 'neXgen Integration',
    tagline: 'Connect disparate systems with ease.',
    icon: 'Plug',
    category: 'Operations',
    features: ['iPaaS', 'Event-driven', 'Pre-built connectors'],
    description:
      'An iPaaS layer that bridges SAP, Tally, Salesforce, Shopify, custom DBs and APIs. Event-driven, replayable, and observable end-to-end.',
    highlights: ['Pre-built connectors for top 30 systems', 'Event bus with replay', 'Schema-aware transformations', 'Observability dashboard'],
  },
  {
    slug: 'nexgen-idp',
    name: 'neXgen IdP',
    tagline: 'Identity Provider for secure access management.',
    icon: 'ShieldCheck',
    category: 'Security',
    features: ['SSO & MFA', 'OIDC / SAML', 'RBAC + ABAC'],
    description:
      'An enterprise identity provider with SSO, MFA, social login, and granular role/attribute-based access control. SOC2-aligned audit logging built in.',
    highlights: ['OIDC, SAML 2.0, OAuth2', 'TOTP + WebAuthn MFA', 'RBAC + ABAC policies', 'Full audit trail'],
  },
  {
    slug: 'nexgen-ap',
    name: 'neXgen AP',
    tagline: 'Accounts Payable automation & control.',
    icon: 'Wallet',
    category: 'Finance',
    features: ['OCR invoice capture', '3-way match', 'Approval workflows'],
    description:
      'Cut your AP cycle time by 70%. Capture invoices via OCR, match against PO + GRN, route through approval policies, and post to your ERP.',
    highlights: ['OCR with 98% line-item accuracy', '3-way matching', 'Configurable approval matrix', 'ERP sync (SAP / Oracle / Tally)'],
  },
  {
    slug: 'nexgen-helpdesk',
    name: 'neXgen Helpdesk',
    tagline: 'Scalable support ticketing and resolution.',
    icon: 'Headphones',
    category: 'Communication',
    features: ['Omnichannel', 'AI-assist replies', 'SLA & CSAT'],
    description:
      'Omnichannel support: email, chat, WhatsApp, voice — all in a unified inbox. AI suggests replies, surfaces similar tickets, and auto-routes by topic.',
    highlights: ['Unified omnichannel inbox', 'AI-assist & auto-routing', 'SLA & CSAT analytics', 'Knowledge base'],
  },
];

export const CATEGORIES = ['All', 'Operations', 'Intelligence', 'Communication', 'Security', 'Finance'];

export const CATEGORY_GRADIENT = {
  Operations:    'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
  Intelligence:  'linear-gradient(135deg, #1E40AF 0%, #60A5FA 100%)',
  Communication: 'linear-gradient(135deg, #D97706 0%, #FBBF24 100%)',
  Security:      'linear-gradient(135deg, #DC2626 0%, #F87171 100%)',
  Finance:       'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
};
