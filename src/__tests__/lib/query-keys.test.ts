import { queryKeys } from "@/lib/query-keys";
import { SIGHTING_WITH_NULL_BIRD, USER_ID } from "@/test/fixtures";

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
				rowId: SIGHTING_WITH_NULL_BIRD.$id,
			});

			expect(key).toStrictEqual([
				"sightings",
				USER_ID,
				"detail",
				SIGHTING_WITH_NULL_BIRD.$id,
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
				rowId: SIGHTING_WITH_NULL_BIRD.$id,
			});

			expect(key).toStrictEqual([
				"birds",
				"detail",
				SIGHTING_WITH_NULL_BIRD.$id,
			]);
		});

		test("returns correct birds list query key without a user", () => {
			const key = queryKeys.list({ table: "birds" });

			expect(key).toStrictEqual(["birds", "list"]);
		});

		test("returns correct bird details query key without a user", () => {
			const key = queryKeys.detail({
				table: "birds",
				rowId: SIGHTING_WITH_NULL_BIRD.$id,
			});

			expect(key).toStrictEqual([
				"birds",
				"detail",
				SIGHTING_WITH_NULL_BIRD.$id,
			]);
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
					.detail({ table, userId, rowId: SIGHTING_WITH_NULL_BIRD.$id })
					.slice(0, all.length),
			).toEqual(all);
		});
	});
});
