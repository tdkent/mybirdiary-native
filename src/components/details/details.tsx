import { useQuery } from "@tanstack/react-query";
import React from "react";
import DescriptionList from "@/components/details/description-list";
import ThemedText from "@/components/ui/themed-text";
import { TABLES } from "@/constants/tables";
import { queryKeys } from "@/lib/query-keys";
import { getDetailsData } from "@/services/api/details";
import type { TableName } from "@/types/db";

/** Renders details screen heading, image and description list. */
export default function Details<T extends TableName>({
	table,
	rowId,
	userId,
}: {
	table: T;
	userId?: string;
	rowId: string;
}) {
	const { data, error, isError, isPending } = useQuery({
		queryKey: queryKeys.detail({ table, userId, rowId }),
		queryFn: () =>
			getDetailsData({
				table,
				rowId,
			}),
	});

	if (isPending) {
		return <ThemedText>Loading...</ThemedText>;
	}

	if (isError) {
		return <ThemedText>{error.message}</ThemedText>;
	}

	const { headingText, descriptionList } = TABLES[table].details(data);

	return (
		<React.Fragment>
			<ThemedText variant="heading">{headingText}</ThemedText>
			<DescriptionList descriptionList={descriptionList} />
		</React.Fragment>
	);
}
