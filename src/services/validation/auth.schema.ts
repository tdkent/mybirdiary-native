import { ERROR_MESSAGES } from "@/constants/messages";
import * as Yup from "yup";

const Email = Yup.string()
	.email(ERROR_MESSAGES.INVALID_EMAIL)
	.required(ERROR_MESSAGES.REQUIRED_EMAIL);
const Password = Yup.string()
	.min(8, ERROR_MESSAGES.PASSWORD_LENGTH_SHORT)
	.max(128, ERROR_MESSAGES.PASSWORD_LENGTH_LONG)
	.required(ERROR_MESSAGES.REQUIRED_PASSWORD);

export const AuthSchema = Yup.object().shape({
	email: Email,
	password: Password,
});
