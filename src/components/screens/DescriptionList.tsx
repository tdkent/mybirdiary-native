import DescriptionListItem from "@/components/screens/DescriptionListItem";
import type { DescriptionListItem as DLItem } from "@/types/ui";
import { FlatList, View } from "react-native";

interface Props {
	descriptionList: DLItem[];
}

/** Renders a FlatList of key-value pairs for a details screen. */
export default function DescriptionList({ descriptionList }: Props) {
	return (
		<View testID="description-list">
			<FlatList
				data={descriptionList}
				keyExtractor={(item) => item.label}
				renderItem={({ item }) => <DescriptionListItem item={item} />}
			/>
		</View>
	);
}
