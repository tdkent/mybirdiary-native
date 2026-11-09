import ThemedSafeView from "@/components/ui/ThemedSafeView";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function SightingsScreen() {
	const router = useRouter();
	return (
		<ThemedSafeView>
			<Text>My Sightings</Text>
			<Text>Display paginated, sortable list of user's bird sightings.</Text>
			<Text>Each list item links to sighting details page.</Text>

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
