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
