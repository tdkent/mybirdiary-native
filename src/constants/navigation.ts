import type { NativeStackNavigationOptions } from "expo-router";

export const DEFAULT_HEADER_OPTIONS = {
	headerBackButtonDisplayMode: "minimal",
	headerShown: true,
	headerStyle: {
		backgroundColor: "#f9f9f9",
	},
	headerTintColor: "#333",
	headerTitleStyle: {
		fontWeight: "bold",
	},
} satisfies NativeStackNavigationOptions;
