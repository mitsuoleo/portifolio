import { expect, test } from "@playwright/test";

test("index leads with Mercado One and keeps the other projects", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Engenheiro");
  await expect(page.getByText(/Olá, eu sou Leonardo Mitsuo Fukuda/)).toBeVisible();
  await expect(page.locator(".home-systems .system-row").first()).toContainText("Mercado One");
  await expect(page.locator(".status-block")).toContainText("Mercado One");
  await expect(page.getByRole("link", { name: /Observa/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Encurtador/ })).toBeVisible();
  await expect(page.locator(".code-rain li")).toHaveCount(8);
  const lines = await page.locator(".code-rain li").allTextContents();
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

test("hero light is subtle and resets when the pointer leaves", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator("[data-glow]");
  const box = await hero.boundingBox();
  expect(box).not.toBeNull();
  if (!box) return;

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await expect(hero).toHaveCSS("--glow-opacity", "1");
  await expect(hero).toHaveCSS("border-top-width", "0px");
  await expect(hero).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await page.mouse.move(box.x + 2, box.y + box.height / 2);
  const edgeOpacity = Number(await hero.evaluate((element) => element.style.getPropertyValue("--glow-opacity")));
  expect(edgeOpacity).toBeLessThan(0.1);
  await page.mouse.move(0, 0);
  await expect(hero).toHaveCSS("--glow-opacity", "0");
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
