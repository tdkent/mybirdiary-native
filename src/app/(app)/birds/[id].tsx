import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function BirdDetailsScreen() {
	const { id } = useLocalSearchParams();
	return (
		<React.Fragment>
			<Stack.Screen
				options={{
					title: `Bird ${id}`,
				}}
			/>
			<View style={styles.container}>
				<Text>Bird Details</Text>
				<Text>Display details of bird with id {id}</Text>
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
