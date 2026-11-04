import { Text, View } from "react-native";

export default function Index() {
	return (
		<View className="flex-1 items-center justify-center">
			<Text className="text-4xl font-semibold">Welcome to My Birdiary</Text>
			<Text>Enter your email to sign in or create a new account</Text>
		</View>
	);
}
