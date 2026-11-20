import { useQuery } from "@tanstack/react-query";
import { render, screen, userEvent } from "@testing-library/react-native";
import { renderRouter } from "expo-router/build/testing-library/index.js";
import BirdsScreen from "@/app/(app)/(tabs)/birds";
import BirdDetailsScreen from "@/app/(app)/(tabs)/birds/[id]";
import { defaultListReturnValue } from "@/test/mockData";

const mockUserQuery = jest.mocked(useQuery);

describe("BirdsScreen", () => {
	test("displays the expected screen heading", async () => {
		mockUserQuery.mockReturnValue({
			data: {
				rows: [],
				total: 0,
			},
			error: null,
			isError: false,
			isPending: false,
		} as ReturnType<typeof useQuery>);

		const { getByText } = await render(<BirdsScreen />);

		getByText(/birdpedia/i);
	});

	test("pressing an item navigates to correct bird details screen", async () => {
		mockUserQuery.mockReturnValue(
			defaultListReturnValue as ReturnType<typeof useQuery>,
		);

		await renderRouter({
			index: BirdsScreen,
			"birds/[id]": BirdDetailsScreen,
		});

		const listItem = screen.getByText(/blue jay/i);
		const user = userEvent.setup();
		await user.press(listItem);

		expect(screen).toHavePathname("/birds/1");
	});
});
