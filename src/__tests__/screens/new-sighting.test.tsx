import { useMutation } from "@tanstack/react-query";
import { render } from "@testing-library/react-native";
import NewSightingScreen from "@/app/(app)/(tabs)/new-sighting";

jest.mock("@/hooks/useAuth", () => ({
	useAuth: () => ({
		user: { $id: "1" },
	}),
}));

beforeEach(() => {
	jest
		.mocked(useMutation)
		.mockReturnValue({} as unknown as ReturnType<typeof useMutation>);
});

describe("NewSightingScreen", () => {
	test("displays the expected screen heading", async () => {
		const { getByText } = await render(<NewSightingScreen />);
		getByText(/create a new sighting/i);
	});
});
