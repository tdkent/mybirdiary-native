import { render } from "@testing-library/react-native";
import DescriptionList from "@/components/details/description-list";
import { BIRD_DETAILS } from "@/test/fixtures";

describe("List", () => {
	test("displays description list items", async () => {
		const { getByText } = await render(
			<DescriptionList descriptionList={BIRD_DETAILS} />,
		);

		for (const item of BIRD_DETAILS) {
			expect(getByText(item.label));
			expect(getByText(item.details));
		}
	});
});
