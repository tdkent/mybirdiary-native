import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SightingDetailsScreen() {
	const { id } = useLocalSearchParams();
	return (
		<React.Fragment>
			<Stack.Screen
				options={{
					title: `Sighting ${id}`,
				}}
			/>
			<View style={styles.container}>
				<Text>Sighting Details</Text>
				<Text>Display details of sighting with id {id}</Text>
			</View>
		</React.Fragment>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
