import { Stack } from "expo-router";

export default function AuthLayout() {
	return (
		<Stack
			screenOptions={{
				animation: "fade",
				animationDuration: 300,
				headerShown: false,
			}}
		/>
	);
}
