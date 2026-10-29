import { Tabs } from "expo-router";

export default function AppLayout() {
  return <Tabs>
    <Tabs.Screen name="new-sighting" options={{
      title: "New Sighting"
    }} />
    <Tabs.Screen name="sightings" options={{
      title: "Sightings",
     headerShown:false
    }} />
  </Tabs>
}