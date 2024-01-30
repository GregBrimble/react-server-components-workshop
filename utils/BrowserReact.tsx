export function BrowserReact() {
	return (
		<script
			type="importmap"
			dangerouslySetInnerHTML={{
				__html: JSON.stringify({
					imports: {
						react: "https://esm.sh/react@experimental?pin=v124&dev",
						"react/jsx-runtime":
							"https://esm.sh/react@experimental?pin=v124&dev/jsx-runtime",
						"react-dom": "https://esm.sh/react-dom@experimental?pin=v124&dev",
						"react-dom/": "https://esm.sh/react-dom@experimental&pin=v124&dev/",
						"react-server-dom-esm/client.browser":
							"/react_nm/react-server-dom-esm/esm/react-server-dom-esm-client.browser.development.js",
					},
				}),
			}}
		></script>
	);
}
