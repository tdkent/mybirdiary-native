import type { Bird, DbTables, Sighting } from "@/types/db";
import { Link } from "expo-router";
import { Text, View } from "react-native";

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
							pathname: "/(app)/birds/[id]",
							params: { id: $id },
						}}
					>
						<Text>{commonName}</Text>
					</Link>
				</View>
			);
		}

		case "sightings": {
			const { $id, birdId } = item as Sighting;

			return (
				<View>
					<Link
						href={{
							pathname: "/(app)/sightings/[id]",
							params: { id: $id },
						}}
					>
						<Text>{birdId}</Text>
					</Link>
				</View>
			);
		}

		default: {
			return (
				<View>
					<Text>Item</Text>
				</View>
			);
		}
	}
}
