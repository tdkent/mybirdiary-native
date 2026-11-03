import { render } from "@testing-library/react-native";
import Index from "@/app";

describe("Home screen:", () => {
	test("Text renders", async () => {
		const { getByText } = await render(<Index />);
		getByText("Home Screen");
	});
});
