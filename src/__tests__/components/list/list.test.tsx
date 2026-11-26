import List from "@/components/list/list";
import { ERROR_MESSAGES } from "@/constants/messages";
import { getListData } from "@/services/api/list";
import { BIRD_BLUE_JAY, BIRD_GREEN_HERON, USER_ID } from "@/test/fixtures";
import {
	MOCK_APPWRITE_LIST_BIRDS,
	MOCK_APPWRITE_LIST_SIGHTINGS,
	MOCK_EMPTY_APPWRITE_LIST,
} from "@/test/mocks";
import { renderWithClient } from "@/test/query-client";

jest.mock("@/services/api/list");

const mockGetListData = jest.mocked(getListData);

describe("List", () => {
	describe("query states", () => {
		test("renders a loading component", async () => {
			mockGetListData.mockReturnValue(new Promise(() => {}));

			const { getByText } = await renderWithClient(<List table="birds" />);

			expect(getByText(/loading.../i)).toBeOnTheScreen();
		});

		test("displays error message if an error occurs", async () => {
			mockGetListData.mockRejectedValue(
				new Error(ERROR_MESSAGES.APPWRITE_UNEXPECTED),
			);

			const { findByText } = await renderWithClient(<List table="birds" />);

			expect(
				await findByText(ERROR_MESSAGES.APPWRITE_UNEXPECTED),
			).toBeOnTheScreen();
		});

		test("displays alternate text if list contains no items", async () => {
			mockGetListData.mockResolvedValue(MOCK_EMPTY_APPWRITE_LIST as never);

			const { findByText } = await renderWithClient(<List table="birds" />);

			expect(await findByText(/no data to show/i)).toBeOnTheScreen();
		});
	});

	describe("birds", () => {
		test("displays list items", async () => {
			mockGetListData.mockResolvedValue(MOCK_APPWRITE_LIST_BIRDS as never);

			const { findByText, getByText } = await renderWithClient(
				<List table="birds" />,
			);

			expect(await findByText(BIRD_BLUE_JAY.commonName)).toBeOnTheScreen();
			expect(getByText(BIRD_GREEN_HERON.commonName)).toBeOnTheScreen();
			expect(mockGetListData).toHaveBeenCalledWith("birds");
		});

		test("uses the correct cache keys", async () => {
			mockGetListData.mockResolvedValue(MOCK_APPWRITE_LIST_BIRDS as never);

			const { findByText, queryClient } = await renderWithClient(
				<List table="birds" />,
			);
			await findByText(BIRD_BLUE_JAY.commonName);

			expect(queryClient.getQueryData(["birds", "list"])).toEqual(
				MOCK_APPWRITE_LIST_BIRDS,
			);
		});
	});

	describe("sightings", () => {
		test("uses the correct cache keys", async () => {
			mockGetListData.mockResolvedValue(MOCK_APPWRITE_LIST_SIGHTINGS as never);

			const { findByText, queryClient } = await renderWithClient(
				<List table="sightings" userId={USER_ID} />,
			);
			await findByText(BIRD_GREEN_HERON.commonName);

			expect(mockGetListData).toHaveBeenCalledWith("sightings");
			expect(queryClient.getQueryData(["sightings", USER_ID, "list"])).toEqual(
				MOCK_APPWRITE_LIST_SIGHTINGS,
			);
		});
	});
});
