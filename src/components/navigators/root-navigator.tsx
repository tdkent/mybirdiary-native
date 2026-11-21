import { Stack } from "expo-router";
import { useAuth } from "@/hooks/use-auth";

export default function RootNavigator() {
	const { user } = useAuth();

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />

			<Stack.Protected guard={!user} redirectTo="/new-sighting">
				<Stack.Screen name="(auth)" />
			</Stack.Protected>

			<Stack.Protected guard={!!user} redirectTo="/login">
				<Stack.Screen name="(app)" />
			</Stack.Protected>
		</Stack>
	);
}
