import { mediaType } from "@hapi/accept";

export const accepts = (header: string | null, contentType: string) =>
	header && !!mediaType(header, [contentType]);
