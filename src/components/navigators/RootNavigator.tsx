import { useAuth } from "@/hooks/useAuth";
import { Stack } from "expo-router";

export default function RootNavigator() {
	const { isLoggedIn } = useAuth();
	return (
		<Stack>
			<Stack.Protected guard={!isLoggedIn}>
				<Stack.Screen
					name="index"
					options={{
						title: "Home Page",
					}}
				/>
			</Stack.Protected>

			<Stack.Protected guard={!isLoggedIn}>
				<Stack.Screen
					name="(auth)"
					options={{
						headerShown: false,
					}}
				/>
			</Stack.Protected>

			<Stack.Protected guard={isLoggedIn}>
				<Stack.Screen
					name="(app)"
					options={{
						headerShown: false,
					}}
				/>
			</Stack.Protected>
		</Stack>
	);
}
