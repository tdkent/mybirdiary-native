import { render } from "@testing-library/react-native";
import DescriptionList from "@/components/details/description-list";
import { mockDescriptionList } from "@/test/fixtures";

describe("List", () => {
	test("displays description list items", async () => {
		const { getByText } = await render(
			<DescriptionList descriptionList={mockDescriptionList} />,
		);

		for (const item of mockDescriptionList) {
			expect(getByText(item.label));
			expect(getByText(item.details));
		}
	});
});
