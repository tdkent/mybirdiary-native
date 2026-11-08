/**
 * Test form behavior and validation
 * Verify the form behaves correctly during user interaction
 */

import AuthForm from "@/components/forms/AuthForm";
import { fireEvent, render } from "@testing-library/react-native";

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

	test("calls login with valid credentials", () => {});

	test("calls register with valid credentials", () => {});
});
