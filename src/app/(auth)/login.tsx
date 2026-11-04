import AuthForm from "@/components/forms/AuthForm";
import { Text, View } from "react-native";

export default function LoginScreen() {
	return (
		<View className="flex-1 items-center justify-center">
			<Text className="text-4xl font-semibold">Sign in</Text>
			<Text>Enter your email to sign in or create a new account.</Text>

			<View>
				<AuthForm />
			</View>
		</View>
	);
}
