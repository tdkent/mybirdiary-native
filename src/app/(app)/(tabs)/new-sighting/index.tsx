import SightingForm from "@/components/forms/sighting-form";
import ThemedSafeView from "@/components/ui/themed-safe-view";
import ThemedText from "@/components/ui/themed-text";
import { ERROR_MESSAGES } from "@/constants/messages";
import { useAuth } from "@/hooks/use-auth";

export default function NewSightingScreen() {
	const { user } = useAuth();

	if (!user) throw new Error(ERROR_MESSAGES.AUTH_ERROR);

	return (
		<ThemedSafeView>
			<ThemedText variant="heading">Create a new sighting</ThemedText>
			<SightingForm userId={user.$id} />
		</ThemedSafeView>
	);
}
