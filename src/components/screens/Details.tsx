import DescriptionList from "@/components/screens/DescriptionList";
import ThemedText from "@/components/ui/ThemedText";
import { getDetailsScreenText } from "@/features/getDetailsScreenText";
import { getDetailsData } from "@/services/api/details";
import type { Table } from "@/types/db";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

interface Props {
	table: Table;
}

/** Renders details screen heading, image and description list. */
export default function Details({ table }: Props) {
	const { id } = useLocalSearchParams();

	const { data, error, isError, isPending } = useQuery({
		queryKey: [table, id],
		queryFn: () => getDetailsData({ rowId: id as string, table }),
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

	const { title, descriptionList, headingText } = getDetailsScreenText({
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
