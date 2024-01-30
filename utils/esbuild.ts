import { type BuildResult, type PluginBuild } from "esbuild";

export const getInputFormatFromBuildResult = (
	buildResult: BuildResult<{ metafile: true }>,
) => Object.values(buildResult.metafile.inputs)?.[0]?.format;

export const convertEsbuildFormatToNodejsFormat = (
	format: "cjs" | "esm" | undefined,
) => (format === "cjs" ? "commonjs" : format === "esm" ? "module" : undefined);

export const getLoader = (path: string) =>
	path.endsWith(".js") || path.endsWith(".cjs") || path.endsWith(".mjs")
		? "js"
		: path.endsWith(".ts") ||
		  path.endsWith(".tsx") ||
		  path.endsWith(".mts") ||
		  path.endsWith(".cts")
		? "tsx"
		: path.endsWith(".jsx")
		? "jsx"
		: path.endsWith(".tsx")
		? "tsx"
		: path.endsWith(".json")
		? "json"
		: path.endsWith(".module.css")
		? "local-css"
		: path.endsWith(".css")
		? "css"
		: path.endsWith(".txt")
		? "text"
		: undefined;

export const defaultLoaderWithEsbuild = ({
	build,
	watchFiles,
	errors,
	warnings,
}: {
	build: PluginBuild;
	watchFiles: string[];
	errors: BuildResult["errors"];
	warnings: BuildResult["warnings"];
}) => {
	return async (url: string) => {
		watchFiles.push(url);

		const buildResult = await build.esbuild.build({
			entryPoints: [url],
			write: false,
			metafile: true,
		});

		errors.push(...buildResult.errors);
		warnings.push(...buildResult.warnings);

		const formatAccordingToEsbuild = getInputFormatFromBuildResult(buildResult);
		const format = convertEsbuildFormatToNodejsFormat(formatAccordingToEsbuild);

		if (!buildResult.outputFiles[0]) {
			throw new Error("Could not get output file from esbuild");
		}

		return {
			format,
			shortCircuit: true,
			source: buildResult.outputFiles[0].contents,
		};
	};
};
