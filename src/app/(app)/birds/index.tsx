import List from "@/components/screens/List";
import ThemedSafeView from "@/components/ui/ThemedSafeView";
import ThemedText from "@/components/ui/ThemedText";
import { useRouter } from "expo-router";
import { Button, View } from "react-native";

export default function BirdsScreen() {
	const router = useRouter();
	return (
		<ThemedSafeView>
			<ThemedText variant="heading">Birdpedia</ThemedText>

			<List />

			<View>
				<Button
					onPress={() =>
						router.navigate({
							pathname: "/birds/[id]",
							params: { id: 456 },
						})
					}
					title="Bird ID 456"
				/>
			</View>
		</ThemedSafeView>
	);
}
