import AuthForm from "@/components/forms/AuthForm";
import ThemedSafeView from "@/components/ui/ThemedSafeView";
import { Link } from "expo-router";
import { Text } from "react-native";

export default function RegisterScreen() {
	return (
		<ThemedSafeView>
			<Text className="text-4xl font-semibold">Create a new account</Text>
			<AuthForm action="register" />

			<Text>
				Already a member? <Link href="/login">Sign in</Link>
			</Text>
		</ThemedSafeView>
	);
}
