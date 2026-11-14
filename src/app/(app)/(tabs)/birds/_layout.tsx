import { DEFAULT_HEADER_OPTIONS } from "@/constants/navigation";
import { Stack } from "expo-router";

export default function BirdsLayout() {
	return (
		<Stack screenOptions={DEFAULT_HEADER_OPTIONS}>
			<Stack.Screen
				name="index"
				options={{
					title: "Birdpedia",
				}}
			/>
			<Stack.Screen
				name="[id]"
				options={{
					title: "Bird Details",
				}}
			/>
		</Stack>
	);
}
