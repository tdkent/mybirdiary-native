import { screen, userEvent } from "@testing-library/react-native";
import { renderRouter } from "expo-router/build/testing-library/index.js";
import SightingsScreen from "@/app/(app)/(tabs)/sightings";
import SightingDetailsScreen from "@/app/(app)/(tabs)/sightings/[id]";
import { getDetailsData } from "@/services/api/details";
import { getListData } from "@/services/api/list";
import { BIRD_GREEN_HERON } from "@/test/fixtures";
import {
	MOCK_APPWRITE_LIST_SIGHTINGS,
	MOCK_EMPTY_APPWRITE_LIST,
	MOCK_SIGHTING_ROW,
} from "@/test/mocks";
import {
	createQueryWrapper,
	createTestQueryClient,
	renderWithClient,
} from "@/test/query-client";

// Mock useAuth, return user object
jest.mock("@/hooks/use-auth", () => {
	const { USER_ID } =
		jest.requireActual<typeof import("@/test/fixtures")>("@/test/fixtures");

	return {
		useAuth: jest.fn().mockReturnValue({ user: { $id: USER_ID } }),
	};
});
jest.mock("@/services/api/list");
jest.mock("@/services/api/details");

const mockGetListData = jest.mocked(getListData);

describe("SightingsScreen", () => {
	test("displays the expected screen heading", async () => {
		jest
			.mocked(getListData)
			.mockResolvedValue(MOCK_EMPTY_APPWRITE_LIST as never);

		const { findByText } = await renderWithClient(<SightingsScreen />);

		expect(await findByText(/my sightings/i)).toBeOnTheScreen();
	});

	test("pressing an item navigates to correct sighting details screen", async () => {
		mockGetListData.mockResolvedValue(MOCK_APPWRITE_LIST_SIGHTINGS as never);
		jest.mocked(getDetailsData).mockResolvedValue(MOCK_SIGHTING_ROW);

		await renderRouter(
			{
				index: SightingsScreen,
				"sightings/[id]": SightingDetailsScreen,
			},
			{ wrapper: createQueryWrapper(createTestQueryClient()) },
		);

		const listItem = await screen.findByText(BIRD_GREEN_HERON.commonName);
		const user = userEvent.setup();
		await user.press(listItem);

		expect(screen).toHavePathname(`/sightings/${MOCK_SIGHTING_ROW.$id}`);
	});
});
