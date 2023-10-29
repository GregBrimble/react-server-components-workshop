# 4 RSC data loading

## Goals

1. Understand why React Server Components were introduced
1. Begin to load data with React Server Components

## Instructions

**Make sure you're in the `./exercises/4-rsc-data-loading` directory!**

1.  Let's introduce React 18's concept of React Server Components by first identifying where a Client Component boundary exists in our application already. We saw that when we server-side rendered our application, the counter rendered out to just an div with a default value and inert buttons. It only became interactive once the client had hydrated the app. Because this app relies on a hook that only works fully when run by a client, we know this component as a whole must be a Client Component. This, is where we'll draw the first boundary then, by adding a `"use client";` pragma to the top of the `./src/Counter.tsx` file:

    ```tsx
    // ./src/Counter.tsx
    "use client";

    import { useState } from "react";

    export function Counter() {
    	const [count, setCount] = useState(0);

    	return (
    		<div>
    			<button onClick={() => setCount(count - 1)}>Decrement</button>
    			<p>{count}</p>
    			<button onClick={() => setCount(count + 1)}>Increment</button>
    		</div>
    	);
    }
    ```

    If you run `npm run dev` and navigate to [`http://locahost:8004/`](http://locahost:8004/), you'll see that nothing has changed. And if you haven't used React Server Components before, you might be asking "well what's the point of this new concept of Client Components then?" And you wouldn't be wrong! Client Components are essentially just React as we know it in React 17. The real magic comes from Server Components.

1.  React Server Components are special for two primary reasons:

    1. The code for these components doesn't need to be delivered to the client (this reduces the app bundle size and makes your app more performant).
    1. Because the code for Server Components isn't delivered to the client, we can safely use secrets in Server Components.

    Generally, to take advantage of this, you want to push any Client Components as far down the tree as you can because as soon you hand over control to the client for a node, you can't then flip back to using Server Components in children of that node.

    Thankfully, we've already structured our application in such a way that all of our client logic is isolated into a relatively small file (`./src/Counter.tsx`) which is very much focused on delivering just that interactive experience. This means we can add the `"use server";` pragma to our `./src/App.tsx` file without any problems:

    ```tsx
    // ./src/App.tsx
    "use server";

    import { Counter } from "./Counter.js";

    export function App() {
    	return (
    		<html lang="en">
    			<head>
    				<meta charSet="utf-8" />
    				<meta
    					name="viewport"
    					content="width=device-width, initial-scale=1"
    				/>
    				<title>4 | RSC data loading</title>
    			</head>
    			<body>
    				<div>
    					<p>"Hello, world!" from server-side rendered React!</p>
    					<img src="/react-summit.svg" width="128" />
    					<Counter />
    				</div>
    			</body>
    		</html>
    	);
    }
    ```

    If, instead, we had inlined the code for the counter in this `./src/App.tsx`, our entire app would have had to be a Client Component.

1.  Let's create another component which takes advantage of our new found server-side abilities:

    ```tsx
    // ./src/Todos.tsx
    "use server";

    import { z } from "zod";

    const todoSchema = z.object({
    	userId: z.number(),
    	id: z.number(),
    	title: z.string(),
    	completed: z.boolean(),
    });

    type Todo = z.infer<typeof todoSchema>;

    const todosSchema = z.array(todoSchema);

    type Todos = z.infer<typeof todosSchema>;

    export async function Todos() {
    	const response = await fetch(
    		"https://jsonplaceholder.typicode.com/todos?_delay=5000",
    	);
    	const todos = todosSchema.parse(await response.json());

    	return (
    		<ul>
    			{todos.map(({ id, title, completed }) => (
    				<Todo key={id} id={id} title={title} completed={completed} />
    			))}
    		</ul>
    	);
    }

    function Todo({
    	id,
    	title,
    	completed,
    }: {
    	id: number;
    	title: string;
    	completed: boolean;
    }) {
    	return (
    		<li>
    			<input type="checkbox" defaultChecked={completed} />
    			{title}
    		</li>
    	);
    }
    ```

    Here, you'll notice that we're using `await fetch()` directly in our made the `Todos` function (and we've therefore made it asynchronous)! This is the power of Server Components in action! We're able to do compute on the server, referencing any secrets like authentication tokens, all without that code needing to be shipped to the client.

1.  Finally, let's use import and use that new component in our `./src/App.tsx` file, and let's wrap this in a `Suspense` element to really show it off:

    ```tsx
    // ./src/App.tsx
    "use server";

    import { Suspense } from "react";
    import { Counter } from "./Counter.js";
    import { Todos } from "./Todos.js";

    export function App() {
    	return (
    		<html lang="en">
    			<head>
    				<meta charSet="utf-8" />
    				<meta
    					name="viewport"
    					content="width=device-width, initial-scale=1"
    				/>
    				<title>4 | RSC data loading</title>
    			</head>
    			<body>
    				<div>
    					<p>"Hello, world!" from server-side rendered React!</p>
    					<img src="/react-summit.svg" width="128" />
    					<Counter />
    					<Suspense fallback={<p>Loading...</p>}>
    						{/* @ts-expect-error Async Server Component */}
    						<Todos />
    					</Suspense>
    				</div>
    			</body>
    		</html>
    	);
    }
    ```

    **Note: trying to run the application here may result in an error. This is expected! We still haven't yet properly built our application for RSCs.**
