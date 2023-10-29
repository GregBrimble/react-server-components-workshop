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
