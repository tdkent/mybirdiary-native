import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from "expo-router";

export default function AppLayout() {
  return <Tabs>
    <Tabs.Screen name="new-sighting" options={{
      title: "New Sighting",
      tabBarIcon: () => <Ionicons size={28} name="binoculars" />
    }} />
    <Tabs.Screen name="sightings" options={{
      tabBarIcon: () => <FontAwesome size={28} name="book" />,
      title: "Sightings",
     headerShown:false
    }} />
    <Tabs.Screen name="birds" options={{
      tabBarIcon: () => <MaterialCommunityIcons size={28} name="bird" />,
      title: "Birds",
     headerShown:false
    }} />
  </Tabs>
}