import BirdDetailsScreen from "@/app/(app)/(tabs)/birds/[id]";
import { getDetailsData } from "@/services/api/details";
import { MOCK_BIRD_ROW } from "@/test/mocks";
import { renderWithClient } from "@/test/query-client";

// Mock expo router
jest.mock("expo-router", () => ({
	Stack: {
		Screen: jest.fn(() => null),
	},
	useLocalSearchParams: jest.fn().mockReturnValue({ id: "1" }),
}));
jest.mock("@/services/api/details");

describe("BirdDetailsScreen", () => {
	test("displays the expected screen heading", async () => {
		jest.mocked(getDetailsData).mockResolvedValue(MOCK_BIRD_ROW);

		const { findByText } = await renderWithClient(<BirdDetailsScreen />);

		expect(await findByText(/bird details: green heron/i)).toBeOnTheScreen();
	});
});
