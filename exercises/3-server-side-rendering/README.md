# 3 Server-side rendering

## Goals

1. Build a server-side rendered React application which is hydrated on the client
1. Deploy your server-side rendered React app to Cloudflare's Developer Platform
1. Understand how the server hands off to the client for client-side features

## Instruction

**Make sure you're in the `./exercises/3-server-side-rendering` directory!**

1. Now we're going to server-side render our application using this Worker. Let's delete our static `./public/index.html` file and edit `./global-worker/index.tsx` to intercept requests for `/` and actually render our app to HTML:

   ```ts
    // ./global-worker/index.tsx
   import { renderToReadableStream } from "react-dom/server";
   import { App } from "../src/App.js";

   export default {
   	async fetch(request, env) {
   		const url = new URL(request.url);

   		if (url.pathname === "/") {
   			// If the request is for `/`, SSR the app
   			return new Response(await renderToReadableStream(<App />), {
   				headers: { "Content-Type": "text/html" },
   			});
   		}

   		// Otherwise, serve the static assets like normal
   		return env.ASSETS.fetch(request);
   	},
   } as ExportedHandler<{ ASSETS: Fetcher }>;
   ```

   You'll notice that we're using `react-dom` again, but this time, we're using a `renderToReadableStream` from `react-dom/server`. This, just like the `hydrateRoot` function in `react-dom/client`, is responsible for transforming our app into HTML elements, but this time, it's actually producing a stream of HTML in our Worker rather than on the client! We return this as a response to the client, being sure to attach the necessary `Content-Type` headers.

   Then, let's edit `./src/App.tsx` and add in the HTML shell that we've lost from `./public/index.html`:

   ```tsx
   // ./src/App.tsx
   export function App() {
   	return (
   		<html lang="en">
   			<head>
   				<meta charSet="utf-8" />
   				<meta
   					name="viewport"
   					content="width=device-width, initial-scale=1"
   				/>
   				<title>3 | Server-side rendering</title>
   			</head>
   			<body>
   				<div>
   					<p>"Hello, world!" from server-side rendered React!</p>
   					<img src="/react-summit.svg" width="128" />
   				</div>
   			</body>
   		</html>
   	);
   }
   ```

   It may look a little weird to be using React to construct a full HTML document like this, but there's technically nothing that limits React to things just in the `body`, so this is perfectly valid when server-side rendering an application.

1. Run `npm run dev` and navigate to [`http://localhost:8003/`](http://localhost:8003/). You should see the server-side React app rendered to the page. **Raise your hand if you're having any issues here!**

1. Now let's add in some interactivity! Let's create a new file, `./src/Counter.tsx`, and add a simple button press counter:

   ```tsx
   // ./src/Counter.tsx
   import { useState } from "react";

   export function Counter() {
   	const [count, setCount] = useState(0);

   	return (
   		<div>
   			<button onClick={() => setCount(count - 1)}>Decrement</button>
   			<p>{count}</p>
   			<button onClick={() => setCount(count + 1)}>Increment</button>
   		</div>
   	);
   }
   ```

   Then let's use that in `./src/App.tsx`:

   ```tsx
   // ./src/App.tsx
   import { Counter } from "./Counter.js";

   export function App() {
   	return (
   		<html lang="en">
   			<head>
   				<meta charSet="utf-8" />
   				<meta
   					name="viewport"
   					content="width=device-width, initial-scale=1"
   				/>
   				<title>3 | Server-side rendering</title>
   			</head>
   			<body>
   				<div>
   					<p>"Hello, world!" from server-side rendered React!</p>
   					<img src="/react-summit.svg" width="128" />
   					<Counter />
   				</div>
   			</body>
   		</html>
   	);
   }
   ```

1. Run `npm run dev` and navigate to [`http://localhost:8003/`](http://localhost:8003/). You should see the new buttons and counter. However... the buttons don't work! The server-side render turns our React app into HTML, but it doesn't do anything about then actually injecting that app code back in for the client.

   We've got to change up our `./src/index.tsx` file so that it's now not just targeting this `<div id="root">` element, but rather, the entire document:

   ```tsx
   // ./src/index.tsx
   import ReactDOM from "react-dom/client";
   import { App } from "./App.js";

   ReactDOM.hydrateRoot(document, <App />);
   ```

   And finally, we'll add in a handy option to `renderToReadableStream`, `bootstrapModules` which will automatically inject in our client bundle script for us:

   ```tsx
   // ./global-worker/index.tsx
   import { renderToReadableStream } from "react-dom/server";
   import { App } from "../src/App.js";

   export default {
   	async fetch(request, env) {
   		const url = new URL(request.url);

   		if (url.pathname === "/") {
   			// If the request is for `/`, SSR the app
   			return new Response(
   				await renderToReadableStream(<App />, {
   					bootstrapModules: ["/index.js"],
   				}),
   				{
   					headers: { "Content-Type": "text/html" },
   				},
   			);
   		}

   		// Otherwise, serve the static assets like normal
   		return env.ASSETS.fetch(request);
   	},
   } as ExportedHandler<{ ASSETS: Fetcher }>;
   ```

1. Re-run `npm run dev` and refresh [`http://localhost:8003/`](http://localhost:8003/). It should now both server-side render your application, and also hydrate it on the client, making those buttons interactive.

1. Deploy your app with `npm run deploy`.
