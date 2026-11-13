import Details from "@/components/screens/Details";
import ThemedSafeView from "@/components/ui/ThemedSafeView";

export default function BirdDetailsScreen() {
	return (
		<ThemedSafeView>
			<Details queries={["*"]} table="birds" />
		</ThemedSafeView>
	);
}
