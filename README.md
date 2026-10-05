# Portfolio — Systems Lab

Site estático (Astro) de [Leonardo Mitsuo Fukuda](https://github.com/mitsuoleo). Português é o padrão; inglês vive em `/en`. Glossário em [`CONTEXT.md`](./CONTEXT.md). Decisões em [`docs/adr`](./docs/adr).

O sistema principal agora é o [Observa](https://github.com/mitsuoleo/observa), com repositório público e clonável. Esta substituição das páginas planejadas de Commerce Intelligence e Catálogo está registrada na [ADR 0021](./docs/adr/0021-observa-is-anchor.md). Este repo contém somente o site.

## Local

```bash
npm install
npm run dev
```

- Index: http://localhost:4321/
- Work: http://localhost:4321/trabalhos
- Inglês: http://localhost:4321/en/

`Ctrl/Cmd+K` abre o Command Center. O conteúdo essencial também está na navegação visível.

## Testes

```bash
npx playwright install chromium
npm test
```

## Contato e CV

O currículo em PDF está em `public/cv.pdf` e é servido em `/cv.pdf`. Os links de contato e o caminho do PDF ficam em `src/config.ts`.

## Cloudflare Pages

Build: `npm run build`. Output: `dist`. Presets: Astro.
