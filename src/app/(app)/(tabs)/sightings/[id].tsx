import { useLocalSearchParams } from "expo-router";
import Details from "@/components/screens/Details";
import ThemedSafeView from "@/components/ui/ThemedSafeView";
import { useAuth } from "@/hooks/useAuth";

export default function SightingDetailsScreen() {
	const { id } = useLocalSearchParams();
	const { user } = useAuth();

	if (typeof id !== "string" || !user) return null;

	return (
		<ThemedSafeView>
			<Details
				table="sightings"
				userId={user.$id}
				rowId={id}
				queries={["*", "bird.*"]}
			/>
		</ThemedSafeView>
	);
}
