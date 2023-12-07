import { createElement, startTransition, use, useState } from "react";
import ReactDOM from "react-dom/client";
import {
	createFromFetch,
	encodeReply,
} from "react-server-dom-esm/client.browser";

const moduleBaseURL = "/src";

let updateRoot;

async function callServer(id, args) {
	const response = fetch("/", {
		method: "POST",
		headers: {
			Accept: "text/x-component",
			"RSC-Action": id,
		},
		body: await encodeReply(args),
	});

	const { returnValue, root } = await createFromFetch(response, {
		callServer,
		moduleBaseURL,
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
		moduleBaseURL,
	},
);

function Shell({ data }: { data: Promise<unknown> }) {
	const [root, setRoot] = useState(use(data));
	updateRoot = setRoot;
	return root;
}

ReactDOM.hydrateRoot(document, createElement(Shell, { data }));
