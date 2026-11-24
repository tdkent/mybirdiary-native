import { Link } from "expo-router";
import { View } from "react-native";
import ThemedText from "@/components/ui/themed-text";
import { TABLES } from "@/constants/tables";
import type { RowFor, TableName } from "@/types/db";

/** Single FlatList item on list screen. */
export default function ListItem<T extends TableName>({
	row,
	table,
}: {
	row: RowFor[T];
	table: T;
}) {
	const { href, label } = TABLES[table].listItem(row);
	return (
		<View>
			<Link href={href}>
				<ThemedText>{label}</ThemedText>
			</Link>
		</View>
	);
}
