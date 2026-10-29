import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function BirdsScreen() {
	return (
		<View style={styles.container}>
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
