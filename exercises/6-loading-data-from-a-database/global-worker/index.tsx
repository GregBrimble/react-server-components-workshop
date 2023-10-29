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
