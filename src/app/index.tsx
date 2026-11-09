import ThemedSafeView from "@/components/ui/ThemedSafeView";
import ThemedText from "@/components/ui/ThemedText";
import { useRouter } from "expo-router";
import { Button, View } from "react-native";

export default function Index() {
	const router = useRouter();

	return (
		<ThemedSafeView>
			<ThemedText variant="heading">Welcome to My Birdiary</ThemedText>
			<ThemedText>
				Enter your email to sign in or create a new account
			</ThemedText>

			<View className="my-10">
				<Button
					onPress={() => router.navigate("/login")}
					title="Log in or register"
				/>
			</View>
		</ThemedSafeView>
	);
}
