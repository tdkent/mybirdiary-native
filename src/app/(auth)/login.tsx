import AuthForm from "@/components/forms/AuthForm";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function LoginScreen() {
	return (
		<View className="flex-1 items-center justify-center">
			<Text className="text-4xl font-semibold">Sign in</Text>

			<AuthForm />

			<Text>
				Don't have an account? <Link href="/register">Sign up</Link>
			</Text>
		</View>
	);
}
