import { useLocalSearchParams } from "expo-router";
import Details from "@/components/screens/Details";
import ThemedSafeView from "@/components/ui/ThemedSafeView";
import { ERROR_MESSAGES } from "@/constants/messages";

export default function BirdDetailsScreen() {
	const { id } = useLocalSearchParams();

	if (typeof id !== "string")
		throw new Error(ERROR_MESSAGES.INVALID_ROUTE_PARAM);

	return (
		<ThemedSafeView>
			<Details table="birds" rowId={id} queries={["*"]} />
		</ThemedSafeView>
	);
}
