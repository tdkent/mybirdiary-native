import List from "@/components/screens/List";
import ThemedSafeView from "@/components/ui/ThemedSafeView";
import ThemedText from "@/components/ui/ThemedText";
import { useAuth } from "@/hooks/useAuth";

export default function SightingsScreen() {
	const { user } = useAuth();

	if (!user) return null;

	return (
		<ThemedSafeView>
			<ThemedText variant="heading">My Sightings</ThemedText>
			<List queryKey="sightings" queries={["*", "bird.*"]} userId={user.$id} />
		</ThemedSafeView>
	);
}
