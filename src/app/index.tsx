import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
	const router = useRouter();

	return (
		<View className="flex-1 items-center justify-center">
			<Text className="text-4xl font-semibold">Welcome to My Birdiary</Text>
			<Text>Enter your email to sign in or create a new account</Text>

			<View className="my-10">
				<Button
					onPress={() => router.navigate("/login")}
					title="Log in or register"
				/>
			</View>
		</View>
	);
}
