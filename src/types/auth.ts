export interface UserAuth {
	email: string;
	password: string;
}

export interface AuthActions {
	action: "login" | "register";
}
