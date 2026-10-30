const { getDefaultConfig } = require("expo/metro-config");
const { withUniwindConfig } = require("uniwind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const uniwindConfig = withUniwindConfig(config, {
	cssEntryFile: "./src/global.css",
	// path to auto-generated typings
	dtsFile: "./src/uniwind-types.d.ts",
});

module.exports = uniwindConfig;
