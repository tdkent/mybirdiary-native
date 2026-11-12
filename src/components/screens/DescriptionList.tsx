import DescriptionListItem from "@/components/screens/DescriptionListItem";
import type { DescriptionListItem as DLItem } from "@/types/screen.types";
import { FlatList, View } from "react-native";

interface Props {
	descriptionList: DLItem[];
}

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
