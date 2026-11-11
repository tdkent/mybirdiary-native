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
	mockUser,
	mockUserInputs,
	userAuthenticated,
	userUnauthenticated,
} from "@/test/mockData";
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
				mockUserInputs,
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
			expect(getByText(userUnauthenticated)).toBeTruthy();

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			// Check for error component and user still signed out
			expect(await findByTestId("auth-error")).toBeOnTheScreen();
			expect(await findByText(userUnauthenticated)).toBeTruthy();
		});

		test("updates authentication state after successful login", async () => {
			mockCreateEmailPasswordSession.mockReturnValueOnce({} as never);

			const { getByRole, getByText, findByText } = await render(
				<AuthProvider>
					<AuthTestComponent action="login" />
				</AuthProvider>,
			);

			// Check if signed out by default
			expect(getByText(userUnauthenticated)).toBeTruthy();

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			expect(await findByText(userAuthenticated)).toBeTruthy();
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

			expect(await findByText(ERROR_MESSAGES.FETCH_FAILED)).toBeTruthy();
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
			expect(mockCreateUser).toHaveBeenCalledWith(mockUser);

			// Create session
			expect(mockCreateEmailPasswordSession).toHaveBeenCalledTimes(1);
			expect(mockCreateEmailPasswordSession).toHaveBeenCalledWith(
				mockUserInputs,
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
			expect(getByText(userUnauthenticated)).toBeTruthy();

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			// Check for error text and still signed out
			expect(await findByTestId("auth-error")).toBeOnTheScreen();
			expect(await findByText(userUnauthenticated)).toBeTruthy();
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
			expect(getByText(userUnauthenticated)).toBeTruthy();

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			expect(await findByText(userAuthenticated)).toBeTruthy();
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
			expect(await findByText(userAuthenticated)).toBeTruthy();

			// Log user out and check auth status
			const logoutBtn = getByRole("button", { name: /logout/i });
			await fireEvent.press(logoutBtn);
			expect(await findByText(userUnauthenticated)).toBeTruthy();
		});
	});

	describe("session restoration", () => {
		test("restores an existing session", async () => {
			mockGetUser.mockReturnValueOnce(mockUser as never);

			// Remount AuthProvider to refresh state
			const { findByText } = await render(
				<AuthProvider>
					<AuthTestComponent action="login" />
				</AuthProvider>,
			);

			// Check user remains authenticated
			expect(await findByText(userAuthenticated)).toBeTruthy();
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
			expect(await findByText(userUnauthenticated)).toBeTruthy();
			expect(mockGetUser).toHaveBeenCalledTimes(1);
		});
	});
});

function AuthTestComponent({ action }: AuthActions) {
	const { error, isLoggedIn, login, logout, register } = useAuth();

	async function handleSubmit() {
		if (action === "login") {
			login(mockUserInputs);
		} else if (action === "register") {
			register(mockUserInputs);
		} else return;
	}

	return (
		<View>
			{error && <Text testID="auth-error">{error}</Text>}
			<Text>{isLoggedIn ? userAuthenticated : userUnauthenticated}</Text>
			<Button onPress={handleSubmit} title="submit" />
			<Button onPress={logout} title="logout" />
		</View>
	);
}
