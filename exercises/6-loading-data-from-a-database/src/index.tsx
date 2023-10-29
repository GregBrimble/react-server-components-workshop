import { createElement, use } from "react";
import ReactDOM from "react-dom/client";
import { createFromFetch } from "react-server-dom-esm/client.browser";

let data = createFromFetch(
	fetch("/", {
		headers: {
			Accept: "text/x-component",
		},
	}),
	{
		moduleBaseURL: "/src",
	},
);

function Shell({ data }: { data: Promise<unknown> }) {
	return use(data);
}

ReactDOM.hydrateRoot(document, createElement(Shell, { data }));
