import { screen, userEvent } from "@testing-library/react-native";
import { renderRouter } from "expo-router/build/testing-library/index.js";
import BirdsScreen from "@/app/(app)/(tabs)/birds";
import BirdDetailsScreen from "@/app/(app)/(tabs)/birds/[id]";
import { getDetailsData } from "@/services/api/details";
import { getListData } from "@/services/api/list";
import { BIRD_BLUE_JAY } from "@/test/fixtures";
import {
	MOCK_APPWRITE_LIST_BIRDS,
	MOCK_BIRD_ROW,
	MOCK_EMPTY_APPWRITE_LIST,
} from "@/test/mocks";
import {
	createQueryWrapper,
	createTestQueryClient,
	renderWithClient,
} from "@/test/query-client";

jest.mock("@/services/api/details");
jest.mock("@/services/api/list");

const mockGetListData = jest.mocked(getListData);

describe("BirdsScreen", () => {
	test("displays the expected screen heading", async () => {
		mockGetListData.mockResolvedValue(MOCK_EMPTY_APPWRITE_LIST as never);

		const { findByText } = await renderWithClient(<BirdsScreen />);

		expect(await findByText(/birdpedia/i)).toBeOnTheScreen();
	});

	test("pressing an item navigates to correct bird details screen", async () => {
		mockGetListData.mockResolvedValue(MOCK_APPWRITE_LIST_BIRDS as never);
		jest.mocked(getDetailsData).mockResolvedValue(MOCK_BIRD_ROW);

		await renderRouter(
			{
				index: BirdsScreen,
				"birds/[id]": BirdDetailsScreen,
			},
			{ wrapper: createQueryWrapper(createTestQueryClient()) },
		);

		const listItem = await screen.findByText(BIRD_BLUE_JAY.commonName);
		const user = userEvent.setup();
		await user.press(listItem);

		expect(screen).toHavePathname(`/birds/${BIRD_BLUE_JAY.$id}`);
	});
});
