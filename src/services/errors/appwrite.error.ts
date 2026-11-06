import { AppwriteException } from "react-native-appwrite";

export function getAppwriteException(e: unknown) {
	if (e instanceof AppwriteException) {
		if (e.type === "general_argument_invalid") {
			return "Email or password are invalid.";
		}

		if (e.type === "user_already_exists") {
			return "Email already registered. Sign in?";
		}

		if (e.type === "user_invalid_credentials") {
			return "Email or password are incorrect. Please try again.";
		}
	}

	return "An unknown exception occurred.";
}
