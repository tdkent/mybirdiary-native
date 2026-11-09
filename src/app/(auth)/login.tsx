import AuthForm from "@/components/forms/AuthForm";
import ThemedSafeView from "@/components/ui/ThemedSafeView";
import { Link } from "expo-router";
import { Text } from "react-native";

export default function LoginScreen() {
	return (
		<ThemedSafeView>
			<Text className="text-4xl font-semibold">Sign in</Text>

			<AuthForm action="login" />

			<Text>
				Don't have an account? <Link href="/register">Sign up</Link>
			</Text>
		</ThemedSafeView>
	);
}
