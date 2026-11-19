import { render } from "@testing-library/react-native";
import AccountScreen from "@/app/(app)/(tabs)/account";

describe("AccountScreen", () => {
	test("displays the expected screen heading", async () => {
		const { getByText } = await render(<AccountScreen />);
		getByText(/my account/i);
	});
});
