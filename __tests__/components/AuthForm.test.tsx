/**
 * Test form behavior and validation
 * Verify the form behaves correctly during user interaction
 */

import LoginScreen from "@/app/(auth)/login";
import AuthForm from "@/components/forms/AuthForm";
import { AuthProvider } from "@/context/AuthContext";
import { account } from "@/lib/appwrite";
import { fireEvent, render } from "@testing-library/react-native";

const mockCreateEmailPasswordSession = jest.mocked(
	account.createEmailPasswordSession,
);

describe("AuthForm", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("renders email and password inputs and submit button", async () => {
		const { getByLabelText, getByRole } = await render(
			<AuthForm action="login" />,
		);

		getByLabelText("email");
		getByLabelText("password");
		getByRole("button", { name: /submit/i });
	});

	test("displays validation error for empty inputs", async () => {
		const { findByTestId, getByRole } = await render(
			<AuthForm action="login" />,
		);

		const button = getByRole("button", { name: /submit/i });
		await fireEvent.press(button);

		expect(await findByTestId("email-validation-alert")).toHaveTextContent(
			/email is required/i,
		);

		expect(await findByTestId("password-validation-alert")).toHaveTextContent(
			/password is required/i,
		);
	});

	test("rejects invalid email input", async () => {
		const { findByTestId, getByRole, getByLabelText } = await render(
			<AuthForm action="login" />,
		);

		const emailInput = getByLabelText("email");
		await fireEvent.changeText(emailInput, "invalid-email");

		const button = getByRole("button", { name: /submit/i });
		await fireEvent.press(button);

		expect(await findByTestId("email-validation-alert")).toHaveTextContent(
			/invalid email/i,
		);
	});

	test("rejects invalid password input", async () => {
		const { findByTestId, getByLabelText, getByRole } = await render(
			<AuthForm action="login" />,
		);

		const passwordInput = getByLabelText("password");
		await fireEvent.changeText(passwordInput, "pass");

		const button = getByRole("button", { name: /submit/i });
		await fireEvent.press(button);

		expect(await findByTestId("password-validation-alert")).toHaveTextContent(
			/password must be at least 8 characters/i,
		);
	});

	test("calls the correct appwrite auth method", async () => {
		mockCreateEmailPasswordSession.mockRejectedValueOnce(
			new Error("Invalid credentials"),
		);

		const { getByLabelText, getByRole } = await render(
			<AuthProvider>
				<LoginScreen />
			</AuthProvider>,
		);

		const emailInput = getByLabelText("email");
		const passwordInput = getByLabelText("password");
		const button = getByRole("button", { name: /submit/i });

		await fireEvent.changeText(emailInput, "test@fake.me");
		await fireEvent.changeText(passwordInput, "incorrect-password");
		await fireEvent.press(button);

		expect(mockCreateEmailPasswordSession).toHaveBeenCalledTimes(1);
	});
});
