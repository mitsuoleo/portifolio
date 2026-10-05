import type { Locale } from "../config";
import type { SystemId } from "./systems";

export type StudyBlock = {
  intro: string;
  items?: string[];
};

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
  "commerce-intelligence": {
    pt: {
      context: {
        intro:
          "Times de comércio acumulam eventos de pedido, estoque e preço em arquivos e planilhas que não compartilham identidade. A pergunta “o que vendeu, com que margem, em que estado de estoque?” atravessa três sistemas e ninguém consegue reproduzir o mesmo número duas vezes. O objetivo mensurável do v1 é: um job de ingestão idempotente, um modelo analítico com chaves estáveis, e uma API de leitura cujo contrato um analista consegue citar.",
        items: [
          "Usuários: operador de dados e um serviço consumidor da API de leitura — não um shopper.",
          "Restrição: sem checkout neste sistema. O comércio existe como evento já ocorrido.",
          "Restrição: sem métricas de negócio inventadas neste portfólio enquanto o repositório de evidência não for público.",
        ],
      },
      role: {
        intro:
          "Papel individual: arquitetura, modelo, API, jobs e o ambiente que sobe o conjunto. Não há equipe nomeada. O que está no estudo é o que o autor desenhou e pretende provar no repositório de evidência.",
        items: [
          "Contratos de ingestão (schema, chave de idempotência, rejeição explícita).",
          "Tabelas analíticas e views de leitura.",
          "FastAPI como fronteira: queries parametrizadas, sem SQL solto no cliente.",
          "Docker Compose como a forma de reproduzir o laboratório.",
        ],
      },
      architecture: {
        intro:
          "Três limites: Ingest (aceita eventos, grava raw + rejeita o que quebra o contrato), Warehouse (normaliza para fatos e dimensões), Serve (API de leitura, sem escrever no modelo analítico). O fluxo é unidirecional. Serve não chama Ingest. Nenhuma camada conhece um empregador ou um canal de venda específico.",
        items: [
          "Ingest: POST de lote com event_id; duplicata devolve o mesmo resultado.",
          "Warehouse: job que lê raw committed e materializa fatos; reruns são seguros.",
          "Serve: GET por período, produto e canal; 4xx quando o recorte é inválido.",
          "Dependências: PostgreSQL único no v1, filas internas via tabela de outbox — sem broker até o volume exigir.",
        ],
      },
      data: {
        intro:
          "Identidade não se dissolve no nome da prateleira. Produto e variante são dimensões; venda e movimento de estoque são fatos. Canal é dimensão, não coluna livre.",
        items: [
          "dim_product / dim_variant: chave estável, nome é atributo.",
          "fact_sale: quantidade, receita bruta, desconto; liga variante, canal, dia.",
          "fact_stock_move: receive e adjust apenas — o catálogo operacional vive noutro sistema.",
          "Transformação relevante: raw JSONB → fatos com CHECK de quantidade não negativa na venda; ajuste de estoque pode ser negativo, venda não.",
        ],
      },
      decisions: {
        intro:
          "As decisões abaixo são o contrato do que o repositório terá de defender. Alternativas recusadas estão escritas para não parecerem esquecimento.",
        items: [
          "PostgreSQL analítico no v1 em vez de um warehouse separado — um processo, um backup, SQL que o mesmo engenheiro audita. Custo: misturar raw e fato no mesmo cluster exige schemas rígidos (raw, dw, serve).",
          "Jobs idempotentes com event_id em vez de “apagar e recarregar o dia” — recarga total é mais simples e esconde buracos. Custo: precisa de chave natural confiável na origem.",
          "API de leitura sem GraphQL no v1 — o consumidor é conhecido e o contrato cabe em recursos REST. Custo: recortes novos viram endpoints, não um grafo.",
          "Sem métrica de “lift” neste texto: o resultado visível hoje é a arquitetura e o critério de aceite, não um percentual de negócio.",
        ],
      },
      implementation: {
        intro:
          "A implementação vive no repositório de evidência. Este estudo descreve o que aquele git precisa exibir para contar como prova.",
        items: [
          "Contrato: POST /ingest/events com event_id, occurred_at, type, payload; 409/200 idempotente conforme a mesma carga.",
          "GET /metrics/sales?from&to&variant_id — resposta com janela e hash do recorte, para o cliente detectar drift.",
          "Testes: duplicata de evento não duplica fato; venda com quantidade negativa é rejeitada na ingestão.",
          "Observabilidade: request_id na API; job emite linha de log com batch_id e counts accepted/rejected.",
          "Deploy: docker compose up — API, Postgres, worker. README no evidence repo é a fonte, não esta página.",
        ],
      },
      product: {
        intro:
          "Não há loja. A experiência é a de um operador de dados: enviar um lote, ver rejeições, consultar um recorte. Estados vazios e de erro fazem parte do contrato.",
        items: [
          "Vazio: recorte sem fatos devolve lista vazia, não um 404 disfarçado de “sem dados”.",
          "Erro de contrato: campo ausente devolve 422 com o nome do campo — não um 500 genérico.",
          "Loading: job de materialização expõe status running/idle; a API de leitura não espera o job.",
          "A UI, se existir no evidence repo, é operacional. Screenshots entram quando o repositório for público.",
        ],
      },
      results: {
        intro:
          "Enquanto o repositório de evidência não for clonável, este estudo é o contrato, não o atestado. Não há percentual de conversão nem tempo de query de produção para citar.",
        items: [
          "Requisito de v1: ingestão idempotente demonstrável por teste.",
          "Requisito de v1: fatos só nascem de raw committed.",
          "Ganho técnico esperado: um número de vendas reproduzível a partir do mesmo recorte.",
          "Limitação conhecida: um único Postgres; sem partição; sem PII de cliente no modelo.",
        ],
      },
      retro: {
        intro:
          "O que o v1 ainda não é: um produto de BI, um substituto de catálogo operacional, nem um case com métrica de empregador. O próximo passo é publicar o evidence repo e substituir este contrato por comandos que um revisor consegue rodar.",
        items: [
          "Faria de novo: schemas separados raw/dw/serve no mesmo cluster.",
          "Faria diferente: definir o event_id com a origem antes de escrever o job — a idempotência nasce ou morre aí.",
          "Próximo: testes de carga modestos no compose, não um cluster que esta página não hospeda.",
        ],
      },
    },
    en: {
      context: {
        intro:
          "Commerce teams collect order, stock, and price events in files and spreadsheets that do not share identity. “What sold, at what margin, in what stock state?” crosses three systems, and nobody can reproduce the same number twice. The v1 bar is: an idempotent ingest job, an analytical model with stable keys, and a read API whose contract an analyst can cite.",
        items: [
          "Users: a data operator and a consumer of the read API — not a shopper.",
          "Constraint: no checkout in this system. Commerce exists as events that already happened.",
          "Constraint: no invented business metrics on this portfolio while the evidence repository is not public.",
        ],
      },
      role: {
        intro:
          "Individual role: architecture, model, API, jobs, and the environment that runs the set. No team is named. What this study claims is what the author designed and intends to prove in the evidence repository.",
        items: [
          "Ingest contracts (schema, idempotency key, explicit rejection).",
          "Analytical tables and read views.",
          "FastAPI as the boundary: parameterized queries, no ad-hoc SQL in the client.",
          "Docker Compose as the way to reproduce the lab.",
        ],
      },
      architecture: {
        intro:
          "Three boundaries: Ingest (accepts events, writes raw, rejects broken contracts), Warehouse (normalizes into facts and dimensions), Serve (read API, never writes the analytical model). Flow is one way. Serve does not call Ingest. No layer knows an employer or a specific sales channel.",
        items: [
          "Ingest: batch POST with event_id; a duplicate returns the same result.",
          "Warehouse: a job that reads committed raw and materializes facts; reruns are safe.",
          "Serve: GET by period, product, and channel; 4xx when the cut is invalid.",
          "Dependencies: a single PostgreSQL in v1, internal queues via an outbox table — no broker until volume demands it.",
        ],
      },
      data: {
        intro:
          "Identity does not dissolve into a shelf name. Product and variant are dimensions; sale and stock movement are facts. Channel is a dimension, not a free-text column.",
        items: [
          "dim_product / dim_variant: stable key; name is an attribute.",
          "fact_sale: quantity, gross revenue, discount; links variant, channel, day.",
          "fact_stock_move: receive and adjust only — the operational catalog lives in another system.",
          "Relevant transform: raw JSONB → facts with a CHECK that sale quantity is non-negative; stock adjust may be negative, sale may not.",
        ],
      },
      decisions: {
        intro:
          "The decisions below are the contract the repository must defend. Refused alternatives are written so they do not look like omissions.",
        items: [
          "Analytical PostgreSQL in v1 instead of a separate warehouse — one process, one backup, SQL the same engineer can audit. Cost: mixing raw and facts in one cluster needs rigid schemas (raw, dw, serve).",
          "Idempotent jobs with event_id instead of “wipe and reload the day” — full reload is simpler and hides holes. Cost: the source must have a trustworthy natural key.",
          "Read API without GraphQL in v1 — the consumer is known and the contract fits REST resources. Cost: new cuts become endpoints, not a graph.",
          "No “lift” metric in this text: the visible result today is architecture and acceptance criteria, not a business percentage.",
        ],
      },
      implementation: {
        intro:
          "Implementation lives in the evidence repository. This study states what that git must show to count as proof.",
        items: [
          "Contract: POST /ingest/events with event_id, occurred_at, type, payload; idempotent 409/200 for the same payload.",
          "GET /metrics/sales?from&to&variant_id — response includes window and a cut hash so a client can detect drift.",
          "Tests: a duplicate event does not duplicate a fact; a sale with negative quantity is rejected at ingest.",
          "Observability: request_id on the API; the job logs batch_id and accepted/rejected counts.",
          "Deploy: docker compose up — API, Postgres, worker. The evidence-repo README is the source, not this page.",
        ],
      },
      product: {
        intro:
          "There is no shop. The experience is a data operator’s: send a batch, see rejections, query a cut. Empty and error states are part of the contract.",
        items: [
          "Empty: a cut with no facts returns an empty list, not a 404 dressed as “no data”.",
          "Contract error: a missing field returns 422 with the field name — not a generic 500.",
          "Loading: the materialization job exposes running/idle; the read API does not wait for the job.",
          "Any UI in the evidence repo is operational. Screenshots land when that repository is public.",
        ],
      },
      results: {
        intro:
          "Until the evidence repository is cloneable, this study is the contract, not the certificate. There is no conversion percentage or production query time to cite.",
        items: [
          "v1 requirement: idempotent ingest demonstrable by test.",
          "v1 requirement: facts are born only from committed raw.",
          "Expected technical gain: a sales number reproducible from the same cut.",
          "Known limit: one Postgres; no partitioning; no customer PII in the model.",
        ],
      },
      retro: {
        intro:
          "What v1 is not: a BI product, a replacement for an operational catalog, or a case with an employer metric. Next: publish the evidence repo and replace this contract with commands a reviewer can run.",
        items: [
          "Would repeat: separate raw/dw/serve schemas on one cluster.",
          "Would change: lock event_id with the source before writing the job — idempotency lives or dies there.",
          "Next: modest load tests in compose, not a cluster this page does not host.",
        ],
      },
    },
  },
};

export const shorts: Partial<Record<SystemId, Record<Locale, string>>> = {
  catalog: {
    pt: "Catálogo operacional: produtos, variantes e saldo por receive/adjust. Sem pedido. Dois invariantes no v1: on-hand não negativo sob concorrência; identidade na variante. A SPA React existe para mostrar o invariante, não para vender a loja. O estudo editorial completo ficou para o SYS/001.",
    en: "Operational catalog: products, variants, and on-hand via receive/adjust. No orders. Two v1 invariants: non-negative on-hand under concurrency; identity on the variant. The React SPA exists to show the invariant, not to sell a shop. The full editorial study belongs to SYS/001.",
  },
  pipeline: {
    pt: "Pedido de e-commerce por coreografia. POST 202; correlation_id é o order_id. Python lidera; NestJS é evidência de apoio. Compensação quando o estoque falta depois do pagamento. Evidence repo: order-flow.",
    en: "E-commerce order by choreography. POST 202; correlation_id is order_id. Python leads; NestJS is supporting evidence. Compensation when stock fails after payment. Evidence repo: order-flow.",
  },
  shortener: {
    pt: "GET do link curto lê Redis e devolve 302. O banco não está no caminho do clique. Analytics segue em stream. UI do repositório, se houver, não faz parte do exhibit.",
    en: "A short-link GET reads Redis and returns 302. The database is not on the click path. Analytics follows on a stream. Any UI in the repo is not part of the exhibit.",
  },
  promptvault: {
    pt: "Nota de laboratório: tratar prompt como artefato com versão, autor e contrato de entrada. Sem produto público neste lançamento.",
    en: "Lab note: treat a prompt as an artifact with version, author, and input contract. No public product in this launch.",
  },
};
