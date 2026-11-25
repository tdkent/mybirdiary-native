import { useQuery } from "@tanstack/react-query";
import { render } from "@testing-library/react-native";
import Details from "@/components/details/details";
import { ERROR_MESSAGES } from "@/constants/messages";
import {
	MOCK_DEFAULT_USE_QUERY,
	MOCK_USE_QUERY_ERROR,
	MOCK_USE_QUERY_LOADING,
	MOCK_USE_QUERY_WITH_BIRD_ROW,
} from "@/test/mocks";

const mockUseQuery = jest.mocked(useQuery);

describe("Details", () => {
	describe("query states", () => {
		test("renders a loading component", async () => {
			mockUseQuery.mockReturnValue(
				MOCK_USE_QUERY_LOADING as ReturnType<typeof useQuery>,
			);

			const { getByText } = await render(<Details table="birds" rowId="" />);

			expect(getByText(/loading.../i));
		});

		test("displays error message if an error occurs", async () => {
			mockUseQuery.mockReturnValue(
				MOCK_USE_QUERY_ERROR as ReturnType<typeof useQuery>,
			);

			const { getByText } = await render(<Details table="birds" rowId="" />);

			expect(getByText(ERROR_MESSAGES.APPWRITE_UNEXPECTED));
		});

		test("displays alternate text if return data is undefined", async () => {
			mockUseQuery.mockReturnValue(
				MOCK_DEFAULT_USE_QUERY as ReturnType<typeof useQuery>,
			);

			const { getByText } = await render(<Details table="birds" rowId="" />);

			expect(getByText(/no data to show/i));
		});
	});

	describe("birds", () => {
		test("displays description list component if valid data is returned", async () => {
			mockUseQuery.mockReturnValue(
				MOCK_USE_QUERY_WITH_BIRD_ROW as ReturnType<typeof useQuery>,
			);

			const { getByTestId } = await render(<Details table="birds" rowId="" />);

			expect(getByTestId(/description-list/i));
		});

		test("uses the correct cache keys", async () => {
			mockUseQuery.mockReturnValue(
				MOCK_USE_QUERY_WITH_BIRD_ROW as ReturnType<typeof useQuery>,
			);

			await render(<Details table="birds" rowId="456" />);

			expect(mockUseQuery).toHaveBeenCalledWith(
				expect.objectContaining({ queryKey: ["birds", "detail", "456"] }),
			);
		});
	});

	describe("sightings", () => {
		test("uses the correct cache keys", async () => {
			mockUseQuery.mockReturnValue(
				MOCK_USE_QUERY_WITH_BIRD_ROW as ReturnType<typeof useQuery>,
			);

			await render(<Details table="sightings" userId="123" rowId="456" />);

			expect(mockUseQuery).toHaveBeenCalledWith(
				expect.objectContaining({
					queryKey: ["sightings", "123", "detail", "456"],
				}),
			);
		});
	});
});
