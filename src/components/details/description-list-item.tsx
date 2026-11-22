import { View } from "react-native";
import ThemedText from "@/components/ui/themed-text";
import type { DescriptionListItem as DLItem } from "@/types/ui";

interface Props {
	item: DLItem;
}

/** Renders a single key-value pair in details screen FlatList. */
export default function DescriptionListItem({ item }: Props) {
	return (
		<View>
			<ThemedText>{item.label}</ThemedText>
			<ThemedText>{item.details}</ThemedText>
		</View>
	);
}
