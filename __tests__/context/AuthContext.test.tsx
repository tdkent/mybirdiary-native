/**
 * Test authentication operations and state
 * Test that context communicates with Appwrite
 * Appwrite methods are mocked
 */

import { AuthProvider } from "@/context/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { account } from "@/lib/appwrite";
import type { AuthActions } from "@/types/auth";
import { fireEvent, render } from "@testing-library/react-native";
import { Button, Text, View } from "react-native";

// Mock appwrite methods
const mockCreateUser = jest.mocked(account.create);
const mockCreateEmailPasswordSession = jest.mocked(
	account.createEmailPasswordSession,
);

describe("AuthContext", () => {
	describe("login", () => {
		test("calls appwrite with supplied credentials", async () => {
			mockCreateEmailPasswordSession.mockReturnValueOnce({} as never);

			const { getByRole } = await render(
				<AuthProvider>
					<AuthTest action="login" />
				</AuthProvider>,
			);

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			expect(mockCreateEmailPasswordSession).toHaveBeenCalledTimes(1);
			expect(mockCreateEmailPasswordSession).toHaveBeenCalledWith({
				email: "test@fake.me",
				password: "password123",
			});
		});

		test("handles incorrect credentials", async () => {
			mockCreateEmailPasswordSession.mockRejectedValueOnce(
				new Error("Invalid credentials"),
			);

			const { findByTestId, findByText, getByRole, getByText } = await render(
				<AuthProvider>
					<AuthTest action="login" />
				</AuthProvider>,
			);

			// Check if signed out by default
			expect(getByText(/user is signed out/i)).toBeTruthy();

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			// Check for error text and still signed out
			expect(await findByTestId("auth-error")).toBeOnTheScreen();
			expect(await findByText(/user is signed out/i)).toBeTruthy();
		});

		test("updates authentication state after successful login", async () => {
			mockCreateEmailPasswordSession.mockReturnValueOnce({} as never);

			const { getByRole, getByText, findByText } = await render(
				<AuthProvider>
					<AuthTest action="login" />
				</AuthProvider>,
			);

			// Check if signed out by default
			expect(getByText(/user is signed out/i)).toBeTruthy();

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			expect(await findByText(/user is logged in/i)).toBeTruthy();
		});
	});

	describe("register", () => {
		test("calls Appwrite with the supplied registration details", async () => {
			mockCreateUser.mockReturnValueOnce({} as never);
			mockCreateEmailPasswordSession.mockReturnValueOnce({} as never);

			const { getByRole } = await render(
				<AuthProvider>
					<AuthTest action="register" />
				</AuthProvider>,
			);

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			// Create user
			expect(mockCreateUser).toHaveBeenCalledTimes(1);
			expect(mockCreateUser).toHaveBeenCalledWith({
				email: "test@fake.me",
				password: "password123",
				userId: "xxx",
			});

			// Create session
			expect(mockCreateEmailPasswordSession).toHaveBeenCalledTimes(1);
			expect(mockCreateEmailPasswordSession).toHaveBeenCalledWith({
				email: "test@fake.me",
				password: "password123",
			});
		});

		test("handles registration errors", async () => {
			mockCreateUser.mockRejectedValueOnce(new Error("Invalid credentials"));

			const { findByTestId, findByText, getByRole, getByText } = await render(
				<AuthProvider>
					<AuthTest action="register" />
				</AuthProvider>,
			);

			// Check if signed out by default
			expect(getByText(/user is signed out/i)).toBeTruthy();

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			// Check for error text and still signed out
			expect(await findByTestId("auth-error")).toBeOnTheScreen();
			expect(await findByText(/user is signed out/i)).toBeTruthy();
		});

		test("updates authentication state after successful registration", async () => {
			mockCreateUser.mockReturnValueOnce({} as never);
			mockCreateEmailPasswordSession.mockReturnValueOnce({} as never);

			const { getByRole, getByText, findByText } = await render(
				<AuthProvider>
					<AuthTest action="register" />
				</AuthProvider>,
			);

			// Check if signed out by default
			expect(getByText(/user is signed out/i)).toBeTruthy();

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			expect(await findByText(/user is logged in/i)).toBeTruthy();
		});
	});
});

function AuthTest({ action }: AuthActions) {
	const { error, isLoggedIn, login, logout, register } = useAuth();

	async function handleSubmit() {
		if (action === "login") {
			login({ email: "test@fake.me", password: "password123" });
		} else if (action === "register") {
			register({
				email: "test@fake.me",
				password: "password123",
			});
		} else return;
	}

	return (
		<View>
			{error && <Text testID="auth-error">{error}</Text>}
			<Text>User is {isLoggedIn ? "logged in" : "signed out"}</Text>
			<Button onPress={handleSubmit} title="submit" />
			<Button onPress={logout} title="logout" />
		</View>
	);
}
