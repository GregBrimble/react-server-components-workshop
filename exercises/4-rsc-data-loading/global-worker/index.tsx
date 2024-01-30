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
