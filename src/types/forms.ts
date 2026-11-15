/** Auth form input types. */
export interface UserAuthInputs {
	email: string;
	password: string;
}

export interface AuthActions {
	action: "login" | "register";
}

/** Sighting form input types */
export interface SightingFormInputs {
	commonName: string;
	date: Date;
	description: string;
}

export interface SightingMutationInputs {
	userId: string;
	formValues: SightingFormInputs;
}
