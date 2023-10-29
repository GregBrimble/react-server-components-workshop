declare module "react-server-dom-esm/server" {
	export function renderToReadableStream(
		element: JSX.Element,
		options: { baseURL: string; transform?: (url: string) => string },
	): ReadableStream;
}

declare module "react-server-dom-esm/client.browser" {
	export function createFromFetch(
		response: Promise<Response>,
		options?: {
			moduleBaseURL?: string;
			callServer?: (id: string, args: unknown) => ReactNode;
		},
	): Promise<React.ReactNode & { returnValue: ReactNode; root: ReactNode }>;
	export function encodeReply(args: unknown): Promise<BodyInit>;
}
