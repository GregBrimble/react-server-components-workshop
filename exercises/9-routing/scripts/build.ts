import type { BuildResult } from "esbuild";
import { build } from "esbuild";
import { cp } from "fs/promises";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { defaultLoaderWithEsbuild, getLoader } from "../../../utils/esbuild.js";

import { load as regionLoader } from "../../../utils/loader/region.js";

import { CLOUDFLARE_WORKERS_SUBDOMAIN } from "../../../constants.js";

const MODULE_ROOT = resolve(fileURLToPath(import.meta.url), "../../src");

async function buildGlobalWorker() {
	const { metafile } = await build({
		entryPoints: ["./global-worker/index.tsx", "./src/**/*"],
		format: "esm",
		platform: "neutral",
		conditions: [
			"workerd", // The Cloudflare Workers runtime is called 'workerd'
			"browser",
		],
		mainFields: ["workerd", "module", "main", "browser"],
		bundle: true,
		splitting: true,
		metafile: true,
		outdir: "./dist-global/_worker.js",
		external: ["node:*"],
		define: {
			REGION_WORKER_URL: JSON.stringify(
				process.env.NODE_ENV === "production"
					? `http://region-worker.${CLOUDFLARE_WORKERS_SUBDOMAIN}/`
					: "http://localhost:9009/",
			),
			"process.env.NODE_ENV": JSON.stringify("development"),
		},
		outbase: "./global-worker",
	});
	console.log(metafile.outputs);
}

async function buildRegionWorker() {
	await build({
		entryPoints: ["./region-worker/index.tsx", "./src/**/*"],
		format: "esm",
		platform: "neutral",
		conditions: [
			"workerd", // The Cloudflare Workers runtime is called 'workerd'
			"react-server",
		],
		bundle: true,
		splitting: true,
		outdir: "./dist-region",
		external: ["node:*"],
		define: {
			"process.env.NODE_ENV": JSON.stringify("development"),
		},
		outbase: "./region-worker",
		plugins: [
			{
				name: "react-server-dom-esm-loader-region",
				async setup(build) {
					build.onLoad({ filter: /^.*$/ }, async (args) => {
						const buildResult = await build.esbuild.build({
							entryPoints: [args.path],
							write: false,
							metafile: true,
						});

						if (buildResult.errors.length > 0) {
							return {
								errors: buildResult.errors,
								warnings: buildResult.warnings,
							};
						}

						const watchFiles: string[] = [];
						const errors: BuildResult["errors"] = [];
						const warnings = buildResult.warnings;

						const regionLoaded = await regionLoader(
							args.path,
							{},
							defaultLoaderWithEsbuild({
								build,
								watchFiles,
								errors,
								warnings,
							}),
						);

						const loader = getLoader(args.path);

						if (typeof regionLoaded.source === "string") {
							regionLoaded.source = regionLoaded.source.replace(
								MODULE_ROOT,
								"/src",
							);
						}

						return {
							contents: regionLoaded.source,
							loader,
							errors,
							warnings,
							watchFiles,
						};
					});
				},
			},
		],
	});
}

async function buildClientSideRenderedReactApp() {
	await build({
		platform: "browser",
		format: "esm",
		entryPoints: ["./src/**/*"],
		outdir: "./dist-global/src",
	});
}

async function copyStaticAssets() {
	await cp("./public", "./dist-global", { recursive: true });
	await cp("../../react_nm", "./dist-global/react_nm", { recursive: true });
}

await copyStaticAssets();
await buildClientSideRenderedReactApp();
await buildGlobalWorker();
await buildRegionWorker();
