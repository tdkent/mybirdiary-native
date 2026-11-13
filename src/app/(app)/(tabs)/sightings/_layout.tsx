import { Stack } from "expo-router";

export default function SightingsLayout() {
	return (
		<Stack
			screenOptions={{
				headerBackButtonDisplayMode: "minimal",
				headerTintColor: '"#2563eb"',
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					title: "My Sightings",
				}}
			/>
			<Stack.Screen
				name="[id]"
				options={{
					title: "Sighting Details",
				}}
			/>
		</Stack>
	);
}
