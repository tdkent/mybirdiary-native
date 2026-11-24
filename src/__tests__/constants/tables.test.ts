import { TABLES } from "@/constants/tables";
import { mockDetailsData } from "@/test/fixtures";
import type { Bird, Sighting } from "@/types/db";

const { commonName, scientificName, description } = mockDetailsData;

const birdRow = mockDetailsData as unknown as Bird;

const sightingDescription = "Seen wading at the pond";
const sightingRow = {
	$id: "1",
	bird: mockDetailsData,
	description: sightingDescription,
} as unknown as Sighting;

describe("TABLES record", () => {
	test("returns bird heading, title, and description list", () => {
		const { headingText, descriptionList } = TABLES.birds.details(birdRow);

		expect(headingText).toEqual("Bird Details: Green Heron");
		expect(descriptionList).toStrictEqual([
			{ label: "Common Name", details: commonName },
			{ label: "Scientific Name", details: scientificName },
			{ label: "Description", details: description },
		]);
	});

	test("returns sighting heading, title, and description list", () => {
		const { headingText, descriptionList } =
			TABLES.sightings.details(sightingRow);

		expect(headingText).toEqual("Sighting Details: Green Heron");
		expect(descriptionList).toStrictEqual([
			{ label: "Species", details: commonName },
			{ label: "Description", details: sightingDescription },
		]);
	});
});
