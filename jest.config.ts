import type { Config } from "jest";

const config: Config = {
	preset: "jest-expo",
	setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
};

export default config;
