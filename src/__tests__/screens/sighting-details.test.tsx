import { useQuery } from "@tanstack/react-query";
import { render } from "@testing-library/react-native";
import SightingDetailsScreen from "@/app/(app)/(tabs)/sightings/[id]";
import { MOCK_USE_QUERY_WITH_SIGHTING_ROW } from "@/test/mocks";

// Mock expo router
jest.mock("expo-router", () => ({
	Stack: {
		Screen: jest.fn(() => null),
	},
	useLocalSearchParams: jest.fn().mockReturnValue({ id: "1" }),
}));

// Mock useAuth, return user object
jest.mock("@/hooks/use-auth", () => ({
	useAuth: jest.fn().mockReturnValue({ user: { $id: "1" } }),
}));

const mockUseQuery = jest.mocked(useQuery);

describe("SightingDetailsScreen", () => {
	test("displays the expected screen heading", async () => {
		mockUseQuery.mockReturnValue(
			MOCK_USE_QUERY_WITH_SIGHTING_ROW as ReturnType<typeof useQuery>,
		);

		const { getByText } = await render(<SightingDetailsScreen />);

		expect(
			getByText(
				`Sighting Details: ${MOCK_USE_QUERY_WITH_SIGHTING_ROW.data.bird?.commonName}`,
			),
		).toBeOnTheScreen();
	});
});
