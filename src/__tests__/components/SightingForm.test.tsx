/**
 * Test form behavior and validation
 * Verify the form behaves correctly during user interaction
 */

import SightingForm from "@/components/forms/SightingForm";
import { ERROR_MESSAGES } from "@/constants/messages";
import { fireEvent, render } from "@testing-library/react-native";

jest.mock("@/hooks/useAuth", () => ({
	useAuth: jest.fn().mockReturnValue({
		user: { $id: "1" },
	}),
}));

describe("SightingForm", () => {
	test("renders form inputs and submit button", async () => {
		const { getByLabelText, getByRole, getByTestId } = await render(
			<SightingForm />,
		);

		expect(getByLabelText(/common name/i));
		expect(getByTestId(/sighting-date/i));
		expect(getByLabelText(/description/i));
		expect(getByRole("button", { name: /submit/i }));
	});

	test("rejects empty name input and displays error", async () => {
		const { findByTestId, getByRole } = await render(<SightingForm />);

		const button = getByRole("button", { name: /submit/i });
		await fireEvent.press(button);

		expect(
			await findByTestId(/commonName-validation-alert/i),
		).toHaveTextContent(ERROR_MESSAGES.SIGHTING_NAME_REQUIRED);
	});

	test("rejects invalid date and displays error", async () => {});

	test("displays error message if an error occurs", async () => {});

	test("calls mutate with valid credentials", async () => {});
});
