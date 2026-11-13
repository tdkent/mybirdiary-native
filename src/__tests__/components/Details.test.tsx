import Details from "@/components/screens/Details";
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

describe("List", () => {
	test("renders a loading component", async () => {
		mockUseQuery.mockReturnValue({
			...defaultDetailsReturnValue,
			data: undefined,
			isPending: true,
		} as ReturnType<typeof useQuery>);

		const { getByText } = await render(
			<Details queries={[""]} table="birds" />,
		);

		expect(getByText(/loading.../i));
	});

	test("displays error message if an error occurs", async () => {
		const errorMsg = "An error occurred";

		mockUseQuery.mockReturnValue({
			...defaultDetailsReturnValue,
			error: { message: errorMsg },
			isError: true,
		} as ReturnType<typeof useQuery>);

		const { getByText } = await render(
			<Details queries={[""]} table="birds" />,
		);

		expect(getByText(errorMsg));
	});

	test("displays alternate text if return data is undefined", async () => {
		mockUseQuery.mockReturnValue({
			...defaultDetailsReturnValue,
			data: undefined,
		} as ReturnType<typeof useQuery>);

		const { getByText } = await render(
			<Details queries={[""]} table="birds" />,
		);

		expect(getByText(/no data to show/i));
	});

	test("displays description list component if valid data is returned", async () => {
		mockUseQuery.mockReturnValue({
			...defaultDetailsReturnValue,
		} as ReturnType<typeof useQuery>);

		const { getByTestId } = await render(
			<Details queries={[""]} table="birds" />,
		);

		expect(getByTestId(/description-list/i));
	});
});
