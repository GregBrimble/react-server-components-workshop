# 5 RSC compiler

**This is the trickiest and longest exercise of this workshop. If you don't grasp everything that's happening here, do not panic! It's very much in the realm of "you should never have to think about this" if you only ever plan to _use_ frameworks rather than _create_ one for yourself.**

## Goals

1. Create a second Cloudflare Worker to handle RSC backend
1. Build a compiler for your app and produce three separate bundles: one for your RSC backend, one for your "global" SSR, and one for the browser
1. Create an esbuild plugin

## Instructions

**Make sure you're in the `./exercises/5-rsc-compiler` directory!**

1.  So far, we've presented server-side rendering and Server Components as somewhat intertwined concepts. This has actually been a small lie. Instead, we need to break out the Server Components piece of our application, out into its own separate "app". This clear distinction will allow us to produce two clearly defined bundles: one which can render our Server Components, and one which can render our Client Components.

    Let's start by making a new Cloudflare Worker. We'll call this one our `region-worker`, in contrast with the `global-worker` we already have:

    ```tsx
    // ./region-worker/index.tsx
    import React from "react";
    import { renderToReadableStream } from "react-server-dom-esm/server";
    import { App } from "../src/App.js";

    function renderApp() {
    	const root = React.createElement(App);
    	return renderToReadableStream(root, {
    		baseURL: "/src",
    		transform: (url) => url.replace(/\.(t|j)sx?/, ".js"),
    	});
    }

    export default {
    	async fetch(request) {
    		const readableStream = renderApp();
    		return new Response(readableStream);
    	},
    } as ExportedHandler;
    ```

    Kinda familiar, right? It looks a lot like `./global-worker/index.tsx` — it's clearly rendering our application — but now we're using some new package `react-server-dom-esm`. Rather than trying to explain that difference now, let's just push on with building our Worker and the differences will become clear shortly.

1.  Next, let's add to our build script, `./scripts/build.ts`:

    ```ts
    // ./scripts/build.ts
    import type { BuildResult } from "esbuild";
    import { build } from "esbuild";
		import { cp } from "fs/promises";
    import { resolve } from "path";
    import { fileURLToPath } from "url";
    import {
    	defaultLoaderWithEsbuild,
    	getLoader,
    } from "../../../utils/esbuild.js";

    import { load as regionLoader } from "../../../utils/loader/region.js";

    const MODULE_ROOT = resolve(fileURLToPath(import.meta.url), "../../src");

    // ...

    async function buildRegionWorker() {
    	await build({
    		entryPoints: ["./region-worker/index.tsx"],
    		format: "esm",
    		platform: "neutral",
    		conditions: [
    			"workerd", // The Cloudflare Workers runtime is called 'workerd'
    			"react-server",
    		],
    		bundle: true,
    		outdir: "./dist-region",
    		external: ["node:*"],
    		define: {
    			"process.env.NODE_ENV": JSON.stringify("development"),
    		},
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

    // ...

    await buildRegionWorker();
    ```

    Now that's a lot... What exactly are we doing here? Well, if you forget about the `plugins` bit, it's mostly just building a regular Worker like we did with `buildGlobalWorker()`. We're creating a new `./dist-region` folder for this output, we're marking `node:*` imports as "external" (i.e. telling esbuild to not try to bundle them), and we're also providing a `NODE_ENV` value up-front. The complex bit is this `react-server-dom-esm-loader-region` plugin.

    This plugin changes how we load our application files (see how we're using the `build.onLoad()` function?). We start by building the application with esbuild as normal, just to pick up any regular syntax errors or similar. We then defer to `regionLoader()`. There's a lot more happening here behind-the-scenes. `regionLoader()` will actually look to see when a file is marked with `"use client"` and `"use server"` and actually inject in code to alter our application. It's basically just creating the connective tissue (references) to allow our app to work across multiple instances.

    Finally, we just return that output, replacing the `MODULE_ROOT` with `/src` (otherwise it would contain a full system filepath which we probably don't want leaking out on the internet).

1.  Let's add running this Worker to our `package.json` scripts:

    ```json
    {
    	"...": "...",
    	"scripts": {
    		"build": "node --loader=tsm ./scripts/build.ts",
    		"build:watch": "npx nodemon --exec \"npm run build\"",
    		"predeploy": "npx cross-env NODE_ENV=production npm run build",
    		"deploy": "npm run deploy:region && npm run deploy:global",
    		"deploy:global": "npx wrangler pages deploy ./dist-global --project-name=rsc-workshop",
    		"deploy:region": "npx wrangler deploy -c wrangler-region.toml",
    		"dev": "npx concurrently \"npm:build:watch\" \"npm:start\"",
    		"prestart": "npm run build",
    		"start": "npx concurrently \"npm:start:global\" \"npm:start:region\"",
    		"start:global": "npx wrangler pages dev --port=8005 --no-bundle ./dist-global",
    		"start:region": "npx wrangler -c wrangler-region.toml dev --port=9005"
    	}
    }
    ```

    Here, we're just starting up our `region-worker` alongside our `global-worker` with the help of the `concurrently` package.

1.  You might notice we've referenced a `wrangler-region.toml` file in the earlier step. That doesn't exist yet, so let's create that now:

    ```toml
    # ./wrangler-region.toml

    name = "region-worker"
    main = "./dist-region/index.js"
    compatibility_date = "2023-11-09"
    compatibility_flags = ["nodejs_compat"]
    ```

    This lets Cloudflare know what we want to call the Worker, where we can find its code, and how we want to run it (with Node.js internals made available to it). We should now be in a place where we can run this `region-worker` and see what all this work has bought us.

1.  Run `npm run dev` and visit [`http://localhost:9005/`](http://localhost:9005/) this time, not _8005_! You should be greeted with a screen of, what looks like on first glance, gibberish. In fact, this is a streamed serialization of our React app. Try running `curl http://localhost:9005/` to see the delay in our Todos data!

1.  Take a breath! That was a lot! Next up, we've got to adapt our SSR to handle this new backend. Make the following changes to the `./global-worker/index.tsx` file:

    ```tsx
    // ./global-worker/index.tsx

    import { renderToReadableStream } from "react-dom/server";
    import { createFromFetch } from "react-server-dom-esm/client.browser";
    import { accepts } from "../../../utils/headers.js";

    // Injected in at build-time by esbuild
    declare const REGION_WORKER_URL: string;

    export default {
    	async fetch(request: Request, env) {
    		const url = new URL(request.url);

    		// If the request is for our app
    		if (url.pathname === "/") {
    			// Allowlist some headers
    			const contentType = request.headers.get("Content-Type");
    			const rscAction = request.headers.get("RSC-Action");

    			const headers = new Headers();

    			if (contentType) {
    				headers.set("Content-Type", contentType);
    			}
    			if (rscAction) {
    				headers.set("RSC-Action", rscAction);
    			}

    			// And forward the request to the region Worker
    			const dataResponsePromise = fetch(REGION_WORKER_URL, {
    				method: request.method,
    				headers,
    				body: request.body,
    			});

    			// If we're looking for HTML
    			const accept = request.headers.get("Accept");
    			if (accepts(accept, "text/html")) {
    				// Transform the region Worker response into HTML
    				const root = await createFromFetch(dataResponsePromise, {
    					moduleBaseURL: "/_.._/src",
    				});
    				return new Response(await renderToReadableStream(root), {
    					headers: { "Content-Type": "text/html" },
    				});
    			} else {
    				const rscResponse = await dataResponsePromise;
    				return new Response(rscResponse.body, {
    					headers: { "Content-Type": "text/x-component" },
    				});
    			}
    		}

    		// Otherwise, serve the static assets like normal
    		return env.ASSETS.fetch(request);
    	},
    } as ExportedHandler<{ ASSETS: Fetcher }>;
    ```

    And then our `./scripts/build.ts` file:

    ```ts
    // ./scripts/build.ts

    // ...

    async function buildGlobalWorker() {
    	await build({
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
    		outdir: "./dist-global/_worker.js",
    		define: {
    			REGION_WORKER_URL: JSON.stringify(
    				process.env.NODE_ENV === "production"
    					? `http://region-worker.${CLOUDFLARE_WORKERS_SUBDOMAIN}/`
    					: "http://localhost:9005/",
    			),
    			"process.env.NODE_ENV": JSON.stringify("development"),
    		},
    		outbase: "./global-worker",
    	});
    }

    // ...
    ```

    Here, we're still turning our app into HTML, but we're using the `region-worker` as the source of truth for what to render, rather than our application source code. This allows the `region-worker` to control our app's data loading.

1.  Finally, we've changed how our app is SSR'd, so we also need to make some changes to how the browser/client works too:

    ```ts
    // ./scripts/build.ts

    // ...

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

    // ...
    ```

    We're now transforming the entire `./src/` directory, and we're also copying in some React source code so we can directly import this on the client. This is a pretty naive implementation and not something you'd do in production, but I think we're probably just about at our wits end with esbuild now, so let's move on.

    Finally, let's tweak our `./src/App.tsx` and `./src/index.tsx` to support this new client configuration:

    ```tsx
    // ./src/App.tsx
    "use server";

    import { Suspense } from "react";
    import { BrowserReact } from "../../../utils/BrowserReact.js";
    import { Counter } from "./Counter.js";
    import { Todos } from "./Todos.js";

    export function App() {
    	return (
    		<html lang="en">
    			<head>
    				<meta charSet="utf-8" />
    				<meta
    					name="viewport"
    					content="width=device-width, initial-scale=1"
    				/>
    				<title>5 | RSC compiler</title>
    				<BrowserReact />
    			</head>
    			<body>
    				<div>
    					<p>"Hello, world!" from server-side rendered React!</p>
    					<img src="/react-summit.svg" width="128" />
    					<Counter />
    					<Suspense fallback={<p>Loading...</p>}>
    						{/* @ts-expect-error Async Server Component */}
    						<Todos />
    					</Suspense>
    				</div>
    				<script type="module" src="/src/index.js"></script>
    			</body>
    		</html>
    	);
    }
    ```

    ```tsx
    // ./src/index.tsx
    import { createElement, use } from "react";
    import ReactDOM from "react-dom/client";
    import { createFromFetch } from "react-server-dom-esm/client.browser";

    let data = createFromFetch(
    	fetch("/", {
    		headers: {
    			Accept: "text/x-component",
    		},
    	}),
    	{
    		moduleBaseURL: "/src",
    	},
    );

    function Shell({ data }: { data: Promise<unknown> }) {
    	return use(data);
    }

    ReactDOM.hydrateRoot(document, createElement(Shell, { data }));
    ```

    We've added in `<BrowserScripts />`, a small utility component responsible for loading the React code on the client, and we've changed our bootstrap `./src/index.tsx` to now use this `createFromFetch()` function in hydration. This is the final piece we needed to glue our application together across all three instances: the RSC backend (`region-worker`), the SSR global Worker (`global-worker`) and the client/browser. You should now be able to `npm run dev` and see the entire app running on [`http://localhost:8005/`](http://localhost:8005/).
