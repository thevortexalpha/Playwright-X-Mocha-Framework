// @ts-check
const { defineConfig, devices } = require('@playwright/test');  

module.exports = defineConfig({
  testDir: './tests',
  retries: 1,
  workers: 5,
  timeout: 30 * 1000,
  expect:{ timeout: 5 * 1000},
  reporter: [
    ['html', {open: 'never'}],
    // ['line'],
    // ['allure-playwright']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    name: 'Google Chrome',
    channel: 'chrome',
    launchOptions: {
      args: [
        '--start-maximized'
      ],
    },
    headless: false,
    viewport:null,
    actionTimeout: 10 * 1000,
    navigationTimeout: 10 * 1000,
    screenshot: 'on',
    trace: 'on'
  },
});

