import BirdsScreen from "@/app/(app)/birds";
import BirdDetailsScreen from "@/app/(app)/birds/[id]";
import List from "@/components/screens/List";
import { defaultListReturnValue } from "@/test/mockData";
import { useQuery } from "@tanstack/react-query";
import { render, screen, userEvent } from "@testing-library/react-native";
import { renderRouter } from "expo-router/build/testing-library/index.js";

// Mock useQuery
const mockUseQuery = jest.mocked(useQuery);

describe("List", () => {
	test("renders a loading component", async () => {
		mockUseQuery.mockReturnValue({
			...defaultListReturnValue,
			data: undefined,
			isPending: true,
		} as ReturnType<typeof useQuery>);

		const { getByText } = await render(<List queryKey="birds" />);

		expect(getByText(/loading.../i));
	});

	test("displays error message if an error occurs", async () => {
		const errorMsg = "An error occurred";

		mockUseQuery.mockReturnValue({
			...defaultListReturnValue,
			error: { message: errorMsg },
			isError: true,
		} as ReturnType<typeof useQuery>);

		const { getByText } = await render(<List queryKey="birds" />);

		expect(getByText(errorMsg));
	});

	test("displays alternate text if list contains no items", async () => {
		mockUseQuery.mockReturnValue({
			...defaultListReturnValue,
			data: {
				rows: [],
				count: 0,
			},
		} as ReturnType<typeof useQuery>);

		const { getByText } = await render(<List queryKey="birds" />);

		expect(getByText(/no data to show/i));
	});

	test("displays list items", async () => {
		mockUseQuery.mockReturnValue(
			defaultListReturnValue as ReturnType<typeof useQuery>,
		);

		const { getByText } = await render(<List queryKey="birds" />);

		expect(getByText(/blue jay/i));
		expect(getByText(/northern cardinal/i));
	});

	test("pressing an item navigates to correct bird details screen", async () => {
		mockUseQuery.mockReturnValue(
			defaultListReturnValue as ReturnType<typeof useQuery>,
		);

		await renderRouter({
			index: BirdsScreen,
			"birds/[id]": BirdDetailsScreen,
		});

		const listItem = screen.getByText(/blue jay/i);
		const user = userEvent.setup();
		await user.press(listItem);

		expect(screen).toHavePathname("/birds/1");
	});
});
