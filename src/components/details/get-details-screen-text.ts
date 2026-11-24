import { DISPLAY_MESSAGES } from "@/constants/messages";
import type { RowFor, TableName } from "@/types/db";
import type { DescriptionListItem } from "@/types/ui";

export const itemText: {
	[K in TableName]: (row: RowFor[K]) => {
		headingText: string;
		descriptionList: DescriptionListItem[];
	};
} = {
	birds: ({ commonName, scientificName, description }) => ({
		headingText: `Bird Details: ${commonName}`,
		descriptionList: [
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
		],
	}),
	sightings: ({ bird, description }) => ({
		headingText: `Sighting Details: ${bird?.commonName ?? DISPLAY_MESSAGES.UNKNOWN_BIRD}`,
		descriptionList: [
			{
				label: "Species",
				details: bird ? bird.commonName : DISPLAY_MESSAGES.UNKNOWN_BIRD,
			},
			{
				label: "Description",
				details: description || "N/A",
			},
		],
	}),
};
