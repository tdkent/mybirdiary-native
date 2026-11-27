import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FlatList } from "react-native";
import ListItem from "@/components/list/list-item";
import ThemedText from "@/components/ui/themed-text";
import { queryKeys } from "@/lib/query-keys";
import { getListData } from "@/services/api/list";
import type { TableName } from "@/types/db";

// TODO: force userid with 'sightings' table

/** Renders list screen FlatList component. */
export default function List<T extends TableName>({
	table,
	userId,
}: {
	table: T;
	userId?: string;
}) {
	const { data, error, isError, isPending } = useQuery({
		queryKey: queryKeys.list({ table, userId }),
		queryFn: () => getListData(table),
		placeholderData: keepPreviousData,
	});

	if (isPending) {
		return <ThemedText>Loading...</ThemedText>;
	}

	if (isError) {
		return <ThemedText>{error.message}</ThemedText>;
	}

	const { rows } = data;

	if (!rows.length) {
		return <ThemedText>No data to show.</ThemedText>;
	}

	return (
		<FlatList
			data={rows}
			initialNumToRender={10}
			keyExtractor={(row) => row.$id}
			renderItem={({ item }) => <ListItem row={item} table={table} />}
		/>
	);
}
