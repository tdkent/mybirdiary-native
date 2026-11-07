import Index from "@/app";
import AccountScreen from "@/app/(app)/account";
import BirdsScreen from "@/app/(app)/birds";
import BirdDetailsScreen from "@/app/(app)/birds/[id]";
import NewSightingScreen from "@/app/(app)/new-sighting";
import SightingsScreen from "@/app/(app)/sightings";
import SightingDetailsScreen from "@/app/(app)/sightings/[id]";
import LoginScreen from "@/app/(auth)/login";
import RegisterScreen from "@/app/(auth)/register";
import { render, userEvent } from "@testing-library/react-native";
import { renderRouter, screen } from "expo-router/testing-library";

describe("Home screen:", () => {
	test("renders", async () => {
		const { getByText } = await render(<Index />);
		getByText(/welcome to my birdiary/i);
	});
});

describe("Auth screens:", () => {
	test("render", async () => {
		const { getByText: loginScreenText } = await render(<LoginScreen />);
		loginScreenText(/sign in/i);

		const { getByText: registerScreenText } = await render(<RegisterScreen />);
		registerScreenText(/create a new account/i);
	});
});

describe("New Sighting screen:", () => {
	test("renders", async () => {
		const { getByText } = await render(<NewSightingScreen />);
		getByText(/create a new sighting/i);
	});
});

describe("Account screen:", () => {
	test("renders", async () => {
		const { getByText } = await render(<AccountScreen />);
		getByText(/my account/i);
	});
});

describe("Sightings screen:", () => {
	test("renders", async () => {
		const { getByText } = await render(<SightingsScreen />);
		getByText(/my sightings/i);
	});

	test("navigates to details pages", async () => {
		await renderRouter({
			index: SightingsScreen,
			"sightings/[id]": SightingDetailsScreen,
		});

		const user = userEvent.setup();
		await user.press(screen.getByRole("button", { name: /sighting id 123/i }));

		expect(screen).toHavePathname("/sightings/123");
	});
});

describe("Birds screen:", () => {
	test("renders", async () => {
		const { getByText } = await render(<BirdsScreen />);
		getByText(/birdpedia/i);
	});

	test("navigates to details pages", async () => {
		await renderRouter({
			index: BirdsScreen,
			"birds/[id]": BirdDetailsScreen,
		});

		const user = userEvent.setup();
		await user.press(screen.getByRole("button", { name: /bird id 456/i }));

		expect(screen).toHavePathname("/birds/456");
	});
});
