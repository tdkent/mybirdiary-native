import SightingForm from "@/components/forms/SightingForm";
import { render } from "@testing-library/react-native";

jest.mock("@/hooks/useAuth", () => ({
	useAuth: jest.fn().mockReturnValue({
		user: { $id: "1" },
	}),
}));

describe("SightingForm", () => {
	// test inputs and button are present
	test("renders default forms element", async () => {
		const { getByLabelText, getByRole, getByTestId } = await render(
			<SightingForm />,
		);

		// Inputs
		expect(getByLabelText(/common name/i));
		expect(getByTestId(/sighting-date/i));
		expect(getByLabelText(/description/i));

		// Button
		expect(getByRole("button", { name: /submit/i }));
	});
	// validation error if name input is blank
	// validation error if date > today
	// validation error if date < 10 years ago
	// validation error if desc > 150 chars
	// shows error if server error occurs
	// calls create action once with inputs if all inputs valid
	// test that new sighting is added to /sightings
});
