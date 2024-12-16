import { Parcel } from "@parcel/core";

let bundler = new Parcel({
  entries: "./src/index.html",
  defaultConfig: "@parcel/config-default",
  mode: "production",
  defaultTargetOptions: {
    shouldOptimize: true,
    sourceMaps: false,
    engines: {
      browsers: ["last 1 Chrome version"],
    },
  },
});

try {
  let { bundleGraph, buildTime } = await bundler.run();
  let bundles = bundleGraph.getBundles();
  console.log(`✨ Built ${bundles.length} bundles in ${buildTime}ms!`);
} catch (err) {
  console.log(err.diagnostics);
}
