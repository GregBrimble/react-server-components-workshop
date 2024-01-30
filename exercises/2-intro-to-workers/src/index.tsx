import ReactDOM from "react-dom/client";
import { App } from "./App.js";

const rootElement = document.getElementById("root");
if (!rootElement) {
	alert(
		"Make sure you've added a <div id='root'>...</div> to your `./public/index.html` file!",
	);
}

if (rootElement) {
	ReactDOM.hydrateRoot(rootElement, <App />);
}
