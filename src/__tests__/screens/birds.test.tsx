import BirdsScreen from "@/app/(app)/birds";
import { render } from "@testing-library/react-native";

jest.mock("@tanstack/react-query", () => ({
	useQuery: jest.fn().mockReturnValue({
		data: {
			rows: [{ $id: 1, commonName: "Blue Jay" }],
			count: 1,
		},
		error: null,
		isError: false,
		isPending: false,
	}),
}));

describe("BirdsScreen", () => {
	test("displays the expected screen heading", async () => {
		const { getByText } = await render(<BirdsScreen />);

		getByText(/birdpedia/i);
	});
});
