import { ERROR_MESSAGES } from "@/constants/messages";
import { getErrorMessage } from "@/services/errors/error-messages";
import { AppwriteException } from "react-native-appwrite";

describe("error-messages", () => {
	describe("getErrorMessage", () => {
		test("fetch failed error returns correct message", () => {
			const msg = getErrorMessage(Error("fetch failed"));
			expect(msg).toBe(ERROR_MESSAGES.FETCH_FAILED);
		});

		const appwriteErrors = [
			{
				type: "general_argument_invalid",
				msg: ERROR_MESSAGES.INVALID_CREDENTIALS,
			},
			{ type: "user_already_exists", msg: ERROR_MESSAGES.REGISTERED_EMAIL },
			{
				type: "user_invalid_credentials",
				msg: ERROR_MESSAGES.INCORRECT_CREDENTIALS,
			},
			{ type: "some_other_type", msg: ERROR_MESSAGES.APPWRITE_UNEXPECTED },
		];

		test.each(appwriteErrors)(
			"match appwrite type to error message: %s",
			({ type, msg }) => {
				const errorMsg = getErrorMessage(
					new AppwriteException("xxx", 400, type),
				);
				expect(errorMsg).toBe(msg);
			},
		);

		test("unknown error returns correct message", () => {
			const msg = getErrorMessage(Error("unknown error"));
			expect(msg).toBe(ERROR_MESSAGES.UNKNOWN_ERROR);
		});
	});
});
