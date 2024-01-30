# 2 Intro to Workers

## Goals

1. Write your first Cloudflare Worker
1. Deploy your Worker to Cloudflare's Developer Platform
1. Learn about the advancing capabilities of "The Edge"

## Instructions

**Make sure you're in the `./exercises/2-server-side-rendering` directory!**

1. Let's create our first Cloudflare Worker. Create a new file `./global-worker/index.tsx`, with the following contents:

   ```ts
   // ./global-worker/index.tsx
   export default {
   	async fetch(request, env) {
   		const url = new URL(request.url);

   		if (url.pathname === "/date") {
   			// If the request is for `/date`, return the current date
   			return new Response(new Date().toISOString());
   		}

   		// Otherwise, serve the static assets like normal
   		return env.ASSETS.fetch(request);
   	},
   } as ExportedHandler<{ ASSETS: Fetcher }>;
   ```

1. Add another build step in to build a Worker from this `./scripts/build.ts`:

   ```ts
   // ./scripts/build.ts

   // ...

   async function buildGlobalWorker() {
   	await build({
   		entryPoints: ["./global-worker/index.tsx"],
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
   			"process.env.NODE_ENV": JSON.stringify("development"),
   		},
   	});
   }

   // ...

   await copyStaticAssets();
   await buildClientSideRenderedReactApp();
   await buildGlobalWorker();
   ```

1. We should now be able to run `npm run dev` and navigate to [`http://localhost:8002/`](http://localhost:8002/). Nothing has changed with the React app because by default, we're falling through to serving static assets with `env.ASSETS.fetch(request)`, but if you instead navigate to [`http://localhost:8002/date`](http://localhost:8002/date), you should see the current date being returned by the server (our Cloudflare Worker). **If this isn't working, try restarting the `npm run dev` command, and if it's _still_ not working, raise your hand!**

1. Now, we're going to actually deploy this and make it available on the internet.

   First, run `npx wrangler pages project create rsc-workshop`. `rsc-workshop` will be the name of the project we're creating. When prompted for `? Enter the production branch name: › `, just hit Enter to use `main`.

   Next, add the following `deploy` and `predeploy` scripts to your `package.json`:

   ```json
   {
   	"...": "...",
   	"scripts": {
   		"build": "node --loader=tsm ./scripts/build.ts",
   		"build:watch": "npx nodemon --exec \"npm run build\"",
   		"predeploy": "npm run build",
   		"deploy": "npx wrangler pages deploy ./dist-global --project-name=rsc-workshop",
   		"dev": "npx concurrently \"npm:build:watch\" \"npm:start\"",
   		"prestart": "npm run build",
   		"start": "npx wrangler pages dev --port=8002 --no-bundle ./dist-global"
   	}
   }
   ```

   Finally, run `npm run deploy`. This should make your project available. The URL will be printed to your terminal. It might take a minute or two for the first deployment to become ready to serve traffic.

   Try visiting `/date` on your deployment to make sure the Worker is also working!
