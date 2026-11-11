import BirdsScreen from "@/app/(app)/birds";
import BirdDetailsScreen from "@/app/(app)/birds/[id]";
import { render, screen, userEvent } from "@testing-library/react-native";
import { renderRouter } from "expo-router/build/testing-library/index.js";

jest.mock("@tanstack/react-query", () => ({
	useQuery: jest.fn().mockReturnValue({
		data: {
			rows: [{ $id: 1, commonName: "Blue Jay" }],
			count: 1,
		},
		error: null,
		isError: false,
		isLoading: false,
	}),
}));

describe("BirdsScreen", () => {
	test("provides the correct navigation link to bird details", async () => {
		await renderRouter({
			index: BirdsScreen,
			"birds/[id]": BirdDetailsScreen,
		});

		const user = userEvent.setup();

		const listItem = screen.getByText(/blue jay/i);
		await user.press(listItem);

		expect(screen).toHavePathname("/birds/1");
	});

	test("displays the expected screen heading", async () => {
		const { getByText } = await render(<BirdsScreen />);

		getByText(/birdpedia/i);
	});
});
