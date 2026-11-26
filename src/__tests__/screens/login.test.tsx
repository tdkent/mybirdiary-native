import { render, screen, userEvent } from "@testing-library/react-native";
import { renderRouter } from "expo-router/build/testing-library/index.js";
import LoginScreen from "@/app/(auth)/login";
import RegisterScreen from "@/app/(auth)/register";

jest.mock("@/hooks/use-auth", () => ({
	useAuth: jest.fn().mockReturnValue({
		error: null,
		setAuthError: jest.fn(),
	}),
}));

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
		const { getByText } = await render(<LoginScreen />);
		expect(getByText(/sign in/i)).toBeOnTheScreen();
	});
});
