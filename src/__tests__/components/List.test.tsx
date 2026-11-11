import BirdsScreen from "@/app/(app)/birds";
import BirdDetailsScreen from "@/app/(app)/birds/[id]";
import List from "@/components/screens/List";
import { useQuery } from "@tanstack/react-query";
import { render, screen, userEvent } from "@testing-library/react-native";
import { renderRouter } from "expo-router/build/testing-library/index.js";

jest.mock("@tanstack/react-query", () => ({
	useQuery: jest.fn(),
}));

const mockUseQuery = jest.mocked(useQuery);

beforeEach(() => {
	mockUseQuery.mockReturnValue({
		data: {
			rows: [
				{ $id: 1, commonName: "Blue Jay" },
				{ $id: 2, commonName: "Northern Cardinal" },
			],
			count: 2,
		},
		error: null,
		isError: false,
		isPending: false,
	} as ReturnType<typeof useQuery>);
});

describe("List", () => {
	test("renders a loading component", async () => {
		mockUseQuery.mockReturnValue({
			data: undefined,
			error: null,
			isError: false,
			isPending: true,
		} as ReturnType<typeof useQuery>);

		const { getByText } = await render(
			<List queryFn={() => {}} queryKey="birds" />,
		);

		expect(getByText(/loading.../i));
	});

	test("displays error message if an error occurs", async () => {
		const errorMsg = "An error occurred";

		mockUseQuery.mockReturnValue({
			data: null,
			error: { message: errorMsg },
			isError: true,
			isPending: false,
		} as ReturnType<typeof useQuery>);

		const { getByText } = await render(
			<List queryFn={() => {}} queryKey="birds" />,
		);

		expect(getByText(errorMsg));
	});

	test("displays alternate text if list contains no items", async () => {
		mockUseQuery.mockReturnValue({
			data: {
				rows: [],
				count: 0,
			},
			error: null,
			isError: false,
			isPending: false,
		} as ReturnType<typeof useQuery>);

		const { getByText } = await render(
			<List queryFn={() => {}} queryKey="birds" />,
		);

		expect(getByText(/no data to show/i));
	});

	test("displays list items", async () => {
		const { getByText } = await render(
			<List queryFn={() => {}} queryKey="birds" />,
		);

		expect(getByText(/blue jay/i));
		expect(getByText(/northern cardinal/i));
	});

	test("pressing an item navigates to correct bird details screen", async () => {
		await renderRouter({
			index: BirdsScreen,
			"birds/[id]": BirdDetailsScreen,
		});

		const user = userEvent.setup();

		const listItem = screen.getByText(/blue jay/i);
		await user.press(listItem);

		expect(screen).toHavePathname("/birds/1");
	});
});
