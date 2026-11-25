import { queryKeys } from "@/lib/query-keys";
import { SIGHTING_BASE, USER_ID } from "@/test/fixtures";
import { MOCK_BIRD_ROW } from "@/test/mocks";

describe("queryKeys factory", () => {
	describe("sightings", () => {
		test("returns correct sightings list query key", () => {
			const key = queryKeys.list({ table: "sightings", userId: USER_ID });

			expect(key).toStrictEqual(["sightings", USER_ID, "list"]);
		});
		test("returns correct sighting details query key", () => {
			const key = queryKeys.detail({
				table: "sightings",
				userId: USER_ID,
				rowId: SIGHTING_BASE.$id,
			});

			expect(key).toStrictEqual([
				"sightings",
				USER_ID,
				"detail",
				SIGHTING_BASE.$id,
			]);
		});
	});

	describe("birds", () => {
		test("returns correct birds list query key", () => {
			const key = queryKeys.list({ table: "birds", userId: USER_ID });

			expect(key).toStrictEqual(["birds", "list"]);
		});

		test("returns correct bird details query key", () => {
			const key = queryKeys.detail({
				table: "birds",
				userId: USER_ID,
				rowId: MOCK_BIRD_ROW.$id,
			});

			expect(key).toStrictEqual(["birds", "detail", MOCK_BIRD_ROW.$id]);
		});

		test("returns correct birds list query key without a user", () => {
			const key = queryKeys.list({ table: "birds" });

			expect(key).toStrictEqual(["birds", "list"]);
		});

		test("returns correct bird details query key without a user", () => {
			const key = queryKeys.detail({
				table: "birds",
				rowId: MOCK_BIRD_ROW.$id,
			});

			expect(key).toStrictEqual(["birds", "detail", MOCK_BIRD_ROW.$id]);
		});
	});

	describe("all", () => {
		test.each([
			{ table: "sightings" as const, userId: USER_ID },
			{ table: "birds" as const, userId: undefined },
		])("is a prefix of $table list and detail keys", ({ table, userId }) => {
			const all = queryKeys.all({ table, userId });

			expect(queryKeys.list({ table, userId }).slice(0, all.length)).toEqual(
				all,
			);
			expect(
				queryKeys
					.detail({ table, userId, rowId: SIGHTING_BASE.$id })
					.slice(0, all.length),
			).toEqual(all);
		});
	});
});
