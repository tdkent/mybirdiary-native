import { getDetailsData } from "@/api/details.api";
import DescriptionList from "@/components/screens/DescriptionList";
import ThemedText from "@/components/ui/ThemedText";
import type { Table } from "@/types/api.types";
import { getTitleAndDescriptionList } from "@/utils/getTitleAndDescriptionList";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

interface Props {
	table: Table;
}

export default function Details({ table }: Props) {
	const { id } = useLocalSearchParams();
	const rowId = id as string;

	const { data, error, isError, isPending } = useQuery({
		queryKey: [table, id],
		queryFn: () => getDetailsData({ rowId, table }),
	});

	if (isPending) {
		return <Text>Loading...</Text>;
	}

	if (isError) {
		return <Text>{error.message}</Text>;
	}

	if (!data) {
		return <Text>No data to show.</Text>;
	}

	const { title, descriptionList, headingText } = getTitleAndDescriptionList({
		table,
		data,
	});

	return (
		<React.Fragment>
			<Stack.Screen options={{ title }} />

			<ThemedText variant="heading">{headingText}</ThemedText>

			<View>
				<DescriptionList descriptionList={descriptionList} />
			</View>
		</React.Fragment>
	);
}
