import { useQuery } from "@tanstack/react-query";
import { render, screen, userEvent } from "@testing-library/react-native";
import { renderRouter } from "expo-router/build/testing-library/index.js";
import BirdsScreen from "@/app/(app)/(tabs)/birds";
import BirdDetailsScreen from "@/app/(app)/(tabs)/birds/[id]";
import { BIRD_BLUE_JAY } from "@/test/fixtures";
import {
	MOCK_USE_QUERY_WITH_BIRDS_LIST,
	MOCK_USE_QUERY_WITH_EMPTY_LIST,
} from "@/test/mocks";

const mockUseQuery = jest.mocked(useQuery);

describe("BirdsScreen", () => {
	test("displays the expected screen heading", async () => {
		mockUseQuery.mockReturnValue(
			MOCK_USE_QUERY_WITH_EMPTY_LIST as ReturnType<typeof useQuery>,
		);

		const { getByText } = await render(<BirdsScreen />);

		expect(getByText(/birdpedia/i)).toBeOnTheScreen();
	});

	test("pressing an item navigates to correct bird details screen", async () => {
		mockUseQuery.mockReturnValue(
			MOCK_USE_QUERY_WITH_BIRDS_LIST as ReturnType<typeof useQuery>,
		);

		await renderRouter({
			index: BirdsScreen,
			"birds/[id]": BirdDetailsScreen,
		});

		const listItem = screen.getByText(BIRD_BLUE_JAY.commonName);
		const user = userEvent.setup();
		await user.press(listItem);

		expect(screen).toHavePathname(`/birds/${BIRD_BLUE_JAY.$id}`);
	});
});
