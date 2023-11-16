import React from "react";
import { renderToReadableStream } from "react-server-dom-esm/server";
import { App } from "../src/App.js";
import type { RegionEnvironment } from "../types.js";

function renderApp(env: RegionEnvironment) {
	const root = React.createElement(App, { env });
	return renderToReadableStream(root, {
		baseURL: "/src",
		transform: (url) => url.replace(/\.(t|j)sx?/, ".js"),
	});
}

export default {
	async fetch(request, env) {
		const readableStream = renderApp(env);
		return new Response(readableStream);
	},
} as ExportedHandler<RegionEnvironment>;
