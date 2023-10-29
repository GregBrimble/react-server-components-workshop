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
