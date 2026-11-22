import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FlatList, View } from "react-native";
import ListItem from "@/components/list/list-item";
import ThemedText from "@/components/ui/themed-text";
import { getListData } from "@/services/api/list";
import type { AppwriteListQuery, DbTables } from "@/types/db";

interface Props {
	queryKey: DbTables;
	queries: string[];
	userId?: string;
}

/** Renders list screen FlatList component. */
export default function List({ queryKey, queries, userId }: Props) {
	const { data, error, isError, isPending } = useQuery({
		queryKey: userId ? [queryKey, userId] : [queryKey],
		queryFn: () => getListData({ queryKey, queries }),
		placeholderData: keepPreviousData,
	});

	if (isPending) {
		return <ThemedText>Loading...</ThemedText>;
	}

	if (isError) {
		return <ThemedText>{error.message}</ThemedText>;
	}

	const fetchedData = data as unknown as AppwriteListQuery;
	const rows = fetchedData.rows;

	if (!rows.length) {
		return <ThemedText>No data to show.</ThemedText>;
	}

	return (
		<View>
			<FlatList
				data={rows}
				initialNumToRender={10}
				ItemSeparatorComponent={<ThemedText>---------</ThemedText>}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => <ListItem item={item} type={queryKey} />}
			/>
		</View>
	);
}
