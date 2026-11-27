import { render } from "@testing-library/react-native";
import DescriptionList from "@/components/details/description-list";
import { BIRD_DETAILS } from "@/test/fixtures";

describe("DescriptionList", () => {
	test.each(BIRD_DETAILS)(
		"displays $label and $details on screen",
		async ({ label, details }) => {
			const { getByText } = await render(
				<DescriptionList descriptionList={BIRD_DETAILS} />,
			);

			expect(getByText(label)).toBeOnTheScreen();
			expect(getByText(details)).toBeOnTheScreen();
		},
	);
});
