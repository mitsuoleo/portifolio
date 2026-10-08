import { expect, test } from "@playwright/test";

test("index leads with Mercado One and keeps the other projects", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Engenheiro");
  await expect(page.getByText(/Olá, eu sou Leonardo Mitsuo Fukuda/)).toBeVisible();
  await expect(page.locator(".home-systems .system-row").first()).toContainText("Mercado One");
  await expect(page.locator(".status-block")).toContainText("Mercado One");
  await expect(page.getByRole("link", { name: /Observa/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Encurtador/ })).toBeVisible();
  await expect(page.locator(".code-rain ul").first().locator("li")).toHaveCount(8);
  const lines = await page.locator(".code-rain ul").first().locator("li").allTextContents();
  expect(new Set(lines).size).toBe(lines.length);
  for (const technology of ["Java", "TypeScript", "JavaScript", "SQLite"]) {
    await expect(page.locator(".marquee .tags").first().getByText(technology, { exact: true })).toBeVisible();
  }
});

test("work filters by domain", async ({ page }) => {
  await page.goto("/trabalhos");
  await expect(page.locator("[data-work-list] .system-row").first()).toContainText("Mercado One");
  await page.getByLabel("Domínio").selectOption("Systems Design");
  await expect(page.getByRole("link", { name: /Observa/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Encurtador/ })).toBeHidden();
});

test("Mercado One has short pages in both languages and a public repository link", async ({ page }) => {
  await page.goto("/trabalhos/mercado-one");
  await expect(page.getByRole("heading", { level: 1, name: "Mercado One" })).toBeVisible();
  await expect(page.getByText(/PDV|ponto de venda/i).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Repositório de evidência" })).toHaveAttribute(
    "href",
    "https://github.com/Fatech-Ypiranga/Mercado-One-Java",
  );
  await page.getByRole("link", { name: "Versão em inglês" }).click();
  await expect(page).toHaveURL(/\/en\/work\/mercado-one/);
  await expect(page.getByRole("heading", { level: 1, name: "Mercado One" })).toBeVisible();
  await expect(page.getByText(/desktop POS|sync/i).first()).toBeVisible();
});

test("project codes and pulsing text lights are absent", async ({ page }) => {
  for (const path of ["/", "/trabalhos", "/trabalhos/mercado-one", "/perfil", "/curriculo", "/en/"]) {
    await page.goto(path);
    await expect(page.locator("body")).not.toContainText(/SYS\/\d+|SYS\/LAB/i);
  }
  await page.goto("/");
  const statusLight = await page.locator(".status-block > div:first-of-type p:first-child").evaluate(
    (element) => getComputedStyle(element, "::before").content,
  );
  const navLight = await page.locator('.nav a[aria-current="page"]').evaluate(
    (element) => getComputedStyle(element, "::before").content,
  );
  expect(statusLight).toBe("none");
  expect(navLight).toBe("none");
});

test("Observa study links to its public evidence", async ({ page }) => {
  await page.goto("/trabalhos/observa");
  await expect(page.getByRole("heading", { level: 1, name: "Observa" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /01 \/ Contexto/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /09 \/ Retrospectiva/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "Repositório de evidência" })).toHaveAttribute(
    "href",
    "https://github.com/mitsuoleo/observa",
  );
  await expect(page.getByRole("link", { name: "Documentação" })).toHaveAttribute(
    "href",
    "https://github.com/mitsuoleo/observa/blob/main/docs/portfolio/evidence-2026-09-26.md",
  );
});

test("navigation has no Lab or command palette", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Lab" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: /Comando/ })).toHaveCount(0);
  await page.keyboard.press("Control+k");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  expect((await page.request.get("/lab")).status()).toBe(404);
  expect((await page.request.get("/en/lab")).status()).toBe(404);
  expect((await page.request.get("/trabalhos/promptvault")).status()).toBe(404);
});

test("hero has no pointer light", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("[data-glow]")).toHaveCount(0);
  const hero = page.locator(".hero");
  await hero.hover();
  expect(await hero.evaluate(el => getComputedStyle(el, "::after").content)).toBe("none");
});

test("terminal scrolls continuously and respects reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const track = page.locator(".code-rain-track");
  const original = track.locator("ul").first();
  const duplicate = track.locator('ul[aria-hidden="true"]');
  expect(await duplicate.locator("li").allTextContents()).toEqual(await original.locator("li").allTextContents());
  await expect(track).toHaveCSS("animation-duration", "24s");
  const y = () => track.evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m42);
  const before = await y();
  await expect.poll(y).toBeLessThan(before - 1);
  const dimensions = () => page.locator(".code-rain").evaluate(el => ({
    height: el.clientHeight,
    row: el.querySelector("li")!.getBoundingClientRect().height,
  }));
  let size = await dimensions();
  expect(size.height).toBeCloseTo(size.row * 8, 0);
  await page.setViewportSize({ width: 390, height: 844 });
  size = await dimensions();
  expect(size.height).toBeCloseTo(size.row * 4, 0);
  await expect(original.locator("li")).toHaveCount(8);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(track).toHaveCSS("animation-name", "none");
  await expect(track).toHaveCSS("transform", "none");
  await expect(duplicate).toBeHidden();
  for (const row of await original.locator("li").all()) await expect(row).toBeVisible();
});

test("Portuguese labels, concrete descriptions, and readable technology tags", async ({ page }) => {
  for (const path of ["/", "/en/"]) {
    await page.goto(path);
    const descriptions = await page.locator(".lead-display, .area p, .system-description").allTextContents();
    for (const description of descriptions) expect(description.trim()).not.toMatch(/\.$/);
    for (const card of await page.locator(".home-systems .system-row").all()) {
      const technologies = (await card.getAttribute("data-tech"))!.split(",");
      expect(await card.locator(".system-tech li").allTextContents()).toEqual(technologies);
    }
    const sizes = await page.locator(".tech-tag").evaluateAll(elements => elements.map(el => ({
      size: parseFloat(getComputedStyle(el).fontSize), weight: getComputedStyle(el).fontWeight,
    })));
    expect(sizes.every(tag => tag.size >= 14 && Number(tag.weight) >= 600)).toBe(true);
    await expect(page.locator(".status-head")).toHaveCSS("font-weight", "600");
  }
  await page.goto("/");
  await expect(page.locator(".nav").getByRole("link", { name: "Trabalhos", exact: true })).toBeVisible();
  await expect(page.locator(".nav").getByRole("link", { name: "Perfil", exact: true })).toBeVisible();
  for (const path of ["/trabalhos/mercado-one", "/trabalhos/pipeline-de-pedidos", "/trabalhos/encurtador", "/en/work/mercado-one"]) {
    await page.goto(path);
    await expect(page.getByText(/Observa (tem um estudo|has a longer)/)).toHaveCount(0);
    await expect(page.getByRole("link", { name: /Índice de sistemas|System index/ })).toHaveCount(0);
    await expect(page.locator(".back")).toBeVisible();
    expect((await page.locator(".lead-display").textContent())!.trim()).not.toMatch(/\.$/);
    await expect(page.locator(".meta .tech-tag").first()).toBeVisible();
  }
});

test("home fits a narrow screen", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: /Mercado One/ })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
  await page.screenshot({ path: "test-results/home-mobile.png", fullPage: true });
});

test("language switch keeps the system", async ({ page }) => {
  await page.goto("/trabalhos/observa");
  await page.getByRole("link", { name: "Versão em inglês" }).click();
  await expect(page).toHaveURL(/\/en\/work\/observa/);
  await expect(page.getByRole("heading", { name: /01 \/ Context/ })).toBeVisible();
});

test("english nav reaches profile and contact", async ({ page }) => {
  await page.goto("/en/");
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Profile" }).click();
  await expect(page).toHaveURL(/\/en\/profile/);
  await page.goto("/en/contact");
  await expect(page.getByRole("heading", { name: "Contact" })).toBeVisible();
});

test("contact pages offer email and LinkedIn in both languages", async ({ page }) => {
  for (const path of ["/contato", "/en/contact"]) {
    await page.goto(path);
    const actions = page.getByRole("navigation", { name: /conversa|conversation/i });
    await expect(actions.getByRole("link", { name: /e-mail|email/i })).toHaveAttribute(
      "href",
      "mailto:mitsuodeveloper@gmail.com",
    );
    await expect(actions.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/leonardofukuda/",
    );
  }
});

test("resume pages link to a real PDF", async ({ page, request }) => {
  for (const path of ["/curriculo", "/en/resume"]) {
    await page.goto(path);
    await expect(page.getByRole("link", { name: "CV (PDF)" }).first()).toHaveAttribute("href", "/cv.pdf");
  }

  const response = await request.get("/cv.pdf");
  expect(response.ok(), `${response.status()} ${response.url()}`).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("application/pdf");
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
});
