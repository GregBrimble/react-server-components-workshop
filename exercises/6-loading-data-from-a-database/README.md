# 6 Loading data from a database

## Goals

1. Configure a Cloudflare D1 database for our app

## Instructions

**Make sure you're in the `./exercises/6-server-actions` directory!**

1.  Server Actions are typically mutations, so let's introduce some state to our application by first creating a D1 database. When creating a D1 database, you can provide a "location hint" which is a way to express a preference of some specific area in the world. You can see the list of options by running `npx wrangler d1 create --help`. Create a database called `rsc-workshop` with a **different** region than where you are right now. I'm in New York, so I chose `weur` (Western Europe):

    ```sh
    npx wrangler d1 create --location weur rsc-workshop
    ```

1.  Wrangler will print out a snippet of TOML which we can copy into our `wrangler-region.toml` and then add one extra line to (`migrations_dir = "./migrations"` to opt us into using migrations). **Also make sure you use your own database ID!**.

    ```toml
     # ./wrangler-region.toml

    	name = "region-worker"
    	main = "./dist-region/index.js"
    	compatibility_date = "2023-11-09"
    	compatibility_flags = ["nodejs_compat"]

    [[d1_databases]]
    binding = "DB"
    database_name = "rsc-workshop"
    database_id = "c8fac4c5-c6cd-4d58-a852-c14e7f6e9503" # REPLACE THIS WITH YOUR ID!
    migrations_dir = "./migrations" # ADD THIS LINE
    ```

1.  Next, let's run another command to create a database migration for our table schema:

    ```sh
    npx wrangler -c wrangler-region.toml d1 migrations create rsc-workshop init
    ```

    If you're asked `Ok to create .../migrations? › (Y/n)`, just hit Enter to confirm using that directory.

    This will create a `./migrations/0000_init.sql` file which we can use to describe our database schema.

1.  Let's create a table for some notes:

    ```sql
    -- ./migrations/0000_init.sql

    -- Migration number: 0000 	 2023-11-09T07:38:31.903Z
    CREATE TABLE IF NOT EXISTS note (
    	id INTEGER PRIMARY KEY,
    	title TEXT NOT NULL,
    	body TEXT NOT NULL,
    	created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    	updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    ```

1.  And let's apply that migration both locally and remotely:

    ```sh
    npx wrangler -c wrangler-region.toml d1 migrations apply --local rsc-workshop
    ```

    ```sh
    npx wrangler -c wrangler-region.toml d1 migrations apply rsc-workshop
    ```

    Accept any `Your database may not be available to serve requests during the migration, continue? › (Y/n)` prompts by hitting Enter.

1.  Let's populate it with some data:

    ```sh
    npx wrangler -c wrangler-region.toml d1 execute --local rsc-workshop --command "INSERT INTO note (title, body) VALUES ('Hello, world!', 'Today is November 14'), ('I discovered time travel!', 'Today is November 15');"
    ```

    ```sh
    npx wrangler -c wrangler-region.toml d1 execute rsc-workshop --command "INSERT INTO note (title, body) VALUES ('Hello, world!', 'Today is November 14'), ('I discovered time travel!', 'Today is November 15');"
    ```

1.  We've made this database available to the region Worker by adding it to our `wrangler-region.toml`. Let's also type it so our React app can know about it:

    ```tsx
    // ./types.ts

    export interface RegionEnvironment {
    	DB: D1Database;
    }
    ```

1.  And let's make a component which uses this it:

    ```tsx
    // ./src/Notes.tsx

    "use server";

    import type { RegionEnvironment } from "../types.js";

    export async function Notes({ env }: { env: RegionEnvironment }) {
    	const stmt = env.DB.prepare(
    		"SELECT id, title, body FROM note ORDER BY updated_at DESC",
    	);
    	const { results: posts } = await stmt.all<{
    		id: number;
    		title: string;
    		body: string;
    	}>();

    	return (
    		<ul>
    			{posts.map(({ id, title, body }) => (
    				<Note key={id} title={title} body={body} />
    			))}
    		</ul>
    	);
    }

    function Note({ title, body }: { title: string; body: string }) {
    	return (
    		<li>
    			<h3>{title}</h3>
    			<div>{body}</div>
    		</li>
    	);
    }
    ```

    As you'd expect, we're using `"use server";` here to mark the fact that this component needs to execute in our `region-worker`.

1.  And finally, let's plumb through `env` so it's available in our component:

    ```tsx
    // ./src/App.tsx
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
    				<meta
    					name="viewport"
    					content="width=device-width, initial-scale=1"
    				/>
    				<title>6 | Loading data from a database</title>
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
    ```

    And let's populate that environment object from our `./region-worker/index.tsx`:

    ```tsx
    // ./region-worker/index.tsx

    import React from "react";
    import { renderToReadableStream } from "react-server-dom-esm/server";
    import { App } from "../src/App.js";
    import type { RegionEnvironment } from "../types.js";

    function renderApp(env: RegionEnvironment) {
    	const root = React.createElement(App, { env });
    	return renderToReadableStream(root, {
    		baseURL: "/src",
    		transform: (url) => url.replace(/\.(t|j)sx?/, ".js"),
    	});
    }

    export default {
    	async fetch(request, env) {
    		const readableStream = renderApp(env);
    		return new Response(readableStream);
    	},
    } as ExportedHandler<RegionEnvironment>;
    ```
