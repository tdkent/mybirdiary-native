import type {
	DetailsQueryData,
	DetailsQueryReturnValue,
	ListQueryData,
	ListQueryReturnValue,
} from "@/test/types";
import type { DescriptionListItem } from "@/types/ui";

/**
 * Authentication
 */
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

/**
 * useQuery return values
 */
export const mockListData: ListQueryData = {
	rows: [
		{ $id: "1", commonName: "Blue Jay" },
		{ $id: "2", commonName: "Northern Cardinal" },
	],
	total: 2,
};

export const defaultListReturnValue: ListQueryReturnValue = {
	data: mockListData,
	error: null,
	isError: false,
	isPending: false,
};

export const mockDetailsData: DetailsQueryData = {
	$id: "1",
	commonName: "Green Heron",
	scientificName: "Butorides virescens",
	description: "A small heron",
};

export const defaultDetailsReturnValue: DetailsQueryReturnValue = {
	data: mockDetailsData,
	error: null,
	isError: false,
	isPending: false,
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
