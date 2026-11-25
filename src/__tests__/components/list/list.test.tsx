import { useQuery } from "@tanstack/react-query";
import { render } from "@testing-library/react-native";
import List from "@/components/list/list";
import { ERROR_MESSAGES } from "@/constants/messages";
import { BIRD_BLUE_JAY, BIRD_GREEN_HERON, USER_ID } from "@/test/fixtures";
import {
	MOCK_USE_QUERY_ERROR,
	MOCK_USE_QUERY_LOADING,
	MOCK_USE_QUERY_WITH_BIRDS_LIST,
	MOCK_USE_QUERY_WITH_EMPTY_LIST,
} from "@/test/mocks";

// Mock useQuery
const mockUseQuery = jest.mocked(useQuery);

describe("List", () => {
	describe("query states", () => {
		test("renders a loading component", async () => {
			mockUseQuery.mockReturnValue(
				MOCK_USE_QUERY_LOADING as ReturnType<typeof useQuery>,
			);

			const { getByText } = await render(<List table="birds" />);

			expect(getByText(/loading.../i));
		});

		test("displays error message if an error occurs", async () => {
			mockUseQuery.mockReturnValue(
				MOCK_USE_QUERY_ERROR as ReturnType<typeof useQuery>,
			);

			const { getByText } = await render(<List table="birds" />);

			expect(getByText(ERROR_MESSAGES.APPWRITE_UNEXPECTED));
		});

		test("displays alternate text if list contains no items", async () => {
			mockUseQuery.mockReturnValue(
				MOCK_USE_QUERY_WITH_EMPTY_LIST as ReturnType<typeof useQuery>,
			);

			const { getByText } = await render(<List table="birds" />);

			expect(getByText(/no data to show/i));
		});
	});

	describe("birds", () => {
		test("displays list items", async () => {
			mockUseQuery.mockReturnValue(
				MOCK_USE_QUERY_WITH_BIRDS_LIST as ReturnType<typeof useQuery>,
			);

			const { getByText } = await render(<List table="birds" />);

			expect(getByText(BIRD_BLUE_JAY.commonName));
			expect(getByText(BIRD_GREEN_HERON.commonName));
		});

		test("uses the correct cache keys", async () => {
			mockUseQuery.mockReturnValue(
				MOCK_USE_QUERY_WITH_BIRDS_LIST as ReturnType<typeof useQuery>,
			);

			await render(<List table="birds" />);

			expect(mockUseQuery).toHaveBeenCalledWith(
				expect.objectContaining({ queryKey: ["birds", "list"] }),
			);
		});
	});

	describe("sightings", () => {
		test("uses the correct cache keys", async () => {
			mockUseQuery.mockReturnValue(
				MOCK_USE_QUERY_WITH_EMPTY_LIST as ReturnType<typeof useQuery>,
			);

			await render(<List table="sightings" userId={USER_ID} />);

			expect(mockUseQuery).toHaveBeenCalledWith(
				expect.objectContaining({
					queryKey: ["sightings", USER_ID, "list"],
				}),
			);
		});
	});
});
