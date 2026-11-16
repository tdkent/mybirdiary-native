import {
	appwriteErrorMessage,
	type AppwriteErrorMessage,
	ERROR_MESSAGES,
} from "@/constants/messages";
import { AppwriteException } from "react-native-appwrite";

/** Type predicate that narrows type of Appwrite error `type` value. */
function isKnownAppwriteErrorType(type: string): type is AppwriteErrorMessage {
	return Object.hasOwn(appwriteErrorMessage, type);
}

/** Create error message from error object input. */
export function getErrorMessage(e: unknown) {
	if (e instanceof Error) {
		if (e.message.startsWith("fetch failed"))
			return ERROR_MESSAGES.FETCH_FAILED;
	}

	if (e instanceof AppwriteException) {
		if (isKnownAppwriteErrorType(e.type)) {
			return appwriteErrorMessage[e.type];
		}

		console.error(e);
		return ERROR_MESSAGES.APPWRITE_UNEXPECTED;
	}

	console.error(e);
	return ERROR_MESSAGES.UNKNOWN_ERROR;
}
