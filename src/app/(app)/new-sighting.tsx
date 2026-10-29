import { StyleSheet, Text, View } from "react-native";

export default function NewSightingScreen() {
  return <View style={styles.container}><Text>New Sighting</Text></View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});