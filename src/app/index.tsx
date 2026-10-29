import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Text>If user is not logged in, show auth links.</Text>
      <Text>If logged in, redirect to Dashboard area.</Text>

      <View>
        <Link href="/(app)/new-sighting">Go to New Sighting</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
