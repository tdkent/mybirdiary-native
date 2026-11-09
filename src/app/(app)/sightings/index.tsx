import ThemedSafeView from "@/components/ui/ThemedSafeView";
import ThemedText from "@/components/ui/ThemedText";
import { useRouter } from "expo-router";
import { Button, View } from "react-native";

export default function SightingsScreen() {
	const router = useRouter();
	return (
		<ThemedSafeView>
			<ThemedText variant="heading">My Sightings</ThemedText>
			<ThemedText>
				Display paginated, sortable list of user's bird sightings.
			</ThemedText>
			<ThemedText>Each list item links to sighting details page.</ThemedText>

			<View>
				<Button
					onPress={() =>
						router.navigate({
							pathname: "/sightings/[id]",
							params: { id: 123 },
						})
					}
					title="Sighting ID 123"
				/>
			</View>
		</ThemedSafeView>
	);
}
