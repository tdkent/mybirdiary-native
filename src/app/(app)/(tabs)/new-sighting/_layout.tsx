import { DEFAULT_HEADER_OPTIONS } from "@/constants/navigation";
import { Stack } from "expo-router";

export default function NewSightingLayout() {
	return (
		<Stack screenOptions={DEFAULT_HEADER_OPTIONS}>
			<Stack.Screen
				name="index"
				options={{
					title: "Create a New Sighting",
				}}
			/>
		</Stack>
	);
}
