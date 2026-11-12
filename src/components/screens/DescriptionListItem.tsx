import type { DescriptionListItem as DLItem } from "@/types/screen.types";
import { Text, View } from "react-native";

interface Props {
	item: DLItem;
}

export default function DescriptionListItem({ item }: Props) {
	return (
		<View>
			<Text>{item.label}</Text>
			<Text>{item.details}</Text>
		</View>
	);
}
