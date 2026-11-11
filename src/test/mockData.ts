import type { ListQueryData, ListQueryReturnValue } from "@/test/types";

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

export const defaultReturnValue: ListQueryReturnValue = {
	data: mockListData,
	error: null,
	isError: false,
	isPending: false,
};
