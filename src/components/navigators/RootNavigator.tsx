import { useAuth } from "@/hooks/useAuth";
import { Stack } from "expo-router";

export default function RootNavigator() {
	const { isLoggedIn } = useAuth();

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
			<Stack.Protected guard={!isLoggedIn}>
				<Stack.Screen name="(auth)" />
			</Stack.Protected>

			<Stack.Protected guard={isLoggedIn} redirectTo="/login">
				<Stack.Screen name="(app)" />
			</Stack.Protected>
		</Stack>
	);
}
