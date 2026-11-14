import Index from "@/app";
import type { Auth } from "@/context/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { render } from "@testing-library/react-native";

const mockAuth: Auth = {
	error: "",
	isAuthChecked: false,
	isLoading: false,
	isLoggedIn: false,
	login: () => {},
	logout: () => {},
	register: () => {},
	setError: () => {},
};

jest.mock("expo-router", () => {
	const React = require("react");
	const { Text } = require("react-native");

	return {
		Redirect: jest.fn(({ href }) =>
			React.createElement(Text, { testID: "redirect" }, href),
		),
	};
});

jest.mock("@/hooks/useAuth", () => ({
	useAuth: jest.fn(),
}));

const mockUseAuth = jest.mocked(useAuth);

describe("Index", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("does not redirect while authentication is being checked", async () => {
		mockUseAuth.mockReturnValue({
			...mockAuth,
			isAuthChecked: false,
			isLoggedIn: false,
		});

		const { queryByTestId } = await render(<Index />);

		expect(queryByTestId("redirect")).toBeNull();
	});

	it("redirects authenticated users to the application", async () => {
		mockUseAuth.mockReturnValue({
			...mockAuth,
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
			...mockAuth,
			isAuthChecked: true,
			isLoggedIn: false,
		});

		const { getByTestId } = await render(<Index />);

		expect(getByTestId("redirect").props.children).toBe("/(auth)/login");
	});
});
