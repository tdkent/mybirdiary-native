import Index from "@/app";
import { render } from "@testing-library/react-native";

describe("HomeScreen", () => {
	test("displays the expected screen heading", async () => {
		const { getByText } = await render(<Index />);
		getByText(/welcome to my birdiary/i);
	});
});
