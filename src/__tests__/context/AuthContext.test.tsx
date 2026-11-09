/**
 * Test authentication operations and state
 * Test that context communicates with Appwrite
 * Appwrite methods are mocked
 */

import { ERROR_MESSAGES } from "@/constants/messages";
import { AuthProvider } from "@/context/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { account } from "@/lib/appwrite";
import {
	MOCK_USER,
	MOCK_USER_INPUTS,
	USER_LOGGED_IN,
	USER_SIGNED_OUT,
} from "@/test/constants";
import type { AuthActions } from "@/types/auth";
import { fireEvent, render } from "@testing-library/react-native";
import { Button, Text, View } from "react-native";
import { AppwriteException } from "react-native-appwrite";

// Mock appwrite methods
const mockCreateUser = jest.mocked(account.create);
const mockCreateEmailPasswordSession = jest.mocked(
	account.createEmailPasswordSession,
);
const mockDeleteSession = jest.mocked(account.deleteSession);
const mockGetUser = jest.mocked(account.get);

describe("AuthContext", () => {
	describe("login", () => {
		test("calls appwrite with supplied credentials", async () => {
			mockCreateEmailPasswordSession.mockReturnValueOnce({} as never);

			const { getByRole } = await render(
				<AuthProvider>
					<AuthTestComponent action="login" />
				</AuthProvider>,
			);

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			expect(mockCreateEmailPasswordSession).toHaveBeenCalledTimes(1);
			expect(mockCreateEmailPasswordSession).toHaveBeenCalledWith(
				MOCK_USER_INPUTS,
			);
		});

		test("handles incorrect credentials", async () => {
			mockCreateEmailPasswordSession.mockRejectedValueOnce(
				new Error("Invalid credentials"),
			);

			const { findByTestId, findByText, getByRole, getByText } = await render(
				<AuthProvider>
					<AuthTestComponent action="login" />
				</AuthProvider>,
			);

			// Check if signed out by default
			expect(getByText(USER_SIGNED_OUT)).toBeTruthy();

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			// Check for error component and user still signed out
			expect(await findByTestId("auth-error")).toBeOnTheScreen();
			expect(await findByText(USER_SIGNED_OUT)).toBeTruthy();
		});

		test("updates authentication state after successful login", async () => {
			mockCreateEmailPasswordSession.mockReturnValueOnce({} as never);

			const { getByRole, getByText, findByText } = await render(
				<AuthProvider>
					<AuthTestComponent action="login" />
				</AuthProvider>,
			);

			// Check if signed out by default
			expect(getByText(USER_SIGNED_OUT)).toBeTruthy();

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			expect(await findByText(USER_LOGGED_IN)).toBeTruthy();
		});

		test("handles appwrite server outage", async () => {
			mockCreateEmailPasswordSession.mockRejectedValueOnce(
				new AppwriteException("fetch failed"),
			);

			const { getByRole, findByText } = await render(
				<AuthProvider>
					<AuthTestComponent action="login" />
				</AuthProvider>,
			);

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			expect(await findByText(ERROR_MESSAGES.APPWRITE_OUTAGE)).toBeTruthy();
		});
	});

	describe("register", () => {
		test("calls appwrite with the supplied registration details", async () => {
			mockCreateUser.mockReturnValueOnce({} as never);
			mockCreateEmailPasswordSession.mockReturnValueOnce({} as never);

			const { getByRole } = await render(
				<AuthProvider>
					<AuthTestComponent action="register" />
				</AuthProvider>,
			);

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			// Create user
			expect(mockCreateUser).toHaveBeenCalledTimes(1);
			expect(mockCreateUser).toHaveBeenCalledWith(MOCK_USER);

			// Create session
			expect(mockCreateEmailPasswordSession).toHaveBeenCalledTimes(1);
			expect(mockCreateEmailPasswordSession).toHaveBeenCalledWith(
				MOCK_USER_INPUTS,
			);
		});

		test("handles registration errors", async () => {
			mockCreateUser.mockRejectedValueOnce(new Error("Invalid credentials"));

			const { findByTestId, findByText, getByRole, getByText } = await render(
				<AuthProvider>
					<AuthTestComponent action="register" />
				</AuthProvider>,
			);

			// Check if signed out by default
			expect(getByText(USER_SIGNED_OUT)).toBeTruthy();

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			// Check for error text and still signed out
			expect(await findByTestId("auth-error")).toBeOnTheScreen();
			expect(await findByText(USER_SIGNED_OUT)).toBeTruthy();
		});

		test("updates authentication state after successful registration", async () => {
			mockCreateUser.mockReturnValueOnce({} as never);
			mockCreateEmailPasswordSession.mockReturnValueOnce({} as never);

			const { getByRole, getByText, findByText } = await render(
				<AuthProvider>
					<AuthTestComponent action="register" />
				</AuthProvider>,
			);

			// User is signed out by default
			expect(getByText(USER_SIGNED_OUT)).toBeTruthy();

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			expect(await findByText(USER_LOGGED_IN)).toBeTruthy();
		});
	});

	describe("logout", () => {
		test("calls appwrite in logout function", async () => {
			mockDeleteSession.mockReturnValueOnce({} as never);

			const { getByRole } = await render(
				<AuthProvider>
					<AuthTestComponent action="login" />
				</AuthProvider>,
			);

			const button = getByRole("button", { name: /logout/i });
			await fireEvent.press(button);

			expect(mockDeleteSession).toHaveBeenCalledTimes(1);
		});

		test("updates authentication state after logout", async () => {
			mockDeleteSession.mockReturnValueOnce({} as never);

			const { findByText, getByRole } = await render(
				<AuthProvider>
					<AuthTestComponent action="login" />
				</AuthProvider>,
			);

			// Sign in user and check auth status
			const submitBtn = getByRole("button", { name: /submit/i });
			await fireEvent.press(submitBtn);
			expect(await findByText(USER_LOGGED_IN)).toBeTruthy();

			// Log user out and check auth status
			const logoutBtn = getByRole("button", { name: /logout/i });
			await fireEvent.press(logoutBtn);
			expect(await findByText(USER_SIGNED_OUT)).toBeTruthy();
		});
	});

	describe("session restoration", () => {
		test("restores an existing session", async () => {
			mockGetUser.mockReturnValueOnce(MOCK_USER as never);

			// Remount AuthProvider to refresh state
			const { findByText } = await render(
				<AuthProvider>
					<AuthTestComponent action="login" />
				</AuthProvider>,
			);

			// Check user remains authenticated
			expect(await findByText(USER_LOGGED_IN)).toBeTruthy();
			expect(mockGetUser).toHaveBeenCalledTimes(1);
		});

		test("handles an unauthenticated user", async () => {
			mockGetUser.mockRejectedValueOnce(new Error("User is not signed in"));

			// Remount AuthProvider to refresh state
			const { findByText } = await render(
				<AuthProvider>
					<AuthTestComponent action="login" />
				</AuthProvider>,
			);

			// Check user remains unauthenticated
			expect(await findByText(USER_SIGNED_OUT)).toBeTruthy();
			expect(mockGetUser).toHaveBeenCalledTimes(1);
		});
	});
});

function AuthTestComponent({ action }: AuthActions) {
	const { error, isLoggedIn, login, logout, register } = useAuth();

	async function handleSubmit() {
		if (action === "login") {
			login(MOCK_USER_INPUTS);
		} else if (action === "register") {
			register(MOCK_USER_INPUTS);
		} else return;
	}

	return (
		<View>
			{error && <Text testID="auth-error">{error}</Text>}
			<Text>{isLoggedIn ? USER_LOGGED_IN : USER_SIGNED_OUT}</Text>
			<Button onPress={handleSubmit} title="submit" />
			<Button onPress={logout} title="logout" />
		</View>
	);
}
