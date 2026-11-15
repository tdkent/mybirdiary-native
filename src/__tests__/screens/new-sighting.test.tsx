import NewSightingScreen from "@/app/(app)/(tabs)/new-sighting";
import { render } from "@testing-library/react-native";

jest.mock("@/hooks/useAuth", () => ({
	useAuth: () => ({
		user: { $id: "1" },
	}),
}));

describe("NewSightingScreen", () => {
	test("displays the expected screen heading", async () => {
		const { getByText } = await render(<NewSightingScreen />);
		getByText(/create a new sighting/i);
	});
});
