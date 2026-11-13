import { ERROR_MESSAGES } from "@/constants/messages";
import { AppwriteException } from "react-native-appwrite";

/** Create error message from error object input. */
export function getErrorMessage(e: unknown) {
	if (e instanceof Error || e instanceof AppwriteException) {
		if (e.message.startsWith("fetch failed"))
			return ERROR_MESSAGES.FETCH_FAILED;
	}

	if (e instanceof AppwriteException) {
		switch (e.type) {
			case "general_argument_invalid":
				return ERROR_MESSAGES.INVALID_CREDENTIALS;

			case "user_already_exists":
				return ERROR_MESSAGES.REGISTERED_EMAIL;

			case "user_invalid_credentials":
				return ERROR_MESSAGES.INCORRECT_CREDENTIALS;

			default:
				console.error(e);
				return ERROR_MESSAGES.APPWRITE_UNEXPECTED;
		}
	}

	console.error(e);
	return ERROR_MESSAGES.UNKNOWN_ERROR;
}
