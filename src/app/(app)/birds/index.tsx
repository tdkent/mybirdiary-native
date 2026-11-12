import List from "@/components/screens/List";
import ThemedSafeView from "@/components/ui/ThemedSafeView";
import ThemedText from "@/components/ui/ThemedText";
import { config } from "@/config/config";

export default function BirdsScreen() {
	return (
		<ThemedSafeView>
			<ThemedText variant="heading">Birdpedia</ThemedText>
			<List queryKey="birds" tableId={config.birdsTableId} />
		</ThemedSafeView>
	);
}
