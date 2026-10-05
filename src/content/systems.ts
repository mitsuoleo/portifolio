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
  | "commerce-intelligence"
  | "catalog"
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
    id: "commerce-intelligence",
    code: "SYS/001",
    year: 2026,
    status: "active",
    domain: "Data",
    featured: true,
    fullStudy: true,
    lab: false,
    repo: "",
    demo: "",
    docs: "",
    stack: [
      { name: "Python", role: { pt: "ingestão, processamento e automação", en: "ingestion, processing, and automation" } },
      { name: "PostgreSQL", role: { pt: "modelagem e armazenamento analítico", en: "modeling and analytical storage" } },
      { name: "FastAPI", role: { pt: "fronteira de API e contratos", en: "API boundary and contracts" } },
      { name: "Docker", role: { pt: "ambiente reproduzível e isolamento", en: "reproducible environment and isolation" } },
    ],
    slugs: { pt: "inteligencia-de-comercio", en: "commerce-intelligence" },
    titles: { pt: "Commerce Intelligence", en: "Commerce Intelligence" },
    leads: {
      pt: "Plataforma modular de analytics para comércio: ingestão com contrato, modelo analítico e API de leitura.",
      en: "A modular commerce analytics platform: contracted ingestion, an analytical model, and a read API.",
    },
    duties: {
      pt: [
        "Desenho do pipeline e dos contratos de evento",
        "Modelo analítico no PostgreSQL",
        "API de consulta e jobs idempotentes",
        "Compose, testes e documentação de decisão",
      ],
      en: [
        "Pipeline and event-contract design",
        "Analytical model in PostgreSQL",
        "Query API and idempotent jobs",
        "Compose, tests, and decision docs",
      ],
    },
  },
  {
    id: "catalog",
    code: "SYS/002",
    year: 2026,
    status: "active",
    domain: "Backend",
    featured: true,
    fullStudy: false,
    lab: false,
    repo: "",
    demo: "",
    docs: "",
    stack: [
      { name: "FastAPI", role: { pt: "API de operação do catálogo", en: "catalog operator API" } },
      { name: "PostgreSQL", role: { pt: "produtos, variantes e saldo", en: "products, variants, and on-hand" } },
      { name: "React", role: { pt: "UI de operação que torna o invariante visível", en: "operator UI that makes the invariant visible" } },
    ],
    slugs: { pt: "catalogo", en: "catalog" },
    titles: { pt: "Catálogo", en: "Catalog" },
    leads: {
      pt: "Produtos, variantes e estoque sem pedido. O saldo não fica negativo; a identidade vive na variante.",
      en: "Products, variants, and stock — no orders. On-hand cannot go negative; identity lives on the variant.",
    },
    duties: {
      pt: ["Invariantes de estoque", "Identidade de variante", "API e SPA de operação"],
      en: ["Stock invariants", "Variant identity", "Operator API and SPA"],
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
    repo: "",
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
      pt: "O clique lê o cache e devolve 302. Analytics entra num stream, fora do caminho crítico.",
      en: "A click reads cache and returns 302. Analytics goes to a stream, off the critical path.",
    },
    duties: {
      pt: ["Redirect sem banco no caminho", "Stream de cliques", "Identidade do link curto"],
      en: ["Redirect without the database on the path", "Click stream", "Short-link identity"],
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
export const anchor = systems.find((s) => s.id === "commerce-intelligence")!;
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
