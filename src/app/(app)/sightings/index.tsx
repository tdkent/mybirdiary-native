import { StyleSheet, Text, View } from "react-native";

export default function SightingsScreen() {
  return <View style={styles.container}><Text>Sightings</Text>
  <Text>Display paginated, sortable list of user's bird sightings.</Text>
  <Text>Each list item links to sighting details page.</Text>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});