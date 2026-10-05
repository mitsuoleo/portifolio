import type { Locale } from "../config";
import type { SystemId } from "./systems";

export type StudyBlock = { intro: string; items?: string[] };
export type FullStudy = {
  context: StudyBlock;
  role: StudyBlock;
  architecture: StudyBlock;
  data: StudyBlock;
  decisions: StudyBlock;
  implementation: StudyBlock;
  product: StudyBlock;
  results: StudyBlock;
  retro: StudyBlock;
};

export const studies: Partial<Record<SystemId, Record<Locale, FullStudy>>> = {
  observa: {
    pt: {
      context: {
        intro: "Observa é um laboratório local para diagnosticar e recuperar uma jornada de pedidos distribuída. Quatro serviços trocam eventos de domínio; pedidos, pagamentos e estoque são sintéticos. O objetivo é tornar visível o caminho entre um estado de negócio, a trace correspondente e os logs da mesma execução.",
        items: [
          "Três resultados demonstráveis: CONFIRMED, FAILED e CANCELLED; o caso CANCELLED inclui compensação do pagamento.",
          "A demonstração usa Kubernetes local, sem cobrança, notificação externa ou cloud obrigatória.",
          "OrderFlow foi referência funcional somente leitura; Observa é um projeto separado.",
        ],
      },
      role: {
        intro: "O repositório apresenta serviços, contratos, infraestrutura, scripts de verificação e runbooks como trabalho de engenharia do projeto. A evidência pública permite avaliar comportamento e decisões sem atribuir resultados a uma operação comercial externa.",
        items: [
          "Fluxo e contratos de eventos para Order, Payment, Inventory e Notification.",
          "Outbox, deduplicação e recuperação testados com PostgreSQL descartável e no cluster local.",
          "Instrumentação para correlacionar métricas, traces e logs no Grafana.",
        ],
      },
      architecture: {
        intro: "Order e Notification usam Python; Payment e Inventory usam Node.js. Kafka transporta eventos, PostgreSQL persiste efeitos, e a telemetria chega a uma stack observável no Kubernetes local. O processamento é pelo menos uma vez; a deduplicação por event_id evita efeitos duplicados.",
        items: [
          "Pagamento aprovado e estoque reservado levam a CONFIRMED; pagamento recusado leva a FAILED.",
          "Estoque indisponível após aprovação solicita e confirma estorno antes de CANCELLED.",
          "A ordem observada no fluxo normal vale por tópico e partição; replay e estacionamento não preservam a posição original.",
        ],
      },
      data: {
        intro: "O estado do pedido e os efeitos dos consumidores são persistidos em PostgreSQL. Payment grava decisão, marcador de processamento e outbox na mesma transação. event_id permite reconhecer redelivery sem repetir o efeito.",
        items: [
          "O harness força falha entre commit e offset para verificar redelivery com um efeito por event_id.",
          "Na recuperação de Inventory, a verificação exige uma reserva e um evento terminal.",
          "IDs, credenciais e evidências brutas ficam em .local/, fora do Git; os dados são sintéticos.",
        ],
      },
      decisions: {
        intro: "O laboratório privilegia falhas observáveis e ensaios reproduzíveis. Outbox e deduplicação atendem à entrega pelo menos uma vez; o painel não substitui a prova dos efeitos persistidos.",
        items: [
          "Relays com claim transacional em PostgreSQL foram testados com dois claimers. ACK antes de commit ainda pode republicar; deduplicação continua necessária.",
          "KEDA e HPAs são optativos. Um ensaio controlado atribuiu a escala de Payment ao lag Kafka, sem alegar alta disponibilidade.",
          "Alertas são experimentais; um ensaio observou o alerta de Payment disparar e desaparecer após restauração.",
        ],
      },
      implementation: {
        intro: "O README oferece um percurso executável em PowerShell: instalar ferramentas, subir o perfil minikube dedicado, conferir status e contratos, executar os três cenários e testar recuperação. O runbook mostra como abrir Grafana por port-forward.",
        items: [
          "Comandos centrais: ./scripts/mvp.ps1 up, status, contract, demo e recovery, nesta ordem.",
          "check.ps1 cobre builds, lint, tipos, testes, imagens, auditorias, segredos, manifests e regras Prometheus; a CI pública passou no commit 5d3267e.",
          "O perfil observa-spike0 é local e dedicado; o README documenta pré-requisitos e sua remoção.",
        ],
      },
      product: {
        intro: "O avaliador começa pelos estados finais da demo e continua no dashboard observa-mvp. Um exemplar recente abre a trace no Tempo; Related logs mostra registros no Loki; View trace retorna à mesma execução.",
        items: [
          "O dashboard apresenta eventos, erros, duração e efeitos de negócio, além de exemplars.",
          "O runbook permite reproduzir status e demo sem passos manuais adicionais no fluxo de domínio.",
          "A navegação Grafana exige inspeção visual; a síntese textual não certifica os cliques da interface.",
        ],
      },
      results: {
        intro: "A síntese pública do MVP registra os três estados concluídos. A recuperação registrou pedido CONFIRMED após recriação de Inventory com uma reserva. A validação pós-MVP acrescenta ensaios de relays, escala, alerta e falhas locais.",
        items: [
          "Um baseline local posterior concluiu 30/30 pedidos sequenciais; os p95 observados por cenário foram 2,309 s, 1,129 s e 2,228 s.",
          "No checkout limpo, a inspeção percorreu exemplar, trace de quatro serviços com 21 spans, 10 logs do mesmo trace_id e retorno à trace.",
          "São observações locais com dados sintéticos, não percentis de produção nem SLO aprovado.",
        ],
      },
      retro: {
        intro: "O projeto demonstra diagnóstico e recuperação em condições controladas. Um nó, um broker e dados sintéticos delimitam a conclusão: recriar pods demonstra recuperação eventual, não continuidade durante uma falha nem alta disponibilidade.",
        items: [
          "Replay, estacionamento e concorrência têm limites de ordenação documentados.",
          "A hipótese experimental de 95% dos pedidos em até 5 s não foi adotada como SLO.",
          "Qualquer afirmação sobre produção exigiria ambiente e carga representativos.",
        ],
      },
    },
    en: {
      context: {
        intro: "Observa is a local lab for diagnosing and recovering a distributed order journey. Four services exchange domain events; orders, payments, and stock are synthetic. The goal is to make the path from a business state to its trace and related logs visible.",
        items: [
          "Three demonstrable outcomes: CONFIRMED, FAILED, and CANCELLED; the CANCELLED path includes payment compensation.",
          "The demo runs on local Kubernetes, with no charging, external notification, or required cloud service.",
          "OrderFlow was a read-only functional reference; Observa is a separate project.",
        ],
      },
      role: {
        intro: "The repository presents services, contracts, infrastructure, verification scripts, and runbooks as the project's engineering work. Public evidence supports reviewing behavior and decisions without attributing outcomes to an external commercial operation.",
        items: [
          "Event flow and contracts for Order, Payment, Inventory, and Notification.",
          "Outbox, deduplication, and recovery tested with disposable PostgreSQL and in the local cluster.",
          "Instrumentation correlating metrics, traces, and logs in Grafana.",
        ],
      },
      architecture: {
        intro: "Order and Notification use Python; Payment and Inventory use Node.js. Kafka transports events, PostgreSQL persists effects, and telemetry reaches an observable stack on local Kubernetes. Processing is at least once; event_id deduplication prevents duplicate effects.",
        items: [
          "Approved payment and reserved stock lead to CONFIRMED; rejected payment leads to FAILED.",
          "Unavailable stock after approval requests and confirms a refund before CANCELLED.",
          "Normal-path observed ordering is scoped to topic and partition; replay and parking do not preserve the original position.",
        ],
      },
      data: {
        intro: "Order state and consumer effects are persisted in PostgreSQL. Payment writes its decision, processing marker, and outbox in one transaction. event_id identifies redelivery without repeating the effect.",
        items: [
          "The harness forces a failure between commit and offset to verify redelivery with one effect per event_id.",
          "After recreating Inventory, recovery verification requires one reservation and one terminal event.",
          "IDs, credentials, and raw evidence are kept under .local/, outside Git; data is synthetic.",
        ],
      },
      decisions: {
        intro: "The lab favors observable failures and reproducible experiments. Outbox and deduplication support at-least-once delivery; the dashboard alone does not prove persisted effects.",
        items: [
          "Transactional PostgreSQL claims in relays were tested with two claimers. ACK before commit can still republish; deduplication remains necessary.",
          "KEDA and HPAs are optional. A controlled test attributed Payment scaling to Kafka lag without claiming high availability.",
          "Alerts are experimental; one test observed the Payment alert firing and clearing after recovery.",
        ],
      },
      implementation: {
        intro: "The README gives an executable PowerShell path: install tools, start the dedicated minikube profile, check status and contracts, run all three scenarios, and test recovery. The runbook shows how to open Grafana through port-forward.",
        items: [
          "Core commands: ./scripts/mvp.ps1 up, status, contract, demo, and recovery, in that order.",
          "check.ps1 covers builds, lint, types, tests, images, audits, secrets, manifests, and Prometheus rules; public CI passed at commit 5d3267e.",
          "The observa-spike0 profile is local and dedicated; the README documents prerequisites and removal.",
        ],
      },
      product: {
        intro: "The evaluator starts with the demo's final states and continues in the observa-mvp dashboard. A recent exemplar opens a Tempo trace; Related logs shows Loki records; View trace returns to the same execution.",
        items: [
          "The dashboard displays events, errors, duration, and business effects, with exemplars.",
          "The runbook supports reproducing status and demo without extra manual steps in the domain flow.",
          "Grafana navigation requires visual inspection; the written summary alone does not certify UI clicks.",
        ],
      },
      results: {
        intro: "The public MVP summary records all three completed states. Recovery recorded a CONFIRMED order after Inventory was recreated with one reservation. Post-MVP validation adds relay, scaling, alert, and local failure experiments.",
        items: [
          "A later local baseline completed 30/30 sequential orders; observed p95 values by scenario were 2.309 s, 1.129 s, and 2.228 s.",
          "In a clean checkout, the inspection followed an exemplar to a four-service, 21-span trace, 10 logs with the same trace_id, then back to that trace.",
          "These are local observations with synthetic data, not production percentiles or an approved SLO.",
        ],
      },
      retro: {
        intro: "The project demonstrates diagnosis and recovery under controlled conditions. One node, one broker, and synthetic data limit the conclusion: recreating pods demonstrates eventual recovery, not continuity through an outage or high availability.",
        items: [
          "Replay, parking, and concurrency have documented ordering limits.",
          "The experimental hypothesis of 95% of orders within 5 s was not adopted as an SLO.",
          "Production claims would require representative environments and loads.",
        ],
      },
    },
  },
};

export const shorts: Partial<Record<SystemId, Record<Locale, string>>> = {
  pipeline: {
    pt: "Pedido de e-commerce por coreografia. POST 202; correlation_id é o order_id. Python lidera; NestJS é evidência de apoio. Compensação quando o estoque falta depois do pagamento. Evidence repo: order-flow.",
    en: "E-commerce order by choreography. POST 202; correlation_id is order_id. Python leads; NestJS is supporting evidence. Compensation when stock fails after payment. Evidence repo: order-flow.",
  },
  shortener: {
    pt: "GET do link curto consulta Redis e, em cache miss, busca no PostgreSQL antes de devolver 302. Analytics segue em Redis Stream. O repositório também inclui um painel web.",
    en: "A short-link GET checks Redis and falls back to PostgreSQL on a cache miss before returning 302. Analytics follows on a Redis Stream. The repository also includes a web dashboard.",
  },
  promptvault: {
    pt: "Nota de laboratório: tratar prompt como artefato com versão, autor e contrato de entrada. Sem produto público neste lançamento.",
    en: "Lab note: treat a prompt as an artifact with version, author, and input contract. No public product in this launch.",
  },
};
