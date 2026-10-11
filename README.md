# Portfolio — Systems Lab

Site estático (Astro) de [Leonardo Mitsuo Fukuda](https://github.com/mitsuoleo). Português é o padrão; inglês vive em `/en`. Glossário em [`CONTEXT.md`](./CONTEXT.md). Decisões em [`docs/adr`](./docs/adr).

O projeto principal é o [Mercado One](https://github.com/Fatech-Ypiranga/Mercado-One-Java), um sistema para pequenos mercados ainda em desenvolvimento. Os quatro sistemas públicos têm o mesmo estudo em nove seções. O [Observa](https://github.com/mitsuoleo/observa) é o laboratório de pedidos distribuídos. A mudança de prioridade está registrada na [ADR 0022](./docs/adr/0022-mercado-one-leads-the-portfolio.md). Este repo contém somente o site.

## Local

```bash
npm install
npm run dev
```

- Index: http://localhost:4321/
- Work: http://localhost:4321/trabalhos
- Inglês: http://localhost:4321/en/

A navegação principal leva diretamente a Home, Work e Profile, com troca entre português e inglês.

## Testes

```bash
npx playwright install chromium
npm test
```

## Contato e CV

O currículo em PDF está em `public/cv.pdf` e é servido em `/cv.pdf`. Os links de contato e o caminho do PDF ficam em `src/config.ts`.

## Cloudflare Pages

Build: `npm run build`. Output: `dist`. Presets: Astro.
