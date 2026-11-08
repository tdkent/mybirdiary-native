/**
 * Test form behavior and validation
 * Verify the form behaves correctly during user interaction
 */

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

	test("calls the correct appwrite auth method", async () => {
		mockCreateEmailPasswordSession.mockRejectedValueOnce(
			new Error("Invalid credentials"),
		);

		const { getByLabelText, getByRole } = await render(
			<AuthProvider>
				<AuthForm action="login" />
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
