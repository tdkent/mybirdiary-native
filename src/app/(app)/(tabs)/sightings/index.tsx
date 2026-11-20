import List from "@/components/screens/List";
import ThemedSafeView from "@/components/ui/ThemedSafeView";
import ThemedText from "@/components/ui/ThemedText";
import { ERROR_MESSAGES } from "@/constants/messages";
import { useAuth } from "@/hooks/useAuth";

export default function SightingsScreen() {
	const { user } = useAuth();

	if (!user) throw new Error(ERROR_MESSAGES.AUTH_ERROR);

	return (
		<ThemedSafeView>
			<ThemedText variant="heading">My Sightings</ThemedText>
			<List queryKey="sightings" queries={["*", "bird.*"]} userId={user.$id} />
		</ThemedSafeView>
	);
}
