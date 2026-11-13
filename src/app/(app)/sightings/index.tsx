import List from "@/components/screens/List";
import ThemedSafeView from "@/components/ui/ThemedSafeView";
import ThemedText from "@/components/ui/ThemedText";

export default function SightingsScreen() {
	return (
		<ThemedSafeView>
			<ThemedText variant="heading">My Sightings</ThemedText>
			<List queryKey="sightings" queries={["*", "bird.*"]} />
		</ThemedSafeView>
	);
}
