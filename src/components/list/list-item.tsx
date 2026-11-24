import { type Href, Link } from "expo-router";
import { View } from "react-native";
import ThemedText from "@/components/ui/themed-text";
import { DISPLAY_MESSAGES } from "@/constants/messages";
import type { RowFor, TableName } from "@/types/db";

interface ItemText {
	href: Href;
	label: string;
}

const itemText: { [K in TableName]: (row: RowFor[K]) => ItemText } = {
	birds: (row) => ({
		href: { pathname: "/(app)/(tabs)/birds/[id]", params: { id: row.$id } },
		label: row.commonName,
	}),
	sightings: (row) => ({
		href: {
			pathname: "/(app)/(tabs)/sightings/[id]",
			params: { id: row.$id },
		},
		label: row.bird?.commonName || DISPLAY_MESSAGES.UNKNOWN_BIRD,
	}),
};

/** Single FlatList item on list screen. */
export default function ListItem<T extends TableName>({
	row,
	table,
}: {
	row: RowFor[T];
	table: T;
}) {
	const text = itemText[table](row);
	return (
		<View>
			<Link href={text.href}>
				<ThemedText>{text.label}</ThemedText>
			</Link>
		</View>
	);
}
