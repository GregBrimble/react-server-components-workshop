"use server";

import { z } from "zod";
import { getRegionEnv } from "../shared/regionALS";

const createNoteSchema = z.object({
	title: z.string(),
	body: z.string(),
});

type CreateNote = z.infer<typeof createNoteSchema>;

export async function createNote(formData: FormData) {
	const { title, body } = createNoteSchema.parse({
		title: formData.get("title"),
		body: formData.get("body"),
	});
	const { DB } = getRegionEnv();
	console.log(DB);

	await DB.prepare("INSERT INTO note (title, body) VALUES (?, ?)")
		.bind(title, body)
		.run();

	return "done!";
}
