/**
 * Site content.
 *
 * Kept apart from presentation so copy and data can be revised without touching
 * layout, and so every section reads from one source of truth.
 */

export const studio = {
  name: "Coderaft",
  role: "Software Engineering Studio",
  email: "hello@coderaft.dev",
  location: "India",
  established: "2021",
  availability: "Available for Q3 engagements",
} as const;

/* -------------------------------------------------------------------------- */
/* Navigation                                                                  */
/* -------------------------------------------------------------------------- */

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Systems", href: "#systems" },
  { label: "Company", href: "#company" },
] as const;

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

export const heroDisciplines = [
  "Product Engineering",
  "Systems",
  "Cloud",
  "Security",
  "Digital Products",
] as const;

/* -------------------------------------------------------------------------- */
/* Work                                                                        */
/* -------------------------------------------------------------------------- */

export type ProjectStatus = "DESIGNED" | "ENGINEERED" | "DEPLOYED";

export interface Project {
  id: string;
  /** Zero-padded index shown as PROJECT / 001. */
  num: string;
  name: string;
  sector: string;
  discipline: string;
  summary: string;
  stack: string[];
  status: ProjectStatus;
  year: string;
  /** Three hard numbers per project — evidence, not adjectives. */
  metrics: { label: string; value: string }[];
  /** The shape of the system, in one sentence. */
  architecture: string;
  /** What actually shipped. */
  outcome: string;
  /** A real decision the team made. Written in the studio's own voice. */
  note: string;
  /** Drives the alternating page composition. */
  layout: "wide" | "left" | "right";
}

export const projects: Project[] = [
  {
    id: "healthsync",
    num: "001",
    name: "HealthSync Platform",
    sector: "Healthcare",
    discipline: "Full-Stack SaaS",
    summary:
      "A patient management and appointment scheduling platform with secure EHR integration, real-time notifications and role-based access control.",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "AWS"],
    status: "DEPLOYED",
    year: "2024",
    metrics: [
      { label: "Clinics", value: "24" },
      { label: "P95 latency", value: "180ms" },
      { label: "Uptime", value: "99.9%" },
    ],
    architecture:
      "Next.js front end against a FastAPI service layer, with PostgreSQL holding scheduling state behind exclusion constraints and S3 for clinical documents. Notifications fan out through a queue.",
    outcome:
      "Running across 24 clinics with role-scoped access for clinicians, reception, and administrators. Scheduling conflicts have not recurred since the constraint went in.",
    note: "Double-booking was not fixed in application code — it was made impossible in the schema. The database does not negotiate.",
    layout: "wide",
  },
  {
    id: "finflow",
    num: "002",
    name: "FinFlow Analytics",
    sector: "FinTech",
    discipline: "Data Platform",
    summary:
      "Real-time financial analytics dashboard with automated reporting and anomaly detection over streaming transaction data.",
    stack: ["React", "Python", "MongoDB", "GCP"],
    status: "DEPLOYED",
    year: "2024",
    metrics: [
      { label: "Events/day", value: "4.2M" },
      { label: "Ingest lag", value: "<2s" },
      { label: "Precision", value: "94%" },
    ],
    architecture:
      "Transactions land on a stream processor that maintains rolling aggregates and anomaly scores; the React dashboard reads those materialised views rather than querying raw events.",
    outcome:
      "Four million events a day summarised in under two seconds, with flagged transactions surfaced to analysts while the window is still open.",
    note: "Every number on screen was computed before anyone asked for it. Dashboards should read, not think.",
    layout: "left",
  },
  {
    id: "securevault",
    num: "003",
    name: "SecureVault API",
    sector: "Cybersecurity",
    discipline: "Backend Engineering",
    summary:
      "Zero-trust API gateway with rate limiting, end-to-end encryption, audit logging and OAuth 2.0 authentication.",
    stack: ["FastAPI", "PostgreSQL", "Redis", "Docker", "JWT"],
    status: "DEPLOYED",
    year: "2023",
    metrics: [
      { label: "Requests/s", value: "8.5K" },
      { label: "Auth overhead", value: "4ms" },
      { label: "Audit retention", value: "7y" },
    ],
    architecture:
      "A FastAPI gateway terminating OAuth 2.0, verifying JWTs once, and passing a signed identity context downstream. Redis backs sliding-window rate limits; every decision is written to an append-only audit log.",
    outcome:
      "Sustains 8,500 requests per second with four milliseconds of auth overhead, and a seven-year immutable audit trail that satisfies review without extra tooling.",
    note: "A fixed window lets clients burst at double the limit right across the boundary. Load testing found the cheaters in minutes — so the window slides.",
    layout: "right",
  },
  {
    id: "cloudops",
    num: "004",
    name: "CloudOps Dashboard",
    sector: "Cloud",
    discipline: "DevOps Platform",
    summary:
      "Kubernetes cluster management dashboard with real-time resource monitoring, auto-scaling controls and cost analytics.",
    stack: ["React", "Python", "AWS", "Terraform", "K8s"],
    status: "DEPLOYED",
    year: "2024",
    metrics: [
      { label: "Clusters", value: "12" },
      { label: "Nodes", value: "340" },
      { label: "Cost reduction", value: "31%" },
    ],
    architecture:
      "A Python control plane reconciling Kubernetes state, streaming metrics to the browser over one multiplexed WebSocket, with Terraform describing every environment it manages.",
    outcome:
      "Twelve clusters and 340 nodes under one view, and a 31% reduction in monthly spend after idle capacity became visible.",
    note: "One multiplexed WebSocket replaced sixty polls a minute per open dashboard. The servers noticed immediately.",
    layout: "left",
  },
  {
    id: "edutrack",
    num: "005",
    name: "EduTrack LMS",
    sector: "Education",
    discipline: "Web Application",
    summary:
      "Learning management system with live class streaming, assignment workflows and cohort progress analytics.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Redis"],
    status: "ENGINEERED",
    year: "2023",
    metrics: [
      { label: "Learners", value: "6.8K" },
      { label: "Concurrent streams", value: "400" },
      { label: "Assignments", value: "52K" },
    ],
    architecture:
      "Next.js and Node against PostgreSQL, with learner progress stored as an append-only event log and Redis fronting the read models that power cohort analytics.",
    outcome:
      "Supports 6,800 learners and 400 concurrent streams; regrading a cohort is a replay of the log rather than a data migration.",
    note: "Regrading a cohort is a replay, not a migration. The log remembers so nobody else has to.",
    layout: "right",
  },
  {
    id: "shopstream",
    num: "006",
    name: "ShopStream",
    sector: "Retail",
    discipline: "Recommendation Engine",
    summary:
      "Product recommendation service using collaborative filtering, exposed as a REST API for e-commerce integration.",
    stack: ["Python", "TensorFlow", "FastAPI", "Redis", "PostgreSQL"],
    status: "ENGINEERED",
    year: "2023",
    metrics: [
      { label: "Catalogue", value: "180K" },
      { label: "Inference", value: "12ms" },
      { label: "CTR uplift", value: "+18%" },
    ],
    architecture:
      "Collaborative-filtering embeddings recomputed nightly in a batch job and served from a warm Redis cache behind a FastAPI inference endpoint. The serving path never trains.",
    outcome:
      "Twelve-millisecond inference across a 180,000-item catalogue, with an 18% click-through uplift over the previous rules-based ordering.",
    note: "The serving path never trains — inference just reads the menu, and nobody cooks during the dinner rush. The p99 stays flat.",
    layout: "wide",
  },
];

/* -------------------------------------------------------------------------- */
/* Systems — the architecture visualisation                                    */
/* -------------------------------------------------------------------------- */

export interface Tier {
  id: string;
  index: string;
  name: string;
  role: string;
  detail: string;
  components: string[];
  /** Representative figure for this tier. */
  metric: { label: string; value: string };
}

export const tiers: Tier[] = [
  {
    id: "client",
    index: "01",
    name: "Client",
    role: "Browser, mobile, and third-party consumers",
    detail:
      "Rendered server-side where it helps first paint, hydrated only where interaction demands it. Assets are versioned and served from the edge.",
    components: ["Web", "Mobile", "Partner APIs"],
    metric: { label: "First paint", value: "<1.2s" },
  },
  {
    id: "edge",
    index: "02",
    name: "Edge",
    role: "TLS termination, caching, and request shaping",
    detail:
      "Static responses never reach the origin. The edge absorbs bursts, terminates TLS, and applies the first layer of rate limiting before anything is authenticated.",
    components: ["CDN", "WAF", "Rate limiting"],
    metric: { label: "Cache hit", value: "92%" },
  },
  {
    id: "gateway",
    index: "03",
    name: "API Gateway",
    role: "Authentication, authorisation, and routing",
    detail:
      "One place that knows who the caller is. Tokens are verified here and identity is passed downstream as a signed context, so services never re-implement auth.",
    components: ["OAuth 2.0", "JWT", "RBAC", "Routing"],
    metric: { label: "Auth overhead", value: "4ms" },
  },
  {
    id: "services",
    index: "04",
    name: "Services",
    role: "Domain logic, split along business boundaries",
    detail:
      "Services own their data and communicate over explicit contracts. Boundaries follow the domain, not the org chart, which is what keeps them from turning back into one system.",
    components: ["Domain services", "gRPC", "Contracts"],
    metric: { label: "Deploys/week", value: "40+" },
  },
  {
    id: "workers",
    index: "05",
    name: "Workers",
    role: "Asynchronous and scheduled work",
    detail:
      "Anything slow, retryable, or bursty leaves the request path. Queues absorb load spikes, and every job is idempotent so a retry is always safe.",
    components: ["Queues", "Schedulers", "Retries", "DLQ"],
    metric: { label: "Job success", value: "99.97%" },
  },
  {
    id: "data",
    index: "06",
    name: "Data",
    role: "Durable state and read models",
    detail:
      "Relational where correctness matters, cached where latency does. Constraints live in the schema, so invalid state cannot be written by any code path.",
    components: ["PostgreSQL", "Redis", "Object storage"],
    metric: { label: "Replica lag", value: "<50ms" },
  },
  {
    id: "infra",
    index: "07",
    name: "Infrastructure",
    role: "Provisioning, delivery, and observability",
    detail:
      "Every environment is described in code and rebuilt from it. Traces, metrics, and logs are correlated by request id, so a failure is read rather than guessed at.",
    components: ["Terraform", "Kubernetes", "CI/CD", "Tracing"],
    metric: { label: "Recovery", value: "<15min" },
  },
];

/* -------------------------------------------------------------------------- */
/* Capabilities                                                                */
/* -------------------------------------------------------------------------- */

export interface Capability {
  id: string;
  index: string;
  title: string;
  statement: string;
  disciplines: string[];
}

export const capabilities: Capability[] = [
  {
    id: "product",
    index: "01",
    title: "Product Engineering",
    statement:
      "Interfaces and applications people use every day — designed, built, and maintained as one continuous piece of work.",
    disciplines: [
      "Web platforms",
      "Mobile applications",
      "Enterprise software",
      "Design systems",
      "Progressive web apps",
      "Frontend architecture",
    ],
  },
  {
    id: "systems",
    index: "02",
    title: "System Engineering",
    statement:
      "The parts users never notice. For infrastructure, that is the highest compliment there is.",
    disciplines: [
      "APIs & contracts",
      "Distributed systems",
      "Microservices",
      "Cloud infrastructure",
      "Event pipelines",
      "Observability",
    ],
  },
  {
    id: "intelligent",
    index: "03",
    title: "Intelligent Systems",
    statement:
      "Models placed inside real products, with the retrieval, evaluation, and fallbacks that make them dependable in production.",
    disciplines: [
      "Machine learning",
      "Retrieval systems",
      "Automation",
      "Computer vision",
      "Data engineering",
      "Model deployment",
    ],
  },
  {
    id: "security",
    index: "04",
    title: "Security",
    statement:
      "Identity, boundaries, and blast radius decided at design time — 'we'll add auth later' is how incidents introduce themselves.",
    disciplines: [
      "Application security",
      "Infrastructure security",
      "Identity & access",
      "Threat modelling",
      "Audit & compliance",
      "Penetration testing",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Sectors                                                                     */
/* -------------------------------------------------------------------------- */

export interface Sector {
  id: string;
  name: string;
  /** Shown when the sector is active. */
  focus: string;
  projects: string;
  systems: string[];
}

export const sectors: Sector[] = [
  {
    id: "fintech",
    name: "Fintech",
    focus: "Ledgers, reconciliation, and reporting — where a rounding error is a crime scene.",
    projects: "07",
    systems: ["Double-entry ledgers", "Payment rails", "Fraud signals"],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    focus: "Clinical workflows and records systems with access control as a first constraint.",
    projects: "05",
    systems: ["EHR integration", "Scheduling", "Consent & audit"],
  },
  {
    id: "edtech",
    name: "Edtech",
    focus: "Learning platforms that stay responsive during the hour everyone logs in at once.",
    projects: "09",
    systems: ["Live streaming", "Assessment", "Cohort analytics"],
  },
  {
    id: "retail",
    name: "Retail",
    focus: "Catalogue, checkout, and recommendation systems under seasonal load.",
    projects: "06",
    systems: ["Catalogue search", "Checkout", "Recommendations"],
  },
  {
    id: "logistics",
    name: "Logistics",
    focus: "Dispatch and tracking systems that reconcile the plan with what actually happened.",
    projects: "04",
    systems: ["Route planning", "Fleet telemetry", "Proof of delivery"],
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    focus: "Gateways, identity, and audit trails written for the day they are read in court.",
    projects: "05",
    systems: ["Zero-trust gateways", "Identity", "Audit logging"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    focus: "Internal systems replacing spreadsheets that quietly became critical infrastructure.",
    projects: "08",
    systems: ["Workflow engines", "Integrations", "Reporting"],
  },
  {
    id: "govtech",
    name: "Govtech",
    focus: "Public-facing services where accessibility and uptime are the requirement.",
    projects: "03",
    systems: ["Citizen portals", "Records", "Accessibility"],
  },
  {
    id: "ai",
    name: "AI / ML",
    focus: "Models in production, wrapped in the evaluation that catches them bluffing.",
    projects: "07",
    systems: ["Retrieval", "Inference APIs", "Evaluation"],
  },
  {
    id: "cloud",
    name: "Cloud",
    focus: "Infrastructure you can delete on purpose — and rebuild from code before lunch.",
    projects: "11",
    systems: ["Terraform", "Kubernetes", "Cost control"],
  },
  {
    id: "iot",
    name: "IoT",
    focus: "Device fleets that keep reporting even when the network lies.",
    projects: "04",
    systems: ["Device registry", "Telemetry", "Edge buffering"],
  },
  {
    id: "automation",
    name: "Automation",
    focus: "Operational processes turned into systems with an audit trail.",
    projects: "06",
    systems: ["Workflow automation", "Integrations", "Scheduling"],
  },
];

/* -------------------------------------------------------------------------- */
/* Engagements                                                                 */
/* -------------------------------------------------------------------------- */

export interface Engagement {
  id: string;
  index: string;
  audience: string;
  title: string;
  statement: string;
  scope: string[];
  cta: string;
}

export const engagements: Engagement[] = [
  {
    id: "academic",
    index: "A",
    audience: "Students & Institutions",
    title: "Academic Systems",
    statement:
      "Final-year and research projects built to the same standard as our commercial work — because a viva panel asks the same questions a code review does.",
    scope: [
      "Final-year & mini projects",
      "Research implementations",
      "Full-stack applications",
      "ML & data projects",
      "IoT & embedded systems",
      "Documentation & defence support",
    ],
    cta: "Start an academic project",
  },
  {
    id: "commercial",
    index: "B",
    audience: "Startups & Companies",
    title: "Product & Platform",
    statement:
      "From first working version to platform under real load. Success is the first stress test — we build you to pass it.",
    scope: [
      "MVP development",
      "SaaS platform engineering",
      "Enterprise applications",
      "APIs & integrations",
      "Cloud infrastructure",
      "Modernisation & rescue work",
    ],
    cta: "Start a product engagement",
  },
];

/* -------------------------------------------------------------------------- */
/* Method                                                                      */
/* -------------------------------------------------------------------------- */

export interface Phase {
  index: string;
  name: string;
  duration: string;
  summary: string;
  outputs: string[];
  /** A candid note in the studio's voice. */
  note: string;
}

export const phases: Phase[] = [
  {
    index: "01",
    name: "Definition",
    duration: "Week 1",
    summary:
      "We establish what the system must do, what it must never do, and which constraints are real.",
    outputs: ["Requirements", "Constraints", "Success criteria"],
    note: "Every rescue project we have ever taken started life as 'we'll figure that out later.'",
  },
  {
    index: "02",
    name: "Architecture",
    duration: "Week 1–2",
    summary:
      "Boundaries, data model, and failure modes are decided before any feature code is written.",
    outputs: ["System design", "Data model", "Interface contracts"],
    note: "Whiteboards are cheap. Outages are not.",
  },
  {
    index: "03",
    name: "Engineering",
    duration: "Week 2–8",
    summary:
      "Built in reviewed increments, each one deployable, each one covered by tests that would actually fail.",
    outputs: ["Application", "Test suites", "Review history"],
    note: "A test that cannot fail is documentation wearing a costume.",
  },
  {
    index: "04",
    name: "Hardening",
    duration: "Week 8–9",
    summary:
      "Load, abuse, and edge conditions applied deliberately, then fixed before anyone else finds them.",
    outputs: ["Load results", "Security review", "Fixes"],
    note: "We would rather break it ourselves on a Tuesday than have a user break it on a Friday.",
  },
  {
    index: "05",
    name: "Deployment",
    duration: "Week 9",
    summary:
      "Infrastructure as code, pipelines, monitoring, and alerting — shipped with the product, not after it.",
    outputs: ["Pipelines", "Infrastructure", "Dashboards"],
    note: "If step four of the deploy is 'Dave remembers to press enter,' it is not finished.",
  },
  {
    index: "06",
    name: "Operation",
    duration: "Ongoing",
    summary: "We stay reachable. Systems are maintained, patched, and extended as they are used.",
    outputs: ["Monitoring", "Maintenance", "Iteration"],
    note: "Handover is a phase, not an email.",
  },
];

/* -------------------------------------------------------------------------- */
/* Stack index                                                                 */
/* -------------------------------------------------------------------------- */

export const stackIndex = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite"] },
  { group: "Backend", items: ["Node.js", "Python", "FastAPI", "Django", "Java", "Spring Boot"] },
  { group: "Mobile", items: ["Flutter", "React Native", "Kotlin", "Swift"] },
  { group: "Data", items: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "ClickHouse"] },
  { group: "Intelligence", items: ["PyTorch", "TensorFlow", "scikit-learn", "LangChain", "OpenCV"] },
  { group: "Cloud", items: ["AWS", "GCP", "Azure", "Vercel", "Cloudflare"] },
  { group: "Delivery", items: ["Docker", "Kubernetes", "Terraform", "GitHub Actions", "Grafana"] },
] as const;

/* -------------------------------------------------------------------------- */
/* Company                                                                     */
/* -------------------------------------------------------------------------- */

export const principles = [
  {
    index: "01",
    title: "Design the system first",
    body: "Boundaries, data model, and failure modes are settled before feature work begins. It is the cheapest hour in the project.",
  },
  {
    index: "02",
    title: "Constraints belong in the schema",
    body: "If invalid state cannot be written, it cannot be read. We push correctness as far down the stack as it will go.",
  },
  {
    index: "03",
    title: "Security is a design input",
    body: "Identity, permissions, and blast radius are decided alongside the feature, not audited into it afterwards.",
  },
  {
    index: "04",
    title: "Operability ships with the product",
    body: "Pipelines, monitoring, and runbooks are part of the deliverable. A system nobody can observe is a system nobody can fix.",
  },
  {
    index: "05",
    title: "Write it down",
    body: "Architecture decisions, trade-offs, and the reasoning behind them. The engineer who curses this code next year is usually you.",
  },
  {
    index: "06",
    title: "Stay after delivery",
    body: "We maintain what we build. Knowing a bad decision can wake us at 3 a.m. is the best code review there is.",
  },
] as const;

export const studioStats = [
  { label: "Systems delivered", value: "75+" },
  { label: "Sectors", value: "12" },
  { label: "Operating since", value: "2021" },
  { label: "Longest engagement", value: "3 yrs" },
] as const;

/* -------------------------------------------------------------------------- */
/* Contact                                                                     */
/* -------------------------------------------------------------------------- */

export const projectTypes = [
  "College Project",
  "Research Project",
  "Startup MVP",
  "Business Application",
  "Enterprise Software",
  "Mobile Application",
  "AI / ML System",
  "Cloud Project",
  "Cybersecurity",
  "Other",
] as const;

export const budgetRanges = [
  "Under ₹5,000",
  "₹5,000 – ₹15,000",
  "₹15,000 – ₹40,000",
  "₹40,000 – ₹1,00,000",
  "₹1,00,000+",
  "To be discussed",
] as const;

export const timelines = [
  "ASAP (within 1 week)",
  "2 – 4 weeks",
  "1 – 2 months",
  "3 – 6 months",
  "6 months+",
  "Flexible",
] as const;

export const industries = [
  "Education",
  "Healthcare",
  "FinTech",
  "E-commerce",
  "Logistics",
  "Real Estate",
  "Manufacturing",
  "Technology",
  "Research",
  "Government",
  "Other",
] as const;

export const footerLinks = {
  Work: [
    { label: "Selected work", href: "#work" },
    { label: "Sectors", href: "#sectors" },
    { label: "Systems", href: "#systems" },
  ],
  Capabilities: [
    { label: "Product engineering", href: "#capabilities" },
    { label: "System engineering", href: "#capabilities" },
    { label: "Intelligent systems", href: "#capabilities" },
    { label: "Security", href: "#capabilities" },
  ],
  Company: [
    { label: "Studio", href: "#company" },
    { label: "Method", href: "#method" },
    { label: "Engagements", href: "#engagements" },
    { label: "Contact", href: "#contact" },
  ],
} as const;
