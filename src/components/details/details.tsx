import { useQuery } from "@tanstack/react-query";
import React from "react";
import DescriptionList from "@/components/details/description-list";
import { itemText } from "@/components/details/get-details-screen-text";
import ThemedText from "@/components/ui/themed-text";
import { getDetailsData } from "@/services/api/details";
import type { DbTables } from "@/types/db";

/** Renders details screen heading, image and description list. */
export default function Details<T extends DbTables>({
	queries,
	table,
	rowId,
	userId,
}: {
	table: T;
	userId?: string;
	rowId: string;
	queries: string[];
}) {
	const { data, error, isError, isPending } = useQuery({
		queryKey: userId
			? [table, userId, rowId, queries]
			: [table, rowId, queries],
		queryFn: () => getDetailsData({ queries, rowId, table }),
	});

	if (isPending) {
		return <ThemedText>Loading...</ThemedText>;
	}

	if (isError) {
		return <ThemedText>{error.message}</ThemedText>;
	}

	if (!data) {
		return <ThemedText>No data to show.</ThemedText>;
	}

	const { headingText, descriptionList } = itemText[table](data);

	return (
		<React.Fragment>
			<ThemedText variant="heading">{headingText}</ThemedText>
			<DescriptionList descriptionList={descriptionList} />
		</React.Fragment>
	);
}
