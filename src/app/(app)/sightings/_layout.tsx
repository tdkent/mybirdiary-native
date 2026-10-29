import { Stack } from "expo-router";

export default function SightingsLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "My Sightings",
				}}
			/>
			<Stack.Screen
				name="[id]"
				options={{
					headerBackButtonDisplayMode: "minimal",
				}}
			/>
		</Stack>
	);
}
