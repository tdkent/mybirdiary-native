import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function SightingDetailsScreen() {
	const { id } = useLocalSearchParams();
	return (
		<React.Fragment>
			<Stack.Screen
				options={{
					title: `Sighting ${id}`,
				}}
			/>
			<View className="flex-1 items-center justify-center">
				<Text>Sighting Details</Text>
				<Text>Display details of sighting with id {id}</Text>
			</View>
		</React.Fragment>
	);
}
