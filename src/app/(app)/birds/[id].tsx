import ThemedSafeView from "@/components/ui/ThemedSafeView";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text } from "react-native";

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
				<Text>Bird Details</Text>
				<Text>Display details of bird with id {id}</Text>
			</ThemedSafeView>
		</React.Fragment>
	);
}
