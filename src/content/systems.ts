import type { Locale } from "../config";
import { pagePath, systemPath } from "../config";

export type Domain =
  | "Backend"
  | "Data"
  | "Automation"
  | "Developer Tools"
  | "Systems Design"
  | "Experiments";

export type SystemStatus = "active" | "archived" | "lab";

export type Tech = {
  name: string;
  role: Record<Locale, string>;
};

export type SystemId =
  | "mercadoone"
  | "observa"
  | "pipeline"
  | "shortener"
  | "promptvault";

export type System = {
  id: SystemId;
  year: number;
  status: SystemStatus;
  domain: Domain;
  featured: boolean;
  fullStudy: boolean;
  lab: boolean;
  repo: string;
  demo: string;
  docs: string;
  stack: Tech[];
  slugs: Record<Locale, string>;
  titles: Record<Locale, string>;
  leads: Record<Locale, string>;
  duties: Record<Locale, string[]>;
};

export const systems: System[] = [
  {
    id: "mercadoone",
    year: 2026,
    status: "active",
    domain: "Backend",
    featured: true,
    fullStudy: true,
    lab: false,
    repo: "https://github.com/Fatech-Ypiranga/Mercado-One-Java",
    demo: "https://zealous-sand-0354e3510.6.azurestaticapps.net",
    docs: "https://github.com/Fatech-Ypiranga/Mercado-One-Java/blob/main/docs/estado-atual.md",
    stack: [
      { name: "Java", role: { pt: "API e PDV desktop", en: "API and desktop POS" } },
      { name: "Spring Boot", role: { pt: "API e regras do servidor", en: "API and server rules" } },
      { name: "PostgreSQL", role: { pt: "dados centrais", en: "central data" } },
      { name: "Angular", role: { pt: "administrativo web", en: "web admin" } },
      { name: "JavaFX", role: { pt: "interface do PDV", en: "POS interface" } },
      { name: "SQLite", role: { pt: "vendas e catálogo locais", en: "local sales and catalog" } },
      { name: "Azure", role: { pt: "piloto do administrativo e da API", en: "admin and API pilot" } },
    ],
    slugs: { pt: "mercado-one", en: "mercado-one" },
    titles: { pt: "Mercado One", en: "Mercado One" },
    leads: {
      pt: "Sistema para pequenos mercados em desenvolvimento: administrativo Angular e API Java num piloto Azure, PostgreSQL no servidor, e PDV JavaFX que registra vendas no SQLite antes de sincronizar",
      en: "A system in development for small grocery stores: Angular admin and Java API on an Azure pilot, PostgreSQL on the server, and a JavaFX POS that records sales in SQLite before syncing",
    },
    duties: {
      pt: ["Cadastros, estoque simples e relatórios no administrativo", "Vendas registradas no SQLite do PDV antes da sincronização", "Conflitos de sincronização tratados no servidor"],
      en: ["Catalog, basic inventory, and reports in the web admin", "Sales stored in the POS SQLite database before syncing", "Sync conflicts handled on the server"],
    },
  },
  {
    id: "observa",
    year: 2026,
    status: "active",
    domain: "Systems Design",
    featured: true,
    fullStudy: true,
    lab: false,
    repo: "https://github.com/mitsuoleo/observa",
    demo: "",
    docs: "https://github.com/mitsuoleo/observa/blob/main/docs/portfolio/evidence-2026-09-26.md",
    stack: [
      { name: "Python", role: { pt: "serviços Order e Notification", en: "Order and Notification services" } },
      { name: "Node.js", role: { pt: "serviços Payment e Inventory", en: "Payment and Inventory services" } },
      { name: "Kafka", role: { pt: "eventos de domínio", en: "domain events" } },
      { name: "PostgreSQL", role: { pt: "efeitos, deduplicação e outbox", en: "effects, deduplication, and outbox" } },
      { name: "Kubernetes", role: { pt: "laboratório local reproduzível", en: "reproducible local lab" } },
      { name: "Grafana", role: { pt: "métricas, traces e logs correlacionados", en: "correlated metrics, traces, and logs" } },
    ],
    slugs: { pt: "observa", en: "observa" },
    titles: { pt: "Observa", en: "Observa" },
    leads: {
      pt: "Laboratório local de pedidos: serviços Python e Node.js trocam eventos Kafka, persistem efeitos no PostgreSQL e correlacionam traces, métricas e logs no Grafana para diagnóstico e recuperação",
      en: "A local order lab: Python and Node.js services exchange Kafka events, persist effects in PostgreSQL, and correlate traces, metrics, and logs in Grafana for diagnosis and recovery",
    },
    duties: {
      pt: [
        "Quatro serviços de domínio ligados por eventos Kafka",
        "Outbox e deduplicação por event_id no PostgreSQL",
        "Traces, métricas e logs correlacionados no Grafana",
        "Demonstração e recuperação reproduzíveis no Kubernetes local",
      ],
      en: [
        "Four domain services connected by Kafka events",
        "PostgreSQL outbox and event_id deduplication",
        "Correlated traces, metrics, and logs in Grafana",
        "Reproducible demo and recovery in local Kubernetes",
      ],
    },
  },
  {
    id: "pipeline",
    year: 2026,
    status: "active",
    domain: "Systems Design",
    featured: true,
    fullStudy: true,
    lab: false,
    repo: "https://github.com/mitsuoleo/order-flow",
    demo: "",
    docs: "https://github.com/mitsuoleo/order-flow/blob/main/README.md",
    stack: [
      { name: "FastAPI", role: { pt: "serviço de pedidos", en: "order service" } },
      { name: "NestJS", role: { pt: "evidência de apoio, não a identidade", en: "supporting evidence, not the identity" } },
      { name: "RabbitMQ", role: { pt: "coreografia de eventos", en: "event choreography" } },
      { name: "PostgreSQL", role: { pt: "estado do pedido", en: "order state" } },
    ],
    slugs: { pt: "pipeline-de-pedidos", en: "order-pipeline" },
    titles: { pt: "Pipeline de pedidos", en: "Order pipeline" },
    leads: {
      pt: "Fluxo de pedidos de e-commerce com FastAPI, NestJS e RabbitMQ: pagamento e estoque avançam por eventos, com compensação quando falta estoque e sem chamadas HTTP entre serviços de domínio",
      en: "An e-commerce order flow with FastAPI, NestJS, and RabbitMQ: payment and inventory progress through events, with compensation when stock is unavailable and no HTTP calls between domain services",
    },
    duties: {
      pt: ["Coreografia no broker", "Compensação quando o estoque falta", "Contrato 202 na criação"],
      en: ["Broker choreography", "Compensation when stock fails", "202 on create"],
    },
  },
  {
    id: "shortener",
    year: 2026,
    status: "archived",
    domain: "Backend",
    featured: true,
    fullStudy: true,
    lab: false,
    repo: "https://github.com/mitsuoleo/encurta",
    demo: "",
    docs: "https://github.com/mitsuoleo/encurta/blob/main/README.md",
    stack: [
      { name: "Go", role: { pt: "caminho crítico do redirect", en: "redirect hot path" } },
      { name: "Redis", role: { pt: "lookup do 302", en: "302 lookup" } },
      { name: "PostgreSQL", role: { pt: "fonte de verdade e analytics assíncrono", en: "source of truth and async analytics" } },
    ],
    slugs: { pt: "encurtador", en: "link-shortener" },
    titles: { pt: "Encurtador", en: "Link shortener" },
    leads: {
      pt: "Encurtador em Go: consulta o link no Redis, busca no PostgreSQL quando não há cache e retorna HTTP 302, com captura assíncrona de cliques em stream",
      en: "A Go link shortener: looks up links in Redis, falls back to PostgreSQL on a cache miss, and returns HTTP 302, with asynchronous click capture on a stream",
    },
    duties: {
      pt: ["Lookup Redis com fallback PostgreSQL", "Stream de cliques", "Identidade do link curto"],
      en: ["Redis lookup with PostgreSQL fallback", "Click stream", "Short-link identity"],
    },
  },
  {
    id: "promptvault",
    year: 2026,
    status: "lab",
    domain: "Developer Tools",
    featured: false,
    fullStudy: false,
    lab: true,
    repo: "",
    demo: "",
    docs: "",
    stack: [
      { name: "Python", role: { pt: "versionamento de prompts como artefato", en: "versioning prompts as artifacts" } },
    ],
    slugs: { pt: "promptvault", en: "promptvault" },
    titles: { pt: "PromptVault", en: "PromptVault" },
    leads: {
      pt: "Experimento de ferramenta interna em Python para versionar prompts com diff, autor e contrato de entrada",
      en: "An internal-tool experiment in Python for versioning prompts with diffs, authors, and input contracts",
    },
    duties: {
      pt: ["Modelo de versão", "Nota de laboratório"],
      en: ["Version model", "Lab note"],
    },
  },
];

export const featuredSystems = systems.filter((s) => s.featured);
export const workSystems = systems.filter((s) => !s.lab);
export const labSystems = systems.filter((s) => s.lab);
export const anchor = systems.find((s) => s.id === "mercadoone")!;
export const recentExperiment = systems.find((s) => s.id === "promptvault")!;

export function systemBySlug(slug: string, locale: Locale) {
  return systems.find((s) => s.slugs[locale] === slug);
}

export function systemHref(system: System, locale: Locale) {
  return systemPath(system.slugs, locale);
}

export function navItems(locale: Locale) {
  return [
    { key: "home" as const, href: pagePath("home", locale) },
    { key: "work" as const, href: pagePath("work", locale) },
    { key: "profile" as const, href: pagePath("profile", locale) },
  ];
}

export function techs() {
  return [...new Set(workSystems.flatMap((s) => s.stack.map((t) => t.name)))].sort();
}

export function years() {
  return [...new Set(workSystems.map((s) => s.year))].sort((a, b) => b - a);
}

export function domains() {
  return [...new Set(workSystems.map((s) => s.domain))];
}
