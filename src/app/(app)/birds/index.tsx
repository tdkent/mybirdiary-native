import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function BirdsScreen() {
	return (
		<View className="flex-1 items-center justify-center">
			<Text>Birdpedia</Text>
			<Text>Display paginated, sortable list of available bird species.</Text>
			<Text>Each list item links to bird details page.</Text>

			<View>
				<Link
					href={{
						pathname: "/birds/[id]",
						params: { id: 1234 },
					}}
				>
					<Text>Go to Bird Details #1234</Text>
				</Link>
			</View>
		</View>
	);
}
