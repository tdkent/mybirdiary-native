import Details from "@/components/details/details";
import { ERROR_MESSAGES } from "@/constants/messages";
import { getDetailsData } from "@/services/api/details";
import { USER_ID } from "@/test/fixtures";
import { MOCK_BIRD_ROW, MOCK_SIGHTING_ROW } from "@/test/mocks";
import { renderWithClient } from "@/test/query-client";

jest.mock("@/services/api/details");

const mockGetDetailsData = jest.mocked(getDetailsData);

describe("Details", () => {
	describe("query states", () => {
		test("renders a loading component", async () => {
			mockGetDetailsData.mockReturnValue(new Promise(() => {}));

			const { getByText } = await renderWithClient(
				<Details table="birds" rowId={MOCK_BIRD_ROW.$id} />,
			);

			expect(getByText(/loading.../i)).toBeOnTheScreen();
		});

		test("displays error message if an error occurs", async () => {
			mockGetDetailsData.mockRejectedValue(
				new Error(ERROR_MESSAGES.APPWRITE_UNEXPECTED),
			);

			const { findByText } = await renderWithClient(
				<Details table="birds" rowId={MOCK_BIRD_ROW.$id} />,
			);

			expect(
				await findByText(ERROR_MESSAGES.APPWRITE_UNEXPECTED),
			).toBeOnTheScreen();
		});
	});

	describe("birds", () => {
		test("displays description list component if valid data is returned", async () => {
			mockGetDetailsData.mockResolvedValue(MOCK_BIRD_ROW);

			const { findByTestId } = await renderWithClient(
				<Details table="birds" rowId={MOCK_BIRD_ROW.$id} />,
			);

			expect(await findByTestId(/description-list/i)).toBeOnTheScreen();
			expect(mockGetDetailsData).toHaveBeenCalledWith({
				table: "birds",
				rowId: MOCK_BIRD_ROW.$id,
			});
		});

		test("uses the correct cache keys", async () => {
			mockGetDetailsData.mockResolvedValue(MOCK_BIRD_ROW);

			const { findByTestId, queryClient } = await renderWithClient(
				<Details table="birds" rowId={MOCK_BIRD_ROW.$id} />,
			);
			await findByTestId(/description-list/i);

			expect(
				queryClient.getQueryData(["birds", "detail", MOCK_BIRD_ROW.$id]),
			).toEqual(MOCK_BIRD_ROW);
		});
	});

	describe("sightings", () => {
		test("displays description list component if valid data is returned", async () => {
			mockGetDetailsData.mockResolvedValue(MOCK_SIGHTING_ROW);

			const { findByTestId } = await renderWithClient(
				<Details
					table="sightings"
					userId={USER_ID}
					rowId={MOCK_SIGHTING_ROW.$id}
				/>,
			);

			expect(await findByTestId(/description-list/i)).toBeOnTheScreen();
		});

		test("uses the correct cache keys", async () => {
			mockGetDetailsData.mockResolvedValue(MOCK_SIGHTING_ROW);

			const { findByTestId, queryClient } = await renderWithClient(
				<Details
					table="sightings"
					userId={USER_ID}
					rowId={MOCK_SIGHTING_ROW.$id}
				/>,
			);
			await findByTestId(/description-list/i);

			expect(
				queryClient.getQueryData([
					"sightings",
					USER_ID,
					"detail",
					MOCK_SIGHTING_ROW.$id,
				]),
			).toEqual(MOCK_SIGHTING_ROW);
		});
	});
});
