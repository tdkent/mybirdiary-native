import LoginScreen from "@/app/(auth)/login";
import RegisterScreen from "@/app/(auth)/register";
import { render, screen, userEvent } from "@testing-library/react-native";
import { renderRouter } from "expo-router/build/testing-library/index.js";

describe("RegisterScreen", () => {
	test("provides the correct navigation link to login", async () => {
		await renderRouter({
			index: RegisterScreen,
			login: LoginScreen,
		});

		const user = userEvent.setup();
		await user.press(screen.getByRole("link", { name: /sign in/i }));

		expect(screen).toHavePathname("/login");
	});

	test("displays the expected screen heading", async () => {
		const { getByText: registerScreenText } = await render(<RegisterScreen />);
		registerScreenText(/create a new account/i);
	});
});
