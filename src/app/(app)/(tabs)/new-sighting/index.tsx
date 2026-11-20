import SightingForm from "@/components/forms/SightingForm";
import ThemedSafeView from "@/components/ui/ThemedSafeView";
import ThemedText from "@/components/ui/ThemedText";
import { ERROR_MESSAGES } from "@/constants/messages";
import { useAuth } from "@/hooks/useAuth";

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
