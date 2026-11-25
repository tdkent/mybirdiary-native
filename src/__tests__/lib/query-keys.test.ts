import { queryKeys } from "@/lib/query-keys";
import { testUserId } from "@/test/fixtures";

const rowId = "456";

describe("queryKeys factory", () => {
	describe("sightings", () => {
		test("returns correct sightings list query key", () => {
			const key = queryKeys.list({ table: "sightings", userId: testUserId });

			expect(key).toStrictEqual(["sightings", testUserId, "list"]);
		});
		test("returns correct sighting details query key", () => {
			const key = queryKeys.detail({
				table: "sightings",
				userId: testUserId,
				rowId,
			});

			expect(key).toStrictEqual(["sightings", testUserId, "detail", rowId]);
		});
	});

	describe("birds", () => {
		test("returns correct birds list query key", () => {
			const key = queryKeys.list({ table: "birds", userId: testUserId });

			expect(key).toStrictEqual(["birds", "list"]);
		});

		test("returns correct bird details query key", () => {
			const key = queryKeys.detail({
				table: "birds",
				userId: testUserId,
				rowId,
			});

			expect(key).toStrictEqual(["birds", "detail", rowId]);
		});

		test("returns correct birds list query key without a user", () => {
			const key = queryKeys.list({ table: "birds" });

			expect(key).toStrictEqual(["birds", "list"]);
		});

		test("returns correct bird details query key without a user", () => {
			const key = queryKeys.detail({ table: "birds", rowId });

			expect(key).toStrictEqual(["birds", "detail", rowId]);
		});
	});

	describe("all", () => {
		test.each([
			{ table: "sightings" as const, userId: testUserId },
			{ table: "birds" as const, userId: undefined },
		])("is a prefix of $table list and detail keys", ({ table, userId }) => {
			const all = queryKeys.all({ table, userId });

			expect(queryKeys.list({ table, userId }).slice(0, all.length)).toEqual(
				all,
			);
			expect(
				queryKeys.detail({ table, userId, rowId }).slice(0, all.length),
			).toEqual(all);
		});
	});
});
