import { userEvent } from "@testing-library/react-native";
import { renderRouter, screen } from "expo-router/testing-library";
import SightingsScreen from "@/app/(app)/sightings";
import SightingDetailsScreen from "@/app/(app)/sightings/[id]";

describe("Sightings screen:", () => {
	test("Button correctly navigates", async () => {
		await renderRouter({
			index: SightingsScreen,
			"sightings/[id]": SightingDetailsScreen,
		});

		const user = userEvent.setup();
		await user.press(screen.getByRole("button", { name: /sighting id 123/i }));

		expect(screen).toHavePathname("/sightings/123");
	});
});
