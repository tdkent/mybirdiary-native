import SightingDetailsScreen from "@/app/(app)/(tabs)/sightings/[id]";
import { defaultDetailsReturnValue } from "@/test/mockData";
import { useQuery } from "@tanstack/react-query";
import { render } from "@testing-library/react-native";

// Mock expo router
jest.mock("expo-router", () => ({
	Stack: {
		Screen: jest.fn(() => null),
	},
	useLocalSearchParams: jest.fn().mockReturnValue({ id: "1" }),
}));

const mockUseQuery = jest.mocked(useQuery);

describe("SightingDetailsScreen", () => {
	test("displays the expected screen heading", async () => {
		mockUseQuery.mockReturnValue({
			...defaultDetailsReturnValue,
			data: {
				bird: {
					commonName: "Blue Jay",
				},
			},
		} as ReturnType<typeof useQuery>);

		const { getByText } = await render(<SightingDetailsScreen />);

		getByText(/sighting details: blue jay/i);
	});
});
