export const config: WebdriverIO.Config = {
  maxInstances: 10,
  capabilities: [
    {
      browserName: "chrome",
      acceptInsecureCerts: true,
      "goog:chromeOptions": {
        args: process.env.CI ? ["headless", "disable-gpu"] : [],
      },
    },
  ],
  logLevel: "info",
  outputDir: "./logs",
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: "mocha",
  reporters: ["dot", "concise", ["timeline", { outputDir: "./logs" }]],
  mochaOpts: {
    ui: "bdd",
    timeout: 6000000,
  },
};
