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
