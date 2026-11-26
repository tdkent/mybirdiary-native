import SightingsScreen from "@/app/(app)/(tabs)/sightings";
import { getListData } from "@/services/api/list";
import { MOCK_EMPTY_APPWRITE_LIST } from "@/test/mocks";
import { renderWithClient } from "@/test/query-client";

// Mock useAuth, return user object
jest.mock("@/hooks/use-auth", () => {
	const { USER_ID } =
		jest.requireActual<typeof import("@/test/fixtures")>("@/test/fixtures");

	return {
		useAuth: jest.fn().mockReturnValue({ user: { $id: USER_ID } }),
	};
});
jest.mock("@/services/api/list");

describe("SightingsScreen", () => {
	test("displays the expected screen heading", async () => {
		jest
			.mocked(getListData)
			.mockResolvedValue(MOCK_EMPTY_APPWRITE_LIST as never);

		const { findByText } = await renderWithClient(<SightingsScreen />);

		expect(await findByText(/my sightings/i)).toBeOnTheScreen();
	});
});
