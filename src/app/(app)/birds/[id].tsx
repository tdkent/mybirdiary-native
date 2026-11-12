import Details from "@/components/screens/Details";
import ThemedSafeView from "@/components/ui/ThemedSafeView";
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
				<Details />
			</ThemedSafeView>
		</React.Fragment>
	);
}
