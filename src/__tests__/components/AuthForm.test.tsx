/**
 * Test form behavior and validation
 * Verify the form behaves correctly during user interaction
 * Auth context functions are mocked to test calls
 */

import AuthForm from "@/components/forms/AuthForm";
import { ERROR_MESSAGES } from "@/constants/messages";
import { AuthProvider } from "@/context/AuthContext";
import {
	TEST_EMAIL,
	TEST_INVALID_EMAIL,
	TEST_INVALID_PASSWORD,
	TEST_PASSWORD,
} from "@/test/constants";
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
			ERROR_MESSAGES.REQUIRED_EMAIL,
		);

		expect(await findByTestId("password-validation-alert")).toHaveTextContent(
			ERROR_MESSAGES.REQUIRED_PASSWORD,
		);
	});

	test("rejects invalid email input", async () => {
		const { findByTestId, getByRole, getByLabelText } = await render(
			<AuthForm action="login" />,
		);

		const emailInput = getByLabelText("email");
		await fireEvent.changeText(emailInput, TEST_INVALID_EMAIL);

		const button = getByRole("button", { name: /submit/i });
		await fireEvent.press(button);

		expect(await findByTestId("email-validation-alert")).toHaveTextContent(
			ERROR_MESSAGES.INVALID_EMAIL,
		);
	});

	test("rejects invalid password input", async () => {
		const { findByTestId, getByLabelText, getByRole } = await render(
			<AuthForm action="login" />,
		);

		const passwordInput = getByLabelText("password");
		await fireEvent.changeText(passwordInput, TEST_INVALID_PASSWORD);

		const button = getByRole("button", { name: /submit/i });
		await fireEvent.press(button);

		expect(await findByTestId("password-validation-alert")).toHaveTextContent(
			ERROR_MESSAGES.PASSWORD_LENGTH_SHORT,
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

		await fireEvent.changeText(emailInput, TEST_EMAIL);
		await fireEvent.changeText(passwordInput, TEST_PASSWORD);
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

		await fireEvent.changeText(emailInput, TEST_EMAIL);
		await fireEvent.changeText(passwordInput, TEST_PASSWORD);
		await fireEvent.press(button);

		expect(mockRegister).toHaveBeenCalledTimes(1);
	});
});
