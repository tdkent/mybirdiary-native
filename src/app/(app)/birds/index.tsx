import { getBirds } from "@/api/birds.api";
import ThemedSafeView from "@/components/ui/ThemedSafeView";
import ThemedText from "@/components/ui/ThemedText";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function BirdsScreen() {
	const router = useRouter();

	const { error, isError, isPending } = useQuery({
		queryKey: ["birds"],
		queryFn: getBirds,
	});

	return (
		<ThemedSafeView>
			<ThemedText variant="heading">Birdpedia</ThemedText>
			<ThemedText>
				Display paginated, sortable list of available bird species.
			</ThemedText>
			<ThemedText>Each list item links to bird details page.</ThemedText>

			{isPending && <Text>Loading...</Text>}

			{isError && <Text>{error.message}</Text>}

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
