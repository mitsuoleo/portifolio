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
  | "observa"
  | "pipeline"
  | "shortener"
  | "promptvault";

export type System = {
  id: SystemId;
  code: string;
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
    id: "observa",
    code: "SYS/001",
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
      pt: "Laboratório local de pedidos distribuídos para demonstrar diagnóstico, compensação e recuperação com observabilidade de ponta a ponta.",
      en: "A local distributed-order lab demonstrating diagnosis, compensation, and recovery with end-to-end observability.",
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
    code: "SYS/003",
    year: 2025,
    status: "active",
    domain: "Systems Design",
    featured: true,
    fullStudy: false,
    lab: false,
    repo: "https://github.com/mitsuoleo/order-flow",
    demo: "",
    docs: "",
    stack: [
      { name: "FastAPI", role: { pt: "serviço de pedidos", en: "order service" } },
      { name: "NestJS", role: { pt: "evidência de apoio, não a identidade", en: "supporting evidence, not the identity" } },
      { name: "RabbitMQ", role: { pt: "coreografia de eventos", en: "event choreography" } },
      { name: "PostgreSQL", role: { pt: "estado do pedido", en: "order state" } },
    ],
    slugs: { pt: "pipeline-de-pedidos", en: "order-pipeline" },
    titles: { pt: "Pipeline de pedidos", en: "Order pipeline" },
    leads: {
      pt: "Um pedido de e-commerce por coreografia de eventos. Nenhum serviço de domínio chama o outro via HTTP.",
      en: "An e-commerce order through event choreography. No domain service calls another over HTTP.",
    },
    duties: {
      pt: ["Coreografia no broker", "Compensação quando o estoque falta", "Contrato 202 na criação"],
      en: ["Broker choreography", "Compensation when stock fails", "202 on create"],
    },
  },
  {
    id: "shortener",
    code: "SYS/004",
    year: 2025,
    status: "archived",
    domain: "Backend",
    featured: false,
    fullStudy: false,
    lab: false,
    repo: "https://github.com/mitsuoleo/encurta",
    demo: "",
    docs: "",
    stack: [
      { name: "Go", role: { pt: "caminho crítico do redirect", en: "redirect hot path" } },
      { name: "Redis", role: { pt: "lookup do 302", en: "302 lookup" } },
      { name: "PostgreSQL", role: { pt: "fonte de verdade e analytics assíncrono", en: "source of truth and async analytics" } },
    ],
    slugs: { pt: "encurtador", en: "link-shortener" },
    titles: { pt: "Encurtador", en: "Link shortener" },
    leads: {
      pt: "O clique consulta Redis, recorre ao PostgreSQL em cache miss e devolve 302. Analytics segue em stream.",
      en: "A click checks Redis, falls back to PostgreSQL on a cache miss, and returns 302. Analytics follows on a stream.",
    },
    duties: {
      pt: ["Lookup Redis com fallback PostgreSQL", "Stream de cliques", "Identidade do link curto"],
      en: ["Redis lookup with PostgreSQL fallback", "Click stream", "Short-link identity"],
    },
  },
  {
    id: "promptvault",
    code: "SYS/LAB/01",
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
      pt: "Arquivo versionado de prompts: diff, autor e contrato de entrada. Experimento de ferramenta interna.",
      en: "A versioned prompt archive: diff, author, and input contract. An internal-tool experiment.",
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
export const anchor = systems.find((s) => s.id === "observa")!;
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
    { key: "lab" as const, href: pagePath("lab", locale) },
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
