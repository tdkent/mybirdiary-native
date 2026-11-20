import type { Models } from "react-native-appwrite";
import { getDetailsScreenText } from "@/components/details/get-details-screen-text";
import { mockDetailsData } from "@/test/fixtures";
import type { DbTables } from "@/types/db";

const { commonName, scientificName, description } = mockDetailsData;

const birdRow = mockDetailsData as unknown as Models.DefaultRow;

const sightingDescription = "Seen wading at the pond";
const sightingRow = {
	$id: "1",
	bird: mockDetailsData,
	description: sightingDescription,
} as unknown as Models.DefaultRow;

describe("getDetailsScreenText", () => {
	test("returns bird heading, title, and description list", () => {
		expect(getDetailsScreenText({ table: "birds", data: birdRow })).toEqual({
			headingText: `Bird Details: ${commonName}`,
			title: commonName,
			descriptionList: [
				{ label: "Common Name", details: commonName },
				{ label: "Scientific Name", details: scientificName },
				{ label: "Description", details: description },
			],
		});
	});

	test("returns sighting heading, title, and description list", () => {
		expect(
			getDetailsScreenText({ table: "sightings", data: sightingRow }),
		).toEqual({
			headingText: `Sighting Details: ${commonName}`,
			title: `Sighting: ${commonName}`,
			descriptionList: [
				{ label: "Species", details: commonName },
				{ label: "Description", details: sightingDescription },
			],
		});
	});

	test("throws for an unknown table", () => {
		expect(() =>
			getDetailsScreenText({
				table: "unknown" as DbTables,
				data: birdRow,
			}),
		).toThrow("Invalid table value!");
	});
});
