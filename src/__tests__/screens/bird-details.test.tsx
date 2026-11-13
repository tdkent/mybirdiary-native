import BirdDetailsScreen from "@/app/(app)/birds/[id]";
import { defaultDetailsReturnValue } from "@/test/mockData";
import { useQuery } from "@tanstack/react-query";
import { render } from "@testing-library/react-native";

// Mock expo router
jest.mock("expo-router", () => ({
	Stack: {
		Screen: jest.fn(() => null),
	},
	useLocalSearchParams: jest.fn().mockReturnValue({ id: "1" }),
}));

const mockUseQuery = jest.mocked(useQuery);

describe("BirdDetailsScreen", () => {
	test("displays the expected screen heading", async () => {
		mockUseQuery.mockReturnValue({ ...defaultDetailsReturnValue } as ReturnType<
			typeof useQuery
		>);

		const { getByText } = await render(<BirdDetailsScreen />);

		getByText(/bird details:/i);
	});
});
