# Portfolio — Systems Lab

Site estático (Astro) de [Leonardo Mitsuo Fukuda](https://github.com/mitsuoleo). Português é o padrão; inglês vive em `/en`. Glossário em [`CONTEXT.md`](./CONTEXT.md). Decisões em [`docs/adr`](./docs/adr).

Não publique até o repositório de evidência de Commerce Intelligence existir e for clonável (ADR 0014). Este repo é só o site.

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

Edite `src/config.ts`: `email`, `linkedin`, e `cv` (`/cv.pdf` se você colocar o arquivo em `public/cv.pdf`). Campos vazios não aparecem — GitHub sempre aparece.

## Cloudflare Pages

Build: `npm run build`. Output: `dist`. Presets: Astro.
