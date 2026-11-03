import { render } from "@testing-library/react-native";
import Index from "@/app";

jest.mock("@/lib/appwrite", () => ({
	client: {
		ping: jest.fn().mockResolvedValue({ success: true }),
	},
}));

describe("Home screen:", () => {
	test("Text renders", async () => {
		const { getByText } = await render(<Index />);
		getByText("Home Screen");
	});
});
