import { fireEvent, render } from "@testing-library/react-native";
import AuthForm from "@/components/forms/auth-form";
import { ERROR_MESSAGES } from "@/constants/messages";
import { INVALID_LOGIN, VALID_LOGIN } from "@/test/fixtures";
import { MOCK_DEFAULT_AUTH_CONTEXT } from "@/test/mocks";

const mockLogin = jest.fn();
const mockRegister = jest.fn();
const mockSetAuthError = jest.fn();
const mockUseAuth = jest.fn();

jest.mock("@/hooks/use-auth", () => ({
	useAuth: () => mockUseAuth(),
}));

beforeEach(() => {
	mockUseAuth.mockReturnValue({
		...MOCK_DEFAULT_AUTH_CONTEXT,
		login: mockLogin,
		register: mockRegister,
		setAuthError: mockSetAuthError,
	});
});

describe("AuthForm", () => {
	test("renders email and password inputs and submit button", async () => {
		const { getByLabelText, getByRole } = await render(<AuthForm isLogin />);

		getByLabelText("email");
		getByLabelText("password");
		getByRole("button", { name: /submit/i });
	});

	test("rejects empty inputs and displays correct error message", async () => {
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

	test("rejects invalid email input and displays correct error message", async () => {
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

	test("rejects invalid password input and displays correct error message", async () => {
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

	test("pending state displays loader and disables button", async () => {
		mockUseAuth.mockReturnValue({
			...MOCK_DEFAULT_AUTH_CONTEXT,
			isLoading: true,
			setAuthError: mockSetAuthError,
		});

		const { getByRole, getByText } = await render(<AuthForm isLogin />);

		expect(getByText(/submitting/i)).toBeOnTheScreen();
		expect(getByRole("button", { name: /submitting/i })).toBeDisabled();
	});

	test("calls login with valid credentials", async () => {
		const { getByLabelText, getByRole } = await render(<AuthForm isLogin />);

		const emailInput = getByLabelText("email");
		const passwordInput = getByLabelText("password");
		const button = getByRole("button", { name: /submit/i });

		await fireEvent.changeText(emailInput, VALID_LOGIN.email);
		await fireEvent.changeText(passwordInput, VALID_LOGIN.password);
		await fireEvent.press(button);

		expect(mockLogin).toHaveBeenCalledTimes(1);
	});

	test("calls register with valid credentials", async () => {
		const { getByLabelText, getByRole } = await render(<AuthForm />);

		const emailInput = getByLabelText("email");
		const passwordInput = getByLabelText("password");
		const button = getByRole("button", { name: /submit/i });

		await fireEvent.changeText(emailInput, VALID_LOGIN.email);
		await fireEvent.changeText(passwordInput, VALID_LOGIN.password);
		await fireEvent.press(button);

		expect(mockRegister).toHaveBeenCalledTimes(1);
	});
});
