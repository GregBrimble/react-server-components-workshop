# 1 Client-side rendering

## Goals

1. Create a client-side rendered React application
1. Build a toolchain for building a client-side rendered React app
1. Understand how client-side rendering works

## Instructions

**Make sure you're in the `./exercises/1-client-side-rendering` directory!**

1.  Let's start by first making sure all our tooling is working correctly. Create a new file, `./public/index.html`, with the following content so we have something to serve the client:

    ```html
    <!-- ./public/index.html -->
    <html lang="en">
    	<head>
    		<meta charset="utf-8" />
    		<meta name="viewport" content="width=device-width, initial-scale=1" />
    		<title>1 | Client-side rendering</title>
    	</head>
    	<body>
    		<div>Hello, world!</div>
    	</body>
    </html>
    ```

1.  Run `npm run dev`. This will copy the contents of `./public/` into `./dist-global/` and start up a local web server.

    You may be asked `? Would you like to help improve Wrangler by sending usage metrics to Cloudflare? › (Y/n)`. Type in `Y` or `n` and hit Enter.

    Open [`http://localhost:8001/`](http://localhost:8001/) in your browser. You should be able to see the page we've created above. **If not, raise your hand and I'll come and help!**

1.  Now let's write some React! Create a `./src/App.tsx` file with want we to client-side render, and let's reference an image we already have in our `./public/` directory:

    ```tsx
    // ./src/App.tsx
    export function App() {
    	return (
    		<>
    			<p>"Hello, world!" from client-side rendered React!</p>
    			<img src="/react-summit.svg" width="128" />
    		</>
    	);
    }
    ```

1.  We now need to tell the client to actually render this to the page. `react-dom` is a library which acts as a bridge between `react` proper and a webpage (a DOM). It first needs a place in the DOM to actually hook into.

    Let's edit `./public/index.html`, replacing our "Hello, world!" message with a `div` element with some well-known ID. Let's also add in a `script` element which we'll use to load the client JavaScript bundle that we're going to produce in a moment.

    ```html
    <!-- ./public/index.html -->
    <html lang="en">
    	<head>
    		<title>1 | Client rendering</title>
    	</head>
    	<body>
    		<div id="root">
    			If you're seeing this, you might have JavaScript disabled!
    		</div>
    		<script src="/index.js"></script>
    	</body>
    </html>
    ```

1.  Now let's give that `div` element to `react-dom` so it can hydrate our React app. Create a `./src/index.tsx` file with the following:

    ```tsx
    // ./src/index.tsx
    import ReactDOM from "react-dom/client";
    import { App } from "./App.js";

    const rootElement = document.getElementById("root");
    if (!rootElement) {
    	alert(
    		"Make sure you've added a <div id='root'>...</div> to your `./public/index.html` file!",
    	);
    }

    if (rootElement) {
    	ReactDOM.hydrateRoot(rootElement, <App />);
    }
    ```

1.  Finally, we now just need to produce a JavaScript bundle from our code in `./src/`. We're going to use [esbuild](https://esbuild.github.io/) for this. Take a look at `./scripts/build.ts` — we're already using it to copy across the static assets from `./public` to `./dist-global`. We can just add another step of building the JavaScript bundle with esbuild:

    ```ts
    // ./scripts/build.ts
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
    ```

1.  If you stopped the dev server before, restart it with `npm run dev`. Then, reload [`http://localhost:8001/`](http://localhost:8001/). You should now see the client-side rendered application with `"Hello, world!" from client-side rendered React!`.
