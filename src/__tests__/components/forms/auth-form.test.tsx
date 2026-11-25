import { fireEvent, render } from "@testing-library/react-native";
import AuthForm from "@/components/forms/auth-form";
import { ERROR_MESSAGES } from "@/constants/messages";
import { AuthProvider } from "@/context/auth-context";
import { INVALID_LOGIN, VALID_LOGIN } from "@/test/fixtures";

const mockLogin = jest.fn();
const mockRegister = jest.fn();

jest.mock("@/hooks/use-auth", () => ({
	useAuth: () => ({
		login: mockLogin,
		register: mockRegister,
		setAuthError: jest.fn(),
	}),
}));

describe("AuthForm", () => {
	test("renders email and password inputs and submit button", async () => {
		const { getByLabelText, getByRole } = await render(<AuthForm isLogin />);

		getByLabelText("email");
		getByLabelText("password");
		getByRole("button", { name: /submit/i });
	});

	test("displays validation error for empty inputs", async () => {
		const { findByTestId, getByRole } = await render(<AuthForm isLogin />);

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
			<AuthForm isLogin />,
		);

		const emailInput = getByLabelText("email");
		await fireEvent.changeText(emailInput, INVALID_LOGIN.email);

		const button = getByRole("button", { name: /submit/i });
		await fireEvent.press(button);

		expect(await findByTestId("email-validation-alert")).toHaveTextContent(
			ERROR_MESSAGES.INVALID_EMAIL,
		);
	});

	test("rejects invalid password input", async () => {
		const { findByTestId, getByLabelText, getByRole } = await render(
			<AuthForm isLogin />,
		);

		const passwordInput = getByLabelText("password");
		await fireEvent.changeText(passwordInput, INVALID_LOGIN.password);

		const button = getByRole("button", { name: /submit/i });
		await fireEvent.press(button);

		expect(await findByTestId("password-validation-alert")).toHaveTextContent(
			ERROR_MESSAGES.PASSWORD_LENGTH_SHORT,
		);
	});

	test("calls login with valid credentials", async () => {
		const { getByLabelText, getByRole } = await render(
			<AuthProvider>
				<AuthForm isLogin />
			</AuthProvider>,
		);

		const emailInput = getByLabelText("email");
		const passwordInput = getByLabelText("password");
		const button = getByRole("button", { name: /submit/i });

		await fireEvent.changeText(emailInput, VALID_LOGIN.email);
		await fireEvent.changeText(passwordInput, VALID_LOGIN.password);
		await fireEvent.press(button);

		expect(mockLogin).toHaveBeenCalledTimes(1);
	});

	test("calls register with valid credentials", async () => {
		const { getByLabelText, getByRole } = await render(
			<AuthProvider>
				<AuthForm />
			</AuthProvider>,
		);

		const emailInput = getByLabelText("email");
		const passwordInput = getByLabelText("password");
		const button = getByRole("button", { name: /submit/i });

		await fireEvent.changeText(emailInput, VALID_LOGIN.email);
		await fireEvent.changeText(passwordInput, VALID_LOGIN.password);
		await fireEvent.press(button);

		expect(mockRegister).toHaveBeenCalledTimes(1);
	});
});
