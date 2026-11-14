import Details from "@/components/screens/Details";
import ThemedSafeView from "@/components/ui/ThemedSafeView";

export default function SightingDetailsScreen() {
	return (
		<ThemedSafeView>
			<Details queries={["*", "bird.*"]} table="sightings" />
		</ThemedSafeView>
	);
}
