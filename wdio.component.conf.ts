import { TimelineService } from "wdio-timeline-reporter/timeline-service";

import { config as defaultConfig } from "./wdio.conf";

export const config = defaultConfig;
config.runner = "browser";
config.specs = ["./src/**/*.test.ts"];
config.filesToWatch = ["./src/**/*.test.ts"];
