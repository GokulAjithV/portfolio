// All site copy lives here, so editing the portfolio never means touching a component.

export const links = {
  github: 'https://github.com/GokulAjithV',
  linkedin: 'https://www.linkedin.com/in/gokulajithv',
  leetcode: 'https://leetcode.com/u/GokulAjithV',
  geeksforgeeks: 'https://www.geeksforgeeks.org/profile/gokulvasu225?tab=activity',
  resume: '/assets/Gokul_Ajith_V_Resume.pdf',
}

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export const hero = {
  name: 'Gokul Ajith V',
  headline: 'Backend engineer who builds production grade backend systems and LLM agents',
  subline:
    '2 years at Comcast building event-driven microservices with Python, Clojure, Kafka, Elasticsearch and PostgreSQL. Now building open-source AI systems.',
}

export const about = [
  "I'm a backend engineer who likes systems that move data reliably: event pipelines, search indexes and the services around them.",
  "At Comcast, I worked on event-driven microservices for fiber cost and invoicing workflows, built an ETL pipeline from PostgreSQL into Elasticsearch, and was primary on-call in my team's rotation for a financial microservice. Being on-call is what led me to build SENTRI: a system that does the first pass of incident investigation automatically.",
  'I care about simple designs, clear trade-offs and code that someone else can read and run.',
]

export const experience = [
  {
    company: 'Comcast',
    role: 'Software Development Engineer 1',
    location: 'Chennai',
    dates: 'Jul 2024 – Apr 2026',
    bullets: [
      'Built an ETL pipeline with PGSync and Apache Kafka: wrote the schema that maps PostgreSQL relations into search documents, added computed business fields in Python, and indexed them into Elasticsearch; dashboard sync under 400 ms.',
      'Owned the Payback Calculation engine that reconciles fiber cost estimates against corporate Purchase Orders, eliminating calculation errors in payback estimates; wrote automated tests for the core logic.',
      'Part of the team that migrated payback, labor-estimation and invoicing modules from Salesforce to an in-house platform, cutting $80K+ in annual software spend.',
      'Primary on-call for a core financial microservice (99.9% uptime SLA) in a 15-service system; handled production alerts and fixed issues at service boundaries with schema validation and database constraints.',
    ],
  },
  {
    company: 'Comcast',
    role: 'Software Development Engineer Intern',
    location: 'Chennai',
    dates: 'Jan 2024 – Jun 2024',
    bullets: [
      'Wrote health-check and dependency-verification scripts for 5 production services, making release runs 30% faster.',
      'Built REST API endpoints and fixed staging integration bugs.',
      'Automated sprint reporting with a Jira API dashboard, saving 5+ engineer-hours per sprint.',
    ],
  },
]

export const projects = [
  {
    name: 'SENTRI',
    tagline: 'AI log triage & root-cause analysis',
    summary:
      'Self-hosted triage layer that streams application logs through Kafka, groups repeated errors, alerts the owning team and drafts a root-cause report from the logs and the code.',
    tags: [
      'Python',
      'FastAPI',
      'Apache Kafka',
      'aiokafka',
      'LangGraph',
      'OpenSearch',
      'ChromaDB',
      'React',
      'TypeScript',
      'Docker',
    ],
    diagram: '/assets/sentri-arch.png',
    diagramAlt:
      'SENTRI architecture. A service sends logs to a Kafka topic, read by OpenSearch and the triage engine. Triage filters severity, groups repeats, routes to the owner, signs a link and alerts over Slack and Email. The link opens a chat, where a LangGraph agent retrieves logs from OpenSearch and code from ChromaDB, grades the context, and writes a root-cause report using the LLM.',
    bullets: [
      'Async Python SDK (aiokafka) lets any service stream logs into Kafka without blocking; OpenSearch and the triage engine read the same topic in parallel.',
      "Triage engine acts only on ERROR and WARN and fingerprints repeats by stack trace, so one incident doesn't fire 100 alerts, then notifies the owner over Slack and Email with a signed, expiring link.",
      'The link opens a React chat where a LangGraph RAG agent pulls related logs from OpenSearch and matching code from a ChromaDB index, then writes a structured report: likely cause, confidence, suggested fix and the file on GitHub.',
      'Bring your own Kafka, OpenSearch and LLM (Gemini, OpenAI or Anthropic) through env vars; a GitHub webhook re-embeds the code on push, and GitHub Actions publishes the Docker images.',
    ],
    improvements: [
      "Manual Kafka offset commits instead of auto-commit, so a crash can't lose a log.",
      'Shared-store deduplication so it works across multiple consumers.',
      'HMAC verification on incoming webhooks.',
      'Guarding the agent against prompt injection from log content.',
      "Acting on the context grade: rewrite the query and retry retrieval when the logs and code aren't enough.",
      'Single-use magic links, on top of the current signature and expiry.',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/GokulAjithV/sentri' }],
  },
  {
    name: 'CREASE',
    tagline: 'Live cricket scoring & AI scouting',
    summary:
      'Ball-by-ball scoring for grassroots cricket with live updates pushed to every viewer, plus AI match summaries and scouting reports grounded in match data.',
    tags: [
      'Python',
      'FastAPI',
      'WebSockets',
      'PostgreSQL',
      'Supabase',
      'Apache Kafka',
      'AWS S3',
      'Gemini',
      'RAG',
      'React',
      'TypeScript',
    ],
    diagram: '/assets/crease-arch.png',
    diagramAlt:
      'CREASE architecture. The React frontend calls the FastAPI backend over REST. Ball APIs write to PostgreSQL on Supabase and hand the rebuilt scorecard to WebSocket rooms, which push it to viewers. AI scouting reads stats from PostgreSQL and sends context to Gemini. The avatar pipeline uploads WebP images to AWS S3, and the Kafka log handler ships logs to SENTRI.',
    bullets: [
      'FastAPI REST APIs handle ball-by-ball scoring, including legal-ball counting, over and innings completion and undo; per-match WebSocket rooms push the updated scorecard to every viewer.',
      'S3 avatar uploads with a 5 MB limit, image validation with Pillow, EXIF stripping (including GPS) and 512px WebP resizing.',
      'Gemini scouting reports grounded in SQL-aggregated rosters, career stats, head-to-head matchups and venue history, plus embedding search over match notes.',
      'Structured logs and request telemetry stream to SENTRI over Kafka with a per-request trace ID; a circuit breaker keeps the API serving if Kafka is unreachable.',
    ],
    improvements: [
      'Redis Pub/Sub so WebSocket broadcasts work across multiple server instances.',
      "One database transaction per ball with a unique constraint, so a double-click or second scorer can't record the same ball twice.",
      'Offline scoring that queues balls on the device and syncs when the signal returns.',
    ],
    links: [
      { label: 'Live demo', href: 'https://crease-lens.vercel.app' },
      { label: 'Backend on GitHub', href: 'https://github.com/GokulAjithV/crease-brain' },
      { label: 'Frontend on GitHub', href: 'https://github.com/GokulAjithV/crease-lens' },
    ],
  },
  {
    name: 'Hourly Test Tracker',
    summary:
      "Node.js / Express app built for a friend's work at a manufacturing company (Salcomp) to track hourly production test results.",
    tags: ['Node.js', 'Express'],
    links: [{ label: 'GitHub', href: 'https://github.com/GokulAjithV/hourly-test-tracker' }],
  },
]

export const skills = [
  { group: 'Languages', items: ['Python', 'Clojure (JVM)', 'SQL', 'JavaScript', 'C++'] },
  {
    group: 'Backend',
    items: ['FastAPI', 'Node.js / Express', 'REST APIs', 'WebSockets', 'Microservices', 'Event-driven architecture'],
  },
  {
    group: 'Data & messaging',
    items: ['Apache Kafka', 'PostgreSQL', 'Elasticsearch / OpenSearch', 'PGSync', 'ChromaDB'],
  },
  { group: 'Applied AI', items: ['LangGraph', 'RAG', 'Embeddings', 'Gemini API'] },
  { group: 'Frontend', items: ['React.js', 'Re-frame', 'TypeScript', 'HTML/CSS'] },
  { group: 'Tools', items: ['Docker', 'Docker Compose', 'Git', 'GitHub Actions', 'Linux', 'AWS S3'] },
]

export const education = [
  {
    degree: 'B.Tech, Information Technology',
    school: 'SSN College of Engineering, Chennai',
    details: '2021–2024 · CGPA 8.03/10',
  },
  {
    degree: 'Diploma, Electronics & Communication Engineering',
    school: 'Thanthai Periyar E.V.R. Govt. Polytechnic, Vellore',
    details: '2019–2021 · 95.30%',
  },
]

export const contact = {
  heading: 'Contact',
  email: 'gokulvasu225@gmail.com',
  phone: '+91 63830 91493',
}

export const footer = '© 2026 Gokul Ajith V · Built with React and Tailwind'
