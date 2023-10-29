/// <reference types="node" />

type Loader = (
	url: string,
	context: {
		conditions?: string[];
		format?: string | null | undefined;
		importAttributes?: object;
	},
	nextLoad: Loader,
) => Promise<{
	format: string | undefined;
	shortCircuit: undefined | boolean;
	source: string | Uint8Array;
}>;

type Resolver = (
	specifier: string,
	context: object,
	nextResolve: Resolver,
) => Promise<{
	format:
		| "builtin"
		| "commonjs"
		| "json"
		| "module"
		| "wasm"
		| null
		| undefined;
	importAttributes: object | undefined;
	shortCircuit: undefined | boolean;
	url: string;
}>;

declare module "react-server-dom-esm/node-loader" {
	export const load: Loader;
	export const resolve: Resolver;
}
