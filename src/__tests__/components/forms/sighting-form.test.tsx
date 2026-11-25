import { useMutation } from "@tanstack/react-query";
import { fireEvent, render } from "@testing-library/react-native";
import SightingForm from "@/components/forms/sighting-form";
import { ERROR_MESSAGES } from "@/constants/messages";
import { VALIDATION } from "@/constants/validation";
import {
	BIRD_GREEN_HERON,
	SIGHTING_WITH_NULL_BIRD,
	USER_ID,
} from "@/test/fixtures";
import { MOCK_DEFAULT_USE_MUTATION } from "@/test/mocks";

const mockMutate = jest.fn();

beforeEach(() => {
	jest.mocked(useMutation).mockReturnValue({
		...MOCK_DEFAULT_USE_MUTATION,
		mutate: mockMutate,
	} as unknown as ReturnType<typeof useMutation>);
});

describe("SightingForm", () => {
	test("renders form inputs and submit button", async () => {
		const { getByLabelText, getByRole, getByTestId } = await render(
			<SightingForm userId={USER_ID} />,
		);

		expect(getByLabelText(/common name/i)).toBeOnTheScreen();
		expect(getByTestId(/sighting-date/i)).toBeOnTheScreen();
		expect(getByLabelText(/description/i)).toBeOnTheScreen();
		expect(getByRole("button", { name: /submit/i })).toBeOnTheScreen();
	});

	test("rejects empty common name input and displays error", async () => {
		const { findByTestId, getByRole } = await render(
			<SightingForm userId={USER_ID} />,
		);

		await fireEvent.press(getByRole("button", { name: /submit/i }));

		expect(
			await findByTestId(/commonName-validation-alert/i),
		).toHaveTextContent(ERROR_MESSAGES.SIGHTING_NAME_REQUIRED);
		expect(mockMutate).not.toHaveBeenCalled();
	});

	test("rejects description over character limit", async () => {
		const { findByTestId, getByLabelText, getByRole } = await render(
			<SightingForm userId={USER_ID} />,
		);

		// Create 151-character string
		const invalidDescription = new Array(
			VALIDATION.DESCRIPTION_CHAR_LIMIT + 2,
		).join("x");

		const nameInput = getByLabelText(/common name/i);
		const descriptionInput = getByLabelText(/description/i);

		await fireEvent.changeText(nameInput, BIRD_GREEN_HERON.commonName);
		await fireEvent.changeText(descriptionInput, invalidDescription);
		await fireEvent.press(getByRole("button", { name: /submit/i }));

		expect(
			await findByTestId(/description-validation-alert/i),
		).toHaveTextContent(ERROR_MESSAGES.SIGHTING_DESCRIPTION_LENGTH);
		expect(mockMutate).not.toHaveBeenCalled();
	});

	test("pending state displays loader and disables button", async () => {
		jest.mocked(useMutation).mockReturnValue({
			...MOCK_DEFAULT_USE_MUTATION,
			isPending: true,
		} as unknown as ReturnType<typeof useMutation>);

		const { findByText, getByRole } = await render(
			<SightingForm userId={USER_ID} />,
		);

		expect(await findByText(/submitting/i)).toBeOnTheScreen();
		expect(getByRole("button", { name: /submit/i })).toBeDisabled();
	});

	test("displays error message if a server error occurs", async () => {
		jest.mocked(useMutation).mockReturnValue({
			...MOCK_DEFAULT_USE_MUTATION,
			error: { message: ERROR_MESSAGES.APPWRITE_UNEXPECTED },
			isError: true,
		} as unknown as ReturnType<typeof useMutation>);

		const { findByText } = await render(<SightingForm userId={USER_ID} />);

		expect(
			await findByText(ERROR_MESSAGES.APPWRITE_UNEXPECTED),
		).toBeOnTheScreen();
	});

	test("calls mutate with valid inputs", async () => {
		const { getByLabelText, getByRole } = await render(
			<SightingForm userId={USER_ID} />,
		);
		const nameInput = getByLabelText(/common name/i);
		const descriptionInput = getByLabelText(/description/i);

		await fireEvent.changeText(nameInput, BIRD_GREEN_HERON.commonName);
		await fireEvent.changeText(
			descriptionInput,
			SIGHTING_WITH_NULL_BIRD.description,
		);
		await fireEvent.press(getByRole("button", { name: /submit/i }));

		expect(mockMutate).toHaveBeenCalledTimes(1);
		expect(mockMutate).toHaveBeenCalledWith({
			userId: USER_ID,
			formValues: expect.objectContaining({
				commonName: BIRD_GREEN_HERON.commonName,
				description: SIGHTING_WITH_NULL_BIRD.description,
			}),
		});
	});
});
