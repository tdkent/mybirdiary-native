import { fireEvent, screen } from "@testing-library/react-native";
import { View } from "react-native";
import SightingForm from "@/components/forms/sighting-form";
import List from "@/components/list/list";
import { ERROR_MESSAGES } from "@/constants/messages";
import { VALIDATION } from "@/constants/validation";
import { getListData } from "@/services/api/list";
import { createSighting } from "@/services/api/mutate";
import { BIRD_GREEN_HERON, SIGHTING_BASE, USER_ID } from "@/test/fixtures";
import {
	MOCK_APPWRITE_LIST_SIGHTINGS,
	MOCK_EMPTY_APPWRITE_LIST,
} from "@/test/mocks";
import { createTestQueryClient, renderWithClient } from "@/test/query-client";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
	...jest.requireActual("expo-router"),
	useRouter: () => ({ push: mockPush }),
}));
jest.mock("@/services/api/list");
jest.mock("@/services/api/mutate");

const mockCreateSighting = jest.mocked(createSighting);
const mockGetListData = jest.mocked(getListData);

beforeEach(() => {
	mockCreateSighting.mockResolvedValue(undefined);
});

/** Fill the form with valid values and submit it. */
async function submitValidForm() {
	await fireEvent.changeText(
		screen.getByLabelText(/common name/i),
		BIRD_GREEN_HERON.commonName,
	);
	await fireEvent.changeText(
		screen.getByLabelText(/description/i),
		SIGHTING_BASE.description,
	);
	await fireEvent.press(screen.getByRole("button", { name: /submit/i }));
}

describe("SightingForm", () => {
	test("renders form inputs and submit button", async () => {
		const { getByLabelText, getByRole, getByTestId } = await renderWithClient(
			<SightingForm userId={USER_ID} />,
		);

		expect(getByLabelText(/common name/i)).toBeOnTheScreen();
		expect(getByTestId(/sighting-date/i)).toBeOnTheScreen();
		expect(getByLabelText(/description/i)).toBeOnTheScreen();
		expect(getByRole("button", { name: /submit/i })).toBeOnTheScreen();
	});

	test("rejects empty common name input and displays error", async () => {
		const { findByTestId, getByRole } = await renderWithClient(
			<SightingForm userId={USER_ID} />,
		);

		await fireEvent.press(getByRole("button", { name: /submit/i }));

		expect(
			await findByTestId(/commonName-validation-alert/i),
		).toHaveTextContent(ERROR_MESSAGES.SIGHTING_NAME_REQUIRED);
		expect(mockCreateSighting).not.toHaveBeenCalled();
	});

	test("rejects description over character limit", async () => {
		const { findByTestId, getByLabelText, getByRole } = await renderWithClient(
			<SightingForm userId={USER_ID} />,
		);

		// Create 151-character string
		const invalidDescription = new Array(
			VALIDATION.DESCRIPTION_CHAR_LIMIT + 2,
		).join("x");

		await fireEvent.changeText(
			getByLabelText(/common name/i),
			BIRD_GREEN_HERON.commonName,
		);
		await fireEvent.changeText(
			getByLabelText(/description/i),
			invalidDescription,
		);
		await fireEvent.press(getByRole("button", { name: /submit/i }));

		expect(
			await findByTestId(/description-validation-alert/i),
		).toHaveTextContent(ERROR_MESSAGES.SIGHTING_DESCRIPTION_LENGTH);
		expect(mockCreateSighting).not.toHaveBeenCalled();
	});

	test("pending state displays loader and disables button", async () => {
		mockCreateSighting.mockReturnValue(new Promise(() => {}));

		const { findByText, getByRole } = await renderWithClient(
			<SightingForm userId={USER_ID} />,
		);

		await submitValidForm();

		expect(await findByText(/submitting/i)).toBeOnTheScreen();
		expect(getByRole("button", { name: /submit/i })).toBeDisabled();
	});

	test("displays error message if a server error occurs", async () => {
		mockCreateSighting.mockRejectedValue(
			new Error(ERROR_MESSAGES.APPWRITE_UNEXPECTED),
		);

		const { findByText } = await renderWithClient(
			<SightingForm userId={USER_ID} />,
		);

		await submitValidForm();

		expect(
			await findByText(ERROR_MESSAGES.APPWRITE_UNEXPECTED),
		).toBeOnTheScreen();
		expect(mockPush).not.toHaveBeenCalled();
	});

	test("calls createSighting with valid inputs", async () => {
		await renderWithClient(<SightingForm userId={USER_ID} />);

		await submitValidForm();

		expect(mockCreateSighting).toHaveBeenCalledTimes(1);
		expect(mockCreateSighting).toHaveBeenCalledWith({
			userId: USER_ID,
			formValues: expect.objectContaining({
				commonName: BIRD_GREEN_HERON.commonName,
				description: SIGHTING_BASE.description,
			}),
		});
	});

	test("navigates to the sightings list after a successful submit", async () => {
		await renderWithClient(<SightingForm userId={USER_ID} />);

		await submitValidForm();

		expect(mockPush).toHaveBeenCalledWith("/sightings");
	});

	test("refreshes the cached sightings list after a successful submit", async () => {
		// Match the app's long staleTime so only invalidation can trigger a refetch
		const queryClient = createTestQueryClient({
			defaultOptions: { queries: { staleTime: Number.POSITIVE_INFINITY } },
		});
		mockGetListData
			.mockResolvedValueOnce(MOCK_EMPTY_APPWRITE_LIST as never)
			.mockResolvedValueOnce(MOCK_APPWRITE_LIST_SIGHTINGS as never);

		const { findByText } = await renderWithClient(
			<View>
				<SightingForm userId={USER_ID} />
				<List table="sightings" userId={USER_ID} />
			</View>,
			queryClient,
		);

		expect(await findByText(/no data to show/i)).toBeOnTheScreen();

		await submitValidForm();

		expect(await findByText(BIRD_GREEN_HERON.commonName)).toBeOnTheScreen();
		expect(mockGetListData).toHaveBeenCalledTimes(2);
	});
});
