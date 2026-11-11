import type { Bird } from "@/types/models";
import { Text, View } from "react-native";

interface Props {
	item: Bird | object;
	type: "birds";
}

export default function ListItem({ item, type }: Props) {
	if (type === "birds") {
		const { commonName } = item as Bird;

		return (
			<View>
				<Text>{commonName}</Text>
			</View>
		);
	}

	return (
		<View>
			<Text>item</Text>
		</View>
	);
}
