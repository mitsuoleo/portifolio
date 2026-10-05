import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  use: {
    baseURL: "http://127.0.0.1:4333",
  },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 4333",
    url: "http://127.0.0.1:4333",
    reuseExistingServer: false,
    timeout: 120000,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
