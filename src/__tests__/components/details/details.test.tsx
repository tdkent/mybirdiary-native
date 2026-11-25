import { useQuery } from "@tanstack/react-query";
import { render } from "@testing-library/react-native";
import Details from "@/components/details/details";
import { defaultDetailsReturnValue } from "@/test/mocks";

const mockUseQuery = jest.mocked(useQuery);

describe("Details", () => {
	describe("query states", () => {
		test("renders a loading component", async () => {
			mockUseQuery.mockReturnValue({
				...defaultDetailsReturnValue,
				data: undefined,
				isPending: true,
			} as ReturnType<typeof useQuery>);

			const { getByText } = await render(<Details table="birds" rowId="" />);

			expect(getByText(/loading.../i));
		});

		test("displays error message if an error occurs", async () => {
			const errorMsg = "An error occurred";

			mockUseQuery.mockReturnValue({
				...defaultDetailsReturnValue,
				error: { message: errorMsg },
				isError: true,
			} as ReturnType<typeof useQuery>);

			const { getByText } = await render(<Details table="birds" rowId="" />);

			expect(getByText(errorMsg));
		});

		test("displays alternate text if return data is undefined", async () => {
			mockUseQuery.mockReturnValue({
				...defaultDetailsReturnValue,
				data: undefined,
			} as ReturnType<typeof useQuery>);

			const { getByText } = await render(<Details table="birds" rowId="" />);

			expect(getByText(/no data to show/i));
		});
	});

	describe("birds", () => {
		test("displays description list component if valid data is returned", async () => {
			mockUseQuery.mockReturnValue({
				...defaultDetailsReturnValue,
			} as ReturnType<typeof useQuery>);

			const { getByTestId } = await render(<Details table="birds" rowId="" />);

			expect(getByTestId(/description-list/i));
		});

		test("uses the correct cache keys", async () => {
			mockUseQuery.mockReturnValue({
				...defaultDetailsReturnValue,
			} as ReturnType<typeof useQuery>);

			await render(<Details table="birds" rowId="456" />);

			expect(mockUseQuery).toHaveBeenCalledWith(
				expect.objectContaining({ queryKey: ["birds", "detail", "456"] }),
			);
		});
	});

	describe("sightings", () => {
		test("uses the correct cache keys", async () => {
			mockUseQuery.mockReturnValue({
				...defaultDetailsReturnValue,
				data: { $id: "1", bird: { commonName: "Blue Jay" } },
			} as ReturnType<typeof useQuery>);

			await render(<Details table="sightings" userId="123" rowId="456" />);

			expect(mockUseQuery).toHaveBeenCalledWith(
				expect.objectContaining({
					queryKey: ["sightings", "123", "detail", "456"],
				}),
			);
		});
	});
});
