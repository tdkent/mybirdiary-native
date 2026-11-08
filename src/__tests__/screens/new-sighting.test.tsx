import NewSightingScreen from "@/app/(app)/new-sighting";
import { render } from "@testing-library/react-native";

describe("NewSightingScreen", () => {
	test("displays the expected screen heading", async () => {
		const { getByText } = await render(<NewSightingScreen />);
		getByText(/create a new sighting/i);
	});
});
