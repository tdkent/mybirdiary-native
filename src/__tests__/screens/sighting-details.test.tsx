import SightingDetailsScreen from "@/app/(app)/(tabs)/sightings/[id]";
import { getDetailsData } from "@/services/api/details";
import { MOCK_SIGHTING_ROW } from "@/test/mocks";
import { renderWithClient } from "@/test/query-client";

// Mock expo router
jest.mock("expo-router", () => ({
	Stack: {
		Screen: jest.fn(() => null),
	},
	useLocalSearchParams: jest.fn().mockReturnValue({ id: "1" }),
}));

// Mock useAuth, return user object
jest.mock("@/hooks/use-auth", () => ({
	useAuth: jest.fn().mockReturnValue({ user: { $id: "1" } }),
}));
jest.mock("@/services/api/details");

describe("SightingDetailsScreen", () => {
	test("displays the expected screen heading", async () => {
		jest.mocked(getDetailsData).mockResolvedValue(MOCK_SIGHTING_ROW);

		const { findByText } = await renderWithClient(<SightingDetailsScreen />);

		expect(
			await findByText(
				`Sighting Details: ${MOCK_SIGHTING_ROW.bird?.commonName}`,
			),
		).toBeOnTheScreen();
	});
});
