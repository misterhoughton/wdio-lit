import { config as defaultConfig } from "./wdio.conf";

const webPort = 8080;
export const config = defaultConfig;
config.runner = "local";
config.specs = ["./src/**/*.e2e.ts"];
config.baseUrl = `http://localhost:${webPort}/`;
config.services = [
  [
    "static-server",
    {
      folders: [{ mount: "/", path: "./dist" }],
      port: webPort,
    },
  ],
];
