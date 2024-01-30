import { build } from "esbuild";
import { cp } from "fs/promises";

async function buildClientSideRenderedReactApp() {
	await build({
		platform: "browser",
		format: "esm",
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
