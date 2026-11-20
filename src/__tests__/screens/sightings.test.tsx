import { useQuery } from "@tanstack/react-query";
import { render } from "@testing-library/react-native";
import SightingsScreen from "@/app/(app)/(tabs)/sightings";
import { defaultListReturnValue } from "@/test/mockData";

// Mock useAuth, return user object
jest.mock("@/hooks/useAuth", () => ({
	useAuth: jest.fn().mockReturnValue({ user: { $id: "1" } }),
}));

const mockUseQuery = jest.mocked(useQuery);

describe("SightingsScreen", () => {
	test("displays the expected screen heading", async () => {
		mockUseQuery.mockReturnValue({
			...defaultListReturnValue,
			data: {
				rows: [],
				total: 0,
			},
		} as ReturnType<typeof useQuery>);
		const { getByText } = await render(<SightingsScreen />);
		getByText(/my sightings/i);
	});
});
