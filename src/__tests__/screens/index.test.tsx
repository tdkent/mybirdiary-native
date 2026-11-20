import { render } from "@testing-library/react-native";
import Index from "@/app";
import { useAuth } from "@/hooks/use-auth";
import { mockAuthContext } from "@/test/mocks";

jest.mock("expo-router", () => {
	const React = require("react");
	const { Text } = require("react-native");

	return {
		Redirect: jest.fn(({ href }) =>
			React.createElement(Text, { testID: "redirect" }, href),
		),
	};
});

jest.mock("@/hooks/use-auth", () => ({
	useAuth: jest.fn(),
}));

const mockUseAuth = jest.mocked(useAuth);

describe("Index", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("does not redirect while authentication is being checked", async () => {
		mockUseAuth.mockReturnValue({
			...mockAuthContext,
			isAuthChecked: false,
			isLoggedIn: false,
		});

		const { queryByTestId } = await render(<Index />);

		expect(queryByTestId("redirect")).toBeNull();
	});

	it("redirects authenticated users to the application", async () => {
		mockUseAuth.mockReturnValue({
			...mockAuthContext,
			isAuthChecked: true,
			isLoggedIn: true,
		});

		const { getByTestId } = await render(<Index />);

		expect(getByTestId("redirect").props.children).toBe(
			"/(app)/(tabs)/new-sighting",
		);
	});

	it("redirects unauthenticated users to login", async () => {
		mockUseAuth.mockReturnValue({
			...mockAuthContext,
			isAuthChecked: true,
			isLoggedIn: false,
		});

		const { getByTestId } = await render(<Index />);

		expect(getByTestId("redirect").props.children).toBe("/(auth)/login");
	});
});
