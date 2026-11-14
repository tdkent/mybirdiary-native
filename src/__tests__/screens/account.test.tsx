import AccountScreen from "@/app/(app)/(tabs)/account";
import { render } from "@testing-library/react-native";

describe("AccountScreen", () => {
	test("displays the expected screen heading", async () => {
		const { getByText } = await render(<AccountScreen />);
		getByText(/my account/i);
	});
});
