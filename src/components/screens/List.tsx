import type { AppwriteListQuery } from "@/types/models";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Text, View } from "react-native";

interface Props {
	queryFn: () => void;
	queryKey: "birds";
}

export default function List({ queryFn, queryKey }: Props) {
	const { data, error, isError, isPending } = useQuery({
		queryKey: [queryKey],
		queryFn,
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

	return <View></View>;
}
