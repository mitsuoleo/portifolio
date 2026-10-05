import { expect, test } from "@playwright/test";

test("index states the role and features Observa", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Engenheiro");
  await expect(page.getByText(/Olá, eu sou Leonardo Mitsuo Fukuda/)).toBeVisible();
  await expect(page.getByRole("link", { name: /SYS\/001 Observa/ })).toBeVisible();
});

test("work filters by domain", async ({ page }) => {
  await page.goto("/trabalhos");
  await page.getByLabel("Domínio").selectOption("Systems Design");
  await expect(page.getByRole("link", { name: /SYS\/001/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /SYS\/004/ })).toBeHidden();
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

test("command center opens and jumps to work", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Comando/ }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("searchbox").fill("trabalhos sql");
  await dialog.getByRole("link", { name: /Work/ }).click();
  await expect(page).toHaveURL(/\/trabalhos/);
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
