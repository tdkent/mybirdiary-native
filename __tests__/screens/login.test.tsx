import LoginScreen from "@/app/(auth)/login";
import { render } from "@testing-library/react-native";

describe("LoginScreen", () => {
	test("provides the correct navigation link to registration", () => {});

	test("displays the expected screen heading", async () => {
		const { getByText: loginScreenText } = await render(<LoginScreen />);
		loginScreenText(/sign in/i);
	});
});
