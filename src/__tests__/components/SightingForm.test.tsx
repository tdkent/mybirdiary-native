/**
 * Test form behavior and validation
 * Verify the form behaves correctly during user interaction
 */

import { useMutation } from "@tanstack/react-query";
import { fireEvent, render } from "@testing-library/react-native";
import SightingForm from "@/components/forms/SightingForm";
import { ERROR_MESSAGES } from "@/constants/messages";
import { VALIDATION } from "@/constants/validation";

jest.mock("@/hooks/useAuth", () => ({
	useAuth: jest.fn().mockReturnValue({
		user: { $id: "1" },
	}),
}));

const mockMutate = jest.fn();

beforeEach(() => {
	jest.mocked(useMutation).mockReturnValue({
		error: null,
		isError: false,
		isPending: false,
		mutate: mockMutate,
	} as unknown as ReturnType<typeof useMutation>);
});

describe("SightingForm", () => {
	test("renders form inputs and submit button", async () => {
		const { getByLabelText, getByRole, getByTestId } = await render(
			<SightingForm userId="1" />,
		);

		expect(getByLabelText(/common name/i)).toBeOnTheScreen();
		expect(getByTestId(/sighting-date/i)).toBeOnTheScreen();
		expect(getByLabelText(/description/i)).toBeOnTheScreen();
		expect(getByRole("button", { name: /submit/i })).toBeOnTheScreen();
	});

	test("rejects empty common name input and displays error", async () => {
		const { findByTestId, getByRole } = await render(
			<SightingForm userId="1" />,
		);

		await fireEvent.press(getByRole("button", { name: /submit/i }));

		expect(
			await findByTestId(/commonName-validation-alert/i),
		).toHaveTextContent(ERROR_MESSAGES.SIGHTING_NAME_REQUIRED);
		expect(mockMutate).not.toHaveBeenCalled();
	});

	test("rejects description over character limit", async () => {
		const { findByTestId, getByLabelText, getByRole } = await render(
			<SightingForm userId="1" />,
		);

		// Create 151-character string
		const mockDescription = new Array(
			VALIDATION.DESCRIPTION_CHAR_LIMIT + 2,
		).join("x");

		const nameInput = getByLabelText(/common name/i);
		const descriptionInput = getByLabelText(/description/i);

		await fireEvent.changeText(nameInput, "Blue Jay");
		await fireEvent.changeText(descriptionInput, mockDescription);
		await fireEvent.press(getByRole("button", { name: /submit/i }));

		expect(
			await findByTestId(/description-validation-alert/i),
		).toHaveTextContent(ERROR_MESSAGES.SIGHTING_DESCRIPTION_LENGTH);
		expect(mockMutate).not.toHaveBeenCalled();
	});

	test("pending state displays loader and disables button", async () => {
		jest.mocked(useMutation).mockReturnValue({
			error: null,
			isError: false,
			isPending: true,
			mutate: mockMutate,
		} as unknown as ReturnType<typeof useMutation>);

		const { findByText, getByRole } = await render(<SightingForm userId="1" />);

		expect(await findByText(/submitting/i)).toBeOnTheScreen();
		expect(getByRole("button", { name: /submit/i })).toBeDisabled();
	});

	test("displays error message if a server error occurs", async () => {
		jest.mocked(useMutation).mockReturnValue({
			error: { message: ERROR_MESSAGES.APPWRITE_UNEXPECTED },
			isError: true,
			isPending: false,
			mutate: mockMutate,
		} as unknown as ReturnType<typeof useMutation>);

		const { findByText } = await render(<SightingForm userId="1" />);
		expect(
			await findByText(ERROR_MESSAGES.APPWRITE_UNEXPECTED),
		).toBeOnTheScreen();
	});

	test("calls mutate with valid inputs", async () => {
		const { getByLabelText, getByRole } = await render(
			<SightingForm userId="1" />,
		);

		const commonName = "Blue Jay";
		const nameInput = getByLabelText(/common name/i);

		await fireEvent.changeText(nameInput, "Blue Jay");
		await fireEvent.press(getByRole("button", { name: /submit/i }));

		expect(mockMutate).toHaveBeenCalledTimes(1);
		expect(mockMutate).toHaveBeenCalledWith({
			userId: "1",
			formValues: expect.objectContaining({
				commonName,
			}),
		});
	});
});
