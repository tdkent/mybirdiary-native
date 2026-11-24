import type { Href } from "expo-router";
import { CONFIG } from "@/constants/config";
import { DISPLAY_MESSAGES } from "@/constants/messages";
import type { RowFor, TableName } from "@/types/db";
import type { DescriptionListItem } from "@/types/ui";

interface TableConfig<K extends TableName> {
	tableId: string;
	userScoped: boolean;
	selectQueries: string[];
	listItem: (row: RowFor[K]) => {
		href: Href;
		label: string;
	};
	details: (row: RowFor[K]) => {
		headingText: string;
		descriptionList: DescriptionListItem[];
	};
}

export const TABLES: { [K in TableName]: TableConfig<K> } = {
	birds: {
		tableId: CONFIG.BIRDS_TABLE_ID,
		userScoped: false,
		selectQueries: ["*"],
		listItem: (row) => ({
			href: { pathname: "/(app)/(tabs)/birds/[id]", params: { id: row.$id } },
			label: row.commonName,
		}),
		details: ({ commonName, scientificName, description }) => ({
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
	},
	sightings: {
		tableId: CONFIG.SIGHTINGS_TABLE_ID,
		userScoped: true,
		selectQueries: ["*", "bird.*"],
		listItem: (row) => ({
			href: {
				pathname: "/(app)/(tabs)/sightings/[id]",
				params: { id: row.$id },
			},
			label: row.bird?.commonName || DISPLAY_MESSAGES.UNKNOWN_BIRD,
		}),
		details: ({ bird, description }) => ({
			headingText: `Sighting Details: ${bird?.commonName ?? DISPLAY_MESSAGES.UNKNOWN_BIRD}`,
			descriptionList: [
				{
					label: "Species",
					details: bird ? bird.commonName : DISPLAY_MESSAGES.UNKNOWN_BIRD,
				},
				{
					label: "Description",
					details: description || DISPLAY_MESSAGES.NO_DESCRIPTION,
				},
			],
		}),
	},
};
