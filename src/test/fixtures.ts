import type { DetailsQueryData, ListQueryData } from "@/test/types";
import type { DescriptionListItem } from "@/types/ui";

/** Authentication */
export const testEmail = "test@fake.me";
export const testInvalidEmail = "invalid-email";

export const testPassword = "password123";
export const testInvalidPassword = "123";

export const mockUserInputs = {
	email: testEmail,
	password: testPassword,
};

export const mockUser = {
	...mockUserInputs,
	userId: "xxx",
};

export const userAuthenticated = "Authenticated";
export const userUnauthenticated = "Unauthenticated";

/** List component */
export const mockListData: ListQueryData = {
	rows: [
		{ $id: "1", commonName: "Blue Jay" },
		{ $id: "2", commonName: "Northern Cardinal" },
	],
	total: 2,
};

/** Details component */
export const mockDetailsData: DetailsQueryData = {
	$id: "1",
	commonName: "Green Heron",
	scientificName: "Butorides virescens",
	description: "A small heron",
};

export const mockDescriptionList: DescriptionListItem[] = [
	{
		label: "Common Name",
		details: "Blue Jay",
	},
	{
		label: "Scientific Name",
		details: "Cyanocitta cristata",
	},
	{
		label: "Description",
		details: "A loud blue corvid",
	},
];
