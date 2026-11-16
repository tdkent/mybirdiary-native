export const ERROR_MESSAGES = {
	APPWRITE_UNEXPECTED: "A server error occurred.",
	AUTH_ERROR: "An authentication error occurred.",
	FETCH_FAILED:
		"Unable to reach the server. Please check your connection or try again in a moment.",
	INCORRECT_CREDENTIALS: "Email or password are incorrect. Please try again.",
	INVALID_CREDENTIALS: "Invalid email or password.",
	INVALID_DATE: "Invalid date range.",
	INVALID_EMAIL: "Please enter a valid email.",
	PASSWORD_LENGTH_SHORT: "Password must be at least 8 characters.",
	PASSWORD_LENGTH_LONG: "Password must be less than 128 characters.",
	REGISTERED_EMAIL: "Email already registered. Sign in?",
	REQUIRED_DATE: "Date is required.",
	REQUIRED_EMAIL: "Email is required.",
	REQUIRED_PASSWORD: "Password is required.",
	SIGHTING_NAME_REQUIRED: "Name is required.",
	SIGHTING_DESCRIPTION_LENGTH: "Description must be less than 150 characters.",
	UNKNOWN_ERROR: "An unknown exception occurred.",
} as const;

export const appwriteErrorMessage = {
	general_argument_invalid: ERROR_MESSAGES.INVALID_CREDENTIALS,
	user_already_exists: ERROR_MESSAGES.REGISTERED_EMAIL,
	user_invalid_credentials: ERROR_MESSAGES.INCORRECT_CREDENTIALS,
} as const;

// Create type matching `appwriteErrorMessage` object's keys.
export type AppwriteErrorMessage = keyof typeof appwriteErrorMessage;
