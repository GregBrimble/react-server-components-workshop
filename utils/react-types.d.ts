import "react";
import type React from "react";

declare module "react" {
	export function use(promise: Promise<T>): T;
	export default React;
}
