import { useQuery } from "@tanstack/react-query";
import { render } from "@testing-library/react-native";
import BirdDetailsScreen from "@/app/(app)/(tabs)/birds/[id]";
import { MOCK_USE_QUERY_WITH_BIRD_ROW } from "@/test/mocks";

// Mock expo router
jest.mock("expo-router", () => ({
	Stack: {
		Screen: jest.fn(() => null),
	},
	useLocalSearchParams: jest.fn().mockReturnValue({ id: "1" }),
}));

const mockUseQuery = jest.mocked(useQuery);

describe("BirdDetailsScreen", () => {
	test("displays the expected screen heading", async () => {
		mockUseQuery.mockReturnValue(
			MOCK_USE_QUERY_WITH_BIRD_ROW as ReturnType<typeof useQuery>,
		);

		const { getByText } = await render(<BirdDetailsScreen />);

		expect(getByText(/bird details: green heron/i)).toBeOnTheScreen();
	});
});
