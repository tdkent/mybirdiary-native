import ThemedSafeView from "@/components/ui/ThemedSafeView";
import ThemedText from "@/components/ui/ThemedText";

export default function NewSightingScreen() {
	return (
		<ThemedSafeView>
			<ThemedText variant="heading">Create a new sighting</ThemedText>
			<ThemedText>
				Basic form to capture bird species, date, description.
			</ThemedText>
			<ThemedText>
				Add sighting to database, display on Sightings page.
			</ThemedText>
		</ThemedSafeView>
	);
}
