import LoginScreen from "@/app/(auth)/login";
import { fireEvent, render } from "@testing-library/react-native";

describe("LoginScreen", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("renders default form inputs", async () => {
		const { getByLabelText, getByRole } = await render(<LoginScreen />);
		getByLabelText("email");
		getByLabelText("password");
		getByRole("button", { name: /submit/i });
	});

	test("renders Input Required error if inputs left blank", async () => {
		const { findByTestId, getByRole } = await render(<LoginScreen />);

		const button = getByRole("button", { name: /submit/i });
		await fireEvent.press(button);

		expect(await findByTestId("email-validation-alert")).toHaveTextContent(
			/email is required/i,
		);

		expect(await findByTestId("password-validation-alert")).toHaveTextContent(
			/password is required/i,
		);
	});

	test("renders Invalid Email validation error", async () => {
		const { findByTestId, getByRole, getByLabelText } = await render(
			<LoginScreen />,
		);

		const emailInput = getByLabelText("email");
		await fireEvent.changeText(emailInput, "invalid-email");

		const button = getByRole("button", { name: /submit/i });
		await fireEvent.press(button);

		expect(await findByTestId("email-validation-alert")).toHaveTextContent(
			/invalid email/i,
		);
	});

	test("renders Invalid Password validation error", async () => {
		const { findByTestId, getByLabelText, getByRole } = await render(
			<LoginScreen />,
		);

		const passwordInput = getByLabelText("password");
		await fireEvent.changeText(passwordInput, "pass");

		const button = getByRole("button", { name: /submit/i });
		await fireEvent.press(button);

		expect(await findByTestId("password-validation-alert")).toHaveTextContent(
			/password must be at least 8 characters/i,
		);
	});
});
