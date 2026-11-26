import NewSightingScreen from "@/app/(app)/(tabs)/new-sighting";
import { renderWithClient } from "@/test/query-client";

jest.mock("@/hooks/use-auth", () => ({
	useAuth: () => ({
		user: { $id: "1" },
	}),
}));

describe("NewSightingScreen", () => {
	test("displays the expected screen heading", async () => {
		const { getByText } = await renderWithClient(<NewSightingScreen />);
		expect(getByText(/create a new sighting/i)).toBeOnTheScreen();
	});
});
