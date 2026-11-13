import SightingsScreen from "@/app/(app)/(tabs)/sightings";
import { defaultListReturnValue } from "@/test/mockData";
import { useQuery } from "@tanstack/react-query";
import { render } from "@testing-library/react-native";

const mockUserQuery = jest.mocked(useQuery);

describe("SightingsScreen", () => {
	test("displays the expected screen heading", async () => {
		mockUserQuery.mockReturnValue({
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
