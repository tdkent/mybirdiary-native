import LoginScreen from "@/app/(auth)/login";
import RegisterScreen from "@/app/(auth)/register";
import { render, screen, userEvent } from "@testing-library/react-native";
import { renderRouter } from "expo-router/build/testing-library/index.js";

describe("LoginScreen", () => {
	test("provides the correct navigation link to registration", async () => {
		await renderRouter({
			index: LoginScreen,
			register: RegisterScreen,
		});

		const user = userEvent.setup();
		await user.press(screen.getByRole("link", { name: /sign up/i }));

		expect(screen).toHavePathname("/register");
	});

	test("displays the expected screen heading", async () => {
		const { getByText: loginScreenText } = await render(<LoginScreen />);
		loginScreenText(/sign in/i);
	});
});
