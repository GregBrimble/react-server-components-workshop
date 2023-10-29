"use server";

import { Suspense } from "react";
import { BrowserReact } from "../../../utils/BrowserReact.js";
import type { RegionEnvironment } from "../types.js";
import { Counter } from "./Counter.js";
import { Notes } from "./Notes.js";

export function App({ env }: { env: RegionEnvironment }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>7 | Smart Placement</title>
				<BrowserReact />
			</head>
			<body>
				<div>
					<p>"Hello, world!" from server-side rendered React!</p>
					<img src="/react-summit.svg" width="128" />
					<Counter />
					<Suspense fallback={<p>Loading...</p>}>
						{/* @ts-expect-error Async Server Component */}
						<Notes env={env} />
					</Suspense>
				</div>
				<script type="module" src="/src/index.js"></script>
			</body>
		</html>
	);
}
