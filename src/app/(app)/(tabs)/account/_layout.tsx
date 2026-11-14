import { DEFAULT_HEADER_OPTIONS } from "@/constants/navigation";
import { Stack } from "expo-router";

export default function AccountLayout() {
	return (
		<Stack screenOptions={DEFAULT_HEADER_OPTIONS}>
			<Stack.Screen
				name="index"
				options={{
					title: "Account",
				}}
			/>
		</Stack>
	);
}
