import { useLocalSearchParams } from "expo-router";
import Details from "@/components/screens/Details";
import ThemedSafeView from "@/components/ui/ThemedSafeView";

export default function BirdDetailsScreen() {
	const { id } = useLocalSearchParams();

	if (typeof id !== "string") return null;

	return (
		<ThemedSafeView>
			<Details table="birds" rowId={id} queries={["*"]} />
		</ThemedSafeView>
	);
}
