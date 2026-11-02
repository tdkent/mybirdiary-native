import { render } from "@testing-library/react-native";
import NewSightingScreen from "@/app/(app)/new-sighting";

describe("New Sighting screen:", () => {
	test("Text renders", async () => {
		const { getByText } = await render(<NewSightingScreen />);
		getByText("Create a new sighting");
	});
});
