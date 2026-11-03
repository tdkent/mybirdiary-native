import { Link } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { client } from "@/lib/appwrite";

export default function Index() {
	useEffect(() => {
		async function testConnection() {
			const result = await client.ping();
			console.log(result);
		}

		testConnection();
	}, []);

	return (
		<View className="flex-1 items-center justify-center">
			<Text className="text-4xl font-semibold">Home Screen</Text>
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
