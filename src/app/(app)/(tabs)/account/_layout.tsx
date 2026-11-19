import { Stack } from "expo-router";
import { DEFAULT_HEADER_OPTIONS } from "@/constants/navigation";

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
