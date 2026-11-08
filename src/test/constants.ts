// Mock user
export const TEST_EMAIL = "test@fake.me";
export const TEST_PASSWORD = "password123";
export const TEST_INVALID_EMAIL = "invalid-email";
export const TEST_INVALID_PASSWORD = "123";

export const MOCK_USER_INPUTS = {
	email: TEST_EMAIL,
	password: TEST_PASSWORD,
};

export const MOCK_USER = {
	...MOCK_USER_INPUTS,
	userId: "xxx",
};

// Auth test component
export const USER_LOGGED_IN = "User is logged in";
export const USER_SIGNED_OUT = "User is signed out";
