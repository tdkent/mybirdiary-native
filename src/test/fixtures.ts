import type { DetailsQueryData, ListQueryData } from "@/test/types";
import type { DescriptionListItem } from "@/types/ui";

/** Authentication */
export const USER_ID = "user-123";
export const USER_EMAIL = "test@fake.me";

export const VALID_LOGIN = {
	email: USER_EMAIL,
	password: "password123",
};
export const INVALID_LOGIN = {
	email: "invalid-email",
	password: "abcd",
};

export const VALID_REGISTER = {
	...VALID_LOGIN,
	userId: USER_ID,
};

export const AUTH_STATUS = {
	authenticated: "Authenticated",
	unauthenticated: "Unauthenticated",
	authChecked: "Checked",
	authUnchecked: "Unchecked",
};

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
