import { fireEvent } from "@testing-library/react-native";
import { Button, Text, View } from "react-native";
import { AppwriteException, ID } from "react-native-appwrite";
import { ERROR_MESSAGES } from "@/constants/messages";
import { AuthProvider } from "@/context/auth-context";
import { useAuth } from "@/hooks/use-auth";
import { account } from "@/lib/appwrite";
import { USER_ID, VALID_LOGIN, VALID_REGISTER } from "@/test/fixtures";
import { MOCK_USER } from "@/test/mocks";
import { renderWithClient } from "@/test/query-client";

// Mock appwrite methods
const mockCreateUser = jest.mocked(account.create);
const mockCreateEmailPasswordSession = jest.mocked(
	account.createEmailPasswordSession,
);
const mockDeleteSession = jest.mocked(account.deleteSession);
const mockGetUser = jest.mocked(account.get);

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

const AUTH_STATUS = {
	authenticated: "Authenticated",
	unauthenticated: "Unauthenticated",
	authChecked: "Checked",
	authUnchecked: "Unchecked",
};

describe("AuthContext", () => {
	describe("login", () => {
		test("calls appwrite with supplied credentials", async () => {
			const { getByRole } = await renderWithClient(
				<AuthProvider>
					<AuthTestComponent isLogin />
				</AuthProvider>,
			);

			mockCreateEmailPasswordSession.mockReturnValue({} as never);
			mockGetUser.mockReturnValue(MOCK_USER as never);

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			expect(mockCreateEmailPasswordSession).toHaveBeenCalledTimes(1);
			expect(mockCreateEmailPasswordSession).toHaveBeenCalledWith(VALID_LOGIN);
			// Get user (also called by auth check effect when component mounts)
			expect(mockGetUser).toHaveBeenCalledTimes(2);
		});

		test("handles incorrect credentials", async () => {
			const { findByText, getByRole, getByText } = await renderWithClient(
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
			expect(getByText(AUTH_STATUS.unauthenticated)).toBeOnTheScreen();

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			// Check for error message and user still signed out
			expect(
				await findByText(ERROR_MESSAGES.INCORRECT_CREDENTIALS),
			).toBeOnTheScreen();
			expect(await findByText(AUTH_STATUS.unauthenticated)).toBeOnTheScreen();
		});

		test("updates authentication state after successful login", async () => {
			const { getByRole, getByText, findByText } = await renderWithClient(
				<AuthProvider>
					<AuthTestComponent isLogin />
				</AuthProvider>,
			);

			mockGetUser.mockReturnValue(MOCK_USER as never);

			// Check if signed out by default
			expect(getByText(AUTH_STATUS.unauthenticated)).toBeOnTheScreen();

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			expect(await findByText(AUTH_STATUS.authenticated)).toBeOnTheScreen();
		});

		test("clears the query cache on successful login", async () => {
			const { findByText, getByRole, queryClient } = await renderWithClient(
				<AuthProvider>
					<AuthTestComponent isLogin />
				</AuthProvider>,
			);

			const clear = jest.spyOn(queryClient, "clear");
			mockGetUser.mockReturnValue(MOCK_USER as never);

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			expect(await findByText(AUTH_STATUS.authenticated)).toBeOnTheScreen();
			expect(clear).toHaveBeenCalledTimes(1);
		});

		test("does not clear the query cache when login fails", async () => {
			const { findByTestId, getByRole, queryClient } = await renderWithClient(
				<AuthProvider>
					<AuthTestComponent isLogin />
				</AuthProvider>,
			);

			const clear = jest.spyOn(queryClient, "clear");
			mockCreateEmailPasswordSession.mockRejectedValueOnce(
				new AppwriteException("An error occurred"),
			);

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			expect(await findByTestId("auth-error")).toBeOnTheScreen();
			expect(clear).not.toHaveBeenCalled();
		});

		test("handles appwrite server outage", async () => {
			const { getByRole, findByText } = await renderWithClient(
				<AuthProvider>
					<AuthTestComponent isLogin />
				</AuthProvider>,
			);

			mockCreateEmailPasswordSession.mockRejectedValueOnce(
				new Error("fetch failed"),
			);

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			expect(await findByText(ERROR_MESSAGES.FETCH_FAILED)).toBeOnTheScreen();
		});
	});

	describe("register", () => {
		test("calls appwrite with the supplied registration details", async () => {
			const { getByRole } = await renderWithClient(
				<AuthProvider>
					<AuthTestComponent />
				</AuthProvider>,
			);

			jest.mocked(ID.unique).mockReturnValueOnce(USER_ID);
			mockCreateUser.mockReturnValueOnce(MOCK_USER as never);
			mockCreateEmailPasswordSession.mockReturnValueOnce({} as never);
			mockGetUser.mockReturnValueOnce(MOCK_USER as never);

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			// Create user
			expect(mockCreateUser).toHaveBeenCalledTimes(1);
			expect(mockCreateUser).toHaveBeenCalledWith(VALID_REGISTER);

			// Create session
			expect(mockCreateEmailPasswordSession).toHaveBeenCalledTimes(1);
			expect(mockCreateEmailPasswordSession).toHaveBeenCalledWith(VALID_LOGIN);

			// Get user (also called by auth check effect when component mounts)
			expect(mockGetUser).toHaveBeenCalledTimes(2);
		});

		test("handles registration errors", async () => {
			const { findByText, getByRole, getByText } = await renderWithClient(
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
			expect(getByText(AUTH_STATUS.unauthenticated)).toBeOnTheScreen();

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			// Check for error text and still signed out
			expect(
				await findByText(ERROR_MESSAGES.REGISTERED_EMAIL),
			).toBeOnTheScreen();
			expect(await findByText(AUTH_STATUS.unauthenticated)).toBeOnTheScreen();
		});

		test("updates authentication state after successful registration", async () => {
			const { getByRole, getByText, findByText } = await renderWithClient(
				<AuthProvider>
					<AuthTestComponent />
				</AuthProvider>,
			);

			mockGetUser.mockReturnValueOnce(MOCK_USER as never);

			// User is signed out by default
			expect(getByText(AUTH_STATUS.unauthenticated)).toBeOnTheScreen();

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			expect(await findByText(AUTH_STATUS.authenticated)).toBeOnTheScreen();
		});

		test("clears the query cache on successful register", async () => {
			const { findByText, getByRole, queryClient } = await renderWithClient(
				<AuthProvider>
					<AuthTestComponent />
				</AuthProvider>,
			);

			const clear = jest.spyOn(queryClient, "clear");
			mockGetUser.mockReturnValue(MOCK_USER as never);

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			expect(await findByText(AUTH_STATUS.authenticated)).toBeOnTheScreen();
			expect(clear).toHaveBeenCalledTimes(1);
		});

		test("does not clear the query cache if registration fails", async () => {
			const { findByTestId, getByRole, queryClient } = await renderWithClient(
				<AuthProvider>
					<AuthTestComponent />
				</AuthProvider>,
			);

			mockCreateUser.mockRejectedValueOnce(
				new AppwriteException("Invalid credentials"),
			);
			const clear = jest.spyOn(queryClient, "clear");

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			expect(await findByTestId("auth-error")).toBeOnTheScreen();
			expect(clear).not.toHaveBeenCalled();
		});

		test("handles appwrite server outage", async () => {
			const { getByRole, findByText } = await renderWithClient(
				<AuthProvider>
					<AuthTestComponent />
				</AuthProvider>,
			);

			mockCreateUser.mockRejectedValueOnce(new Error("fetch failed"));

			const button = getByRole("button", { name: /submit/i });
			await fireEvent.press(button);

			expect(await findByText(ERROR_MESSAGES.FETCH_FAILED)).toBeOnTheScreen();
		});
	});

	describe("logout", () => {
		test("calls appwrite in logout function", async () => {
			const { getByRole } = await renderWithClient(
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
			const { findByText, getByRole } = await renderWithClient(
				<AuthProvider>
					<AuthTestComponent />
				</AuthProvider>,
			);

			mockGetUser.mockReturnValue(MOCK_USER as never);
			mockDeleteSession.mockReturnValueOnce({} as never);

			// Sign in user and check auth status
			const submitBtn = getByRole("button", { name: /submit/i });
			await fireEvent.press(submitBtn);
			expect(await findByText(AUTH_STATUS.authenticated)).toBeOnTheScreen();

			// Log user out and check auth status
			const logoutBtn = getByRole("button", { name: /logout/i });
			await fireEvent.press(logoutBtn);
			expect(await findByText(AUTH_STATUS.unauthenticated)).toBeOnTheScreen();
		});

		test("clears the query cache on successful logout", async () => {
			const { getByRole, queryClient } = await renderWithClient(
				<AuthProvider>
					<AuthTestComponent />
				</AuthProvider>,
			);

			const clear = jest.spyOn(queryClient, "clear");

			const button = getByRole("button", { name: /logout/i });
			await fireEvent.press(button);

			expect(clear).toHaveBeenCalledTimes(1);
		});

		test("displays an error if logout fails", async () => {
			const { getByRole, findByTestId, findByText } = await renderWithClient(
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
			expect(
				await findByText(ERROR_MESSAGES.APPWRITE_UNEXPECTED),
			).toBeOnTheScreen();
		});

		test("does not clear the query cache if logout fails", async () => {
			const { findByTestId, getByRole, queryClient } = await renderWithClient(
				<AuthProvider>
					<AuthTestComponent />
				</AuthProvider>,
			);

			const clear = jest.spyOn(queryClient, "clear");
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
			mockGetUser.mockReturnValueOnce(MOCK_USER as never);

			// Remount AuthProvider to refresh state
			const { findByText } = await renderWithClient(
				<AuthProvider>
					<AuthTestComponent />
				</AuthProvider>,
			);

			// Check user remains authenticated
			expect(await findByText(AUTH_STATUS.authenticated)).toBeOnTheScreen();
			expect(mockGetUser).toHaveBeenCalledTimes(1);
		});

		test("handles an unauthenticated user", async () => {
			// Remount AuthProvider to refresh state
			const { findByText } = await renderWithClient(
				<AuthProvider>
					<AuthTestComponent />
				</AuthProvider>,
			);

			// Wait for auth check
			expect(await findByText(AUTH_STATUS.authChecked)).toBeOnTheScreen();

			// Check user remains unauthenticated
			expect(await findByText(AUTH_STATUS.unauthenticated)).toBeOnTheScreen();
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
			login(VALID_LOGIN);
		} else {
			register(VALID_LOGIN);
		}
	}

	return (
		<View>
			{authError && <Text testID="auth-error">{authError}</Text>}
			{logoutError && <Text testID="logout-error">{logoutError}</Text>}
			<Text>
				{isAuthChecked ? AUTH_STATUS.authChecked : AUTH_STATUS.authUnchecked}
			</Text>
			<Text>
				{user ? AUTH_STATUS.authenticated : AUTH_STATUS.unauthenticated}
			</Text>
			<Button onPress={handleSubmit} title="submit" />
			<Button onPress={logout} title="logout" />
		</View>
	);
}
