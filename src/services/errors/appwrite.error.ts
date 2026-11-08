import { ERROR_MESSAGES } from "@/constants/messages";
import { AppwriteException } from "react-native-appwrite";

export function getAppwriteException(e: unknown) {
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
				return ERROR_MESSAGES.UNEXPECTED_APPWRITE;
		}
	}

	console.error(e);
	return ERROR_MESSAGES.UNKNOWN_ERROR;
}
