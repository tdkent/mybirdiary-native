import BirdsScreen from "@/app/(app)/birds";
import BirdDetailsScreen from "@/app/(app)/birds/[id]";
import { render, screen, userEvent } from "@testing-library/react-native";
import { renderRouter } from "expo-router/build/testing-library/index.js";

describe("BirdsScreen", () => {
	test("provides the correct navigation link to bird details", async () => {
		await renderRouter({
			index: BirdsScreen,
			"birds/[id]": BirdDetailsScreen,
		});

		const user = userEvent.setup();
		await user.press(screen.getByRole("button", { name: /bird id 456/i }));

		expect(screen).toHavePathname("/birds/456");
	});

	test("displays the expected screen heading", async () => {
		const { getByText } = await render(<BirdsScreen />);
		getByText(/birdpedia/i);
	});
});
