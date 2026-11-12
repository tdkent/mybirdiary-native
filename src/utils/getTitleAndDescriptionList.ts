import type { Table } from "@/types/api.types";
import type { Bird } from "@/types/models";
import type { DescriptionListItem } from "@/types/screen.types";
import type { Models } from "react-native-appwrite";

interface TitleDescriptionListInputs {
	table: Table;
	data: Models.DefaultRow;
}

interface TitleDescriptionListOutput {
	title: string;
	descriptionList: DescriptionListItem[];
}

/** Get title string and array of row values. */
export function getTitleAndDescriptionList({
	table,
	data,
}: TitleDescriptionListInputs): TitleDescriptionListOutput {
	switch (table) {
		case "birds": {
			const { commonName, scientificName, description } =
				data as unknown as Bird;

			const descriptionList: DescriptionListItem[] = [
				{
					label: "Common Name",
					details: commonName,
				},
				{
					label: "Scientific Name",
					details: scientificName,
				},
				{
					label: "Description",
					details: description,
				},
			];

			return { title: commonName, descriptionList };
		}

		default: {
			throw new Error("Invalid table value!");
		}
	}
}
