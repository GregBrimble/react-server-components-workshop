import { load as reactLoad, resolve } from "react-server-dom-esm/node-loader";

export { resolve };

const textLoad: Loader = async (url, context, defaultLoad) => {
	const result = await defaultLoad(url, context, defaultLoad);
	if (result.format === "module") {
		if (typeof result.source === "string") {
			return result;
		}
		return {
			source: Buffer.from(result.source).toString("utf8"),
			shortCircuit: false,
			format: "module",
		};
	}
	return result;
};

export const load: Loader = async (url, context, defaultLoad) => {
	return await reactLoad(url, context, (u, c) => {
		return textLoad(u, c, defaultLoad);
	});
};
