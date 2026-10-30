import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function BirdDetailsScreen() {
	const { id } = useLocalSearchParams();
	return (
		<React.Fragment>
			<Stack.Screen
				options={{
					title: `Bird ${id}`,
				}}
			/>
			<View className="flex-1 items-center justify-center">
				<Text>Bird Details</Text>
				<Text>Display details of bird with id {id}</Text>
			</View>
		</React.Fragment>
	);
}
