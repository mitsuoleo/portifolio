const categories: Record<string, string> = {
  Python: "language", Java: "language", TypeScript: "language", JavaScript: "language", Go: "language",
  "Spring Boot": "framework", Angular: "framework", JavaFX: "framework", "Node.js": "framework", FastAPI: "framework", NestJS: "framework",
  PostgreSQL: "data", SQLite: "data", Redis: "data",
  Kafka: "infrastructure", Docker: "infrastructure", Kubernetes: "infrastructure", Grafana: "infrastructure", RabbitMQ: "infrastructure", OpenTelemetry: "infrastructure",
};

export const techCategory = (name: string) => categories[name] ?? "infrastructure";
