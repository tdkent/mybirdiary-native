import { StyleSheet, Text, View } from "react-native";

export default function NewSightingScreen() {
  return <View style={styles.container}><Text>New Sighting</Text>
  <Text>Basic form to capture bird species, date, description.</Text>
  <Text>Add sighting to database, display on Sightings page.</Text>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});