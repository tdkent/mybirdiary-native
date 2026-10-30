import { Text, View } from "react-native";

export default function NewSightingScreen() {
	return (
		<View className="flex-1 items-center justify-center">
			<Text>New Sighting</Text>
			<Text>Basic form to capture bird species, date, description.</Text>
			<Text>Add sighting to database, display on Sightings page.</Text>
		</View>
	);
}
