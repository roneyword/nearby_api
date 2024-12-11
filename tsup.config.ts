import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  outDir: "build",
  target: "node16",
  format: ["cjs"],
  splitting: false,
  clean: true,
});
