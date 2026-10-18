import { defineConfig, devices } from '@playwright/test';

const PORT = 3100;

/** Smoke tests against a production build: run `pnpm build` first */
export default defineConfig({
    testDir: 'tests',
    forbidOnly: Boolean(process.env.CI),
    retries: process.env.CI ? 1 : 0,
    reporter: process.env.CI ? 'github' : 'list',
    use: {
        baseURL: `http://localhost:${PORT}`,
        trace: 'retain-on-failure',
    },
    projects: [
        { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
        { name: 'phone', use: { ...devices['Pixel 7'] } },
    ],
    webServer: {
        command: `pnpm start -p ${PORT}`,
        url: `http://localhost:${PORT}`,
        reuseExistingServer: !process.env.CI,
    },
});
