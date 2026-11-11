import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Text, View } from "react-native";

interface Props {
	queryFn: () => void;
	queryKey: "birds";
}

export default function List({ queryFn, queryKey }: Props) {
	const { error, isError, isPending } = useQuery({
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

	return (
		<View>
			<Text>List</Text>
		</View>
	);
}
