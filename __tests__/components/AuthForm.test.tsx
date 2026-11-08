/**
 * Test form behavior and validation
 * Verify the form behaves correctly during user interaction
 * Auth context functions are mocked to test calls
 */

import AuthForm from "@/components/forms/AuthForm";
import { AuthProvider } from "@/context/AuthContext";
import { fireEvent, render } from "@testing-library/react-native";

// Mock auth context (do not mock these globally
// so that real functions can be called in other tests)
const mockLogin = jest.fn();
const mockRegister = jest.fn();

jest.mock("@/hooks/useAuth", () => ({
	useAuth: () => ({
		login: mockLogin,
		register: mockRegister,
	}),
}));

describe("AuthForm", () => {
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

	test("calls login with valid credentials", async () => {
		const { getByLabelText, getByRole } = await render(
			<AuthProvider>
				<AuthForm action="login" />
			</AuthProvider>,
		);

		const emailInput = getByLabelText("email");
		const passwordInput = getByLabelText("password");
		const button = getByRole("button", { name: /submit/i });

		await fireEvent.changeText(emailInput, "test@fake.me");
		await fireEvent.changeText(passwordInput, "password123");
		await fireEvent.press(button);

		expect(mockLogin).toHaveBeenCalledTimes(1);
	});

	test("calls register with valid credentials", async () => {
		const { getByLabelText, getByRole } = await render(
			<AuthProvider>
				<AuthForm action="register" />
			</AuthProvider>,
		);

		const emailInput = getByLabelText("email");
		const passwordInput = getByLabelText("password");
		const button = getByRole("button", { name: /submit/i });

		await fireEvent.changeText(emailInput, "test@fake.me");
		await fireEvent.changeText(passwordInput, "password123");
		await fireEvent.press(button);

		expect(mockRegister).toHaveBeenCalledTimes(1);
	});
});
