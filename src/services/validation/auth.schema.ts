import * as Yup from "yup";

const Email = Yup.string().email("Invalid email").required("Email is required");
const Password = Yup.string()
	.min(8, "Password must be at least 8 characters")
	.required("Password is required");

export const AuthSchema = Yup.object().shape({
	email: Email,
	password: Password,
});
