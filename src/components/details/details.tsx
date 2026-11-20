import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Text, View } from "react-native";
import DescriptionList from "@/components/details/description-list";
import { getDetailsScreenText } from "@/components/details/get-details-screen-text";
import ThemedText from "@/components/ui/themed-text";
import { getDetailsData } from "@/services/api/details";
import type { DbTables } from "@/types/db";

interface Props {
	table: DbTables;
	userId?: string;
	rowId: string;
	queries: string[];
}

/** Renders details screen heading, image and description list. */
export default function Details({ queries, table, rowId, userId }: Props) {
	const { data, error, isError, isPending } = useQuery({
		queryKey: userId
			? [table, userId, rowId, queries]
			: [table, rowId, queries],
		queryFn: () => getDetailsData({ queries, rowId, table }),
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
