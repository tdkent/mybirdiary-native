import { useQuery } from "@tanstack/react-query";
import { render } from "@testing-library/react-native";
import SightingsScreen from "@/app/(app)/(tabs)/sightings";
import { MOCK_USE_QUERY_WITH_EMPTY_LIST } from "@/test/mocks";

// Mock useAuth, return user object
jest.mock("@/hooks/use-auth", () => ({
	useAuth: jest.fn().mockReturnValue({ user: { $id: "1" } }),
}));

const mockUseQuery = jest.mocked(useQuery);

describe("SightingsScreen", () => {
	test("displays the expected screen heading", async () => {
		mockUseQuery.mockReturnValue(
			MOCK_USE_QUERY_WITH_EMPTY_LIST as ReturnType<typeof useQuery>,
		);
		const { getByText } = await render(<SightingsScreen />);
		getByText(/my sightings/i);
	});
});
