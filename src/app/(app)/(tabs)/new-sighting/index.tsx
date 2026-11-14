import SightingForm from "@/components/forms/SightingForm";
import ThemedSafeView from "@/components/ui/ThemedSafeView";
import ThemedText from "@/components/ui/ThemedText";

export default function NewSightingScreen() {
	return (
		<ThemedSafeView>
			<ThemedText variant="heading">Create a new sighting</ThemedText>
			<SightingForm />
		</ThemedSafeView>
	);
}
