"use server";

import { createNote } from "./actions.js";

export function NewNote() {
	return (
		// @ts-expect-error Server Action
		<form action={createNote}>
			<input type="text" name="title" />
			<textarea name="body" />
			<button type="submit">Create</button>
		</form>
	);
}
