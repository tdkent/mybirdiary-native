import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
	return (
		<View className="flex-1 items-center justify-center">
			<Text className="text-4xl font-semibold">Home</Text>
			<Text>If user is not logged in, show auth links.</Text>
			<Text>If logged in, redirect to Dashboard area.</Text>

			<View>
				<Link href="/(app)/new-sighting">
					<Text>Go to New Sighting</Text>
				</Link>
			</View>
		</View>
	);
}
