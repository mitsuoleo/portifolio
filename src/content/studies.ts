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
  mercadoone: {
    pt: {
      context: {
        intro: "Mercado One é um ERP em desenvolvimento para pequenos mercados: cadastro, estoque simples, venda presencial e relatório operacional. O caixa precisa registrar a venda mesmo quando a API não responde. O repositório ainda é um scaffold executável, não um MVP fechado.",
        items: [
          "Três aplicações: administrativo Angular, API Spring Boot e PDV JavaFX.",
          "A venda do caixa nasce no SQLite e só depois segue para a API.",
          "O PostgreSQL central sobe com Docker Compose. Não há fila de mensagens nem aplicativo móvel.",
        ],
      },
      role: {
        intro: "O repositório reúne API, administrativo, PDV, migrações e guias de uso como o trabalho do projeto. O estado publicado separa o que já executa do que continua no backlog.",
        items: [
          "Módulos de acesso, catálogo, clientes, fornecedores, estoque, vendas, offline e auditoria.",
          "Conflito de sincronização se resolve no administrativo, não na tela do caixa.",
          "A documentação de estado atual lista o que falta, entre eles cancelamento de venda e desconto.",
        ],
      },
      architecture: {
        intro: "O administrativo e o PDV falam com a mesma API. O PDV também guarda catálogo e fila de vendas no SQLite. A tela do caixa não chama POST /api/sales: toda finalização grava localmente e sincroniza por POST /api/offline/sales/sync.",
        items: [
          "O backend está em fatias: access, catalog, customer, inventory, sales, offline, supplier, audit e system.",
          "Na venda direta ao servidor, o preço é o vigente. No sync offline, divergência vira conflito.",
          "A documentação descreve um piloto de hospedagem. Este estudo não o trata como produção.",
        ],
      },
      data: {
        intro: "Flyway é a fonte do schema no PostgreSQL. O Hibernate valida esse schema e não o cria em runtime. O SQLite do PDV fica em ~/.mercado-one/pdv-offline.sqlite3 e guarda o catálogo local e a fila de vendas.",
        items: [
          "Venda local: PENDING, SENT, CONFLICT ou ERROR.",
          "Conflito no servidor: PENDING, ACCEPTED ou REJECTED. Aceitar ou rejeitar no admin não reescreve a linha do SQLite.",
          "Códigos de conflito incluem produto ausente, produto inativo, preço alterado, total de pagamento e estoque.",
        ],
      },
      decisions: {
        intro: "A venda local vem antes da rede, para o caixa não depender da API no momento do pagamento. O servidor continua dono do estoque e do preço vigente. Divergência vira conflito, em vez de sobrescrita silenciosa.",
        items: [
          "POST /api/sales existe e tem teste. Nenhum cliente da interface atual o dispara.",
          "O JWT do admin vai em cookie HttpOnly. O PDV usa Bearer. O token é conferido de novo no banco, para respeitar usuário inativado ou perfil alterado.",
          "A auditoria grava eventos imutáveis de venda, estoque, usuários e conflitos. Ainda não há consulta desses eventos, nem registro na alteração de produto.",
        ],
      },
      implementation: {
        intro: "O README descreve a subida local: copiar o .env, subir o PostgreSQL, rodar a API com Maven, o admin com npm start e o PDV com mvn javafx:run. A API exige MERCADO_ONE_JWT_SECRET e um usuário de desenvolvimento definido por variável de ambiente.",
        items: [
          "Verificações separadas: mvn test na API e no PDV, npm test no admin.",
          "A documentação registra 33 métodos de teste na API, 56 specs no admin e 8 métodos no PDV.",
          "Essa contagem está no texto do repositório. A última atualização dessa página avisa que a suíte não foi reexecutada ali.",
        ],
      },
      product: {
        intro: "O operador de caixa usa uma tela: busca de produto e de cliente, carrinho, um pagamento e um comprovante textual. O comprovante sai antes da resposta da API. O administrativo cobre cadastros, estoque, vendas, clientes, fornecedores e a fila de conflitos.",
        items: [
          "Perfis ADMIN, GERENTE, OPERADOR_CAIXA e ESTOQUISTA. O shell do admin não é a tela do operador de caixa.",
          "O cabeçalho do PDV permanece em OFFLINE_READY. O enum de status de sincronização existe, e a interface não o atualiza.",
          "Conflito aceito no admin baixa o estoque com o preço praticado no caixa. O PDV não recebe esse desfecho.",
        ],
      },
      results: {
        intro: "O que está demonstrável é o scaffold executável: cadastro, estoque simples, venda confirmada no servidor, fila offline e conflitos resolvíveis. Este estudo não publica medição de loja.",
        items: [
          "O relatório de vendas filtra por período, operador, cliente e status, e oferece CSV e produtos mais vendidos.",
          "No login, o PDV reenvia vendas PENDING e ERROR. CONFLICT não entra nesse reenvio.",
          "Cancelamento pós-venda, desconto, pagamento múltiplo na tela do caixa e entrada de estoque com vários itens no mesmo POST continuam fora desta versão.",
        ],
      },
      retro: {
        intro: "O desenho separa o que o caixa pode prometer do que o servidor confirma. O limite atual é o retorno: o admin resolve o conflito e o SQLite do PDV continua em CONFLICT.",
        items: [
          "O offline parcial não cadastra produto, não cancela venda e não emite documento fiscal.",
          "Módulos ainda se chamam por serviço e repositório. A fronteira desejada está documentada como alvo, não como o estado do código.",
          "Uso em loja dependeria do restante do MVP e de um ambiente que não seja o de desenvolvimento.",
        ],
      },
    },
    en: {
      context: {
        intro: "Mercado One is an in-progress ERP for small grocery stores: catalog, basic inventory, in-person sales, and operational reports. The POS has to record a sale even when the API does not answer. The repository is still an executable scaffold, not a finished MVP.",
        items: [
          "Three applications: an Angular admin, a Spring Boot API, and a JavaFX POS.",
          "A POS sale starts in SQLite and only then goes to the API.",
          "Central PostgreSQL starts with Docker Compose. There is no message queue and no mobile app.",
        ],
      },
      role: {
        intro: "The repository presents the API, admin, POS, migrations, and usage guides as the project's work. The published status separates what already runs from what is still on the backlog.",
        items: [
          "Modules for access, catalog, customers, suppliers, inventory, sales, offline sync, and audit.",
          "Sync conflicts are resolved in the admin, not on the POS screen.",
          "The current-status document lists what is missing, including sale cancellation and discounts.",
        ],
      },
      architecture: {
        intro: "The admin and the POS talk to the same API. The POS also keeps a catalog and a sales queue in SQLite. The POS screen does not call POST /api/sales: every checkout is stored locally and synced through POST /api/offline/sales/sync.",
        items: [
          "The backend is split into access, catalog, customer, inventory, sales, offline, supplier, audit, and system.",
          "A sale posted straight to the server uses the current price. An offline sync that diverges becomes a conflict.",
          "The docs describe a hosting pilot. This study does not treat that pilot as production.",
        ],
      },
      data: {
        intro: "Flyway owns the PostgreSQL schema. Hibernate validates that schema and does not create it at runtime. The POS SQLite file lives at ~/.mercado-one/pdv-offline.sqlite3 and holds the local catalog and the sales queue.",
        items: [
          "Local sale states: PENDING, SENT, CONFLICT, or ERROR.",
          "Server conflict states: PENDING, ACCEPTED, or REJECTED. Accepting or rejecting in the admin does not rewrite the SQLite row.",
          "Conflict codes include missing product, inactive product, changed price, payment total, and stock.",
        ],
      },
      decisions: {
        intro: "The local sale comes before the network, so checkout does not depend on the API at the moment of payment. The server still owns stock and the current price. Divergence becomes a conflict instead of a silent overwrite.",
        items: [
          "POST /api/sales exists and has a test. No current UI client calls it.",
          "The admin JWT travels in an HttpOnly cookie. The POS uses Bearer. The token is checked against the database again, so a deactivated user or a changed role still applies.",
          "Audit writes immutable events for sales, stock, users, and conflicts. There is no query for those events yet, and product edits are not recorded.",
        ],
      },
      implementation: {
        intro: "The README describes the local path: copy .env, start PostgreSQL, run the API with Maven, the admin with npm start, and the POS with mvn javafx:run. The API requires MERCADO_ONE_JWT_SECRET and a development user set by environment variable.",
        items: [
          "Checks are separate: mvn test for the API and the POS, npm test for the admin.",
          "The docs record 33 test methods in the API, 56 specs in the admin, and 8 test methods in the POS.",
          "That count lives in the repository text. The latest update of that page says the suite was not rerun there.",
        ],
      },
      product: {
        intro: "The cashier uses one screen: product and customer search, a cart, a single payment, and a text receipt. The receipt appears before the API responds. The admin covers records, stock, sales, customers, suppliers, and the conflict queue.",
        items: [
          "Roles are ADMIN, GERENTE, OPERADOR_CAIXA, and ESTOQUISTA. The admin shell is not the cashier's screen.",
          "The POS header stays on OFFLINE_READY. A sync-status enum exists, and the interface does not update it.",
          "A conflict accepted in the admin reduces stock at the price charged on the POS. The POS is not told the outcome.",
        ],
      },
      results: {
        intro: "What can be demonstrated is the executable scaffold: catalog, basic inventory, a server-confirmed sale, an offline queue, and resolvable conflicts. This study publishes no in-store measurement.",
        items: [
          "The sales report filters by period, operator, customer, and status, and offers CSV plus top products.",
          "On login, the POS resends PENDING and ERROR sales. CONFLICT is left out of that resend.",
          "Post-sale cancellation, discounts, multiple payments on the POS screen, and a multi-item stock receipt in one POST are still outside this version.",
        ],
      },
      retro: {
        intro: "The design separates what the POS can promise from what the server confirms. The current limit is the return path: the admin resolves the conflict and the POS SQLite row stays CONFLICT.",
        items: [
          "Partial offline mode does not register products, cancel sales, or issue a fiscal document.",
          "Modules still call each other through services and repositories. The intended boundary is documented as a target, not as the state of the code.",
          "Store use would depend on the rest of the MVP and on an environment other than development.",
        ],
      },
    },
  },
  pipeline: {
    pt: {
      context: {
        intro: "O pipeline de pedidos trata um checkout de e-commerce que não pode prender o cliente até pagamento e estoque terminarem. Quatro serviços avançam por eventos no RabbitMQ. Pagamento e estoque são simulados: o repositório mostra a coreografia, não uma loja.",
        items: [
          "O POST devolve 202 e status PENDING. O correlation_id de cada evento é o order_id.",
          "Três finais: CONFIRMED, FAILED e CANCELLED. CANCELLED inclui estorno depois de estoque indisponível.",
          "Nenhum serviço de domínio chama outro por HTTP.",
        ],
      },
      role: {
        intro: "Order e Notification estão em Python. Payment e Inventory estão em NestJS, como evidência de apoio. O repositório inclui a topologia do broker, testes por serviço e um ensaio de ponta a ponta opcional contra o Compose.",
        items: [
          "O caminho feliz, a recusa de pagamento e a falta de estoque são cenários explícitos no corpo do pedido.",
          "Logs estruturados carregam o correlation_id para seguir um pedido entre os serviços.",
          "A spec e as decisões ficam em docs/ no mesmo repositório.",
        ],
      },
      architecture: {
        intro: "O cliente cria o pedido no Order Service. O broker publica order.created. Payment responde approved ou rejected. Inventory responde reserved ou unavailable. Order fecha o estado e Notification registra um log.",
        items: [
          "A consistência é eventual. O POST não espera a confirmação de pagamento nem de estoque.",
          "Pagamento recusado encerra em FAILED. Estoque indisponível depois de um pagamento aprovado pede e confirma o estorno antes de CANCELLED.",
          "Mensagens que falham três vezes vão para a fila morta. O replay republica na fila de origem e zera o contador de tentativas.",
        ],
      },
      data: {
        intro: "O estado observável do pedido é o status e a timeline, consultáveis na API. Os logs saem em JSON com o mesmo correlation_id. O Compose publica o PostgreSQL no host.",
        items: [
          "Um produto de catálogo sem estoque está fixo no README para o cenário de compensação.",
          "A inspeção da fila morta passa por um endpoint administrativo do Order Service.",
          "Este estudo não republica o esquema das tabelas. A prova do fluxo é o status final e a timeline.",
        ],
      },
      decisions: {
        intro: "A coreografia fica no broker, sem um orquestrador no meio. Este repositório permanece em RabbitMQ. Kafka, Kubernetes e o painel de observabilidade ficaram para o Observa, o projeto seguinte.",
        items: [
          "/metrics expõe texto no formato Prometheus. Não há scrape nem Grafana aqui.",
          "A CI cobre pytest e jest. O ensaio ao vivo só roda se o Order Service já estiver no ar.",
          "O replay da fila morta exige um token administrativo de desenvolvimento. O valor de Compose não é um segredo de produção.",
        ],
      },
      implementation: {
        intro: "docker compose up --build sobe Order na porta 8000, Notification em 8001, Payment em 3001, Inventory em 3002 e o management do RabbitMQ em 15672.",
        items: [
          "Testes do Order usam pytest e Testcontainers, então pedem Docker.",
          "Payment e Inventory rodam npm test. Notification tem a própria suíte pytest.",
          "python -m pytest tests/e2e é o ensaio contra o Compose já iniciado, fora da CI.",
        ],
      },
      product: {
        intro: "Não há vitrine. Quem avalia cria o pedido com um bloco simulate: pagamento approve ou reject, estoque reserve, unavailable ou catalog. Depois consulta o pedido e a timeline até o estado final.",
        items: [
          "O caminho feliz pede pagamento aprovado e reserva de estoque.",
          "A falha de pagamento usa reject e encerra em FAILED.",
          "A compensação usa pagamento aprovado e estoque indisponível, até payment.refunded e CANCELLED.",
        ],
      },
      results: {
        intro: "Os três desfechos estão descritos com payloads e com um produto sem estoque no catálogo. O repositório não publica percentis deste fluxo.",
        items: [
          "GET /orders/{id} e GET /orders/{id}/timeline são a leitura do resultado.",
          "A fila morta pode ser listada e reprocessada pelo endpoint administrativo.",
          "O ensaio de ponta a ponta não faz parte do que a CI executa a cada push.",
        ],
      },
      retro: {
        intro: "O projeto mostra compensação e fila morta num ambiente local, com simulação declarada no pedido. Não mostra carga, loja nem pagamento real.",
        items: [
          "O replay devolve a mensagem à fila de origem. Ele não reconstrói a posição original no fluxo.",
          "Observa leva uma jornada parecida para Kafka, Kubernetes local e Grafana. Este repositório continua em RabbitMQ.",
          "Afirmar produção exigiria serviços de pagamento e estoque reais, e uma carga que este Compose não representa.",
        ],
      },
    },
    en: {
      context: {
        intro: "The order pipeline is an e-commerce checkout that cannot hold the client until payment and inventory finish. Four services move forward through RabbitMQ events. Payment and stock are simulated: the repository shows the choreography, not a store.",
        items: [
          "POST returns 202 and status PENDING. Every event's correlation_id is the order_id.",
          "Three endings: CONFIRMED, FAILED, and CANCELLED. CANCELLED includes a refund after unavailable stock.",
          "No domain service calls another over HTTP.",
        ],
      },
      role: {
        intro: "Order and Notification are Python. Payment and Inventory are NestJS, as supporting evidence. The repository includes the broker topology, per-service tests, and an optional end-to-end run against Compose.",
        items: [
          "The happy path, payment rejection, and missing stock are explicit scenarios in the order body.",
          "Structured logs carry correlation_id so one order can be followed across services.",
          "The spec and the decisions live under docs/ in the same repository.",
        ],
      },
      architecture: {
        intro: "The client creates the order in the Order Service. The broker publishes order.created. Payment answers approved or rejected. Inventory answers reserved or unavailable. Order closes the state and Notification writes a log.",
        items: [
          "Consistency is eventual. POST does not wait for payment or stock confirmation.",
          "Rejected payment ends in FAILED. Unavailable stock after an approved payment requests and confirms a refund before CANCELLED.",
          "Messages that fail three times go to the dead-letter queue. Replay republishes to the original queue and resets the attempt counter.",
        ],
      },
      data: {
        intro: "The observable order state is the status and the timeline, both readable from the API. Logs are JSON with the same correlation_id. Compose publishes PostgreSQL on the host.",
        items: [
          "A catalog product with no stock is fixed in the README for the compensation scenario.",
          "Dead-letter inspection goes through an admin endpoint on the Order Service.",
          "This study does not republish the table schema. The proof of the flow is the final status and the timeline.",
        ],
      },
      decisions: {
        intro: "Choreography stays in the broker, with no orchestrator in the middle. This repository stays on RabbitMQ. Kafka, Kubernetes, and the observability dashboard went to Observa, the following project.",
        items: [
          "/metrics exposes Prometheus text. There is no scrape and no Grafana here.",
          "CI covers pytest and jest. The live run only starts if the Order Service is already up.",
          "Dead-letter replay requires a development admin token. The Compose value is not a production secret.",
        ],
      },
      implementation: {
        intro: "docker compose up --build starts Order on port 8000, Notification on 8001, Payment on 3001, Inventory on 3002, and RabbitMQ management on 15672.",
        items: [
          "Order tests use pytest and Testcontainers, so they need Docker.",
          "Payment and Inventory run npm test. Notification has its own pytest suite.",
          "python -m pytest tests/e2e is the run against Compose already started, outside CI.",
        ],
      },
      product: {
        intro: "There is no storefront. A reviewer creates the order with a simulate block: payment approve or reject, stock reserve, unavailable, or catalog. Then they read the order and the timeline until the final state.",
        items: [
          "The happy path asks for approved payment and reserved stock.",
          "Payment failure uses reject and ends in FAILED.",
          "Compensation uses approved payment and unavailable stock, through payment.refunded and CANCELLED.",
        ],
      },
      results: {
        intro: "The three outcomes are described with payloads and with a catalog product that has no stock. The repository publishes no percentiles for this flow.",
        items: [
          "GET /orders/{id} and GET /orders/{id}/timeline are how the result is read.",
          "The dead-letter queue can be listed and replayed through the admin endpoint.",
          "The end-to-end run is not part of what CI executes on each push.",
        ],
      },
      retro: {
        intro: "The project shows compensation and a dead-letter queue in a local environment, with the simulation declared on the order. It does not show load, a store, or a real payment.",
        items: [
          "Replay returns the message to the original queue. It does not rebuild the message's original place in the flow.",
          "Observa takes a similar journey to Kafka, local Kubernetes, and Grafana. This repository stays on RabbitMQ.",
          "A production claim would need real payment and inventory services, and a load this Compose does not represent.",
        ],
      },
    },
  },
  shortener: {
    pt: {
      context: {
        intro: "Encurtar uma URL é um produto comum. O estudo é o caminho do clique: responder 302 sem esperar a gravação do acesso, e manter o PostgreSQL como fonte da verdade quando o Redis não tem o link.",
        items: [
          "O código curto é base62 de 7 caracteres, com nova tentativa se houver colisão. O alias é opcional.",
          "O redirect é público. A resposta é 410 quando o link expirou ou foi desativado.",
          "O repositório também tem um painel. As capturas usam dados ilustrativos, e o painel não é o objeto deste estudo.",
        ],
      },
      role: {
        intro: "A API em Go reúne criação de links, sessão JWT, cache, banco e o worker que persiste os cliques. As decisões estão em docs/adr no mesmo repositório.",
        items: [
          "O dono do link consulta total, visitantes únicos, série por dia, referrers e dispositivo.",
          "Há limite de taxa em criação, autenticação e redirect público.",
          "OpenAPI em /openapi.yaml é o contrato publicado.",
        ],
      },
      architecture: {
        intro: "O pedido de redirect chega ao Go. O caminho quente lê Redis. Se o link não está no cache, a leitura cai no PostgreSQL. O clique entra num Redis Stream com XADD e o handler devolve 302 sem esperar o worker.",
        items: [
          "Um consumer group lê o stream e persiste o acesso.",
          "O IP guardado é SHA-256 de um sal com o endereço, não o endereço em texto.",
          "Se o XADD falhar, o clique pode se perder. O redirect ainda acontece.",
        ],
      },
      data: {
        intro: "PostgreSQL guarda links, usuários e cliques. Redis guarda o cache do código e o stream de acessos. O Compose não publica as portas do banco nem do Redis no host.",
        items: [
          "Alias aceita letras, números e hífen, de 3 a 20 caracteres, sem hífen nas pontas nem hífen duplo.",
          "Código duplicado responde 409. Desativar é soft delete, e o redirect seguinte responde 410.",
          "O teste que usa PostgreSQL só roda com um banco isolado cujo nome termina em _test.",
        ],
      },
      decisions: {
        intro: "O cache fica na frente da leitura e o PostgreSQL continua a fonte da verdade. O analytics fica fora do handler do redirect, para a latência do 302 não incluir a gravação do clique.",
        items: [
          "Sair apaga o token no navegador. O servidor não revoga o JWT antes do expiry.",
          "Host privado literal é recusado na criação. Um nome que resolva para rede interna não é resolvido nesse momento.",
          "Grafana é opcional, num profile separado do Compose. O caminho do clique não depende dele.",
        ],
      },
      implementation: {
        intro: "No Windows, .\\make.ps1 up sobe o Compose. O equivalente é docker compose up --build -d. A interface abre em localhost:8080 e os arquivos dela vão embutidos no binário, sem CDN.",
        items: [
          "make.ps1 test e make.ps1 lint rodam Go pela imagem. make.ps1 smoke cobre health, registro, alias com hífen e redirect.",
          "Os testes de navegador usam Chrome e uma API simulada. Eles não substituem o smoke contra a API real.",
          "Na CI, go test e golangci-lint rodam a cada push, com o banco isolado provisionado antes.",
        ],
      },
      product: {
        intro: "Quem avalia cria uma conta, cola uma URL e copia o curto. No detalhe do link dá para editar destino, validade, desativar e ver os acessos. A troca de tema claro ou escuro segue o sistema na primeira visita.",
        items: [
          "Falha de rede na lista mantém o que já estava na tela e oferece nova tentativa.",
          "Link expirado precisa de nova validade antes de ser reativado.",
          "/health verifica a aplicação, o PostgreSQL e o Redis. /metrics exige token quando METRICS_TOKEN está definido.",
        ],
      },
      results: {
        intro: "Uma carga local de 19/09/2026, em Windows com Docker Desktop, cache quente, 50 clientes e sem seguir o 302, registrou cerca de 3215 redirects por segundo no hey, com p95 de 32,8 ms. O wrk na mesma janela ficou em cerca de 3152 por segundo. Os logs JSON por request estavam ligados.",
        items: [
          "São números de uma máquina local, não de produção.",
          "O smoke com a API no ar cobre health, registro, alias com hífen e redirect.",
          "O painel das capturas usa respostas ilustrativas. A síntese visual não certifica os cliques da interface.",
        ],
      },
      retro: {
        intro: "O desenho entrega o 302 cedo e aceita perder o clique se o stream falhar. A sessão continua válida até o JWT expirar, porque sair só limpa o navegador.",
        items: [
          "Os testes de browser com API simulada não medem o caminho Redis e PostgreSQL.",
          "A checagem de destino recusa host privado literal e não resolve, na criação, nomes que apontem para rede interna.",
          "Os percentis acima descrevem aquela execução local. Outra máquina, ou logs desligados, mudaria o número.",
        ],
      },
    },
    en: {
      context: {
        intro: "Shortening a URL is a common product. The study is the path of a click: return 302 without waiting to store the visit, and keep PostgreSQL as the source of truth when Redis does not have the link.",
        items: [
          "The short code is 7 characters of base62, with a retry on collision. An alias is optional.",
          "The redirect is public. The response is 410 when the link expired or was deactivated.",
          "The repository also has a dashboard. The screenshots use illustrative data, and the dashboard is not the subject of this study.",
        ],
      },
      role: {
        intro: "The Go API covers link creation, JWT sessions, cache, the database, and the worker that persists clicks. Decisions live in docs/adr in the same repository.",
        items: [
          "The link owner can read totals, unique visitors, a daily series, referrers, and device.",
          "Rate limits apply to creation, authentication, and the public redirect.",
          "OpenAPI at /openapi.yaml is the published contract.",
        ],
      },
      architecture: {
        intro: "A redirect request reaches Go. The hot path reads Redis. If the link is not cached, the read falls through to PostgreSQL. The click enters a Redis Stream with XADD, and the handler returns 302 without waiting for the worker.",
        items: [
          "A consumer group reads the stream and persists the visit.",
          "The stored IP is a SHA-256 of a salt plus the address, not the address in clear text.",
          "If XADD fails, the click can be lost. The redirect still happens.",
        ],
      },
      data: {
        intro: "PostgreSQL stores links, users, and clicks. Redis stores the code cache and the click stream. Compose does not publish the database or Redis ports on the host.",
        items: [
          "An alias allows letters, digits, and hyphens, 3 to 20 characters, with no leading, trailing, or doubled hyphen.",
          "A duplicate code returns 409. Deactivation is a soft delete, and the next redirect returns 410.",
          "The test that uses PostgreSQL runs only against an isolated database whose name ends in _test.",
        ],
      },
      decisions: {
        intro: "The cache sits in front of the read, and PostgreSQL remains the source of truth. Analytics stays outside the redirect handler, so 302 latency does not include writing the click.",
        items: [
          "Sign-out deletes the token in the browser. The server does not revoke the JWT before expiry.",
          "A literal private host is rejected on create. A name that resolves to an internal network is not resolved at that moment.",
          "Grafana is optional, on a separate Compose profile. The click path does not depend on it.",
        ],
      },
      implementation: {
        intro: "On Windows, .\\make.ps1 up starts Compose. The equivalent is docker compose up --build -d. The interface opens at localhost:8080, and its files are embedded in the binary, with no CDN.",
        items: [
          "make.ps1 test and make.ps1 lint run Go through the image. make.ps1 smoke covers health, registration, a hyphenated alias, and a redirect.",
          "Browser tests use Chrome and a simulated API. They do not replace smoke against the real API.",
          "In CI, go test and golangci-lint run on each push, with the isolated database provisioned first.",
        ],
      },
      product: {
        intro: "A reviewer creates an account, pastes a URL, and copies the short link. Link details can edit the target, the expiry, deactivation, and the visits. Light or dark theme follows the system on the first visit.",
        items: [
          "A network failure on the list keeps what was already on screen and offers a retry.",
          "An expired link needs a new expiry before it can be reactivated.",
          "/health checks the app, PostgreSQL, and Redis. /metrics requires a token when METRICS_TOKEN is set.",
        ],
      },
      results: {
        intro: "A local load on 19 Sep 2026, on Windows with Docker Desktop, a warm cache, 50 clients, and without following the 302, recorded about 3215 redirects per second in hey, with a p95 of 32.8 ms. wrk in the same window stayed around 3152 per second. Per-request JSON logs were on.",
        items: [
          "These are numbers from one local machine, not production.",
          "Smoke with the API up covers health, registration, a hyphenated alias, and a redirect.",
          "The dashboard in the screenshots uses illustrative responses. The written summary does not certify interface clicks.",
        ],
      },
      retro: {
        intro: "The design returns the 302 early and accepts losing the click if the stream fails. The session stays valid until the JWT expires, because sign-out only clears the browser.",
        items: [
          "Browser tests with a simulated API do not measure the Redis and PostgreSQL path.",
          "Target checks reject a literal private host and do not resolve, on create, names that point at an internal network.",
          "The percentiles above describe that local run. Another machine, or logs turned off, would change the number.",
        ],
      },
    },
  },
};

export const shorts: Partial<Record<SystemId, Record<Locale, string>>> = {
  promptvault: {
    pt: "Nota de laboratório: tratar prompt como artefato com versão, autor e contrato de entrada. Sem produto público neste lançamento",
    en: "Lab note: treat a prompt as an artifact with version, author, and input contract. No public product in this launch",
  },
};
