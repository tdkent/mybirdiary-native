/**
 * Test form behavior and validation
 * Verify the form behaves correctly during user interaction
 */

import SightingForm from "@/components/forms/SightingForm";
import { ERROR_MESSAGES } from "@/constants/messages";
import { useMutation } from "@tanstack/react-query";
import { fireEvent, render } from "@testing-library/react-native";

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
		expect(mockMutate).not.toHaveBeenCalled();
	});

	test("rejects invalid date and displays error", async () => {});

	test("displays error message if a server error occurs", async () => {
		jest.mocked(useMutation).mockReturnValue({
			error: { message: ERROR_MESSAGES.APPWRITE_UNEXPECTED },
			isError: true,
			isPending: false,
			mutate: mockMutate,
		} as unknown as ReturnType<typeof useMutation>);

		const { findByText, getByLabelText, getByRole } = await render(
			<SightingForm />,
		);

		const commonName = "Blue Jay";
		const nameInput = getByLabelText(/common name/i);
		const button = getByRole("button", { name: /submit/i });

		await fireEvent.changeText(nameInput, commonName);
		await fireEvent.press(button);

		expect(mockMutate).toHaveBeenCalled();
		expect(await findByText(ERROR_MESSAGES.APPWRITE_UNEXPECTED));
	});

	test("calls mutate with valid credentials", async () => {
		const { getByLabelText, getByRole } = await render(<SightingForm />);

		const commonName = "Blue Jay";
		const nameInput = getByLabelText(/common name/i);
		const button = getByRole("button", { name: /submit/i });

		await fireEvent.changeText(nameInput, commonName);
		await fireEvent.press(button);

		expect(mockMutate).toHaveBeenCalledTimes(1);
		expect(mockMutate).toHaveBeenCalledWith({
			userId: "1",
			formValues: expect.objectContaining({
				commonName,
			}),
		});
	});
});
