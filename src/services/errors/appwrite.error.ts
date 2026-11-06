import { AppwriteException } from "react-native-appwrite";

export function getAppwriteException(e: unknown) {
	if (e instanceof AppwriteException) {
		console.log(e.type);
		if (e.type === "general_argument_invalid") {
			return "Email or password are invalid.";
		}

		if (e.type === "user_already_exists") {
			return "Email already registered. Sign in?";
		}
	}

	return "An unknown exception occurred.";
}
