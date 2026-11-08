import RegisterScreen from "@/app/(auth)/register";
import { render } from "@testing-library/react-native";

describe("RegisterScreen", () => {
	test("provides the correct navigation link to login", () => {});

	test("displays the expected screen heading", async () => {
		const { getByText: registerScreenText } = await render(<RegisterScreen />);
		registerScreenText(/create a new account/i);
	});
});
