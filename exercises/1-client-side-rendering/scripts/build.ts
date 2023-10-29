import { cp } from "fs/promises";

async function copyStaticAssets() {
	await cp("./public", "./dist-global", { recursive: true });
}

await copyStaticAssets();
