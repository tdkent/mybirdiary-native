import { Link } from "expo-router";
import { View } from "react-native";
import ThemedText from "@/components/ui/themed-text";
import type { Bird, DbTables, Sighting } from "@/types/db";

interface Props {
	item: Bird | object;
	type: DbTables;
}

/** Single FlatList item on list screen. */
export default function ListItem({ item, type }: Props) {
	switch (type) {
		case "birds": {
			const { $id, commonName } = item as Bird;

			return (
				<View>
					<Link
						href={{
							pathname: "/(app)/(tabs)/birds/[id]",
							params: { id: $id },
						}}
					>
						<ThemedText>{commonName}</ThemedText>
					</Link>
				</View>
			);
		}

		case "sightings": {
			const { $id, bird } = item as Sighting;

			return (
				<View>
					<Link
						href={{
							pathname: "/(app)/(tabs)/sightings/[id]",
							params: { id: $id },
						}}
					>
						<ThemedText>{bird.commonName}</ThemedText>
					</Link>
				</View>
			);
		}

		default: {
			return (
				<View>
					<ThemedText>Item</ThemedText>
				</View>
			);
		}
	}
}
