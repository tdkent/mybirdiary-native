import AuthForm from "@/components/forms/AuthForm";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function RegisterScreen() {
	return (
		<View className="flex-1 items-center justify-center">
			<Text className="text-4xl font-semibold">Create a new account</Text>
			<AuthForm />

			<Text>
				Already a member? <Link href="/login">Sign in</Link>
			</Text>
		</View>
	);
}
