import { render } from "@testing-library/react-native";
import AccountScreen from "@/app/(app)/(tabs)/account";

jest.mock("@/hooks/use-auth", () => ({
	useAuth: jest.fn().mockReturnValue({
		isLoading: false,
	}),
}));

describe("AccountScreen", () => {
	test("displays the expected screen heading", async () => {
		const { getByText } = await render(<AccountScreen />);
		expect(getByText(/my account/i)).toBeOnTheScreen();
	});
});
