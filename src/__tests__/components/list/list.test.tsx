import { useQuery } from "@tanstack/react-query";
import { render } from "@testing-library/react-native";
import List from "@/components/list/list";
import { defaultListReturnValue } from "@/test/mocks";

// Mock useQuery
const mockUseQuery = jest.mocked(useQuery);

describe("List", () => {
	describe("query states", () => {
		test("renders a loading component", async () => {
			mockUseQuery.mockReturnValue({
				...defaultListReturnValue,
				data: undefined,
				isPending: true,
			} as ReturnType<typeof useQuery>);

			const { getByText } = await render(<List table="birds" />);

			expect(getByText(/loading.../i));
		});

		test("displays error message if an error occurs", async () => {
			const errorMsg = "An error occurred";

			mockUseQuery.mockReturnValue({
				...defaultListReturnValue,
				error: { message: errorMsg },
				isError: true,
			} as ReturnType<typeof useQuery>);

			const { getByText } = await render(<List table="birds" />);

			expect(getByText(errorMsg));
		});

		test("displays alternate text if list contains no items", async () => {
			mockUseQuery.mockReturnValue({
				...defaultListReturnValue,
				data: {
					rows: [],
					total: 0,
				},
			} as ReturnType<typeof useQuery>);

			const { getByText } = await render(<List table="birds" />);

			expect(getByText(/no data to show/i));
		});
	});

	describe("birds", () => {
		test("displays list items", async () => {
			mockUseQuery.mockReturnValue(
				defaultListReturnValue as ReturnType<typeof useQuery>,
			);

			const { getByText } = await render(<List table="birds" />);

			expect(getByText(/blue jay/i));
			expect(getByText(/northern cardinal/i));
		});

		test("uses the correct cache keys", async () => {
			mockUseQuery.mockReturnValue(
				defaultListReturnValue as ReturnType<typeof useQuery>,
			);

			await render(<List table="birds" />);

			expect(mockUseQuery).toHaveBeenCalledWith(
				expect.objectContaining({ queryKey: ["birds", "list"] }),
			);
		});
	});

	describe("sightings", () => {
		test("uses the correct cache keys", async () => {
			mockUseQuery.mockReturnValue({
				...defaultListReturnValue,
				data: {
					rows: [{ $id: "1", bird: { commonName: "Blue Jay" } }],
					total: 1,
				},
			} as ReturnType<typeof useQuery>);

			await render(<List table="sightings" userId="123" />);

			expect(mockUseQuery).toHaveBeenCalledWith(
				expect.objectContaining({ queryKey: ["sightings", "123", "list"] }),
			);
		});
	});
});
