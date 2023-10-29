import {
	createElement,
	startTransition,
	use,
	useState,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
} from "react";
import ReactDOM from "react-dom/client";
import {
	createFromFetch,
	encodeReply,
} from "react-server-dom-esm/client.browser";

let updateRoot: Dispatch<SetStateAction<ReactNode>>;

async function callServer(id: string, args: unknown) {
	const response = fetch("/", {
		method: "POST",
		headers: {
			Accept: "text/x-component",
			"rsc-action": id,
		},
		body: await encodeReply(args),
	});
	const { returnValue, root } = await createFromFetch(response, {
		callServer,
		moduleBaseURL: "/src",
	});
	startTransition(() => {
		updateRoot(root);
	});
	return returnValue;
}

let data = createFromFetch(
	fetch("/", {
		headers: {
			Accept: "text/x-component",
		},
	}),
	{
		callServer,
		moduleBaseURL: "/src",
	},
);

function Shell({ data }: { data: Promise<unknown> }) {
	const [root, setRoot] = useState(use(data));
	updateRoot = setRoot;
	return root;
}

ReactDOM.hydrateRoot(document, createElement(Shell, { data }));
