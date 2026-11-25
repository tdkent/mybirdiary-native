import { DISPLAY_MESSAGES } from "@/constants/messages";
import { TABLES } from "@/constants/tables";
import { mockDetailsData } from "@/test/fixtures";
import { MOCK_BIRD_ROW } from "@/test/mocks";
import type { Sighting } from "@/types/db";

const sightingDescription = "Seen wading at the pond";
const sightingRow = {
	$id: "1",
	bird: mockDetailsData,
	description: sightingDescription,
} as unknown as Sighting;

describe("Tables constant", () => {
	describe("birds record", () => {
		test("returns bird list item href and label", () => {
			const { href, label } = TABLES.birds.listItem(MOCK_BIRD_ROW);

			expect(label).toEqual(MOCK_BIRD_ROW.commonName);
			expect(href).toStrictEqual({
				pathname: "/(app)/(tabs)/birds/[id]",
				params: { id: MOCK_BIRD_ROW.$id },
			});
		});
		test("returns bird details heading text and description list", () => {
			const { headingText, descriptionList } =
				TABLES.birds.details(MOCK_BIRD_ROW);

			expect(headingText).toEqual(`Bird Details: ${MOCK_BIRD_ROW.commonName}`);
			expect(descriptionList).toStrictEqual([
				{ label: "Common Name", details: MOCK_BIRD_ROW.commonName },
				{ label: "Scientific Name", details: MOCK_BIRD_ROW.scientificName },
				{ label: "Description", details: MOCK_BIRD_ROW.description },
			]);
		});
	});

	// describe("sightings record", () => {
	// 	test("returns sighting list item href and label", () => {
	// 		const { href, label } = TABLES.sightings.listItem(sightingRow);

	// 		expect(label).toEqual("Green Heron");
	// 		expect(href).toStrictEqual({
	// 			pathname: "/(app)/(tabs)/sightings/[id]",
	// 			params: { id: "1" },
	// 		});
	// 	});

	// 	test("returns sighting heading text and description list", () => {
	// 		const { headingText, descriptionList } =
	// 			TABLES.sightings.details(sightingRow);

	// 		expect(headingText).toEqual("Sighting Details: Green Heron");
	// 		expect(descriptionList).toStrictEqual([
	// 			{ label: "Species", details: commonName },
	// 			{ label: "Description", details: sightingDescription },
	// 		]);
	// 	});

	// 	test("list item with null bird relation shows alternate text", () => {
	// 		const row = { ...sightingRow, bird: null };
	// 		const { label } = TABLES.sightings.listItem(row);

	// 		expect(label).toEqual(DISPLAY_MESSAGES.UNKNOWN_BIRD);
	// 	});

	// 	test("sighting details with null bird relation shows alternate text", () => {
	// 		const row = { ...sightingRow, bird: null };
	// 		const { headingText, descriptionList } = TABLES.sightings.details(row);

	// 		expect(headingText).toEqual(
	// 			`Sighting Details: ${DISPLAY_MESSAGES.UNKNOWN_BIRD}`,
	// 		);
	// 		expect(descriptionList).toStrictEqual([
	// 			{ label: "Species", details: DISPLAY_MESSAGES.UNKNOWN_BIRD },
	// 			{ label: "Description", details: sightingDescription },
	// 		]);
	// 	});

	// 	test("sighting details with no description shows alternate text", () => {
	// 		const row = { ...sightingRow, description: "" };
	// 		const { descriptionList } = TABLES.sightings.details(row);

	// 		expect(descriptionList).toStrictEqual([
	// 			{ label: "Species", details: commonName },
	// 			{ label: "Description", details: DISPLAY_MESSAGES.NO_DESCRIPTION },
	// 		]);
	// 	});
	// });
});
