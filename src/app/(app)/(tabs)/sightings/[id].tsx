import { useLocalSearchParams } from "expo-router";
import Details from "@/components/screens/Details";
import ThemedSafeView from "@/components/ui/ThemedSafeView";
import { ERROR_MESSAGES } from "@/constants/messages";
import { useAuth } from "@/hooks/useAuth";

export default function SightingDetailsScreen() {
	const { id } = useLocalSearchParams();
	const { user } = useAuth();

	if (!user) throw new Error(ERROR_MESSAGES.AUTH_ERROR);

	if (typeof id !== "string")
		throw new Error(ERROR_MESSAGES.INVALID_ROUTE_PARAM);

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
