import BirdsScreen from "@/app/(app)/birds";
import { useQuery } from "@tanstack/react-query";
import { render } from "@testing-library/react-native";

const mockUserQuery = jest.mocked(useQuery);

describe("BirdsScreen", () => {
	test("displays the expected screen heading", async () => {
		mockUserQuery.mockReturnValue({
			data: {
				rows: [{ $id: 1, commonName: "Blue Jay" }],
				count: 1,
			},
			error: null,
			isError: false,
			isPending: false,
		} as ReturnType<typeof useQuery>);

		const { getByText } = await render(<BirdsScreen />);

		getByText(/birdpedia/i);
	});
});
