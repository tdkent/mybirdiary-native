import SightingsScreen from "@/app/(app)/sightings";
import SightingDetailsScreen from "@/app/(app)/sightings/[id]";
import { render, screen, userEvent } from "@testing-library/react-native";
import { renderRouter } from "expo-router/build/testing-library/index.js";

describe("SightingsScreen", () => {
	test("provides the correct navigation link to sighting details", async () => {
		await renderRouter({
			index: SightingsScreen,
			"sightings/[id]": SightingDetailsScreen,
		});

		const user = userEvent.setup();
		await user.press(screen.getByRole("button", { name: /sighting id 123/i }));

		expect(screen).toHavePathname("/sightings/123");
	});

	test("displays the expected screen heading", async () => {
		const { getByText } = await render(<SightingsScreen />);
		getByText(/my sightings/i);
	});
});
