import Index from "@/app";
import NewSightingScreen from "@/app/(app)/new-sighting";
import SightingsScreen from "@/app/(app)/sightings";
import SightingDetailsScreen from "@/app/(app)/sightings/[id]";
import { render, userEvent } from "@testing-library/react-native";
import { renderRouter, screen } from "expo-router/testing-library";

describe("Home screen:", () => {
	test("Text renders", async () => {
		const { getByText } = await render(<Index />);
		getByText(/welcome to my birdiary/i);
	});
});

describe("New Sighting screen:", () => {
	test("Text renders", async () => {
		const { getByText } = await render(<NewSightingScreen />);
		getByText("Create a new sighting");
	});
});

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
