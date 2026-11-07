import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function BirdsScreen() {
	const router = useRouter();
	return (
		<View className="flex-1 items-center justify-center">
			<Text>Birdpedia</Text>
			<Text>Display paginated, sortable list of available bird species.</Text>
			<Text>Each list item links to bird details page.</Text>

			<View>
				<Button
					onPress={() =>
						router.navigate({
							pathname: "/birds/[id]",
							params: { id: 456 },
						})
					}
					title="Bird ID 456"
				/>
			</View>
		</View>
	);
}
