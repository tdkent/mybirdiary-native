import type { Bird } from "@/types/db";
import { Link } from "expo-router";
import { Text, View } from "react-native";

interface Props {
	item: Bird | object;
	type: "birds";
}

/** Single FlatList item on list screen. */
export default function ListItem({ item, type }: Props) {
	if (type === "birds") {
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

	return (
		<View>
			<Text>item</Text>
		</View>
	);
}
