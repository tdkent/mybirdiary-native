import ThemedSafeView from "@/components/ui/ThemedSafeView";
import { Text } from "react-native";

export default function NewSightingScreen() {
	return (
		<ThemedSafeView>
			<Text>Create a new sighting</Text>
			<Text>Basic form to capture bird species, date, description.</Text>
			<Text>Add sighting to database, display on Sightings page.</Text>
		</ThemedSafeView>
	);
}
