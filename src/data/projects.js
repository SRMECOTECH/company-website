// Each project may declare:
//   media   → theme for the animated placeholder reel (truck | chat | chain | map | chart | data | ml | leaf)
//   video   → optional path to a real mp4 (drop files in /public/videos and set this). Falls back to the animated reel.
//   link    → optional external repo / live URL
export const PROJECTS = [
  {
    slug: 'smart-truck-gps',
    title: 'Smart-Truck Fleet Analytics',
    category: 'Logistics · ML · Data',
    icon: 'Truck',
    media: 'truck',
    video: '',
    accent: '6,182,212',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #14B8A6 100%)',
    summary:
      'A fleet-management analytics platform that ingests 7.4M+ trip rows into MySQL, runs six ML models, and serves driver, route and ETA intelligence through a React dashboard.',
    problem:
      'Fleet managers had years of raw trip data (7.4M rows across drivers, vehicles, routes, customers and timestamps) but no way to turn it into decisions — no reliable ETAs, no way to spot suspicious trips, no objective driver scoring, and no demand forecast for planning.',
    solution:
      'A three-service architecture: a FastAPI backend (port 8000) serving cleaned data from MySQL, a FastAPI ML service (port 8001) training and serving models, and a React 19 + TypeScript + Vite dashboard. A three-pass migration deduplicates dimensions (drivers, vehicles, locations, customers), loads the 7.4M-row trips fact table with derived fields (duration, ETA-met, delay, avg speed), then pre-aggregates driver / route / vehicle / daily summary tables. An eta_data_status quality gate ensures only complete trips feed analytics.',
    outcome:
      'Six production models: an XGBoost ETA predictor (21 engineered features), an Isolation-Forest anomaly detector that auto-raises alerts, a weighted driver scorer (0–100 with risk tiers), a Ridge + exponential-smoothing demand forecaster, a Dijkstra + gradient-boosting route optimiser, and a driver recommender. ETA, anomaly, recommender and forecaster ship with dedicated dashboard tabs.',
    stack: ['FastAPI', 'MySQL', 'XGBoost', 'LightGBM', 'scikit-learn', 'PyTorch', 'React 19', 'TypeScript', 'Vite', 'Recharts'],
    metrics: [
      { value: '7.4M', label: 'trip rows processed' },
      { value: '6', label: 'production ML models' },
      { value: '21', label: 'ETA model features' },
      { value: '15', label: 'MySQL tables' },
    ],
  },
  {
    slug: 'multi-agent-chat',
    title: 'Multi-Agent Multi-Domain Chat Agent',
    category: 'AI · NLP · Conversational Analytics',
    icon: 'Brain',
    media: 'chat',
    video: '',
    accent: '8,145,178',
    gradient: 'linear-gradient(135deg, #0891B2 0%, #06B6D4 100%)',
    summary:
      'A conversational analytics assistant for a transport-management system — a LangGraph-style intent engine over ClickHouse, Redis and FAISS that answers fleet and trip questions in natural language.',
    problem:
      'Operations and consignor teams needed answers from a multi-tenant analytics warehouse but could not write SQL. They needed natural-language Q&A that stayed strictly inside each tenant\'s data, returned charts and tables inline, and learned from confirmed answers over time.',
    solution:
      'A FastAPI backend with a staged intent pipeline: a tiered regex classifier → slot extractor → entity resolver (alias / prefix / fuzzy / FAISS semantic match) → planner → executor against ClickHouse → natural-language synthesizer. Multi-tenant isolation is enforced by a parameterised entity_id predicate on every query. Redis caches entity resolution and schema digests; FAISS + SentenceTransformer (all-MiniLM-L6-v2) power semantic routing and self-learning; low-confidence answers are quarantined for review. Responses stream over SSE with inline chart/table payloads to a React 19 + Tailwind UI.',
    outcome:
      'Non-technical users query fleet performance, trips and KPIs in plain language and get governed, tenant-scoped answers with visualisations — backed by a self-learning loop that records confirmed examples to improve future intent matching.',
    stack: ['FastAPI', 'LangGraph', 'ClickHouse', 'Redis', 'FAISS', 'SentenceTransformers', 'React 19', 'Tailwind', 'WebSocket / SSE', 'Docker'],
    metrics: [
      { value: 'Multi', label: 'tenant isolation' },
      { value: 'FAISS', label: 'semantic routing' },
      { value: 'SSE', label: 'streamed answers' },
      { value: 'Self', label: 'learning loop' },
    ],
  },
  {
    slug: 'will-on-chain',
    title: 'Will-On-Chain — Crypto Inheritance',
    category: 'Blockchain · Web3 · ZK Proofs',
    icon: 'ShieldCheck',
    media: 'chain',
    video: '',
    accent: '20,184,166',
    gradient: 'linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%)',
    link: 'https://github.com/Sanjoy-Chattopadhay/will-on-chain',
    summary:
      'A fully decentralised, trustee-less will and crypto-asset inheritance system on Ethereum — multi-asset wills, percentage-based heirs, time-based liveness detection and zero-knowledge verification, with no central authority.',
    problem:
      'Crypto assets are routinely lost forever when an owner dies — there is no trustless way to pass ETH and tokens to heirs without handing custody or keys to a third party, and naive "dead-man switch" designs let any party trigger distribution prematurely.',
    solution:
      'A strict single-inheritance chain of 12 Solidity contracts (WillTypes → WillStorage → HeartbeatManager → AssetManager → ExecutionManager → WillManager) kept under the EIP-170 24KB bytecode limit. Owners deposit ETH, ERC-20, ERC-721 and ERC-1155 assets and assign heirs percentage shares. A time-based heartbeat detects owner inactivity; inheritance only executes after a multi-phase confirmation pipeline gated by two Groth16 zero-knowledge circuits — age verification (4 signals) and an iden3/Privado DID-based liveness proof (5 signals). Distribution is pull-based via on-chain claims.',
    outcome:
      'No single party can prematurely trigger distribution. Heirs claim their shares on-chain after the heartbeat and ZK pipeline confirm the owner is inactive — verifiable, private and fully self-custodial. Deployable to any EVM chain (Sepolia recommended) via Remix, driven by a React + Node app over MetaMask.',
    stack: ['Solidity', 'Ethereum / EVM', 'Circom', 'Groth16 ZKP', 'iden3 / Privado DID', 'ERC-20/721/1155', 'React', 'Node.js', 'MetaMask'],
    metrics: [
      { value: '12', label: 'Solidity contracts' },
      { value: '4', label: 'asset standards' },
      { value: '2', label: 'Groth16 ZK circuits' },
      { value: '0', label: 'trusted parties' },
    ],
  },
  {
    slug: 'osrm-snap-to-road',
    title: 'OSRM Snap-to-Road & Map Matching',
    category: 'Geospatial · Open-Source',
    icon: 'MapPin',
    media: 'map',
    video: '',
    accent: '45,212,191',
    gradient: 'linear-gradient(135deg, #0E7490 0%, #06B6D4 100%)',
    summary:
      'A self-hosted OSRM cluster custom-tuned for the Indian road network, delivering sub-50ms snap-to-road and Hidden-Markov-Model map matching at scale — replacing costly commercial routing APIs.',
    problem:
      'Commercial routing APIs (Google, HERE, Mapbox) cost ₹40+ lakhs/month at production query volume and rate-limited batch reprocessing. Vanilla OSRM was fast but inaccurate on rural Indian roads and had no map-matching tuned for low-frequency pings (1 per 30s).',
    solution:
      'We forked OSRM, ingested fresh OpenStreetMap India extracts with custom turn-restriction profiles, and added a truck profile (height / weight / HAZMAT). On top we wrote an HMM-based map-matching service for sparse, noisy pings where emission probability is calibrated per road class. The cluster runs on Docker + Kubernetes with a Redis result cache.',
    outcome:
      'Routing spend collapsed from ₹40L/month to a single ₹35K/month EC2 cluster. Map-matched trip accuracy rose from 82% (vanilla OSRM) to 96.4% with our HMM layer, sustaining 10k+ QPS at sub-50ms p95 snap latency.',
    stack: ['OSRM', 'C++', 'OpenStreetMap', 'PostGIS', 'Docker', 'Kubernetes', 'Redis'],
    metrics: [
      { value: '< 50ms', label: 'snap latency p95' },
      { value: '96.4%', label: 'match accuracy' },
      { value: '₹40L→₹35K', label: 'monthly cost' },
      { value: '10k+ QPS', label: 'sustained' },
    ],
  },
  {
    slug: 'real-estate-analytics',
    title: 'Real-Estate Market Analytics Dashboard',
    category: 'BI · Data Visualisation',
    icon: 'BarChart3',
    media: 'chart',
    video: '',
    accent: '34,211,238',
    gradient: 'linear-gradient(135deg, #22D3EE 0%, #0891B2 100%)',
    link: 'https://github.com/errupamkumar/-Real-Estate-Market-Analytics-Dashboard-Data-Challenge-36-',
    summary:
      'A Power BI dashboard analysing the European real-estate market to surface pricing trends, investment hotspots and market-behaviour patterns — built on a clean star-schema model with optimised DAX.',
    problem:
      'Raw EU real-estate listings held rich signal — prices, property types, amenities, energy ratings, days-on-market — but stakeholders had no way to compare markets, quantify what drives price, or spot where capital should flow.',
    solution:
      'An end-to-end BI build on a star schema (one fact table + DimDate, DimLocation, DimPropertyType, DimEnergyRating) for performance and maintainability. Reusable, optimised DAX measures power three interactive pages: Market Overview & geographic analysis; Pricing Drivers & property characteristics (amenity impact, energy ratings, building age); and Investment Opportunities & market behaviour (rental yields, price appreciation, days-on-market velocity).',
    outcome:
      'A clean, multi-dimensional analytics experience that quantifies amenity pricing impact, compares countries and property types across 2020–2024, and ranks markets by investment potential — turning a flat dataset into actionable investment insight.',
    stack: ['Power BI', 'DAX', 'Star Schema', 'Excel'],
    metrics: [
      { value: '3', label: 'dashboard pages' },
      { value: '4', label: 'dimension tables' },
      { value: '2020–24', label: 'trend window' },
      { value: 'EU', label: 'market coverage' },
    ],
  },
  {
    slug: 'data-lake-platform',
    title: 'Enterprise Data Lake Platform',
    category: 'Data Engineering · Analytics',
    icon: 'Database',
    media: 'data',
    video: '',
    accent: '6,182,212',
    gradient: 'linear-gradient(135deg, #0891B2 0%, #14B8A6 100%)',
    summary:
      'A bronze / silver / gold lakehouse on S3 + Apache Iceberg, with Debezium CDC from 14 source systems and dbt-driven transforms, served via Trino + Metabase.',
    problem:
      'The customer had 14 disparate operational databases (Postgres, MySQL, SQL Server, MongoDB) feeding manually-emailed Excel reports. There was no single source of truth and analytics queries on production DBs caused slow-downs.',
    solution:
      'Debezium connectors publish CDC into Kafka; Kafka Connect sinks to raw Parquet (bronze) on S3; Apache Spark batch jobs upsert into Iceberg tables (silver); dbt models build dimensional marts (gold). Trino is the query engine; Metabase + Superset serve business users while data scientists use JupyterHub with DuckDB / PySpark.',
    outcome:
      'Time-to-insight for new metrics dropped from 3–4 weeks to under a day. Operational DBs got their CPU back, and the data team scaled from 2 to 11 in 18 months without re-architecture.',
    stack: ['Apache Iceberg', 'S3', 'Debezium', 'Kafka', 'Apache Spark', 'Trino', 'dbt', 'Metabase'],
    metrics: [
      { value: '14', label: 'source systems' },
      { value: '8.2 TB', label: 'compressed lake' },
      { value: '< 1 day', label: 'new-metric SLA' },
      { value: '99.95%', label: 'pipeline uptime' },
    ],
  },
  {
    slug: 'ml-dl-platform',
    title: 'ML / DL Algorithm Platform',
    category: 'AI · MLOps',
    icon: 'Cpu',
    media: 'ml',
    video: '',
    accent: '45,212,191',
    gradient: 'linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%)',
    summary:
      'A managed MLOps stack — notebooks, AutoML, distributed training, a model registry and one-click deploy — serving 60+ live ML models across 7 customer products.',
    problem:
      'Data scientists shipped Jupyter notebooks to engineers who rewrote them for production. Models drifted silently with no shared registry, versioning or live-inference monitoring. Time-to-prod for a new model was 6–9 weeks.',
    solution:
      'An MLOps platform on Kubernetes: JupyterHub for development, MLflow for the model registry, Kubeflow Pipelines for training DAGs, Seldon Core for serving, and Prometheus + Grafana for inference monitoring. A custom AutoML wrapper over scikit-learn, XGBoost and PyTorch produces fast baselines, with drift detection on every deployed model.',
    outcome:
      'Time-to-prod fell from weeks to days. 60+ models run in production with full lineage; two of them (delay-prediction and fuel-anomaly) drive direct ROI on the Smart-Truck product.',
    stack: ['Kubernetes', 'MLflow', 'Kubeflow', 'Seldon Core', 'PyTorch', 'TensorFlow', 'XGBoost', 'Prometheus'],
    metrics: [
      { value: '60+', label: 'live models' },
      { value: '~3 days', label: 'avg time-to-prod' },
      { value: '7', label: 'products powered' },
      { value: '24/7', label: 'drift monitoring' },
    ],
  },
  {
    slug: 'epr-portal',
    title: 'EPR Compliance Portal',
    category: 'GovTech · Sustainability',
    icon: 'Leaf',
    media: 'leaf',
    video: '',
    accent: '45,212,191',
    gradient: 'linear-gradient(135deg, #0E7490 0%, #2DD4BF 100%)',
    summary:
      'A producer-to-PRO portal for Plastic Waste Management EPR — credit reconciliation, CPCB filings, and a real-time compliance dashboard.',
    problem:
      'Producers, importers and brand owners under PWM EPR were chasing PROs over email and Excel for credit reconciliation. CPCB filing cycles were manual and error-prone, with frequent rejections.',
    solution:
      'A multi-tenant portal where producers upload purchase / sales data, PROs upload collection certificates, and the system auto-reconciles plastic credits (PET / HDPE / LDPE / PP / Multi-Layer). CPCB filings are generated as ready-to-upload JSON / PDF, and a real-time dashboard shows coverage by month, category and state.',
    outcome:
      'Reconciliation effort dropped 80%, with zero CPCB rejections across four filing cycles for pilot customers.',
    stack: ['Next.js', 'Node', 'PostgreSQL', 'Redis', 'AWS S3', 'Puppeteer (PDF)'],
    metrics: [
      { value: '5', label: 'plastic categories' },
      { value: '80%', label: '↓ reconciliation effort' },
      { value: '0', label: 'CPCB rejections' },
      { value: '12+', label: 'producers onboarded' },
    ],
  },
];
