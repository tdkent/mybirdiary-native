import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function SightingsScreen() {
	return (
		<View style={styles.container}>
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
