import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function SightingsScreen() {
	return (
		<View className="flex-1 items-center justify-center">
			<Text>Sightings</Text>
			<Text>Display paginated, sortable list of user's bird sightings.</Text>
			<Text>Each list item links to sighting details page.</Text>

			<View>
				<Link
					href={{
						pathname: "/sightings/[id]",
						params: { id: 1234 },
					}}
				>
					<Text>Go to Sighting Details #1234</Text>
				</Link>
			</View>
		</View>
	);
}
