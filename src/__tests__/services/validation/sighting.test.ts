import { ERROR_MESSAGES } from "@/constants/messages";
import { SightingDate } from "@/services/validation/sighting";

const NOW = new Date(2026, 10, 27, 12, 0);

describe("SightingSchema", () => {
	describe("SightingDate validator", () => {
		beforeEach(() => {
			// Simulate date to keep precise control and avoid edge cases
			jest.useFakeTimers({ now: NOW });
		});

		afterEach(() => {
			jest.useRealTimers();
		});

		test("rejects one minute before start of date range", async () => {
			await expect(
				SightingDate.validate(new Date(2025, 10, 26, 23, 59)),
			).rejects.toThrow(ERROR_MESSAGES.INVALID_DATE);
		});

		test("rejects at midnight of the next day", async () => {
			await expect(
				SightingDate.validate(new Date(2026, 10, 28, 0, 0)),
			).rejects.toThrow(ERROR_MESSAGES.INVALID_DATE);
		});

		test.each([
			["start of valid range", new Date(2025, 10, 27, 0, 0)],
			["now", NOW],
			["end of valid range", new Date(2026, 10, 27, 23, 59)],
		])("accepts %s", async (_, date) => {
			await expect(SightingDate.validate(date)).resolves.toEqual(date);
		});
	});
});
