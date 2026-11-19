import { Stack } from "expo-router";
import { DEFAULT_HEADER_OPTIONS } from "@/constants/navigation";

export default function SightingsLayout() {
	return (
		<Stack screenOptions={DEFAULT_HEADER_OPTIONS}>
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
