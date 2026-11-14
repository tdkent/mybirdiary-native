import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarHideOnKeyboard: true,
				tabBarActiveTintColor: "#2563eb",
				tabBarInactiveTintColor: "#64748b",
				tabBarIconStyle: {
					marginTop: 2,
				},
			}}
		>
			<Tabs.Screen
				name="new-sighting"
				options={{
					title: "New Sighting",
					tabBarIcon: ({ color, size }) => (
						<Ionicons color={String(color)} size={size} name="binoculars" />
					),
				}}
			/>

			<Tabs.Screen
				name="sightings"
				options={{
					tabBarIcon: ({ color, size }) => (
						<FontAwesome color={String(color)} size={size} name="book" />
					),
					title: "Sightings",
				}}
			/>

			<Tabs.Screen
				name="birds"
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							color={String(color)}
							size={size}
							name="bird"
						/>
					),
					title: "Birds",
				}}
			/>

			<Tabs.Screen
				name="account"
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							color={String(color)}
							size={size}
							name="account-circle"
						/>
					),
					title: "Account",
				}}
			/>
		</Tabs>
	);
}
