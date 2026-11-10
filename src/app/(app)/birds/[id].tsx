import ThemedSafeView from "@/components/ui/ThemedSafeView";
import ThemedText from "@/components/ui/ThemedText";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

export default function BirdDetailsScreen() {
	const { id } = useLocalSearchParams();
	return (
		<React.Fragment>
			<Stack.Screen
				options={{
					title: `Bird ${id}`,
				}}
			/>
			<ThemedSafeView>
				<ThemedText variant="heading">Bird Details</ThemedText>
				<ThemedText>Display details of bird with id {id}</ThemedText>
			</ThemedSafeView>
		</React.Fragment>
	);
}
