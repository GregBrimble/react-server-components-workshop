import { build } from "esbuild";
import { cp } from "fs/promises";

async function buildGlobalWorker() {
	await build({
		entryPoints: ["./global-worker/index.tsx"],
		format: "esm",
		platform: "neutral",
		mainFields: ["workerd", "module", "main", "browser"],
		conditions: [
			"workerd", // The Cloudflare Workers runtime is called 'workerd'
			"browser",
		],
		bundle: true,
		outdir: "./dist-global/_worker.js",
		define: {
			"process.env.NODE_ENV": JSON.stringify("development"),
		},
	});
}

async function buildClientSideRenderedReactApp() {
	await build({
		entryPoints: ["./src/index.tsx"],
		bundle: true,
		outdir: "./dist-global",
	});
}

async function copyStaticAssets() {
	await cp("./public", "./dist-global", { recursive: true });
}

await copyStaticAssets();
await buildClientSideRenderedReactApp();
await buildGlobalWorker();
