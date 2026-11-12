import DescriptionList from "@/components/screens/DescriptionList";
import { mockDescriptionList } from "@/test/mockData";
import { render } from "@testing-library/react-native";

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
