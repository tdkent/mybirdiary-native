import ThemedSafeView from "@/components/ui/ThemedSafeView";
import ThemedText from "@/components/ui/ThemedText";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

export default function SightingDetailsScreen() {
	const { id } = useLocalSearchParams();
	return (
		<React.Fragment>
			<Stack.Screen
				options={{
					title: `Sighting ${id}`,
				}}
			/>
			<ThemedSafeView>
				<ThemedText variant="heading">Sighting Details</ThemedText>
				<ThemedText>Display details of sighting with id {id}</ThemedText>
			</ThemedSafeView>
		</React.Fragment>
	);
}
