import type { Bird, DbTables, Sighting } from "@/types/db";
import type { DescriptionListItem } from "@/types/ui";
import type { Models } from "react-native-appwrite";

interface TitleDescriptionListInputs {
	table: DbTables;
	data: Models.DefaultRow;
}

interface TitleDescriptionListOutput {
	descriptionList: DescriptionListItem[];
	headingText: string;
	title: string;
}

/** Get text content for Details component of details screen. */
export function getDetailsScreenText({
	table,
	data,
}: TitleDescriptionListInputs): TitleDescriptionListOutput {
	switch (table) {
		case "birds": {
			const { commonName, scientificName, description } =
				data as unknown as Bird;

			const headingText = `Bird Details: ${commonName}`;

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

			return { descriptionList, headingText, title: commonName };
		}

		case "sightings": {
			const { bird, date, description } = data as unknown as Sighting;

			const headingText = `Sighting Details: ${bird.commonName}`;

			const descriptionList: DescriptionListItem[] = [
				{
					label: "Species",
					details: bird.commonName,
				},
				{
					label: "Date",
					details: new Date(date).toISOString(),
				},
				{
					label: "Description",
					details: description,
				},
			];

			return {
				descriptionList,
				headingText,
				title: `Sighting: ${bird.commonName}`,
			};
		}

		default: {
			throw new Error("Invalid table value!");
		}
	}
}
