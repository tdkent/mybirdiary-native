import List from "@/components/list/list";
import ThemedSafeView from "@/components/ui/themed-safe-view";
import ThemedText from "@/components/ui/themed-text";

export default function BirdsScreen() {
	return (
		<ThemedSafeView>
			<ThemedText variant="heading">Birdpedia</ThemedText>
			<List table="birds" />
		</ThemedSafeView>
	);
}
