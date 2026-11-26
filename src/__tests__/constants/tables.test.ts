import { DISPLAY_MESSAGES } from "@/constants/messages";
import { TABLES } from "@/constants/tables";
import {
	MOCK_BIRD_ROW,
	MOCK_SIGHTING_ROW,
	MOCK_SIGHTING_ROW_WITH_EMPTY_DESCRIPTION,
	MOCK_SIGHTING_ROW_WITH_NULL_BIRD,
} from "@/test/mocks";

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

	describe("sightings record", () => {
		test("returns sighting list item href and label", () => {
			const { href, label } = TABLES.sightings.listItem(MOCK_SIGHTING_ROW);

			expect(label).toEqual(MOCK_SIGHTING_ROW.bird?.commonName);
			expect(href).toStrictEqual({
				pathname: "/(app)/(tabs)/sightings/[id]",
				params: { id: MOCK_SIGHTING_ROW.$id },
			});
		});

		test("returns sighting heading text and description list", () => {
			const { headingText, descriptionList } =
				TABLES.sightings.details(MOCK_SIGHTING_ROW);

			expect(headingText).toEqual(
				`Sighting Details: ${MOCK_SIGHTING_ROW.bird?.commonName}`,
			);
			expect(descriptionList).toStrictEqual([
				{ label: "Species", details: MOCK_SIGHTING_ROW.bird?.commonName },
				{ label: "Description", details: MOCK_SIGHTING_ROW.description },
			]);
		});

		test("list item with null bird relation shows alternate text", () => {
			const { label } = TABLES.sightings.listItem(
				MOCK_SIGHTING_ROW_WITH_NULL_BIRD,
			);

			expect(label).toEqual(DISPLAY_MESSAGES.UNKNOWN_BIRD);
		});

		test("sighting details with null bird relation shows alternate text", () => {
			const { headingText, descriptionList } = TABLES.sightings.details(
				MOCK_SIGHTING_ROW_WITH_NULL_BIRD,
			);

			expect(headingText).toEqual(
				`Sighting Details: ${DISPLAY_MESSAGES.UNKNOWN_BIRD}`,
			);
			expect(descriptionList).toStrictEqual([
				{ label: "Species", details: DISPLAY_MESSAGES.UNKNOWN_BIRD },
				{
					label: "Description",
					details: MOCK_SIGHTING_ROW_WITH_NULL_BIRD.description,
				},
			]);
		});

		test("sighting details with no description shows alternate text", () => {
			const { descriptionList } = TABLES.sightings.details(
				MOCK_SIGHTING_ROW_WITH_EMPTY_DESCRIPTION,
			);

			expect(descriptionList).toStrictEqual([
				{
					label: "Species",
					details: MOCK_SIGHTING_ROW_WITH_EMPTY_DESCRIPTION.bird?.commonName,
				},
				{ label: "Description", details: DISPLAY_MESSAGES.NO_DESCRIPTION },
			]);
		});
	});
});
