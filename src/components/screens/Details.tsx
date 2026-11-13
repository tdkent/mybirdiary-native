import DescriptionList from "@/components/screens/DescriptionList";
import ThemedText from "@/components/ui/ThemedText";
import { getDetailsScreenText } from "@/features/getDetailsScreenText";
import { getDetailsData } from "@/services/api/details";
import type { DbTables } from "@/types/db";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

interface Props {
	queries: string[];
	table: DbTables;
}

/** Renders details screen heading, image and description list. */
export default function Details({ queries, table }: Props) {
	const { id } = useLocalSearchParams();

	const { data, error, isError, isPending } = useQuery({
		queryKey: [table, id],
		queryFn: () => getDetailsData({ queries, rowId: id as string, table }),
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

	const { descriptionList, headingText } = getDetailsScreenText({
		table,
		data,
	});

	return (
		<React.Fragment>
			<ThemedText variant="heading">{headingText}</ThemedText>

			<View>
				<DescriptionList descriptionList={descriptionList} />
			</View>
		</React.Fragment>
	);
}
