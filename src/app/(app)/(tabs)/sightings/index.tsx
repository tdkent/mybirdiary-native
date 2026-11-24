import List from "@/components/list/list";
import ThemedSafeView from "@/components/ui/themed-safe-view";
import ThemedText from "@/components/ui/themed-text";
import { ERROR_MESSAGES } from "@/constants/messages";
import { useAuth } from "@/hooks/use-auth";

export default function SightingsScreen() {
	const { user } = useAuth();

	if (!user) throw new Error(ERROR_MESSAGES.AUTH_ERROR);

	return (
		<ThemedSafeView>
			<ThemedText variant="heading">My Sightings</ThemedText>
			<List table="sightings" queries={["*", "bird.*"]} userId={user.$id} />
		</ThemedSafeView>
	);
}
