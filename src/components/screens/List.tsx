import ListItem from "@/components/screens/ListItem";
import { getListData } from "@/services/api/list";
import type { AppwriteListQuery, DbTables } from "@/types/db";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FlatList, Text, View } from "react-native";

interface Props {
	queryKey: DbTables;
}

/** Renders list screen FlatList component. */
export default function List({ queryKey }: Props) {
	const { data, error, isError, isPending } = useQuery({
		queryKey: [queryKey],
		queryFn: () => getListData(queryKey),
		placeholderData: keepPreviousData,
	});

	if (isPending) {
		return <Text>Loading...</Text>;
	}

	if (isError) {
		return <Text>{error.message}</Text>;
	}

	const fetchedData = data as unknown as AppwriteListQuery;
	const rows = fetchedData.rows;

	if (!rows.length) {
		return <Text>No data to show.</Text>;
	}

	return (
		<View>
			<FlatList
				data={rows}
				initialNumToRender={10}
				ItemSeparatorComponent={<Text>---------</Text>}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => <ListItem item={item} type={queryKey} />}
			/>
		</View>
	);
}
