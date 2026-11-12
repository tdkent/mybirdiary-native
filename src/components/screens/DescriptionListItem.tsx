import type { DescriptionListItem as DLItem } from "@/types/ui";
import { Text, View } from "react-native";

interface Props {
	item: DLItem;
}

/** Renders a single key-value pair in details screen FlatList. */
export default function DescriptionListItem({ item }: Props) {
	return (
		<View>
			<Text>{item.label}</Text>
			<Text>{item.details}</Text>
		</View>
	);
}
