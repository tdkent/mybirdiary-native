import ThemedSafeView from "@/components/ui/ThemedSafeView";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text } from "react-native";

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
				<Text>Sighting Details</Text>
				<Text>Display details of sighting with id {id}</Text>
			</ThemedSafeView>
		</React.Fragment>
	);
}
