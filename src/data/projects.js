export const PROJECTS = [
  {
    slug: 'smart-truck-gps',
    title: 'Smart-Truck GPS Analytics',
    category: 'Logistics · IoT · Data',
    icon: 'Truck',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
    summary:
      'A telematics platform ingesting 50M+ GPS pings/day from 8,000+ commercial trucks, converted into routable trips, fuel intelligence and trip-level P&L.',
    problem:
      'Fleet operators were drowning in raw GPS data — millions of pings/day with GPS drift, urban canyon noise, and no business-readable signal. Manual trip reconstruction took analysts days and was riddled with errors.',
    solution:
      'We built a streaming pipeline: Kafka ingests pings from the OEM telematics box; a Flink job snaps each ping to the nearest road segment using our OSRM cluster; trip detection ML model segments ping streams into trips with stop/dwell/idle classification; trips persist to an Iceberg-backed data lake queried by Trino. A React dashboard renders live & historical trips on Mapbox tiles.',
    outcome:
      'Trip reconstruction latency dropped from hours to < 30 seconds. Fuel theft detection caught ₹3.2 Cr of unrecorded diesel loss in year one. Driver-score-based incentive program lifted on-time delivery by 18%.',
    stack: ['OSRM', 'Kafka', 'Apache Flink', 'Iceberg', 'Trino', 'PostGIS', 'Mapbox', 'React'],
    metrics: [
      { value: '50M+', label: 'GPS pings / day' },
      { value: '8,000+', label: 'trucks tracked live' },
      { value: '< 30s', label: 'trip latency' },
      { value: '18%', label: '↑ on-time delivery' },
    ],
  },
  {
    slug: 'osrm-snap-to-road',
    title: 'OSRM Snap-to-Road & Map Matching',
    category: 'Geospatial · Open-Source',
    icon: 'MapPin',
    gradient: 'linear-gradient(135deg, #6366F1 0%, #818CF8 100%)',
    summary:
      'A self-hosted OSRM cluster custom-tuned for the Indian road network, giving us sub-50ms snap-to-road and Hidden-Markov-Model based map matching at scale.',
    problem:
      'Commercial routing APIs (Google, HERE, Mapbox) were costing the customer ₹40+ lakhs/month at their query volume — and rate-limited their batch reprocessing. OSS OSRM out-of-the-box was fast but inaccurate on rural Indian roads and lacked map-matching tuned for low-frequency pings (1-per-30s).',
    solution:
      'We forked OSRM, ingested fresh OSM India extracts with custom turn-restriction profiles, and added a custom truck profile (height/weight/HAZMAT). On top of that we wrote an HMM-based map-matching service that handles sparse pings (1/30s) and noisy GPS — emission probability is calibrated per road class.',
    outcome:
      'API spend collapsed from ₹40L/month to a single ₹35K/month EC2 cluster. Map-matched trip accuracy went from 82% (vanilla OSRM) to 96.4% (our HMM layer).',
    stack: ['OSRM', 'C++', 'OpenStreetMap', 'PostGIS', 'Docker', 'Kubernetes', 'Redis'],
    metrics: [
      { value: '< 50ms', label: 'snap latency p95' },
      { value: '96.4%', label: 'match accuracy' },
      { value: '₹40L → ₹35K', label: 'monthly cost' },
      { value: '10k+ QPS', label: 'sustained' },
    ],
  },
  {
    slug: 'data-lake-platform',
    title: 'Enterprise Data Lake Platform',
    category: 'Data Engineering · Analytics',
    icon: 'Database',
    gradient: 'linear-gradient(135deg, #1E40AF 0%, #60A5FA 100%)',
    summary:
      'A bronze / silver / gold lakehouse on S3 + Apache Iceberg, with Debezium CDC from 14 source systems and dbt-driven transforms, served via Trino + Metabase.',
    problem:
      'Customer had 14 disparate operational databases (Postgres, MySQL, SQL Server, MongoDB) feeding into manually-emailed Excel reports. There was no single source of truth and analytics queries on production DBs were causing slow-downs.',
    solution:
      'We stood up Debezium connectors against each source DB to publish CDC into Kafka; Kafka Connect sinks to raw Parquet (bronze) on S3; Apache Spark batch jobs upsert into Iceberg tables (silver); dbt models build dimensional marts (gold). Trino is the query engine. Metabase + Superset are the BI layer for business users; data scientists use JupyterHub with DuckDB / PySpark.',
    outcome:
      'Time-to-insight for new metrics dropped from 3-4 weeks to under a day. Operational DBs got their CPU back. The data team scaled from 2 to 11 in 18 months without re-architecture.',
    stack: ['Apache Iceberg', 'S3', 'Debezium', 'Kafka', 'Apache Spark', 'Trino', 'dbt', 'Metabase'],
    metrics: [
      { value: '14', label: 'source systems' },
      { value: '8.2 TB', label: 'compressed lake size' },
      { value: '< 1 day', label: 'new-metric SLA' },
      { value: '99.95%', label: 'pipeline uptime' },
    ],
  },
  {
    slug: 'ml-dl-platform',
    title: 'ML / DL Algorithm Platform',
    category: 'AI · MLOps',
    icon: 'Brain',
    gradient: 'linear-gradient(135deg, #D97706 0%, #FBBF24 100%)',
    summary:
      'A managed MLOps stack: notebooks, AutoML, distributed training, a model registry and one-click deploy — serving 60+ live ML models across 7 customer products.',
    problem:
      'Data scientists were shipping Jupyter notebooks to engineers, who would rewrite them in production. Models drifted silently and there was no shared registry, no versioning, no monitoring of live inference. Time-to-prod for a new model was 6-9 weeks.',
    solution:
      'We built an MLOps platform on Kubernetes: JupyterHub for development, MLflow for the model registry, Kubeflow Pipelines for training DAGs, Seldon Core for serving, and Prometheus + Grafana for inference monitoring. Custom AutoML wrapper over scikit-learn, XGBoost, and PyTorch for fast baselines. Drift detection on every deployed model.',
    outcome:
      'Time-to-prod fell from weeks to days. 60+ models run in production with full lineage. Two of those models (delay-prediction and fuel-anomaly) drive direct customer ROI on the Smart-Truck product.',
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
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
    summary:
      'A producer-to-PRO portal for Plastic Waste Management EPR — credit reconciliation, CPCB filings, and a real-time compliance dashboard.',
    problem:
      'Producers, importers and brand owners under PWM EPR were chasing PROs over emails and Excel for credit reconciliation. CPCB filing cycles were manual and error-prone, with frequent rejections.',
    solution:
      'A multi-tenant portal where producers upload purchase / sales data, PROs upload collection certificates, and the system reconciles plastic credits (PET / HDPE / LDPE / PP / Multi-Layer) automatically. CPCB filings generated as ready-to-upload JSON / PDF. Real-time compliance dashboard shows coverage by month, category, and state.',
    outcome:
      'Reconciliation effort dropped 80%. Zero CPCB rejections across 4 filing cycles for our pilot customers.',
    stack: ['Next.js', 'Node', 'PostgreSQL', 'Redis', 'AWS S3', 'Puppeteer (PDF)', 'Stripe (collections)'],
    metrics: [
      { value: '5', label: 'plastic categories' },
      { value: '80%', label: '↓ reconciliation effort' },
      { value: '0', label: 'CPCB rejections' },
      { value: '12+', label: 'producers onboarded' },
    ],
  },
];
