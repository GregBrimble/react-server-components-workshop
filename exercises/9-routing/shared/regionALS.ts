import { AsyncLocalStorage } from "node:async_hooks";
import type { RegionEnvironment } from "../types";

export const regionALS = new AsyncLocalStorage<RegionEnvironment>();

export const getRegionEnv = (): RegionEnvironment => {
	const env = regionALS.getStore();
	if (!env) {
		throw new Error("No region environment found");
	}
	return env;
};
