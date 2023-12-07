import React from "react";
import {
	decodeReply,
	renderToReadableStream,
} from "react-server-dom-esm/server";
import { regionALS } from "../shared/regionALS.js";
import { App } from "../src/App.js";
import type { RegionEnvironment } from "../types.js";

const bundlerConfig = {
	baseURL: "/src",
	transform: (url) => url.replace(/\.(?:t|j)sx?(#.*)?$/, ".js$1"),
};

function renderApp(returnValue, env: RegionEnvironment) {
	const root = React.createElement(App, { env });
	const payload = returnValue ? { returnValue, root } : root;
	return renderToReadableStream(payload, bundlerConfig);
}

export default {
	async fetch(request, env) {
		return regionALS.run(env, async () => {
			let returnValue = null;
			if (request.method.toLowerCase() === "post") {
				const serverReference = request.headers.get("RSC-Action");
				if (serverReference) {
					const [filepath, name] = serverReference.split("#");
					const action = (await import(`/_.._/src${filepath}`))[name];
					if (action.$$typeof !== Symbol.for("react.server.reference")) {
						throw new Error("Invalid action");
					}

					const args = await decodeReply(
						request.headers.get("Content-Type").includes("multipart/form-data")
							? await request.formData()
							: await request.body,
						bundlerConfig,
					);

					returnValue = action.apply(null, args);
					try {
						await returnValue;
					} catch {}
				}
			}

			const readableStream = renderApp(returnValue, env);
			return new Response(readableStream);
		});
	},
} as ExportedHandler<RegionEnvironment>;
