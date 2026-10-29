import { Stack } from "expo-router";

export default function BirdsLayout() {
  return <Stack>
    <Stack.Screen name="index" options={{
      title: "Birdpedia"
    }} />
    <Stack.Screen name="[id]" options={{
      headerBackButtonDisplayMode: 'minimal',
    }} />
  </Stack>
}