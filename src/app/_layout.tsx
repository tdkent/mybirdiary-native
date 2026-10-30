import { Stack } from "expo-router";
import { Uniwind } from "uniwind";
import "../global.css";

Uniwind.setTheme("system");

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Home Page",
				}}
			/>
			<Stack.Screen
				name="(app)"
				options={{
					headerShown: false,
				}}
			/>
		</Stack>
	);
}
