/**
 * Test authentication operations and state
 * Test that context communicates with Appwrite
 * Appwrite methods are mocked
 */

import { useQueryClient } from "@tanstack/react-query";
import { fireEvent, render } from "@testing-library/react-native";
import { Button, Text, View } from "react-native";
import { AppwriteException } from "react-native-appwrite";
import { ERROR_MESSAGES } from "@/constants/messages";
import { AuthProvider } from "@/context/auth-context";
import { useAuth } from "@/hooks/use-auth";
import { account } from "@/lib/appwrite";
import {
	authChecked,
	mockUser,
	mockUserInputs,
	userAuthenticated,
	userUnauthenticated,
} from "@/test/fixtures";
import { mockAppwriteUser } from "@/test/mocks";

// Mock appwrite methods
const mockCreateUser = jest.mocked(account.create);
const mockCreateEmailPasswordSession = jest.mocked(
	account.createEmailPasswordSession,
);
const mockDeleteSession = jest.mocked(account.deleteSession);
const mockGetUser = jest.mocked(account.get);

// useQueryClient
const mockUseQueryClient = jest.mocked(useQueryClient);

// Reset mocks to prevent mock state leaking between tests
beforeEach(() => {
	// Mock .get() throwing an error when no one is logged in
	mockGetUser
		.mockReset()
		.mockRejectedValue(
			new AppwriteException("Unauthorized", 401, "general_unauthorized_scope"),
		);
	mockCreateUser.mockReset();
	mockCreateEmailPasswordSession.mockReset();
	mockDeleteSession.mockReset();
});

describe("AuthContext", () => {
	describe("login", () => {
		test("calls appwrite with supplied credentials", async () => {
			const { getByRole } = await render(
				<AuthProvider>
					<AuthTestComponent isLogin />
				</AuthProvider>,
			);

			mockCreateEmailPasswordSession.mockReturnValue({} as never);
			mockGetUser.mockReturnValue(mockAppwriteUser as never);

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			expect(mockCreateEmailPasswordSession).toHaveBeenCalledTimes(1);
			expect(mockCreateEmailPasswordSession).toHaveBeenCalledWith(
				mockUserInputs,
			);
			// Get user (also called by auth check effect when component mounts)
			expect(mockGetUser).toHaveBeenCalledTimes(2);
		});

		test("handles incorrect credentials", async () => {
			const { findByText, getByRole, getByText } = await render(
				<AuthProvider>
					<AuthTestComponent isLogin />
				</AuthProvider>,
			);

			mockCreateEmailPasswordSession.mockRejectedValueOnce(
				new AppwriteException(
					"Invalid credentials",
					401,
					"user_invalid_credentials",
				),
			);

			// Check if signed out by default
			expect(getByText(userUnauthenticated)).toBeTruthy();

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			// Check for error message and user still signed out
			expect(
				await findByText(ERROR_MESSAGES.INCORRECT_CREDENTIALS),
			).toBeOnTheScreen();
			expect(await findByText(userUnauthenticated)).toBeTruthy();
		});

		test("updates authentication state after successful login", async () => {
			const { getByRole, getByText, findByText } = await render(
				<AuthProvider>
					<AuthTestComponent isLogin />
				</AuthProvider>,
			);

			mockGetUser.mockReturnValue(mockAppwriteUser as never);

			// Check if signed out by default
			expect(getByText(userUnauthenticated)).toBeTruthy();

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			expect(await findByText(userAuthenticated)).toBeTruthy();
		});

		test("clears the query cache on successful login", async () => {
			const { getByRole, findByText } = await render(
				<AuthProvider>
					<AuthTestComponent isLogin />
				</AuthProvider>,
			);

			const { clear } = mockUseQueryClient();
			mockGetUser.mockReturnValue(mockAppwriteUser as never);

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			expect(await findByText(userAuthenticated)).toBeTruthy();
			expect(clear).toHaveBeenCalledTimes(1);
		});

		test("does not clear the query cache when login fails", async () => {
			const { getByRole, findByTestId } = await render(
				<AuthProvider>
					<AuthTestComponent isLogin />
				</AuthProvider>,
			);

			const { clear } = mockUseQueryClient();
			mockCreateEmailPasswordSession.mockRejectedValueOnce(
				new AppwriteException("An error occurred"),
			);

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			expect(await findByTestId("auth-error")).toBeOnTheScreen();
			expect(clear).not.toHaveBeenCalled();
		});

		test("handles appwrite server outage", async () => {
			const { getByRole, findByText } = await render(
				<AuthProvider>
					<AuthTestComponent isLogin />
				</AuthProvider>,
			);

			mockCreateEmailPasswordSession.mockRejectedValueOnce(
				new Error("fetch failed"),
			);

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			expect(await findByText(ERROR_MESSAGES.FETCH_FAILED)).toBeTruthy();
		});
	});

	describe("register", () => {
		test("calls appwrite with the supplied registration details", async () => {
			const { getByRole } = await render(
				<AuthProvider>
					<AuthTestComponent />
				</AuthProvider>,
			);

			mockCreateUser.mockReturnValueOnce(mockAppwriteUser as never);
			mockCreateEmailPasswordSession.mockReturnValueOnce({} as never);
			mockGetUser.mockReturnValueOnce(mockAppwriteUser as never);

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

			// Get user (also called by auth check effect when component mounts)
			expect(mockGetUser).toHaveBeenCalledTimes(2);
		});

		test("handles registration errors", async () => {
			const { findByText, getByRole, getByText } = await render(
				<AuthProvider>
					<AuthTestComponent />
				</AuthProvider>,
			);

			mockCreateUser.mockRejectedValueOnce(
				new AppwriteException(
					"User already exists",
					409,
					"user_already_exists",
				),
			);

			// Check if signed out by default
			expect(getByText(userUnauthenticated)).toBeTruthy();

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			// Check for error text and still signed out
			expect(
				await findByText(ERROR_MESSAGES.REGISTERED_EMAIL),
			).toBeOnTheScreen();
			expect(await findByText(userUnauthenticated)).toBeTruthy();
		});

		test("updates authentication state after successful registration", async () => {
			const { getByRole, getByText, findByText } = await render(
				<AuthProvider>
					<AuthTestComponent />
				</AuthProvider>,
			);

			mockGetUser.mockReturnValueOnce(mockAppwriteUser as never);

			// User is signed out by default
			expect(getByText(userUnauthenticated)).toBeTruthy();

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			expect(await findByText(userAuthenticated)).toBeTruthy();
		});

		test("clears the query cache on successful register", async () => {
			const { getByRole, findByText } = await render(
				<AuthProvider>
					<AuthTestComponent />
				</AuthProvider>,
			);

			const { clear } = mockUseQueryClient();
			mockGetUser.mockReturnValue(mockAppwriteUser as never);

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			expect(await findByText(userAuthenticated)).toBeTruthy();
			expect(clear).toHaveBeenCalledTimes(1);
		});

		test("does not clear the query cache if registration fails", async () => {
			const { findByTestId, getByRole } = await render(
				<AuthProvider>
					<AuthTestComponent />
				</AuthProvider>,
			);

			mockCreateUser.mockRejectedValueOnce(
				new AppwriteException("Invalid credentials"),
			);
			const { clear } = mockUseQueryClient();

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			expect(await findByTestId("auth-error")).toBeOnTheScreen();
			expect(clear).not.toHaveBeenCalled();
		});

		test("handles appwrite server outage", async () => {
			const { getByRole, findByText } = await render(
				<AuthProvider>
					<AuthTestComponent />
				</AuthProvider>,
			);

			mockCreateUser.mockRejectedValueOnce(new Error("fetch failed"));

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			expect(await findByText(ERROR_MESSAGES.FETCH_FAILED)).toBeTruthy();
		});
	});

	describe("logout", () => {
		test("calls appwrite in logout function", async () => {
			const { getByRole } = await render(
				<AuthProvider>
					<AuthTestComponent />
				</AuthProvider>,
			);

			mockDeleteSession.mockReturnValueOnce({} as never);

			const button = getByRole("button", { name: /logout/i });
			await fireEvent.press(button);

			expect(mockDeleteSession).toHaveBeenCalledTimes(1);
		});

		test("updates authentication state after logout", async () => {
			const { findByText, getByRole } = await render(
				<AuthProvider>
					<AuthTestComponent />
				</AuthProvider>,
			);

			mockGetUser.mockReturnValue(mockAppwriteUser as never);
			mockDeleteSession.mockReturnValueOnce({} as never);

			// Sign in user and check auth status
			const submitBtn = getByRole("button", { name: /submit/i });
			await fireEvent.press(submitBtn);
			expect(await findByText(userAuthenticated)).toBeTruthy();

			// Log user out and check auth status
			const logoutBtn = getByRole("button", { name: /logout/i });
			await fireEvent.press(logoutBtn);
			expect(await findByText(userUnauthenticated)).toBeTruthy();
		});

		test("clears the query cache on successful logout", async () => {
			const { getByRole } = await render(
				<AuthProvider>
					<AuthTestComponent />
				</AuthProvider>,
			);

			const { clear } = mockUseQueryClient();

			const button = getByRole("button", { name: /logout/i });
			await fireEvent.press(button);

			expect(clear).toHaveBeenCalledTimes(1);
		});

		test("displays an error if logout fails", async () => {
			const { getByRole, findByTestId, findByText } = await render(
				<AuthProvider>
					<AuthTestComponent />
				</AuthProvider>,
			);

			mockDeleteSession.mockRejectedValueOnce(
				new AppwriteException("An error occurred"),
			);

			const button = getByRole("button", { name: /logout/i });
			await fireEvent.press(button);

			expect(await findByTestId("logout-error")).toBeOnTheScreen();
			expect(await findByText(ERROR_MESSAGES.APPWRITE_UNEXPECTED)).toBeTruthy();
		});

		test("does not clear the query cache if logout fails", async () => {
			const { getByRole, findByTestId } = await render(
				<AuthProvider>
					<AuthTestComponent />
				</AuthProvider>,
			);

			const { clear } = mockUseQueryClient();
			mockDeleteSession.mockRejectedValueOnce(
				new AppwriteException("An error occurred"),
			);

			const button = getByRole("button", { name: /logout/i });
			await fireEvent.press(button);

			expect(await findByTestId("logout-error")).toBeOnTheScreen();
			expect(clear).not.toHaveBeenCalled();
		});
	});

	describe("session restoration", () => {
		test("restores an existing session", async () => {
			mockGetUser.mockReturnValueOnce(mockAppwriteUser as never);

			// Remount AuthProvider to refresh state
			const { findByText } = await render(
				<AuthProvider>
					<AuthTestComponent />
				</AuthProvider>,
			);

			// Check user remains authenticated
			expect(await findByText(userAuthenticated)).toBeTruthy();
			expect(mockGetUser).toHaveBeenCalledTimes(1);
		});

		test("handles an unauthenticated user", async () => {
			// Remount AuthProvider to refresh state
			const { findByText } = await render(
				<AuthProvider>
					<AuthTestComponent />
				</AuthProvider>,
			);

			// Wait for auth check
			expect(await findByText(authChecked)).toBeTruthy();

			// Check user remains unauthenticated
			expect(await findByText(userUnauthenticated)).toBeTruthy();
			expect(mockGetUser).toHaveBeenCalledTimes(1);
		});
	});
});

function AuthTestComponent({ isLogin }: { isLogin?: boolean }) {
	const {
		authError,
		logoutError,
		user,
		isAuthChecked,
		login,
		logout,
		register,
	} = useAuth();

	async function handleSubmit() {
		if (isLogin) {
			login(mockUserInputs);
		} else {
			register(mockUserInputs);
		}
	}

	return (
		<View>
			{authError && <Text testID="auth-error">{authError}</Text>}
			{logoutError && <Text testID="logout-error">{logoutError}</Text>}
			<Text>{isAuthChecked ? authChecked : "Unchecked"}</Text>
			<Text>{user ? userAuthenticated : userUnauthenticated}</Text>
			<Button onPress={handleSubmit} title="submit" />
			<Button onPress={logout} title="logout" />
		</View>
	);
}
